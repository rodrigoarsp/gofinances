import React, { useState, useEffect } from 'react';
import { 
  Modal,
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup'; // importando tudo do yup
import { yupResolver } from '@hookform/resolvers/yup';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styled';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'), //é uma string obrigatório
  amount: Yup
  .number()
  .typeError('Informe um valor numérico') //Tipo inteiro
  .positive('O valor não pode ser negativo')
})

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema) //forçar o useForm a criar um padrão
  });

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData){ //ela é async para usar await (para esperar na gravação de dados)
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');
    
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    
    try {

      await AsyncStorage.setItem(dataKey, JSON.stringify(data)); //setItem recebe dois parameros a chave e o objeto a salvar(em string)

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }

    useEffect(() => {
      async function loadData(){
        const data = await AsyncStorage.getItem(dataKey);
        console.log(JSON.parse(data!)); //O uso de ! é do typescript que é forçando sempre vai ter alguma coisa
      }

      loadData();  
    },[])
  }


  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
      //Quando clicado em qualquer lugar da tela fecha o teclado
    >
      <Container>
        
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
                //'characters' - tudo maiúsculo
                // words - sempre a primeira letra maiúscula
                // sentences - primeira palavra maiústala da frase inteira
              autoCorrect={false}
                // tira a alto correção
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
                //dar olhada na documentação para ver se está disponível para as duas plataformas
              error={errors.amount && errors.amount.message}
            />
            <TransactionType>
              <TransactionTypeButton 
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionType>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>
          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)} //Tem que fazer a tipagem do onPress = () => void -> pois é uma exigência do RectButton
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category= {category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}