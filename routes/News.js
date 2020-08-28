import { View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Bars} from 'react-native-loader';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
const fetch = require('node-fetch');

export default class News extends Component{
    constructor(props){
        super(props);
        this.state = {
            News: null
        }
        const LoadNews = async() => {
            fetch('https://libertanta.herokuapp.com/news')
                .then(res => res.json())
                .then(json => {
                    this.setState({News: json})
                });
        }
        LoadNews();
    }


    render(){
        if(this.state.News == null){
            return(
                <View style = {{justifyContent: 'center', alignItems:'center'}}>
                    <Bars />
                </View>
            )
        }
        return(
            <View>
                <ScrollView>
                    {this.state.News.map((el, i) => {
                        return <NewsTitle News = {el} key = {i} onPress = {()=>{this.props.navigation.navigate('CertainNews', el)}}/>
                    })}
                </ScrollView>
            </View>
        )
    }
}

function NewsTitle({News, onPress}){
    console.log(News)
    return(
        <TouchableOpacity onPress = {onPress}>
            <View style = {{width: vw(95), 
                padding: 23, 
                borderWidth:2, 
                borderRadius:5, 
                borderColor: '#D3D3D3', 
                margin:2, 
                alignSelf:'center'}}>
                    <Text>{News.Title}</Text>
            </View>
        </TouchableOpacity>
    )
}
