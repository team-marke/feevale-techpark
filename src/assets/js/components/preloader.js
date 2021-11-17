/**
 * Preloader.
 */

 class Preloader {
  /**
   * Inits the Preloader.
   * @constructor
   * @param {Object} args
   * @param {Element} args.el
   * @param {Element} args.container
   */
  constructor(args) {
    if (args) {
      if (typeof args.el !== 'undefined' && args.el) {
        this.el = args.el;
        this.active = true;
      } else {
        this.el = null;
        this.active = false;
        if (typeof args.container !== 'undefined' && args.container instanceof Element) {
          this.create(args.container);
        }
      }
    }
  }

  /**
   * Creates the preloader element and appends inside the container in the DOM.
   * @param {Element} container
   */
  create(container) {
    if (this.active) {
      return;
    }
    this.container = container;
    this.el = document.createElement('div');
    this.el.classList.add(
      'preloader',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'position-absolute',
      'top-0',
      'start-0',
      'w-100',
      'h-100',
      'zindex-above',
      'bg-translucent'
    );
    this.el.insertAdjacentHTML('beforeEnd', this._renderSpinner());
    container.appendChild(this.el);
    this.active = true;
  }

  /**
   * Removes the preloader from the DOM.
   */
  remove() {
    if (this.el == null) {
      return;
    }
    this.el.remove();
    this.el = null;
    this.container = null;
    this.active = false;
  }

  /**
   * Renders the spinner.
   * @returns {String} Rendered spinner markup
   */
  _renderSpinner() {
    return `
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    `;
  }
}

export { Preloader };