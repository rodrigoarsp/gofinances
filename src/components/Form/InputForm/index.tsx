import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({
  control,
  name,
  error,
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
      {error &&  <Error>{error}</Error>}
    </Container>
  )
}
