import type { ReactNode } from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import type { PressableProps } from 'react-native'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string
  variant?: Variant
  isLoading?: boolean
  rightIcon?: ReactNode
  className?: string
}

const container: Record<Variant, string> = {
  primary: 'bg-primary active:bg-primary-deep',
  secondary: 'bg-navy-900 active:bg-navy-800',
  ghost: 'bg-transparent active:bg-navy-900/5',
  danger: 'bg-red-500 active:bg-red-600',
}

const label: Record<Variant, string> = {
  primary: 'text-navy-900',
  secondary: 'text-white',
  ghost: 'text-navy-900',
  danger: 'text-white',
}

export function Button({ title, variant = 'primary', isLoading, rightIcon, disabled, className = '', ...rest }: ButtonProps) {
  const inactive = disabled || isLoading
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!inactive, busy: !!isLoading }}
      disabled={inactive}
      className={`h-12 flex-row items-center justify-center gap-2 rounded-full px-6 ${container[variant]} ${inactive ? 'opacity-60' : ''} ${className}`}
      {...rest}
    >
      {isLoading ? <ActivityIndicator size="small" color={variant === 'primary' || variant === 'ghost' ? '#0B192C' : '#fff'} /> : null}
      <Text className={`text-sm font-semibold ${label[variant]}`}>{title}</Text>
      {!isLoading && rightIcon}
    </Pressable>
  )
}
