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
  import { Player } from "../PlayerContext";
  import { BottomModal } from "react-native-modals";
  import { ModalContent } from "react-native-modals";
  import { Audio } from "expo-av";
  import { debounce } from "lodash";
import { SaavnAPI } from "../lib/api";
import FloatPlayer from "../player/FloatPlayer";
import { useFloatPlayer } from "../StackNavigator";
  
  const SearchScreen = () => {

    const colors = [
      "#27374D",
      "#1D267D",
      "#BE5A83",
      "#212A3E",
      "#917FB3",
      "#37306B",
      "#443C68",
      "#5B8FB9",
      "#144272",
    ];
    const navigation = useNavigation();
    const [searchResult, setSearchResult] = useState([]);
    const [totalResult, setTotalResult] = useState();
    const [query, setQuery] = useState("");
    const [savedTracks, setSavedTracks] = useState([]);
    const value = useRef(0);
    const { currentTrack, currentSound, isPlaying, play } = useFloatPlayer();

    console.log("method", play)
    async function searchSong(query) {
        const saavnApi = new SaavnAPI()
        try{
          const data = await saavnApi.searchSong(query)
          setSearchResult(data.results)
          setTotalResult(data.total)

        } catch(e){
          alert(`Error Occured ${e.message}`)
        }
    }


   

    const debouncedSearch = debounce(searchSong, 1200);
    const handleInputChange = (text) => {
      setQuery(text);
      debouncedSearch(text);
    };
    return (
      <>
        <View style={{ flex: 1, backgroundColor: "#040306" }}>
          <ScrollView style={{ flex: 1, marginTop: 50 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: 10,  padding: 15 }}
            >
              <View style={{
                flexDirection:"row",
                justifyContent:"flex-start",
                gap: 10
              }}>
              {/* <Ionicons name="arrow-back" size={30} marginTop={2} color="white" /> */}
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
                Search
              </Text>
              </View>
            
            </Pressable>
  
            <Pressable
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 9,
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "white",
                  padding: 10,
                  flex: 1,
                  borderRadius: 4,
                  height: 50,
                }}
              >
                <AntDesign name="search1" size={25} color="black" />
                <TextInput
                  value={query}
                  onChangeText={(text) => handleInputChange(text)}
                  placeholder="Artist, Songs, or Albums"
                  placeholderTextColor={"black"}
                  
                  style={{ fontWeight: "500",color:"black", flex:1 }}
                />
              </Pressable>
  
            </Pressable>
  
            <View style={{ height: 20 }} />
            <View style={{ marginHorizontal: 10 }}>
           
         
            </View>



  
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >

     
            </Pressable>
  
            {searchResult.length === 0 ? (
               <Text> No Result</Text>
              // <ActivityIndicator size="large" color="gray" /> // Show a loading indicator while data is being fetched
            ) : (
              
                searchResult.map((item, index)=>{
                  return <Pressable
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                   <SongItem
                        item={item}
                        onPress={play}
                        key={index}
                      />
                </Pressable>
                  
                 
                })
              
            )}
          </ScrollView>
        </View>
  

  {/* float player */}
  
      </>
    );
  };
  
  export default SearchScreen;
  
  const styles = StyleSheet.create({
    progressbar: {
      height: "100%",
      backgroundColor: "white",
    },
  });
  