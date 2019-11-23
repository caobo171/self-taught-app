import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { ImagePickerResponse } from '../../types'

//@ts-ignore
import styled from 'styled-components/native'

import FastImage from 'react-native-fast-image'

const { width } = Dimensions.get('window')


interface Props {
    image: ImagePickerResponse,
    onSelect: (image: ImagePickerResponse) => void;
    selected: boolean,
    order: null | number,
    buttonColor?: string,
    textColor? : string
}

const StyleNumberIndicator = styled<{buttonColor: string}>(View)`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: ${(props:any) => props.buttonColor};
  align-items: center;
  justify-content: center;
  opacity: 1;
 
`
const StyledView = styled(TouchableOpacity)`
  width: 100%;
  position: relative;


`
const StyledImage = styled(FastImage)`
  width: ${width / 3};
  height: ${width / 3};
`
const StyledOverlay = styled(View)`
  position: absolute;
  left: 0 ;
  top: 0 ;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.4);
  align-items: center;
  justify-content: center;
`

const StyledText = styled<{textColor: string}>(Text)`
  color: ${(props:any) => props.textColor};
`

const ImageItem = React.memo((props: Props) => {



    return (
        <StyledView onPress={() => props.onSelect(props.image)}>
            <StyledImage source={{ uri: props.image.uri }} />
            {
                props.selected && <StyledOverlay>
                    <StyleNumberIndicator buttonColor={ props.buttonColor? props.buttonColor : '#1f96ff'}>

                        <StyledText textColor = {props.textColor ? props.textColor : "#ffffff"}>
                          {props.order}</StyledText>
                    </StyleNumberIndicator>
                </StyledOverlay>
            }
        </StyledView>

    )
})

export default ImageItem