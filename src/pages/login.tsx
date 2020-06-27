import React, {useState, useEffect, useRef } from 'react';
import router from 'next/router'
import validate from 'validate.js';
import axios from 'axios';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button,TextField,Typography} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    backgroundColor: '#F4F6F8',
    height: '100%',
    maxWidth: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    color: '#FFFFFF'
  },
  bio: {
    color: '#FFFFFF'
  },
  contentContainer: {},
  content: {
    height: '170%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(14)
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  alert: {
    position: 'absolute',
  },
  paper: {
    height: 600,
    width: 600,
  },
}));


const Login = props => {
  const classes = useStyles();
  const defaultErrors: any = {};
  const defaultValues: any = {};

  const [formState, setFormState] = useState({
    isValid: false,
    values: defaultValues,
    touched: {},
    errors: defaultErrors
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const timer = useRef<number>();

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formStates => ({
      ...formStates,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if(localStorage.getItem('accesstoken') !== null || '') {
      router.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = event => {
    event.persist();
    
    try {
      const { name, value } = event.currentTarget;
      if(name === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    } catch(err) {
      const errorMessage = `error onChange: ${err.message}`;
      console.log(errorMessage);
    }

    setFormState(formstate => ({
      ...formstate,
      values: {
        ...formstate.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formstate.touched,
        [event.target.name]: true
      }
    }));
  };


  const handleSignIn = async event => {
    const config = {
      headers:{
        'Content-Type': 'application/json',
      },
    }
    
    try { 
      event.preventDefault();
      const payload = { email, password };
      if (!loading) {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/api/auth', payload, config)
        timer.current = setTimeout(() => {
          if(res.data.token !== null || '') {
            localStorage.setItem('accesstoken', res.data.token); 
            router.push('/dashboard');
          }
          console.log(res.status)
        }, 1000);
      }
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      timer.current = setTimeout(() => {
        setSuccess(true)
      }, 5000);
    }
  };


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center"> 
        <Paper className={classes.paper}>
          <div className={classes.content}>
            <div>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              > 
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Signing in to system
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <div className={classes.wrapper}>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid || loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                {!success ? <Alert className={classes.alert} severity="error">
                <AlertTitle>Login Failed</AlertTitle>
                Username or password is invalid
              </Alert> : <div></div>}
              </form>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
