import React, { useState } from "react";
import "../styles/profileForm.css";
import countries_obj from "../resources/files/countries.json";
import "../styles/buttons.css"

const ProfileForm = () => {
	const [countries] = useState(countries_obj.countries);
	const [languages] = useState([
		{ name: "Español", code: "es" },
		{ name: "Inglés", code: "en" },
		{ name: "Francés", code: "fr" },
	]);

	return (
		<div className="profileForm">
			<div className="inputContainer inputBox nameContainer">
				<label className="title" htmlFor="name-input">
					Nombre:
				</label>
				<input type="text" className="name" id="name-input" />
			</div>

			<div className="inputContainer inputBox ageContainer">
				<label className="title" htmlFor="age-input">
					Edad:
				</label>
				<input type="number" className="age" id="age-input" min={0} max={115} />
			</div>

			<div className="inputContainer inputBox nationalityContainer">
				<label className="title" htmlFor="nationality-input">
					País de origen:
				</label>
				<select className="age" id="nationality-input">
					{countries.map(elem => (
						<option value={elem.code} key={elem.code}>
							{elem.name_es}
						</option>
					))}
				</select>
			</div>

			<div className="inputContainer radio-container sexContainer">
				<label className="title ">Sexo:</label>
				<div>
					<input type="radio" name="sex-radio" value="M" id="masculine_radio" />
					<label htmlFor="masculine_radio">Masculino</label>
				</div>

				<div>
					<input type="radio" name="sex-radio" value="F" id="femenine_radio" />
					<label htmlFor="femenine_radio">Femenino</label>
				</div>
			</div>

			<div className="inputContainer inputBox languageContainer">
				<label className="title" htmlFor="language-input">
					Idioma materno:
				</label>
				<select id="language-input">
					{languages.map(elem => (
						<option value={elem.code} key={elem.code}>
							{elem.name}
						</option>
					))}
				</select>
			</div>


			<div className="buttonContainer">
				<button className="blue-button" >Enviar</button>
			</div>
					</div>
	);
};

export default ProfileForm;
