
export default class AuthService {

	static saveCredentials(token, username, _id) {
		window.localStorage.setItem('auth', JSON.stringify({
			token: token,
			username: username,
			_id: _id
		}));
	}

	static getCredentials() {
		return JSON.parse(window.localStorage.getItem('auth'));
	}

	static hasCredentials() {
		return window.localStorage.getItem('auth') !== null;
	}

	static deleteCredentials() {
		window.localStorage.removeItem('auth');
	}

	static getUsername() {
		return this.hasCredentials()
			? this.getCredentials().username
			: 'Stranger';
	}

	static doLogin() {
		this.deleteCredentials();
		window.location.href = "/auth";
	}
}