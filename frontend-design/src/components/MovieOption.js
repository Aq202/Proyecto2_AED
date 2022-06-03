import React, { useEffect, useRef, useState } from "react";
import "../styles/movieOption.css";
import PropTypes from "prop-types";
import gsap from "gsap";
import random from "../scripts/random";

const MovieOption = ({ id, title, imageUrl, changeStatus }) => {
	const optionRef = useRef();
	const buttonsContainerRed = useRef();
	const [status, setStatus] = useState(null);
	const [image, setImage] = useState();

	useEffect(() => {
		const requestImage = async () => {
			const img = new Image();
			img.src = imageUrl;
			img.onload = () => {
				alert("loaded");
				setImage(imageUrl);
				console.log("image", imageUrl)
			};
			img.onerror = () => {
				alert("error");
				setImage(getDefaultMovie());
				console.log("image", imageUrl)
			};
		};

		requestImage();
	}, []);

	useEffect(() => {
		if (status !== null) changeStatus({ id, status });
	}, [status]);

	useEffect(() => {
		setStatus(null);
		optionRef.current.classList.remove("liked");
		optionRef.current.classList.remove("disliked");
	}, [id]);

	const hideButtonsContainer = e => {
		if (status !== "0" && status !== null) {
			setStatus("0"); //0: nothing
			optionRef.current.classList.remove("liked");
			optionRef.current.classList.remove("disliked");
		}
	};

	const handleLikeClick = e => {
		if (status === "0" || status === null) {
			e.stopPropagation();
			//agregar estilo liked
			optionRef.current.classList.add("liked");
			optionRef.current.classList.remove("disliked");

			//modificar status. 1 = liked
			setStatus("1");
		}
	};

	const handleDislikeClick = e => {
		if (status == "0" || status === null) {
			e.stopPropagation();
			//agregar estilo disliked
			optionRef.current.classList.add("disliked");
			optionRef.current.classList.remove("liked");

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
