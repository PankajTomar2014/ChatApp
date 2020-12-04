

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import io from 'socket.io-client';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://10.0.0.248:3000'); //system ID address and Port number
    this.socket.on('chat message', (msg) => {
      console.log('messgae=->', msg);
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() {
    let Data = {
      id: '1',
      msg: this.state.chatMessage,
      icon: 'https://pbs.twimg.com/media/DtL7MkwWkAEsST-.jpg',
    };
    this.socket.emit('chat message', Data);
    this.setState({chatMessage: ''});
  }

  renderChatMessage = (item) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',         
          alignSelf: item.id == '1' ? 'flex-end' : 'flex-start',
          height: 50,
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 5,
            margin: 5,
            borderRadius: 4,
            backgroundColor: item.id == '1' ? '#0099ff' : 'green',
          }}>
          <Text style={{fontSize: 18}} key={item.id}>
            {item.msg}
          </Text>
        </View>
        <Image
          source={{uri: item.icon}}
          style={{borderRadius: 20, height: 45, width: 45}}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.chatMessages}
            renderItem={({item, index}) => this.renderChatMessage(item, index)}
          />
        </View>
        <View style={{flexDirection: 'row', margin: 10,alignSelf: 'center',}}>
          <TextInput
            style={{padding: 10, width: 280, height: 40, borderWidth: 2}}
            autoFocus={true}
            placeholder="Enter message"
            placeholderTextColor="#000"
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={(chatMessage) => {
              this.setState({chatMessage});
            }}
          />
          <TouchableOpacity
            onPress={() => this.submitChatMessage()}
            style={{
              borderRadius: 8,
              marginLeft: 10,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              borderWidth: 2,
            }}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignSelf: 'center',
    backgroundColor:'#e6e6e6'    
  },
});
