import React, { useEffect, useReducer, useRef, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Analysis from './Analysis';
import Playlists from './Playlists';
import useAuth from './useAuth';
import User from './User';

const CREDS = require('./credentials.json');

const spotifyApi = new SpotifyWebApi({
	clientId: CREDS.CLIENT_ID,
});

export const AnalyticsContext = React.createContext();

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);

	const [user_details, setUser] = useState();
	const [show_user, setUserVisibility] = useState(false);
	const [user_playlists, setPlaylists] = useState(null);
	const didLoad = useRef(false);
	const [current_subject, setSubject] = useState({});
	const topic = useRef('No selection');
	const topic_details = useRef('No selection');

	function lyticsReducer(state, action) {
		switch (action.type) {
			case 'playlist':
				state.target = action.payload.id;
				topic.current = 'Processing playlist... ';
				//the playlist we will be examining
				spotifyApi.getPlaylistTracks(state.target).then((target_tracks) => {
					let song_ids = []; //an array of ids of individual songs ids
					let song_names = [];
					target_tracks.body.items.forEach((song) => {
						song_ids.push(song.track.id);
						song_names.push(song.track.name);
					});
					//features is a spotify api specific term instead of properties
					spotifyApi.getAudioFeaturesForTracks(song_ids).then((e) => {
						topic.current = action.payload;
						topic_details.current = song_names;
						setSubject(e.body.audio_features);
					});
				});
				return { ...state };

			case 'song':
				state.target = action.payload.track.id;
				topic.current = 'Processing song... ';
				spotifyApi.getAudioFeaturesForTrack(state.target).then((e) => {
					topic.current = action.payload.track;
					setSubject(e.body);
				});
				return { ...state };

			default:
				return 'NEGATIVE';
		}
	}

	const [lyticState, dispatch] = useReducer(lyticsReducer, {
		target: null,
	});

	useEffect(() => {
		if (!accessToken) return;
		if (!didLoad.current) {
			spotifyApi.setAccessToken(accessToken);
			spotifyApi.getMe().then((data) => {
				setUser(data.body);
			});
			spotifyApi.getUserPlaylists({ limit: 5 }).then((data) => {
				setPlaylists(data.body.items);
			});
		}
		didLoad.current = true;
	}, [accessToken]);

	return (
		<AnalyticsContext.Provider value={{ lyticState, dispatch }}>
			<div className="access_codes" style={{ display: 'none' }}>
				Code: {code}
			</div>
			<div className="dashboard">
				<div>
					<button
						className="spotButton"
						onClick={() => setUserVisibility(!show_user)}
					>
						User
					</button>
				</div>
				<User userDetails={user_details} visibility={show_user} />
				<Analysis
					key={'TODO MAKE A KEY'}
					content={current_subject}
					topic={topic.current}
					details={topic_details.current}
				/>

				{user_playlists && (
					<Playlists playListArray={user_playlists} accessToken={accessToken} />
				)}
			</div>
		</AnalyticsContext.Provider>
	);
};

export default Dashboard;
