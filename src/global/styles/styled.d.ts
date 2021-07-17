import 'styled-components';
import theme from './theme';

declare module 'styled-components' { //Acessar o módulo do styled-componets
  //Sobrescrever o novo tema
  type ThemeType = typeof theme //copia o tipo theme para o ThemeType criado

  export interface DefaultTheme extends ThemeType{
    //Vai icluir o tipo ThemeType para o DefaulTheme
  }
}