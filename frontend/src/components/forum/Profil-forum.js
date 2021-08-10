import React, { useState, useEffect } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import ImageUpload from "./ImageUpload";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';



function ProfilForum(){

    const galleryImageList = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
  "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: `2px solid black`,
    margin: 10
  }
});

    //Posts State
    const [state, setState] = useState({title:null,comment:null});

      function handleChangeTitle(event) {
        setState({title: event.target.value});
      }

    function handleChangeComment(event) {
        setState({comment: event.target.value});
      }

    function handleSubmit(event) {
        event.preventDefault();
        alert('Le nom a été soumis : ' + state.title);
        fetch("http://localhost:4200/forum", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({title: state.title, commentaire : state.comment})
      })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }

    const classes = useStyles();

    return <Card className={classes.root}>
        <div id="newPost">
                <h1 className="titre_creer_publication">Créer une publication</h1>
                <form onSubmit={handleSubmit}>

                    <TextField
                              id="standard-full-width"
                              label="Titre"
                              style={{ margin: 8 }}
                              placeholder="Titre de la publication"
                              fullWidth
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChangeTitle}
                    />

                    <TextField
                          id="outlined-full-width"
                          label="Message"
                          style={{ margin: 8 }}
                          placeholder="Contenu de la publication"
                          style ={{width: '100%'}}

                              multiline
                              rows={4}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChangeComment}
                    />


                    <label for="upload-button" >
                            <ImageUpload cardName="Input Image" imageGallery={galleryImageList} />
                    </label>

                    <Button type="submit" variant="contained" color="primary">
                      Envoyer
                    </Button>


                  </form>
               </div>
           </Card>
}

export default ProfilForum