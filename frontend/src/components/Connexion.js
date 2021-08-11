import '../styles/Connexion.css'
import {Link} from 'react-router-dom'
import Header from './Header'
import Forum from './forum/Forum'
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

 function Connexion(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // History context
    const history = useHistory();

    
 function handleEmail(event) {
        setEmail(event.target.value)
}
function handlePassword(event) {
        setPassword(event.target.value)
}

function handleSubmit(event) {
        event.preventDefault();
        alert('connexion : ' + email + password);
        fetch("http://localhost:4200/auth/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password})
      })
          .then(res => res.json())
          .then(function(data){
                console.log(data)
                history.push("/forum");
          })
          .catch(err => console.log(err));
      }

	return <div> 
        <Header />
		<h1>Se Connecter : </h1>
        <form onSubmit={handleSubmit} className='groupomania-connexion'>       
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required onChange={handleEmail} />
            </div>
          	<div>
    			<label for="pass">Mot de passe :</label>
    			<input type="password" id="pass" name="password" minlength="8" required onChange={handlePassword} />           		
			</div>
			<input type="submit" value="Valider" />
        </form>
        		<Link className="btn" to={'/creationCompte'}>Créer un compte</Link>
        </div>
    
      	
}
export default Connexion