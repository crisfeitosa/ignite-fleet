import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextAreaInput } from '../../components/TextAreaInput';
import { LicensePlateInput } from '../../components/LicensePlateInput';

import { Container, Content } from './styles';

export function Departure() {
  return (
    <Container>
      <Header title='Saída' />

      <Content>
        <LicensePlateInput 
          label='Placa do veículo' 
          placeholder="BRA1234"
        />

        <TextAreaInput 
          label='Finalidade'
          placeholder='Vou utilizar o veículo para...'
        />

        <Button
          title='Registar Saída'
        />
      </Content>
    </Container>
  );
}