import { Text, View } from 'react-native'
import type { LucideIcon } from 'lucide-react-native'
import { Card } from '@/components/ui/Card'

export function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <Card className="flex-1 gap-2">
      <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
        <Icon size={18} strokeWidth={1.5} color="#0B9C83" />
      </View>
      <Text className="text-xs text-text-muted">{label}</Text>
      <Text numberOfLines={1} adjustsFontSizeToFit className="font-display-bold text-lg text-navy-900">
        {value}
      </Text>
    </Card>
  )
}
