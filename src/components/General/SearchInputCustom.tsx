import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export function SearchInputCustom(props) {
  const { className, onChange, dispatchFunc, style, onKeyUp, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const resetSearch = () => {
    dispatch(dispatchFunc);
  }

  return (
    <Paper 
        {...rest}
        component="form"
        className={clsx(classes.root, className)}
        style={style}>
      <InputBase
        {...rest}
        className={classes.input}
        disableunderline="true"
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <SearchIcon />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={resetSearch} color="primary" className={classes.iconButton} aria-label="directions">
        <CachedRoundedIcon />
      </IconButton>
    </Paper>
  );
}

SearchInputCustom.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  dispatchFunc: PropTypes.any,
  placeholder: PropTypes.string,
  style: PropTypes.object
};

export default SearchInputCustom;
