import { Text, StyleSheet } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor'

export function ThemedText({ style, lightColor, darkColor, type = 'default', fontWeight, ...rest }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text
      style = {[
        { color },
        !type ? styles.default : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'title' ? styles.title : undefined,
        !fontWeight ? styles.regular : undefined,
        fontWeight === 'regular' ? styles.regular : undefined,
        fontWeight === 'semibold' ? styles.semibold : undefined,
        fontWeight === 'bold' ? styles.bold : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    color: '#0a63ff',
  },
  button: {
    fontSize: 18,
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
  },
  title: {
    fontSize: 25,
  },
  regular: {
    fontFamily: 'poppins-regular',
  },
  semibold: {
    fontFamily: 'poppins-semibold',
  },
  bold: {
    fontFamily: 'poppins-bold',
  },
})