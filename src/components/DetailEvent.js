/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StatusBar, Text, View, StyleSheet, Image} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import NavBackButton from './NavBackButton';

import {Card} from 'react-native-elements'
import Button from "./Button";

import EventStore from '../Store/EventStore'

export default class DetailEvent extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            eventStore: EventStore.getStore()
        };

        this.getEvent = this.getEvent.bind(this)
    }


    componentWillMount() {
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
           // StatusBar.setTranslucent(true);

            //StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
    }

    componentDidMount() {
        EventStore.addLoginListener(this.getEvent)
    }

    componentWillUnmount() {
        EventStore.removeLoginListener(this.getEvent)
    }

    getEvent() {

        this.state = {

            eventStore: EventStore.getStore()
        }

    }


    renderContent = () => (
        <View>
            <View>
                <Card containerStyle={{borderRadius: 5, elevation: 6}}>


                    <Text style={styles.headerText}>{this.state.eventStore.title}</Text>

                    <View style={{marginTop: 20, flex: 1, flexDirection: 'row'}}>
                        <Image source={require('../../assets/location.png')}
                               style={{alignSelf: 'center', flex: 0.1, width: 40, height: 40}}/>
                        <View style={{flexDirection: 'column', flex: 0.9}}>
                            <Text style={styles.locationText}>{this.state.eventStore.address}</Text>
                            <Text style={styles.fullLocationText}>{this.state.eventStore.full_address}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 20, flex: 1, flexDirection: 'row'}}>
                        <Image source={require('../../assets/calendar.png')}
                               style={{alignSelf: 'center', flex: 0.1, width: 40, height: 40}}/>
                        <View style={{flexDirection: 'column', flex: 0.6}}>
                            <Text style={styles.dateText}>{this.state.eventStore.full_date}</Text>
                            <Text style={styles.priceText}>{this.state.eventStore.full_price}</Text>
                        </View>
                        <View style={{flex: 0.3, justifyContent: 'center'}}>
                            <Button title={'BOOK'} onPress={()=>{
                                this.props.navigation.navigate('ProfileEditing')
                            }}/>
                        </View>

                    </View>

                </Card>

                <Text style={{marginTop: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 18}}>Synopsis</Text>
                <Text style={{marginTop: 20, marginLeft: 20, fontSize: 18}}>Aloha!</Text>
                <Text style={{marginTop: 20, marginLeft: 20, fontSize: 18, lineHeight: 40}}>The origin of India's most
                    beloved dance music festival traces back to the warm sands of Candolem in Goa 2013.
                    What Started as a beach side festival celebrating EDM in its niche avatart in 2013 grew int a
                    community of artists
                    and enthusiasts alike coming together.The origin of India's most beloved dance music festival traces
                    back to the warm sands of Candolem in Goa 2013.
                    What Started as a beach side festival celebrating EDM in its niche avatart in 2013 grew int a
                    community of artists
                    and enthusiasts alike coming together.</Text>
            </View>

        </View>
    );

    renderNavBar = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}
        >
            <NavBackButton title='' onPress={() => {
                console.log('ankit back')
                this.props.navigation.navigate('Home')
            }}/>
        </View>
    );

    render() {

        this.get
        console.log(this.state.eventStore)
        return (
            <CollapsibleToolbar
                renderContent={this.renderContent}
                renderNavBar={this.renderNavBar}
                imageSource={this.state.eventStore.image_url}
                collapsedNavBarBackgroundColor='#6A0888'
                translucentStatusBar
                showsVerticalScrollIndicator={false}
                toolBarHeight={150}
            />
        );
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },

    dateText: {
        color: '#777777',
        marginLeft: 20,
        fontSize: 14,
        marginTop: 5
    },

    priceText: {
        color: '#3E3E3E',
        fontSize: 14,
        marginTop: 7,
        marginLeft: 20
    },

    fullLocationText: {
        color: '#777777',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 7
    },
    locationText: {
        color: '#777777',
        marginLeft: 20,
        fontSize: 18,
        color: '#0E84E0',
        marginTop: 5
    }
});
