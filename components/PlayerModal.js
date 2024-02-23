import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongItem from "../components/SongItem";
import PropTypes from 'prop-types';
import { Player } from "../PlayerContext";
import Modal, { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import Slider from "@react-native-community/slider";



const PlayerModal = ({isModalVisible,
                    setIsModalVisible,
                     currentTrack, 
                     handlePlayPause,
                     currentTime,
                     totalDuration,
                     isPlaying
}) => {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const progress = currentTime / totalDuration

  const circleSize = 0
  console.log("tyoe", typeof(isModalVisible))

  return (
    <View>
        <BottomModal
          visible={isModalVisible}
          onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
        >
          <ModalContent
            style={{ height: "100%", width: "100%", backgroundColor: "#030303" }}
          >
         
            <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <AntDesign
                  onPress={() => setIsModalVisible(!isModalVisible)}
                  name="down"
                  size={24}
                  color="white"
                />
  
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  {currentTrack?.name}
                </Text>
  
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </Pressable>
  
              <View style={{ height: 70 }} />
  
              <View style={{ padding: 10 }}>
                <Image
                  style={{ width: "100%", height: 330, borderRadius: 4 }}
                  source={{ uri: currentTrack?.image[2].link }}
                />
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                    >
                      {currentTrack?.name}
                    </Text>
                    <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                      {currentTrack?.primaryArtists}
                    </Text>
                  </View>
  
                  <AntDesign name="heart" size={24} color="#EB3660" />
                </View>
  
                <View style={{ marginTop: 10 }}>
                  {/* <Slider style={{
                      width: "100%",
                      marginTop: 10,
                      height: 3,
                      backgroundColor: "gray",

                      borderRadius: 5,
                    }}
                          minimumValue={0}
                          maximumValue={currentTime}
                          value={progress}
                          minimumTrackTintColor="grey"
                          onSlidingComplete={null}
                          onValueChange={null}
                        /> */}
                  <View
                    style={{
                      width: "100%",
                      marginTop: 10,
                      height: 3,
                      backgroundColor: "gray",
                      borderRadius: 5,
                    }}
                  >
                    <View
                      style={[
                        styles.progressbar,
                        { width: `${progress * 100}%` },
                      ]}
                    />
                    <View
                      style={[
                        {
                          position: "absolute",
                          top: -5,
                          width: circleSize,
                          height: circleSize,
                          borderRadius: circleSize / 2,
                          backgroundColor: "white",
                        },
                        {
                          left: `${progress * 100}%`,
                          marginLeft: -circleSize / 2,
                        },
                      ]}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                    >
                      {formatTime(currentTime)}
                    </Text>
  
                    <Text
                      style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                    >
                      {formatTime(totalDuration)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 17,
                  }}
                >
                  <Pressable>
                    <FontAwesome name="arrows" size={30} color="#EB3660" />
                  </Pressable>
                  <Pressable>
                    <Ionicons name="play-skip-back" size={30} color="white" />
                  </Pressable>
                  <Pressable onPress={handlePlayPause}>
                    {isPlaying ? (
                      <AntDesign name="pausecircle" size={60} color="white" />
                    ) : (
                      <Pressable
                        onPress={handlePlayPause}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: "white",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Entypo name="controller-play" size={26} color="black" />
                      </Pressable>
                    )}
                  </Pressable>
                  <Pressable>
                    <Ionicons name="play-skip-forward" size={30} color="white" />
                  </Pressable>
                  <Pressable>
                    <Feather name="repeat" size={30} color="#EB3660" />
                  </Pressable>
                </View>
              </View>
            </View>
          </ModalContent>
        </BottomModal>
    </View>
  )
}

// Inside your PlayerModal component
PlayerModal.propTypes = {
  // Other prop types
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  // Other prop types
};

export default PlayerModal


const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});