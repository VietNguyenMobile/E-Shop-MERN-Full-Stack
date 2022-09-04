import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

import ProductCard from './product-card';

const { width } = Dimensions.get('window');

const ProductItem = props => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: '50%', backgroundColor: 'white' }}
      activeOpacity={0.9}
      onPress={() => {
        // props.navigation.navigate('Product Detail', { item: item })
      }}>
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
