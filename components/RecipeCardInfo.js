import { COLORS, FONTS, SIZES, icons } from '../constants'
import { StyleSheet, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
//import { BlurView } from 'expo-blur'
import React from 'react'

const RecipeCardInfo = ({recipeItem}) => {
  return (
    <View
      //tint='dark'
      //intensity={Platform.OS != 'ios' ? 100 : 80}
      style={styles.container}
    >
      <Text style={styles.name}>{recipeItem.name}</Text>
      <View style={styles.details}>
        <Feather name="clock" size={20} color={COLORS.white} />
        <Text style={styles.description}>{recipeItem.duration} | {recipeItem.views} visitas</Text>
      </View>
    </View>
  )
}

export default RecipeCardInfo

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 10,
    right: 10,
    height: SIZES.height * 0.15,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
  },
  details: {
    flexDirection: 'row',
  },
  name: {
    color: COLORS.white,
    width: "60%",
    ...FONTS.h2,
  },
  description: {
    ...FONTS.body,
    color: COLORS.gray3,
    marginLeft: SIZES.padding - 5,
  },
})