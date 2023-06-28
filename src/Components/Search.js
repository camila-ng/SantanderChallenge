import React, { useState } from 'react';
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"


function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}

function Search({ handleResidentsName, errorMessage }) {
	const [name, setName] = useState("");
	const [inputDate, setInputDate] = useState("")


	const student = STUDENTS.find((student) => student.name.toLowerCase() === name.toLowerCase());
	const studentName = student ? name : '';

	const errors = {
		DATE_NOT_FOUND: `Sorry ${studentName}, validity has expired!`,
		NAME_NOT_FOUND: `Sorry ${studentName} is not a verified student!`
	};

	const onClick = () => {
		if (student) {
			if (checkValidity(student.validityDate, inputDate)) {
				handleResidentsName(name.toLowerCase())
				setName("")
				errorMessage("")
			} else {
				errorMessage(errors.DATE_NOT_FOUND)
			}
		}
		if (!student) {
			errorMessage(errors.NAME_NOT_FOUND)
		}
	}
	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input id="studentName" data-testid="studentName" type="text" value={name} onChange={(e) => setName(e.target.value.toLowerCase())} className="mr-30 mt-10">
					</input>
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input id="joiningDate" data-testid="joiningDate" value={inputDate} onChange={(e) => setInputDate(e.target.value)}
						type="date" className="mr-30 mt-10" />
				</div>
			</label>
			<button onClick={onClick} type="button" data-testid="addBtn" className="small mb-0">Add</button>
		</div>
	);
}

export default Search;
