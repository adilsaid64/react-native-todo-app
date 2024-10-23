import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Index = () => {
  const todos = []; // Your todo list data

  return (
    <>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>All</Text>
        </Pressable>

        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Work</Text>
        </Pressable>

        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Personal</Text>
        </Pressable>

        <Pressable style={styles.addButton}>
          <AntDesign name="pluscircleo" size={30} color="blue" />
        </Pressable>
      </View>

      {/* Todo List or Empty State */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.todoContainer}>
          {todos.length > 0 ? (
            <View>
              <Text style={styles.todoText}>Got Todo</Text>
              {/* Map your todos here */}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No todos! Create some tasks!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  todoContainer: {
    padding: 10,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
});
