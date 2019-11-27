import React from 'react'

//@ts-ignore
import styled from 'styled-components/native'

import { TouchableOpacity, Text, Alert, View } from 'react-native';


const StyledAddButton = styled(TouchableOpacity)`
  border-width: 10px;
  border-radius: 120px;
  border-color: rgba(255,255,255,0.3) ; 
  align-items: center;
  justify-content: center;
  height: 240px; 
  width: 240px;

  margin-bottom:200px;

`

const StyledAddText = styled(Text)`
  text-align: center;
  color: rgba(255,255,255,0.7);
  font-weight: 900;
  font-size: 24px;
`
interface Props {
    comeToSettings: () => void
}

const NoTask = React.memo((props: Props) => {
    return (
        <StyledAddButton
            onPress={props.comeToSettings}
        >
            <StyledAddText>
                {`Create Your Own Plan`}
            </StyledAddText>
        </StyledAddButton>
    )
})

export default NoTask