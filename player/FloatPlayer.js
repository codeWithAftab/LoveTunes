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
import React, { useEffect, useState, useRef } from 'react'
import { AntDesign } from "@expo/vector-icons";
import { Player } from "../PlayerContext";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Audio } from "expo-av";
import { debounce, last } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFloatPlayer } from "../StackNavigator";


const FloatPlayer = ({modalVisible, setModalVisible,  playNextTrack, setCurrentSound, setCurrentTrack, setIsPlaying,  handlePlayPause}) => {
    const { currentTrack, currentSound, isPlaying, play } = useFloatPlayer();
    
    useEffect( () => {
        async function setLastPlayed(){
            // await AsyncStorage.clear()
            const lastPlayedTrack = JSON.parse(await  AsyncStorage.getItem("lastPlayedTrack"))
            print("cached lastplayed", lastPlayedTrack)
            const currSound = lastPlayedTrack.currentSound
            const lastTrack = lastPlayedTrack.currentTrack
            const is_playing = lastPlayedTrack.isPlaying

            if(!currentTrack && lastPlayedTrack){
                console.log(lastPlayedTrack)
                setIsPlaying(is_playing)
                setCurrentSound(currSound)
                console.log("lastPlayedTrack")
                setCurrentTrack(lastTrack)
            } else{
                console.log("current track")
                setCurrentTrack(currentTrack)
            }
        }
       
      return () => {}
    }, [])  

    function format_title(title){
      console.log(title)
      return title.length > 18 ? title.substring(0, 18) + "..." : title
  }
  return (
    <View>
      {currentSound && (
          <Pressable
            onPress={()=>{setModalVisible(true)}}
            style={{
              backgroundColor: '#292929',
              width: "95%",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 35,
              position: "absolute",
              borderRadius: 6,
              height: 58,
              left: 12,
              bottom: 25,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 5 }}
                source={{ uri: currentTrack?.image[1].link}}
              />
              <View style={{ flexDirection: "column", alignItems: "center" }}>

              <Text
                style={{
                  fontSize: 15,
                  width: 160,
                  color: "white",
                  fontWeight: "bold",
                }}
                >
                {currentTrack && currentTrack.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  width: 160,
                  color: "white",
                  fontWeight: "bold",
                }}
                >
                {currentTrack && format_title(currentTrack.primaryArtists)} 
              </Text>
          
            </View>
            </View>
  
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              {
                isPlaying ?  (<Pressable onPress={handlePlayPause}>

                <AntDesign name="pausecircle" size={30} color="white" />
              </Pressable>) :
              (
              <Pressable onPress={handlePlayPause}>
                <AntDesign name="play" size={30} color="#EB3660" />
              </Pressable>
              )
              }
            
            </View>
          </Pressable>
        )}
    </View>
  )
}

export default FloatPlayer