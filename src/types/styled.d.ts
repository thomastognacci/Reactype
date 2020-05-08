import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      purple: string
      green: string
      blue: string
      red: string
      white: string
    }

    fonts: {
      body: string
    }
  }
}