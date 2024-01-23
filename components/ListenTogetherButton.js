import { View, Text, Image, StyleSheet, Pressable, ToastAndroid } from 'react-native'
import React from 'react'
import { showToast } from '../lib/utils'

const ListenTogetherButton = () => {
  
  return (
    <Pressable
    onPress={()=>{showToast("This Feature is in Development!")}}
    style={{
      alignItems: "center",
      justifyContent: "center",
    }}
  >
  
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "50%",
        paddingHorizontal:10,
        height:60,
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#202020",
        borderRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        style={{ width: 40, height: 40 }}
        source={{ uri: "https://gcdnb.pbrd.co/images/z34eBqVVXtGs.png?o=1" }}
      />
      <View style={styles.randomArtist}>
        <Text
          style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
        >
          Listen Together
        </Text>
      </View>
    </View>
  </Pressable>
  )
}

export default ListenTogetherButton

const styles = StyleSheet.create({});
