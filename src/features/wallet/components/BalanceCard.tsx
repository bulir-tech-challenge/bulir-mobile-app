import { Text, View } from 'react-native'
import { Wallet } from 'lucide-react-native'
import { formatKz } from '@/lib/format'

interface BalanceCardProps {
  balance: number
  holder: string
  caption: string
}

export function BalanceCard({ balance, holder, caption }: BalanceCardProps) {
  return (
    <View className="gap-6 overflow-hidden rounded-3xl bg-primary p-6">
      <View className="flex-row items-center justify-between">
        <Wallet size={22} strokeWidth={1.5} color="#0B192C" />
        <Text className="font-display text-sm text-navy-900">Bulir</Text>
      </View>
      <View>
        <Text className="text-xs text-navy-900/70">{caption}</Text>
        <Text accessibilityRole="header" className="font-display-bold text-3xl text-navy-900">
          {formatKz(balance)}
        </Text>
      </View>
      <Text className="text-xs font-medium uppercase text-navy-900/70">{holder}</Text>
    </View>
  )
}
