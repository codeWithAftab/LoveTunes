import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AlbumCard from './AlbumCard'
import GenericCard from './GenericCard'

const HorizontalSongsList = ({title, data, type}) => {
  return (
    <View>
        {/* <View style={{ height: 10 }} /> */}
       <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10
          }}
        >
          {title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <GenericCard item={item} key={index} type={type} />
          ))}
        </ScrollView>
        
        {/* <View style={{ height: 10 }} /> */}
    </View>
  )
}

export default HorizontalSongsList