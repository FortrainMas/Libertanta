import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { NativeModules } from "react-native";

export default class Services extends Component{

    constructor(props){
        super(props);
        this.resident = this.props.resident;
        console.log(this.resident);
    }

    render(){
        return(
            <View>
                <ScrollView>
                    <ServiceButton button = {"News"} onPress = {()=>{this.props.navigation.navigate("News")}}/>
                    <ServiceButton button = {"Reporter"} onPress = {()=>{this.props.navigation.navigate("Reporter")}}/>
                    <ServiceButton button = {"Voting"} onPress = {()=>{this.props.navigation.navigate("Voting")}}/>
                    <ServiceButton button = {"Give citizenship"} onPress = {()=>{this.props.navigation.navigate("Give citizenship")}}/>
                    <ServiceButton button = {"Start voting"} onPress = {()=>{this.props.navigation.navigate("Start voting")}}/>
                    <ServiceButton button = {"Log out"} onPress = {async()=>{
                        await AsyncStorage.removeItem('user');
                        NativeModules.DevSettings.reload();
                    }}/>
                </ScrollView>
            </View>
        )
    }
}

function ServiceButton(props){
    return(
        <TouchableOpacity style = {Styles.ServiceButton} onPress = {props.onPress}>
            <Text>{props.button}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    ServiceButton:{
        width: vw(95), 
        padding: 23, 
        borderWidth:2, 
        borderRadius:5, 
        borderColor: '#D3D3D3', 
        margin:2, 
        alignSelf:'center'
    }
})