import React, {Component, useRef} from 'react';
import { View, Text, Animated, Easing, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { color } from 'react-native-reanimated';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Bars} from 'react-native-loader';
const fetch = require('node-fetch');

export default class Voting extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'loading',

        }
    }

    sendRequest = () => {
        fetch('https://libertanta.herokuapp.com/vote')
        .then(res => res.json())
        .then(json => {
            if(json.err == "There are not any votings now"){
                this.setState({status: 'no voating'});
                return;
            }else if(json.previous){
                this.setState({status: 'result', previous: json.previous})
            }else if(json.current){
                console.log(json.current)
                this.setState({status: 'voting', current: json.current})
            }
        });
    }

    componentDidMount(){
        this.sendRequest();
    }

    onPress = async title => {
        this.setState({status: 'loading'});

        const resident = JSON.parse(await AsyncStorage.getItem('user'));

        const body = {
            vote: title,
            voter: resident.Password
        }

        fetch('https://libertanta.herokuapp.com/vote', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.err == "You have already voted"){
                this.setState({status: 'alreadyVoted'})
            }else if(json.err){
                
            }else{
                this.setState({
                    status: 'voted'
                })
            }
        });
    }

    render(){
        if(this.state.status == 'loading'){
            return(
                <View style={{justifyContent: 'center', alignItems:'center', height: vh(80)}}>
                    <Bars />
                </View>
            )
        }else if(this.state.status == "no voating"){
            return(
                <View style={{justifyContent: 'center', alignItems:'center', height: vh(80)}}>
                    <Text style = {{fontSize: 25}}>No votes right now</Text>
                </View>
            )
        }else if(this.state.status == "result"){
            return(
                <ScrollView style = {{margin: 20}}>
                    <Text style = {{fontSize: 26, marginBottom:40}}>Previous voting results</Text>
                    <Text style = {{fontSize: 23, marginBottom:20}}>Question: {this.state.previous.title}</Text>
                    <Text style = {{fontSize: 23, marginBottom:0}}>Results:</Text>
                    {this.state.previous.possibilities.map((el, key) => {return(<Text key = {key} style = {Styles.prevRes}>{el.title} - {el.votes}</Text>)})}
                </ScrollView>
            )
        }else if(this.state.status == "voting"){
            console.log(this.state)
            return(
                <ScrollView>
                    <Text style = {{fontSize: 30, padding:vw(5)}}>{this.state.current.title}</Text>
                    {this.state.current.possibilities.map((el,key)=>{
                        return(
                            <VoteButton key = {key} title = {el.title} onPress = {this.onPress}/>
                        )
                    })}
                </ScrollView>
            )
        }else if(this.state.status == "voted"){
            return(
                <View style={{justifyContent: 'center', alignItems:'center', height: vh(80)}}>
                    <Text style = {{fontSize: 25, textAlign:'center'}}>Thank you for your vote</Text>
                </View>
            )
        }else if(this.state.status == "alreadyVoted"){
            return(
                <View style={{justifyContent: 'center', alignItems:'center', height: vh(80)}}>
                    <Text style = {{fontSize: 25, textAlign:'center'}}>It looks like you've already voted. If not, contact the government</Text>
                </View>
            )
        }
    }
}

function VoteButton({onPress, title}){
    return(
        <TouchableOpacity onPress = {()=>{onPress(title)}}>
            <View style = {Styles.voteButton}>
                <Text style = {{color: '#fff',  textAlign:'center', fontSize: 20}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const Styles = StyleSheet.create({
    prevRes: {
        fontSize: 20
    },
    voteButton:{
        backgroundColor:'#5fae57', 
        padding: 5, 
        marginVertical: 10, 
        borderRadius: 5, 
        width: vw(90),
        alignSelf: 'center'
    }
});