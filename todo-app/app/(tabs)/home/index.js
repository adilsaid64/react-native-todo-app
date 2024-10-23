import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const index = () => {

  const todos = [];

  return (
    <>
      <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Pressable style={{ backgroundColor: "lightblue", paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center" }} >
          <Text>All</Text>
        </Pressable>

        <Pressable style={{ backgroundColor: "lightblue", paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center" }} >
          <Text>Work</Text>
        </Pressable>

        <Pressable style={{ backgroundColor: "lightblue", paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", marginRight: "auto" }} >
          <Text>Personal</Text>
        </Pressable>

        <Pressable style={{ paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center" }} >
          <AntDesign name="pluscircleo" size={30} color="lightblue" />
        </Pressable>

      </View>

      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              <Text>Got Todo</Text>
            </View>
          ) : (
            <View>
              <Text>No todos! Create some tasks!</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </>

  )
}

export default index

const styles = StyleSheet.create({})