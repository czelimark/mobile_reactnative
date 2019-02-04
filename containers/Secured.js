import React, { Component } from 'react';
import {Alert, AsyncStorageView, StyleSheet, Button, Text, View, NetInfo} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class Secured extends Component {

    constructor(props)
    {
        super(props);
        this.loadList();
        this.state={'movies':[]}
    }

    render() {
        return(
        <View style={styles.background}>
            <Button
                onPress = {() => this.addMovie()}
                title = "ADD movie"
                color = "green"
            />
            <Button
                onPress={() => this.logout()}
                title="Logout"
                color="blue"
            />
            <ScrollView style={{marginTop:50, paddingLeft:50, paddingRight:50}}>
                {
                    this.state['movies'].map((m) => {
                    return (<View style={styles.rowBox}><Text style={styles.textRow}> {m.title + " , " + m.genre + " , " + m.director + " , " + m.year}</Text></View>); })
                }
            </ScrollView>
        </View>
        );
    };

    addMovie()
    {
        this.props.navigation.navigate('adding');
    }

    logout() 
    {
        this.props.navigation.navigate('login');
    }

    loadList()
    {
        let func = async () => {
            let _this = this;
            NetInfo.getConnectionInfo().then((infoConnection) => {
                if (infoConnection.type == 'none')
                {
                    this.getMoviesFromLocalStorage();
                    return;
                }
            
                fetch('http://192.168.43.246:8080/movies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(responseJson =>this.setState({movies: responseJson}))
                .catch(err => {Alert.alert("got an error");});
        });
        };
        func();
    }

    storeMovieToLocalStorage(movies)
    {
        let func = async () => {
            try {
                for (let i = 0; i < movies.length; i++) {
                    const movie = movies[i];
                    const id = ""+movie["id"].toString();
                    const movieJson = JSON.stringify(movie);
                    await AsyncStorage.setItem(movieId, movieJson);
                }
            } catch(e) {
                console.log("error movies storing") ;
            }
        }
        func();
    }

    getMoviesFromLocalStorage()
    {
        let func = async() => {
            try {
                let movies = [];
                const all = await AsyncStorage.getAllKeys();
                for (let i = 0; i < all.length; i++) {
                    //const key = keys[i];
                    const movieJson = await AsyncStorage.getItem(keys[i]);
                    const movie = JSON.parse(movieJson);
                    movies.push(movie);
                }
                this.setState({'movies' : movies});
            } catch (message) {
                Alert.alert("Loading from local error");
            }
        };
        func();
    }
}

const styles = StyleSheet.create({
    textRow : {
        color: 'red',
        fontSize: 30,
        margin: 10
    },

    rowBox : {
        backgroundColor: 'yellow',
        marginBottom: 10
    },

    background : {
        backgroundColor: 'brown'
    }
})
