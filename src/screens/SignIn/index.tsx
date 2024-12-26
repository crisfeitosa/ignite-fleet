import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { Container, Title, Slogan } from './styles';
import { Alert } from 'react-native';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);
      const { data } = await GoogleSignin.signIn();

      if (data) {
        console.log(data);
      } else {
        Alert.alert('Entrar', "Não foi possível conectar-se a sua conta google.")
      }
    } catch (error) {
      console.log(error)
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