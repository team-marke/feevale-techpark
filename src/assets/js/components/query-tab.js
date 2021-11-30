import Tab from 'bootstrap/js/src/tab';

class QueryTab {

  /**
   * Inits the QueryTab
   * @param {Element} el 
   */
  constructor(el) {
    this.el = el;
    this.tabsArr = this.initTabs()
    this.query = this.getSearchParams();
    if (this.query) {
      this.showTab();
    }
  }

  showTab() {
    for (const tab of this.tabsArr) {
      if (this.query === tab._element.dataset['title']) {
        tab.show()
      }
    }
  }

  initTabs() {
    let tabs = []
    for (const button of Array.from(this.el.querySelectorAll('button[role="tab"]'))) {
      tabs.push(new Tab(button))
    }
    return tabs;
  }

  getSearchParams() {
    const params = new URLSearchParams(location.search);
    return params.get('tab');
  }
}

export { QueryTab };
