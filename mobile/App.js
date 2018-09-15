import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import Expo from 'expo';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      found: false,
      connected: false,
      deviceId: undefined,
      services: [],
      values: [],
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.manager = new BleManager();
    this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanForDevices();
      }
    });
  }

  connectToDevice = (d) => {
    if (this.device) {
      this.device.cancelConnection();
      this.device = null;
    }

    this.device = this.manager.connectToDevice(d.id).then((device) => {
      this.setState(state => ({ connected: true, deviceId: device.id }));
      this.device = device;

      return this.checkServices();
    });
  }

  scanForDevices = () => {
    this.manager.startDeviceScan(null, {}, (error, device) => {
      if (error) {
        return this.setState(state => ({ error }));
      }

      if (device.name === 'asclepius') {
        this.setState(state => ({ found: true }));
        this.connectToDevice(device);
      }
    });
  };

  checkServices = () => {
    if (!this.device) return;

    this.device.discoverAllServicesAndCharacteristics()
      .then(() => this.device.services())
      .then((services) => {
        // Find the custom service
        return services.filter(s => s.uuid.split('-')[0] === '0000ffe0')[0];
      })
      .then((service) => service.characteristics())
      .then((characteristics) => characteristics[0].monitor(this.monitorCharacteristic));
  }

  monitorCharacteristic = (error, characteristic) => {
    this.setState(state => ({
      error,
      values: state.values.concat(characteristic.value),
    }));
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Asclepius</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Device found: {this.state.found ? 'yes' : 'no'}</Text>
          <Text>Device status: {this.state.connected ? 'connected' : 'disconnected'}</Text>
          <Text>Services: {this.state.services.join(', ')}</Text>
          <Text>Values: {JSON.stringify(this.state.values.map(v => Buffer(v, 'base64').toString()))}</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Asclepius Monitoring</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
