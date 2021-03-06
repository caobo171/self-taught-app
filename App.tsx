/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Dimensions, PanResponder, Animated, Text, Easing,
} from 'react-native';

import Settings from './src/pages/settings/Settings'
import Main from './src/pages/main'
import { TaskType } from './src/types';
import storage from './src/services/storage'
import useEffectOnce from 'react-use/lib/useEffectOnce';
import SplashScreen from 'react-native-splash-screen'
import LocalNotification from './notification'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


let position = new Animated.Value(-WIDTH);
const ANIMATION_DURATION = 200
const ANIMATION_THRESHOLD = 120


export const TaskContext = React.createContext<{tasks:TaskType[]}>({
  tasks: []
})

const App = () => {

  const [tab, setTab] = useState<'base' | 'settings'>('base')

  const [tasks, setTasks] = useState<TaskType[]>([])


  useEffectOnce(()=>{
    SplashScreen.hide();
    (async () => {
      const resTasks = await storage.getListTask()
      setTasks(resTasks)
    })()
  })



  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, getstureState) => true,
    onPanResponderMove: (evt, gestureState) => {


      if (gestureState.dx > 0 && tab === 'base') {
        position.setValue(gestureState.dx)
      }

      else if (gestureState.dx < 0 && tab === 'settings') {
        position.setValue(WIDTH + gestureState.dx)
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      if ((gestureState.dx > ANIMATION_THRESHOLD || gestureState.vx > 1) && tab === 'base') {
          cometoSettingsScreen()
      } else if ((-gestureState.dx > ANIMATION_THRESHOLD || -gestureState.vx > 1) && tab === 'settings') {
       
          comebackBaseScreen()
      } else {
        console.log('check 2')
        if (tab === 'base') {
          console.log('check 3')
          
          comebackBaseScreen()
        } else {
          cometoSettingsScreen()
        }
      }

    }
  })


  const basePosition = position.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [WIDTH, 0]
  })

  const comebackBaseScreen = ()=>{
    Animated.timing(position,{
      toValue: 0
      ,duration: ANIMATION_DURATION
    }).start(()=>{
      setTab('base')
    })
  }

  const cometoSettingsScreen = ()=>{
    Animated.timing(position,{
      toValue: WIDTH
      ,duration: ANIMATION_DURATION
    }).start(()=>{
      setTab('settings')
    })
  }


  return (

    <TaskContext.Provider value = {{tasks}}>
      <Animated.View style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}  {...panResponder.panHandlers}>
        <Main setTasks = {(tasks: TaskType[])=>{
          setTasks(tasks)
        }}

        comeToSettings={cometoSettingsScreen}
        />
        <Animated.View style={{
          position: 'absolute',
          height: HEIGHT,
          width: WIDTH,
          right: basePosition,
        }}>

          <Settings setTasks={setTasks} comebackBaseScreen = {comebackBaseScreen}/>

        </Animated.View>
      </Animated.View>
    </TaskContext.Provider>


  )


};


export default App;
