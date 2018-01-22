import React from 'react'
import {
    StyleSheet,View,Text,Image,TouchableOpacity
} from 'react-native'


const Header = ({title,onPress,visibility}) => {
    return(
      <View style={Style.headerRoot}>
         <TouchableOpacity onPress={onPress} style={{marginLeft:10,alignSelf:'center'}}>
             {visibility?<Image style={{height: 30,width: 30}}   source={require('../../icons/icons8-menu-104.png')}/>:<Image style={{height: 30,width:50}}   source={require('../../assets/arrow_back_white.png')}/>}</TouchableOpacity>
          <Text style={Style.headerText}>{title}</Text>
      </View>
    );
};

export default Header;

const Style = StyleSheet.create({
    headerRoot: {

        height: 60,


        flexDirection:'row',
        backgroundColor: '#6A0888',

        shadowOffset:{width: 0, height:2},
        shadowOpacity:0.9,
        shadowColor:'#000',
        elevation: 20
    },
    headerText: {


        marginLeft:30,
        justifyContent: 'center',
        alignSelf:'center',
        fontSize: 24,
        fontWeight:'bold',
        color: '#fff'
    }
});