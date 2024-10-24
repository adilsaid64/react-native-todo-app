import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent
} from 'react-native-modals';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker for due date selection
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { API_URL } from '@env';

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // Added dueDate state
  const [showDatePicker, setShowDatePicker] = useState(false); // State for controlling date picker visibility
  
  const exampleTodos = ["Do laundry", "Sleep early", "Buy groceries", "Read a book", "Exercise"];
  
  const handleTodoRefresh = async() =>{
    try {
      // await AsyncStorage.removeItem("authToken");
 
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(`${API_URL}/users/${userId}/todos`);
        console.log(response.data.todos)
        setTodos(response.data.todos)

        // Add methods to filter between pending and completed
      }
    }catch (error){
      console.log(error)
    }
  }
  
  const handleSubmit = async () => {
    if (todo && category) {
      try {
        const token = await AsyncStorage.getItem("authToken");
  
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
  
          const newTodo = {
            title: todo,
            category: category,
            dueDate: dueDate.toDateString(),
            status: 'pending',
            createdAt: new Date(),
            userId: userId
          };
  
          console.log("Todo added:", newTodo);
          
          const response = await axios.post(`${API_URL}/todos/${userId}`, newTodo);

          setTodo("");
          setCategory("");
          setModalVisible(false);
        } else {
          console.log("No token found.");
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      console.log("Please fill in all fields");
    }
  };

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

        <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircleo" size={30} color="blue" />
        </Pressable>
        
        <Pressable style={styles.addButton} onPress={() => handleTodoRefresh()}>
          <AntDesign name="reload1" size={30} color="blue" />
          
        </Pressable>
      </View>

      {/* Todo List or Empty State */}
      <ScrollView style={styles.scrollView}>
      <View style={styles.todoContainer}>
        {todos.length > 0 ? (
          <View>
            <Text style={styles.todoText}>Got Todo</Text>

            {/* Display todos using FlatList */}
            <FlatList
              data={todos} // Pass the todos array as data
              keyExtractor={(item) => item._id} // Use the unique _id of each todo as the key
              renderItem={({ item }) => (
                <View style={styles.todoItem}>
                  {/* Customize how each todo will be displayed */}
                  <Text style={styles.todoTitle}>{item.title}</Text>
                  <Text style={styles.todoCategory}>{item.category}</Text>
                  <Text style={styles.todoDueDate}>Due: {item.dueDate}</Text>
                  <Text style={styles.todoStatus}>Status: {item.status}</Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No todos! Create some tasks!</Text>
          </View>
        )}
      </View>
    </ScrollView>


      {/* Modal Implementation */}
      <BottomModal
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(false)}
        onBackDropPress={() => setModalVisible(false)}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add Todo" />}
        modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
      >
        <ModalContent>
          <View>
            <Text>Create your task</Text>
            
            {/* TextInput for Todo */}
            <TextInput
              label="Todo"
              value={todo}
              onChangeText={setTodo}
              placeholder='Enter task'
              style={styles.textInput}
            />

            {/* Category Selection */}
            <Text>Select Category</Text>
            {["Work", "Personal"].map((cat) => (
              <Pressable 
                key={cat} 
                style={[styles.categoryButton, category === cat && styles.selectedCategory]} 
                onPress={() => setCategory(cat)}
              >
                <Text>{cat}</Text>
              </Pressable>
            ))}

            {/* Due Date Picker */}
            <Text>Select Due Date</Text>
            <Pressable
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{dueDate.toDateString()}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDueDate(selectedDate); // Update dueDate
                  }
                }}
              />
            )}

            {/* Example Todos */}
            <Text>Quick Add</Text>
            <FlatList
              horizontal
              data={exampleTodos}
              renderItem={({ item }) => (
                <Pressable 
                  key={item} 
                  style={styles.exampleTodoButton} 
                  onPress={() => setTodo(item)}
                >
                  <Text>{item}</Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />

            {/* Dummy Submit Button */}
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
              Submit
            </Button>
          </View>
        </ModalContent>
      </BottomModal>
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
  todoCategory: {
    fontSize: 12,
    color: '#777',
  },
  todoDueDate: {
    fontSize: 12,
    color: '#555',
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
  textInput: {
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
  datePickerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  exampleTodoButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 20,
  },
  todoItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  todoContainer: {
    padding: 20,
  },
  todoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoCategory: {
    fontSize: 14,
    color: '#555',
  },
  todoDueDate: {
    fontSize: 12,
    color: '#999',
  },
  todoStatus: {
    fontSize: 12,
    color: '#333',
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
  }
});
