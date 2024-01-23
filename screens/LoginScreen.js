import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React ,{useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
  WebBrowser.maybeCompleteAuthSession();
  const navigation = useNavigation();
  // const discovery = {
  //   authorizationEndpoint: "https://accounts.spotify.com/authorize",
  //   tokenEndpoint: "https://accounts.spotify.com/api/token",
  // };
  // const config = {
  //   issuer:"https://accounts.spotify.com",
  //   clientId:"fc1f08c9f2204b63854013fa2cbc2824",
  //   clientSecret: "4ebeba5d30da48ad848d1c7a075fb93c",
  //   usePKCE: true,
  //   responseType: 'token',
  //   scopes: [
  //     "user-read-email",
  //     "user-library-read",
  //     "user-read-recently-played",
  //     "user-top-read",
  //     "playlist-read-private",
  //     "playlist-read-collaborative",
  //     "playlist-modify-public" // or "playlist-modify-private"
  //   ],
  //   redirectUri: makeRedirectUri({
  //     scheme: 'aftab.dpotify',
  //     path: "spotify-auth-callback"
  //   })
  //   // redirectUrl:"://spotify-auth-callback"
  // }
  // console.log(config)
  // const [request, response, promptAsync] = useAuthRequest(config, discovery);

  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     const accessToken = await AsyncStorage.getItem("token");
  //     const expirationDate = await AsyncStorage.getItem("expirationDate");
  //     console.log("acess token",accessToken);
  //     console.log("expiration date",expirationDate);

  //     if(accessToken && expirationDate){
  //       const currentTime = Date.now();
  //       if(currentTime < parseInt(expirationDate)){
  //         // here the token is still valid
  //         navigation.replace("Main");
  //       } else {
  //         // token would be expired so we need to remove it from the async storage
  //         AsyncStorage.removeItem("token");
  //         AsyncStorage.removeItem("expirationDate");
  //       }
  //     }
  //   }
    
  //   checkTokenValidity();
  //   console.log(response)
  //   if (response?.type === 'success') {
  //     const { code } = response.params;
  //     console.log("Success")
  //     console.log()
  //     // Get the current date and time
  //     const currentDate = new Date();
  //     const expirationDate = new Date(currentDate.getTime() + 60 * 60 * 1000).getTime();
  //     AsyncStorage.setItem("token",response.authentication.accessToken);
  //     AsyncStorage.setItem("expirationDate",expirationDate.toString());
  //     navigation.navigate("Main")
  //     }
  // },[response])
  async function authenticate ()  {
    console.log("Auth")
    navigation.replace("Main")
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
        onPress={authenticate}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>


     
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
