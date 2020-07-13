class PopupImage extends Popup {
  constructor({ popup, closeButton, pic }) {
    super({ popup, closeButton });
    this._pic = pic;
  }

  _open = (link) => {
    this._pic.setAttribute('src', link);
    this._popup.classList.add('popup_is-opened');

  }
}
