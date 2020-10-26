import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../../utils/queries";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


export default function AllProject() {
  const { loading, data } = useQuery(ME);
  const userData = data?.me || {};
  console.log("Query user", userData.projects);
  if (!loading) {
    console.log(userData);
  }
  return !loading
    ? userData.projects.map((my) => (
      <div className="Projects">
        {/* <h2>Projects</h2> */}
        <Accordion key={my._id} defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h3>{my.title}</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>{my.ideasText}</p><br />
                <h4>Donation!</h4>
                <ButtonToolbar aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="outline-success">$ 10.00</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2" aria-label="Second group">
                    <Button variant="outline-success">$ 20.00</Button>
                  </ButtonGroup>
                  <ButtonGroup aria-label="Third group">
                    <Button variant="outline-success">$ 50.00</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    ))
    : "";
}
