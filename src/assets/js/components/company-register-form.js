/**
 * Form.
 */

import { ToastArea } from './toast-area';
import { Preloader } from './preloader';
import { createClient } from 'contentful-management';
import { TextField } from '@marke/ui-core/components/text-field/text-field';
import { Select } from '@marke/ui-core/components/select/select';

class CompanyRegisterForm {
  /**
   * Inits the CompanyRegisterForm component with handlers.
   * @constructor
   * @param {Element} form
   */
  constructor(form) {
    this.el = form;
    this.fields = [];
    this.preloader = new Preloader();
    this.successMessage = form.dataset.formMessage ? form.dataset.formMessage : 'Sua solicitação foi enviada com sucesso!';
    this.contentfulClient = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN });
    this.contentTypeId = 'company';
    this.cloudinaryUploadWidget;
    this.cloudinaryImage;
    this.initFields();
    this.__createCloudinaryUploadWidget();
    this.__listenFormEvents();
  }

  initFields() {
    for (const field of this.el.elements) {
      if ((field instanceof HTMLInputElement && field.type === 'text') || field instanceof HTMLTextAreaElement) {
        const textField = new TextField(field);
        this.fields.push(textField);
        continue;
      }
      if (field instanceof HTMLSelectElement) {
        const select = new Select(field);
        this.fields.push(select);
        continue;
      }
    }
  }

  validateForm() {
    for (const field of this.fields) {
      field.checkValidity();
    }
    return this.el.checkValidity();
  }

  /**
   * Method for check if the field represents a Contenful entry and then return the right value
   * @param {Element} field
   */
  getValue(field) {
    if (field.dataset.contentfulEntry) {
      return {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: field.value,
          },
        },
      };
    }
    // TODO alerta de erro quando a imagem não for selecionada
    if (field.id === 'cloudinaryImage') {
      return {
        'en-US': [
          {
            url: this.cloudinaryImage.url,
            tags: this.cloudinaryImage.tags,
            type: this.cloudinaryImage.type,
            bytes: this.cloudinaryImage.bytes,
            width: this.cloudinaryImage.width,
            format: this.cloudinaryImage.format,
            height: this.cloudinaryImage.height,
            version: this.cloudinaryImage.vesrion,
            duration: null,
            metadata: [],
            public_id: this.cloudinaryImage.public_id,
            created_at: this.cloudinaryImage.created_at,
            secure_url: this.cloudinaryImage.secure_url,
            original_url: this.cloudinaryImage.url,
            resource_type: this.cloudinaryImage.resource_type,
            original_secure_url: this.cloudinaryImage.secure_url,
          },
        ],
      };
    }
    return {
      'en-US': field.value,
    };
  }

  /**
   * Creates a new contentful Entry
   */
  async createContentfulEntry() {
    this.preloader.create(this.el);
    try {
      const validForm = this.validateForm(this.el);
      if (!validForm) {
        this.preloader.remove();
        return;
      }
      const fields = {};
      for (const field of this.el.elements) {
        if (field.id) {
          fields[field.name] = this.getValue(field);
        }
      }
      console.log(fields);
      const space = await this.contentfulClient.getSpace(process.env.CONTENTFUL_SPACE);
      const environment = await space.getEnvironment(!(process.env.ELEVENTY_ENV == 'main') ? 'develop' : 'main');
      const res = await environment.createEntry(this.contentTypeId, { fields });
      ToastArea.addToast({
        message: this.successMessage,
        type: 'success',
        id: `form-success-toast-${this.el.id}`,
        delay: 20000,
      });
      // await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: body,
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('HTTP status ' + response.status);
      //     } else {
      //       return response.json();
      //     }
      //   })
      //   .then((response) => {
      //     ToastArea.addToast({
      //       message: this.successMessage,
      //       type: 'success',
      //       id: `form-success-toast-${this.el.id}`,
      //       delay: 20000,
      //     });
      //     this.el.reset();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     ToastArea.addToast({
      //       message: 'Houve um erro no envio do formulário',
      //       type: 'danger',
      //       id: `form-error-toast-${this.el.id}`,
      //       autohide: false,
      //     });
      //   });
    } catch (error) {
      console.error(error);
      ToastArea.addToast({
        message: 'Houve um erro ao processar o formulário! Tente novamente mais tarde.',
        type: 'danger',
        id: `form-error-toast-${this.el.id}`,
        autohide: false,
      });
    }
    this.preloader.remove();
  }

  __createCloudinaryUploadWidget() {
    const opts = {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      uploadPreset: 'ml_default',
    };
    const callback = (error, result) => {
      if (!error && result && result.event === 'success') {
        this.cloudinaryImage = result.info;
      } else {
        //add toast de falha no upload
      }
    };
    this.cloudinaryUploadWidget = cloudinary.createUploadWidget(opts, callback);
  }

  /**
   * Adds listeners for form events
   */
  __listenFormEvents() {
    this.el.querySelector('#cloudinaryImage').addEventListener('click', (event) => {
      event.preventDefault();
      this.cloudinaryUploadWidget.open();
    });
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      this.createContentfulEntry();
    });
  }
}

export { CompanyRegisterForm };
