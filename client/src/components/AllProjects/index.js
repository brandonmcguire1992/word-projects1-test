import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_PROJECTS, QUERY_USER } from "../../utils/queries";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51HfFq4BJJNpYEWGkBe74qjIpBnQ19n3q3jGxQdSSclICssLxqhfjCqucyKIvF2ZCcGT4ClJ0CdSNrjyJmPnGHEil00NNtLH9r8');

export default function AllProject() {
  const { loading, data } = useQuery(ALL_PROJECTS);
  const userData = data?.users || {};

  const handleClick = async (event) => {
    
    console.log("value button clicked:", event.target.value) 
        const value = event.target.value

    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const response = await fetch(`/create-checkout-session/`+ value, { method: 'POST'});

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  // console.log("Query user", data.projects);
  if (!loading) {
    console.log('All project2', userData);
    //console.log('All project', userData[0].projects[0].title);
  }
  return !loading
    ? (userData || []).map(userData => (
      <div className="Projects">
        {/* <h2>Projects</h2> */}
        <Accordion key={userData?._id} defaultActiveKey="0">
          { userData?.projects?.map(project => (
            <Card key={project?._id}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
              <h3><strong>{project?.title}</strong>
                  <h6>By: {userData.firstName} {userData.lastName}</h6>
                </h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>{project?.ideasText}</p><br />
                  <h4>Donation!</h4>
                  <ButtonToolbar className="donationButton" aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2" aria-label="First group">
                      <Button variant="outline-success" value='10' role="link" onClick={(e)=> handleClick(e)}>$ 10.00</Button>
                    </ButtonGroup>
                    <ButtonGroup className="mr-2" aria-label="Second group">
                      <Button variant="outline-success" value='20' role="link" onClick={(e)=> handleClick(e)}>$ 20.00</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="Third group">
                      <Button variant="outline-success" value='50' role="link" onClick={(e)=> handleClick(e)}>$ 50.00</Button>
                    </ButtonGroup>
                    {/* <button role="link" onClick={handleClick}>
                      Checkout
                    </button> */}
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
