import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";

const SearchItem = ({ item }) => {
  const { currentTrack, setCurrentTrack } = useContext(Player);
  const handlePress = () => {
    // if (item?.type == "song" ) {
    //     const 
    // }
    setCurrentTrack(item);
    onPress(item)
  } 
  
  return (
    <Pressable key={item.id}
    onPress={handlePress}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 50, marginRight: 10, borderRadius: 5 }}
        source={{ uri: item.image[1].link }}
      />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={
            item == currentTrack
              ? {
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#EB3660",
                }
              : { fontWeight: "bold", fontSize: 16, color: "white" }
          }
        >
          {item?.name}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          {item?.type}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        {/* <AntDesign name="heart" size={24} color="#1DB954" /> */}
        <Entypo name="dots-three-vertical" size={15} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SearchItem;

const styles = StyleSheet.create({});
