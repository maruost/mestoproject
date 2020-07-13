class FormValidator {
  constructor({ form, closeButton, errorMessages }) {
    this._form = form;
    this._closeButton = closeButton;
    this._errorMessages = errorMessages;
  }

  _getErrorSpan = (element) => {
    return this._form.querySelector(`.popup__error[data-for="${element.name}"]`)
  }

  init = () => {
    this._button = this._form.querySelector('.popup__button');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    this._errorsElements = Array.from(this._form.querySelectorAll('.popup__error'));
    this.setEventListeners();

  }

  _handlerInputForm = (event) => {
    this._checkInputValidity(event.target);
    if (this._inputs.every(this._checkInputValidity)) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  }

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._getErrorSpan(input).textContent = "";
      return true;
    }

    if (input.validity.valueMissing) {
      this._getErrorSpan(input).textContent = this._errorMessages.empty;
      return false;
    }

    if (input.validity.tooShort) {
      this._getErrorSpan(input).textContent = this._errorMessages.wrongLength;
      return false;
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      this._getErrorSpan(input).textContent = this._errorMessages.wrongType;
      return false
    }

    return input.checkValidity();
  };

  setSubmitButtonState = (state) => {
    if (!state) {
      this._button.setAttribute('disabled', true);
      this._button.classList.remove('popup__button_active')

    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.add('popup__button_active')
    }
  }

  resetValidation = () => {
    this._errorsElements.forEach((el) => {
      el.textContent = "";
    });
  }

  setEventListeners = () => {
    this._form.addEventListener('input', (event) => this._handlerInputForm(event))

  };
}

