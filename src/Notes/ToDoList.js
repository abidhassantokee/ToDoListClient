import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextFormat from '@material-ui/icons/TextFormat';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    textField: {
        width: '100%',
    },
});


function InteractiveList(props) {
    const {classes} = props;
    const {dense} = {
        dense: false,
        secondary: false,
    };

    return (
        <BlockUi tag="div" blocking={props.toDoState.blockUI}>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                {
                                    props.toDoStore.notes.map((note, index) =>
                                        <ListItem key={note.id}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <TextFormat/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={note.note}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="Delete" onClick={() => {
                                                    props.deleteToDoItem(note.id, index)
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </div>
                        <div style={{padding: '40px'}}>
                            <Grid container spacing={0}>
                                <Grid item md={11}>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Add Note"
                                        multiline
                                        rowsMax="4"
                                        margin="normal"
                                        className={classes.textField}
                                        value={props.toDoState.note}
                                        onChange={(event) => {
                                            props.handleNoteFieldChange(event.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item md={1}>
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                        onClick={(event) => {
                                            props.handleNoteSubmit()
                                        }}
                                    >
                                        Add Notes
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Snackbar
                open={props.toDoState.snackbar.status}
                autoHideDuration={3000}
                message={props.toDoState.snackbar.message}
                onClose={props.handleSnackbarClose}
            />
        </BlockUi>
    );

}

InteractiveList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
