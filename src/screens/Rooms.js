import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Alert,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import { axiosInstance as axios } from '../helpers/request';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Rooms extends Component {
  
  state = {
    roomName: null,
    macAddress: null,
    roomList: null
  }

  changeRoomName = async () =>  {
    try {
      const res = await axios.get(`/${this.state.roomName}`);
      this.setState({ macAddress: res.data });
    }catch(e) {
      Alert.alert('Sala não encontrada');
      this.setState({ macAddress: null });
    }
  }

  getRoomList = async () => {
    try {
      const res = await axios.get('/');
      this.setState({ roomList: res.data });
    } catch(e) {
      Alert.alert('Não foi encontrada nenhuma sala');
      this.setState({ roomList: null });
    }
  }

  componentDidMount = () => {
    this.getRoomList();
  }

  askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Rede Wifi',
          'message': 'Nós precisamos da sua permissão para encontrar redes wifi próximas',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Obrigado pela sua permissão! :)");
      } else {
        console.log("Você não será capaz de visualizar a lista de wifis próximos");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillMount = () => {
    this.askPermission();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Me diz onde é</Text>
        <View style={styles.mainContainer}>

          <ScrollView>
              {this.state.roomList ?
                this.state.roomList.map((item, i) => (
                  <ListItem
                    leftIcon={<Icon name="door-closed" size={30} />}
                    containerStyle={styles.item}
                    key={i} 
                    title={item.name}
                    titleStyle={styles.itemText}
                    onPress={() => this.props.navigation.navigate('RoomLocation', 
                                            {room: item})}
                  />
                ))
                : 
                <ActivityIndicator size="large" color="#0000ff" />}
          </ScrollView>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20C5FE'
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F3F3F3',
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,    
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#F3F3F3',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  }
});
