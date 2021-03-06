import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_PROJECT } from "../../utils/mutations";
import { ME } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function DashboardForm() {
  const [project, setProjectInfo] = useState({ title: "", ideasText: "" });
  const { title, ideasText } = project;

  const [errorText, setErrorText] = useState("");

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { proj } = cache.readQuery({ query: ME });
        cache.writeQuery({
          query: ME,
          data: { proj: [addProject, ...proj] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: ME });
      cache.writeQuery({
        query: ME,
        data: { me: { ...me, projects: [...me.projects, addProject] } },
      });
    },
  });

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorText(`${e.target.name} is required.`);
    } else {
      setErrorText("");
    }
    if (!errorText) {
      setProjectInfo({ ...project, [e.target.name]: e.target.value });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("projects data", project);
    try {
      let { data } = await addProject({
        variables: { project },
      });
      data.addProject.projects.forEach((project) => {
        idbPromise("projects", "put", project);
      });
      setProjectInfo({ title: "", ideasText: "" });
    } catch (e) {
      window.saveRecord(project);
      console.error(e);
      idbPromise("projects", "put", project);
    }

    //
  };
  return (
    <section>
      <h1 className="title" data-testid="h1tag">
        Project Detail
      </h1>
      <form className="card-d" id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label className="LabelDasgboard" htmlFor="name">
            Project Name:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="LabelDasgboard" htmlFor="textArea">
            Text Area:
          </label>
          <textarea
            name="ideasText"
            rows="5"
            value={ideasText}
            onChange={handleChange}
          />
        </div>
        {errorText && (
          <div>
            <p className="error-text">{errorText}</p>
          </div>
        )}
        <div>
          <br></br>
          <button claseName="btn" data-testid="btntag" type="submit">
            Submit
          </button>

        </div>
      </form>
    </section>
  );
}
export default DashboardForm;
