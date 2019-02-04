import React, { Component } from 'react';
import {createAppContainer} from "react-navigation";
import ApplicationNavigator from "./screenNavigation/ApplicationNavigator"

const AppContainer = createAppContainer(ApplicationNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref = {nav => {this.navigator = nav;}} 
        />
    );
  }
}
