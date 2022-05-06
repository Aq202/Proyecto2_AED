import React from "react";
import "../styles/recomendationPage.css";
import Banner from "./Banner";
import banner from "../resources/images/recomendationsBanner.svg";

const RecomendationPage = () => {
	return (
		<div id="recomendationPage">
			<Banner bannerImage={banner} title="Descubre algo nuevo" />
		</div>
	);
};

export default RecomendationPage;
