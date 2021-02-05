export const API_ENDPOINT = 'http://127.0.0.1:8000';

// players service
export const PLAYERS_SERVICE = `${API_ENDPOINT}/players`;
export const REGISTER_USER_ENDPOINT = `${PLAYERS_SERVICE}/register`;
export const LOGIN_ENDPOINT = `${PLAYERS_SERVICE}/login`;
export const LOGOUT_ENDPOINT = `${PLAYERS_SERVICE}/logout`;
export const PASSWORD_SERVICE = `${PLAYERS_SERVICE}/password`;
