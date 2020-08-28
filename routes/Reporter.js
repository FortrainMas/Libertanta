import { View, Text, StyleSheet, AsyncStorage, Button } from 'react-native';
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Bars} from 'react-native-loader';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Dialog, { DialogContent, DialogButton, DialogFooter } from 'react-native-popup-dialog';
const fetch = require('node-fetch');

export default class Reporter extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            text: '',
            visible: false,
            visible2: false,
        }
    }

    setData = (value, field) => {
        if(field == 'title'){
            this.setState({title: value})
        }else if(field == 'text'){
            this.setState({text: value})
        }
    }


    upload = async () => {
        //Load previous screen to show that something happend
        //this.props.navigation.goBack();
        //Eveything is setted
        if(!(this.state.title && this.state.text)){
            this.setState({visible: true});
            return;
        }
        //Load local resident
        const resident = await AsyncStorage.getItem('user');
        //Make request body
        const body = {
            Author: `${resident.Name} ${resident.Surname}`,
            Text: this.state.text,
            Title: this.state.title
        }
        this.setState({visible2: true});
        //Upload to server
        fetch('https://libertanta.herokuapp.com/news', {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log(body);
                if(json.err) this.setState({isInc: true, isLoading: false})
            });
    }

    render(){
        return(
            <View>
                <ScrollView style = {{margin: 20}}>
                    <Text style = {{fontSize:25}}>Enter title:</Text>
                    <TextInput multiline = {true} style = {{borderWidth:1, marginBottom:30}} onChangeText = {value => {this.setData(value, "title")}}/>
                    <Text style = {{fontSize:25}}>Enter main text:</Text>
                    <TextInput multiline = {true} style = {{borderWidth:1, marginBottom:30, padding:1}} onChangeText = {value => {this.setData(value, "text")}}/>
                    <TouchableOpacity style = {{alignSelf: 'center', width: vw(40), backgroundColor:'#D46a6a', borderRadius: 5}} onPress = {this.upload}>
                        <Text style = {{textAlign: 'center', fontSize:20, color: '#fff'}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    footer={
                        <DialogFooter>
                          <DialogButton
                            text="OK"
                            onPress={() => {this.setState({visible:false})}}
                          />
                        </DialogFooter>
                    }
                    visible = {this.state.visible}
                >
                    <DialogContent>
                        <Text style = {{fontSize: 20}}>Something went wrong, perhaps not all data was entered.</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    onTouchOutside={() => {
                        this.setState({ visible2: false });
                    }}
                    footer={
                        <DialogFooter>
                          <DialogButton
                            text="OK"
                            onPress={() => {this.setState({visible2:false})}}
                          />
                        </DialogFooter>
                    }
                    visible = {this.state.visible2}
                >
                    <DialogContent>
                        <Text style = {{fontSize: 20}}>Your article is being submitted</Text>
                    </DialogContent>
                </Dialog>

            </View>
        )
    }
}