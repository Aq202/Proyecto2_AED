import React, { useState } from "react";
import TextBox from "./TextBox";

const MainCharacterTextBox = ({ defaultValue, name, onChange }) => {
	const [options, setOptions] = useState(null);
	const [abort, setAbort] = useState(null);

	const searchOptions = text => {
		//abort previous request
		abort?.abort();

		if (!(text?.trim().length > 0)) return setOptions(null); //eliminar opciones si el texto es ' '

		let abortController = new AbortController();
		setAbort(abortController);

		const url = `./searchMainCharacter?name=${text}`;
		let response;
		fetch(url, {
			signal: abortController.signal,
		})
			.then(r => {
				response = r;
				return r.json();
			})
			.then(result => {
				const { names: directors } = result;

				if (Array.isArray(directors) && directors.length > 0) setOptions(directors);
				else {
					setOptions(null);
				}
			})
			.catch(err => {
				setOptions(null);
				console.error("Error al solicitar lista de personajes principales: ", err);
			});
	};

	return (
		<TextBox
			defaultValue={defaultValue}
			onChange={onChange}
			name={name}
			options={options}
			searchOptions={searchOptions}
		/>
	);
};

export default MainCharacterTextBox;
