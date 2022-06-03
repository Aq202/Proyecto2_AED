import "../styles/App.css";
import reactDOM from "react-dom";
import { usePopUp } from "./hooks/usePopUp";
import InstructionsPopUp from "./InstructionsPopUp";
import { useEffect } from "react";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesPage from "./NewMoviePage";
import RateMoviesPage from "./RateMoviesPage";
import RecommendationsPage from "./RecommendationPage";

function App() {
	const [isWelcomeOpen, openWelcome, closeWelcome] = usePopUp();

	useEffect(() => {
		if (sessionStorage.getItem("initialized") === null) {
			openWelcome();
			sessionStorage.setItem("initialized", "1");
		}
	}, []);

	return (
		<div className="App">
			<Router basename={"Proyecto2_integrado"}>
				<NavBar />
				<Routes>
					<Route path="/" element={<ProfilePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/showMovies" element={<MoviesPage />} />
					<Route path="/rateMovies" element={<RateMoviesPage />} />
					<Route path="/recommendations" element={<RecommendationsPage />} />
					<Route path="/*" element={<ProfilePage />} />
				</Routes>
			</Router>
			{isWelcomeOpen
				? reactDOM.createPortal(
						<InstructionsPopUp
							close={closeWelcome}
							instructions={[
								"¡Hola, que gusto de verte!",
								"Agradecemos tu participación.",
								"Te invitamos a probar las funcionalidades de nuestro proyecto. ¡Adelante!",
							]}
						/>,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
}

export default App;
