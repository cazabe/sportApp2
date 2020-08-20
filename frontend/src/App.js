import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import ContextWrapper from './User-context'
import Routes from './routes'

function App() {
  return (
    <ContextWrapper>
    <Container>
      <h1>Sports APP</h1>
      <div className="content">
      <Routes/>
      </div>
    </Container>
    </ContextWrapper>
  );
}

export default App;
