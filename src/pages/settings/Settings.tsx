import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

//@ts-ignore
import styled from 'styled-components/native'
import CreatePlan from './CreatePlan';
import PhotoPickerModal from './PhotoPickerModal';
import { ImagePickerResponse } from '../../types'

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 100%;

`

const StyledLinearGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`
const Settings = () => {

    const [isVisible , setIsVisible ] = useState(false)
    return <StyledSafeAreaView>
        <StyledLinearGradient colors={['#24e0be', '#45b570', '#52a156', '#5fde66']}
        >   

        <CreatePlan/>
            

        <PhotoPickerModal
          endingPickImageHandle= {(results: ImagePickerResponse[] )=>{

            setIsVisible(false)
          }}

          isVisible= {isVisible}
          onCancelHandle = {()=>{

            setIsVisible(false)
          }}

        />
        </StyledLinearGradient>

    </StyledSafeAreaView>
}


export default Settings; 