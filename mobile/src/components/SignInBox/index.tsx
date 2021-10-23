import { View } from 'react-native';
import React from 'react';

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../Button';

import { COLORS } from '../../theme';

import { styles } from './style';

export function SignInBox(){
  const { signIn, isSignIn } = useAuth()

  return (
    <View style={styles.container}>
        <Button title='ENTRAR COM O GITHUB' 
            color={COLORS.BLACK_PRIMARY}
            backgroundColor={COLORS.YELLOW}
            icon='github'
            onPress={signIn}
            isLoading={isSignIn} />
    </View>
  );
}