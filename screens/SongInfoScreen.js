import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { SaavnAPI } from "../lib/api";
import SongItem from "../components/SongItem";
import { useFloatPlayer } from "../StackNavigator";

const SongInfoScreen = () => {
  const route = useRoute();
  console.log("route",route.params);
  console.log()
  const { currentTrack, currentSound, isPlaying, play } = useFloatPlayer();
  
  const [item, setItem] = useState( route.params.item)
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSongs(item.id)
    
  }, []);
  
  function showArtistNames(item){
    if (item.type == "playlist") {
      return ""
    } else if (item.type == "album") {
      return item?.primaryArtists
    } 
    return item?.primaryArtists
    

  }

  async function fetchSongs(id){
    const api_manager = new SaavnAPI()
    console.log("type", item.type)
    if (item.type=="album") {
      const data = await api_manager.albumDetails(id)
      setTracks(data.songs)
    } else if (item.type=="playlist") {
      console.log("playishkjh")
      const data = await api_manager.playlistDetails(id)
      setTracks(data.songs)
      console.log(item)
    }
  }
  // console.log(tracks);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
         
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={{ width: 250, height: 250, borderRadius:5 }}
              source={{ uri: item?.image[2].link }}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {item?.name || item?.title}
        </Text>
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
          }}
        >
      
            <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
              {showArtistNames(item)}
            </Text>
 
        </View>
        <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#EB3660",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
         
              <Pressable
           
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#EB3660",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {tracks?.map((track,index) => (
                      <SongItem item={track} key={index} onPress={play} />
                  ))}
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});
