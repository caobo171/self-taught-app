import React, { useState } from 'react'

//@ts-ignore
import styled from 'styled-components/native'
import PhotoPickerModal from './PhotoPickerModal';
import { ImagePickerResponse, TaskType } from '../../types'
import { TouchableOpacity, Text, Alert } from 'react-native';
import storage from '../../services/storage';
import uuid from 'uuid';
import ImageGroup from '../main/ImageGroup';

const StyledWrapper = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
`

const StyledFormControl = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`

const StyledFormGroup = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`


const StyledInput = styled.TextInput`
    width : 80%;
    border-width: 4px;
    border-color:rgba(255,255,255,0.3);
    padding-left: 16px;
    color: rgba(255,255,255,0.9);
    border-radius: 20px;
    height: 40px;
    margin-bottom: 10px;
`

const StyledTitle = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: rgba(255,255,255,0.8);
    margin-top: 30px;
`
TouchableOpacity
const StyleImagePickButton = styled.TouchableOpacity`
    width : 80%;
    border-width: 4px;
    border-color:rgba(255,255,255,0.3);
    padding-left: 16px;
    
    border-radius: 20px;
    height: 40px;
    margin-bottom: 10px;

    align-items: center;
    justify-content: center;
`

const StyledText = styled.Text`
    color: rgba(255,255,255,0.9);
`


const StyledAddButton = styled(TouchableOpacity)`
  border-width: 10px;
  border-radius: 60px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 120px; 
  width: 120px;

  margin-top: 40px;
`

const StyledAddText = styled(Text)`
  text-align: center;
  color: rgba(255,255,255,0.7);
  font-weight: 900;
  font-size: 24px;
`

interface Props {
    finishCreateTaskHandle: () => void
}


const CreatePlan = (props: Props) => {

    const [isVisible, setIsVisible] = useState(false)

    const [nameTask, setNameTask] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [awardUris, setAwardUris] = useState<string[]>([])
    const [punishUris, setPunishUris] = useState<string[]>([])

    const createTaskHandle = () => {
        const task: TaskType = {
            id: uuid(),
            name: nameTask,
            description: description,
            duration: Number(duration),
            complete: 0,
            award: awardUris,
            punish: punishUris,
        }

        storage.saveTask(task)
        Alert.alert('Task created successful !')

        props.finishCreateTaskHandle()
    }
    return (
        <StyledWrapper>
            <StyledTitle>
                Create Your Plan !
            </StyledTitle>
            <StyledFormGroup>
                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Name ..."
                        value={nameTask}
                        onChangeText={(value: string) => {
                            setNameTask(value)
                            console.log('check value', value)
                        }}
                    ></StyledInput>
                </StyledFormControl>

                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Description ..."
                        value={description}
                        onChangeText={(value: string) => setDescription(value)}
                    ></StyledInput>
                </StyledFormControl>

                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Duration ..."
                        value={duration}
                        onChangeText={(value: string) => setDuration(value)}
                    ></StyledInput>
                </StyledFormControl>

                {/*
                    Image picker 
                */}

                <ImageGroup images={awardUris} />
                <StyleImagePickButton onPress={() => {
                    setIsVisible(true)
                }}>
                    <StyledText >
                        Pick Awards Image
                    </StyledText>
                </StyleImagePickButton>

                <PhotoPickerModal
                    endingPickImageHandle={(results: ImagePickerResponse[]) => {
                        setAwardUris(results.map(e => e.uri))
                        setIsVisible(false)
                    }}

                    isVisible={isVisible}
                    onCancelHandle={() => {

                        setIsVisible(false)
                    }}

                />

                {/*
                    Image picker 
                */}

                <ImageGroup images={punishUris} />

                <StyleImagePickButton onPress={() => {
                    setIsVisible(true)
                }}>
                    <StyledText >
                        Pick Punish Image
                    </StyledText>
                </StyleImagePickButton>

                <PhotoPickerModal
                    endingPickImageHandle={(results: ImagePickerResponse[]) => {
                        setPunishUris(results.map(e => e.uri))
                        setIsVisible(false)
                    }}

                    isVisible={isVisible}
                    onCancelHandle={() => {

                        setIsVisible(false)
                    }}

                />


                <StyledAddButton onPress={createTaskHandle}>
                    <StyledAddText>Create Task</StyledAddText>
                </StyledAddButton>

            </StyledFormGroup>

        </StyledWrapper>
    )
}

export default CreatePlan