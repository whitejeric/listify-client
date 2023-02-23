import React from 'react';
import Song from './Song';

const ActivePlaylist = ({ playlist, tracks }) => {
	return (
		<div>
			<h4>{playlist.name}</h4>
			<div className="songBox">
				<div>#</div>
				<div></div>
				<div>Song:</div>
				<div>Artist:</div>
				<div>Album:</div>
				<div>Duration:</div>
			</div>
			{tracks.map((e, i) => {
				return <Song song_data={e} key={e.track.uri} index={i} />;
			})}
		</div>
	);
};

export default ActivePlaylist;
