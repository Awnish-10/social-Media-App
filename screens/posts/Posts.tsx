import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import { changeUser } from '../../store';
const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.currentUser);
  const posts = useSelector((state: any) => state.posts);
  console.log("user", user);
  console.log("posts", posts);


  const handleLogout = () => {
    dispatch(changeUser(null))
  }
  return (
    <View style={styles.screen} >
      <TouchableOpacity onPress={() => handleLogout()} style={{ width: '100%', flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>
        <Text style={{ color: "#FF004D", fontWeight: '700', marginRight: 8 }}>Logout</Text>
        <Icon name="sign-out" size={30} color="#FF004D" />
      </TouchableOpacity>

      <FlatList

        style={styles.list}

        data={posts}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator} />
          )
        }}
        renderItem={(post) => {
          console.log("posts - ", post.index);
          return (
            <Card post={post} user={user} likeColor={post?.item?.likes?.includes(user) ? "#FF004D" : "#E5E1DA"} />
          )
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  separator: {
    marginTop: 10,
  },

})
export default Posts