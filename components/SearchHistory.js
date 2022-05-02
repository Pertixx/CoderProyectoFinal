import { COLORS, FONTS, SIZES } from '../constants'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

const SearchHistory = ({ data, onPress }) => {

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{marginRight: SIZES.padding}}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultimas Busquedas</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default SearchHistory

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    marginBottom: SIZES.padding - 5,
  },
  text: {
    ...FONTS.h4,
    color: COLORS.gray,
  },
})