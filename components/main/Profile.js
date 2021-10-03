import { StyleSheet, View, Text, Image, FlatList, Button, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import firebase from 'firebase';
require('firebase/firestore');


function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const { currentUser, posts } = props;
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection('users')
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data())
                    }
                })
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .orderBy('creation', 'asc')
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }
        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .set({})
    }

    const onUnfollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .delete({})
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 4, marginBottom: 8, marginTop: 4 }}>{user.name}</Text>
                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View style={{ margin: 5 }}>
                        {following ? (
                            <Button
                                title='Following'
                                onPress={() => onUnfollow()}
                            />
                        ) :
                            <Button
                                title='Follow'
                                onPress={() => onFollow()}
                            />}
                    </View>
                ) : <View style={{ margin: 5 }}>
                    <Button
                        title='Logout'
                        onPress={() => onLogout()}
                    />
                </View>}
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
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
    },
    containerInfo: {
        flex: 1 / 14,
        marginBottom: 68
    },
    containerGallery: {
        marginLeft: 5,
        marginRight: 5,
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        padding: 60,
        aspectRatio: 1 / 1
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile);