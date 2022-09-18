import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import TrafficLight from '../../shared/StyledComponents/TrafficLight';

import { connect, useDispatch } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = props => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable />);
      setAvailabilityText('Unvailable');
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited />);
      setAvailabilityText('Limited Stock');
    } else {
      setAvailability(<TrafficLight available />);
      setAvailabilityText('Available');
    }

    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, []);

  // console.log('item: ', item);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View>
          <EasyButton
            primary
            medium
            onPress={() => {
              dispatch(
                actions.addToCart({ quantity: 1, product: item._id.$oid }),
              ),
                // .addItemToCart(item.id),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added to Cart`,
                  text2: 'Go to your cart to complete order',
                });
            }}>
            <Text style={{ color: 'white' }}>Add</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const mapToDispatchToProps = dispatch => {
  return {
    addItemToCart: product =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

// export default connect(null, mapToDispatchToProps)(SingleProduct);
export default SingleProduct;
