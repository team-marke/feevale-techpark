import { Placeholder } from '../placeholder';

class PartnersListing {
  /**
   * Inits the PartnersListing component
   * @param {Object} args
   */
  constructor(args) {
    this.partners = args.partners;
    this.searchInputFilter = args.search;
    this.partnersArr = Array.from(this.partners.children);
    this.visibleResultsCounter = this.partnersArr.length;
    this.placeholder = new Placeholder({ container: args.partners, content: 'Nenhum resultado encontrado' });
    this._addLiteners();
  }

  /**
   * Adds listeners
   */
  _addLiteners() {
    this.searchInputFilter.addEventListener('input', () => {
      this.filterPartners();
    });
  }

  /**
   * Method to filter the partners list based on the state of the search filter
   */
  filterPartners() {
    this.visibleResultsCounter = this.partnersArr.length;
    for (const partner of this.partnersArr) {
      if (this.partnerTitleMatchSearch(partner)) {
        partner.classList.remove('d-none');
      } else {
        partner.classList.add('d-none');
        this.visibleResultsCounter--;
      }
    }
    this.handlePlaceholder();
  }

  /**
   * Return true if the partner title match the search filter substring
   * @param {Element} partner 
   * @returns {Boolean}
   */
  partnerTitleMatchSearch(partner) {
    const partnerTitle = partner.dataset.partnerTitle.toLowerCase();
    return partnerTitle.indexOf(this.searchInputFilter.value.toLowerCase()) >= 0;
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
}

export { PartnersListing };
