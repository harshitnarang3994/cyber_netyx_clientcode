import React from "react";
import Navbar from "react-bootstrap/Navbar";
export default class Header extends React.Component {
  render() {
    return (
      <Navbar style={{ backgroundColor: "#0e0e0e", color: "#fff" }}>
        <Navbar.Brand
          style={{ color: "#fff", width: "100%", fontFamily: "sans-serif" }}
        >
          <h2>Scheduler App</h2>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
    );
  }
}
