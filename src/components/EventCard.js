import React, {Component} from 'react'
import {
    View, StyleSheet, Text, Image, TouchableOpacity, Alert,
    Vibration
} from 'react-native'

import PropTypes from 'prop-types'
import Button from '../../Button'

import EventStore from '../Store/EventStore'
import {saveDetails} from '../actions/EventDetailAction'
import DetailEvent from "./DetailEvent";

export default class EventCard extends Component {

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
        super(props);

        console.log(props)
        this.state = {
            eventStore: EventStore.getStore()
        }
    }


    render() {
        return (


            <View style={[Styles.cardStyle, this.props.style]}>
                <View>
                    <Image style={Styles.imageStyle} source={{uri: this.props.image}}/>
                </View>
                <View style={Styles.contentTextView}>
                    <View style={Styles.dateTopView}>
                        <Text style={{fontWeight: '600', color: '#00D4BC', marginBottom: 3}}>DEC</Text>
                        <Text style={{fontWeight: '600', marginBottom: 3}}>27</Text>
                        <Text style={{fontWeight: '600', marginBottom: 3}}>WED</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'black',
                            marginRight: 10,
                            width: 1,
                            alignSelf: 'center',

                            height: 30,

                            flexDirection: 'column'
                        }}
                    />
                    <View style={Styles.ContentTopView}>
                        <Text style={Styles.titleStyle}>{this.props.title}</Text>
                        <Text style={Styles.addressStyle}>{this.props.address}</Text>
                    </View>
                    <View style={Styles.ButtonTopView}>
                        <Button title={'BOOK'} onPress={() => {

                           /* saveDetails(this.props.image, this.props.title, this.props.address, this.props.amount, this.props.date, this.props.full_date, this.props.full_price, this.props.full_address);
                            this.props.navigator.add({screen:'DetailEvent'})*/
                        }}/>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#dedede',
                        borderBottomWidth: 1,
                        marginTop: 5
                    }}
                />
                <View style={Styles.amountTopView}>
                    <Text>$ {this.props.amount} OnWards</Text>
                </View>
            </View>
        );
    }
}


const Styles = StyleSheet.create({
        cardStyle: {
            elevation: 2,
            backgroundColor: '#fff',
            margin: 5,
            borderRadius: 5
        },
        titleStyle: {
            fontSize: 18
        },

        addressStyle: {
            marginTop: 4,
            fontSize: 13
        },
        amountTopView:
            {
                marginTop: 10,
                marginBottom: 10,

                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginRight: 10
            }
        ,

        imageStyle:
            {
                width: null,
                height:
                    200,
                flex:
                    1
            }
        ,
        contentTextView: {
            marginTop: 10,
            flexDirection: 'row',
            flex:
                1

        }
        ,
        dateTopView: {
            flex: 0.2,

            justifyContent:
                'center',
            alignItems:
                'center'
        }
        ,
        dateTextView: {
            fontSize: 20,
            flexDirection:
                'column'
        }
        ,

        ContentTopView: {
            paddingTop: 5,
            flex:
                0.5
        }
        ,

        ButtonTopView: {
            padding: 10,
            justifyContent:
                'center',
            flex:
                0.3
        }
    })
;


EventCard.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired

};
