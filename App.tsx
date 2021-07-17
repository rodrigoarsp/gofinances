import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { 
  useFonts, //função de recarregar as fonts (Hooks)
  Poppins_400Regular, //estilização da fonte
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { Dashboard } from './src/screens/Dashboard';

import theme from './src/global/styles/theme';

export default function App() {
  // useFonts -> Retorna um bolean, mostrando se as fontes foram carregadas
  const [fonstsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  // Enquanto as fontes não forem carregadas se execula o AppLoading
  if(!fonstsLoaded){
    return <AppLoading />
  }

  return(
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  ) 
}