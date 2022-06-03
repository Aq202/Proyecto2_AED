import React, { useState, useEffect } from "react";
import "../styles/newMovieForm.css";
import countries_obj from "../resources/files/countries.json";
import "../styles/buttons.css";
import "../styles/variables.css";
import { usePopUp } from "./hooks/usePopUp";
import Notification from "./Notification";
import errorImage from "../resources/icons/failure.svg";
import successImage from "../resources/icons/success.svg";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import InstructionsPopUp from "./InstructionsPopUp";
import DirectorsTextBox from "./DirectorsTextBox";
import MainCharacterTextBox from "./MainCharacterTextBox";
import GenreTextBox from "./GenreTextBox";
import uniqid from "uniqid";

const NewMovieForm = () => {
	const [form, setForm] = useState({});
	const [countries] = useState(countries_obj.countries);
	const [languages] = useState([
		{ name: "Español", code: "es" },
		{ name: "Inglés", code: "en" },
		{ name: "Francés", code: "fr" },
	]);
	const [years, setYears] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showButton, setShowButton] = useState(true);

	const [isSuccessOpen, openSuccess, closeSuccess] = usePopUp();
	const [isErrorOpen, openError, closeError] = usePopUp();

	//calcular años desde 1900
	useEffect(() => {
		let yearsValues = [];
		const currentYear = parseInt(new Date().getFullYear());

		for (let year = currentYear; year >= 1900; year -= 1) {
			yearsValues.push(year);
		}

		setYears(yearsValues);
	}, []);

	const handleChange = e => {
		if (e.target.name === undefined || e.target.name === null) return;
		setForm(lastForm => ({
			...lastForm,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();

		setError(null);

		//validaciones
		const data = { ...form };
		const {
			title,
			duration,
			director,
			country,
			mainCharacter,
			releaseYear,
			language,
			genre,
			imageUrl,
		} = data;

		if (!(title?.trim().length > 0)) return setError("La casilla 'título' es obligatoria.");
		if (!(director?.trim().length > 0)) return setError("La casilla 'director' es obligatoria.");
		if (!(country?.trim().length > 0))
			return setError("La casilla 'país de origen' es obligatoria.");
		if (!(mainCharacter?.trim().length > 0))
			return setError("La casilla 'actor principal' es obligatoria.");
		if (!(language?.trim().length > 0)) return setError("La casilla 'idioma' es obligatoria.");
		if (!(genre?.trim().length > 0)) return setError("La casilla 'género' es obligatoria.");
		if (isNaN(duration)) return setError("La casilla 'duración' es obligatoria.");
		if (isNaN(releaseYear)) return setError("La casilla 'año' es obligatoria.");

		//retirar parametro de imagen si no se ingresó
		if (!(imageUrl?.trim().length > 0)) delete data.imageUrl;

		//deshabilitar botón y mostrar spinner
		setShowButton(false);
		setIsLoading(true);

		//realizar consulta
		let response;
		let url = "./createMovie?" + new URLSearchParams(data).toString();

		fetch(url)
			.then(r => {
				response = r;
				return r.json();
			})
			.then(result => {
				if (response.ok === true) {
					setIsLoading(false);
					openSuccess(); //Success notification
				} else throw null;
			})
			.catch(err => {
				setIsLoading(false);
				setShowButton(true);
				openError();
			});
	};

	const successCallBack = () => {
		//habilitar formulario de nuevo
		setShowButton(true);
		setForm({});
	};

	//prevenir envio de formulario al presionar enter
	const handleFormKeyDown = e => {
		if (e.keyCode === 13) e.preventDefault(); //enter
	};

	return (
		<div className="newMovieForm">
			<form onKeyDown={handleFormKeyDown}>
				<div className="inputContainer inputBox title-container">
					<label className="title" htmlFor="title-input">
						Título:
					</label>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						value={form.title ?? ""}
						id="title-input"
					/>
				</div>

				<div className="inputContainer inputBox director-container">
					<label className="title" htmlFor="director-input">
						Director:
					</label>
					<DirectorsTextBox
						name="director"
						onChange={handleChange}
						value={form.director ?? ""}
						id="director-input"
					/>
				</div>

				<div className="inputContainer inputBox mainCharacter-container">
					<label className="title" htmlFor="mc-input">
						Actor Principal:
					</label>
					<MainCharacterTextBox
						name="mainCharacter"
						onChange={handleChange}
						value={form.mainCharacter ?? ""}
						id="mc-input"
					/>
				</div>

				<div className="inputContainer inputBox genre-container">
					<label className="title" htmlFor="genre-input">
						Género:
					</label>
					<GenreTextBox
						name="genre"
						onChange={handleChange}
						value={form.genre ?? ""}
						id="genre-input"
					/>
				</div>

				<div className="inputContainer inputBox country-container">
					<label className="title" htmlFor="country-input">
						País de origen:
					</label>
					<select id="country-input" name="country" onChange={handleChange} value={form.country}>
						{countries.map(elem => (
							<option value={elem.code} key={elem.code}>
								{elem.name_es}
							</option>
						))}
					</select>
				</div>

				<div className="inputContainer inputBox language-container">
					<label className="title" htmlFor="language-input">
						Idioma:
					</label>
					<select id="language-input" name="language" onChange={handleChange} value={form.language}>
						{languages.map(elem => (
							<option value={elem.code} key={elem.code}>
								{elem.name}
							</option>
						))}
					</select>
				</div>

				<div className="inputContainer inputBox image-container">
					<label className="title" htmlFor="image-input">
						Imagen:
					</label>
					<input
						placeholder="http://example.com/image.jpg"
						type="url"
						name="imageUrl"
						onChange={handleChange}
						value={form.imageUrl ?? ""}
						id="image-input"
					/>
				</div>

				<div className="shortInput-container">
					<div className="inputContainer inputBox releaseYear-container shortInput">
						<label className="title" htmlFor="releaseYear-input">
							Año:
						</label>
						<select
							id="releaseYear-input"
							name="releaseYear"
							onChange={handleChange}
							value={form.releaseYear}>
							{years?.map(year => (
								<option value={year} key={uniqid()}>
									{year}
								</option>
							))}
						</select>
					</div>

					<div className="inputContainer inputBox duration-container shortInput">
						<label className="title" htmlFor="duration-input">
							Duración:
						</label>
						<input
							type="number"
							placeholder="Minutos"
							name="duration"
							onChange={handleChange}
							value={form.duration ?? ""}
							id="duration-input"
							min={1}
						/>
					</div>
				</div>
				<div className="buttonContainer">
					{showButton ? (
						<button className="blue-button" onClick={handleSubmit}>
							{form.id ? "Actualizar" : "Enviar"}
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
							text={
								"La película se ha registrado correctamente! Puedes ingresar cuantas películas desees."
							}
							callback={successCallBack}
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

export default NewMovieForm;
