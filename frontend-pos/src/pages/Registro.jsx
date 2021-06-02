import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Registro = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const history = useHistory();


  const handleRegistro = () => {
    const params = {
      email: email,
      contrasenia: contrasenia,
    }
    axios.post("http://localhost:5000/api/login/registro", params)
  }

  const handleRedirectLogin = () => {
    let path = `/Login`;
    history.push(path);
  }



  return (
    <Container component="main" maxWidth="xs" className="main-content">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setContrasenia(e.target.value)}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            //type="submit"
            onClick={() => handleRegistro()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registro
          </Button>
          <Button
            //type="submit"
            onClick={() => handleRedirectLogin()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ya registrado?
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Registro;