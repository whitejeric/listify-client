import React from 'react';
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from 'recharts';

const SpotRadar = ({ data }) => {
	return (
		<ResponsiveContainer minHeight={200} minWidth={50}>
			<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
				<PolarGrid />
				<PolarAngleAxis dataKey="subject" />
				<PolarRadiusAxis domain={[0, 1]} />
				<Radar
					name="s"
					dataKey="value"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</ResponsiveContainer>
	);
};

export default SpotRadar;
