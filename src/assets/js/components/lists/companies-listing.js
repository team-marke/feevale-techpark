import { Placeholder } from '../placeholder';
import { Select } from '@marke/ui-core/components/select/select';

class CompaniesListing {
  /**
   * Inits the CompaniesListing component
   * @param {Object} args
   * @param {Element} [args.filters]
   * @param {Element} [args.companies]
   * @param {String} [args.mainPathName]
   */
  constructor(args) {
    this.filters = args.filters;
    this.companies = args.companies;
    this.selectFilters = this.__initSelectorFields();
    this.companiesArr = Array.from(this.companies.children);
    this.unitSelectFilter = this.selectFilters.find((select) => select.el.id === 'unit');
    this.searchInputFilter = this.filters.querySelector('.text-field');
    this.mainPathName = args.mainPathName ? args.mainPathName : '/nossas-empresas/';
    this.visibleResultsCounter = this.companiesArr.length;
    this.placeholder = new Placeholder({ container: args.companies, content: 'Nenhum resultado encontrado' });
    this.__addListeners();
  }

  /**
   * init all selector fields with Select class
   * @returns {Array}
   */
  __initSelectorFields() {
    return Array.from(this.filters.querySelectorAll('.select')).map((select) => {
      if (select.name == 'unit') this.addExternalOption(select)
      return new Select(select)
    });
  }

  /**
   * Adds listeners
   */
  __addListeners() {
    window.addEventListener('load', () => {
      if (this.__isMainPage()) {
        this.updateFromLocalStorage();
      } else {
        const subPagePathname = window.document.location.pathname.split('/');
        this.updateUnitsSelect(subPagePathname[subPagePathname.length - 2]);
      }
    });
    window.addEventListener('popstate', () => {
      this.handlePopstate();
    });
    this.selectFilters.forEach((select) => {
      select.el.addEventListener('change', () => {
        this.filterCompanies();
        if (select.el.id === 'unit') {
          this.handleDynamicSelect(select.getValue());
        }
      });
    });
    this.searchInputFilter.addEventListener('input', () => {
      this.filterCompanies();
    });
  }

  /**
   * Check if is main page based on the canonical tag
   * @returns {Boolean}
   */
  __isMainPage() {
    const canonical = document.querySelector("link[rel='canonical']");
    const url = new URL(canonical.href);
    return url.pathname === this.mainPathName;
  }

  addExternalOption(select) {
    const externalOption = document.createElement('option');
    externalOption.value = 'externa';
    externalOption.text = 'Externa';
    select.add(externalOption);
  }

  /**
   * Method to filter the companies list based on the state of the filters
   */
  filterCompanies() {
    this.visibleResultsCounter = this.companiesArr.length;
    for (const company of this.companiesArr) {
      if (this.everyFilterMatchCompany(company) && this.companyTitleMatchSearch(company)) {
        company.classList.remove('d-none');
      } else {
        company.classList.add('d-none');
        this.visibleResultsCounter--;
      }
    }
    this.handlePlaceholder();
  }

  /**
   * Return true if all the company dataset fields match the filters
   * @param {Element} company 
   * @returns {Boolean}
   */
  everyFilterMatchCompany(company) {
    return this.selectFilters.every((filter) => {
      const filterId = filter.el.dataset.filterId;
      if (!filter.getValue()) {
        return true;
      }
      return company.dataset[filterId] === filter.getValue();
    });
  }

  /**
   * Return true if the copany name match the search input filter substring
   * @param {Element} company 
   * @returns {Boolena}
   */
  companyTitleMatchSearch(company) {
    if (!this.searchInputFilter.value) {
      return true;
    }
    const companyTitle = company.dataset.title.toLowerCase();
    const searchedValue = this.searchInputFilter.value.toLowerCase();
    return companyTitle.indexOf(searchedValue) >= 0;
  }

  /**
   * Updates the ULR with history API
   * @param {String} newPath 
   */
  updateURL(newPath) {
    const pathName = newPath === '' ? this.mainPathName : newPath;
    history.pushState(newPath, null, pathName);
  }

  /**
   * Updates the units Select field with a given string
   * @param {String} newValue 
   */
  updateUnitsSelect(newValue) {
    this.unitSelectFilter.setValue(newValue);
  }

  /**
   * Try to update the URL with the localStorage item 'selected-company'
   */
  updateFromLocalStorage() {
    const previousSelectedCompany = window.localStorage.getItem('selected-company');
    if (previousSelectedCompany) {
      this.updateUnitsSelect(previousSelectedCompany);
      this.filterCompanies();
      this.updateURL(previousSelectedCompany);
      window.localStorage.removeItem('selected-company');
    }
  }

  /**
   * Handles the placeholder reveal and removal
   */
  handlePlaceholder() {
    if (this.visibleResultsCounter <= 0) {
      this.placeholder.add();
    } else {
      this.placeholder.remove();
    }
  }

  /**
   * Updates the units Select and then filter with the old state
   */
  handlePopstate() {
    const incomingState = history.state ? history.state : '';
    this.updateUnitsSelect(incomingState);
    this.filterCompanies();
  }

  /**
   * Method for redirect the user always to the main page aplication
   * @param {String} value 
   */
  handleDynamicSelect(value) {
    if (!this.__isMainPage()) {
      window.localStorage.setItem('selected-company', value);
      window.location.replace(this.mainPathName);
    } else {
      window.localStorage.removeItem('selected-company');
    }
    this.updateURL(value);
  }
}

export { CompaniesListing };
