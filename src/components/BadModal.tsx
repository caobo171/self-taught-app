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
    width: 85%;
    background-color: #fff;
    border-radius: 12px;

    align-items: center;
`
const StyledBadText = styled(Text)`
    color: #e04343;
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
const BadModal = (props: Props) => {

    return (
        <StyledModal
            isVisible={props.isVisible}
            onSwipeComplete={props.setIsVisible}
            swipeDirection="left"
        >
            <StyledView>
                <StyledBadText>{'Ohh , Bad !! '}</StyledBadText>

                <ImageGroup images={props.task.award} />

                <StyledDescriptionText>
                    {`Don't worry !! Stay strong ~!!  let's do these `}
                    <StyledBoldText>{` punishment `}</StyledBoldText>
                    {` together `}
                </StyledDescriptionText>
            </StyledView>
        </StyledModal>
    )

}


export default BadModal