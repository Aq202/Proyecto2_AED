import React from "react";
import "../styles/sendRecommendationsButton.css";
import "../styles/buttons.css";

const SendRecommendationsButton = () => {
	return (
		<div className="sendRecommendationsButton">
			<h3>Selecciona tus películas favoritas</h3>
			<button className="blue-button">Enviar</button>
		</div>
	);
};

export default SendRecommendationsButton;
