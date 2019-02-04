import {createStackNavigator} from 'react-navigation'
import Login from '../containers/Login'
import Secured from '../containers/Secured'
import Adding from '../containers/Adding'

const ApplicationNavigator = createStackNavigator({
    login : {
        screen : Login
    },
    secured : {
        screen : Secured
    },
    adding : {
        screen : Adding
    }
})

export default ApplicationNavigator;