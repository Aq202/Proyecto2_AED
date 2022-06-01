import React, { useEffect, useRef, useState } from "react";
import "../styles/textBox.css";
import "../styles/variables.css";
import PropTypes from "prop-types";
import uniqid from "uniqid";

const TextBox = ({ searchOptions, options, defaultValue, onChange, name }) => {
	const optionsRef = useRef([]);
	const optionsContainerRef = useRef();

	const [currentOption, setCurrentOption] = useState(-1);
	const [lastText, setLastText] = useState(defaultValue ?? "");
	const [currentText, setCurrentText] = useState(defaultValue ?? "");
	const [hideOptions, setHideOptions] = useState(true);

	//majenar cambio de opcion
	useEffect(() => {
		console.log("index modificado");
		// clearSelection();
		if (currentOption >= 0 && currentOption < options.length) {
			optionsRef.current[currentOption].classList.add("selected"); //agregar estilo de seleccionado
			setCurrentText(options[currentOption]);
		} else if (currentOption === -1) {
			setCurrentText(lastText);
		}
	}, [currentOption]);

	useEffect(() => {
		if (Array.isArray(options) && options.length > 0) setHideOptions(false);
		else setHideOptions(true);
	}, [options]);

	const showOptions = () => optionsContainerRef.current?.classList.remove("hide");

	const handleKeyUp = e => {
		//up arrow
		if (!hideOptions && e.keyCode === 38) {
			if (currentOption >= -1) setCurrentOption(index => index - 1);
		}
		//down arrow
		else if (!hideOptions && e.keyCode === 40) {
			if (currentOption < options.length - 1) setCurrentOption(index => index + 1);
		}
		//enter
		else if (!hideOptions && e.keyCode === 13) {
			confirmText();
		}
		//search for options
		else if (searchOptions) {
			const value = e.target.value.trim();
			confirmText();
			searchOptions(value);
		}
	};

	const handleMouse = e => {
		optionsRef.current?.forEach((element, index) => {
			//Determinar elemento con hover
			if (element === e.target) {
				setCurrentOption(index); //cambiar el indice de la opción actual
			}
		});
	};

	const handleFocus = e => {
		searchOptions(currentText);
		showOptions();
	};

	const handleChangeLocal = e => {
		setCurrentText(e.target.value);
		if (onChange) onChange(e);
	};

	const handleBlur = e => {
		console.log(e);
		confirmText();
	};

	const confirmText = () => {
		setLastText(currentText);
		setHideOptions(true);
		setCurrentOption(-1);
	};

	const handleContainerMouseOut = () => {
		setCurrentText(lastText);
		setCurrentOption(-1);
	};

	return (
		<div className="textBox">
			<input
				type="text"
				name={name}
				onKeyUp={handleKeyUp}
				onFocus={handleFocus}
				value={currentText}
				onChange={handleChangeLocal}
				onBlur={handleBlur}
			/>

			{searchOptions && options && !hideOptions ? (
				<div
					className={`options-container ${currentOption !== -1 ? "selecting" : ""}`}
					ref={optionsContainerRef}
					onMouseLeave={handleContainerMouseOut}>
					{/* agregar opciones */}
					{options.map((option, i) => (
						<div
							className={`option ${i === currentOption ? "selected" : ""}`}
							ref={element => {
								optionsRef.current[i] = element;
							}}
							key={uniqid()}
							onMouseMove={handleMouse}>
							{option}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

TextBox.propTypes = {
	searchOptions: PropTypes.func,
	options: PropTypes.array,
	onChange: PropTypes.func,
};

export default TextBox;
