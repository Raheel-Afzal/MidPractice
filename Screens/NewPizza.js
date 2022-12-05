import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Pizza.Db'});

const NewPizza = () => {
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('small');
  const [price, setPrice] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create table if not Exists Pizzas (id INTEGER PRIMARY KEY AUTOINCREMENT,flavour varchar(100),size varchar(50),price varchar(20)) `,
        [],
        (sqltxn, res) => {
          console.log('Users Table created Successfully..');
        },
        error => {
          console, log('Error occured during Table Creation...');
        },
      );
    });
  };
  const Save = () => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into pizzas (flavour,size,price) values(?,?,?)`,
        [flavor, size, price],
       
      );
    });

    setFlavor('');
    setSize('small');
    setPrice('');
  };

  return (
    <View style={{margin: 20}}>
      <TextInput
        value={flavor}
        onChangeText={text => {
          setFlavor(text);
        }}
        mode="outlined"
        label="Enter Flavour"
      />
      <RadioButton.Group
        value={size}
        onValueChange={newValue => {
          setSize(newValue);
        }}>
        <RadioButton.Item label="small" value="small" />
        <RadioButton.Item label="medium" value="medium" />
        <RadioButton.Item label="large" value="large" />
      </RadioButton.Group>
      <TextInput
        value={price}
        onChangeText={text => {
          setPrice(text);
        }}
        mode="outlined"
        label="Enter Price"
      />
      <View style={{margin: 70}}>
        <Button title="Save" onPress={Save} />
      </View>
    </View>
  );
};

export default NewPizza;
