import React from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import {
  Content,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Text,
  Avatar,
} from 'native-base';

var { width } = Dimensions.get('window');

const SearchedProduct = props => {
  const { productsFiltered } = props;
  return (
    <View style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map(item => (
          <Pressable
            onPress={() => {
              props.navigation.navigate('ProductDetail', { item: item });
            }}
            key={item._id.$oid}
            style={{ flexDirection: 'row', margin: 10 }}
            avatar>
            <View>
              <Avatar
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 15, color: '#bdbdbd' }}>
                {item.description}
              </Text>
            </View>
          </Pressable>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default SearchedProduct;
