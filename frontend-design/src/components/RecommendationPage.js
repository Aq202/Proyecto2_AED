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
import Spinner from "./Spinner";

const RecommendationsPage = () => {
	const [movie, setMovie] = useState(null);
	const [{ id }, isAlertOpen, closeAlert] = useSession(true);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	const [isNoMoreOpen, openNoMore, closeNoMore] = usePopUp();

	useEffect(() => {
		console.log(id);
		requestRecommendation();
	}, [id]);


	const handleOptionChange = () => requestRecommendation();



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
				if (isLoading !== false) setIsLoading(false);

				if (result.length == 0) throw null;
				else {
					const { id, title, image } = result?.result;
					setMovie({ id, title, image });
					console.info("Recomendación: ", result);
				}
			})
			.catch(err => {
				if (isLoading !== false) setIsLoading(false);
				openNoMore();
				setMovie(null);
				console.error("Error al obtener recom: ", err);
			});
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
						/>

					</>
				) : null}

				{isLoading ? <Spinner /> : null}

				{movie === null && isLoading !== true ? (
					<p className="no-result-message">Sin Resultados</p>
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
								"Recuerda que debes calificar al menos un film para obtener recomendaciones.",
							]}
						/>,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
};

export default RecommendationsPage;
