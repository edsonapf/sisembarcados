import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';
import wifi from 'react-native-android-wifi';
import SignalStrength from '../components/SignalStrength';

export default class RoomLocation extends Component {
    
    _isMounted = false;

    state = {
        wifiStrength: null,
    }

    getMac = () => {
        let { room } = this.props.navigation.state.params;
        // let macTest = '54:2f:8a:37:e0:18';
        // let macTest = '02:15:b2:00:01:00'; //emulator
        wifi.loadWifiList((wifiStringList) => {
            let wifiArray = JSON.parse(wifiStringList);
            let wifiData = wifiArray.filter(wifi => wifi.BSSID === room.macAddress.toLowerCase());
            // let wifiData = wifiArray.filter(wifi => wifi.BSSID === macTest);
            if (wifiData.length > 0) {
                this.setState({ wifiStrength: wifiData[0].level });
            } else {
                this.setState({ wifiStrength: null });
            }},
            (error) => {
              console.warn(error);
            }
        );
    }

    componentDidMount = () => {
        this._isMounted = true;
        setInterval(() => {
                if(this._isMounted) 
                    this.getMac();
            }, 500);
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        let { room } = this.props.navigation.state.params;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.roomNameText}>
                    {room.name}
                </Text>
                {/* { this.state.wifiStrength && 
                    <Text>Intensidade: {this.state.wifiStrength}</Text> } */}
                <SignalStrength
                    strength={this.state.wifiStrength}
                />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#20C5FE',
    },
    roomNameText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#F3F3F3',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
    }
});