import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import SignUp from '../components/Auth/SignUp';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => ({
  root: {
    backgroundColor: '#F4F6F8',
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: '#FFFFFF'
  },
  bio: {
    color: '#FFFFFF'
  },
  logoImage: {
    marginLeft: theme.spacing(4)
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  content: {}
}));
const handleSignUp = event => {
};

const handleChange = event => {
};

const Registrasi = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          lg={8}
          item
        >
          <SignUp useStyles = {classes}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registrasi;
