class CompaniesDynamicSelect {
  constructor(el) {
    this.el = el;
    this._addListeners();
  }

  _addListeners() {
    console.log(this.el);
  }
}

export { CompaniesDynamicSelect }