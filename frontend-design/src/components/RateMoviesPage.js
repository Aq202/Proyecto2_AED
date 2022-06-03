import React, { useEffect, useState } from "react";
import "../styles/recomendationPage.css";
import Banner from "./Banner";
import banner from "../resources/images/recomendationsBanner.svg";
import MovieOption from "./MovieOption";
import SendRecommendationsButton from "./SendRecommendationsButton";
import { useSession } from "./hooks/useSession";

const RateMoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [blockSearch, setBlockSearch] = useState();
	const { id: userId } = useSession(true);
	const [interruption, setInterruption] = useState();

	useEffect(() => {
		searchMovies();
	}, [userId]);

	const searchMovies = max => {
		if (!userId) return;

		//interrupt previous request
		interruption?.abort();

		let abortController = new AbortController();
		setInterruption(abortController);

		const url = "./getMoviesList?" + new URLSearchParams({ userId, max }).toString();

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
						mov => movies?.find(elem => elem.id === mov.id) === undefined
					);

					if (moviesList?.length > 0)
						setMovies(lastValue => [...lastValue, ...moviesList]); //añadir resultados
					else setBlockSearch(true); //bloquear busqueda si no hay más resultados
				}
			})
			.catch(err => console.error("Error al consultar lista de peliculas: ", err));
	};

	const handleChange = ({ id, status }) => {
		const url =
			"./reactToMovie?" +
			new URLSearchParams({ user: userId, movie: id, option: status }).toString();

		fetch(url)
			.then(r => {
				if (r.ok === true) console.info("Película marcada como like/dislike");
				else console.warn("La película no se marcó como like/dislike");
			})
			.catch(err => console.error("Error al marcar like/dislike: ", err));
	};

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
