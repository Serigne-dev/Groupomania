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
  				<label>
    				Description :
    				<input type="text" name="Description" />
  				</label>
			</form>
		</div>
}

export default Profils