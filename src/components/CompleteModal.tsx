import React from 'react'
//@ts-ignore
import styled from 'styled-components'

import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { TaskType } from 'src/types';
import ImageGroup from '../pages/main/ImageGroup';



const StyledModal = styled(Modal)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

`

const StyledView = styled(View)`
    height: 160px;
    width: 80%;
    background-color: #fff;
    border-radius: 12px;

    align-items: center;
`
const StyledCongratulationText = styled(Text)`
    color: #ffaa33;
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 6px;
`
const StyledDescriptionText = styled(Text)`
    width: 80%;
    margin-top: 12px;
    text-align: center;
    font-weight: 900;
    color: #8a8a8a;
`
const StyledBoldText = styled(Text)`
    font-weight: bold;
    text-transform: uppercase;
`

interface Props {
    isVisible: boolean,
    setIsVisible: () => void,
    task: TaskType
}
const CompleteModal = (props: Props) => {

    return (
        <StyledModal
            isVisible={props.isVisible}
            onSwipeComplete={props.setIsVisible}
            swipeDirection="left"
        >
            <StyledView>
                <StyledCongratulationText>{'Congratulation !! '}</StyledCongratulationText>

                <ImageGroup images={props.task.award} />

                <StyledDescriptionText>{`You've done your `}
                    <StyledBoldText>{props.task.name}</StyledBoldText>
                    {` plan !! Let enjoy these `}
                    <StyledBoldText>
                        {` Awards `}
                    </StyledBoldText>
                </StyledDescriptionText>
            </StyledView>
        </StyledModal>
    )

}


export default CompleteModal