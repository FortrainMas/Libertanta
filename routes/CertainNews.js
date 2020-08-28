import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default class CertainNews extends Component{

    static navigationOptions = ({ navigation }) => {
      const {state} = navigation;
      return {
        title: `${state.params.title}`,
      };
    };
      
    ChangeThisTitle = (titleText) => {
       const {setParams} = this.props.navigation;
        setParams({ title: titleText })
    }      

    componentDidMount(){
        this.ChangeThisTitle("Putin vor");
    }

    render(){
        console.log(this.props.route);
        return(
            <ScrollView style = {{padding:10}}>
                <Text style = {{fontSize:40, fontFamily: 'sans-serif-medium'}}>{this.props.route.params.Title}</Text>
                <Text style = {{marginVertical: 30, fontSize: 16}}>
                    {this.props.route.params.Text}
                </Text>
            </ScrollView>
        )
    }
}