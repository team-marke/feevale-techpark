import Tab from 'bootstrap/js/src/tab';

(() => {
  Array.from(document.querySelectorAll('button[role="tab"]')).forEach((node) => {
    console.log(node);
    let tab = new Tab(node);
    node.addEventListener('click', function (event) {
      event.preventDefault();
      tab.show();
    });
  });
})();