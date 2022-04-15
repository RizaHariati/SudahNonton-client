import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Title } from "react-native-paper";
import { windowWidth } from "../../../../context/initValues";
import { movieList } from "../../../../data/data";
import { globalstyles } from "../../../../styles/globalstyles";

const CategoryImages = () => {
  return (
    <View style={globalstyles.rowSubContainer}>
      <Title style={{ marginLeft: 16 }}>Category Title</Title>
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: windowWidth * 0.27,
                height: 160,
                borderRadius: 5,
                // borderColor: theme.colors.primary,
                // borderWidth: 1,
                marginLeft: 10,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <TouchableOpacity>
                <Image
                  source={item.source}
                  style={{
                    width: windowWidth * 0.27,
                    height: 160,
                    resizeMode: "cover",
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CategoryImages;
