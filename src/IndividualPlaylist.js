import React, { useContext } from 'react';
import { AnalyticsContext } from './Dashboard';

const IndividualPlaylist = ({ spotify_playlist, select, is_selected }) => {
	const { dispatch } = useContext(AnalyticsContext);
	const handleClick = () => {
		select();
		dispatch({ type: 'playlist', payload: spotify_playlist });
	};
	return (
		<figure
			onClick={handleClick}
			style={is_selected ? { backgroundColor: 'aqua' } : {}}
		>
			<img
				src={spotify_playlist.images[0].url}
				className="playlistCoverPhoto"
				alt={spotify_playlist.name}
			/>
			<figcaption>{spotify_playlist.name}</figcaption>
		</figure>
	);
};

export default IndividualPlaylist;
