import React, { useState } from 'react'

//@ts-ignore
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Alert } from 'react-native'
import { ImagePickerResponse } from 'src/types'
import PhotoPickerModal from '../settings/PhotoPickerModal'

const StyledWrapper = styled.TouchableOpacity`
    flex-direction: row;
`

const StyledImage = styled(FastImage)`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border-width: 1px;
    border-color:#ff4a4a;
`

interface Props {

    images: string[],
    handleChangeImages? : (results: ImagePickerResponse[]) => void
}
const ImageGroup = (props: Props)=>{

    const [isVisible , setIsVisible ]= useState(false)

    const onPressHandle = ()=>{
        props.handleChangeImages && Alert.alert('','Do you want to change these items ?',[
            {
                text:'Cancel',
                onPress : ()=> {}
            },
            {
                text: 'OK',
                onPress: ()=>{
                    setIsVisible(true)
                }
            }
        ])
    }
    return (
        <StyledWrapper onPress = {onPressHandle}>
            {
                props.images.map((imageUri: string)=>{
                    return <StyledImage key={imageUri} source= {{uri: imageUri}}/>
                })
            }

            <PhotoPickerModal
                endingPickImageHandle = {(results: ImagePickerResponse[])=>{
                    setIsVisible(false)
                    props.handleChangeImages && props.handleChangeImages(results)

                }}
                isVisible={isVisible }
                onCancelHandle= {()=> setIsVisible(false)}
                
            />
        </StyledWrapper>
    )
}

export default ImageGroup