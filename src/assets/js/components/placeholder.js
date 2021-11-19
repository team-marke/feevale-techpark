class Placeholder {
  /**
   * Inits a new Placeholder element
   * @param {Object} args
   * @param {Element} args.container
   * @param {String} args.content
   */
  constructor(args) {
    this.container = args.container;
    this.placeholder = this.__createPlaceholder(args.content);
    this.active = false;
  }

  /**
   * Append the placholder into DOM
   */
  add() {
    if (!this.active) {
      this.container.appendChild(this.placeholder);
      this.active = true;
    }
  }

  /**
   * Remove the placeholder from DOM
   */
  remove() {
    if (this.active) {
      this.container.removeChild(this.placeholder);
      this.active = false;
    }
  }

  /**
   * Private method for creating a new placholder HTML element
   * @param {String} content
   * @returns {HTMLDivElement} the placeholder element
   */
  __createPlaceholder(content) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    cardBody.innerHTML = `<span>${content}</span>`;
    placeholder.appendChild(cardBody);
    return placeholder;
  }
}

export { Placeholder };
