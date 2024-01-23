import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from "expo-av";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SongInfoScreen from "./screens/SongInfoScreen";
import SearchScreen from "./screens/SearchScreen";
import FloatPlayer from "./player/FloatPlayer";
import React, { useState, useContext, createContext} from "react";
import PlayerModal from "./player/PlayerModal";


const Tab = createBottomTabNavigator();

// Create a context for FloatPlayer props
const FloatPlayerContext = createContext();


// Custom hook to use the FloatPlayer context
export const useFloatPlayer = () => {
  return useContext(FloatPlayerContext);
};



function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle:{
           
            backgroundColor:"rgba(0,0,0,1)",
            position: "absolute",
            bottom:0,
            left:0,
            right:0,
            shadowOpacity:4,
            shadowRadius:4,
            height:55,
            elevation:3,
            shadowOffset:{
                width:0,
                height:-4
            },
            borderTopWidth:0 
        },
        tabBarIconStyle:{
          padding:0
        }
       
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white", fontWeight:"bold", fontSize: 12, paddingBottom: 3 },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#EB3660" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarLabelStyle: { color: "white", fontWeight:"bold", fontSize: 12, paddingBottom: 3 },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="search1" size={24} color="#EB3660" />

            ) : (
              <AntDesign name="search1" size={24} color="white" />
            ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={SongInfoScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white", fontWeight:"bold", fontSize: 12, paddingBottom: 3 },
          tabBarIcon: ({ focused }) =>
            focused ? (
                <Ionicons name="person" size={24} color="#EB3660" />
            ) : (
                <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      /> */}
    </Tab.Navigator>
  );
}



const Stack = createNativeStackNavigator();
  function Navigation(){
    const [currentSound, setCurrentSound] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [showPlayerModal, setShowPlayerModal] = useState(false)

    const play = async (nextTrack) => {
      console.log("nextTrack", nextTrack.name);
      const preview_url = nextTrack?.downloadUrl[2]?.link;
      try {
        // console.log("currentSound", currentSound)
        setCurrentTrack(nextTrack);
        if (currentSound) {
          await currentSound.stopAsync();
        }
        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
        });
        const { sound, status } = await Audio.Sound.createAsync(
          {
            uri: preview_url,
          },
          {
            shouldPlay: true,
            isLooping: false,
          },
          onPlaybackStatusUpdate
        );
        setIsPlaying(status.isLoaded);
        onPlaybackStatusUpdate(status);
        setCurrentSound(sound);
        await sound.playAsync();
      } catch (err) {
        console.log("Error in ")
        console.log(err.message);
      }
    };

    const onPlaybackStatusUpdate = async (status) => {
      // console.log("status", status);
      // if (status.isLoaded && status.isPlaying) {
      //   const progress = status.positionMillis / status.durationMillis;
      //   console.log("progresss", progress);
      //   setProgress(progress);
      //   setCurrentTime(status.positionMillis);
      //   setTotalDuration(status.durationMillis);
      // }
  
      if (status.didJustFinish === true) {
        await handlePlayPause()
      }
    };

    const handlePlayPause = async () => {
      setIsPlaying(!isPlaying);
      // console.log(`current sound `, currentSound)
      if (currentSound) {
        if (isPlaying) {
          console.log("changginn")
          await currentSound.pauseAsync();
        } else {
          await currentSound.playAsync();
        }
      }
    };


    return (
      <FloatPlayerContext.Provider value={{ currentTrack, currentSound, isPlaying, handlePlayPause, play }}>

        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/> */}
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name="Liked" component={LikedSongsScreen} options={{headerShown:false}}/> 
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/> 
                <Stack.Screen name="Info" component={SongInfoScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
                {/* FloatPlayer is accessible in all screens via the context */}
            {/* <FloatPlayer /> */}
            <FloatPlayer  modalVisible={showPlayerModal} setModalVisible={setShowPlayerModal} currentTrack={currentTrack} setCurrentSound={setCurrentSound} setCurrentTrack={setCurrentSound} currentSound={currentSound} setIsPlaying={setIsPlaying}  handlePlayPause={handlePlayPause} />
          {/* {
              showPlayerModal && <PlayerModal modalVisible={showPlayerModal} setModalVisible={setShowPlayerModal} setCurrentTrack={setCurrentSound} handlePlayPause={handlePlayPause} progress={progress} currentTime={currentTime} totalDuration={totalDuration} />
          } */}
        </NavigationContainer>

      </FloatPlayerContext.Provider>
    )
}

export default Navigation