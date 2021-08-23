import '../styles/Profils.css'
import { AuthContext } from "../context/auth-context";
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";

function Profils(){

    const auth = useContext(AuthContext);
	const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [email, setEmail] = useState(null);
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
		const formData = new FormData();
	    formData.append("userId", auth.userId);
        const nomF = nom!=null ? nom : auth.userName;
        const prenomF = prenom!=null ? prenom : auth.userPrenom;
        const emailF = email!=null ? email : auth.userEmail;
        const imageF = img!=null ? img : auth.userImg;
	    formData.append("userName", nomF);
	    formData.append("userPrenom", prenomF);
	    formData.append("userEmail", emailF);
	    formData.append("image", imageF);


    	axios
      .put("http://localhost:4200/auth/modify", formData)
      .then(function(res){
        		alert('Modifications prises en compte !');
            auth.userName = nomF;
            auth.userPrenom = prenomF;
            auth.userEmail = emailF;
            if(res != null){
                auth.userImg = res.data.userImg;
            }
            localStorage.setItem(
            "auth",
            JSON.stringify({
                userId: auth.userId,
                userName: auth.userName,
                userPrenom: auth.userPrenom,
                userEmail: auth.userEmail,
                userImg: auth.userImg,
                token: auth.token
            }));
            history.push("/forum");
          })
      .catch((err) => console.log(err));
	}
	return <div>
			<h1> Profil </h1>
			<form className='profils' onSubmit={handleSubmit} onReset={handleReset}>
  				<label>
    				Nom :
    				<input type="text" name="Nom" placeholder={auth.userName} onChange={handleNom} />
  				</label>
  				<label>
    				Prenom :
    				<input type="text" name="Prenom" placeholder={auth.userPrenom} onChange={handlePrenom} />
  				</label>
        			<label for="mail">e-mail:
        			<input type="email" id="mail" name="user_mail" placeholder={auth.userEmail} onChange={handleEmail} />
        		</label>
                <Avatar alt="" src={auth.userImg} >
                </Avatar>
        		<div className='ajoutPhotoProfil'> 
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