import { Text, View } from 'react-native'
import { Image } from 'expo-image'

export function Logo({ light }: { light?: boolean }) {
  return (
    <View className="flex-row items-center gap-2">
      <Image source={require('../../../assets/images/bulir.svg')} style={{ width: 32, height: 32 }} contentFit="contain" />
      <Text className={`font-display text-xl ${light ? 'text-white' : 'text-navy-900'}`}>Bulir</Text>
    </View>
  )
}
