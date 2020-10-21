import React, { useState } from 'react'

function DashboardForm() {
    const [formState, setFormState] = useState({ project: '', text: '' })
    const { project, text } = formState

    const [errorText, setErrorText] = useState('')

    function handleChange(e) {
        // if (e.target.name === 'project') {
        //     const isValid = validateEmail(e.target.value)
        //     // console.log(isValid)
        //     if (!isValid) {
        //         setErrorText('Your project is invalid')
        //     } else {
        //         setErrorText('')
        //     }
        // } else {
            if (!e.target.value.length) {
                setErrorText(`${e.target.name} is required`)
            } else {
                setErrorText('')
            }
        // }
        // if (!errorText) {
        //     setFormState({ ...formState, [e.target.name]: e.target.value })
        // }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formState)
    }

    return (
        <section>
            <h1 className="title" data-testid="h1tag">Project Detail</h1>
            <form className="card-d" id="contact-form" onSubmit={handleSubmit}>
                <div>
                    <label className="LabelDasgboard" htmlFor="name">Project Name:</label>
                    <input type="text" name="project" defaultValue={project} onBlur={handleChange} />
                </div>
                <div>
                    <label className="LabelDasgboard" htmlFor="textArea">Text Area:</label>
                    <textarea name="text" rows="5" defaultValue={text} onBlur={handleChange} />
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