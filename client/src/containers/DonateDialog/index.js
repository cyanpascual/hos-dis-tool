import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import DonateUser from './donate';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: '#800000',
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      background: '#660000',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }

  }),
);

function Donate(props) {
  const classes = useStyles();
  const [users, setUsers] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/user', );
    
      setUsers(res.data);
    };
    console.log(users);
    fetchData();
  }, [])
  

  const handleLogin = () => {
    /*let ob = users.filter(data => data.properties.Username === username);
    console.log(ob);
    if (ob.length > 0){
      if (ob[0].properties.Password === password){
        setLogin(true)
        setError(false);
        setAccountType(ob[0].properties.type)
        setHelperText('Login Successfully');
      } else {
        setError(true);
        setHelperText('Wrong passssword');
      }
    } else {
      setError(true);
      setHelperText('Account does not exist')
    }*/
    if (username == "donatetest"){
      if (password == "12345"){
        setLogin(true)
        setError(false);
        setHelperText('Login Successfully');
      } else {
        setError(true);
        setHelperText('Wrong passssword');
      }
    } else {
      setError(true);
      setHelperText('Account does not exist')
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault()
    setLogin(false)
    console.log(login)
    setHelperText('')
  }

  if (login){
    return(
      <DonateUser user={username} />
    )
  };
  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="TrAMS Donate Login" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              className={classes.loginBtn}
              onClick={()=>handleLogin()}
              disabled={isButtonDisabled}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}

export default Donate;