import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ME } from "../../utils/queries";
import { EDIT_PROJECT, DELETE_PROJECT } from "../../utils/mutations";



function Project() {

  const { loading, data } = useQuery(ME);

  const [project, setProjectInfo] = useState({ title: "", ideasText: "" });
  const { title, ideasText } = project;


  const [deleteProject, { error }] = useMutation(DELETE_PROJECT);

  const userData = data?.me || {};

  const handleDeleteProject = async(id) => {
 console.log("ID to delete")
    try {
      const {data} = await deleteProject(id);
      deleteProject(id);

    }  catch(err) {
    console.error(err);
  }
};

console.log("Query user", userData.projects);

if (!loading) {
  console.log(userData);
}
return !loading
  ? userData.projects.map((my) => (
    <div key={my._id} class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{my.title}</span>
            <p>{my.ideasText}</p>
          </div>
          <div class="card-action">
            <button >Edit</button>
            <button onClick={() => handleDeleteProject(my._id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  ))
  : "";
}

// onClick={(event) =>this.deleteEntry(event, entry._id)}
export default Project;
