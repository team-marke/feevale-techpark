import algoliasearch from 'algoliasearch';
import Modal from 'bootstrap/js/src/modal';
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_KEY);

class Search {
  constructor(args) {
    this.toggler = args.toggler;
    this.modal = new Modal(args.modal);
    this.input = args.modal.querySelector('.search-modal__input .text-field');
    this.results = args.modal.querySelector('.search-modal__results');
    this._addListners();
  }

  _addListners() {
    this.input.addEventListener('input', (event) => {
      event.preventDefault();
      this.handleInput();
    });
    this.toggler.addEventListener('click', () => {
      this.modal.show();
    });
  }

  async handleInput() {
    const queries = [
      {
        indexName: 'dev_TECHNEWS',
        query: this.input.value,
      },
      {
        indexName: 'dev_BUSINESSPARTNERS',
        query: this.input.value,
      },
    ];
    try {
      const response = await client.multipleQueries(queries);
    } catch (error) {
      console.error(error);
    }
  }

}

export { Search };
