import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';
import wifi from 'react-native-android-wifi';
import SignalStrength from '../components/SignalStrength';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export default class RoomLocation extends Component {
    
    _isMounted = false;
    _interval = 0;

    state = {
        wifiStrength: null,
        interval: 2000,
        beep: new Sound('beep_one_tenth.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
        })
    }

    getMac = () => {
        let { room } = this.props.navigation.state.params;
        // let macTest = '06:d6:aa:fc:7a:db'; // Samsung
        let macTest = '54:2f:8a:37:e0:18';
        // let macTest = '02:15:b2:00:01:00'; //emulator
        wifi.reScanAndLoadWifiList((wifiStringList) => {
            let wifiArray = JSON.parse(wifiStringList);
            // let wifiData = wifiArray.filter(wifi => wifi.BSSID === room.macAddress.toLowerCase());
            let wifiData = wifiArray.filter(wifi => wifi.BSSID === macTest);
            // console.warn(wifiArray);
            if (wifiData.length > 0) {
                this.setState({ wifiStrength: wifiData[0].level });
            } else {
                this.setState({ wifiStrength: null });
            }},
            (error) => {
              console.log(error);
            }
        );
    }

    playBeepInterval = () => {
        const { wifiStrength } = this.state;
        clearInterval(this._interval);
        if(wifiStrength >= -40 && wifiStrength != null) {
            this._interval = setInterval(() => {
                if(this._isMounted)
                    this.state.beep.play();
            }, 400);
        } else if(wifiStrength < -40 && wifiStrength >= -60) {
            this._interval = setInterval(() => {
                if(this._isMounted)
                    this.state.beep.play();
            }, 700);
        } else if(wifiStrength < -60 && wifiStrength >= -80) {
            this._interval = setInterval(() => {
                if(this._isMounted)
                    this.state.beep.play();
            }, 1000);
        } else if(wifiStrength < -80 && wifiStrength >= -90) {
            this._interval = setInterval(() => {
                if(this._isMounted)
                    this.state.beep.play();
            }, 1500);
        } else {
            this._interval = setInterval(() => {
                if(this._isMounted)
                    this.state.beep.play();
            }, 3000);
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        setInterval(() => {
                if(this._isMounted) {
                    this.getMac();
                }
            }, 1000);
            
        this.playBeepInterval();
    }

    componentDidUpdate = () => {
        this.playBeepInterval();
    }

    componentWillUnmount = () => {
        this._isMounted = false;
        clearInterval(this._interval);
    }

    render() {
        let { room } = this.props.navigation.state.params;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.roomNameText}>
                    {room.roomName}
                </Text>
                { this.state.wifiStrength && 
                    <Text>Intensidade: {this.state.wifiStrength}</Text> }
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