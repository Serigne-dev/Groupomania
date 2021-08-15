import '../styles/Connexion.css'
import {Link} from 'react-router-dom'
import Header from './Header'
import Forum from './forum/Forum'
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";


 function Connexion(){
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // History context
    const history = useHistory();
    const auth = useContext(AuthContext);

    
function handleEmail(event) {
        setEmail(event.target.value)
}
function handlePassword(event) {
        setPassword(event.target.value)
}

function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:4200/auth/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password})
      })
          .then(function(res){
            if(res.ok){
                return res.json();
            }
          })
          .then(function(data){
            if(data != null){
                history.push("/forum");
                console.log("userId:"+data.userEmail);
                auth.login(data.userId, data.userName, data.userPrenom, data.userEmail, data.userImg, data.token);
            }  
          })
          .catch(err => console.log(err));
      }

	return <div className='bodyConnexion'> 
        <Header/>
        <div className='seConnecter'>
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
        <footer className='footerConnexion'> Groupomania </footer>
     </div>
    
      	
}
export default Connexion