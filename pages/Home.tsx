import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Button } from "./components/Button";
import { FormsCard } from "./components/FormsCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IFormData { //precisa ser igual ao objeto criado
  id: string;
  name: string;
  email: string;
  telefone: string;
}

export function Home() {

  const [newName, setnewName] = useState('')// desestrtutura do state o nome do estado, onde ele vai armazenar a info (pode ser qualquer nome), 2 parametros é func que alterar estado e define como string
  const [newEmail, setnewEmail] = useState('')
  const [newTelefone, setnewTelefone] = useState('')

  const [myData, setmyData] = useState<IFormData[]>([])

  useEffect(() => {
    async function carregarData() {
      const data = await AsyncStorage.getItem('asyncStorage');
      if (data) {
        setmyData(JSON.parse(data));
      }
    }
    carregarData();
  }, []);

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('asyncStorage', JSON.stringify(myData));
    }
    saveData();
  }, [myData]);

  function handleAddnewForm() { //handle = 'lide com isso', é um padão
    const data = {
      id: String(new Date().getTime), //primary key
      name: newName,
      email: newEmail,
      telefone: newTelefone,
    }

    // conceito da imutabilidade -> preciso fazer uma cópia do meu estado com o spread operator com os '...'
    /* myNames = [
      {id:1111, name:'JS'},
      {id:1112, name:'TS'},
    ]
    */
    setmyData([...myData, data])
    setnewName('')
    setnewEmail('')
    setnewTelefone('')

    /* myNames = [
      {id:1111, name:'JS'},
      {id:1112, name:'TS'},
      {id:1113, name:'NODE'},
    ]
    */
  }

  function handleRemoveForm(id: string) {
    setmyData(myData.filter(form => form.id !== id))
  }

  return (
    <View style={styles.container}>

      <Text
        style={styles.title}>Seja Bem Vindo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        placeholderTextColor='#adadad'
        onChangeText={value => setnewName(value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        placeholderTextColor='#adadad'
        onChangeText={value => setnewEmail(value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={newTelefone}
        placeholderTextColor='#adadad'
        onChangeText={value => setnewTelefone(value)}
        keyboardType="numeric"
      />

      {/* <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleAddnewForm}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity> */}

      <Button
        title='Add'
        onPress={handleAddnewForm}
      />

      <Text>{[newName, newEmail, newTelefone]}</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={myData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FormsCard
            form={[item.name,' ', item.email,' ',item.telefone]}
            onPress={() => handleRemoveForm(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 12,
    marginTop: 30,
    borderRadius: 7
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  }
})