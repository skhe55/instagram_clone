import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', margin: 5 }}>
            <Text style={{ textAlign: 'center', marginBottom: 25, fontSize: 20 }}>Hey, its my instagram clone.</Text>
            <View style={{ marginBottom: 5, }}>
                <Button
                    title='Register'
                    onPress={() => navigation.navigate("Register")}
                />
            </View>
            <View>
                <Button
                    title='Login'
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
        </View>
    )
}
