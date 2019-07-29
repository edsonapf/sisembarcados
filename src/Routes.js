import React from 'react';
import { 
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Rooms from './screens/Rooms';
import RoomLocation from './screens/RoomLocation';

const StackNavigator = createStackNavigator({
    'Rooms': {
        screen: Rooms,
        navigationOptions: {
            header: null
        }
    },
    'RoomLocation': {
        screen: RoomLocation,
        navigationOptions: {
            headerTitle: 'Localização da sala',
        }
    }
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;