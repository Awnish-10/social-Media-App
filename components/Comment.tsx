import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"



interface CommentProps {
  comment: any;

}

const Comment: React.FC<CommentProps> = (props) => {
  const { comment } = props;
  console.log("commenttt", comment);






  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { }}>
        <Icon name="user" size={22} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.name}>
            {comment.user.name + ' '}

          </Text>

        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text >{comment.text}</Text>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Comment;
