import React, { useEffect, useRef, useState } from "react";
import "../styles/navBar.css";
import { NavLink } from "react-router-dom";
import { CgMenuRound } from "react-icons/cg";
import { IoMdCloseCircleOutline } from "react-icons/io";

const NavBar = () => {
	const navBarRef = useRef();

	const [showCloseButton, setShowCloseButton] = useState(false);

	useEffect(() => {
		window.onscroll = e => {
			if (window.scrollY > 50) navBarRef.current.classList.add("backgroundStyle");
			else navBarRef.current.classList.remove("backgroundStyle");
		};
	}, []);

	const handleShowMenu = () => {
		navBarRef.current.classList.toggle("showMenu");

		if (navBarRef.current.classList.contains("showMenu")) setShowCloseButton(true);
		else setShowCloseButton(false);
	};

	const handlePageChange = () => {
		if (navBarRef.current.classList.contains("showMenu")){
			navBarRef.current.classList.remove("showMenu");
            setShowCloseButton(false);
        }
	};

	return (
		<nav id="navBar" ref={navBarRef}>
			<ul className="menu">
				<li>
					<NavLink to="/profile" onClick={handlePageChange}>
						Perfil
					</NavLink>
				</li>
				<li>
					<NavLink to="/showMovies" onClick={handlePageChange}>
						Nueva
					</NavLink>
				</li>
				<li>
					<NavLink to="/rateMovies" onClick={handlePageChange}>
						Calificar Películas
					</NavLink>
				</li>
			</ul>
			<ul className="simpleMenu">
				<li onClick={handleShowMenu}>
					{!showCloseButton ? (
						<CgMenuRound className="icon" />
					) : (
						<IoMdCloseCircleOutline className="icon" />
					)}
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
