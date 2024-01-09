import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store';
const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.currentUser);
    console.log("user", user);
    const clearForm = () => {

        setTitle('');
        setBody('');

    }
    // return (
    //   <Text>NewPost</Text>
    // )
    const createPost = () => {
        dispatch(addPost(
            {
                id: "" + Date.now(),
                title: title,
                desc: body,
                likes: [],
                comments: [],
                user: user,
            }));
        clearForm()
        Alert.alert(
            'Post Added',
            '',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            // { cancelable: false }
        );
    }
    return (
        <View style={styles.container}  >
            <KeyboardAvoidingView style={styles.screen} behavior="padding" >
                <View style={styles.container}>

                    <View>
                        <View style={styles.labelContainer} >
                            <Text style={styles.labelText} >Title</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Title"
                                underlineColorAndroid='transparent'
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={styles.labelContainer} >
                            <Text style={styles.labelText} >Body</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Body"
                                underlineColorAndroid='transparent'
                                value={body}
                                onChangeText={(text) => setBody(text)}
                            />
                        </View>
                        <Text>{"    (Image for post is random for now)"}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={createPost}
                    >
                        <Text style={{ color: "#fff" }}>ADD POST</Text>

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'space-between',
    },

    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: "grey"
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 15
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#006399",
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 10,
    },
    loginText: {
        color: 'white',
    },
})
export default NewPost