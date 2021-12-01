import 'regenerator-runtime/runtime.js';
import '../scss/main.scss';
import '@marke/ui-core/components/accordion/accordion';

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

const loadPartnersListing = async () => {
  if (document.querySelector('.partners-listing')) {
    const { PartnersListing } = await import(
      /* webpackChunkName: "components.partners-listing" */ '../js/components/lists/partners-listing'
    );
    const el = document.querySelector('.partners-listing');
    new PartnersListing({
      partners: el.querySelector('.partners-listing__partners'),
      search: el.querySelector('.partners-listing__search .text-field'),
    });
  }
};

const loadCompaniesListing = async () => {
  if (document.querySelector('.companies-listing')) {
    const { CompaniesListing } = await import(
      /* webpackChunkName: "components.companies-listing" */ '../js/components/lists/companies-listing'
    );
    const el = document.querySelector('.companies-listing');
    new CompaniesListing({
      companies: el.querySelector('.companies-listing__companies'),
      filters: el.querySelector('.companies-listing__filters'),
      mainPathName: '/nossas-empresas/',
    });
  }
};

const loadContactForm = async () => {
  if (document.querySelector('.contact-form')) {
    const { ContactForm } = await import(
      /* webpackChunkName: "components.contact-form" */ '../js/components/forms/contact-form'
    );
    const el = document.querySelector('.contact-form');
    new ContactForm(el);
  }
};

const loadCompanyRegisterForm = async () => {
  if (document.querySelector('.company-register-form')) {
    const { CompanyRegisterForm } = await import(
      /* webpackChunkName: "components.company-register-form" */ '../js/components/forms/company-register-form'
    );
    const el = document.querySelector('.company-register-form');
    new CompanyRegisterForm(el);
  }
};

const loadOpportunityRegisterForm = async () => {
  if (document.querySelector('.opportunity-register-form')) {
    const { OpportunityRegisterForm } = await import(
      /* webpackChunkName: "components.opportunity-register-form" */ '../js/components/forms/opportunity-register-form'
    );
    const el = document.querySelector('.opportunity-register-form');
    new OpportunityRegisterForm(el);
  }
};

const loadQueryTab = async () => {
  if (document.querySelector('.query-tab')) {
    const { QueryTab } = await import(/* webpackChunkName: "components.query-tab" */ '../js/components/query-tab');
    const el = document.querySelector('.query-tab');
    new QueryTab(el);
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
  loadPartnersListing();
  loadCompaniesListing();
  loadContactForm();
  loadCompanyRegisterForm();
  loadOpportunityRegisterForm();
  loadQueryTab();
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
