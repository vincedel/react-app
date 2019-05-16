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
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;
        let options = [];
        if (typeof this.props.options !== "undefined") {
            this.props.options.map((item, key) => {
                options.push(<MenuItem key={this.props.name+'_'+item.value} value={item.value}>{item.name}</MenuItem>)
            });
        }
        return (
            <FormControl className={classes.formControl}>
                <InputLabel required={true} htmlFor={this.props.name+"-select"}>{this.props.label}</InputLabel>
                <Select
                    ref={this.input}
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    inputProps={{
                        name: this.props.name,
                        id: this.props.name+"-select",
                    }}
                >
                    {options}
                </Select>
            </FormControl>
        );
    }
}

CustomInputSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomInputSelect);