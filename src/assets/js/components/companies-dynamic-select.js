class CompaniesDynamicSelect {
  constructor(el, companiesContainer) {
    this.el = el;
    this.companiesContainer = companiesContainer;
    this.mainPathName = '/nossas-empresas/';
    this._addListeners();
  }

  _addListeners() {
    window.addEventListener('load', () => {
      this.handlePageLoad();
    });

    window.addEventListener('popstate', () => {
      this.handlePopstate();
    });

    this.el.addEventListener('change', () => {
      this.handleChange();
    });
  }

  handlePageLoad() {
    const selectedValue = window.localStorage.getItem('selected-company');
    if (selectedValue && this.isMainPage()) {
      this.filterCompaniesByUnitSlug(selectedValue);
      this.updateSelectValue(selectedValue);
      this.updateURL(selectedValue);
      window.localStorage.removeItem('selected-company');
    }
  }

  handleChange() {
    this.ifSubpageRedirectToMain(this.el.value);
    this.filterCompaniesByUnitSlug(this.el.value);
    this.updateURL(this.el.value);
  }

  handlePopstate() {
    this.filterCompaniesByUnitSlug(history.state);
    this.updateSelectValue(history.state);
  }

  isMainPage() {
    const canonical = document.querySelector("link[rel='canonical']");
    const url = new URL(canonical.href);
    return url.pathname === this.mainPathName;
  }

  ifSubpageRedirectToMain(unitSlug) {
    if (!this.isMainPage()) {
      window.localStorage.setItem('selected-company', unitSlug);
      window.location.replace(this.mainPathName);
    } else {
      window.localStorage.removeItem('selected-company');
    }
  }

  filterCompaniesByUnitSlug(unitSlug) {
    const companies = Array.from(this.companiesContainer.children);
    companies.forEach((company) => {
      if (company.dataset.unitSlug === unitSlug || unitSlug === 'all') {
        company.classList.remove('d-none');
      } else {
        company.classList.add('d-none');
      }
    });
  }

  updateSelectValue(unitSlug) {
    this.el.value = unitSlug;
  }

  updateURL(unitSlug) {
    const pathName = unitSlug !== 'all' ? unitSlug : this.mainPathName;
    history.pushState(unitSlug, null, pathName);
  }
}

export { CompaniesDynamicSelect };
