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
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsynStorage from '@react-native-community/async-storage'

import LinearGradient from 'react-native-linear-gradient';

//@ts-ignore
import styled from 'styled-components/native'

import ProgressBar from '../../components/ProgressBar'
import { TaskType } from 'src/types';
import TaskItem from './TaskItem';


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
  let  day = (current.getDay() + 1).toString();
  if(day === '8') { day = 'CN'}
  const month = current.getMonth().toString();

  return 'T' + day + ' ' + date.padStart(2, '0') + '.' + month.padStart(2, '0')
}

interface Props{
  tasks: TaskType[]
}

const Main = (props: Props) => {

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

          {
            props.tasks.map((task: TaskType)=>{
              <TaskItem task={task}/>
            })
          }
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



export default Main;
