import React, { PropTypes, Component } from 'react';
import {
    ListView,
    StyleSheet,
    View,Modal,TouchableOpacity,Text,WebView,Navigator
} from 'react-native';
import EventCard from "./EventCard";

export default class EventsListViewRendering extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            modalVisible: false
        };

        this.renderRow = this.renderRow.bind(this);

    }






    renderRow(rowData, ...rest) {
        const index = parseInt(rest[1], 10);
        return (
            <EventCard

                onPress={()=>{}}
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
    render() {

        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}

                />


            </View>
        );
    }
}

const styles = StyleSheet.create({

    modalContent: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: '#ff0000'
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row'
    }
});



