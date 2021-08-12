import React, { useState, useEffect, useContext } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../../context/auth-context";
import axios from "axios";


function ProfilForum() {
  const galleryImageList = [
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
    "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
  ];

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
    formData.append("userId", auth.userId);
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