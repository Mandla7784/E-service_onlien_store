// Form Handler for secure form submissions
class FormHandler {
  constructor() {
    this.csrfToken = null;
    this.initializeForms();
    this.fetchCSRFToken();
  }

  async fetchCSRFToken() {
    try {
      const response = await fetch('/api/csrf-token');
      const data = await response.json();
      this.csrfToken = data.csrfToken;
      this.updateFormsWithCSRFToken();
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      this.showGlobalError('Failed to initialize form security. Please refresh the page.');
    }
  }

  updateFormsWithCSRFToken() {
    document.querySelectorAll('form.secure-form').forEach(form => {
      // Remove any existing CSRF token inputs
      const existingToken = form.querySelector('input[name="_csrf"]');
      if (existingToken) existingToken.remove();

      // Add new CSRF token input
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = '_csrf';
      csrfInput.value = this.csrfToken;
      form.prepend(csrfInput);
    });
  }

  initializeForms() {
    // Credit Application Form
    const creditForm = document.getElementById('creditApplicationForm');
    if (creditForm) {
      creditForm.addEventListener('submit', (e) => this.handleCreditApplication(e));
    }

    // Newsletter Subscription Forms
    document.querySelectorAll('form[action*="subscribe"]').forEach(form => {
      form.addEventListener('submit', (e) => this.handleNewsletterSubscription(e, form));
    });
  }

  async handleCreditApplication(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const buttonText = submitBtn.querySelector('.button-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const formData = new FormData(form);
    const messagesContainer = document.getElementById('form-messages');

    // Show loading state
    this.setLoadingState(submitBtn, true);
    this.clearMessages(messagesContainer);

    try {
      const response = await fetch('/api/credit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      const data = await response.json();

      if (response.ok) {
        this.showSuccess(messagesContainer, data.message || 'Application submitted successfully!');
        form.reset();
      } else {
        throw new Error(data.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Credit application error:', error);
      this.showError(messagesContainer, error.message || 'Failed to submit application. Please try again.');
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  async handleNewsletterSubscription(e, form) {
    e.preventDefault();
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const messagesContainer = form.querySelector('.form-messages') || document.createElement('div');
    
    if (!form.contains(messagesContainer)) {
      form.prepend(messagesContainer);
      messagesContainer.className = 'form-messages';
    }

    this.setLoadingState(submitBtn, true);
    this.clearMessages(messagesContainer);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        body: JSON.stringify({ email: formData.get('email') })
      });

      const data = await response.json();

      if (response.ok) {
        this.showSuccess(messagesContainer, data.message || 'Thank you for subscribing!');
        form.reset();
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      this.showError(messagesContainer, error.message || 'Failed to subscribe. Please try again.');
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  setLoadingState(button, isLoading) {
    const spinner = button.querySelector('.spinner-border');
    const buttonText = button.querySelector('.button-text');
    
    if (isLoading) {
      button.disabled = true;
      if (spinner) spinner.classList.remove('d-none');
      if (buttonText) buttonText.textContent = 'Processing...';
    } else {
      button.disabled = false;
      if (spinner) spinner.classList.add('d-none');
      if (buttonText && buttonText.dataset.originalText) {
        buttonText.textContent = buttonText.dataset.originalText;
      }
    }
  }

  showSuccess(container, message) {
    this.showMessage(container, message, 'success');
  }

  showError(container, message) {
    this.showMessage(container, message, 'error');
  }

  showMessage(container, message, type = 'info') {
    if (!container) return;
    
    container.style.display = 'block';
    container.className = `form-messages ${type}`;
    container.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.clearMessages(container);
    }, 5000);
  }

  clearMessages(container) {
    if (!container) return;
    container.style.display = 'none';
    container.className = 'form-messages';
    container.textContent = '';
  }

  showGlobalError(message) {
    // Create or find global error container
    let errorContainer = document.getElementById('global-error-container');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.id = 'global-error-container';
      errorContainer.className = 'global-error';
      document.body.prepend(errorContainer);
    }
    
    this.showMessage(errorContainer, message, 'error');
  }
}

// Initialize form handler when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.formHandler = new FormHandler();
});
