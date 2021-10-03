import React, { Component } from 'react';
import { View, Button, Text, _Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';
import 'firebase/firestore';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.placeholder]: event.target.value });
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={{ marginLeft: 5, marginRight: 5, }}>
                <TextInput placeholder='name' onChange={this.handleChange} style={{ marginBottom: 3, }} />
                <TextInput placeholder='email' onChange={this.handleChange} style={{ marginBottom: 3, }} />
                <TextInput placeholder='password' onChange={this.handleChange} secureTextEntry={true} style={{ marginBottom: 5, }} />
                <View >
                    <Button
                        onPress={() => this.onSignUp()}
                        title='Sign Up'
                    />
                </View>
            </View>
        )
    }
}

export default Register
