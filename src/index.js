import "./pages/index.css";

(function () {

  const addCardPopupButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit-button');
  const cardsForm = document.forms.cards;
  const userInfoForm = document.forms.userInfo;
  const placesListContainer = document.querySelector('.places-list');
  const cardImagePopupElement = document.querySelector('#popup-image');
  const closeUserInfoPopupButton = document.querySelector('#popup-edit-close');
  const closeAddCardPopup = document.querySelector('#popup-add-close');
  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongType: 'Здесь должна быть ссылка',
  }
  const cardTemplate = document.querySelector('#place-card-template').content;

  const config = {
    url: 'https://praktikum.tk/cohort11/',
    headers: {
      authorization: '9fac4592-874a-4417-87e6-37c86c526c4e',
      'Content-Type': 'application/json'
    }
  }

  const api = new Api(config);

  // попапы

  const addCardPopup = new Popup({
    popup: document.querySelector('#popup-add'),
    openButton: addCardPopupButton,
    closeButton: closeAddCardPopup,

  });

  addCardPopup.setEventListeners();

  const userInfoPopup = new Popup({
    popup: document.querySelector('#popup-edit'),
    openButton: editButton,
    closeButton: closeUserInfoPopupButton,

  });

  userInfoPopup.setEventListeners();

  const cardImagePopup = new PopupImage({
    popup: document.querySelector('#popup-image'),
    closeButton: document.querySelector('#popup-image-close'),
    pic: cardImagePopupElement.querySelector('.popup__card-image')
  });

  cardImagePopup.setEventListeners();

  // валидация форм

  const cardsFormValidator = new FormValidator({
    form: cardsForm,
    closeButton: closeAddCardPopup,
    errorMessages
  });

  cardsFormValidator.init();

  const userInfoFormValidator = new FormValidator({
    form: userInfoForm,
    closeButton: closeUserInfoPopupButton,
    errorMessages
  });

  userInfoFormValidator.init();

  // подгрузка карточек с сервера

  api.getInitialCards('cards')
    .then((res) => {
      placesList.renderCard(res)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

  const createCardsArray = function (res) {
    console.log(res)
    const array = [];
    res.forEach((card) => {
      array.push(new Card(
        cardTemplate,
        card.name,
        card.link,
        cardImagePopup._open).createCard())
    });

    return array;
  }

  const placesList = new CardList({
    container: placesListContainer,
    cards: createCardsArray
  });

  // добавление карточек по сабмиту форм и сброс валидации по закрытию

  cardsForm.addEventListener('submit', () => {
    event.preventDefault();
    api.addNewCard('cards', cardsForm.elements.name.value, cardsForm.elements.link.value)
      .then(res => {
        const newCard = new Card(
          cardTemplate,
          res.name,
          res.link,
          cardImagePopup._open);
        newCard.createCard();
        placesList.addCard(newCard.createCard());
        addCardPopup._close();
        cardsFormValidator.resetValidation();
        cardsFormValidator.setSubmitButtonState(false)

        cardsForm.reset();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })

  });

  closeAddCardPopup.addEventListener('click', () => {
    cardsFormValidator.resetValidation();
    cardsForm.reset();

  })

  // работа и информацией о пользователе

  const userData = new UserInfo({
    nameElem: document.querySelector('.user-info__name'),
    jobElem: document.querySelector('.user-info__job'),

  });

  // подгрузка информации о пользователе с сервера

  api.getUserInfo('users/me')
    .then((res) => {
      userData.setUserInfo(res.name, res.about)
      userData.updateRender()
      userInfoForm.user.value = userData.getUserInfo().name;
      userInfoForm.job.value = userData.getUserInfo().job;
      const avatar = document.querySelector('.user-info__photo')
      avatar.style.backgroundImage = `url(${res.avatar})`;

    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    });

  // обновление информации о пользователе при сабмите формы

  userInfoForm.addEventListener('submit', (event) => {
    event.preventDefault()
    api.editUserInfo('users/me', userInfoForm.user.value, userInfoForm.job.value)
      .then(res => {
        userData.setUserInfo(res.name, res.about);
        userData.updateRender();
        userInfoPopup._close()
        userInfoForm.reset()
        userInfoForm.user.value = userData.getUserInfo().name;
        userInfoForm.job.value = userData.getUserInfo().job;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  })


  closeUserInfoPopupButton.addEventListener('click', () => {
    userInfoFormValidator.resetValidation();
    userInfoForm.reset();
    const { name, job } = userData.getUserInfo();
    userInfoForm.user.value = name;
    userInfoForm.job.value = job;
    if (userInfoForm.user.value !== "" || userInfoForm.job.value !== "") {
      userInfoFormValidator.setSubmitButtonState(true)
    }
  })

})();

/** REVIEW:
 *
 * В целом по работе:
 *
 * Все критические ошибки были исправлены, отличная работа! Спасибо за усилия и старания, удачи в следующем спринте 
 * и успехов в дальнейшем обучении
 *
 * Можно лучше: 1) Вынести удаление обработчиков в отдельный метод, например _removeEventListeners в классе Card
 */

