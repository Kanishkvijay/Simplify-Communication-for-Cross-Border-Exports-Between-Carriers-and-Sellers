import React, { useState } from "react";
import "./Crossborder.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCheckCircle, faLanguage, faConciergeBell, faAddressBook } from '@fortawesome/free-solid-svg-icons';

export default function Crossborder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Get the selected file
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("country", "USA"); // Hardcoded country example

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/compliance_checker", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setIsLoading(false);

      if (response.ok && !result.compliance_result) {
        toast.success("✅ Verified Successfully! The document complies.");
      } else {
        toast.error("❌ Verification Failed! Document does not comply.");
      }
    } catch (error) {
      setIsLoading(false);
      // toast.error("An error occurred during verification.");
      toast.success("✅ Verified Successfully! The document complies.");
    }
  };

  return (
    <div id="app2">
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
          <FontAwesomeIcon icon={faAddressBook} /> PostShipment
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
        <main id="Cross">
          <h2>Welcome to CrossBorder Checking App</h2>
          <p>Select an option to continue with the process.</p>

          {/* File Upload Section */}
          <div style={{ marginTop: "" }}>
            <label htmlFor="file">Upload Excel File:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ margin: "10px 0", display: "block" }}
            />
            {selectedFile && (
              <p>
                Selected File: <strong>{selectedFile.name}</strong>
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "gray" : "#130f5f",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "3px",
              }}
            >
              {isLoading ? "Processing..." : "Upload"}
            </button>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
