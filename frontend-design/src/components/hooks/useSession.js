import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSession = (redirect = false) => {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({});

	useEffect(() => {
		let data = sessionStorage.getItem("userData");
		if (data) setUserData(JSON.parse(data));
		else if (redirect === true) {
            sessionStorage.removeItem("initialized")
            navigate("/profile");
        }
	}, []);

	return userData;
};
