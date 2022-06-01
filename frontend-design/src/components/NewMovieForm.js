import React, { useState } from "react";
import TextBox from "./TextBox";

import DirectorsTextBox from "./DirectorsTextBox";

const NewMovieForm = () => {
	return (
		<div className="newMovieForm">
			<DirectorsTextBox />
		</div>
	);
};

export default NewMovieForm;
