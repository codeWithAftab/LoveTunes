import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";
import { SaavnAPI } from "../lib/api";

import { useFloatPlayer } from "../StackNavigator";
import HorizontalSongsList from "../components/HorizontalSongsList";
import ListenTogetherButton from "../components/ListenTogetherButton";

const HomeScreen = ( ) => {
  const [userProfile, setUserProfile] = useState();
  const navigation = useNavigation();
  const [topAlbums, setTopAlbums] = useState([]);
  const [recentlyplayed, setRecentlyPlayed] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [trendingAlbums, setTrendingAlbum] = useState([]);
  const [topPlaylist, setTopPlaylist] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false)
  const [topArtists, setTopArtists] = useState([]);
  const [topCharts, setTopCharts] = useState([]);

  const { currentTrack, currentSound, isPlaying, play } = useFloatPlayer();

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();


  const getHomePageData = async () => {
    const saavnApi = new SaavnAPI()
    const data = await saavnApi.getHomePageData("punjabi,hindi");
    setTopAlbums(data.albums)
    setTopCharts(data.charts)
    setTrendingSongs(data.trending.songs)
    setTrendingAlbum(data.trending.albums)
    setTopPlaylist(data.playlists)
    setContentLoaded(true)
    console.log(data)
  };


  useEffect(() => {
    getHomePageData();
  }, []);
  

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: "#282828",
          borderRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          style={{ height: 55, width: 55 }}
          source={{ uri: item?.image[1].link }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
          >
            {item?.name}
          </Text>
        </View>
      </Pressable>
    );
  };
 
  return (
    <>
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50}}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
                borderWidth:2,
                borderColor: 'white' ,
                resizeMode: "cover",
              }}
              source={{ uri: "https://gcdnb.pbrd.co/images/xzfSeomjuBng.png?o=1" }}
              // source={{ uri: "https://lh3.googleusercontent.com/pw/ABLVV844x2b31oG2NLjBLu3nGZLRYQ2A0lgYVxg9R4v38FLipwa3zSwHGbYHWtHUr37D8iqSFFm7B3r__t2NxUweN-7ePtOKsYELuJyjPYEgmW_H15KBMhtjJudk_jxbzDiyeQIfk5VXrvdxpHQBA5EquLArAGIyJcySGVpmFPiJNhK8cOxXCACoWGSQt8Kb0e29QBvy7kBN_IASyfzYKc4_yRL89PwJrOOhIc5gn0CzVX8l5Lf7jGxzIbykMakDGuDpEHcLKn-NPgY5UIoVLuhFnqR-sLphS15ymDRmo8z5WbJSvYViaJqNWt5Cn6StQosmn4K9bLAB_tIqrR0kMcKL2MAAx8H4liBF-zCAj14IBP19-KgCVa--Eh18Zqt23kQooRWehqoHJfTHJ7rw0R18gKw7qJmyyapwhlu3jQFtjbyctxPV5-FThSDuOjEa_Bg0IGqal3hbJ6el5FFe1x4NSJ4nnXoYq3xuSCGu_trxmd0NT6BBuiiwqd9cvcXSa-ALKLeYYJ1iuJ2shyPTD-KwEF1bgtuL0iOI0nQ-BQdqB2satoMo0aYmhSIpkwDICemhU4Eb2mgxqKbZc8SYm2phL2yrUFSJ3Amf7lZmW24W0ZIEbRjdUyViTfLkGCgWHogHIAsnBc1iW8r7LNQzYPftjZ66es8gP12Wi83c3DN8_zKK1nuTRZFSeWmXjZRCvlUkMirUIvj_P6tXKVWvODVrYI1ytxp_xksC_bPWggtwZlqC-2wLFKaRCrkKhN8rdht2uBJ6duLqRfPGkGq_uw7FuOM6OKCRPsrOSWo4QWXs0EsEc758mcIb_waGES6O9wcdZP3ttorcm-fHJLUYF78ZkBszblx-dYId5HWeNyIl5LfyEkWfhpOdnwMqV8FEcoPatSzhJw=w533-h533-s-no-gm?authuser=0" }}
            />
            <View style={
              {
                marginTop:-1
              }
            }>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {message}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
              }}
            >
             @the.coder_3
            </Text>

            </View>
            
          </View>
        </View>

        <ListenTogetherButton/>
        {
          contentLoaded && (
            <>
                <HorizontalSongsList title={"Trending Albums"} type={"album"}  data={trendingAlbums} />
                {/* <HorizontalSongsList title={"Tre nding Songs"} type={"songs"} data={trendingSongs} /> */}
                <HorizontalSongsList title={"Top Playlists"} type={"playlist"} data={topPlaylist} />
                <HorizontalSongsList title={"Top Albums"} type={"album"} data={topAlbums} />
                <HorizontalSongsList title={"Top Charts"} type={"chart"} data={topCharts} />
            </>

          )
        }

        <View style={{ height: currentTrack ? 120 : 80 }} />

    


      </ScrollView>
    </LinearGradient>
</>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
