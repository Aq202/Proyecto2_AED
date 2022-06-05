import React, { useEffect, useState } from "react";
import "../styles/recomendationPage.css";
import Banner from "./Banner";
import banner from "../resources/images/recomendationsBanner.svg";
import MovieOption from "./MovieOption";
import { useSession } from "./hooks/useSession";
import { useNavigate } from "react-router-dom";
import InstructionsPopUp from "./InstructionsPopUp";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";

const RateMoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [blockSearch, setBlockSearch] = useState();
	const [interruption, setInterruption] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const [{ id: userId }, isAlertOpen, closeAlert] = useSession(true);
	const navigate = useNavigate();
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
				if (isLoading !== false) setIsLoading(false);

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
			.catch(err => {
				if (isLoading !== false) setIsLoading(false);
				console.error("Error al consultar lista de peliculas: ", err);
			});
	};

	return (
		<div id="recomendationPage">
			<Banner bannerImage={banner} title="Calificar Películas" />

			<div className="options-container">
				{movies?.map(mov => (
					<MovieOption
						userId={userId}
						imageUrl={mov.image}
						title={mov.title}
						id={mov.id}
						key={mov.id}
					/>
				))}
			</div>

			<div className="others">
				{movies.length === 0 && isLoading === false ? (
					<p className="no-result-message">Sin Resultados</p>
				) : null}

				{isLoading ? <Spinner /> : null}
			</div>

			{isAlertOpen
				? ReactDOM.createPortal(
						<InstructionsPopUp
							close={closeAlert}
							instructions={[
								"Más despacio vaquero...",
								"Ingresa tus datos de perfil antes de continuar",
							]}
							callback={() => navigate("/profile")}
						/>,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
};

export default RateMoviesPage;
