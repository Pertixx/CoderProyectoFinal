import { COLORS, SHADOW, SIZES, dummyData } from '../constants'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { Feather } from '@expo/vector-icons'

const SearchBar = ({ onPressSearch, onPressFilter, text, onChangeText }) => {

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => {
            onPressSearch(text)
            onChangeText(null)
            Keyboard.dismiss()
          }}
          style={styles.searchButton}
        >
          <Feather name="search" size={SIZES.icon} color={COLORS.black} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={text}
        />
      </View>
      <TouchableOpacity
        onPress={onPressFilter}
        style={styles.filterButton}
      >
        <Feather name="filter" size={SIZES.icon} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
    height: SIZES.height * 0.07,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: SIZES.padding,
    width: '80%',
    height: '90%',
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    ...SHADOW.shadow1
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.padding -5,
    backgroundColor: COLORS.gray3,
  },
  input: {
    width: '80%',
    height: '100%',
  },
})