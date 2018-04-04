import Config from './config'
import AuthService from './auth.service'

export default class ApiService {

  static post(route, params) {
    return fetch(`${Config.api}/${route}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
    .then(res => {
      if (res.status === 400) {
        return res.json().then(error => ({ error: error }));
      }
      return res.json()
    });
  }

  static get(route) {
    const auth = AuthService.getCredentials();
    const token = auth.token;
      
    return fetch(`${Config.api}/${route}`, {
      method: 'GET',
      headers: {
        'x-access-token': token, 
      }
    })
    .then(res => {
      if (res.status >= 400) {
        return res.json().then(error => ({ error: error }));
      } else {
        return res.json();
      }
    });
  }
}