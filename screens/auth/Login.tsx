import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PasswordInput from '../../components/PasswordInput'
import CustomInput from '../../components/CustomInput'
import Icon from "react-native-vector-icons/FontAwesome"
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import ErrorPopup from '../../components/ErrorPopup'
import { useDispatch, useSelector } from 'react-redux'
import { changeUser } from '../../store'

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState(false)
  const users = useSelector((state:any) => state.users);
  console.log("users",users);
  const dispatch = useDispatch()

  const login = ()=>{
    const matchingUser = users.find((user:any) => user.name === userName);
    // const isPresent = users.some((user:any) => user.name === userName)
    if(!matchingUser || matchingUser?.password != password){
      seterror(true)
      return
    }
    // if(matchingUser.password != password)
    dispatch(changeUser(matchingUser))
  }
  const goToSignUp = ()=>{
    //@ts-ignore
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <View>
      {/* <Text>Login</Text> */}
      <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:200, marginBottom:50}}>
      <Icon name="instagram" size={70} color="#000" />
      </View>
      {error && <ErrorPopup errorMessage={'Username or password incorrect'} onHide={()=>{seterror(false)}}/>
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
<TouchableOpacity onPress={goToSignUp}>
  <Text style={{fontWeight:'700', fontSize:16, color:'#006399'}}>Or SignUp </Text>
</TouchableOpacity>
      </View>
      </View>
    
      <View style={{height:70, marginBottom:12}}>
<CustomButton title={'LOGIN'} onPress={login} />
</View>
    </View>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    flex: 1,
    padding:16,
    justifyContent:'space-between',

  }
})