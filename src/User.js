import React from 'react';

const User = ({ userDetails, visibility }) => {
	return (
		<div id="user_box">
			{visibility ? (
				<div className="grid">
					<div>
						<p>{userDetails.display_name}</p>
						<p>{userDetails.country}</p>
						<p>
							<a href={userDetails.external_urls.spotify}>Profile</a>
						</p>
						<p>API: {userDetails.href}</p>
						<p>ID: {userDetails.id}</p>
						<p>Account: {userDetails.product}</p>
						<p>URI: {userDetails.uri}</p>
					</div>
					<img id="user_image" alt="" src={userDetails.images[0].url} />
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default User;
