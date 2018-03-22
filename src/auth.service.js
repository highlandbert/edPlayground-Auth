
export default class AuthService {

    static saveCredentials(token) {
        window.localStorage.setItem('auth-token', token);
    }

    static hasCredentials() {
        return window.localStorage.getItem('auth-token') !== null;
    }

    static deleteCredentials() {
        window.localStorage.removeItem('auth-token');
    }

    static saveUsername(name) {
        window.localStorage.setItem('username', name);
    }

    static getUsername() {
        return window.localStorage.getItem('username') || 'Stranger';
    }
}