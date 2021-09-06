import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'


  constructor(private http: HttpClient) { }

  fetchByUsernameService(username) {
    const data = {
      username: username,
    }
    return this.http.post(`${this.uri}/users/fetchByUsername`, data);
  }

  fetchByTypeService(type) {
    const data = {
      type: type
    }
    return this.http.post(`${this.uri}/users/fetchByType`, data);
  }

  fetchByTypeAndCountryService(type, country) {
    const data = {
      type: type,
      country: country,
    }
    return this.http.post(`${this.uri}/users/fetchByTypeAndCountry`, data);
  }

  addUserService(username, password, firstname, lastname, country, email, type) {

    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      nationality: country,
      email: email,
      type: type,
      accepted: 0
    }

    return this.http.post(`${this.uri}/users/addUser`, data);
  }

  changePasswordByUsernameService(username, newPassword) {
    const data = {
      username: username,
      newPassword: newPassword,
    }

    return this.http.post(`${this.uri}/users/changePasswordByUsername`, data);

  }

  fetchUnacceptedUsersService() {
    return this.http.get(`${this.uri}/users/fetchUnacceptedUsers`);
  }

  acceptUserService(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/acceptUser`, data);

  }

}
