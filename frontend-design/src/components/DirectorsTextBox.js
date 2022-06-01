import React, { useState } from "react";
import TextBox from "./TextBox";
import uniqid from "uniqid";

const DirectorsTextBox = ({ defaultValue, onChange, name }) => {
	const [options, setOptions] = useState(null);
	const [abort, setAbort] = useState(null);

	const searchDirectorsOptions = text => {
		//abort previous request
		abort?.abort();
		if (!text?.trim()) return;
		setTimeout(() => {
			setOptions([uniqid(), uniqid(), uniqid(), uniqid()]);
		}, 500);
	};

	return (
		<TextBox
			defaultValue={defaultValue}
			onChange={onChange}
			name={name}
			options={options}
			searchOptions={searchDirectorsOptions}
		/>
	);
};

export default DirectorsTextBox;
