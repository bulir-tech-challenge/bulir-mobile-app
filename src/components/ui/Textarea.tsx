import { Text, TextInput, View } from 'react-native'
import type { TextInputProps } from 'react-native'

export interface TextareaProps extends TextInputProps {
  label?: string
  error?: string
}

export function Textarea({ label, error, ...rest }: TextareaProps) {
  return (
    <View className="w-full gap-1.5">
      {label ? <Text className="text-sm font-medium text-navy-900">{label}</Text> : null}
      <TextInput
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        accessibilityLabel={label}
        placeholderTextColor="#94A3B8"
        className={`min-h-24 rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 ${error ? 'border-red-400' : 'border-slate-200'}`}
        {...rest}
      />
      {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
    </View>
  )
}
