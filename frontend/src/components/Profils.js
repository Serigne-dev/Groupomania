import '../styles/Profils.css'
import { AuthContext } from "../context/auth-context";
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from "axios";

function Profils(){

	const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [email, setEmail] = useState(null);
	  const auth = useContext(AuthContext);
	// History context
    const history = useHistory();
    const [img, setImg] = useState(null);

    function handleNom(event) {
        setNom(event.target.value)
}

	function handlePrenom(event) {
        setPrenom(event.target.value)
}

	function handleEmail(event) {
        setEmail(event.target.value)
}

function handleChangeImg(event) {
    setImg(event.target.files[0]);
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
                console.log(data);
                auth.logout();
                history.push("/");
          })
          .catch(err => console.log(err));
	}

	function handleSubmit(event){
		event.preventDefault();
    alert(img);
		const formData = new FormData();
	    formData.append("userId", auth.userId);
	    formData.append("userName", nom);
	    formData.append("userPrenom", prenom);
	    formData.append("userEmail", email);
	    formData.append("image", img);


    	axios
      .put("http://localhost:4200/auth/modify", formData)
      .then((res) => console.log(res))
      .then(function(data){
        		alert('Modifications prises en compte !');
            auth.userName = nom;
            history.push("/forum");
          })
      .catch((err) => console.log(err));

/*
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
          .catch(err => console.log(err));*/
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
        		<div className='ajoutPhotoProfil'> 
  				<p> ajouter une photo </p>
  				<input type="file" onChange={handleChangeImg}/>
  				</div> <br />
  				<div className='boutonsProfil'>
  					<input type="submit" value="Modifier informations" />
    				<input type="reset" value="Supprimer le compte" />
  				</div>
			</form>
		</div>
}

export default Profils