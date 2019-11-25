import React from 'react'
import { TaskType } from 'src/types'

//@ts-ignore
import styled from 'styled-components/native'
import { View } from 'react-native'
import ProgressBar from '../../components/ProgressBar'

const StyledProgressWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`

interface Props {
    task: TaskType
}


const TaskItem = (props: Props)=>{
    return (
        <StyledProgressWrapper>
        < ProgressBar height={20} width={80} percent={props.task.complete} />
      </StyledProgressWrapper>
    )
}

export default TaskItem