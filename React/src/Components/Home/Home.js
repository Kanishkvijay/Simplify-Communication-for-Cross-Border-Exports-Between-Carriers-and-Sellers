import React, { useState } from "react"; // Import React and useState
import "./Home.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory ,faCheckCircle, faLanguage, faConciergeBell, faAddressBook } from '@fortawesome/free-solid-svg-icons';
 // Import the logo image

const Home = () => {
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
    } else {
      alert("Please select a file to upload!");
    }
  };

  return (
    <div id="app5">
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
                <FontAwesomeIcon icon={faHistory} /> PostShipment
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
        <div className="main-content">
        <div className="logo">
  <img 
    src="https://cargotrailonline.com/wp-content/uploads/2024/09/Cargo_Logo.png"
    className="powerbi-logo" 
  />  
  <h2 className="powerbi-title">CargoTrail</h2>
  
</div>

          <div className="powerbi">
            {/* Add Logo Above the Title */}
            <h5 className="powerbi-name">DashBoard</h5>
           
            
            {/* Power BI iframe */}
            <iframe 
              title="AMAZON" 
              width="1140" 
              height="541.25" 
              id="power"
              src="https://app.powerbi.com/reportEmbed?reportId=ee4eb55a-2513-430d-ab07-856292c3232f&autoAuth=true&ctid=ff335ba2-bb68-489a-bbdd-f49ab4319838" 
              frameBorder="0" 
              allowFullScreen={true}>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
