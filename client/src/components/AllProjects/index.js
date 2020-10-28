import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_PROJECTS, QUERY_USER } from "../../utils/queries";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


export default function AllProject() {
  const { loading, data } = useQuery(ALL_PROJECTS);
  const userData = data?.users || {};
  // console.log("Query user", data.projects);
  if (!loading) {
    console.log('All project2', userData);
    console.log('All project', userData[0].projects[0].title);
  }
  return !loading
    ? (userData || []).map(userData => (
      <div className="Projects">
        {/* <h2>Projects</h2> */}
        <Accordion key={userData?._id} defaultActiveKey="0">
          { userData?.projects?.map(project => (
            <Card key={project?._id}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
          <h3>{project?.title}<h6>User: {userData.firstName} {userData.lastName}</h6></h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>{project?.ideasText}</p><br />
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
          ))}
        </Accordion>
      </div>
    ))
    : "";
}
