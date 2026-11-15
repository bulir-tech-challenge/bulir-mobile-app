import { ActivityIndicator, View } from 'react-native'

export function Spinner() {
  return (
    <View accessibilityRole="progressbar" className="items-center justify-center py-16">
      <ActivityIndicator color="#27D9A7" />
    </View>
  )
}
