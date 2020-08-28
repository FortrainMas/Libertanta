import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Clipboard } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import {MultiLang, getLang} from '../utils/MultiLang';

export default class Passport extends Component{
    
    constructor(props){
        super(props);
        console.log(this.props.route.params.resident);
        this.resident = this.props.route.params.resident;
        this.resident = JSON.parse(this.resident);
        this.lang = getLang(this.resident.Language);
    }
    
    openMenu = () => {
        console.log("Open menu");
        this.props.navigation.navigate('Services', {resident: this.resident});
    }

    render = () => {
        return(
            <View>
                <View style = {{backgroundColor: '#000', padding: 15, justifyContent:'space-between', flexDirection: 'row', alignItems:'center'}}>
                  <Text style = {{color: 'white', fontSize:vh(4), textTransform: 'uppercase'}}>Libertanta</Text>  
                  <TouchableOpacity onPress = {this.openMenu}>
                    <Image  style = {{width: vw(10), height: vh(9)}} source = {require('../assets/Hamburger.jpg')}/>
                  </TouchableOpacity>
                </View>
                <ScrollView style = {{padding: 15}}>
                    <Text style = {Styles.data}>{MultiLang(this.lang, 'Name')}: {this.resident.Name}</Text>
                    <Text style = {Styles.data}>{MultiLang(this.lang, 'Surname')}: {this.resident.Surname}</Text>
                    <Text style = {Styles.data}>{MultiLang(this.lang, 'Born date')}: {this.resident.BornDate}</Text>
                    <Text style = {Styles.data}>{MultiLang(this.lang, 'Language')}: {this.resident.Language}</Text>
                    <Text style = {Styles.data}>{MultiLang(this.lang, 'State')}: {this.resident.State}</Text>                    
                    
                    <View style = {{marginVertical: 15}}>
                        <Text style = {{fontSize:18}}>{MultiLang(this.lang, 'Open key')}</Text>
                        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style = {{borderWidth: 1, borderRadius:5, padding: 9, width:vw(80)}}>{this.resident.OpenKey}</Text>
                            <TouchableOpacity onPress = {()=>{Clipboard.setString(this.resident.OpenKey)}}>
                                <Image source = {require('../assets/Copy.png')} style = {{width: vw(10), height: vh(5)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style = {{marginVertical: 15}}>
                        <Text style = {{fontSize:18}}>{MultiLang(this.lang, 'Password')}</Text>
                        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style = {{borderWidth: 1, borderRadius:5, padding: 9, width:vw(80)}}>{this.resident.Password}</Text>
                            <TouchableOpacity onPress = {()=>{Clipboard.setString(this.resident.Password)}}>
                                <Image source = {require('../assets/Copy.png')} style = {{width: vw(10), height: vh(5)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    data:{
        fontSize: 20,
        marginVertical: vh(1)
    }
})