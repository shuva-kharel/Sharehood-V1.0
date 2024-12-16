import React, { useState } from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("lend");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTabSwitch = (tabName) => setActiveTab(tabName);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const items = {
    lend: [
      {
        id: 1,
        title: "Power Drill",
        description: "High-quality power drill for construction projects.",
        buttonLabel: "Request to Borrow",
        imageUrl: "https://via.placeholder.com/200",
      },
      {
        id: 2,
        title: "Lawn Mower",
        description: "Efficient lawn mower for garden maintenance.",
        buttonLabel: "Request to Borrow",
        imageUrl: "https://via.placeholder.com/200",
      },
    ],
    borrow: [
      {
        id: 1,
        title: "Tent",
        description: "Camping tent for outdoor adventures.",
        buttonLabel: "Lend It",
        imageUrl: "https://via.placeholder.com/200",
      },
      {
        id: 2,
        title: "Camera",
        description: "Professional camera for photography projects.",
        buttonLabel: "Lend It",
        imageUrl: "https://via.placeholder.com/200",
      },
    ],
  };

  return (
    <div style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Header openModal={openModal} />
      <SearchBar />
      <div className="container">
        <h2 style={{ color: "#4CAF50", textAlign: "center" }}>Featured Items</h2>
        <Tabs activeTab={activeTab} onTabSwitch={handleTabSwitch} />
        <div className="item-list" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {items[activeTab].map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
      <Footer />
      {isModalOpen && <ProfileModal closeModal={closeModal} />}
    </div>
  );
};

const Header = ({ openModal }) => (
  <header style={{ backgroundColor: "#4CAF50", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", position: "sticky", top: 0, zIndex: 1000 }}>
    <h1>Sharehood</h1>
    <nav style={{ display: "flex", alignItems: "center" }}>
      <a href="#home" style={navLinkStyle}>
        Home
      </a>
      <a href="#about" style={navLinkStyle}>
        About
      </a>
      <a href="#contact" style={navLinkStyle}>
        Contact
      </a>
      <select className="location-select" style={selectStyle}>
        <option value="dang">Tulsipur</option>
        <option value="kathmandu">Kathmandu</option>
        <option value="pokhara">Pokhara</option>
      </select>
      <button className="profile-button" style={buttonStyle} onClick={openModal}>
        Profile
      </button>
    </nav>
  </header>
);

const SearchBar = () => (
  <div className="search-bar" style={searchBarStyle}>
    <input type="text" placeholder="Search for items..." style={inputStyle} />
    <button style={searchButtonStyle}>Search</button>
  </div>
);

const Tabs = ({ activeTab, onTabSwitch }) => (
  <div className="tabs" style={tabsStyle}>
    {["lend", "borrow"].map((tabName) => (
      <div
        key={tabName}
        className={`tab ${activeTab === tabName ? "active" : ""}`}
        style={tabName === activeTab ? activeTabStyle : tabStyle}
        onClick={() => onTabSwitch(tabName)}
      >
        {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
      </div>
    ))}
  </div>
);

const ItemCard = ({ title, description, buttonLabel, imageUrl }) => (
  <div className="item-card" style={itemCardStyle}>
    <img src={imageUrl} alt={title} style={{ maxWidth: "100%", borderRadius: "10px", marginBottom: "10px" }} />
    <h3 style={{ fontSize: "18px", color: "#4CAF50", marginBottom: "10px" }}>{title}</h3>
    <p style={{ fontSize: "14px", color: "#555" }}>{description}</p>
    <button style={buttonStyle}>{buttonLabel}</button>
  </div>
);

const ProfileModal = ({ closeModal }) => (
  <div className="modal" style={modalStyle}>
    <div className="modal-content" style={modalContentStyle}>
      <button className="close-btn" style={closeButtonStyle} onClick={closeModal}>
        ×
      </button>
      <h2>Your Profile</h2>
      <div className="user-info">
        <p>
          <strong>Name:</strong> Shreekrisha Kharel
        </p>
        <p>
          <strong>Location:</strong> Tulsipur, Dang
        </p>
        <p>
          <strong>Email:</strong> example@email.com
        </p>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer style={{ backgroundColor: "#4CAF50", color: "white", textAlign: "center", padding: "1rem", marginTop: "20px", fontSize: "14px" }}>
    <p>&copy; 2024 Sharehood. All rights reserved.</p>
  </footer>
);

export default App;

// Styles
const navLinkStyle = { color: "white", textDecoration: "none", margin: "0 15px", fontSize: "16px" };
const buttonStyle = { backgroundColor: "white", color: "#4CAF50", border: "2px solid #4CAF50", borderRadius: "20px", padding: "5px 15px", fontSize: "14px", cursor: "pointer" };
const selectStyle = { backgroundColor: "white", color: "#4CAF50", border: "2px solid #4CAF50", borderRadius: "20px", padding: "5px 15px", fontSize: "14px", marginRight: "15px" };
const searchBarStyle = { margin: "20px auto", display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "600px", backgroundColor: "white", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" };
const inputStyle = { width: "100%", padding: "10px", border: "none", borderRadius: "5px 0 0 5px", fontSize: "16px", outline: "none" };
const searchButtonStyle = { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "0 5px 5px 0", fontSize: "16px", cursor: "pointer" };
const tabsStyle = { display: "flex", justifyContent: "center", marginBottom: "20px", borderBottom: "1px solid #ddd" };
const tabStyle = { padding: "10px 20px", cursor: "pointer", fontSize: "16px", margin: "0 10px", position: "relative" };
const activeTabStyle = { ...tabStyle, color: "#4CAF50", borderBottom: "3px solid #4CAF50" };
const itemCardStyle = { backgroundColor: "white", border: "1px solid #ddd", borderRadius: "10px", padding: "15px", width: "calc(33.33% - 20px)", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s ease, box-shadow 0.3s ease" };
const modalStyle = { display: "flex", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: "center" };
const modalContentStyle = { backgroundColor: "white", padding: "20px", borderRadius: "10px", maxWidth: "400px", width: "90%", textAlign: "center", position: "relative" };
const closeButtonStyle = { position: "absolute", top: "10px", right: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "50%", padding: "5px 10px", cursor: "pointer" };
