import type { ComponentRef, ReactNode, Ref } from 'react'
import { Text, TextInput, View } from 'react-native'
import type { TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightElement?: ReactNode
  ref?: Ref<ComponentRef<typeof TextInput>>
}

export function Input({ label, error, leftIcon, rightElement, ref, ...rest }: InputProps) {
  return (
    <View className="w-full gap-1.5">
      {label ? <Text className="text-sm font-medium text-navy-900">{label}</Text> : null}
      <View
        className={`h-12 flex-row items-center gap-2 rounded-xl border bg-white px-4 ${error ? 'border-red-400' : 'border-slate-200'}`}
      >
        {leftIcon}
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          placeholderTextColor="#94A3B8"
          className="h-full flex-1 text-sm text-navy-900"
          {...rest}
        />
        {rightElement}
      </View>
      {error ? (
        <Text accessibilityRole="alert" className="text-xs text-red-500">
          {error}
        </Text>
      ) : null}
    </View>
  )
}
