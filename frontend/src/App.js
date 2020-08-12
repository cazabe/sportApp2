import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import Routes from './routes'

function App() {
  return (
    <Container>
      <h1>Sports APP</h1>
      <div className="content">
      <Routes/>
      </div>
    </Container>
  );
}

export default App;
