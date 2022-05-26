import React, { useState } from "react";
import "../styles/moviesPage.css";
import Banner from "./Banner";
import profileBanner from "../resources/images/moviesBanner.svg";
import MovieOption from "./MovieOption";
import SendRecommendationsButton from "./SendRecommendationsButton";

const MoviesPage = () => {
	const [optionsSelected, setOptionsSelected] = useState([]);

	const handleChange = ({ id, status }) => {};

	return (
		<div id="moviesPage">
			<Banner bannerImage={profileBanner} title="Mostrar Películas" />

			<SendRecommendationsButton />

			<div className="options-container">
				<MovieOption
					imageUrl={"./posters/pelicula1.jpg"}
					title={"Moonlight"}
					id={1}
					changeStatus={handleChange}
				/>
				<MovieOption
					imageUrl={"./posters/pelicula2.jpg"}
					title={"Iron Man"}
					id={2}
					changeStatus={handleChange}
				/>
				<MovieOption
					imageUrl={"./posters/pelicula3.jpg"}
					title={"Once Upon a time in Hollywood"}
					id={3}
					changeStatus={handleChange}
				/>
				<MovieOption
					imageUrl={"./posters/pelicula4.jpg"}
					title={"Ready Player One"}
					id={4}
					changeStatus={handleChange}
				/>
				<MovieOption
					imageUrl={"./posters/pelicula5.jpg"}
					title={"Spiderman"}
					id={5}
					changeStatus={handleChange}
				/>
				<MovieOption
					imageUrl={"./posters/pelicula6.jpg"}
					title={"Guardianes de la Galaxia vol.1"}
					id={6}
					changeStatus={handleChange}
				/>
			</div>
		</div>
	);
};

export default MoviesPage;
