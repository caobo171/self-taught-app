import React, { useContext, useState } from 'react'
import { TaskType } from 'src/types'

//@ts-ignore
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native'
import ProgressBar from '../../components/ProgressBar'
import ImageGroup from './ImageGroup'
import { TaskContext } from '../../../App'
import storage from '../../services/storage'

import Modal from 'react-native-modal'

const StyledProgressWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const StyledTaskName = styled.Text`
    width: 65%;
    font-size: 16px;
    text-transform: uppercase;
    color: #525252;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 4px;
`

const ImageGroupWrapper = styled.View`
  flex-direction : row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const StyledAddButton = styled(TouchableOpacity)`
  border-width: 6px;
  border-radius: 24px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 48px; 
  width: 48px;
`

const StyledOKText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: 900;
  font-size: 14px;
`

const StyledBadText = styled(Text)`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 12px;
`

const StyledDeleteButton = styled(TouchableOpacity)`
  border-width: 4px;
  border-radius: 20px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 40px; 
  width: 40px;
`

const StyledGroupButton = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 60%;

`

const StyledProgressText = styled.Text`
  color: rgba(255,255,255,0.7);
  font-weight: bold;
  font-size: 12px;
`



interface Props {
  task: TaskType,
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}


const TaskItem = (props: Props) => {

  const [isVisible, setIsVisble] = useState(false)

  const { tasks } = useContext(TaskContext)

  console.log('check tasks', tasks)
  const badClickHandle = async () => {
    let savedTasks = [...tasks]

    const findIndex = savedTasks.findIndex(e => e.id === props.task.id)

    savedTasks[findIndex].complete = Math.max(savedTasks[findIndex].complete - 1, 0)

    props.setTasks(savedTasks)
    await storage.saveAllTask(savedTasks);
  }

  const okClickHandle = async () => {
    let savedTasks = [...tasks]


    const findIndex = savedTasks.findIndex(e => e.id === props.task.id)

    savedTasks[findIndex].complete = Math.min(savedTasks[findIndex].complete + 1, savedTasks[findIndex].duration)
    props.setTasks(savedTasks)
    await storage.saveAllTask(savedTasks)

    setIsVisble(true)
  }


  return (
    <StyledProgressWrapper>
      <ImageGroupWrapper>
        <StyledTaskName>{props.task.name}</StyledTaskName>
        <ImageGroup images={props.task.award} />
      </ImageGroupWrapper>
      <ProgressBar height={20} width={80} percent={props.task.complete / props.task.duration * 100} />

      <StyledGroupButton>
        <StyledDeleteButton onPress={badClickHandle}>
          <StyledBadText>Bad</StyledBadText>
        </StyledDeleteButton>
        <StyledProgressText>
          {props.task.complete} {'/'} {props.task.duration}
        </StyledProgressText>
        <StyledAddButton onPress={okClickHandle}>
          <StyledOKText>OK</StyledOKText>
        </StyledAddButton>
      </StyledGroupButton>


      <Modal
        isVisible={isVisible}
        onSwipeComplete={()=> setIsVisble(!isVisible)}
        swipeDirection="left"
      >
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>


    </StyledProgressWrapper>
  )
}

export default TaskItem