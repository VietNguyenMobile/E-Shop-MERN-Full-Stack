import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';

import data from '../../assets/data/products.json';
import productionCategories from '../../assets/data/categories.json';
import ProductItem from './product-item';
import {
  Container,
  Header,
  // Icon,
  Item,
  Input,
  Text,
  NativeBaseProvider,
  HStack,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';
import SearchedProduct from './SearchedProduct';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

var { height } = Dimensions.get('window');

const ProductScreen = props => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);
      setProductsCtg(data);
      setInitialState(data);
      setProductsFiltered(data);
      setCategories(productionCategories);

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };

      // setFocus(false);
      // setActive(-1);

      // // Products
      // axios
      //   .get(`${baseURL}products`)
      //   .then(res => {
      //     setProducts(res.data);
      //     setProductsFiltered(res.data);
      //     setProductsCtg(res.data);
      //     setInitialState(res.data);
      //     setLoading(false);
      //   })
      //   .catch(error => {
      //     console.log('Api call error');
      //   });

      // // Categories
      // axios
      //   .get(`${baseURL}categories`)
      //   .then(res => {
      //     setCategories(res.data);
      //   })
      //   .catch(error => {
      //     console.log('Api call error');
      //   });

      // return () => {
      //   setProducts([]);
      //   setProductsFiltered([]);
      //   setFocus();
      //   setCategories([]);
      //   setActive();
      //   setInitialState();
      // };
    }, []),
  );

  // Product Methods
  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = ctg => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter(i => i.category._id === ctg),
              setActive(true),
            ),
          ];
    }
  };
  return (
    <>
      {loading == false ? (
        <NativeBaseProvider>
          <View>
            <View
              style={{
                height: 40,
                backgroundColor: '#e0e0e0',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                borderRadius: 20,
                marginHorizontal: 10,
                marginBottom: 10,
              }}>
              <Icon name="search1" size={16} />
              {/* <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={text => searchProduct(text)}
              /> */}
              <TextInput
                placeholder="Search"
                onFocus={openList}
                style={{ flex: 1 }}
                onChangeText={text => searchProduct(text)}
              />
              {focus == true ? (
                <Ionicons onPress={onBlur} name="ios-close" size={16} />
              ) : null}
            </View>
            {focus == true ? (
              <SearchedProduct
                navigation={props.navigation}
                productsFiltered={productsFiltered}
              />
            ) : (
              <ScrollView>
                <View>
                  <Banner />

                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />

                  {productsCtg.length > 0 ? (
                    <View style={styles.listContainer}>
                      {productsCtg.map(item => {
                        return (
                          <ProductItem
                            navigation={props.navigation}
                            key={item.name}
                            item={item}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={[styles.center, { height: height / 2 }]}>
                      <Text>No products found</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </NativeBaseProvider>
      ) : (
        // Loading
        <NativeBaseProvider>
          <View style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </NativeBaseProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'blue',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
