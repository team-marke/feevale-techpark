function main() {
  const companiesArr = Array.from(document.querySelector('.companies-listing__companies').children);
  const companiesFilters = Array.from(document.querySelectorAll('.companies-listing__filter > select'));
  const companiesSearch = document.querySelector('.companies-listing__search-input')
  const mainPathName = '/nossas-empresas/';

  window.addEventListener('load', updateFromLocalStorage);

  companiesFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
      filterCompanies(getFiltersState());
      if (filter.id === 'units-dynamic-select') {
        handleDynamicSelect(filter.value);
      }
    });
  });

  companiesSearch.addEventListener('input', () => {
    filterCompanies(getFiltersState());
  });

  function getFiltersState() {
    return companiesFilters.map((selector) => ({
      selectorName: selector.dataset.filterName,
      selectorValue: selector.value,
    }));
  }

  function filterCompanies(filtersState) {
    for (const company of companiesArr) {
      if (everyFilterMatchCompany(filtersState, company) && nameMatchSearch(company)) {
        company.classList.remove('d-none');
      } else {
        company.classList.add('d-none');
      }
    }
  }

  function everyFilterMatchCompany(filtersState, company) {
    return filtersState.every((filter) => {
      return (company.dataset[`${filter.selectorName}Slug`] === filter.selectorValue || filter.selectorValue === 'all') 
    });
  }

  function nameMatchSearch(company) {
    if (!companiesSearch.value) {
      return true
    }
    const companyTitle = company.dataset.title.toLowerCase();
    const searchedValue = companiesSearch.value.toLowerCase();
    return companyTitle.indexOf(searchedValue) >= 0
  }

  function handleDynamicSelect(value) {
    if (!isMainPage()) {
      window.localStorage.setItem('selected-company', value);
      window.location.replace(mainPathName);
    } else {
      window.localStorage.removeItem('selected-company');
    }
    updateURL(value);
  }

  function isMainPage() {
    const canonical = document.querySelector("link[rel='canonical']");
    const url = new URL(canonical.href);
    return url.pathname === mainPathName;
  }

  function updateURL(newPath) {
    const pathName = newPath === 'all' ? mainPathName : newPath;
    history.pushState(null, null, pathName);
  }

  function updateUnitsSelect(newValue) {
    document.querySelector('#units-dynamic-select').value = newValue;
  }

  function updateFromLocalStorage() {
    const previousSelectedCompany = window.localStorage.getItem('selected-company');
    if (previousSelectedCompany && isMainPage()) {
      updateUnitsSelect(previousSelectedCompany);
      filterCompanies(getFiltersState());
      updateURL(previousSelectedCompany);
      window.localStorage.removeItem('selected-company');
    }
  }
}

export { main };
