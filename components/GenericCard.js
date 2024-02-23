import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { format_title, get_formated_title } from "../lib/methods";

const GenericCard = ({ item , type}) => {
  const navigation = useNavigation();
    
  return (
    <Pressable key={item.id} style={{ margin: 10 }} onPress={()=>{navigation.navigate("Info", {item: item})}}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.image[2].link }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {
            get_formated_title(item)
        }
      </Text>
    </Pressable>
  );
};

export default GenericCard;

const styles = StyleSheet.create({});
