import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";

import { Button } from "../Button";

import { api } from "../../services/api";

import { COLORS } from "../../theme";

import { styles } from "./style";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleSendMessageSubmit() {
    const messageFomatted = message.trim();
    
    if (messageFomatted.length > 0) {
      setSendingMessage(true)
      await api.post('/messages', { message: messageFomatted })
  
      setMessage('')
      Keyboard.dismiss()
      Alert.alert('Mensagem enviada')
      setSendingMessage(false)
    } else {
      Alert.alert("Oops", "Digite alguma coisa para enviar");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        editable={!sendingMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleSendMessageSubmit}
      />
    </View>
  );
}