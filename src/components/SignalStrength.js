import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import excellentSignalImg from '../../assets/img/excellent.png';
import goodSignalImg from '../../assets/img/good.png';
import fairSignalImg from '../../assets/img/fair.png';
import weakSignalImg from '../../assets/img/weak.png';
import terribleSignalImg from '../../assets/img/terrible.png';

const getSignalImg = (strength) => {
    let imgTxt = {
        img: terribleSignalImg,
        txt: 'Você está muito distante do local.'
    };
    if(strength >= -40 && strength != null) {
        imgTxt.img = excellentSignalImg;
        imgTxt.txt = 'Você está muito próximo do local.';
    } else if(strength < -40 && strength >= -60) {
        imgTxt.img = goodSignalImg;
        imgTxt.txt = 'Você está próximo do local.';
    } else if(strength < -60 && strength >= -80) {
        imgTxt.img = fairSignalImg;
        imgTxt.txt = 'Você está em uma distância razoável do local.';
    } else if(strength < -80 && strength >= -90) {
        imgTxt.img = weakSignalImg;
        imgTxt.txt = 'Você está distante do local.'
    }

    return imgTxt;
}

const signalStrength = (props) => {
    const { strength } = props;

    let signalImgTxt  = getSignalImg(strength);

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={signalImgTxt.img}
            />
            <Text style={styles.text}>{signalImgTxt.txt}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
    },
    image: {
        width: 350, 
        height: 250,
        resizeMode: 'stretch',
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
    }
});

export default signalStrength;