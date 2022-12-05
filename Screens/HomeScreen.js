import React from 'react';
import {Button, Text, View} from 'react-native';


const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style= {{margin:15}}>
        <Button title="New Pizza" onPress={()=>{navigation.navigate('NewPizza')}}/>
      </View>
      <View>
        <Button title="Take Order" onPress={()=>{navigation.navigate('TakeOrder')}}/>
      </View>
    </View>
  );
};

export default HomeScreen;
