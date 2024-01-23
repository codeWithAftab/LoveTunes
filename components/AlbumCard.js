import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const AlbumCard = ({ item }) => {
  return (
    <View style={{ margin: 10 }}>
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
        {item?.title.length > 18 ? item?.title.substring(0, 18) + "..." : item?.title}
        {/* {item?.title.length > 18 ? item?.title.substring(0, 18) + "..." : item?.title} */}
      </Text>
    </View>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({});
