import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet, View, Image } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    image?: number; 
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, image, ...restProps }) => {
    return (
        <TouchableOpacity onPress={onPress} {...restProps} style={styles.container}>
            <View style={styles.customView}>
           {image && <Image source={image} style={{height:24, width: 24, marginRight:8}} />}
        <Text style={styles.btnText}>{title}</Text>
       
        </View>
      </TouchableOpacity>
   
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        marginVertical:8,
        borderRadius: 8,
      
      },
      customView: {
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#006399',
        paddingHorizontal: 16,
        paddingVertical: 10, 
        borderRadius: 10,
      },
      text: {
        color: 'white',
        textAlign: 'center',
      },
    containerStyle:{
        alignItems: 'center',
    },
    btn: {
      
      
    },
    btnText:{
        fontWeight:"700",
        color:'#fff'
    }
})
