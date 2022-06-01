import React, { useState } from "react";
import TextBox from "./TextBox";

const GenreTextBox = ({ defaultValue, name, onChange, id, value }) => {
	const [options, setOptions] = useState(null);
	const [abort, setAbort] = useState(null);

	const searchOptions = text => {
		//abort previous request
		abort?.abort();

		if (!(text?.trim().length > 0)) return setOptions(null); //eliminar opciones si el texto es ' '

		let abortController = new AbortController();
		setAbort(abortController);

		const url = `./searchGenres?name=${text}`;
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
			id={id}
			defaultValue={defaultValue}
			onChange={onChange}
			name={name}
			options={options}
			searchOptions={searchOptions}
			value={value}
		/>
	);
};

export default GenreTextBox;
