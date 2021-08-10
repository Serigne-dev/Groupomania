import '../styles/Profils.css'

function Profils(){
	return <div>
			<h1> Profil </h1>
			<form className='profils'>
  				<label>
    				Nom :
    				<input type="text" name="Nom" />
  				</label>
  				<label>
    				Prenom :
    				<input type="text" name="Prenom" />
  				</label>
        			<label for="mail">e-mail:
        			<input type="email" id="mail" name="user_mail" />
        		</label>
  				<label>
    				Description :
    				<textarea id="msg" name="user_message"></textarea>
  				</label>
			</form>
		</div>
}

export default Profils