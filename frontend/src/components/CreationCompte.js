import '../styles/CreationCompte.css'
import Header from './Header'
import Forum from './forum/Forum'
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function CreationCompte(){
    const [state, setState] = useState({nom:null,prenom:null, email:null, password:null});
    const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


function handleInput(event){
    const name = event.target.name;
    var partialState = {};
    partialState[name] = event.target.value;
    setState(partialState);;
}

function handleNom(event) {
        setNom(event.target.value)
}
function handlePrenom(event) {
        setPrenom(event.target.value)
}
function handleEmail(event) {
        setEmail(event.target.value)
}
function handlePassword(event) {
        setPassword(event.target.value)
}

function handleSubmit(event) {
        event.preventDefault();
        alert('Le nom a été soumis : ' + nom + prenom + email + password);
        fetch("http://localhost:4200/auth/signup", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({nom: nom, prenom : prenom, email: email, password: password})
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
                    <input type="text" name="nom" value={state.nom} onChange={handleNom} />
                </label>
                <label>
                    Prenom :
                    <input type="text" name="prenom" onChange={handlePrenom} />
                </label>       
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required onChange={handleEmail}/>
            </div>
          	<div>
    			<label for="pass">Mot de passe (8 caractères minimum):</label>
    			<input type="password" id="pass" name="password" minlength="8" required onChange={handlePassword}/>           		
			</div>
			<input type="submit" value="Valider" />     
        </form>
        </div>
}

export default CreationCompte