import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import SearchLocationInput from './SearchLocationInput'
import {ACCESS_TOKEN} from '@env'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../slices/navSlice'
import { NavigationContainer } from '@react-navigation/native'

const HomeScreen = () => {
    const dispatch = useDispatch()

    
  const selectedItemResDropdown = payload => {
    let centerCoordinate = payload?.geometry?.coordinates;
    dispatch(setOrigin(centerCoordinate))
    dispatch(setDestination(null))
  }
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
       <Image
         style={{
          width: 100, height:100, resizeMode: 'contain',
         }}
         source={{
          uri: "https://links.papareact.com/gzs",
         }}
       />
       <SearchLocationInput 
          textInputText={''}
          selectedItemRes={res => selectedItemResDropdown(res)}
          ACCESS_TOKEN = {ACCESS_TOKEN}
       />
       <NavOptions />
      </View>
     
    </SafeAreaView>
  )
}

export default HomeScreen

// const styles = StyleSheet.create({
//   text:{
//     color: "blue"
//   }
// })