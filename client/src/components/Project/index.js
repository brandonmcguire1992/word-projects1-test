import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ME } from "../../utils/queries";
import { DELETE_PROJECT } from "../../utils/mutations";



function Project() {

  const { loading, data } = useQuery(ME);
 
  const [deleteProject, { error }] = useMutation(DELETE_PROJECT);

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
  return(
    <>
    <h5>{userData.firstName} {userData.lastName} have {userData.projectCount} project(s)</h5>
     {
       !loading ? userData.projects.map((my) => {
       return (
 
         <div key={my._id} className="row">          
           <div className="col s12 m6">
             <div className="card blue-grey darken-1">
               <div className="card-content white-text">
                 <span className="card-title">{my.title}</span>
                 <p>{my.ideasText}</p>
               </div>
               <div className="card-action">
                 <button >Edit</button>
                 <button onClick={() => handleDeleteProject(my._id)}>Delete</button>
               </div>
             </div>
           </div>
         </div>
       )      
       }) : ""}
 
   </>
  )
 

}

export default Project;
