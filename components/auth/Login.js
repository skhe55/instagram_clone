import React, { Component } from 'react';
import { View, Button, Text, _Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onSignIn = this.onSignIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.placeholder]: event.target.value });
    }

    onSignIn() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput placeholder='email' onChange={this.handleChange} style={{ margin: 5 }} />
                <TextInput placeholder='password' onChange={this.handleChange} secureTextEntry={true} style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, }} />
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                    <Button
                        onPress={() => this.onSignIn()}
                        title='Sign In'
                    />
                </View>
            </View>
        )
    }
}

export default Login
