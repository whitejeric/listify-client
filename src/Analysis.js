import React, { useEffect, useRef, useState } from 'react';
import SpotGraph from './SpotGraph';
import SpotRadar from './SpotRadar';

const Analysis = ({ content, topic, details }) => {
	const refined_content = useRef({ averages: null, timeline: null });
	const hasBeenParsed = useRef(false);
	const isPlaylist = useRef(false);
	const [graph_type, setGraphType] = useState('danceability:energy');

	function parse(data) {
		console.log({ topic });
		console.log({ details });
		let averages = {};
		let timeline = {};
		if (!data) return;
		let total_num_songs = data.length;
		let graph_data = Array(total_num_songs);
		data.forEach((song, index) => {
			let song_metrics = Object.entries(song);
			let graph_point = {};
			graph_point['name'] = String(details[index]);
			song_metrics.map(([key, value]) => {
				if (!isNaN(value)) {
					graph_point[key] = Math.abs(value);
					averages[key]
						? (averages[key] += value / total_num_songs)
						: (averages[key] = value / total_num_songs);
					timeline[key]
						? timeline[key].push(Math.abs(value))
						: (timeline[key] = [Math.abs(value)]);
				}
				return null;
			});
			graph_data[index] = graph_point;
		});
		let radial_data = [];

		if (averages) {
			Object.entries(averages).map(([key, v]) => {
				switch (String(key)) {
					case 'key':
						break;
					case 'mode':
						break;
					case 'loudness':
						break;
					case 'speechiness':
						break;
					case 'liveness':
						break;
					case 'tempo':
						radial_data.push({
							subject: key,
							value: v / 200,
						});
						break;
					case 'time_signature':
						break;
					case 'duration_ms':
						break;
					case 'acousticness':
						break;
					default:
						radial_data.push({
							subject: key,
							value: v,
						});
						break;
				}
			});
		}

		refined_content.current = { averages, timeline, graph_data, radial_data };
		hasBeenParsed.current = true;
	}

	function dropDownItems() {
		return (
			<div className="playlistDropDownMenu">
				<button onClick={() => setGraphType('danceability:energy')}>
					Energy
				</button>
				<button onClick={() => setGraphType('key:mode')}>Key</button>
				<button onClick={() => setGraphType('loudness:valence')}>Mood</button>
				<button onClick={() => setGraphType('acousticness:liveness')}>
					Liveness
				</button>
				<button onClick={() => setGraphType('instrumentalness:speechiness')}>
					Instrumentalness
				</button>
				<button onClick={() => setGraphType('time_signature:tempo')}>
					Tempo/Meter
				</button>
			</div>
		);
	}

	useEffect(() => {
		// console.log('useEffect in Analyis:', content);
		if (topic === 'No selection') return;
		if (content.length) {
			//has morse than one element ie is a playlist
			parse(content);
			isPlaylist.current = true;
		} else {
			parse([content]);
			isPlaylist.current = false;
		}
	}, [content, parse]);
	return (
		<div id="analysis">
			<h2>{topic.name}</h2>
			<div className="analysisModule">
				<div className="playlistGraph">
					{hasBeenParsed.current && isPlaylist.current && (
						<>
							<div className="graphOptions">{dropDownItems()}</div>
							<SpotGraph
								data={refined_content.current.graph_data}
								data_key={graph_type}
							/>
						</>
					)}

					{/* Timeline Graph: {JSON.stringify(refined_content.current.timeline)} */}
				</div>
				<div className="radialGraph">
					{/* <button onClick={() => nextFeature()}></button> */}
					{/* Averages Radial: {JSON.stringify(refined_content.current.averages)} */}
					<SpotRadar data={refined_content.current.radial_data} />
				</div>
			</div>
		</div>
	);
};

export default Analysis;
