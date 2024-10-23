import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
  return (
      <Redirect href ='(authenticate)/login'/>
  )
}

export default index

const styles = StyleSheet.create({})

// -> "/" This represents the home directory