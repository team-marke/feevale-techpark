import 'regenerator-runtime/runtime.js';
import '../scss/main.scss';

/**
 * Load Navbar components.
 */
 const loadNavbar = async () => {
  if (document.querySelector('.navbar')) {
    const { Navbar } = await import(/* webpackChunkName: "components.navbar" */ '@marke/ui-core/components/navbar/navbar');
    document.querySelectorAll('.navbar').forEach((navbar) => {
      new Navbar(navbar);
    });
  }
};

/**
 * Load Actionbar components.
 */
 const loadActionbar = async () => {
  if (document.querySelector('.actionbar')) {
    const { Actionbar } = await import(
      /* webpackChunkName: "components.actionbar" */ '@marke/ui-core/components/actionbar/actionbar'
    );
    document.querySelectorAll('.actionbar').forEach((actionbar) => {
      new Actionbar(actionbar);
    });
  }
};

/**
 * Dynamically load modules that are split from the main JS bundle.
 */
const loadDynamicModules = () => {
  loadNavbar();
  loadActionbar();
};

/**
 * Load modules that are included in our main JS bundle.
 */
const loadBundledModules = () => {
};

/**
 * Bootstrap all the JS modules here.
 */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadDynamicModules();
    loadBundledModules();
  });
} else {
  loadDynamicModules();
  loadBundledModules();
}

window.onload = () => {
};
