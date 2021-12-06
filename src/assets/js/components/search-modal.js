import Modal from 'bootstrap/js/src/modal';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_KEY);

class SearchModal {
  constructor(el) {
    this.modal = new Modal(el);
    this.input = el.querySelector('.search-modal__input .text-field');
    this.results = el.querySelector('.search-modal__results');
    this.defaultParams = {
      highlightPreTag: '<span class="search-modal__result-highlight">',
      highlightPostTag: '</span>',
      hitsPerPage: 3,
    };
    this.defaultIndices = [
      'dev_UNITS',
      'dev_TECHNEWS',
      'dev_COMPANIES',
      'dev_BUSINESSPARTNERS',
      'dev_COURSESANDEVENTS',
      'dev_INSTITUTIONALPARTNERS',
    ];
    this._addListners();
  }

  _addListners() {
    this.input.addEventListener('input', (event) => {
      event.preventDefault();
      this.handleInput();
    });
  }

  show() {
    this.modal.show();
  }

  async handleInput() {
    if (!this.input.value) {
      this.clearResults();
      return;
    }
    const queries = this.defaultIndices.map((index) => {
      return {
        indexName: index,
        params: this.defaultParams,
        query: this.input.value,
      };
    });
    try {
      const response = await client.multipleQueries(queries);
      this.updateResults(response.results);
    } catch (error) {
      console.error(error);
    }
  }

  updateResults(results) {
    this.clearResults();
    for (const result of results) {
      if (result.hits.length > 0) {
        this.results.classList.remove('search-modal__results--hidden');
        for (const hit of result.hits) {
          this.addResult(hit);
        }
      }
    }
  }

  clearResults() {
    this.results.innerHTML = '';
    this.results.classList.add('search-modal__results--hidden');
  }

  addResult(hit) {
    const hitNode = document.createElement('a');
    hitNode.setAttribute('href', hit.url);
    hitNode.innerHTML = `
      <span class="search-modal__result-icon">${hit.icon}</span>
      <span class="search-modal__result-hit">${hit._highlightResult.title.value}</span>
      <span class="search-modal__result-index">${hit.label}</span>
    `;
    hitNode.classList.add('search-modal__result');
    this.results.appendChild(hitNode);
  }
}

export { SearchModal };
