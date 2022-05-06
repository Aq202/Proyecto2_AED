import "../styles/App.css";
import reactDOM from "react-dom";
import { usePopUp } from "./hooks/usePopUp";
import WelcomePopUp from "./WelcomePopUp";
import { useEffect } from "react";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesPage from "./NewMoviePage";
import RecomendationPage from "./RecomendationPage";

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
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<ProfilePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/showMovies" element={<MoviesPage />} />
					<Route path="/recomendations" element={<RecomendationPage/>	} />
				</Routes>
			</Router>
			{isWelcomeOpen
				? reactDOM.createPortal(
						<WelcomePopUp close={closeWelcome} />,
						document.querySelector("body")
				  )
				: null}
		</div>
	);
}

export default App;
