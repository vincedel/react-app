import React from "react";
//import DatePicker from "react-datepicker";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
import Calendar from "@material-ui/icons/CalendarTodayTwoTone"
import City from "@material-ui/icons/LocationCity"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl"

// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";

import registerPageStyle from "./../../assets/jss/material-kit-react/views/registerPage.jsx";


import image from "./../../assets/img/bg7.jpg";
import CustomInputSelect from "../../components/CustomInputSelect/CustomInputSelect";
import { register } from "../../store/actions";
import {connect} from "react-redux";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import {Redirect} from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            form: {
                fname: '',
                name: '',
                email: '',
                password: '',
                reapeatPassword: '',
                birthdate: '',
                city: '',
                avatar: '',
                gender: '',
                interestedBy: ''
            }
        };
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
    }

    handleFormChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let form = this.state.form;
        this.props.register(form);
    };

    render() {
        if (this.props.redirect) {
            return <Redirect to="/login" />
        }
        const { classes, ...rest } = this.props;
        return (
            <div>
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card className={classes[this.state.cardAnimaton]}>
                                    <form className={classes.form} onSubmit={this.handleSubmit}>
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <img src="http://placehold.it/250x150/" alt="CINER"/>
                                        </CardHeader>
                                        <p className={classes.divider}>Inscription mon con</p>
                                        <CardBody>
                                            {this.props.displayError && <SnackbarContent color="danger" message={this.props.errorMessage}/>}
                                            <CustomInput
                                                labelText="Nom"
                                                id="name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    name: "name",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}
                                            />

                                            <CustomInput
                                                labelText="Prenom"
                                                id="fname"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    name: "fname",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}
                                            />

                                            <CustomInputSelect
                                                label="Genre"
                                                name="gender"
                                                value={this.state.form.gender}
                                                options={[
                                                    {value: 'male', name: 'Male'},
                                                    {value: 'female', name: 'Female'},
                                                    {value: 'neutral', name: 'Neutral'}
                                                ]}
                                                onChange={this.handleFormChange}
                                            />

                                            <CustomInputSelect
                                                label="Intéressé par"
                                                name="interestedBy"
                                                value={this.state.form.interestedBy}
                                                options={[
                                                    {value: 'male', name: 'Male'},
                                                    {value: 'female', name: 'Female'},
                                                    {value: 'neutral', name: 'Neutral'}
                                                ]}
                                                onChange={this.handleFormChange}
                                            />

                                            <CustomInput
                                                labelText="Ville"
                                                id="city"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    name: "city",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <City className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}
                                            />

                                            <CustomInput
                                                labelText="Date de naissance"
                                                id="birthdate"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "date",
                                                    name: "birthdate",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Calendar className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}

                                            />

                                            <CustomInput
                                                labelText="Email"
                                                id="email"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "email",
                                                    name: "email",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}
                                            />
                                            <CustomInput
                                            labelText="Mot de Passe"
                                            id="password"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                name: "password",
                                                required: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Lock className={classes.inputIconsColor}>
                                                        </Lock>
                                                    </InputAdornment>
                                                ),
                                                onChange: this.handleFormChange
                                            }}
                                        />
                                            <CustomInput
                                                labelText="Confirmez votre mot de passe"
                                                id="repeatPassword"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "password",
                                                    name: "repeatPassword",
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Lock className={classes.inputIconsColor}>
                                                            </Lock>
                                                        </InputAdornment>
                                                    ),
                                                    onChange: this.handleFormChange
                                                }}
                                            />
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button simple color="primary" size="lg" type="submit">
                                                Inscription
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displayError: state.registerPage.displayError,
        errorMessage: state.registerPage.errorMessage,
        redirect: state.registerPage.redirect,
    };
}

const mapDispatchToProps = (dispatch) => ({
    register: register(dispatch)
});

const container = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withStyles(registerPageStyle)(container);
