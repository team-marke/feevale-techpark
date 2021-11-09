class CompaniesDynamicSelect {
  constructor(el, companiesContainer) {
    this.el = el;
    this.companiesContainer = companiesContainer;
    this._addListeners();
  }

  _addListeners() {
    this.el.addEventListener('change', () => {
      this.filterCompaniesByUnitSlug(this.el.value);

      // Troca a URL com history API para o slug com página correspondente
      this.updateURL(this.el.value)
    });
  }

  filterCompaniesByUnitSlug(unitSlug) {
    const companies = Array.from(this.companiesContainer.children);
    companies.forEach((company) => {
      if (company.dataset.unitSlug === unitSlug || !unitSlug) {
        company.classList.remove('d-none');
      } else {
        company.classList.add('d-none');
      }
    });
  }

  updateURL(unitSlug) {
    history.pushState(unitSlug, null, unitSlug);
  }
}

export { CompaniesDynamicSelect };
