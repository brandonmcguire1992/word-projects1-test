import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import img from '../../src/assets/favicon.ico';

const Home = () => {
  return (
    <Jumbotron className="Jumbotron" fluid>
      <Container>
        <h1 className="title-home"><span role="img" aria-label="shopping bag"> <img  className="image" src={img} alt="logo" /></span>
Words Projects</h1><br></br>
        <h2 className="title">Welcome</h2><br></br>
          <h3 className="title">
              IF YOU CAN DREAM IT,YOU CAN DO IT      
          </h3>
      </Container>
    </Jumbotron>
  );
};

export default Home;
