import HeaderForum from './Header-forum'
import PublicationsForum from './Publications-forum'
import ProfilForum from './Profil-forum'
import '../../styles/Forum.css'

function Forum(){
	return(<div className='headerForum'>
		<div>
			<HeaderForum />
		</div>
		<div className='publicationEtProfil'>
			<div className='publication'> 
				<PublicationsForum />
			 </div>
			<div className='profil'> 
				<ProfilForum />  
			</div>
		 </div>
		</div>
		)
}

export default Forum