import React from "react";
import "../styles/profilePage.css";
import Banner from "./Banner.js";
import profileBanner from "../resources/images/profileBanner.svg";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
	return (
		<div id="profilePage">
			<Banner bannerImage={profileBanner} title="Perfil de Usuario" />
			<div className="body-page">
				<p className="instruccions">
					Por favor, ingresa tu información personal para que podamos realizar mejores
					recomendaciones que se adapten de mejor manera a tí.
				</p>

				<ProfileForm />
			</div>
		</div>
	);
};

export default ProfilePage;
