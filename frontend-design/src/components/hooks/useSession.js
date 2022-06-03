import { useEffect, useState } from "react";
import { usePopUp } from "./usePopUp";

import InstructionsPopUp from "../InstructionsPopUp";

export const useSession = (redirect = false) => {
	const [userData, setUserData] = useState({});
	const [isAlertOpen, openAlert, closeAlert] = usePopUp();

	useEffect(() => {
		let data = sessionStorage.getItem("userData");
		if (data) setUserData(JSON.parse(data));
		else if (redirect === true) {
			sessionStorage.removeItem("initialized");

			openAlert();
		}
	}, []);

	return [userData, isAlertOpen, closeAlert];
};
