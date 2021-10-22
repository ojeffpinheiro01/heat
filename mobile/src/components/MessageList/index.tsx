import React from "react";
import { ScrollView } from "react-native";
import { Message } from "../Message";


import { styles } from "./style";

export function MessageList() {
  const messages = {
    id: '1',
    text: 'textando mensagem',
    user: {
      name: 'ojeffpinheiro',
      avatar_url: 'https://github.com/ojeffpinheiro01.png'
    }
  }
  return (
    <ScrollView style={styles.container} 
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'>
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
      <Message data = {messages} />
    </ScrollView>
  );
}
