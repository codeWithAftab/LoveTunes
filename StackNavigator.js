import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from "expo-av";
import { debounce } from 'lodash';
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SongInfoScreen from "./screens/SongInfoScreen";
import SearchScreen from "./screens/SearchScreen";
import FloatPlayer from "./player/FloatPlayer";
import React, { useState, useContext, createContext, useRef} from "react";


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
     
    </Tab.Navigator>
  );
}



const Stack = createNativeStackNavigator();

  function Navigation(){
    const [currentSound, setCurrentSound] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const value = useRef(0)
    const [progress, setProgress] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const play = async (nextTrack) => {
      console.log("nextTrack", nextTrack.name);
      const preview_url = nextTrack?.downloadUrl[2]?.link;

      try {
        console.log("setting current track..")
        setCurrentTrack(nextTrack);
        console.log("current track complete")

        if (currentSound) {
          console.log("stopping...", nextTrack.name)
          const status = await currentSound.stopAsync();
          console.log(status)
          console.log("song stopped", nextTrack.name)
        }

        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
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
        setPlaybackStatus(status);
        setTotalDuration(status.durationMillis);
        onPlaybackStatusUpdate(status);
        setCurrentSound(sound);

        await sound.playAsync();
      } catch (err) {
        console.log("Error in ")
        console.log(err.message);
      }
    };
  
  const playPlaylist = async (playlist)=>{
    setCurrentPlaylist(playlist)
    play(playlist.songs[0])
  }

  const stopPlaylist = async ()=>{
    setCurrentPlaylist(null)
    if (currentSound) {
      await currentSound.pauseAsync();
    }
    if (isPlaying) {
      setIsPlaying(false)
    }
  }
  
  const playNextTrack = async () => {
    if (currentSound) {
      const status = await currentSound.stopAsync();
      if (!status.isPlaying) {
        setCurrentSound(null)
      }
      console.log(status)
    }

    if (currentPlaylist) {
      value.current += 1;
      if (value.current < currentPlaylist.songs.length) {
        const nextTrack = currentPlaylist?.songs[value.current];
        setCurrentTrack(nextTrack);
     
        await play(nextTrack);
      } else {
        console.log("end of playlist");
      }
      
    }

  };
  
const debouncedSetCurrentTime = debounce(setCurrentTime, 100);


    const onPlaybackStatusUpdate = async (status) => {
      console.log("status", status);
      if (status.isLoaded && status.isPlaying) {
        const progress = status.positionMillis / status.durationMillis;
        console.log("progresss", progress);
        debouncedSetCurrentTime(status.positionMillis);
      }
  
      if (status.didJustFinish === true) {
        setCurrentSound(null);
        playNextTrack()
      }
    };


    return (
      <FloatPlayerContext.Provider value={{ currentTrack, currentSound, isPlaying, currentPlaylist, play, playPlaylist, stopPlaylist }}>

        <NavigationContainer>
          
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name="Liked" component={LikedSongsScreen} options={{headerShown:false}}/> 
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/> 
                <Stack.Screen name="Info" component={SongInfoScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
    
            {
              currentTrack && <FloatPlayer currentTrack={currentTrack}
                                           setCurrentSound={setCurrentSound} 
                                           setCurrentTrack={setCurrentSound} 
                                           currentSound={currentSound}  
                                           currentTime={currentTime}
                                           progress={progress}
                                           totalDuration={totalDuration}
                                           />
            }
      
        </NavigationContainer>

      </FloatPlayerContext.Provider>
    )
}

export default Navigation