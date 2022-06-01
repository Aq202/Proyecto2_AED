import React, { useEffect, useState } from "react";
import "../styles/recomendationPage.css";
import Banner from "./Banner";
import banner from "../resources/images/recomendationsBanner.svg";
import MovieOption from "./MovieOption";
import SendRecommendationsButton from "./SendRecommendationsButton";

const RateMoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [blockSearch, setBlockSearch] = useState();

	const handleChange = ({ id, status }) => {};

	const [interruption, setInterruption] = useState();

	useEffect(() => {
		searchMovies();
	}, []);

	const searchMovies = max => {
		let id;
		try {
			console.log(JSON.parse(sessionStorage.getItem("userData")));
			id = JSON.parse(sessionStorage.getItem("userData"))?.id;
		} catch (ex) {}

		console.log(id);

		if (!id) return sessionExpired(); //validar id

		//interrupt previous request
		interruption?.abort();

		let abortController = new AbortController();
		setInterruption(abortController);

		const url = "./getMoviesList?" + new URLSearchParams({ userId: id, max }).toString();

		let response;
		fetch(url, {
			signal: abortController.signal,
		})
			.then(r => {
				response = r;
				return r.json();
			})
			.then(result => {

				if (response.ok === true) {
					let { movies: moviesList } = result;

					//filtrar películas repetidas
					moviesList = moviesList.filter(
						mov => movies.find(elem => elem.id === mov.id) === undefined
					);

					if (moviesList?.length > 0)
						setMovies(lastValue => [...lastValue, ...moviesList]); //añadir resultados
					else setBlockSearch(true); //bloquear busqueda si no hay más resultados
				}
			})
			.catch(err => console.error("Error al consultar lista de peliculas: ", err));
	};

	const sessionExpired = () => alert("Su sesión ha caducado.");
	return (
		<div id="recomendationPage">
			<Banner bannerImage={banner} title="Calificar Películas" />

			<SendRecommendationsButton />

			<div className="options-container">
				{movies?.map(mov => (
					<MovieOption
						imageUrl={mov.image}
						title={mov.title}
						id={mov.id}
						key={mov.id}
						changeStatus={handleChange}
					/>
				))}
			</div>
		</div>
	);
};

export default RateMoviesPage;
