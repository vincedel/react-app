import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class CustomInputSelect extends React.Component {
    state = {
        gender: '',
        open: false,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;

        return (
            <form autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">Genre</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.gender}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'gender',
                            id: 'demo-controlled-open-select',
                        }}
                    >
                        <MenuItem value={10}>Homme</MenuItem>
                        <MenuItem value={20}>Femme</MenuItem>
                        <MenuItem value={30}>Autre</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

CustomInputSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomInputSelect);