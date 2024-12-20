import React, { useState } from "react"; // Import React and useState
import "./UserHistory.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faHistory , faCheckCircle, faLanguage, faConciergeBell, faAddressBook } from '@fortawesome/free-solid-svg-icons';

const UserHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Get the selected file
  };

  const handleSubmit = () => {
    if (selectedFile) {
      alert(`File "${selectedFile.name}" uploaded successfully!`);
      // Add your file handling logic here
    } else {
      alert("Please select a file to upload!");
    }
  };

  return (
    <div id="app3">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">CROSSBORDER-EXPORT-CHECKER</h1>
      </nav>

      <div className="contains">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "X" : "☰"}
          </button>
          <ul className="sidebar-links">
      <li>
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
      </li>
      <li>
        <Link to="/crossborder">
          <FontAwesomeIcon icon={faCheckCircle} /> Verification
        </Link>
      </li>
      <li>
        <Link to="/multilingual">
          <FontAwesomeIcon icon={faLanguage} /> Multilingual
        </Link>
      </li>
      <li>
        <Link to="/user_history">
          <FontAwesomeIcon icon={faHistory } /> PostShipment
        </Link>
      </li>
      <li>
        <Link to="/contacts">
          <FontAwesomeIcon icon={faAddressBook} /> Contacts
        </Link>
      </li>
    </ul>
        </aside>

        {/* Main Content */}

        
        
        <div class="powerbi">
          
        <iframe title="post" width="1140" height="541.25" id="post" src="https://app.powerbi.com/reportEmbed?reportId=c51b79cb-da0f-41a6-9dcc-32984d02eb82&autoAuth=true&ctid=ff335ba2-bb68-489a-bbdd-f49ab4319838" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      </div>
  
  );
};

export default UserHistory;
