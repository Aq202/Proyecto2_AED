import React, { useState, useEffect } from "react";
import "../styles/profileForm.css";
import countries_obj from "../resources/files/countries.json";
import "../styles/buttons.css";
import "../styles/variables.css";
import { usePopUp } from "./hooks/usePopUp";
import Notification from "./Notification";
import errorImage from "../resources/icons/failure.svg";
import successImage from "../resources/icons/success.svg";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";

const ProfileForm = () => {
	const [form, setForm] = useState({});
	const [countries] = useState(countries_obj.countries);
	const [languages] = useState([
		{ name: "Español", code: "es" },
		{ name: "Inglés", code: "en" },
		{ name: "Francés", code: "fr" },
	]);
	const [error, setError] = useState(null);
	const [fatalError, setFatalError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showButton, setShowButton] = useState(true);

	const [isSuccessOpen, openSuccess, closeSuccess] = usePopUp();
	const [isErrorOpen, openError, closeError] = usePopUp();

	//Seleccionar país por defecto
	useEffect(() => {
		setForm(lastForm => ({
			...lastForm,
			nationality: countries[0].name_en,
		}));
	}, [countries]);

	//seleccionar idioma por defecto
	useEffect(() => {
		setForm(lastForm => ({
			...lastForm,
			language: languages[0].code,
		}));
	}, [languages]);

	const handleChange = e => {
		if (e.target.name === undefined || e.target.name === null) return;
		setForm(lastForm => ({
			...lastForm,
			[e.target.name]: e.target.value.trim(),
		}));
	};

	const succesfulRegistrationCallback = () => {
		alert("Abriendo siguiente ");
	};

	const handleSubmit = async e => {
		e.preventDefault();

		//validaciones
		if (!form.hasOwnProperty("name") || form.name === null || form.name?.trim() === "")
			return setError("La casilla 'Nombre' es obligatoria.");
		else if (
			!form.hasOwnProperty("nationality") ||
			form.nationality === null ||
			form.nationality?.trim() === ""
		)
			return setError("La casilla 'País de orígen' es obligatoria.");
		else if (
			!form.hasOwnProperty("language") ||
			form.language === null ||
			form.language?.trim() === ""
		)
			return setError("La casilla 'Idioma materno' es obligatoria.");
		else if (
			!form.hasOwnProperty("birthday") ||
			form.birthday === null ||
			form.birthday?.trim() === ""
		)
			return setError("La casilla 'Fecha de nacimiento' es obligatoria.");
		else if (isNaN(Date.parse(form.birthday)))
			return setError("La fecha de nacimiento ingresada es inválida.");
		else if (
			!form.hasOwnProperty("sex") ||
			form.sex === null ||
			(form.sex?.trim() !== "M" && form.sex?.trim() !== "F" && form.sex?.trim() !== "X")
		)
			return setError("La casilla 'Sexo' es obligatoria.");
		else setError(null); // limpiar error

		const data = { ...form };

		//extraer año de nacimiento
		data.birthYear = new Date(data.birthday).getFullYear();
		delete data.birthday;

		//deshabilitar botón y mostrar spinner
		setShowButton(false);
		setIsLoading(true);

		//realizar consulta
		let response;
		let url = "./createUser?" + new URLSearchParams(data).toString();

		fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(r => {
				response = r;
				return r.json();
			})
			.then(result => {
				setIsLoading(false);

				if (response.ok === true) {
					//store user information
					sessionStorage.setItem("userData", {
						id: result?.userId,
						name: data.name,
					});

					openSuccess(); //Success notification
				} else throw null;
			})
			.catch(err => {
				setShowButton(true);
				openError();
			});
	};

	return (
		<div className="profileForm">
			<form>
				<div className="inputContainer inputBox nameContainer">
					<label className="title" htmlFor="name-input">
						Nombre:
					</label>
					<input
						type="text"
						className="name"
						id="name-input"
						name="name"
						onChange={handleChange}
						defaultValue={form.name}
					/>
				</div>

				<div className="inputContainer inputBox birthdayContainer">
					<label className="title" htmlFor="birthday-input">
						Fecha de nacimiento:
					</label>
					<input
						type="date"
						className="birthday"
						id="birthday-input"
						min={0}
						max={115}
						name="birthday"
						onChange={handleChange}
						defaultValue={form.birthday}
					/>
				</div>

				<div className="inputContainer inputBox nationalityContainer">
					<label className="title" htmlFor="nationality-input">
						País de origen:
					</label>
					<select
						className="nationality"
						id="nationality-input"
						name="nationality"
						onChange={handleChange}
						defaultValue={form.nationality}>
						{countries.map(elem => (
							<option value={elem.code} key={elem.code}>
								{elem.name_es}
							</option>
						))}
					</select>
				</div>

				<div className="inputContainer sexContainer">
					<label className="title ">Sexo:</label>
					<div className="radio-container">
						<div>
							<input
								type="radio"
								value="M"
								id="masculine_radio"
								name="sex"
								onChange={handleChange}
								defaultChecked={form.sex === "M"}
							/>
							<label htmlFor="masculine_radio">Masculino</label>
						</div>

						<div>
							<input
								type="radio"
								value="F"
								id="femenine_radio"
								name="sex"
								onChange={handleChange}
								defaultChecked={form.sex === "F"}
							/>
							<label htmlFor="femenine_radio">Femenino</label>
						</div>

						<div>
							<input
								type="radio"
								value="X"
								id="other_radio"
								name="sex"
								onChange={handleChange}
								defaultChecked={form.sex === "X"}
							/>
							<label htmlFor="other_radio">Otro</label>
						</div>
					</div>
				</div>

				<div className="inputContainer inputBox languageContainer">
					<label className="title" htmlFor="language-input">
						Idioma materno:
					</label>
					<select
						id="language-input"
						name="language"
						onChange={handleChange}
						defaultValue={form.language}>
						{languages.map(elem => (
							<option value={elem.code} key={elem.code}>
								{elem.name}
							</option>
						))}
					</select>
				</div>

				<div className="buttonContainer">
					{showButton ? (
						<button className="blue-button" onClick={handleSubmit}>
							Enviar
						</button>
					) : null}

					{isLoading ? <Spinner /> : null}
				</div>

				{error ? <p className="error-message">Error: {error}</p> : null}
			</form>

			{isSuccessOpen
				? ReactDOM.createPortal(
						<Notification
							close={closeSuccess}
							image={successImage}
							title={"Operación realizada con éxito"}
							text={"Tu usuario se ha registrado correctamente!"}
							callback={succesfulRegistrationCallback}
						/>,
						document.querySelector("body")
				  )
				: null}

			{isErrorOpen
				? ReactDOM.createPortal(
						<Notification
							close={closeError}
							image={errorImage}
							title={"Ocurrió un error"}
							text={"Ocurrió un error en el servidor."}
						/>,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
};

export default ProfileForm;
