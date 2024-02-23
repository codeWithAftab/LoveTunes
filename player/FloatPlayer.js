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
import PlayerModal from "../components/PlayerModal";


const FloatPlayer = ({ 
                      playNextTrack,
                      setCurrentSound,
                      setCurrentTrack,  
                      currentTime, 
                      progress, 
                      totalDuration
                    }) => {
                      
    const { currentTrack, currentSound, playbackStatus, play } = useFloatPlayer();
    const [isPlaying, setIsPlaying] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
          // updateIsPlayingStatus()
    
      return () => { }
    }, [])

    async function updateIsPlayingStatus(){
      if (currentSound) {
        const status = await currentSound.getStatusAsync()
        console.log(status)
        setIsPlaying(status.isPlaying)
      }
    }
    
    const handlePlayPause = async () => {
      setIsPlaying(!isPlaying)
      console.log(currentSound)
      
      if (currentSound) {
          if (isPlaying) {
            const status = await currentSound.pauseAsync();
          }
          else {
            const status = await currentSound.playAsync();
          }
      }
    };
    console.log("syate unc", setModalVisible)


    // const updateStatus = async ()=>{
    //   const status = await currentSound.getStatusAsync()
    //   setIsPlaying(status.isPlaying)
    // } 

    function format_title(title){
      return title.length > 18 ? title.substring(0, 18) + "..." : title
  }
  return (
    <View>
      {(
          <Pressable
            onPress={()=>{
              console.log("modalVisible", modalVisible)
              setModalVisible(true)}}
            style={{
              backgroundColor: '#030303',
              shadowColor: "white",
              shadowOffset: {
                width: 30,
                height: -5,
              },
              width: "95%",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 34,
              position: "absolute",
              borderRadius:5,
              height: 60,
              left: 10,
              bottom: 25,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                style={{ width: 45, height: 45, borderRadius: 5 }}
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
                <AntDesign name="play" size={30} color="white" />
              </Pressable>
              )
              }
            
            </View>
          </Pressable>
        )}
        {
          modalVisible &&  <PlayerModal currentTrack={currentTrack}
                              handlePlayPause={handlePlayPause} 
                              isModalVisible={ modalVisible } 
                              setIsModalVisible={setModalVisible}
                              currentTime={currentTime}
                              progress={progress}
                              isPlaying={isPlaying}
                              totalDuration={totalDuration}
                              />
        }
       

    </View>
  )
}

export default FloatPlayer