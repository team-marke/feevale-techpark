class PartnersListing {
  constructor(el) {
    this.el = el;
    this.search = el.querySelector('.partners-listing__search');
    this.partnersList = el.querySelector('.partners-listing__partners').children;
    this._addLiteners();
  }

  _addLiteners() {
    this.search.addEventListener('input', () => {
      this.updatePartnersList();
    });
  }

  updatePartnersList() {
    const searchedValue = this.search.value.toLowerCase();
    for (const partner of this.partnersList) {
      const partnerName = partner.dataset.partnerName.toLowerCase();
      if (partnerName.indexOf(searchedValue) >= 0) {
        partner.classList.remove('partner-hidden');
      } else {
        partner.classList.add('partner-hidden');
      }
    }
  }
}

export { PartnersListing };
