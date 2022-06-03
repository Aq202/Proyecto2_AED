import React, { useState } from "react";
import "../styles/newMoviePage.css";
import Banner from "./Banner";
import profileBanner from "../resources/images/moviesBanner.svg";
import MovieOption from "./MovieOption";
import SendRecommendationsButton from "./SendRecommendationsButton";
import NewMovieForm from "./NewMovieForm";

const MoviesPage = () => {
	const [optionsSelected, setOptionsSelected] = useState([]);

	const handleChange = ({ id, status }) => {};

	return (
		<div id="newMoviePage">
			<Banner bannerImage={profileBanner} title="Nueva Película" />

			<div className="body-page">
				<p className="instruccions">
					Por favor, ingresa los datos de tus películas favoritas para que podamos recomendarlas y así otras personas también puedan disfrutarlas.
				</p>

				<NewMovieForm />	
			</div>
		</div>
	);
};

export default MoviesPage;
