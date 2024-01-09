import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import NewPost from '../screens/posts/NewPost';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../store';
import Comment from './Comment';

interface ErrorMessageProps {
    post: any;
    user: any;
    likeColor: string;
}
const Card: React.FC<ErrorMessageProps> = ({ post, user, likeColor }) => {


    const [heartColor, setheartColor] = useState("#E5E1DA")
    useEffect(() => {
        const newheartColor = post?.item?.likes?.includes(user) ? "#FF004D" : "#E5E1DA"
        setheartColor(newheartColor)
    }, [post, user])
    const [addCommentModal, setaddCommentModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [comment, setcomment] = useState("")
    const [title, setTitle] = useState(post.item.title);
    const [body, setBody] = useState(post.item.desc);
    console.log("post.item?.comments", post.item);
    console.log("user", user);
    const dispatch = useDispatch()

    const deletePostHandler = () => {
        const newPost = JSON.parse(JSON.stringify(post.item));
        dispatch(deletePost(newPost))
    }
    const editPost = () => {
        const newPost = JSON.parse(JSON.stringify(post.item));
        dispatch(updatePost({ ...newPost, title: title, desc: body }))
        seteditModal(false)
    }
    const createCommentHandler = () => {
        console.log("in createCommentHandler");

        const newPost = JSON.parse(JSON.stringify(post.item));
        const newComment = {
            user: user,
            text: comment,
        }
        dispatch(updatePost({ ...newPost, comments: [...newPost.comments, newComment] }))
        setcomment('')
        setaddCommentModal(false)
    }

    const handleLike = () => {
        const newPost = JSON.parse(JSON.stringify(post.item));
        const matchingUserLike = newPost?.likes?.find((userr: any) => userr.id === user.id);
        // const isPresent = users.some((user:any) => user.name === userName)
        if (!matchingUserLike) {
            // newPost.likes =[...newPost.likes, user]
            dispatch(updatePost({ ...newPost, likes: [...newPost.likes, user] }))
            return
        } else {
            const filteredPostLikes = newPost?.likes?.filter((it: any) => { return it.id != matchingUserLike.id })
            dispatch(updatePost({ ...newPost, likes: filteredPostLikes }))
        }

    }
    return (
        <TouchableOpacity

        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={editModal}
            >
                <TouchableOpacity style={styles.modalContainer} onPress={() => { seteditModal(false) }}>
                    <View style={[styles.modalContent, { height: '50%', justifyContent: 'space-between' }]}>

                        {/* <KeyboardAvoidingView style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}> */}
                        <View style={{ padding: 16 }}>
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

                        </View>
                        <TouchableOpacity
                            style={[styles.buttonContainer, styles.loginButton, { marginLeft: 10 }]}
                            onPress={editPost}
                        >
                            <Text style={{ color: "#fff" }}>EDIT POST</Text>

                        </TouchableOpacity>



                    </View>

                </TouchableOpacity>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={addCommentModal}

            >
                <TouchableOpacity style={styles.modalContainer} onPress={() => { setaddCommentModal(false) }}>
                    <View style={styles.modalContent}>
                        <View style={{ flex: 1 }} >
                            <FlatList
                                style={styles.root}
                                data={post?.item?.comments}

                                renderItem={(item) => {
                                    // console.log("itemitem",item);

                                    const comment = item.item;
                                    return (
                                        <Comment comment={comment} />
                                    );
                                }}
                            />
                            <KeyboardAvoidingView style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Leave a comment"
                                        value={comment}
                                        onChangeText={(value) => setcomment(value)}
                                    />
                                    <View
                                        style={styles.postButtonContainer}
                                    >
                                        <TouchableOpacity
                                            onPress={createCommentHandler}
                                        >

                                            <Text style={{ color: '#fff' }} >Post</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </KeyboardAvoidingView>

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styles.card}>
                <View style={styles.cardTitleHeader}>
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }} >
                        <View style={styles.timeContainer}>

                            <Icon name="user" size={22} color="#000" />

                            <Text
                                style={{ fontSize: 15, alignSelf: 'center', paddingHorizontal: 10, paddingVertical: 5 }}
                            >
                                {post?.item?.user?.name}

                            </Text>
                        </View>

                    </View>
                </View>
                <View style={styles.cardImageContainer} >
                    <Image
                        style={{ ...styles.cardImage }}
                        source={require('./image.jpg')}

                    />

                </View>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title}>{post?.item?.title}</Text>

                        <Text style={styles.description}> {post?.item?.desc} </Text>

                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={handleLike}
                            >
                                <Icon name="thumbs-up" size={14} color='#006399' />
                                <Text style={styles.socialBarlabel2}> {post?.item?.likes?.length} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                            >
                                <Icon name="comment" size={14} color='#006399' />
                                <Text style={styles.socialBarlabel2}> {post?.item?.comments?.length} </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => setaddCommentModal(true)}
                >
                    {post?.item?.comments?.length > 0 ? (
                        <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >View all {post?.item?.comments?.length} comments </Text>
                    ) : (
                        <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >Comment here </Text>
                    )}
                </TouchableOpacity>
                {user?.id == post?.item?.user?.id && (
                    <View style={styles.postActions} >
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => deletePostHandler()}
                            >
                                <Icon name="trash" size={14} color="#000" />
                                <Text style={styles.socialBarlabel2}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => seteditModal(true)}
                            >
                                <Icon name="edit" size={14} color="#000" />
                                <Text style={styles.socialBarlabel2}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    userIcon: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    card: {
        width: '100%',
        elevation: 3,
        shadowColor: 'black',

        shadowOffset: {
            width: 2,
            height: 5
        },
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white"
    },
    cardTitleHeader: {
        backgroundColor: '#DCF2F1',
        paddingVertical: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeader: {
        paddingTop: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImageContainer: {
        backgroundColor: '#c2c2c2',
        flex: 1,
        display: 'flex',
        // height: 275 
    },
    cardImage: {
        flex: 1,
        height: 240,

        width: null
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
    },
    description: {
        fontSize: 15,
        color: "#888",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    /******** social bar ******************/
    socialBarContainer: {
        flexDirection: 'row'
    },
    socialBarSection: {
        marginRight: 20
    },
    socialBarlabel: {
        marginLeft: 20
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'flex-end'
    },
    socialBarlabel2: {
        marginLeft: 2
    },
    modalContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: "80%",
        width: "90%",
        margin: 16,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    root: {
        backgroundColor: "#ffffff",
        marginBottom: 45
    },
    inputs: {
        height: 45,
        width: '85%',
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        paddingRight: 20
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '100%',
        height: 45,
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
    postButtonContainer: {
        position: 'absolute',
        right: 0,
        height: 45,
        width: '15%',
        backgroundColor: '#006399',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
export default Card