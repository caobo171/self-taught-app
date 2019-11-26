import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';

//@ts-ignore
import styled from 'styled-components/native'

const ProgressWrapper = styled(View)`
    height: 30px;
    border-width: 4px;
    border-radius: 15px;

    border-color: rgba(255,255,255,0.3);
    overflow: hidden;
`

const ProgressGradient= styled(LinearGradient)`
    height: 30px;

`



interface Props {
    percent: number,
    width: number,
    height: number
}

const ProgressBar = (props: Props) => {
    return <ProgressWrapper style={{
        width: `${props.width}%`
    }}>

        <ProgressGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        colors={['#ff6f3b', '#ffc43b', '#69ff3b', '#3b90ff', '#ff3bef']}
        
            style={{
                width: `${props.percent}%`
            }}
        ></ProgressGradient>
    </ProgressWrapper>
}


export default ProgressBar