import { useState } from "react";

const CustomCheckbox = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const checkBoxClass = ""
	const checkboxActiveClass = "";

	return (
		<label>
			<input 
				type="checkbox"
				onChange={() => {setIsChecked(!isChecked)}}
			/>
			<span className={`checkBoxClass ${isChecked ? checkboxActiveClass: ""}`} aria-hidden="true"/>
		</label>
	)
}

export default CustomCheckbox