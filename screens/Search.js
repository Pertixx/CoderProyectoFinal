import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, SIZES, dummyData } from "../constants";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";

import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import { useSelector } from "react-redux";

const first_n = 5;

const Search = ({ navigation }) => {
  const data = useSelector((state) => state.recipes.recipes);
  const [searchHistory, setSearchHistory] = useState(
    dummyData.user.searchHistory.slice(0, first_n)
  );
  const [text, setText] = useState(null);

  const scrollY = useSharedValue(0); //similar to new Animated.value(0)

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const inputRange = [0, SIZES.padding * 12];
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolate.CLAMP
      ),
      transform: [{ translateX: scrollY.value }],
    };
  });

  const handleSearch = (text) => {
    if (!searchHistory.includes(text) && text != null) {
      searchHistory.unshift(text);
      setSearchHistory(searchHistory.slice(0, first_n));
    }
  };

  const renderItem = (item) => {
    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <RecipeCard recipeItem={item} navigation={navigation} />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <SearchBar
          onPressSearch={handleSearch}
          onPressFilter={() => console.log("Filter")}
          text={text}
          onChangeText={setText}
        />
        <SearchHistory data={searchHistory} onPress={setText} />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log(text)}
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ marginBottom: SIZES.bottomTabHeight * 2 }} />
        }
        ListHeaderComponent={
          <View style={{ paddingHorizontal: SIZES.padding }}>
            {renderHeader()}
          </View>
        }
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
  headerContainer: {
    overflow: "hidden",
  },
});
