import axios from 'axios';
import { useEffect, useState } from 'react';
const CREDS = require('./credentials.json');

const API_URL = CREDS.API_URL;

//useEffect to listen for the code being dropped to dom, tosses to our server
//to get our access token
export default function useAuth(CODE_FROM_DOM) {
	const [accessToken, setAccessToken] = useState();

	useEffect(() => {
		axios
			.post(API_URL, { code: CODE_FROM_DOM })
			.then((response) => {
				// If success then cut the code string from the URL and execute the other thing
				window.history.pushState({}, null, '/');
				setAccessToken(response.data.accessToken);
			})
			.catch((err) => {
				console.log(err);
				//TODO fix random error being caught
				//   If fail redirect to home page - Login page
				// window.location = '/';
			});
	}, [CODE_FROM_DOM]);
	//[code]:= if code changes post component mount the function is called again

	return accessToken;
}
