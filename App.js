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
    StatusBar,
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
import Register from "./src/components/Register";
import CustomSlider from "./src/components/CustomSlider";
import DetailEvent from "./src/components/DetailEvent";
import EventCard from "./src/components/EventCard";
import EventsListViewRendering from './src/components/EventsListViewRendering'
import EventListView from "./src/components/EventListView";
import ProfileEditing from "./src/components/ProfileEditing";

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

        AsyncStorage.getItem('user_data').then((displayName) => {

            if (displayName) {
                console.log('current User',displayName)







                var leadsRef = firebase.database().ref('users/'+displayName);
                leadsRef.on('value', function(snapshot) {



                    console.log(snapshot.val())

                    var username = snapshot.val().email;
                    var photoURL = snapshot.val().profile_picture
                    LoginDone(displayName, username ,photoURL?photoURL: 'http://www.workspaceit.com/frank/images/user.png');



                });


                this.setState({
                    username: displayName});

                this.setState({modalVisible:true})


            }

        });


    }


    componentDidMount() {


        this.timer = setTimeout(() => {

            if (this.state.modalVisible) {
                this.props.navigation.navigate('Home')
                this.setState({
                    modalVisible: false
                })
            }
        }, 1000);


    }

     writeUserData( name, email, imageUrl) {
        firebase.database().ref('users/' + name).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        });
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

                    LoginDone(currentUser.displayName, currentUser.email, currentUser.photoURL)

                    this.writeUserData(currentUser.displayName,currentUser.email,currentUser.photoURL)

                    this.props.navigation.navigate('Home')
                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                    AsyncStorage.setItem('nick_name', currentUser.displayName)
                    AsyncStorage.setItem('user_data', currentUser.displayName)
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
                        LoginDone(currentUser.displayName, currentUser.email, currentUser.photoURL);

                        this.writeUserData(currentUser.displayName,currentUser.email,currentUser.photoURL)


                        AsyncStorage.setItem('nick_name', currentUser.displayName);
                        this.props.navigation.navigate('Home');
                        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
                        AsyncStorage.setItem('user_data', currentUser.displayName);

                        console.log(JSON.stringify(currentUser.toJSON()));
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

        const{navigator} = this.props.navigation



        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'grey'}}>

                <StatusBar backgroundColor="#6A0888" barStyle="light-content"/>
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

                                    var email = this.state.username.split("@")[0]

                                    var leadsRef = firebase.database().ref('users/'+email);
                                    leadsRef.on('value', function(snapshot) {


                                        console.log(snapshot.val())


                                            var username = snapshot.val().email;
                                            var photoURL = snapshot.val().profile_picture
                                            LoginDone(email, username ,photoURL?photoURL: 'http://www.workspaceit.com/frank/images/user.png')


                                            ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                                            AsyncStorage.setItem('user_data', email)

                                       // navigator.navigate('Home')

                                    });



                                        this.props.navigation.navigate('Home')




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

                                   source={require('./assets/icons8-enter-96.png')}/>
                        </TouchableOpacity> : <ActivityIndicator size="large" color="#0000ff"/>

                        }
                        <Text style={styles.separationText}>----------------- OR -----------------</Text>


                        <View style={styles.loginIconButton}>
                            <TouchableOpacity style={styles.googleLoginButton} onPress={() => {
                                this.googleLogin()
                            }}>
                                <Image style={{width: 70, height: 70, alignSelf: 'center'}}
                                       source={require('./assets/icons8-google-plus-528.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.facebookLoginButton} onPress={() => {
                                this.facebookLogin()
                            }}>
                                <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                       source={require('./assets/facebook.png')}/>
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
        EventsListViewRendering: {screen: EventsListViewRendering},
        EventListView: {screen: EventListView},
        ProfileEditing: {screen: ProfileEditing}
    },
    {
        headerMode: 'none',
        mode: 'modal',
        contentComponent: CustomSlider,
        drawerWidth: 200,
        navigationOptions: {
            gesturesEnabled: false,
            headerLeft: <Text onPress={() => {
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




