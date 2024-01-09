import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PasswordInput from '../../components/PasswordInput'
import CustomInput from '../../components/CustomInput'
import Icon from "react-native-vector-icons/FontAwesome"
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import ErrorPopup from '../../components/ErrorPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store'

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState(false)
  const dispatch = useDispatch()
  console.log(Date.now());
  
  const users = useSelector((state:any) => state.users);
  console.log("users",users);
  
  const signUp = ()=>{
    const isPresent = users.some((user:any) => user.name === userName)
    if(isPresent){
      seterror(true)
      return
    }
    dispatch(addUser(
      {
        id:""+Date.now(),
        name:userName,
        password:password,
      }));
      goToLogin()

  }
  const goToLogin = ()=>{
    //@ts-ignore
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View>
      {/* <Text>Login</Text> */}
      <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:200, marginBottom:50}}>
      <Icon name="facebook" size={70} color="#000" />
      </View>
      {error && <ErrorPopup errorMessage={'User already exists'} onHide={()=>{seterror(false)}}/>
          }
      <CustomInput
        text={userName}
        placeholder={"user name"}
        onChangeText={(text) => {
          setUserName(text)
        }}
      />
       <PasswordInput
        text={password}
        placeholder={"password"}
        onChangeText={(text) => {
          setpassword(text)
        }}
      />
      <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end',paddingHorizontal:8}}>
<TouchableOpacity onPress={goToLogin}>
  <Text style={{fontWeight:'700', fontSize:16, color:'#006399'}}>Or Login </Text>
</TouchableOpacity>
      </View>
      </View>
    
      <View style={{height:70, marginBottom:12}}>
<CustomButton title={'SIGN UP'} onPress={signUp} />
</View>
    </View>

  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    flex: 1,
    padding:16,
    justifyContent:'space-between',

  }
})