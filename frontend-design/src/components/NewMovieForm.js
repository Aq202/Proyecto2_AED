import React, { useState } from "react";
import TextBox from "./TextBox";

import DirectorsTextBox from "./DirectorsTextBox";
import MainCharacterTextBox from "./MainCharacterTextBox";
import GenreTextBox from "./GenreTextBox";

const NewMovieForm = () => {
	return (
		<div className="newMovieForm">
			<DirectorsTextBox />
			<MainCharacterTextBox />
			<GenreTextBox />	
		</div>
	);
};

export default NewMovieForm;
