import Dashboard from './Dashboard';
import Login from './Login';

const code = new URLSearchParams(window.location.search).get('code');
//window.location.search returns only query params ie after ?

function App() {
	return (
		<div className="App">
			{code ? <Dashboard code={code} key={'main_module'} /> : <Login />}
		</div>
	);
}

export default App;
