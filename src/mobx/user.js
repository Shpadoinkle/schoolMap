import { observable, computed, action } from "mobx";
// import decode from 'jwt-decode'
import { create, persist } from "mobx-persist";
import localForage from "localforage";

// class User {
//   @persist
//   @observable
//   id = ''
// }

class UserStore {
  @observable hydrated = false;

  @persist
  @observable
  token = null;

  @persist
  @observable
  refreshToken = null;

  //   @persist('object', User)
  //   @observable
  //   _user

  //   @computed
  //   get user() {
  //     const decoded = decode(this.token)

  //     if (!this._user) {
  //       let u = new User()
  //       u.userId = decoded.sub
  //       return u
  //     }

  //     return this._user
  //   }

  @computed
  get isLoggedIn() {
    return !!this.token;
  }

  @action
  setToken(token) {
    this.token = token;
  }

  @action
  setRefreshToken(token) {
    this.refreshToken = token;
  }

  @action
  setUser(user) {
    this.user = user;
  }

  @action
  logout() {
    this.token = "";
    // this.user = null
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false
});

// create the state
const userStore = new UserStore();

hydrate("user", userStore).then(() => {
  userStore.hydrated = true;
});

export default userStore;
