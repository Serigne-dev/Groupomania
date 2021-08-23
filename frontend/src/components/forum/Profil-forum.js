import React, { useState, useEffect, useContext } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import '../../styles/profilForum.css'


function ProfilForum() {
  const userData = JSON.parse(localStorage.getItem('userData'));
 

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      border: `2px solid black`,
      margin: 10,
    },
  });

  //Posts State
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [img, setImg] = useState("");

  // Authentication context
    const auth = useContext(AuthContext);

  function handleChangeTitle(event) {
    setTitle(event.target.value);
  }

  function handleChangeComment(event) {
    setComment(event.target.value);
  }

    function handleChangeImg(event) {
    setImg(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userId", userData.userId);
    formData.append("title", title);
    formData.append("commentaire", comment);
    formData.append("image", img);


    axios
      .post("http://localhost:4200/forum", formData)
      .then((res) => console.log(res), alert("Message crée"))
      .then(() => {document.location.reload()})
      .catch((err) => console.log(err));
  }

  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
            value={title}
          />

          <TextField
            id="outlined-full-width"
            label="Message"
            style={{ margin: 8 }}
            placeholder="Contenu de la publication"
            style={{ width: "100%" }}
            multiline
            rows={4}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChangeComment}
            value={comment}
          />


          <input type="file" onChange={handleChangeImg}/>

          <Button type="submit" variant="contained" color="primary">
            Envoyer
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default ProfilForum;