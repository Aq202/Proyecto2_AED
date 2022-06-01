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
					Por favor, ingresa tu información personal para que podamos realizar mejores
					recomendaciones que se adapten de mejor manera a tí.
				</p>

				<NewMovieForm />	
			</div>
		</div>
	);
};

export default MoviesPage;
