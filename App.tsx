/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components/native'

import ProgressBar from './src/components/ProgressBar'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const StyledAddButton = styled(TouchableOpacity)`
  border-width: 10px;
  border-radius: 60px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 120px; 
  width: 120px;

  margin-left: 40px;
`

const StyledOKText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: 900;
  font-size: 28px;
`

const StyledBadText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 20px;
`

const StyledDeleteButton = styled(TouchableOpacity)`
  border-width: 10px;
  border-radius: 40px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 80px; 
  width: 80px;
`

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 100%;

`

const StyledGroupButton = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`

const StyledToday = styled(View)`
  margin-top: 80px;
`

const StyledTodayText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 14px;
`

const StyledLinearGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledProgressWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const formatDate = () => {
  const current = new Date()

  const date = current.getDate().toString();
  const day = current.getDay().toString();
  const month = current.getMonth().toString();

  return 'T' + day + ' ' + date.padStart(2, '0') + '.' + month.padStart(2, '0')
}

const App = () => {

  const [value , setValue] = useState(0)

  const [total , setTotal ] = useState(100)


  const badClickHandle = useCallback(()=>{
    setValue( Math.max( 0 , value -  1))
  } , [value])


  const okClickHandle = useCallback(()=>{
    setValue( Math.min(total, value + 1))
  } , [value])
  return (
    <>
      <StyledSafeAreaView>
        <StyledLinearGradient colors={['#24e0be', '#45b570', '#52a156', '#5fde66']}
        >

          <StyledToday>
            <StyledTodayText>
              {' TODAY'}
            </StyledTodayText>

            <StyledTodayText>
              {formatDate()}
            </StyledTodayText>
          </StyledToday>
          <StyledProgressWrapper>
            < ProgressBar height={20} width={80} percent={value} />
          </StyledProgressWrapper>

          <StyledGroupButton>
            <StyledDeleteButton onPress = {badClickHandle}>
              <StyledBadText>Bad</StyledBadText>
            </StyledDeleteButton>

            <StyledAddButton onPress={okClickHandle}>
              <StyledOKText>OK</StyledOKText>
            </StyledAddButton>
          </StyledGroupButton>

        </StyledLinearGradient>

      </StyledSafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
