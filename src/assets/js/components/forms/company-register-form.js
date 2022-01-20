/**
 * CompanyRegisterForm
 */

import { createClient } from 'contentful-management';
import { ToastStack } from '@marke/ui-core/components/toast-stack/toast-stack';
import { Preloader } from '../preloader';
import { Select } from '@marke/ui-core/components/select/select';
import { TextField } from '@marke/ui-core/components/text-field/text-field';
import Input from '@marke/ui-core/tools/core-components/input/input';

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
    this.toastStack = new ToastStack();
    this.successMessage = form.dataset.formMessage ? form.dataset.formMessage : 'Sua solicitação foi enviada com sucesso!';
    this.contentfulClient = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN });
    this.contentTypeId = 'company';
    this.cloudinaryUploadWidget;
    this.cloudinaryImage;
    this.uploadButton = form.querySelector('#cloudinaryImage');
    this.initFields();
    this.__createCloudinaryUploadWidget();
    this.__listenFormEvents();
  }

  /**
   * Inits all the text, selector and button fields inside the form
   */
  initFields() {
    for (const field of this.el.elements) {
      if ((field instanceof HTMLInputElement && field.type === 'text') || field instanceof HTMLTextAreaElement) {
        const textField = new TextField(field);
        this.fields.push(textField);
        continue;
      }
      if (field instanceof HTMLSelectElement) {
        if (field.name == 'unit') this.addExternalOption(field);
        const select = new Select(field);
        this.fields.push(select);
        continue;
      }
      if (field instanceof HTMLButtonElement) {
        const button = new Input(field);
        this.fields.push(button);
        continue;
      }
    }
  }

  addExternalOption(select) {
    const externalOption = document.createElement('option');
    externalOption.value = 0;
    externalOption.text = 'Externa';
    select.add(externalOption);
  }

  /**
   * Validate all the fields an then try to validate the form
   * @returns {Boolean} form is valid
   */
  validateForm() {
    for (const field of this.fields) {
      field.checkValidity();
    }
    return this.el.checkValidity();
  }

  /**
   * Method for returning the right object based on the field
   * @param {Element} field
   * @returns {Object} field data
   */
  getFieldData(field) {
    if (field.el.dataset.contentfulEntry) {
      if (field.getValue() == 0) return null;
      return {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: field.getValue(),
        },
      };
    }
    if (field.el.dataset.cloudinaryImageUpload) {
      const value = [];
      if (this.cloudinaryImage) {
        value.push({
          metadata: [],
          url: this.cloudinaryImage.url,
          tags: this.cloudinaryImage.tags,
          type: this.cloudinaryImage.type,
          bytes: this.cloudinaryImage.bytes,
          width: this.cloudinaryImage.width,
          format: this.cloudinaryImage.format,
          height: this.cloudinaryImage.height,
          version: this.cloudinaryImage.vesrion,
          duration: null,
          public_id: this.cloudinaryImage.public_id,
          created_at: this.cloudinaryImage.created_at,
          secure_url: this.cloudinaryImage.secure_url,
          original_url: this.cloudinaryImage.url,
          resource_type: this.cloudinaryImage.resource_type,
          original_secure_url: this.cloudinaryImage.secure_url,
        });
      }
      return value;
    }
    return field.getValue();
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
      const entryData = {};
      for (const field of this.fields) {
        if (field.el.id) {
          entryData[field.el.id] = {
            'en-US': this.getFieldData(field),
          };
        }
      }
      const space = await this.contentfulClient.getSpace(process.env.CONTENTFUL_SPACE);
      const environment = await space.getEnvironment(!(process.env.ELEVENTY_ENV == 'main') ? 'develop' : 'main');
      await environment.createEntry(this.contentTypeId, { fields: entryData });
      this.toastStack.enqueueToast({
        message: this.successMessage,
        variant: 'success',
        autoHideDuration: 20000,
        id: `form-success-toast-${this.el.id}`,
      });
    } catch (error) {
      console.error(error);
      this.toastStack.enqueueToast({
        message: 'Houve um erro ao processar a solicitação! Tente novamente mais tarde.',
        variant: 'danger',
        autoHideDuration: 5000,
        id: `form-error-toast-${this.el.id}`,
      });
    }
    this.preloader.remove();
  }

  /**
   * Creates a new Cloudinary Upload Widget
   */
  __createCloudinaryUploadWidget() {
    const opts = {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      uploadPreset: 'unsigned_upload',
    };
    const callback = (error, result) => {
      if (!error && result && result.event === 'success') {
        this.cloudinaryImage = result.info;
        this.toastStack.enqueueToast({
          message: 'Upload realizado com sucesso!',
          variant: 'success',
          autoHideDuration: 5000,
          id: `image-upload-success-toast-${this.el.id}`,
        });
        return;
      }
      if (error) {
        this.toastStack.enqueueToast({
          message: 'Houve um erro no upload do seu arquivo! Tente novamente mais tarde.',
          variant: 'danger',
          autoHideDuration: 5000,
          id: `image-upload-error-toast-${this.el.id}`,
        });
      }
    };
    this.cloudinaryUploadWidget = cloudinary.createUploadWidget(opts, callback);
  }

  /**
   * Adds listeners for form events
   */
  __listenFormEvents() {
    this.uploadButton.addEventListener('click', (event) => {
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
