import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../constants'
import React from 'react'

const Bookmark = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmark</Text>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
})