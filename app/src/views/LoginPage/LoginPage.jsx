import React from "react";
import {compose} from 'recompose'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import isAuthenticated from "./../../security/Security";

import loginPageStyle from "./../../assets/jss/material-kit-react/views/loginPage.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";

import image from "./../../assets/img/bg7.jpg";
import {bindActionCreators} from 'redux'
import login from '../../store/actions';
import RequestAPI from "../../store/RequestAPI";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            form: {
                email: '',
                password: ''
            }
        };
        this.cardBody = React.createRef();
        this.email = React.createRef();
        this.error = React.createRef();
    }

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function () {
                this.setState({cardAnimaton: ""});
            }.bind(this),
            700
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.form.email, this.state.form.password);
    };

    render() {
        const {classes, ...rest} = this.props;
        let error = null;
        if (this.props.hasUser) {
            return <Redirect to="/" />
        }
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
                                    <form className={classes.form} onSubmit={this.handleSubmit}
                                    >
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <img src="http://placehold.it/250x150/" alt="CINER"/>
                                        </CardHeader>
                                        <CardBody id="login-body" ref={this.cardBody}>
                                            {this.props.displayError && <SnackbarContent color="danger" message={this.props.errorMessage}/>}
                                            <CustomInput
                                                labelText="email"
                                                id="email"
                                                ref={this.email}
                                                value={this.state.form.email}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "email",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    ),
                                                    onChange: (e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            form: {
                                                                ...this.state.form,
                                                                email: e.target.value
                                                            }
                                                        })
                                                    }
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Password"
                                                id="pass"
                                                value={this.state.form.password}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "password",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Lock className={classes.inputIconsColor}>
                                                            </Lock>
                                                        </InputAdornment>
                                                    ),
                                                    onChange: (e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            form: {
                                                                ...this.state.form,
                                                                password: e.target.value
                                                            }
                                                        })
                                                    }
                                                }}
                                            />
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button simple color="primary" size="lg" type="submit">
                                                Connexion
                                            </Button>
                                            <Button simple color="primary" size="lg">
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

// class LoginPage extends React.Component {
//     state = {
//         form: {
//             email: '',
//             password: '',
//         }
//     };
//
//     handleFormChange = event => {
//         this.setState({
//             ...this.state,
//             form: {
//                 ...this.state.form,
//                 [event.target.name]: event.target.value
//             }
//         });
//     };
//
//     handleSubmit = e => {
//         const { login } = this.props;
//         const { email, password } = this.state.form;
//
//         e.preventDefault();
//         login(email, password);
//     };
//
//     render () {
//         const { hasUser, displayError, errorMessage } = this.props;
//         console.log('render');
//         return hasUser
//             ? (
//                 <Redirect to="/" />
//             )
//             : (
//                 <form onSubmit={this.handleSubmit}>
//                     {displayError && <div>{errorMessage}</div>}
//                     <input name="email" type="text" onChange={this.handleFormChange} />
//                     <input name="password" type="text" onChange={this.handleFormChange} />
//                     <input type="submit" value="envoi"/>
//                 </form>
//             );
//     }
// }

const mapStateToProps = (state) => ({
    displayError: state.loginPage.displayError,
    errorMessage: state.loginPage.errorMessage,
    hasUser: !!state.user
});

const mapDispatchToProps = (dispatch) => ({
    login: login(dispatch)
});

const container = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default withStyles(loginPageStyle)(container);
