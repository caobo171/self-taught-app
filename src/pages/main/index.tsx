/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';

//@ts-ignore
import styled from 'styled-components/native'
import { TaskType } from 'src/types';
import TaskItem from './TaskItem';
import {TaskContext} from '../../../App'
import NoTask from '../../components/NoTask';


const HEIGHT = Dimensions.get('window').height


const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 100%;

`
const StyledToday = styled(View)`
  margin-top: 60px;
`

const StyledTodayText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 26px;
  text-align: center;
`

const StyledDayText =styled.Text`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 18px;
  text-align:  center;
`

const StyledLinearGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledScrollView = styled(ScrollView)`
  height: ${HEIGHT* 0.6};
  margin-top: 20px;
`

const formatDate = () => {
  const current = new Date()

  const date = current.getDate().toString();
  let day = (current.getDay() + 1).toString();
  if (day === '8') { day = 'CN' }
  const month = current.getMonth().toString();

  return 'T' + day + ' ' + date.padStart(2, '0') + '.' + month.padStart(2, '0')
}


interface Props{
  setTasks: any,
  comeToSettings:()=>void
}

const Main = (props: Props) => {

  const {tasks } = useContext(TaskContext)

  const filteredTask = tasks.filter(e=> e.duration > e.complete)


  return (
    <>
      <StyledSafeAreaView>
        <StyledLinearGradient colors={['#24e0be', '#45b570', '#52a156', '#5fde66']}
        >


          <StyledToday>
            <StyledTodayText>
              {' TODAY'}
            </StyledTodayText>

            <StyledDayText>
              {formatDate()}
            </StyledDayText>
          </StyledToday>

          <StyledScrollView>
            {
              filteredTask.filter(e=> e.duration > e.complete).map((task: TaskType) => {
                return <TaskItem task={task} key={task.id} setTasks= {props.setTasks}/>
              })
            }
          </StyledScrollView>

          {
            filteredTask.length <= 0 && (
              <NoTask
                comeToSettings={props.comeToSettings}
              />
            )
          }

        </StyledLinearGradient>

      </StyledSafeAreaView>
    </>
  );
};



export default Main;
