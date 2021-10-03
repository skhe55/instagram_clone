import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
    const [hasGalleryPermission, setGalleryPermission] = useState(null);
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'} />
            </View>
            <View style={{ margin: 5 }}>
                <Button
                    title='Flip Image'
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                </Button>
            </View>
            <View style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, }}>
                <Button
                    title='Take Picture'
                    onPress={() => takePicture()}
                />
            </View>
            <View style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, }}>
                <Button
                    title='Pick Image From Gallery'
                    onPress={() => pickImage()}
                />
            </View>
            <View style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, }}>
                <Button
                    title='Save'
                    onPress={() => navigation.navigate('Save', { image })}
                />
            </View>
            {image && <Image source={{ uri: image }} style={{ flex: 1, marginBottom: 5, marginLeft: 5, marginRight: 5 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }

})

