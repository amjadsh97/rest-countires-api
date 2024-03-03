import React from 'react';
import Header from "./components/Header";
import "./styles/reset.css"
import './styles/App.css';
import {Select, Space} from 'antd';
import searchIcon from "./asstes/icons/search.svg"
import Main from "./components/Main";



function App() {

	return (
		<div className="app">
			<Header/>
			<Main/>

		</div>
	);
}

export default App;