import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const COLORS = {
  darkGreen: "#229879",
  darkLime: "#1A8871",
  lightLime: "#BBD6C5",
  lime: "#2AD699",
  lightGreen: "#E7F9EF",
  lightGreen1: "#8EbCA0",

  white: "#fff",
  white2: '#F9F9F9',
  black: "#020202",
  black2: '#06113C',
  black3: '#212121',
  blue: "#4096FE",
  gray: "#777777",
  gray2: '#F8F8F8',
  gray3: '#DDDDDD',
  gray4: '#B2B1B9',
  lightGray: "#F5F6FB",
  lightGray2: '#757575',

  darkOrange: '#E65100',
  orange: '#FF8C32',

  transparentBlack1: 'rgba(2, 2, 2, 0.1)',
  transparentBlack3: 'rgba(2, 2, 2, 0.3)',
  transparentBlack5: 'rgba(2, 2, 2, 0.5)',
  transparentBlack7: 'rgba(2, 2, 2, 0.7)',
  transparentBlack9: 'rgba(2, 2, 2, 0.9)',

  transparentGray: 'rgba(77,77,77, 0.8)',
  transparentDarkGray: 'rgba(20,20,20, 0.9)',

  transparent: 'transparent',
}

export const SHADOW = {
  shadow1: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
}

export const SIZES = {
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,

  largeTitle: 40,

  body: 14,
  padding: 15,
  icon: 24,
  bottomTabHeight: 60,

  width,
  height,
}

export const FONTS = {
  largeTitle: { fontFamily: "RobotoBold", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Roboto", fontSize: SIZES.h1, lineHeight: 36 },
  h1Bold: { fontFamily: "RobotoBold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "RobotoBold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "RobotoBold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "RobotoBold", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "Roboto", fontSize: SIZES.h4, lineHeight: 22 },
  body: {fontFamily: "Roboto", fontSize: SIZES.body, lineHeight: 22},
  bodyBold: {fontFamily: "RobotoBold", fontSize: SIZES.body, lineHeight: 22},
}

const appTheme = { COLORS, SIZES, FONTS, SHADOW }

export default appTheme