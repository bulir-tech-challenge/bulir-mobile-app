import { Text, View } from 'react-native'

interface StepIndicatorProps {
  /** Passo atual, a partir de 0. */
  current: number
  total: number
}

/** Barra de progresso por passos ("Passo 2 de 3"). */
export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: current + 1 }} className="gap-2">
      <Text className="text-xs font-medium text-text-muted">
        Passo {current + 1} de {total}
      </Text>
      <View className="flex-row gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <View key={i} className={`h-1.5 flex-1 rounded-full ${i <= current ? 'bg-primary' : 'bg-slate-200'}`} />
        ))}
      </View>
    </View>
  )
}
