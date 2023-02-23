import React from 'react';
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const majorKeys = [
	'C',
	'Db',
	'D',
	'Eb',
	'E',
	'F',
	'Gb',
	'G',
	'Ab',
	'A',
	'Bb',
	'B',
];
const minorKeys = [
	'Cm',
	'C#m',
	'Dm',
	'Ebm',
	'Em',
	'Fm',
	'F#m',
	'Gm',
	'G#m',
	'Am',
	'Bbm',
	'Bm',
];

/**
 * Creates a linegraph depicting Spotify feature data for a given playlist
 * @author EW
 * @date 2023-02-04
 * @param {object} data contains the retrieved and formatted json data from the API request
 * @param {string} data_key a string denoting which Spotify feature(s) to be rendered
 */
const SpotGraph = ({ data, data_key }) => {
	return (
		<ResponsiveContainer minHeight={200} minWidth={50} aspect={16 / 9}>
			<LineChart
				width={100}
				height={100}
				data={data}
				margin={{
					top: 10,
					right: 0,
					left: 0,
					bottom: 0,
				}}
			>
				{/* <CartesianGrid /> */}
				<XAxis dataKey={{ data_key }} label={data_key} />
				<YAxis hide />
				<>
					<Line
						type="monotone"
						dataKey="name"
						stackId="0"
						stroke="#82ca9d"
						fill="#82ca9d"
					/>
					<Line
						type="monotone"
						dataKey={data_key.split(':')[0]}
						stackId="1"
						stroke="#82ca9d"
						fill="#82ca9d"
					/>
					<Line
						type="monotone"
						dataKey={data_key.split(':')[1]}
						stackId="1"
						stroke="#82cccc"
						fill="#82cccc"
					/>
				</>

				<Tooltip position={{ x: 0, y: 10 }} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default SpotGraph;
