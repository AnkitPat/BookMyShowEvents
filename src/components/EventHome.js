import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import EventCard from "./EventCard";
import EventListView from "./EventListView"

import LoginStore from '../Store/LoginStore'
import Header from "./Header";


export default class EventHome extends React.Component {
    static navigationOptions = {
        title: 'Events Listing',
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        )
    };



    constructor(props) {
        super(props)
        this.state = {
            store: LoginStore.getStore()
        };

        this.getProfile = this.getProfile.bind(this)


    }

    componentDidMount() {
        LoginStore.addLoginListener(this.getProfile)
    }

    componentWillUnmount() {
        LoginStore.removeLoginListener(this.getProfile)
    }

    getProfile() {

        this.state = {

            store: LoginStore.getStore()
        }

    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="#6A0888" barStyle="light-content"/>
                <Header title={'Events'} onPress={() => {
                    console.log('drawer')
                    if (this.props.navigation.state.index === 0) {
                        this.props.navigation.navigate('DrawerOpen')
                    } else {
                        this.props.navigation.navigate('DrawerClose')
                    }
                }
                }/>

                <View>
                    <EventListView navigateObject={navigate}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'


    },
});
