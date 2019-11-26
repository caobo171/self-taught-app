import React from 'react'
import { TaskType } from 'src/types'

//@ts-ignore
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native'
import ProgressBar from '../../components/ProgressBar'
import ImageGroup from './ImageGroup'

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
  width: 80%;
  align-items: center;
`

const ActionGroup = styled.View`
  flex-direction: row;
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



interface Props {
  task: TaskType
}


const TaskItem = (props: Props) => {

  const badClickHandle = ()=>{

  }

  const okClickHandle =()=>{
    
  }


  return (
    <StyledProgressWrapper>
      <ImageGroupWrapper>
        <StyledTaskName>{props.task.name}</StyledTaskName>
        <ImageGroup images={props.task.punish} />
        <ImageGroup images={props.task.award} />
      </ImageGroupWrapper>
      <ProgressBar height={20} width={80} percent={props.task.complete} />

      <StyledGroupButton>
        <StyledDeleteButton onPress={badClickHandle}>
          <StyledBadText>Bad</StyledBadText>
        </StyledDeleteButton>

        <StyledAddButton onPress={okClickHandle}>
          <StyledOKText>OK</StyledOKText>
        </StyledAddButton>
      </StyledGroupButton>


    </StyledProgressWrapper>
  )
}

export default TaskItem