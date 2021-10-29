class PartnersListing {
  constructor (el) {
    this.el = el;
    this.search = el.querySelector('.partners-listing__search');
    this.results = el.querySelector('.partners-listing__results');
  }
}

export { PartnersListing };