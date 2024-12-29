import { useEffect, useRef, useState } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { 
  useForegroundPermissions, 
  watchPositionAsync, 
  LocationAccuracy,
  LocationSubscription
} from 'expo-location';
import { useUser } from '@realm/react';

import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextAreaInput } from '../../components/TextAreaInput';
import { LicensePlateInput } from '../../components/LicensePlateInput';

import { getAddressLocation } from '../../utils/getAddressLocation';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { Container, Content, Message } from './styles';

export function Departure() {
  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if(!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informa a placa correta.')
      }
  
      if(description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
      }

      setIsRegistering(false);

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate,
          description,
        }))
      });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso.');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não possível registrar a saída do veículo.');
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if(!locationForegroundPermission?.granted){
      return;
    } 

    let subscription: LocationSubscription;
    
    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      getAddressLocation(location.coords)
      .then(address => {
        console.log(address)
      })
    }).then(response => subscription = response);

    return () => {
      if(subscription){
        subscription.remove();
      }
    }; 
  }, [locationForegroundPermission?.granted]);

  if(!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title='Saída' />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a 
          localização para acessar essa funcionalidade. Por favor, acesse as
          configurações do seu dispositivo para conceder a permissão ao aplicativo.
        </Message>
      </Container>
    )
  };

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label='Placa do veículo'
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus()
              }}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              value={licensePlate.toUpperCase()}
            />

            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade'
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              submitBehavior="blurAndSubmit"
              onChangeText={setDescription}
            />

            <Button
              title='Registar Saída'
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}