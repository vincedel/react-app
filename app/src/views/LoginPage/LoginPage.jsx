import React from "react";
import { compose } from 'recompose'
import { connect } from 'react-redux'
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

import loginPageStyle from "./../../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "./../../assets/img/bg7.jpg";
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions';

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
  render() {
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
                  <form className={classes.form} onSubmit={(e) => {
                    e.preventDefault();
                    this.props.actions.login(this.state.form.email, this.state.form.password);
                  }}
                  >
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <img src="http://placehold.it/250x150/" alt="CINER"/>
                    </CardHeader>
                    <p className={classes.divider}>Login</p>
                    <CardBody>
                      <CustomInput
                        labelText="email"
                        id="email"
                        value={this.state.form.email}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
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

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default
withStyles(loginPageStyle)(
    compose(
        connect(null, mapDispatchToProps),
    )(LoginPage)
);
