import { Route } from "wouter";
import Rest from "./components/rest";
import Soap from "./components/soap";
import Home from "./components/home";
import Temperature from "./components/Temperature";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="/">Practica 1</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Rest" id="basic-nav-dropdown">
              <NavDropdown.Item href="/rest">Pokemons</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Soap" id="basic-nav-dropdown">
              <NavDropdown.Item href="/soap">List Languages</NavDropdown.Item>
              <NavDropdown.Item href="/temperature">
                Temperature
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Route exact path="/" component={Home}></Route>
      <Route exact path="/rest" component={Rest}></Route>
      <Route exact path="/soap" component={Soap}></Route>
      <Route exact path="/temperature" component={Temperature}></Route>
    </div>
  );
}

export default App;
