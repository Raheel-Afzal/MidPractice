import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Pizza.Db'});
const TakeOrder = () => {
  const [flavors, setFlavors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState('');
  const [selectedSize, setselectedSize] = useState('');
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [qty, setQty] = useState('');
  const [list, setList] = useState({});
  const [viewList,setViewList]= useState(true);

  useEffect(() => {
    fetchFlavour();
  }, []);

  useEffect(() => {
    fetchSize();
    fetchPrice();
  }, [selectedFlavour]);

  useEffect(() => {
    fetchPrice();
  }, [selectedSize]);

  const fetchFlavour = () => {
    db.transaction(txn => {
      txn.executeSql(`select DISTINCT flavour from Pizzas `, [], (sql, res) => {
        let resultSet = [];
        for (let i = 0; i < res.rows.length; i++) {
          let record = res.rows.item(i);
          resultSet.push(record.flavour);
        }
        setFlavors(resultSet);
      });
    });
  };
  const fetchSize = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select  Size from Pizzas where flavour=?`,
        [selectedFlavour],
        (sql, res) => {
          let resultSet = [];
          for (let i = 0; i < res.rows.length; i++) {
            let record = res.rows.item(i);
            resultSet.push(record.size);
          }
          setSizes(resultSet);
        },
      );
    });
  };
  const fetchPrice = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select  price from Pizzas where flavour=? and size=?`,
        [selectedFlavour, selectedSize],
        (sql, res) => {
          let record = res.rows.item(0);
          setPrice(record.price);
        },
      );
    });
  };

  const addToList = () => {
   setList([
      ...list,
      {
        flavor: selectedFlavour,
        size: selectedSize,
        price: price,
        quantity: qty,
      },
    ])
  };
const ViewList=()=>{
  setViewList(!viewList)
}
  return (
    <View style={{margin: 20}}>
      <Text>Flavour</Text>
      <Picker
        selectedValue={selectedFlavour}
        onValueChange={newValue => {
          setSelectedFlavour(newValue);
        }}
        mode="dropdown">
        {flavors.map((flavor, index) => {
          return <Picker.Item label={flavor} value={flavor} key={index} />;
        })}
      </Picker>

      <Text>Size</Text>
      <Picker
        selectedValue={selectedSize}
        onValueChange={newValue => {
          setselectedSize(newValue);
        }}
        mode="dropdown">
        {/* <Picker.Item label="Small" value={'Small'} />
        <Picker.Item label="Medium" value={'Medium'} />
        <Picker.Item label="Large" value={'Large'} /> */}
        {sizes.map(item => {
          return <Picker.Item label={item} value={item} />;
        })}
      </Picker>

      <Text style={{fontSize: 18, fontWeight: 'bold', margin: 20}}>
        Price: {price}
      </Text>
      <TextInput
        value={qty}
        onChangeText={text => {
          setQty(text);
        }}
        mode="outlined"
        label="Enter Quantity"
      />
      <View style={{marginVertical: 50}}>
        <Button title="Add to List" onPress={addToList} />
      </View>
      <Button title="View List" onPress={ViewList}/>

      {viewList && (<FlatList
        data={list}
        renderItem={({item})=>{
          return(
            <View style={{flexDirection:'row'}}>
              <Text style={{marginHorizontal:20}}>{item.flavor}</Text>
              <Text style={{marginHorizontal:20}}>{item.price}</Text>
              <Text style={{marginHorizontal:20}}>{item.size}</Text>
              <Text style={{marginHorizontal:20}}>{item.quantity}</Text>



            </View>
          )
        }}
      />)}
    </View>
  );
};

export default TakeOrder;
