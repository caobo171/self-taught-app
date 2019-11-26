import React from 'react'

//@ts-ignore
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

const StyledWrapper = styled.View`
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

    images: string[]
}
const ImageGroup = (props: Props)=>{

    console.log('check images', props.images)
    return (
        <StyledWrapper>
            {
                props.images.map((imageUri: string)=>{
                    return <StyledImage source= {{uri: imageUri}}/>
                })
            }
        </StyledWrapper>
    )
}

export default ImageGroup