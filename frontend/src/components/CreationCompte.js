import '../styles/CreationCompte.css'
import Header from './Header'
import Forum from './forum/Forum'
import {Link} from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";


function CreationCompte(){
    const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // History context
    const history = useHistory();
    const auth = useContext(AuthContext);


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
          .then(function(data){
                console.log(data)
                history.push("/");
                //auth.login(data.userId, data.userName, data.userPrenom, data.userEmail, data.userImg, data.token);

          })
          .catch(err => console.log(err));
      }
	return <div className="bodyCreationCompte"> 
        <Header />
        <div className="creationCompte">
		<h1>Nouveau Compte : </h1>
        <form onSubmit={handleSubmit} className='groupomania-connexion'>
            <label>
                    Nom :
                    <input type="text" name="nom" onChange={handleNom} />
                </label> <br />
                <label>
                    Prenom :
                    <input type="text" name="prenom" onChange={handlePrenom} />
                </label> <br />      
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required onChange={handleEmail}/>
            </div> <br />
          	<div>
    			<label for="pass">Mot de passe (8 caractères minimum):</label>
    			<input type="password" id="pass" name="password" minlength="8" required onChange={handlePassword}/>           		
			</div> <br />
			<input type="submit" value="Valider" />     
        </form>
        </div>
        <footer className='footerCreerCompte'> Groupomania </footer>
        </div>
}

export default CreationCompte