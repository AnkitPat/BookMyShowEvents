import React, {Component} from 'react'


import EventHome from "./src/components/EventHome";

import {StackNavigator, DrawerNavigator} from 'react-navigation';


import {GoogleSignin} from "react-native-google-signin";
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import {Header, FormInput, FormLabel, Card, Button} from 'react-native-elements'

import {
    ToastAndroid,
    StyleSheet,
    Modal,
    View,
    TextInput,
    ImageBackground,
    Easing,
    Animated,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';

import LoginStore from './src/Store/LoginStore'

import {LoginDone} from './src/actions/LoginAction'

import firebase from 'react-native-firebase'
import Register from "./Register";
import CustomSlider from "./components/CustomSlider";
import DetailEvent from "./src/components/DetailEvent";
import EventCard from "./src/components/EventCard";
import EventsListViewRendering from './src/components/EventsListViewRendering'

var TimerMixin = require('react-timer-mixin');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class App extends Component {

    mixins: [TimerMixin];

    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props)


    }

    componentWillMount() {

        AsyncStorage.getItem('user_data').then((user_data_json) => {
            let user_data = JSON.parse(user_data_json);
            console.log('current User', user_data + " " + user_data.displayName)

            if (user_data) {

                this.setState({
                    username: user_data.displayName,
                    modalVisible: true
                })

                LoginDone(user_data.displayName)


            }

        });


    }


    componentDidMount() {


            this.timer = setTimeout(() => {

                this.props.navigation.navigate('Home')
                this.setState({
                    modalVisible: false
                })
            }, 1000);
        

    }

    facebookLogin() {

        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (!result.isCancelled) {
                    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
                    // get the access token
                    return AccessToken.getCurrentAccessToken()
                }
            })
            .then(data => {
                if (data) {
                    // create a new firebase credential with the token
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    // login with credential
                    return firebase.auth().signInWithCredential(credential)
                }
            })
            .then((currentUser) => {
                if (currentUser) {
                    console.log(JSON.stringify(currentUser.toJSON()) + "Ankit")

                    LoginDone(currentUser.providerData.displayName)

                    this.props.navigation.navigate('Home')
                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                    AsyncStorage.setItem('nick_name', currentUser.providerData.displayName)
                    AsyncStorage.setItem('user_data', JSON.stringify(currentUser))
                }
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`)
            })
    }

    googleLogin() {
        GoogleSignin.configure()
            .then(() => {
                GoogleSignin.signIn()
                    .then((data) => {
                        // create a new firebase credential with the token
                        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

                        // login with credential
                        return firebase.auth().signInWithCredential(credential)

                    })
                    .then((currentUser) => {
                        LoginDone(currentUser.providerData.displayName)
                        AsyncStorage.setItem('nick_name', currentUser.providerData.displayName)
                        this.props.navigation.navigate('Home')
                        ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                        AsyncStorage.setItem('user_data', JSON.stringify(currentUser))

                        console.log(JSON.stringify(currentUser.toJSON()))
                    })
                    .catch((error) => {
                        console.error(`Login fail with error: ${error}`)
                    })
            })
    }

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    state = {
        modalVisible: false,
        loading: false,
        wrongCredentials: false,
        username: '',
        password: '',
        loginStore: LoginStore.getStore()
    };

    render() {


        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'grey'}}>

                <Modal

                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}>
                        <Text style={{fontSize: 30, alignSelf: 'center'}}>Hello {this.state.username}</Text>
                        <Text style={{fontSize: 30, alignSelf: 'center'}}>Welcome Back!!</Text>
                        <ActivityIndicator style={{marginTop: 20}} size="large" color="#0000ff"/>
                    </View></Modal>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingBottom: 10, justifyContent: 'center'}}>
                    <Card style={styles.container}>

                        <Text style={styles.loginText}>Login</Text>

                        <TextInputLayout
                            style={styles.inputLayout}
                            checkValid={t => EMAIL_REGEX.test(t)}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Email'}
                                onChangeText={(text) =>
                                    this.setState({
                                        username: text
                                    })
                                }
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Password'}
                                secureTextEntry={true}
                                onChangeText={(text) =>
                                    this.setState({
                                        password: text
                                    })
                                }
                            />
                        </TextInputLayout>

                        {this.state.wrongCredentials &&
                        <View style={{flexDirection: 'row', marginTop: 5, marginHorizontal: 36}}>
                            <Text style={{flex: 0.5, color: '#c63923'}}>Wrong Credentials</Text>
                            <Text style={{
                                flex: 0.5,
                                textAlign: 'right',
                                color: '#c63923',
                                textDecorationLine: 'underline'
                            }}>Forrgot
                                Password?</Text>
                        </View>}

                        {!this.state.loading ? <TouchableOpacity style={styles.loginButton} onPress={() => {

                            this.setState({
                                loading: true
                            })
                            firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
                                .then((user) => {
                                    console.log(user)
                                    this.setState({
                                        loading: false
                                    });
                                    LoginDone(this.state.username)

                                    this.props.navigation.navigate('Home')
                                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                                    AsyncStorage.setItem('user_data', JSON.stringify(user))

                                })
                                .catch(() => {
                                    console.log('wrong');
                                    this.setState({
                                        wrongCredentials: true,
                                        loading: false
                                    })

                                });


                        }

                        }>
                            <Image style={{width: 70, height: 70, alignSelf: 'center'}}

                                   source={require('./icons8-enter-96.png')}/>
                        </TouchableOpacity> : <ActivityIndicator size="large" color="#0000ff"/>

                        }
                        <Text style={styles.separationText}>----------------- OR -----------------</Text>


                        <View style={styles.loginIconButton}>
                            <TouchableOpacity style={styles.googleLoginButton} onPress={() => {
                                this.googleLogin()
                            }}>
                                <Image style={{width: 70, height: 70, alignSelf: 'center'}}
                                       source={require('./icons8-google-plus-528.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.facebookLoginButton} onPress={() => {
                                this.facebookLogin()
                            }}>
                                <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                       source={require('./facebook.png')}/>
                            </TouchableOpacity>

                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
                            <Text>Don't have account?</Text>
                            <Text onPress={() => {
                                this.props.navigation.navigate('Register')
                            }} style={{textDecorationLine: 'underline', color: '#c63923'}}> Create New</Text>
                        </View>

                    </Card>
                </ScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {

        elevation: 2,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 5
    },
    loginText: {
        fontSize: 50,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
    },
    cardBackground: {

        backgroundColor: 'transparent'
    },
    backgroundImage: {

        flex: 1,
        resizeMode: 'cover'

    },
    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        color: '#00ff00',

        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },

    loginButton: {

        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 36
    },
    separationText: {
        marginTop: 5,
        color: '#000',
        alignSelf: 'center',
        marginHorizontal: 36
    },

    loginIconButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    googleLoginButton: {
        alignSelf: 'center'
    },

    facebookLoginButton: {
        alignSelf: 'center'
    }
});

const SimpleApp = DrawerNavigator({
        Login: {screen: App},
        Home: {screen: EventHome},
        Register: {screen: Register},
        EventCard: {screen: EventCard},
        DetailEvent: {screen: DetailEvent},
        EventsListViewRendering: {screen: EventsListViewRendering}
    },
    {
        headerMode: 'none',
        mode: 'modal',
        contentComponent: CustomSlider,
        drawerWidth: 200,
        navigationOptions: {
            gesturesEnabled: false,
            headerLeft:<Text onPress={() => {
                // Coming soon: navigation.navigate('DrawerToggle')
                // https://github.com/react-community/react-navigation/pull/2492
                if (navigation.state.index === 0) {
                    navigation.navigate('DrawerOpen')
                } else {
                    navigation.navigate('DrawerClose')
                }
            }}>Menu</Text>
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return {opacity, transform: [{translateY}]};
            },
        }),
    });

export default SimpleApp;




