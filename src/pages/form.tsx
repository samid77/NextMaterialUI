import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Form(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
        <Card
        {...rest}
        >
        <form
            autoComplete="off"
            noValidate
        >
            <CardHeader
            subheader="The information can be edited"
            title="Profile"
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name"
                        margin="dense"
                        name="firstName"
                        onChange={handleChange}
                        required
                        value={values.firstName}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Last name"
                        margin="dense"
                        name="lastName"
                        onChange={handleChange}
                        required
                        value={values.lastName}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="dense"
                        name="email"
                        onChange={handleChange}
                        required
                        value={values.email}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Phone Number"
                        margin="dense"
                        name="phone"
                        onChange={handleChange}
                        type="number"
                        value={values.phone}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Select State"
                        margin="dense"
                        name="state"
                        onChange={handleChange}
                        required
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={values.state}
                        variant="outlined"
                    >
                        {states.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Country"
                        margin="dense"
                        name="country"
                        onChange={handleChange}
                        required
                        value={values.country}
                        variant="outlined"
                    />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Save details
                </Button>
            </CardActions>
        </form>
        </Card> 
        </Grid>
      </Grid>
    </div>
  );
}
