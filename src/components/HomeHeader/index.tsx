import { TouchableOpacity } from 'react-native';
import { useApp } from '@realm/react';
import { Power } from 'phosphor-react-native';

import theme from '../../theme';
import { Container, Greeting, Message, Name, Picture } from './styles';

const blurhash = 'L184i9ofbHof00ayjsay~qj[ayj@';

export function HomeHeader() {
  const app = useApp();

  function handleLogOut() {
    app.currentUser?.logOut();
  }

  return (
    <Container>
      <Picture 
        source={{ uri: 'https://github.com/crisfeitosa.png' }}
        placeholder={{ blurhash }}
        transition={1000}
      />
      <Greeting>
        <Message>
          Olá
        </Message>
        <Name>
          Cristiano
        </Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}