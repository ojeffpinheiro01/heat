import { UserPhoto } from '../UserPhoto';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import LogoSvg from '../../assets/logo.svg';

import { styles } from './style';

export function Header() {
  return (
    <View style={styles.container}>
      {/* <LogoSvg /> */}
      <View style={styles.logoutButton}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
          <UserPhoto imageUri='https://github.com/ojeffpinheiro01.png' />
      </View>
    </View>
  );
}