import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import '../../styles/PublicationForum.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PublicationsForum() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const[articles, setArticles] = useState([]);
  const[comment, setComment] = useState(null);

  function handleChangeComment(event) {
        setComment(event.target.value);
  }

	useEffect(() => {
        // GET request using fetch inside useEffect
        fetch('http://localhost:4200/forum')
            .then(response => response.json())
            .then(article => setArticles(article));
    }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = articleId => event => {
        event.preventDefault();
        fetch("http://localhost:4200/forum/comment", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({comment: comment, article: articleId})
      })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
  }

  const SendButton = () => (
  <IconButton>
    <SendIcon />
  </IconButton>
  )

  return <div>
            <h1> Publications </h1>
            <ul>
                {articles.map(article => (

          <li key={article.id}>
  <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {article.Employe_id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.Title}
        subheader={article.Title}
      />
      <CardMedia
        className={classes.media}
        image=""
        title=""
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.Texte}
        </Typography>
      </CardContent>

      <form onSubmit={handleSubmit(article.articleId)}>
       <TextField
                          id="outlined-full-width"
                          label="Commentaire"
                          style={{ margin: 8 }}
                          placeholder="Ecrivez votre commentaire"
                          style ={{width: '100%'}}

                              multiline
                              rows={4}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChangeComment}
                          InputProps={{endAdornment:  <IconButton type="submit" className="iconButton" aria-label="search"> <SendButton />
       </IconButton>}}/>

       </form>

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ul>
            {article.comments.map(comment => (
              <li className="cardComment" key={comment.Texte}> 
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {comment.Nom} {comment.Prenom}
              </Typography>
              <Typography className={classes.texte} color="textSecondary" gutterBottom>
                {comment.Texte} 
              </Typography>

              </li>

              ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
    </li>
        ))}
            </ul>
            </div>
}
