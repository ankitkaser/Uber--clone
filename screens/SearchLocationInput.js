import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const SearchLocationInput = ({
  textInputText = '',
  selectedItemRes,
  ACCESS_TOKEN,
}) => {
  const [resultList, setresultList] = useState([]);
  const [inputText, setinputText] = useState(textInputText);

  // useEffect(() => {
  //   if (!firstRender) {
  //     reverseGeocodingData();
  //   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPinCoordinate]);

  // const reverseGeocodingData = async (bool = true) => {
  //   // bool true = poi, bool false = region
  //   let searchParams = new URLSearchParams({
  //     access_token: ACCESS_TOKEN,
  //     language: 'en',
  //     country: 'SA',
  //     limit: 1,
  //     // type: 'poi',
  //   });
  //   let response = await fetch(
  //     bool
  //       ? `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentPinCoordinate[0]},${currentPinCoordinate[1]}.json?` +
  //           searchParams
  //       : `https://api.mapbox.com/search/v1/reverse/${currentPinCoordinate[0]},${currentPinCoordinate[1]}?` +
  //           searchParams,
  //   );
  //   let result = await response.json();
  //   let resData = bool
  //     ? result?.features[0]?.text
  //     : result?.features[0]?.properties?.feature_name;
  //   console.log('reverseGeocodingData', resData);
  //   setinputText(resData);
  // };

  const searchItems = async (text) => {
    try {
      setinputText(text);
      if (text.length > 2) {
        let response = await fetch(
          `https://api.mapbox.com/search/v1/suggest/${text}?` +
            new URLSearchParams({
              access_token: ACCESS_TOKEN,
              session_token: '',
              language: 'en',
              country: '',
              // types:
              //   'country, region, prefecture, postcode, district, place, city, locality, oaza, neighborhood, chome, block, street,  address',
            }),
        );
        let result = await response.json();
        setresultList(
          result?.suggestions.length > 0 ? result?.suggestions : [],
        );
      } else {
        setresultList([]);
      }
    } catch ({message}) {
      setinputText('');
      setresultList([]);
      console.log('searchItemsSiteERROR', message);
    }
  };

  const onPressListItem = async (item) => {
    try {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item?.action?.body),
      };
      let response = await fetch(
        'https://api.mapbox.com/search/v1/retrieve?' +
          new URLSearchParams({
            access_token: ACCESS_TOKEN,
            session_token: '',
          }),
        options,
      );
      let result = await response.json();
      selectedItemRes(result?.features[0]);
      setinputText(result?.features[0]?.properties?.feature_name);
      setresultList([]);
    } catch ({message}) {
      console.log('onPressListItemERROR', message);
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  return (
    <View
      style={{
        // flex: 1,
        width: '98%',
        // position: 'absolute',
        // top:1,
        // zIndex: 1,
        backgroundColor: 'white',
      }}>
      <TextInput
        style={{height: 45 , fontSize: 18}}
        placeholder="   Where From?"
        onChangeText={searchItems}
        value={inputText}
      />
      {inputText && (
        <FlatList
          data={resultList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPressListItem(item)}>
              <Text style={{padding: 10}}>{item?.feature_name} </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index + ''}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  );
};

export default SearchLocationInput;

const styles = StyleSheet.create({
});