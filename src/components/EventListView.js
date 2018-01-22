import React, {Component} from 'react'
import {
    ScrollView, Text, FlatList, ListView, View
} from 'react-native'
import EventCard from "./EventCard";
import axios from 'axios'
import EventsListViewRendering from "./EventsListViewRendering";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class EventListView extends Component {


    state = {events: []};

    constructor(props) {
        super(props);
        console.log('EVnt list view',props)
      /*  */





        this.renderRow = this.renderRow.bind(this);


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

                });



        } catch (e) {
            console.log(e.message)
        }
    }

   /* render() {
        console.log(this.dataSource);



        return (
            /!** <FlatList

             data={this.state.events}
             ItemsSeparatorComponenet = { <View
                    style={{
                        borderBottomColor: '#dedede',
                        borderBottomWidth: 1,
                        marginTop: 5
                    }}
                />}
             renderItem={(item)=><EventCard date={item.date} title={item.title} address={item.address} amount={item.price} image={item.image_url}/>}
             keyExtractor={(item,index)=>index}
             ></FlatList>**!/
            /!**<ScrollView style={{marginTop: 10}}>
             {this.renderViews()}
             </ScrollView>**!/

            (this.state.events?  <View>
                <EventsListViewRendering  news={this.state.events}/>
            </View>:null)

        );
    }*/

    renderRow(rowData, ...rest) {

        const index = parseInt(rest[1], 10);
        return (
            <EventCard


                onPress={()=>{this.clickAction()}}
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

    clickAction(){
        console.log('clicked')
        this.props.navigation.navigate('Register')
    }
    render() {

        const {navigate} = this.props.navigateObject

        return (
            <View>
                {this.state.dataSource?<ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}

                />:null}


            </View>
        );
    }

}

