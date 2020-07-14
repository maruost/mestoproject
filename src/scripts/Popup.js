export default class Popup {
  constructor({ popup, openButton = null, closeButton }) {
    this._popup = popup;
    this._openButton = openButton;
    this._closeButton = closeButton;
  }

  setEventListeners() {
    if (this._openButton != null) {
      this._openButton.addEventListener('click', this._open)
    };
    this._closeButton.addEventListener('click', this._close);

  }

  _open = () => {
    this._popup.classList.add('popup_is-opened');
  }

  _close = () => {
    this._popup.classList.remove('popup_is-opened');
  }
}