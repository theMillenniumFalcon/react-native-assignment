import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { StatusBarHeight } from '../../shared/variables'
import { Colors } from '../../shared/variables'

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: #fff;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    color: ${Colors.primary};
    padding: 10px;
    font-weight: 700;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 60px;

    ${(props) => props.forgotPassword == true && `
        background-color: ${Colors.secondary};
    `}
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16px;

    ${(props) => props.forgotPassword == true && `
        color: ${Colors.primary};
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const GridContainer = styled.ScrollView`
    border-width: 1px;
    border-color: ${Colors.primary};
`;

export const StyledRow = styled.View`
    flex-direction: row;
`;