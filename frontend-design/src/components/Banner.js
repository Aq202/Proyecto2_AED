import React from "react";
import "../styles/banner.css";
import wave from "../resources/images/wave1.svg";
import PropTypes from "prop-types";

const Banner = ({ bannerImage, title }) => {
	return (
		<div className="banner">
			<div className="banner-container">
				<div className="content">
					<h1>{title}</h1>

					<img src={bannerImage} alt="Banner" className="bannerImage" />
				</div>

				<img src={wave} className="wave" alt="Wave" />
			</div>
		</div>
	);
};

Banner.propTypes = {
	bannerImage: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};

export default Banner;
