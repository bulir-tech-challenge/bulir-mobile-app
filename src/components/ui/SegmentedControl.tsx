import { Pressable, StyleSheet, Text, View } from 'react-native'

// A sombra vai em `style`, e não em `shadow-sm`: essa classe do NativeWind usa uma
// variável CSS e, aplicada só à opção ativa, faz o componente remontar ao tocar
// (o NativeWind avisa "variables ... remount" e acaba por rebentar).
const styles = StyleSheet.create({
  active: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0B192C',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
})

interface SegmentedControlProps<V extends string> {
  label?: string
  options: { value: V; label: string }[]
  value: V | undefined
  onChange: (value: V) => void
  error?: string
}

export function SegmentedControl<V extends string>({ label, options, value, onChange, error }: SegmentedControlProps<V>) {
  return (
    <View className="gap-1.5">
      {label ? <Text className="text-sm font-medium text-navy-900">{label}</Text> : null}
      <View accessibilityRole="radiogroup" className="flex-row gap-1 rounded-xl bg-navy-900/5 p-1">
        {options.map((option) => {
          const active = option.value === value
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              onPress={() => onChange(option.value)}
              style={active ? styles.active : undefined}
              className="h-10 flex-1 items-center justify-center rounded-lg"
            >
              <Text className={`text-sm font-medium ${active ? 'text-navy-900' : 'text-text-muted'}`}>{option.label}</Text>
            </Pressable>
          )
        })}
      </View>
      {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
    </View>
  )
}
