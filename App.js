import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {
  const [euro, setEuro] = useState('');
  const [selected, setSelected] = useState('');
  const [currency, setCurrency] = useState('');
  const [answer, setAnswer] = useState('');
  getCurrency();
  
  async function getCurrency  () {
    const url = 'https://api.exchangeratesapi.io/latest'
    try{
      const response = await fetch(url);
      const data = await response.json();
      setCurrency(data.rates)
    }
    catch (error) {
    Alert.alert('Error', error);
    };
    }

    const convert = () =>{
      const calculation = currency[selected]*euro;
      setAnswer(calculation.toFixed(2));
    }
  return (
    <View style={styles.container}>
      <Image style={{width: 100, height: 100, borderRadius: 40}} source='https://d29fhpw069ctt2.cloudfront.net/clipart/95172/preview/coins_1_preview_f59f.png'></Image>
      <Text><h2>{answer}€</h2></Text>
      <View style={styles.row}>
      <TextInput style={styles.input} value={euro}
      placeholder="Amount" onChangeText={euro => setEuro(euro)}/>
       <Picker
        style={styles.picker}
        onValueChange={(itemValue)=>{setSelected(itemValue)}}>
        {Object.keys(currency).map((key, value) => {
          return (<Picker.Item label={key} value={key} key={key}/>) 
      })}
      </Picker>
      </View>
      <Button title="CONVERT" onPress={convert} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    height: 20, 
    width: 150
  },
  row: {
    flexDirection: 'row'
  },
  picker: {
    height: 20, 
    width: 60,
    //borderWidth: 0 if you don't want the picker to have border lines
  }
});
