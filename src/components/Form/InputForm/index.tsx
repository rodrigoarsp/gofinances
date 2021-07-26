import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { 
  Container
} from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({
  control,
  name,
  ...rest
}: Props){
  return(
    <Container>
      <Controller
        control={control}
        render={({ field:{ onChange, value}}) =>( 
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        // onChange - quando muda o conteúdo do input
        // onBlur - quando acessa o conteúdo do input
        // value - o próprio valor do input */  
        name={name}
      />
    </Container>
  )
}
