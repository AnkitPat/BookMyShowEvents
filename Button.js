import React from 'react'
import {
    Text, TouchableOpacity,ToastAndroid
} from 'react-native'

import styles from './src/style/ButtonStyleSimple'

const Button = ({title,onPress})=> {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>

            <Text style={styles.textStyle}>{title}</Text>

        </TouchableOpacity>
    );
};
export  default Button;