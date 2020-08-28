import React, {Component, useRef} from 'react';
import { View, Text, Animated, Easing, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { color } from 'react-native-reanimated';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bars} from 'react-native-loader';
const fetch = require('node-fetch');

export default class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isSubmitted: false,
            isInc: false,
            isLoading: false,
            OpenKey: '',
            Password: ''
        }
        const tryLoad = async() => {
            //await AsyncStorage.clear('user');
            const resident = await AsyncStorage.getItem('user');
            if(resident) this.registerUser(resident);
        }
        tryLoad();
    }

    

    onSubmit = () => {
        this.setState({isSubmitted: true});
    }

    setData = (type, value) => {
        if(type == "OpenKey"){
            this.setState({OpenKey: value});
        }else if(type == "Password"){
            this.setState({Password: value});
        }
    }

    fetchData = () => {
        this.setState({isLoading: true});
        const body = {
            "Password": this.state.Password,//"d64b11dc-10a1-475f-8166-32e15981874a",//this.state.Password,
            "OpenKey": this.state.OpenKey //"92f98bce-7eaa-4718-be93-5fd6e446c0be"//
        }; 
        fetch('https://libertanta.herokuapp.com/auth', {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if(json.err) this.setState({isInc: true, isLoading: false})
                else this.registerUser(JSON.stringify(json));
            });
    }

    //If all data in the first start is correct when this stuff save user
    registerUser = (resident) => {
        this.setState({isSubmitted: true});
        AsyncStorage.setItem('user', resident);
        setTimeout(()=>{
            this.props.navigation.navigate('Passport', {resident: resident});
        }, 1000)
    }


    render(){

        if(this.state.isSubmitted){
            return(
            <View
            style = {{
                flex:1,
                backgroundColor:'#191919',
                flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FadeInView>
                    <Text style = {[Styles.Label]}>Libertanta</Text>
                    <Text style = {[Styles.Label]}>Passport</Text>
                </FadeInView>            
            </View>
        )}else if(this.state.isLoading){
            return(
                <View
                style = {{
                    flex:1,
                    backgroundColor:'#191919',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Bars size={10} color="#FFF" />
                </View>
            )
        }else if(!this.state.isSubmitted){
            return(
                <View
                style = {{
                    flex:1,
                    backgroundColor:'#191919',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style = {[Styles.Label, {marginBottom: vh(4)}]}>Libertanta</Text>
                {
                    this.state.isInc ? <Incorrect/> : null
                }
                <InputForm text={"Open key"} setValue = {(value) => {this.setData("OpenKey", value)}} />
                <InputForm text={"Password"} setValue = {(value) => {this.setData("Password", value)}}/>
                <TouchableOpacity
                    style = {{
                        backgroundColor: '#1c1a59',
                        marginTop: 2,
                        width: vw(30),
                        borderRadius: 5
                    }}
                    onPress = {this.fetchData}
                >
                    <Text style = {[Styles.Label, {fontSize: 18, textAlign:'center'}]}>Submit</Text>
                </TouchableOpacity>         
                </View>
        )}

    }
}

class InputForm extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            width: new Animated.Value(50),
            numWidth: 50,
        }
        this.state.width.addListener( ({value}) => {
            this.setState({numWidth: value});
        });
    }


    onFocus = () => {
        Animated.timing(this.state.width, {
            toValue: 70,
            easing: Easing.elastic(),
            duration: 250,
            useNativeDriver: false,
        }).start();
    }    

    onBlur = () => {
        Animated.timing(this.state.width, {
            toValue: 50,
            easing: Easing.elastic(),
            duration: 250,
            useNativeDriver: false,
        }).start();
    }

    render(){
        return(
            <View style={{
                borderColor:'red',
                borderWidth:2,
                marginVertical: 5,
                borderRadius:4,
            }}>
                <TextInput 
                    style = {{
                        width: vw(this.state.numWidth),
                        borderColor: 'red',
                        color: 'white',
                    }}
                    placeholder = {this.props.text}
                    onFocus = {this.onFocus}
                    onBlur = {this.onBlur}
                    onChangeText = {(value) => this.props.setValue(value)}
                />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    Label:{
        textTransform: 'uppercase',
        fontFamily:'Roboto',
        fontSize:32,
        color:'white'
    }
})

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          alignItems:'center',
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

function Incorrect(){
    return(
        <View style = {{backgroundColor:'#a8383b', padding:5, borderRadius:2}}>
            <Text style = {{color:'red'}}>Incorrect login or password</Text>
        </View>
    )
}