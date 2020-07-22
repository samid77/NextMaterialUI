import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendRoundedIcon from '@material-ui/icons/SendRounded';


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
  },
  divider: {
    marginTop: theme.spacing(1),
    backgroundColor: '#00B45A'
  },
}));

export function EligibleList(props) {
  const { className, ...rest } = props;
  const classes = useStyles();
  const parameterList = [
    {id: 1, content: "Peserta adalah WNI"},
    {id: 2, content: "Peserta aktif dengan masa tabungan minimal 12 bulan"},
    {id: 3, content: "Untuk KPR / KBR, peserta belum memiliki rumah"},
    {id: 4, content: "Peserta hanya dapat menerima satu kali pembiayaan Tapera"},
    {id: 5, content: "Untuk pengajuan KPR / KBR, peserta belum pernah menerima bantuan Bapertarum atau bantuan perumahan pada data stakeholder lainnya"},
    {id: 6, content: "Untuk KPR / KBR, peserta yang suami / istrinya juga merupakan peserta Tapera dilakukan pengecekan kepada database suami dan istri tersebut"},
  ]

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Parameter Eligible"
        variant="h1"
      />
      <Divider className={classes.divider}/>
      <CardContent>
        <div className={classes.listContainer}>
            <List component="nav">
              {parameterList.map(p => (
                <ListItem key={p.id}>
                  <ListItemText primary={p.content} />
                </ListItem>
              ))}
            </List>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
}

EligibleList.propTypes = {
  className: PropTypes.string
};

export default EligibleList;
