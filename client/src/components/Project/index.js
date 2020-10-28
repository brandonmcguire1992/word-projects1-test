import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ME } from "../../utils/queries";
import { DELETE_PROJECT } from "../../utils/mutations";

function Project() {

  const { loading, data } = useQuery(ME);

    const [deleteProject] = useMutation(DELETE_PROJECT);

  const userData = data?.me || {};

  const handleDeleteProject = async (_id) => {
    console.log("ID to delete", _id)

    try {
      await deleteProject({ variables: { _id } });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  console.log("Query user", userData.projects);

  if (!loading) {
    console.log(userData);
  }

  return (
    <>
      <h5 className="title-2">{userData.firstName} {userData.lastName} have {userData.projectCount} project(s)</h5>
      
      {
        !loading ? userData.projects.map((my) => {
          return (
            <div className="Project">
              <Accordion key={my._id} defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h3>{my.title}<br></br>
                  <h6>{my.date}</h6></h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <p>{my.ideasText}</p><br />                

                      <Button variant="outline-success" onClick={() => handleDeleteProject(my._id)}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        Delete
                      </Button>

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          )
        }) : ""}
    </>
  )
}

export default Project;
