class PartnersListing {
  constructor(el) {
    this.el = el;
    this.search = el.querySelector('.partners-listing__search-input');
    this.partners = el.querySelector('.partners-listing__partners');
    this.partnersElements = Array.from(this.partners.children);
    this.numberOfActivePartners = this.partnersElements.length;
    this.placeholder = this.getPlaceholder();
    this._addLiteners();
    this._appendPlaceholderToPartners();
  }

  _addLiteners() {
    this.search.addEventListener('input', () => {
      this.updatePartners();
    });
  }

  _appendPlaceholderToPartners() {
    this.partners.appendChild(this.placeholder);
  }

  updatePartners() {
    this.resetNumberOfActivePartners();
    for (const partner of this.partnersElements) {
      if (partner.dataset.partnerName) {
        this.hideIfSearchedValueNotMatchPartnerName(this.search.value, partner);
      }
    }
    this.handlePlaceholderReveal();
  }

  hideIfSearchedValueNotMatchPartnerName(searchedValue, partner) {
    const partnerName = partner.dataset.partnerName.toLowerCase();
    if (partnerName.indexOf(searchedValue.toLowerCase()) >= 0) {
      partner.classList.remove('partner-hidden');
    } else {
      partner.classList.add('partner-hidden');
      this.numberOfActivePartners--;
    }
  }

  resetNumberOfActivePartners() {
    this.numberOfActivePartners = this.partnersElements.length;
  }

  handlePlaceholderReveal() {
    if (this.numberOfActivePartners <= 0) {
      this.placeholder.classList.remove('partner-hidden');
    } else {
      this.placeholder.classList.add('partner-hidden');
    }
  }

  getPlaceholder() {
    return document.querySelector('.partners-listing__placeholder')
      ? document.querySelector('.partners-listing__placeholder')
      : this.createPlaceholder();
  }

  createPlaceholder() {
    const placeholderCard = document.createElement('div');
    placeholderCard.classList.add('partners-listing__placeholder', 'card', 'partner-hidden');
    const placeholderCardBody = document.createElement('div');
    placeholderCardBody.classList.add('card__body');
    placeholderCardBody.innerHTML = '<span>Nenhum resultado encontrado...</span>';
    placeholderCard.appendChild(placeholderCardBody);
    return placeholderCard;
  }
}

export { PartnersListing };
