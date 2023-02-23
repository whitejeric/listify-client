import React from 'react';
import { loginUrl } from './spotify';

function Login() {
	return (
		<div className="login">
			<img
				src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
				alt="Spotify-Logo"
			/>
			<br />
			<a href={loginUrl}>
				<button className="spotButton">LOGIN</button>
			</a>
		</div>
	);
}

export default Login;
