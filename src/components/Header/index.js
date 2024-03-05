import React, {useEffect, useState} from 'react';
import {arrowLeft, moonIcon} from "../../asstes/icons";
import "./style.css"

const Header = () => {
	const storedTheme = localStorage.hasOwnProperty("theme") ? localStorage.getItem("theme"):localStorage.setItem("theme", "light")
	const [currentTheme, setCurrentTheme] = useState(storedTheme)
	const handleChangeTheme = () => {
		if (currentTheme === "light") {
			setCurrentTheme("dark")
			localStorage.setItem("theme", "dark")
		} else {
			setCurrentTheme("light")
			localStorage.setItem("theme", "light")
		}
	}

	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			document.querySelector("body").classList.add("is-dark")
		} else {
			document.querySelector("body").classList.remove("is-dark")
		}
	}, [currentTheme])

	return (
		<div>
			<header className="header">
				<h1 className='header-title'>Where in the world?</h1>
				<button onClick={handleChangeTheme} className="button theme-button">
					<span className="icon">
						{moonIcon}
					</span>
					<span className='button-text'>Dark mode</span>
				</button>
			</header>
		</div>
	);
};

export default Header;
