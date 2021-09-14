import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

interface IFormsCardProps extends TouchableOpacityProps {
  form: string[] 
}


export function FormsCard({form, ...rest}: IFormsCardProps){
    return(
        <TouchableOpacity 
          style={styles.buttonForms}
          {...rest}
        >
            <Text style={styles.textForms}>
              {form}
            </Text>
        </TouchableOpacity>
    )}

const styles = StyleSheet.create({
    textForms:{
        color:'#fff',
        fontSize:22,
        fontWeight:'bold'
      },
      buttonForms:{
        backgroundColor:'#1f1e25',
        padding:15,
        borderRadius:15,
        alignItems:'center',
        marginBottom:15
      },
})