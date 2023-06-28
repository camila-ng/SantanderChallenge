import React, { useState } from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';

const title = "Hacker Dormitory";
function App() {

  const [residentsName, setResidentsName] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResidentsName = (name) => {
    setResidentsName([...residentsName, name]);
  };

  const handleErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search handleResidentsName={handleResidentsName} errorMessage={handleErrorMessage} />
        {errorMessage && <Error errorMessage={errorMessage} />}
        <ResidentsList residentList={residentsName} />
      </div>
    </div>
  );
}

export default App;
