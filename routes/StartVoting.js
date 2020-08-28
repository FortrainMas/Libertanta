import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { vw,vh } from 'react-native-expo-viewport-units';
import { Bars} from 'react-native-loader';

export default class StartVoting extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'make',
            title: '',
            possibilities: []
        }
    }

    onMakeVoteButton = value => {
        const possibilities = this.state.possibilities;
        possibilities.push(value)
        this.setState({possibilities: possibilities})
    }

    deleteButton = value =>{
        let flag = false;
        const possibilities = this.state.possibilities.filter(el=>{
            if(el != value || flag){
                return el;
            }
            flag = true;
        });
        this.setState({possibilities: possibilities})
    }

    tryStartVoting = async() => {
        this.setState({status: 'loading'});

        const resident = JSON.parse(await AsyncStorage.getItem('user'));
        const possibilities = this.state.possibilities.map(el=>{
            return {
                title: el,
                votes: 0
            }
        })
        const body = {
            title: this.state.title,
            possibilities: possibilities,
            Worker: resident.Password
        }

        fetch('https://libertanta.herokuapp.com/vote/make', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.err == "You have not got persmision"){
                this.setState({status: 'no permision'})
            }else if(json.err){
                this.setState({status: 'already'});
            }else{
                this.setState({
                    status: 'success'
                })
            }
        }); 
    }

    render(){
        if(this.state.status == "make"){
            return(
                <ScrollView style = {{padding: 15}}>
                    <TextInput style = {Styles.TitleInput} placeholder={"Enter voting title"} onChangeText = {value => this.setState({title: value})}></TextInput>
                    {this.state.possibilities.map((el,i) => {
                        return(<VoteButton text = {el} key = {i} onPress = {this.deleteButton}/>)
                    })}
                    <MakeVoteButton onPress = {this.onMakeVoteButton}></MakeVoteButton>
                    <TouchableOpacity style = {Styles.startButton} onPress = {this.tryStartVoting}>
                        <Text style = {{color: '#fff', fontSize: 20}}>Start voting</Text>
                    </TouchableOpacity>
                </ScrollView>
            )
        }else if(this.state.status == "loading"){
            return(
                <View style={{justifyContent: 'center', alignItems:'center', height: vh(80)}}>
                    <Bars />
                </View>
            )
        }else if(this.state.status == "no permision"){
            return(
                <View style = {{justifyContent: 'center', alignItems:'center'}}>
                    <View>
                        <Image source = {require('../assets/Cross.png')} style = {{height: 200, width: 200, marginVertical: 100}}/>
                        <Text style = {{fontSize: 14}}>You are not authorized to do this.</Text>
                    </View>
                </View>
            )
        }else if(this.state.status == "already"){
            <View style = {{justifyContent: 'center', alignItems:'center'}}>
                <View>
                    <Image source = {require('../assets/Cross.png')} style = {{height: 200, width: 200, marginVertical: 100}}/>
                    <Text style = {{fontSize: 14}}>Voting is already going, you can not stop it now</Text>
                </View>
            </View>
        }else if(this.state.status == "success"){
            return(
                <View>
                    <Text>Success</Text>
                </View>
            )
        }
    }
}

function VoteButton({text, onPress}){
    return(
        <View style = {Styles.VoteButton}>
            <View style = {{flex: 4 , justifyContent: 'center', padding: 10}}>
                <Text>{text}</Text>
            </View>
            <TouchableOpacity onPress = {() => {onPress(text)}}>
                <View style = {{flex: 1, justifyContent: 'center', padding: 10}}>
                    <Text style = {{fontSize: 30}}>-</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function MakeVoteButton({onPress}){
    const [value, setValue] = useState('');
    return(
        <View style = {Styles.VoteButton}>
            <View style = {{flex: 4 , justifyContent: 'center', padding: 10}}>
                <TextInput placeholder = {"Enter voting button text"} onChangeText = {setValue} value = {value}/>
            </View>
            <TouchableOpacity onPress = {() => {
                onPress(value);
                setValue('');
            }}>
                <View style = {{flex: 1, justifyContent: 'center', padding: 10}}>
                    <Text style = {{fontSize: 20}}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const Styles = StyleSheet.create({
    TitleInput:{
        fontSize: 30,
        borderWidth: 0,
        padding: 8
    },
    VoteButton:{
        flexDirection: 'row', 
        justifyContent:'space-between',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        padding: 0,
        width: vw(80),
        marginVertical: 15,
        alignContent: 'center'
    },
    startButton:{
        backgroundColor: '#5fae57',
        padding: 15,
        width: vw(80),
        borderRadius: 5
    }
})