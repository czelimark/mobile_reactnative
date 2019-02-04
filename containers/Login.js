import React, { Component } from 'react';
import { TextInput } from "react-native-gesture-handler";
import {Button, Alert, View, StyleSheet } from 'react-native'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err:''
        }
    }

    loginState = {
        username:'',
        password:''
    };

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder='username'
                    onChangeText={(usr) => this.loginState.username = usr}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(pass) => this.loginState.password = pass}
                />
                <Button
                    style={styles.loginButton}
                    onPress = { () => this.login(this.loginState.username, this.loginState.password)}
                    title="LOGIN"
                    color="blue"
                />
            </View>
        );
    }

    login(usr, pass)
    {
        const _this = this;
        return fetch('http://192.168.43.246:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usr,
                password: pass
            })
        })
        .then(function(json){
            _this.props.navigation.navigate('secured');
            Alert.alert("login successfull");
        })
        .catch(err => {
            Alert.alert("Incorrect username/password");
        });
    }

}

const styles = StyleSheet.create({
    textInput : {
        fontSize:30,
        margin: 20
    },
    loginButton: {
        fontSize:30,
        margin: 20
    }
})
