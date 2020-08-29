export default class UserInfo {
  constructor({ nameElem, jobElem }) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
    this._userName = '';
    this._userJob = '';
  }

  setUserInfo = (name, job) => {

    this._userName = name;
    this._userJob = job;
  }

  updateRender = () => {
    this._nameElem.textContent = this._userName;
    this._jobElem.textContent = this._userJob;

  }

  getUserInfo = () => {
    return {
      name: this._userName,
      job: this._userJob
    }
  }
}
