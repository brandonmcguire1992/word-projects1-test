import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_PROJECT } from '../../utils/mutations';
import Auth from "../../utils/auth";

function Redaccion() {

    const [formState, setFormState] = useState({ title: '', ideasText: '' });
    const { title, ideasText } = formState;
    const [errorMessage, setErrorMessage] = useState('');

    const[addProject]=useMutation(ADD_PROJECT);
    //const userData = data?.me || {};

    //For state syncing with the UI.
    function handleChange(e) {
console.log("change:", e.target.name, e.target.value)
        if (!e.target.value.length) {
            setErrorMessage(`${e.target.name} is required.`);
        } else {
            setErrorMessage('');
        }

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }

        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })

    }

    //for submit the data from the form
    const handleSubmit= async e=> {
        e.preventDefault();

      /* try{

       await addProject({
           variables:{formState}
       });
       //clear value
       setFormState('');
       }  
       catch(e){
           console.error(e);
       }    */   
        
    };

    return (
        <section>
            <h3 data-testid="h1">Write your ideas!!</h3>
            <form id="contact-form" className="formProject" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Title:</label>
                    <input  className="formulario" type="text" defaultValue={title} onChange ={handleChange} name="Title" />
                </div>
               
                <div>
                    <label htmlFor="message">Ideas:</label>
                    <textarea className="formulario" name="Ideas" defaultValue={ideasText} onChange ={handleChange} rows="5" />
                </div>
                {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}
               <button data-testid="Submit" type="submit">Submit</button>
            </form>
        </section>
    );
}

 export default Redaccion;