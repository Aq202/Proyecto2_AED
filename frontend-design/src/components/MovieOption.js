import React, { useEffect, useRef, useState } from "react";
import "../styles/movieOption.css";
import PropTypes from "prop-types";
import gsap from "gsap";
import random from "../scripts/random";

const MovieOption = ({
	userId,
	id,
	title,
	imageUrl,
	changeStatus,
	blockAtFirst,
	defaultStatus,
}) => {
	const optionRef = useRef();
	const buttonsContainerRed = useRef();
	const [status, setStatus] = useState(defaultStatus ?? null);
	const [image, setImage] = useState();
	const [block, setBlock] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = imageUrl;
		img.onload = () => {
			setImage(imageUrl);
			console.log("image", imageUrl);
		};
		img.onerror = () => {
			console.log("image", imageUrl);
			setImage(getDefaultMovie());
		};
	}, [imageUrl]);

	useEffect(() => {
		if (status !== null) {
			if (blockAtFirst === true && block === true) return;
			else if (blockAtFirst === true) setBlock(true);

			const makeRequest = async () => {
				await modifyMovieStatus();
				if (changeStatus) changeStatus();
			};
			makeRequest();

			//añadir estilos:

			if (status == "1") {
				//like
				optionRef.current.classList.add("liked");
				optionRef.current.classList.remove("disliked");
			} else if (status == "2") {
				//dilike
				optionRef.current.classList.add("disliked");
				optionRef.current.classList.remove("liked");
			} else {
				optionRef.current.classList.remove("liked");
				optionRef.current.classList.remove("disliked");
			}
		}
	}, [status]);

	useEffect(() => {
		setStatus(null);
		optionRef.current.classList.remove("liked");
		optionRef.current.classList.remove("disliked");
		setBlock(false);
	}, [id]);

	const hideButtonsContainer = e => {
		if (status !== "0" && status !== null) {
			setStatus("0"); //0: nothing
		}
	};

	const modifyMovieStatus = async () => {
		const url =
			"./reactToMovie?" +
			new URLSearchParams({ user: userId, movie: id, option: status }).toString();

		try {
			let request = await fetch(url);
			if (request.ok === true) console.info("Estado de película modificado a: ", status);
			else console.warn("La película no se marcó como like/dislike");
		} catch (err) {
			console.error("Error al marcar like/dislike: ", err);
		}
	};

	const handleLikeClick = e => {
		if (status === "0" || status === null) {
			e.stopPropagation();
			//modificar status. 1 = liked
			setStatus("1");
		}
	};

	const handleDislikeClick = e => {
		if (status == "0" || status === null) {
			e.stopPropagation();

			//modificar status. 2 = disliked
			setStatus("2");
		}
	};

	const getDefaultMovie = () => {
		const options = [
			"https://img.freepik.com/vector-gratis/colorido-cartel-tiempo-cine-gafas-3d-palomitas-maiz_18591-8619.jpg",
			"https://img.freepik.com/vector-gratis/colorido-cartel-tiempo-cine-cubo-palomitas-maiz-boletos_18591-8627.jpg",
			"https://i.pinimg.com/originals/e4/c5/65/e4c56523053a791ea0814011d04c3220.jpg",
		];

		return options[random(0, options.length)];
	};

	return (
		<div className="movieOption " ref={optionRef} onClick={hideButtonsContainer}>
			<img className="poster" src={image} alt={title} />
			<h3>{title}</h3>

			<div className="buttons-container" ref={buttonsContainerRed}>
				<div className="icon like" onClick={handleLikeClick} />
				<div className="icon dislike" onClick={handleDislikeClick} />
			</div>
		</div>
	);
};

MovieOption.propTypes = {
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	changeStatus: PropTypes.func.isRequired,
};

export default MovieOption;
