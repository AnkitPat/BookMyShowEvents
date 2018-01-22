import React from 'react';
import {StyleSheet, Text, View, StatusBar,TouchableOpacity,Image, Actions, Modal, ListView, ActivityIndicator} from 'react-native';

import EventListView from "./EventListView"

import EventCard from "./EventCard";

import LoginStore from '../Store/LoginStore'
import Header from "./Header";

import {saveDetails} from "../actions/EventDetailAction";

import axios from 'axios'

import CheckBox  from 'react-native-checkbox'

import {Button,Avatar} from 'react-native-elements'
var filterList = [];

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
            store: LoginStore.getStore(),
            modalVisible: false,
            locationList: ''
        };

        this.renderRow = this.renderRow.bind(this);
        this.renderLocationRow = this.renderLocationRow.bind(this);


        this.getProfile = this.getProfile.bind(this)


    }




    componentWillMount() {
        try {
            axios.get("https://s3-eu-west-1.amazonaws.com/bbi.appsdata.2013/Research/ServerTest/Dummy/iOS/EN/event_json.json")
                .then(response => {

                    this.setState({events: response.data})

                    this.ds = new ListView.DataSource({
                        rowHasChanged: (row1, row2) => row1.title !== row2.title
                    })

                    this.setState({
                        dataSource: this.ds.cloneWithRows(this.state.events)
                    })

                    this.setState({
                        locationList: this.ds.cloneWithRows(this.state.events.map((ele, i) => {
                            return this.state.events[i].address
                        }))
                    })

                    console.log(this.state.locationList)

                });


        } catch (e) {
            console.log(e.message)
        }
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

    renderRow(rowData, ...rest) {

        const index = parseInt(rest[1], 10);
        return (
            <EventCard


                onPress={() => {
                    this.clickAction(rowData)
                }}
                title={rowData.title}
                amount={rowData.price}
                address={rowData.address}
                date={rowData.date}
                image={rowData.image_url}
                full_address={rowData.full_address}
                full_date={rowData.full_date}
                full_price={rowData.full_price}
                index={index}

            />
        );
    }

    renderLocationRow(rowData, ...rest) {

        return (
            <Text>rowData</Text>
        );
    }

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    clickAction(rowData) {
        console.log('clicked')
        saveDetails(rowData.image_url, rowData.title, rowData.address, rowData.price, rowData.date, rowData.full_date, rowData.full_price, rowData.full_address);

        this.props.navigation.navigate('DetailEvent')
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="#6A0888" barStyle="light-content"/>
                <Header title={'Events'} visibility={true} onPress={() => {
                    console.log('drawer')

                    this.props.navigation.navigate('DrawerOpen')

                }
                }/>



                <View style={{flex:0.99}}>
                    {this.state.dataSource ? <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}

                    /> : <ActivityIndicator size="large" color="#0000ff"/>}

                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            right:20,
                            bottom:20,
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:70,
                            height:70,
                            borderRadius:70,
                        }}
                        onPress={()=>{
                            this.setState({
                                modalVisible:true
                            })
                        }}
                    >
                        <Image source={require('../../assets/filter_icon.png')} style={styles.FloatingButtonStyle}/>
                    </TouchableOpacity>
                </View>

                <Modal
                    onRequestClose={() => this.closeModal()}
                    animation={'slide'}
                    visible={this.state.modalVisible}
                >

                    <StatusBar backgroundColor="#6A0888" barStyle="light-content"/>
                    <Header title={'Events'} visibility={false}
                            onPress={() => this.setState({
                                modalVisible:false
                            })
                            }/>


                    <View style={{flex:0.95}}>{this.state.locationList ? <ListView
                        dataSource={this.state.locationList}
                        renderRow={(rowData) => <View><CheckBox

                            containerStyle={{backgroundColor:'#f8f8f8',marginTop:15,marginLeft:10,marginRight:10,padding:15}}
                            label={rowData}
                            onChange={(checked) => {
                                if(checked) {
                                    filterList.push(rowData)
                                }

                                else {
                                    filterList = filterList.filter(value => value !== rowData);
                                }

                            } }
                        /></View>}
                    /> : null}
                    </View>

                    <Button onPress={()=>{

                        var arrayDummy = this.state.events

                        console.log(arrayDummy)
                        arrayDummy = arrayDummy.filter((ele,i)=>{
                            if (filterList.indexOf(ele.address) === -1) {
                                console.log(filterList+" "+ele.address+"not fount")
                                return false;
                            }
                            else {
                                console.log(filterList+" "+ele.address+"fount")

                                return true;
                            }
                        })

                        this.setState({
                            dataSource: this.ds.cloneWithRows(arrayDummy)
                        })


                        this.forceUpdate()
                        this.setState({
                            modalVisible: false
                        })



                    }} containerStyle={{flex:0.05}} backgroundColor={'#6A0888'} title={'Apply'}/>

                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'


    },
    TouchableOpacityStyle:{

        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',

        width: 70,
        height: 70,
    }

});
