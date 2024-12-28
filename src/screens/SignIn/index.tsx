import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { GoogleSignin, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { Realm, useApp } from '@realm/react';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { Container, Title, Slogan } from './styles';

GoogleSignin.configure({
  scopes: ['email', 'profile',],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

export function SignIn() {
  const app = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices();
      }

      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;

        if (!idToken) throw new Error('Google Sign-In failed: Missing ID token.');

        const credentials = Realm.Credentials.jwt(idToken);
        await app.logIn(credentials);
      } else {
        Alert.alert('Entrar', "Não foi possível conectar-se a sua conta google.")
      }
    } catch (error) {
      console.log(isErrorWithCode(error))
      Alert.alert('Entrar', "Não foi possível conectar-se a sua conta google.")
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button
        title='Entrar com Google'
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}