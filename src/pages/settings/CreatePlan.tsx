import React, { useState } from 'react'

//@ts-ignore
import styled from 'styled-components/native'
import PhotoPickerModal from './PhotoPickerModal';
import { ImagePickerResponse } from '../../types'
import { TouchableOpacity } from 'react-native';

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
const CreatePlan = () => {

    const [isVisible , setIsVisible ] = useState(false)
    return (
        <StyledWrapper>
            <StyledTitle>
                Create Your Plan !
            </StyledTitle>
            <StyledFormGroup>
                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Name ..."></StyledInput>
                </StyledFormControl>

                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Description ..."></StyledInput>
                </StyledFormControl>

                <StyledFormControl>
                    <StyledInput placeholder="Your Plan Duration ..."></StyledInput>
                </StyledFormControl>



                <StyleImagePickButton onPress={()=>{
                    setIsVisible(true)
                }}>
                    <StyledText >
                        Pick Image
                    </StyledText>
                </StyleImagePickButton>

                <PhotoPickerModal
                    endingPickImageHandle={(results: ImagePickerResponse[]) => {

                        setIsVisible(false)
                    }}

                    isVisible={isVisible}
                    onCancelHandle={() => {

                        setIsVisible(false)
                    }}

                />
            </StyledFormGroup>

        </StyledWrapper>
    )
}

export default CreatePlan