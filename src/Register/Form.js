import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function Form(props) {
    const {classes} = props;

    return (
        <BlockUi tag="div" blocking={props.registerState.blockUI}>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircle/>
                    </Avatar>
                    <Typography variant="headline">Register</Typography>
                    <form className={classes.form} onSubmit={props.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" value={props.registerState.name} onChange={props.handleChange}
                                   autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" value={props.registerState.email}
                                   onChange={props.handleChange}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" name="password" type="password" value={props.registerState.password}
                                   onChange={props.handleChange}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                            <Input id="passwordConfirmation" name="passwordConfirmation" type="password"
                                   value={props.registerState.passwordConfirmation} onChange={props.handleChange}/>
                        </FormControl>
                        <Button type="submit" variant="raised" color="primary" className={classes.submit} fullWidth>
                            Register
                        </Button>
                    </form>
                </Paper>
            </main>
            <Snackbar
                open={props.registerState.snackbar.status}
                autoHideDuration={3000}
                message={props.registerState.snackbar.message}
                onClose={props.handleSnackbarClose}
            />
        </BlockUi>
    );
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);