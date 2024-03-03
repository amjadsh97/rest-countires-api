import React, {useEffect, useState} from 'react';
import {arrowLeft, searchIcon} from "../../asstes/icons"
import {Select, Spin} from "antd";
import "./style.css"

const options = [
	{
		value: 'Africa',
		label: 'Africa',
	},
	{
		value: 'Americas',
		label: 'America',
	},
	{
		value: 'Asia',
		label: 'Asia',
	},
	{
		value: "Europe",
		label: 'Europe',
	},
	{
		value: 'Oceania',
		label: 'Oceania',
	},
]
const Main = () => {
	const [region, setRegion] = useState(null)
	const [countries, setCountries] = useState([])
	const [searchedValue, setSearchedValue] = useState("")
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [showCountryPage, setShowCountryPage] = useState(false)
	const [selectedCountry, setSelectedCountry] = useState({})
	const handleChange = (value) => {
		setRegion(value)
		const newList = countries.filter(item => item.region === value)
		setFilteredCountries(newList); // Update the filtered list of countries
	};

	const handleShowCountry = (country) => {
		console.log({country})
		setSelectedCountry(country)
		setShowCountryPage(true)
	}
	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				setCountries(data)
				setFilteredCountries(data);
			})
			.catch(error => {
				console.error('There was a problem with your fetch operation:', error);
			});
	}, [])

	useEffect(() => {
		const newList = countries.filter(country => {
			const countryName = country.name.common.toLowerCase();
			const searchedValueLowerCase = searchedValue.toLowerCase();

			if (countryName.startsWith('isr')) {
				return false;
			}
			return countryName.includes(searchedValueLowerCase);
		});
		setFilteredCountries(newList)
		setRegion(null)
	}, [searchedValue])


	if (countries.length === 0) {
		return <div className={'spin-wrapper'}><Spin size="large"/></div>
	}

	return (
		<main className='main'>
			<div className="main-container">
				<div className={`outer-wrapper ${!showCountryPage ? '' : 'd-none'}`}>
					<div className="control-wrapper">
						<div className="search-wrapper">
							<label htmlFor="search">
								<div className="icon">
									{searchIcon}
								</div>
								<input onChange={e => setSearchedValue(e.target.value)} value={searchedValue}
								       placeholder='Search for a country'
								       type="search" name="search" id="search"/>
							</label>
						</div>
						<Select
							style={{width: 200, height: 60}}
							clearBg={"red"}
							placeholder={"Filter By region"}
							onChange={handleChange}
							options={options}
							value={region}
						/>
					</div>
					<div className={`countries-wrapper ${filteredCountries.length < 10 ? 'filtered-layout' : ''}`}>
						{filteredCountries.length === 0 && <h1 style={{fontSize: "5rem"}}>No results</h1>}
						{filteredCountries.length && filteredCountries.map(country => (
							<article className="country-item" onClick={() => handleShowCountry(country)}>
								<div className="image-wrapper">
									<img src={country.flags.png} alt="country image"/>
								</div>
								<div className="country-wrapper">
									<h2 className='country-name'>{country.name.common}</h2>
									<ul className="country-details">
										<li className='item'>
											<span className='item-key'>Population:</span>
											<span className='item-value'>{country.population}</span>
										</li>
										<li className='item'>
											<span className='item-key'>Region:</span>
											<span className='item-value'>{country.region}</span>
										</li>
										<li className='item'>
											<span className='item-key'>Capital:</span>
											<span className='item-value'>{country.capital}</span>
										</li>
									</ul>
								</div>
							</article>
						))}
					</div>
				</div>

				<div className={`outer-wrapper ${showCountryPage ? '' : 'd-none'}`}>
					<div className='country-page'>
						<button className='button back-button' onClick={() => setShowCountryPage(false)}>
							<div className="icon">
								{arrowLeft}
							</div>
							<span>Back</span>
						</button>
						<div className="country-details-wrapper">
							<div className="flag">
								<img src={selectedCountry?.flags?.png} alt="flag"/>
							</div>
							<div className="country-data">
								<h2 className='country-name'>{selectedCountry?.name?.common}</h2>
								<div className="list-row">
									<ul className="list-items">
										<li className="item">
											<span className='key'>Native name:</span>
											<span className='value'>{selectedCountry?.name?.nativeName?.eng?.official}</span>
										</li>
										<li className="item">
											<span className='key'>Population:</span>
											<span className='value'>{selectedCountry?.population}</span>
										</li>
										<li className="item">
											<span className='key'>Region:</span>
											<span className='value'>{selectedCountry?.region}</span>
										</li>
										<li className="item">
											<span className='key'>Sub region:</span>
											<span className='value'> {selectedCountry?.subregion}</span></li>
										<li className="item">
											<span className='key'>Capital:</span>
											<span className='value'> {selectedCountry?.capital}</span>
										</li>
									</ul>
									<ul className="list-items">
										<li className="item">
											<span className='key'>Top level domain:</span>
											<span className='value'>{selectedCountry?.tld}</span>
										</li>
										{selectedCountry?.currencies ?
											<li className="item currencies">Currencies: {Object.keys(selectedCountry?.currencies).map(code =>
												<span>{selectedCountry?.currencies[code].name}</span>)}
											</li> : ""}

										{selectedCountry?.languages ? <li className="item">Languages: <ul className='languages'>
											{Object.keys(selectedCountry?.languages).map(code => (
												<li key={code}>
													{selectedCountry?.languages[code]},
												</li>
											))}
										</ul>
										</li> : ""}


									</ul>
								</div>

								<div className="border-countries">
									<p className='title'>Border countries:</p>
									{selectedCountry?.borders ? <div className="border-countries-wrapper">
										{selectedCountry?.borders.map(border => (
											<span className='border-country-item'>{border}</span>
										))}
									</div> : ""}


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</main>
	);
};

export default Main;
