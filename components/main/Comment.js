import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions/index';

function Comment(props) {
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [text, setText] = useState("");
    console.log(props)
    useEffect(() => {
        function matchUserToComment(comments) {
            console.log(comments);
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }
                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false);
                } else {
                    comments[i].name = user.name;
                    comments[i].user = user;
                }
            }
            setComments(comments);
        }

        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id;
                        const g = 'tugrik';
                        return { id, g, ...data }
                    })
                    matchUserToComment(comments);
                })
            setPostId(props.route.params.postId);
        } else {
            matchUserToComment(comments);
        }
    }, [props.route.params.postId, props.users])
    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }
    return (
        <View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={{ margin: 5 }}>
                        {item.user !== undefined ?
                            <Text>
                                {item.name}
                            </Text>
                            : null}
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <View style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                <TextInput
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)}
                    style={{ marginBottom: 5 }}
                />
                <Button
                    onPress={() => onCommentSend()}
                    title='Send'
                />
            </View>
        </View>
    )
}
const mapStateToProps = (store) => ({
    users: store.usersState.users
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);

