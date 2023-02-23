const CREDS = require('./credentials.json');

const authEndpoint = CREDS.AUTH_ENDPOINT;
const redirectUri = CREDS.REDIRECT_URI;
const clientId = CREDS.CLIENT_ID;

const scopes = [
	'streaming',
	'user-read-email',
	'user-read-private',
	'playlist-read-private',
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}`;
