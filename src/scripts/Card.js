export default class Card {
  constructor(template, name, link, openImageCallback) {
    this._name = name;
    this._link = link;
    this.openImageCallback = openImageCallback;
    this._template = template;

  }

  createCard() {
    const card = this._template.cloneNode(true).querySelector('.place-card');
    card.querySelector('.place-card__name').textContent = this._name;
    card.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`
    this._cardElement = card;
    this._setEventListeners();
    return card;
  }


  _setEventListeners() {
    this._likeIcon = this._cardElement.querySelector('.place-card__like-icon');
    this._deleteIcon = this._cardElement.querySelector('.place-card__delete-icon');
    this._image = this._cardElement.querySelector('.place-card__image');

    this._likeIcon.addEventListener('click', this._like)
    this._deleteIcon.addEventListener('click', this._remove)
    this._image.addEventListener('click', this.openImg);
  }

  _like = () => {
    this._likeIcon.classList.toggle('place-card__like-icon_liked');
  }

  _remove = () => {
    /** REVIEW: Можно лучше:
     * 
     * Вынести удаление обработчиков в отдельный метод, например _removeEventListeners
     */
    this._likeIcon.removeEventListener('click', this._like)
    this._deleteIcon.removeEventListener('click', this._remove)
    this._image.removeEventListener('click', this.openImg);

    this._cardElement.remove();
  }

  openImg = () => {
    this.openImageCallback(this._link)
  }
}
