/**
 * Animates a counter on an element.
 * Content inside element must be a number with "count" dataset.
 * @param {Element} el 
 * @param {int} duration 
 */
const animateCounter = (el, duration) => {
  if (!el || !duration) return;
  let range = el.dataset.count - 0;
  let current = 0;
  let increment = el.dataset.count > 0 ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(() => {
    current += increment;
    el.innerHTML = current;
    if (current == el.dataset.count) {
      clearInterval(timer);
    }
  }, stepTime);
};

export { animateCounter };