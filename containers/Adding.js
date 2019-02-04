import React, { Component } from 'react';
import { TextInput } from "react-native-gesture-handler";
import {Button, Alert, View, StyleSheet } from 'react-native'

export default class Adding extends React.Component {
    constructor(props) {
        super(props);
    }

    
    inputState = {
        title:'',
        genre:'',
        director:'',
        year:''
    };


    render() {
        return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder='Title'
                onChangeText={(text) => this.inputState.title = text}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Genre'
                onChangeText={(text) => this.inputState.genre = text}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Director'
                onChangeText={(text) => this.inputState.dir = text}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Year'
                onChangeText={(text) => this.inputState.year = text}
            />
            <Button
                style={styles.addButton}
                onPress = { () => this.add(this.inputState.title, this.inputState.genre,
                                           this.inputState.dir, this.inputState.year)}
                title="ADD"
                color="cyan"
            />
        </View>
        );
    }

    add(_title, _genre, _director, _year) {
        const _this = this;
        if (_title=="" || _genre=="" || _director=="" || _year=="")
            return;
        return fetch('http://192.168.43.246:8080/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: '',
                title: _title,
                genre: _genre,
                director: _director,
                year: _year
            })
        })
        .then(function(json){
            _this.props.navigation.navigate('secured');
            Alert.alert("add successfull");
        })
        .catch(err => {
            Alert.alert("Incorrect data");
        });
    }

}

const styles = StyleSheet.create({
    textInput : {
        fontSize:30,
        margin: 20
    },
    addButton: {
        fontSize:30,
        margin: 20
    }
})
