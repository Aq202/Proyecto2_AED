import React, { useEffect, useRef, useState } from "react";
import PopUp from "./PopUp";
import "../styles/welcomePopUp.css";
import welcomeGuy from "../resources/images/welcomeGuy.svg";
import "../styles/variables.css";
import TypeAnimation from "react-type-animation";
import gsap from "gsap";

const WelcomePopUp = ({ close }) => {
	const [welcomeMessages, setWelcomeMessages] = useState([]); //almacena los textos de bienvenida
	const imageRef = useRef();

	useEffect(() => {
		//realizar animación de imagen y texto
		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			imageRef.current,
			{ opacity: 0, y: "-25%" },
			{ opacity: 1, y: 0, ease: "elastic.out(1, 0.3)", duration: 3 }
		);

		tl.call(
			() =>
				setWelcomeMessages([
					"¡Hola, que gusto de verte!",
					1000,
					"Agradecemos tu participación.",
					1000,
					"Te invitamos a probar las funcionalidades de nuestro proyecto. ¡Adelante!",
					1000,
				]),
			null,
			1
		);
		tl.call(() => imageRef.current.classList.add("animation"));

		tl.restart();
	}, [imageRef]);

	return (
		<PopUp close={close} closeWithBackground={false} maxWidth={500}>
			<div id="welcomePopUp">
				<img src={welcomeGuy} alt="Welcome" className="welcomeGuy" ref={imageRef} />
				<TypeAnimation sequence={welcomeMessages} className="text" />
			</div>
		</PopUp>
	);
};

export default WelcomePopUp;
