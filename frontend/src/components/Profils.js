import '../styles/Profils.css'
import { AuthContext } from "../context/auth-context";
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

function Profils(){

	const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [email, setEmail] = useState(null);
	const auth = useContext(AuthContext);
	// History context
    const history = useHistory();

    function handleNom(event) {
        setNom(event.target.value)
}

	function handlePrenom(event) {
        setPrenom(event.target.value)
}

	function handleEmail(event) {
        setEmail(event.target.value)
}


	function handleReset(event){
		 event.preventDefault();
        fetch("http://localhost:4200/auth/delete", {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId: auth.userId})
      })
          .then(res => res.json())
          .then(function(data){
                console.log(data)
                history.push("/");
          })
          .catch(err => console.log(err));
	}

	function handleSubmit(event){
		 event.preventDefault();
        fetch("http://localhost:4200/auth/modify", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId:auth.userId, userName: nom, userPrenom: prenom, userEmail:email})
      })
          .then(res => res.json())
          .then(function(data){
        		alert('Modifications prises en compte !');
                history.push("/forum");
          })
          .catch(err => console.log(err));
	}

	return <div>
			<h1> Profil </h1>
			<form className='profils' onSubmit={handleSubmit} onReset={handleReset}>
  				<label>
    				Nom :
    				<input type="text" name="Nom" onChange={handleNom} />
  				</label>
  				<label>
    				Prenom :
    				<input type="text" name="Prenom" onChange={handlePrenom} />
  				</label>
        			<label for="mail">e-mail:
        			<input type="email" id="mail" name="user_mail" onChange={handleEmail} />
        		</label>
  				<div className='boutonsProfil'>
  					<input type="submit" value="Modifier informations" />
    				<input type="reset" value="Supprimer le compte" />
  				</div>
			</form>
		</div>
}

export default Profils