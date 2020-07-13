class CardList {
  constructor({ container, cards }) {
    this._container = container;
    this._cards = cards;

  }

  addCard(card) {
    this._container.append(card);
  }

  renderCard = (res) => {
    this._cards(res).forEach((card) => {
      this.addCard(card)
    });
  };
}

