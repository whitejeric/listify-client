import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import ActivePlaylist from './ActivePlaylist';
import IndividualPlaylist from './IndividualPlaylist';

const CREDS = require('./credentials.json');

const spotifyApi = new SpotifyWebApi({
	clientId: CREDS.CLIENT_ID,
});

/**
 * TODO add functioning to grab ALL playlists of user, can use:
 * const [state, setState] = useState({});
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
 * @author EW
 * @date 2023-01-25
 * @param { playListArray, accessToken } parm1
 */
const Playlists = ({ playListArray, accessToken }) => {
	const [currentTracks, setCurrentTracks] = useState(null);
	const [selectedPlaylist, selectPlaylist] = useState(null);

	useEffect(() => {
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!selectedPlaylist) return;
		// ! console.log('selectedPlaylist in Playlists.js: ', selectedPlaylist);
		let play_track_uri = selectedPlaylist.uri.split(':')[2];
		spotifyApi.getPlaylistTracks(play_track_uri).then((playlist_tracks) => {
			setCurrentTracks(playlist_tracks.body.items);
		});
	}, [selectedPlaylist]);

	useEffect(() => {
		if (!currentTracks) return;
		// ! console.log('currentTracks in Playlists.js', currentTracks);
	}, [currentTracks]);

	return (
		<div className="playListModule">
			<div className="playlists-grid">
				<h4>User Playlists</h4>
				{playListArray.map((e) => {
					return (
						<IndividualPlaylist
							spotify_playlist={e}
							key={e.uri}
							select={() => selectPlaylist(e)}
							is_selected={selectedPlaylist === e}
						/>
					);
				})}
			</div>
			<div className="activePlaylist">
				{currentTracks ? (
					<ActivePlaylist playlist={selectedPlaylist} tracks={currentTracks} />
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Playlists;
