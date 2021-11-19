/**
 * ContactForm
 */

import { Preloader } from '../preloader';
import { ToastStack } from '@marke/ui-core/components/toast-stack/toast-stack';
import { TextField } from '@marke/ui-core/components/text-field/text-field';

class ContactForm {
  /**
   * Inits the ContactForm component with handlers.
   * @constructor
   * @param {Element} form
   */
  constructor(form) {
    this.el = form;
    this.fields = [];
    this.preloader = new Preloader();
    this.toastStack = new ToastStack();
    this.successMessage = form.dataset.formMessage ? form.dataset.formMessage : 'Formulário enviado com sucesso!';
    this.initFields();
    this.__listenFormEvents();
  }

  /**
   * Inits all the text fields inside the form
   */
  initFields() {
    for (const field of this.el.elements) {
      if ((field instanceof HTMLInputElement && field.type === 'text') || field instanceof HTMLTextAreaElement) {
        const textField = new TextField(field);
        this.fields.push(textField);
      }
    }
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
   * Submits the form
   */
  async submitForm() {
    this.preloader.create(this.el);
    try {
      const validForm = this.validateForm(this.el);
      if (!validForm) {
        this.preloader.remove();
        return;
      }
      let data = []
      for (const field of this.fields) {
        console.dir(field.el);
        data.push({
          label: field.el.labels[0].textContent,
          value: field.getValue(),
        });
      }
      const body = JSON.stringify({
        senderID: process.env.FORM_SUBMIT_SENDERID,
        to: process.env.FORM_SUBMIT_TO,
        subject: process.env.FORM_SUBMIT_SUBJECT,
        fields: data,
      });
      console.log(body);
      const url = process.env.FORM_SUBMIT_URL ? process.env.FORM_SUBMIT_URL : this.el.action;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
      console.log(res);

      this.toastStack.enqueueToast({
        message: this.successMessage,
        variant: 'success',
        autoHideDuration: 20000,
        id: `form-success-toast-${this.el.id}`,
      });
    } catch (error) {
      console.error(error);
      this.toastStack.enqueueToast({
        message: 'Houve um erro ao enviar o formulário! Tente novamente mais tarde.',
        variant: 'danger',
        autoHideDuration: 5000,
        id: `form-error-toast-${this.el.id}`,
      });
    }
    this.preloader.remove();
  }

  /**
   * Adds listeners for form events
   */
  __listenFormEvents() {
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm();
    });
  }
}

export { ContactForm };
