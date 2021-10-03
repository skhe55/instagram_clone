import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import firebase from 'firebase';
require('firebase/firestore');

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i]);
                if (user != undefined) {
                    firebase.firestore()
                        .collection('posts')
                        .doc(user.uid)
                        .collection('userPosts')
                        .orderBy('creation', 'asc')
                        .get()
                        .then((snapshot) => {
                            let posts = snapshot.docs.map(doc => {
                                const data = doc.data();
                                const id = doc.id;
                                const uid = user.uid;
                                const name = user.name;
                                const data_creation = data.creation;
                                return { uid, id, name, data_creation, ...data }
                            })
                            posts.sort(function (x, y) {
                                return x.data_creation - y.data_creation;
                            })
                            setPosts(posts);
                        })
                }
            }
        }
        console.log(posts);
    }, [props.usersLoaded, props.users])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }

    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.container}>{item.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            {item.currentUserLike ?
                                (
                                    <Button
                                        title='Dislike'
                                        onPress={() => onDislikePress(item.uid, item.id)}
                                    />
                                )
                                :
                                (
                                    <Button
                                        title='Like'
                                        onPress={() => onLikePress(item.uid, item.id)}
                                    />
                                )
                            }
                            <Text
                                onPress={() => props.navigation.navigate('Comment',
                                    { postId: item.id, uid: item })}
                            >View Comments...</Text>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 6,
        marginBottom: 6,
    },
    containerInfo: {
        flex: 1 / 14,
        margin: 10
    },
    containerGallery: {
        marginLeft: 5,
        marginRight: 5,
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        padding: 200,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed);