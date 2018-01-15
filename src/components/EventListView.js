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
      /*  this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(this.state.events)
        };*/

      this.state = {
          dataSource: 'init'
      };

    }


    componentWillMount() {
        try {
            axios.get("https://s3-eu-west-1.amazonaws.com/bbi.appsdata.2013/Research/ServerTest/Dummy/iOS/EN/event_json.json")
                .then(response => this.setState({events: response.data}));



        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        console.log(this.dataSource);



        return (
            /** <FlatList

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
             ></FlatList>**/
            /**<ScrollView style={{marginTop: 10}}>
             {this.renderViews()}
             </ScrollView>**/

            (this.state.events?  <View>
                <EventsListViewRendering  news={this.state.events}/>
            </View>:null)

        );
    }

}

