import MapboxGL, {Camera, PointAnnotation, MarkerView} from '@rnmapbox/maps';
import {ACCESS_TOKEN} from '@env'
import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

MapboxGL.setAccessToken(ACCESS_TOKEN)


const Map  = ({ navigation})=> {
   
   let camera = useRef(null)
   const origin = useSelector(selectOrigin)



  const defaultCamera = {
    centerCoordinate: origin,
    zoomLevel: 10,
    animationDuration: 2000,
    animationMode: 'flyTo',
  };
  

 

  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={styles.tempGoback}
        onPress={() => navigation.goBack()}
        />
      <View style={styles.container}>
      
      <MapboxGL.MapView
        style={styles.map}
        // mapType="mutedStandard"
        styleURL={MapboxGL.StyleURL.Street}
        localizeLabels={true}
        attributionEnabled={false}
        logoEnabled={false}>
        <Camera ref={camera} defaultSettings={defaultCamera} />
        <PointAnnotation
          key={1}
          id={'1'}
          coordinate={origin}
          draggable
          onDragEnd={[77.0550 , 28.6196]}
          >
        </PointAnnotation>
      </MapboxGL.MapView>
    </View>
    </View>
  );
};

export default Map

const styles = StyleSheet.create({
  page: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  container: {
    height: '100%',

    width: '100%',
  },

  map: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});