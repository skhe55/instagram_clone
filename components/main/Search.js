import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])
    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '==', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                })
                console.log(users);
                setUsers(users);
            })
    }
    return (
        <View style={{ margin: 5 }}>
            <TextInput
                placeholder="Type Here..."
                onChangeText={(search) => fetchUsers(search)} />
            <Text style={{ marginTop: 3, marginBottom: 3 }}>Results: </Text>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", { uid: item.id })}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}
