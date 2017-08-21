import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { Alert, Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            password: false
        }
    }
    componentDidMount(){
        this.setState({password: false});
    }

  render() {
      const {editCredentials, submitPassword, submitLogin, dispatch, user} = this.props;
      let onChange = function(field, e){
        dispatch(editCredentials(field, e.target.value));
      }
      let onClick = function(){
          dispatch(submitLogin(user, 'login'));
      }
      let forgotPassword = function(){
          this.setState({password: true});
      }
      let onPasswordSumbit = function(){
        dispatch(submitPassword(user, 'email'));
      }
      
    return (
        <div>
            <Form>
                { user.loginError ? (<Alert bsStyle="error" style ={{padding: '0'}}>
                    <strong style ={{color: 'red'}}>Your credentials may be wrong, Please try again</strong>
                </Alert>) : null }

                <FormGroup controlId="formInlineEmail" >
                    <FormControl type="email" placeholder="Email Id" onChange= {onChange.bind(this, 'email')}/>
                </FormGroup>         
                
                {' '}

                {this.state.password ? null : <FormGroup controlId="formInlinePassword" >
                        <FormControl type="password" placeholder="Password" onChange= {onChange.bind(this, 'password')}/>
                    </FormGroup>
                }
                
                {' '}

                {this.state.password ? 
                <Button bsStyle="primary" bsSize="large" block onClick={onPasswordSumbit.bind(this)}>
                    Send
                </Button>
                : 
                <div>
                    <Button bsStyle="primary" bsSize="large" block onClick={onClick.bind(this)}>
                        Sign In
                    </Button>
                    <a onClick={forgotPassword.bind(this)}> Forgot Password? </a>
                </div>
                }
            </Form>
        </div>
    );
  }
}