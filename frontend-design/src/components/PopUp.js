import React, { useRef } from "react";
import "../styles/popUp.css";
import PropTypes from "prop-types";
import { fadeOut } from "../scripts/animations.js";
import "../styles/scrollbar.css";

function PopUp({
	close,
	maxWidth = 700,
	closeWithBackground = true,
	closeButton = true,
	children,
	callback,
}) {
	const refPopUp = useRef();

	const closeAnimation = () => {
		fadeOut(refPopUp.current, 300, () => {
			if (callback) callback();
			close();
		});
	};

	const handleCloseWithBackground = e => {
		if (e.target === e.currentTarget) {
			e.stopPropagation();

			if (closeWithBackground) {
				closeAnimation();
			}
		}
	};

	const handleCloseWithButton = e => {
		e.stopPropagation();
		if (closeButton) {
			closeAnimation();
		}
	};

	return (
		<div className="popUp" ref={refPopUp} onClick={handleCloseWithBackground}>
			<div className="popUp-body scrollbar-gray" style={{ maxWidth: `${maxWidth}px` }}>
				<div className="popUp-header">
					{closeButton ? <div className="x-icon" onClick={handleCloseWithButton}></div> : null}
				</div>
				<div className="popUp-body-container">
					{React.cloneElement(children, {
						closeAnimation,
						close,
						callback,
						fadeOut: (duration, callback) => fadeOut(refPopUp.current, duration, callback),
					})}
				</div>
			</div>
		</div>
	);
}

PopUp.propTypes = {
	maxWidth: PropTypes.number,
	close: PropTypes.func.isRequired,
	callback: PropTypes.func,
};

export default PopUp;
