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
  // console.log("route",route.params);
  console.log()
  const { currentTrack, currentPlaylist, currentSound, isPlaying, play, playPlaylist, stopPlaylist } = useFloatPlayer();

  const [playlist, setPlaylist] = useState(null)
  const [item, setItem] = useState( route.params.item)
  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSongs(item.id)
  }, []);

  
  function showArtistNames(item){
    if (item.type == "playlist") {
      return "Jass Manak"
    } else if (item.type == "album") {
      return item?.primaryArtists
    } 
    return item?.primaryArtists
  }


  async function fetchSongs(id){
    const api_manager = new SaavnAPI()
    if (item.type=="album") {
      const data = await api_manager.albumDetails(id)
      setPlaylist(data)
    } else if (item.type=="playlist") {
      const data = await api_manager.playlistDetails(id)
      setPlaylist(data)
    }
  }
  // console.log(tracks);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>

    <View  style={{ flexDirection: "row", marginTop: 50, backgroundColor:"#040306", justifyContent: 'space-between'}}>
      <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 20 }}
          >
            <Ionicons name="arrow-back" size={30} color="white" />

          </Pressable>

        <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 20 }}
          >
            <Entypo name="dots-three-vertical" size={25} color="white" />

          </Pressable>

      </View>
      <ScrollView style={{ marginTop: 10 }}>
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
        
            style={
              ({pressed})=>[{
                // backgroundColor:  "#202020" ,
                // flexDirection: "row",
                // alignItems: "center",
                justifyContent:"center",
                justifyContent: "space-between",
                marginHorizontal: 10,
            }]
          }
          >
            {/* <Pressable
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
            </Pressable> */}

            <View
              style={{ flexDirection: "row",  alignItems: "center", justifyContent:"center" }}
            >
              

              {
                currentPlaylist?.id == playlist?.id ? (
                  <Pressable
                    onPress={stopPlaylist}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#EB3660",
                    }}
                  >
                      <Entypo name="controller-paus" size={24} color="white" />
                  </Pressable>
                ) : 
                <Pressable
                    onPress={()=> {playPlaylist(playlist)}}
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

              }
            

             
            </View>
          </Pressable>

          <View>
              <View style={{marginTop:10,marginHorizontal:12}}>
                  {playlist?.songs?.map((track,index) => (
                      <SongItem currentTrack={currentTrack} item={track} key={index} onPress={play} />
                  ))}
              </View>
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});
