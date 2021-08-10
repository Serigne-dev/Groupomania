import '../styles/CreationCompte.css'
import Header from './Header'
import Forum from './forum/Forum'
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';




function CreationCompte(){
    const [state, setState] = useState({nom:null,prenom:null, email:null, password:null});

function handleInput(event){
    const name = event.target.name;
    console.log("name"+name);
    var partialState = {};
    partialState[name] = event.target.value;
    setState(partialState);
    console.log("state"+state);
}

function handleNom(event) {
        setState({nom: event.target.value})
}
function handlePrenom(event) {
        setState({prenom: event.target.value})
}
function handleEmail(event) {
        setState({email: event.target.value})
}
function handlePassword(event) {
        setState({password: event.target.value})
}

function handleSubmit(event) {
        event.preventDefault();
        alert('Le nom a été soumis : ' + state.nom + state.prenom + state.email + state.password);
        fetch("http://localhost:4200/auth/signup", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({nom: state.nom, prenom : state.prenom, email: state.email, password: state.password})
      })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
	return <div> 
        <Header />
		<h1>Nouveau Commpte : </h1>
        <form onSubmit={handleSubmit} className='groupomania-connexion'>
            <label>
                    Nom :
                    <input type="text" name="nom" value={state.nom} onChange={handleInput} />
                </label>
                <label>
                    Prenom :
                    <input type="text" name="prenom" onChange={handleInput} />
                </label>       
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required onChange={handleInput}/>
            </div>
          	<div>
    			<label for="pass">Mot de passe (8 caractères minimum):</label>
    			<input type="password" id="pass" name="password" minlength="8" required onChange={handleInput}/>           		
			</div>
			<input type="submit" value="Valider" />     
        </form>
        </div>
}

export default CreationCompte