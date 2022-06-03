import React, { useEffect, useState } from "react";
import "../styles/recommendationPage.css";
import "../styles/variables.css";
import Banner from "./Banner";
import popCornBanner from "../resources/images/popCornBanner.svg";
import MovieOption from "./MovieOption";
import { useSession } from "./hooks/useSession";

const RecommendationsPage = () => {
	const [movie, setMovie] = useState();
	const { id } = useSession(true);

	useEffect(() => {
		console.log(id);
		requestRecommendation();
	}, [id]);

	const handleOptionChange = ({ id:movieId, status }) => {
		const url =
			"./reactToMovie?" +
			new URLSearchParams({ user: id, movie: movieId, option: status }).toString();

		fetch(url)
			.then(r => {
				if (r.ok === true) {
					//mostrar nueva recomendación
					requestRecommendation();
					console.info("Película marcada como like/dislike");
				} else console.warn("La película no se marcó como like/dislike");
			})
			.catch(err => console.error("Error al marcar like/dislike: ", err));
	};

	const makeAsViewed = () => handleOptionChange({ id: movie.id, status: 3 });

	const requestRecommendation = () => {
		if (!id) {
			console.warn("El ID es invalido del usuario");
			return;
		}
		console.log("Searching recommendations...");
		const url = `./getRecommendation?userId=${id}`;

		let response;
		fetch(url)
			.then(r => {
				if (!r.ok) throw r;
				return r.json();
			})
			.then(result => {
				const { id, title, image } = result?.result;
				setMovie({ id, title, image });
				console.info("Recomendación: ", result);
			})
			.catch(err => console.error("Error al obtener recom: ", err));
	};

	return (
		<div id="recommendationPage">
			<Banner bannerImage={popCornBanner} title="Recomendaciones" />
			<div className="body-page">
				<p className="instruccions">
					A continuación te realizaremos algunas recomendaciones de películas en base a tus
					preferencias. Califica con un 👍 o 👎 cada una de las opciones para ver la siguiente.
				</p>

				{movie ? (
					<>
						<MovieOption
							id={movie.id}
							imageUrl={movie.image}
							title={movie.title}
							changeStatus={handleOptionChange}
						/>

						<button className="skip" onClick={makeAsViewed}>
							Saltar
						</button>
					</>
				) : null}
			</div>
		</div>
	);
};

export default RecommendationsPage;
