import React, { useEffect, useState } from "react";
import "../styles/recommendationPage.css";
import "../styles/variables.css";
import Banner from "./Banner";
import popCornBanner from "../resources/images/popCornBanner.svg";
import MovieOption from "./MovieOption";
import { useSession } from "./hooks/useSession";
import { useNavigate } from "react-router-dom";
import InstructionsPopUp from "./InstructionsPopUp";
import ReactDOM from "react-dom";
import { usePopUp } from "./hooks/usePopUp";

const RecommendationsPage = () => {
	const [movie, setMovie] = useState();
	const [{ id }, isAlertOpen, closeAlert] = useSession(true);
	const [viewedMovies, setViewedMovies] = useState([]);
	const [defaultStatus, setDefaultStatus] = useState(null);

	const navigate = useNavigate();

	const [isNoMoreOpen, openNoMore, closeNoMore] = usePopUp();

	useEffect(() => {
		console.log(id);
		requestRecommendation();
	}, [id]);

	//cuando se sale de la pagina
	useEffect(() => {
		return () => {
			console.log("Limpiando películas vistas...");
			viewedMovies?.forEach(mov => {
				const url =
					"./reactToMovie?" +
					new URLSearchParams({ user: id, movie: mov.id, option: 0 }).toString();
				fetch(url);
			});
		};
	}, []);

	const handleOptionChange = () => requestRecommendation();

	const makeAsViewed = () => {
		setDefaultStatus(true);

		//añadir a la cola
		setViewedMovies(last => [...last, movie.id]);
	};

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
				setDefaultStatus(null);
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
							userId={id}
							id={movie.id}
							imageUrl={movie.image}
							title={movie.title}
							changeStatus={handleOptionChange}
							blockAtFirst={true}
							defaultStatus={defaultStatus ? "3" : null}
						/>

						<button className="skip" onClick={makeAsViewed}>
							Saltar
						</button>
					</>
				) : null}
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

			{isNoMoreOpen
				? ReactDOM.createPortal(
						<InstructionsPopUp
							close={closeNoMore}
							instructions={[
								"¡Nos encanta que aproveches nuestra herramienta al máximo!",
								"Lastimosamente nos hemos quedado sin opciones para tí.",
								"Continúa calificando películas para obtener más y mejores recomendaciones.",
							]}
							callback={() => navigate("/profile")}
						/>,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
};

export default RecommendationsPage;
