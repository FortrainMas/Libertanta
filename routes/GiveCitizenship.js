import React, { Component } from 'react';
import { View,Text, TouchableOpacity, StyleSheet, AsyncStorage, Image } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class GiveCitizenship extends Component{
    constructor(props){
        super(props);
        this.state = {
            Name: '',
            Surname: '',
            BornDate: '',
            Language: '',
            State: '',
            Status: '',
            Resident: null,
        }
    }

    upload = async () => {
        console.log("Putin vor");
        //Load local resident to check resident password
        const resident = JSON.parse(await AsyncStorage.getItem('user'));
        
        //Make new names
        const Name= this.state.Name;
        const Surname = this.state.Surname;
        const BornDate = this.state.BornDate;
        const Language = this.state.Language;
        const State = this.state.State;

        //Make body request
        const body = {
            Name: Name,
            Surname: Surname,
            BornDate: BornDate,
            Language: Language,
            State: State,
            Worker: resident.Password
        }

        console.log(body);

        if(!(Name && Surname && BornDate && Language && State)){return;}
        console.log("Putin ne vor");

        //Load to server
        fetch('https://libertanta.herokuapp.com/makeResident', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            if(json.err == "You have not got persmision"){
                this.setState({Status: 'NO PERMISION'})
            }else{
                this.setState({
                    Status: 'OK',
                    Resident: json
                })
            }
        });
    }

    render = () =>{
        if(!this.state.Status){
            return(
                <ScrollView style = {{padding:10, paddingTop:-15}}>
                    <Text style = {Styles.Label}>Name:</Text>
                    <TextInput style = {Styles.Input} onChangeText = {value => {this.setState({Name:value});}}></TextInput>
                    <Text style = {Styles.Label}>Surname:</Text>
                    <TextInput style = {Styles.Input} onChangeText = {value => this.setState({Surname:value})}></TextInput>
                    <Text style = {Styles.Label}>Born date:</Text>
                    <TextInput style = {Styles.Input} onChangeText = {value => this.setState({BornDate:value})}></TextInput>
                    <Text style = {Styles.Label}>Language:</Text>
                    <TextInput style = {Styles.Input} onChangeText = {value => this.setState({Language:value})}></TextInput>
                    <Text style = {Styles.Label}>State:</Text>
                    <TextInput style = {Styles.Input} onChangeText = {value => this.setState({State:value})}></TextInput>
                    <TouchableOpacity style = {{alignSelf: 'center', backgroundColor:'green', padding: 10, borderRadius: 4, margin:30}} onPress={this.upload}>
                        <Text style = {{color: '#fff', textTransform: 'uppercase'}}>Give citizenship</Text>
                    </TouchableOpacity>
                </ScrollView>
            )
        }else if(this.state.Status == "OK"){
            return(
                <View style = {{padding: 20}}>
                    <View style = {{marginVertical: 30, backgroundColor:'#86c98a', borderRadius: 5, padding: 5}}>
                        <Text style = {{fontSize: 25, textTransform: 'uppercase', textAlign:'center', color: '#fff'}}>
                            Welcome to libertanta
                        </Text>
                    </View>

                    <View style = {{marginVertical: 15}}>
                        <Text style = {{fontSize:18}}>{'Open key'}</Text>
                        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style = {{borderWidth: 1, borderRadius:5, padding: 9, width:vw(80)}}>{this.state.Resident.OpenKey}</Text>
                            <TouchableOpacity onPress = {()=>{Clipboard.setString(this.state.Resident.OpenKey)}}>
                                <Image source = {require('../assets/Copy.png')} style = {{width: vw(10), height: vh(5)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style = {{marginVertical: 15}}>
                        <Text style = {{fontSize:18}}>{'Password'}</Text>
                        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style = {{borderWidth: 1, borderRadius:5, padding: 9, width:vw(80)}}>{this.state.Resident.Password}</Text>
                            <TouchableOpacity onPress = {()=>{Clipboard.setString(this.state.Resident.Password)}}>
                                <Image source = {require('../assets/Copy.png')} style = {{width: vw(10), height: vh(5)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View style = {{justifyContent: 'center', alignItems:'center'}}>
                    <View>
                        <Image source = {require('../assets/Cross.png')} style = {{height: 200, width: 200, marginVertical: 100}}/>
                        <Text style = {{fontSize: 14}}>You are not authorized to do this.</Text>
                    </View>
                </View>
            )
        }
    }
}

const Styles = StyleSheet.create({
    Label:{
        textTransform: 'uppercase',
        fontSize: 18,
        marginTop:20,
    },
    Input:{
        borderWidth: 2,
        borderRadius:2,
        padding:2
    }
})