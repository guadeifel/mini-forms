import React from "react";
import { 
    TouchableOpacity,
    TouchableOpacityProps,
    Text, 
    StyleSheet 
} from "react-native";

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

//type ButtonProps = TouchableOpacityProps

export function Button({ title, ...rest }: ButtonProps){
    return(
        <TouchableOpacity 
        style={styles.button} //atributos de touchbableopacity
        activeOpacity={0.7}
        {...rest}
        >
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#ff0000',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 10
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
      },
})