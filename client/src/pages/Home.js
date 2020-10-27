import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
// import DashboardForm from "../components/Dashboard" 

const Home = () => {
  return (
    <Jumbotron className="Jumbotron" fluid>
      <Container>
        <h1 className="title-home"><span role="img" aria-label="shopping bag">📝</span>Words Projects</h1><br></br>
        <h2 className="title">Welcome</h2><br></br>
          <p className="paragraph"><em>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </em>
          </p>
      </Container>
    </Jumbotron>
  );
};

export default Home;
