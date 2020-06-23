import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import { data, options } from '../General/chart';

const useStyles = makeStyles((theme: any) => ({
  root: {
      backgroundColor: '#dcf2e3'
  },
  listContainer: {
    height: 300,
    [theme.breakpoints.down('sm')]: {
      height: 280,
    },
    [theme.breakpoints.down('xs')]: {
      height: 320,
    },
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export function EligibleList(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Parameter Eligible"
        variant="h1"
      />
      <Divider />
      <CardContent>
        <div className={classes.listContainer}>
            <List component="nav">
                <ListItem>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Peserta aktif dengan masa tabungan minimal 12 bulan" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Untuk KPR / KBR, peserta belum memiliki rumah" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Peserta hanya dapat menerima satu kali pembiayaan Tapera" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Untuk pengajuan KPR / KBR, peserta belum pernah menerima bantuan Bapertarum atau bantuan perumahan pada data stakeholder lainnya" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Untuk KPR / KBR, peserta yang suami / istrinya juga merupakan peserta Tapera dilakukan pengecekan kepada database suami dan istri tersebut" />
                </ListItem>
            </List>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

EligibleList.propTypes = {
  className: PropTypes.string
};

export default EligibleList;
