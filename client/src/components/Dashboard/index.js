import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_PROJECT } from '../../utils/mutations';
function DashboardForm() {
    const [project, setProjectInfo] = useState({ title: '', ideasText: '' })
    const { title, ideasText } = project;
    const [errorText, setErrorText] = useState('')
    const [addProject] = useMutation(ADD_PROJECT);
    function handleChange(e) {
        if (!e.target.value.length) {
            setErrorText(`${e.target.name} is required.`);
        } else {
            setErrorText('');
        }
        if (!errorText) {
            setProjectInfo({ ...project, [e.target.name]: e.target.value });
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("projects data", project)
        try {
            await addProject({
                variables: { project }
            });
        }
        catch (e) {
            console.error(e);
        }
    };
    return (
        <section>
            <h1 className="title" data-testid="h1tag">Project Detail</h1>
            <form className="card-d" id="contact-form" onSubmit={handleSubmit}>
                <div>
                    <label className="LabelDasgboard" htmlFor="name">Project Name:</label>
                    <input type="text" name="title" defaultValue={title} onChange={handleChange} />
                </div>
                <div>
                    <label className="LabelDasgboard" htmlFor="textArea">Text Area:</label>
                    <textarea name="ideasText" rows="5" defaultValue={ideasText} onChange={handleChange} />
                </div>
                {errorText && (
                    <div>
                        <p className="error-text">{errorText}</p>
                    </div>
                )}
                <button data-testid="btntag" type="submit">Submit</button>
            </form>
        </section>
    )
}
export default DashboardForm