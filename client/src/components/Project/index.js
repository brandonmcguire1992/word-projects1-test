import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../../utils/queries";
export default function Project() {
  const { loading, data } = useQuery(ME);
  const userData = data?.me || {};
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
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))
    : "";
}
// import React, { Component } from 'react';

// function Project() {
// return (
//     <div class="row">
//     <div class="col s12 m6">
//       <div class="card blue-grey darken-1">
//         <div class="card-content white-text">
//           <span class="card-title">Card Title</span>
//           <p>I am a very simple card. I am good at containing small bits of information.
//           I am convenient because I require little markup to use effectively.</p>
//         </div>
//         <div class="card-action">
//           <button>Edit</button>
//           <button>Delete</button>
//         </div>
//       </div>
//     </div>
//   </div>
// )

// };

// export default Project
