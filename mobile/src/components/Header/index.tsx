import { UserPhoto } from '../UserPhoto';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

// import LogoSvg from '../../assets/logo.svg';

import { styles } from './style';

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <View style={styles.container}>
      {/* <LogoSvg /> */}
      <View style={styles.logoutButton}>
          {user && <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>}
          <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}