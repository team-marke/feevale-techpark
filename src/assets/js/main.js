import 'regenerator-runtime/runtime.js';
import '../scss/main.scss';

/**
 * Load Carousel.
 */
const loadCarousel = () => {
  if (document.querySelector('.carousel')) {
    import(/* webpackChunkName: "components.carousel" */ '@marke/ui-core/components/carousel/carousel').then(
      ({ Carousel }) => {
        document.querySelectorAll('.carousel').forEach((carousel) => {
          new Carousel(carousel);
        });
      }
    );
  }
};

/**
 * Load GridResponsiveSlider components.
 */
const loadGridResponsiveSlider = async () => {
  if (document.querySelector('.grid-responsive-slider')) {
    const { GridResponsiveSlider } = await import(
      /* webpackChunkName: "components.grid-responsive-slider" */ '@marke/ui-core/components/grid-responsive-slider/grid-responsive-slider'
    );
    document.querySelectorAll('.grid-responsive-slider').forEach((gridResponsiveSlider) => {
      new GridResponsiveSlider(gridResponsiveSlider);
    });
  }
};

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
 * Load youtube modal component.
 */
const loadYoutubeModals = async () => {
  if (document.querySelector('.video-teaser')) {
    const { VideoTeaser } = await import(
      /* webpackChunkName: "components.video-teaser" */ '@marke/ui-core/components/video-teaser/video-teaser'
    );
    document.querySelectorAll('.video-teaser').forEach((el) => {
      new VideoTeaser(el);
    });
  }
};

/**
 * Load Socialbar.
 */
const loadSocialbar = async () => {
  if (document.querySelector('.socialbar')) {
    const { Socialbar } = await import(
      /* webpackChunkName: "components.socialbar" */ '@marke/ui-core/components/socialbar/socialbar'
    );
    document.querySelectorAll('.socialbar').forEach((socialbar) => {
      new Socialbar(socialbar);
    });
  }
};

const loadAnimateCounters = async () => {
  if (document.querySelector('.counter-up')) {
    const { animateCounter } = await import(
      /* webpackChunkName: "components.animate-counter" */ '../js/components/animate-counter'
    );
    document.querySelectorAll('.counter-up').forEach((counter) => {
      animateCounter(counter, 7000);
    });
  }
};

const loadPartnersListing = async () => {
  if (document.querySelector('.partners-listing')) {
    const { PartnersListing } = await import(
      /* webpackChunkName: "components.partners-listing" */ '../js/components/partners-listing'
    );
    document.querySelectorAll('.partners-listing').forEach((el) => {
      new PartnersListing(el);
    });
  }
};

const loadCompaniesFilters = async () => {
  if (document.querySelector('.companies-listing__filters')) {
    const { main } = await import(
      /* webpackChunkName: "components.partners-listing" */ '../js/components/companies-filters'
    );
    main();
  }
};

const loadCompanyRegisterForm = async () => {
  if (document.querySelector('.company-register-form')) {
    const { CompanyRegisterForm } = await import(
      /* webpackChunkName: "components.company-register-form" */ '../js/components/company-register-form'
    );
    new CompanyRegisterForm(document.querySelector('.company-register-form'));
  }
};

/**
 * Dynamically load modules that are split from the main JS bundle.
 */
const loadDynamicModules = () => {
  import(/* webpackChunkName: "fontawesome" */ './vendor/fontawesome');
  import(/* webpackChunkName: "bootstrap" */ './vendor/bootstrap');
  loadCarousel();
  loadGridResponsiveSlider();
  loadNavbar();
  loadActionbar();
  loadYoutubeModals();
  loadSocialbar();
  loadAnimateCounters();
  loadPartnersListing();
  loadCompaniesFilters();
  loadCompanyRegisterForm();
};

/**
 * Load modules that are included in our main JS bundle.
 */
const loadBundledModules = () => {};

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

window.onload = () => {};
