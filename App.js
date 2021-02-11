import React from 'react';
import Scanscreen from './screens/Scanscreen';
import { createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component {
render(){
return (
<AppContainer/>
);
}
}

const TabNavigator=createBottomTabNavigator({
Scan:{screen:Scanscreen},
})
const AppContainer=createAppContainer(TabNavigator)


