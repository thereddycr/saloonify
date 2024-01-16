import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import { Feather, AntDesign } from "react-native-vector-icons";

export default function App() {
  const [timeSlots, setTimeSlots] = useState([
    {
      id: 1,
      time: "10:00 AM",
      date: "15-01-2024",
      available: true,
      bookedBy: null,
    },
    {
      id: 2,
      time: "02:00 PM",
      date: "15-01-2024",
      available: true,
      bookedBy: null,
    },
    {
      id: 3,
      time: "04:00 PM",
      date: "15-01-2024",
      available: false,
      bookedBy: "Arya",
    },
    {
      id: 4,
      time: "06:00 PM",
      date: "15-01-2024",
      available: true,
      bookedBy: null,
    },
    {
      id: 5,
      time: "10:00 PM",
      date: "16-01-2024",
      available: true,
      bookedBy: null,
    },
    {
      id: 6,
      time: "02:00 PM",
      date: "16-01-2024",
      available: false,
      bookedBy: "Nidhi",
    },
    {
      id: 7,
      time: "04:00 AM",
      date: "16-01-2024",
      available: true,
      bookedBy: null,
    },
    {
      id: 8,
      time: "06:00 AM",
      date: "16-01-2024",
      available: false,
      bookedBy: "Riya",
    },
    {
      id: 9,
      time: "10:00 AM",
      date: "16-01-2024",
      available: true,
      bookedBy: null,
    },
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleSlotPress = (item) => {
    setSelectedSlot(item);
    setModalVisible(true);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = () => {
    setNameError(null);
    setEmailError(null);
    let errorStatus = false;
    if (name.trim() === "") {
      setNameError("Name is required.");
      errorStatus = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      errorStatus = true;
    }

    if (errorStatus || selectedSlot === null) {
      // alert("Please fill in all fields with valid information.");
      return;
    }

    try {
      const updatedSlots = timeSlots.map((slot) =>
        slot.id === selectedSlot?.id
          ? { ...slot, available: false, bookedBy: name }
          : slot
      );
      setTimeSlots(updatedSlots);
      alert("Booking Confirmed!");
      setModalVisible(false);
      setSelectedSlot(null);
      setName("");
      setEmail("");
      setNameError(null);
      setEmailError(null);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const renderItem = ({ item }) => {
    const isSlotAvailable = item.available;

    return (
      <TouchableOpacity
        // onPress={() => isSlotAvailable && handleSlotPress(item.id)}
        // disabled={!isSlotAvailable}
        onPress={() => handleSlotPress(item)}
      >
        <View
          style={{
            backgroundColor: isSlotAvailable ? "lightblue" : "lightcoral",
            margin: 10,
            padding: 10,
            width: 150,
            height: 100,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text>{item.time}</Text>
          <Text>{item.date}</Text>
          {isSlotAvailable ? (
            <Text>Available</Text>
          ) : (
            <Text>Booked by: {item.bookedBy}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("./assets/SaloonBackground.jpg")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "lightgrey",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Saloonify
        </Text>
        <Text style={{ fontSize: 12 }}>Madhapur, Hyderabad</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "100%",
          gap: 2,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 18, fontStyle: "italic", fontWeight: "bold" }}>
          Hey Chandu Reddy!
        </Text>
        <Text style={{ fontSize: 10 }}>Go! book your appointment now...</Text>
      </View>

      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        data={timeSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={selectedSlot}
        numColumns={2}
      />
      <Pressable
        style={{
          backgroundColor: "lightgrey",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onLongPress={() => {
          alert("Home");
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 100 }}
        >
          <Feather name="home" size={30} color="black" />
        </View>
      </Pressable>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        animationType="slide"
        transparent
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              gap: 10,
            }}
          >
            {selectedSlot && selectedSlot.available ? (
              <View>
                <Text>Enter Details</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "grey",
                    marginVertical: 5,
                  }}
                />
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setNameError(null);
                  }}
                  style={[styles.input, nameError ? styles.inputError : null]}
                />
                {nameError && (
                  <Text style={styles.errorMessage}>{nameError}</Text>
                )}
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(null);
                  }}
                  keyboardType="email-address"
                  style={[styles.input, emailError ? styles.inputError : null]}
                />
                {emailError && (
                  <Text style={styles.errorMessage}>{emailError}</Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                      setNameError(null);
                      setEmailError(null);
                    }}
                    color="transparent"
                    style={{
                      borderColor: "grey",
                      borderWidth: 1,
                      borderRadius: 10,
                      width: 80,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "grey" }}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleFormSubmit}
                    color="blue"
                    style={{
                      borderRadius: 10,
                      backgroundColor: "blue",
                      width: 80,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 200,
                  }}
                >
                  <Text>View Details</Text>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <AntDesign name="closecircleo" size={20} />
                  </Pressable>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "grey",
                    marginVertical: 15,
                  }}
                />
                <View style={{ gap: 5 }}>
                  <Text>Time: {selectedSlot?.time}</Text>
                  <Text>Date: {selectedSlot?.date}</Text>
                  <Text>Booked by: {selectedSlot?.bookedBy}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
const styles = {
  input: {
    borderWidth: 1,
    height: 40,
    width: 200,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
};
