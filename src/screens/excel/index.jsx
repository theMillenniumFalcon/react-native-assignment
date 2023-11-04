import React, { useState, useEffect } from "react"
import { TextInput } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from "expo-file-system"
import XLSX from "xlsx"
import * as Sharing from "expo-sharing"
import { StatusBar } from 'expo-status-bar'

import { ROWS, COLUMNS } from '../../constants'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    GridContainer,
    StyledRow,
    MsgBox,
    StyledButton,
    ButtonText
} from './styles'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'

const ExcelScreen = () => {
    const [gridData, setGridData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await AsyncStorage.getItem("gridData")
                if (data) {
                setGridData(JSON.parse(data))
                } else {
                const newData = Array.from({ length: ROWS }, () =>
                    Array(COLUMNS).fill("")
                )
                setGridData(newData)
                }
            } catch (error) {
                console.error(error)
            }
        }
        loadData()
    }, [])

    const handleInputChange = (text, rowIndex, colIndex) => {
        const newData = [...gridData]
        newData[rowIndex][colIndex] = text
        setGridData(newData)
        saveData(newData)
    }

    const saveData = async (data) => {
        try {
        await AsyncStorage.setItem("gridData", JSON.stringify(data))
        } catch (error) {
        console.error(error)
        }
    }

    const handleDownload = async () => {
        const ws = XLSX.utils.aoa_to_sheet(gridData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    
        const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" })
        const uri = FileSystem.cacheDirectory + "gridData.xlsx"
    
        try {
          await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64,
          })
    
          const downloadLink = await Sharing.shareAsync(uri, {
            mimeType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            dialogTitle: "Download File",
            UTI: "com.microsoft.excel.xlsx",
          })
    
          console.log("Download link:", downloadLink)
        } catch (error) {
          console.error("Error saving file:", error)
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <KeyboardAvoidingWrapper>
                <InnerContainer>
                    <PageTitle>Excel sheet</PageTitle>
                    <GridContainer>
                        {gridData.map((row, rowIndex) => (
                        <StyledRow>
                            {row.map((col, colIndex) => (
                            <TextInput
                                key={colIndex}
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    padding: 10,
                                }}
                                value={col}
                                onChangeText={(text) =>
                                handleInputChange(text, rowIndex, colIndex)
                                }
                            />
                            ))}
                        </StyledRow>
                        ))}
                    </GridContainer>
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleDownload}>
                        <ButtonText>Download Sheet</ButtonText>
                    </StyledButton>
                </InnerContainer>
            </KeyboardAvoidingWrapper>
        </StyledContainer>
    )
}

export default ExcelScreen