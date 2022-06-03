import React, { useEffect, useRef, useState } from "react";
import "../styles/movieOption.css";
import PropTypes from "prop-types";
import gsap from "gsap";

const MovieOption = ({ id, title, imageUrl, changeStatus }) => {
	const optionRef = useRef();
	const buttonsContainerRed = useRef();
	const [status, setStatus] = useState(null);

	useEffect(() => {
		if (status !== null) changeStatus({ id, status });
	}, [status]);

	const hideButtonsContainer = e => {
		if (status !== "0") {
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

	return (
		<div className="movieOption " ref={optionRef} onClick={hideButtonsContainer}>
			<img className="poster" src={imageUrl} alt={title} />
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
