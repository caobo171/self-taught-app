import React, { useContext, useState, useCallback } from 'react'
import { TaskType } from 'src/types'

//@ts-ignore
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import ProgressBar from '../../components/ProgressBar'
import ImageGroup from './ImageGroup'
import { TaskContext } from '../../../App'
import storage from '../../services/storage'
import CompleteModal from '../../components/CompleteModal'
import BadModal from '../../components/BadModal'


const StyledProgressWrapper = styled(View)`
  width: 80%;
  justify-content: center;
  align-items: center;

  margin-right: auto;
  margin-left: auto;

  margin-bottom: 24px;

`

const StyledTaskName = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 4px;
`

const ImageGroupWrapper = styled.View`
  flex-direction : row;
  justify-content: space-between;
  width: 86%;
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
  margin-top: 6px;
  width: 90%;
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

  const [isCompleteVisible, setIsCompleteVisble] = useState(false)

  const [ isBadVisible , setIsBadVisible ] = useState(false)

  const [updatedTasks, setUpdatedTask ] = useState<TaskType[]>([])

  const { tasks } = useContext(TaskContext)

  const badClickHandle = async () => {

    const canUpdate  = await storage.canUpdateStatus(props.task)
    if(!canUpdate){
      Alert.alert('Oop !! ', `You 've reviewed today !!`);
      return 
    }
    let savedTasks = [...tasks]

    const findIndex = savedTasks.findIndex(e => e.id === props.task.id)

    savedTasks[findIndex].complete = Math.max(savedTasks[findIndex].complete - 1, 0)

    
    await storage.saveAllTask(savedTasks);

    setUpdatedTask(savedTasks)
    setIsBadVisible(true)
  }

  const okClickHandle = async () => {
    const canUpdate  = await storage.canUpdateStatus(props.task)
    if(!canUpdate){
      Alert.alert('Oop !! ', `You 've reviewed today !!`);
      return 
    }
    let savedTasks = [...tasks]


    const findIndex = savedTasks.findIndex(e => e.id === props.task.id)

    const  updatedValue = Math.min(savedTasks[findIndex].complete + 1, savedTasks[findIndex].duration)
    savedTasks[findIndex].complete = updatedValue
    
    await storage.saveAllTask(savedTasks)

    if(savedTasks[findIndex].complete === savedTasks[findIndex].duration) {
      setUpdatedTask(savedTasks)
      setIsCompleteVisble(true)
    }else{
      props.setTasks(savedTasks)
    }
    
  }

  const setIsVisbleHandle = useCallback(()=>{

    setIsCompleteVisble(false)
    props.setTasks(updatedTasks)

  }, [isCompleteVisible])


  const setIsBadVisibleHandle = useCallback(()=>{
    setIsBadVisible(false)
  }, [isBadVisible])
  return (
    <StyledProgressWrapper>
      <ImageGroupWrapper>
        <StyledTaskName>{props.task.name}</StyledTaskName>
        <ImageGroup images={props.task.award} />
      </ImageGroupWrapper>
      <ProgressBar height={20} width={90} percent={props.task.complete / props.task.duration * 100} />

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


      <CompleteModal
        isVisible={isCompleteVisible}
        setIsVisible = {setIsVisbleHandle}
        task = {props.task}
      />

      <BadModal
        isVisible = {isBadVisible}
        setIsVisible = {setIsBadVisibleHandle}
        task = {props.task}
      />


    </StyledProgressWrapper>
  )
}

export default TaskItem