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

//Para que la primera letra del nombre que se va a renderizar en el error siempre sea mayuscula.
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function Search({ handleResidentsName, errorMessage }) {
  const [name, setName] = useState("");
  const [inputDate, setInputDate] = useState("")

  const student = STUDENTS && STUDENTS.find((student) => student.name.toLowerCase() === name.toLowerCase());

  const errors = {
    DATE_NOT_FOUND: `Sorry, ${capitalize(name).trim()}'s validity has Expired!`,
    NAME_NOT_FOUND: `Sorry, ${capitalize(name)} is not a verified student!`,
    NAME_EMPY_FIELD: "Completa el nombre",
    DATE_EMPY_FIELD: "Completa la fecha",

  };

  const onClick = () => {
    //Le sumamos errores si el usuario no completó los campos
    if (name === "") {
      errorMessage(errors.NAME_EMPY_FIELD);
    } else if (inputDate === "") {
      errorMessage(errors.DATE_EMPY_FIELD);
    } else if (student) {
      if (checkValidity(inputDate, student.validityDate)) {
        handleResidentsName(name);
        setName("");
        setInputDate("");

        //En caso de que anteriormente haya habido un error al cargar, se resetea tambien el errorMessage
        errorMessage("");
      } else {
        errorMessage(errors.DATE_NOT_FOUND);
      }
    } else {
      errorMessage(errors.NAME_NOT_FOUND);
    }
  }

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">Student Name:
        <div>
          <input id="studentName" data-testid="studentName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mr-30 mt-10">
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
