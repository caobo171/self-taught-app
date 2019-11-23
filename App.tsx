/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react';
import {
  View, Dimensions, PanResponder, Animated, Text,
} from 'react-native';

import Settings from './src/pages/settings/Settings'
import Main from './src/pages/main'


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


let position = new Animated.Value(-WIDTH);
const ANIMATION_DURATION = 200
const ANIMATION_THRESHOLD = 120

const App = () => {

  const [tab, setTab] = useState<'base'|'settings'>('base')

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, getstureState) => true,
    onPanResponderMove: (evt, gestureState) => {

       
      if(gestureState.dx > 0 && tab === 'base' ){
        position.setValue(gestureState.dx)
      }

      else if (gestureState.dx < 0 && tab === 'settings'){
        position.setValue(WIDTH + gestureState.dx)
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      if ( (gestureState.dx > ANIMATION_THRESHOLD || gestureState.vx > 1 ) && tab === 'base' ) {
        Animated.timing(position, {
          toValue: WIDTH
          , duration: ANIMATION_DURATION
        }).start(()=>{
          setTab('settings')
        })
      } else if ( (-gestureState.dx > ANIMATION_THRESHOLD || -gestureState.vx > 1 ) && tab === 'settings') {
        Animated.timing(position, {
          toValue: 0
          , duration: ANIMATION_DURATION
        }).start(()=>{
          setTab('base')
        })
      } 
    }
  })


  const basePosition = position.interpolate({
    inputRange: [0, WIDTH],
    outputRange : [WIDTH, 0]
  })


  return (
    <Animated.View style={{
      height: '100%',
      width: '100%',
      position: 'relative',
    }}  {...panResponder.panHandlers}>
      <Main/>
      <Animated.View style={{
        position: 'absolute',
        height: HEIGHT,
        width: WIDTH,
        right: basePosition,
      }}>

        <Settings/>

      </Animated.View>
    </Animated.View >

  )


};


export default App;
