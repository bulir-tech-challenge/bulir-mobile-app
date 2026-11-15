import { useState } from 'react'
import { Pressable } from 'react-native'
import { Eye, EyeOff, Lock } from 'lucide-react-native'
import { Input } from './Input'
import type { InputProps } from './Input'

const ICON = { size: 18, strokeWidth: 1.5, color: '#94A3B8' }

export function PasswordInput(props: Omit<InputProps, 'secureTextEntry' | 'leftIcon' | 'rightElement'>) {
  const [visible, setVisible] = useState(false)
  const Toggle = visible ? EyeOff : Eye

  return (
    <Input
      {...props}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={!visible}
      leftIcon={<Lock {...ICON} />}
      rightElement={
        <Pressable
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
          hitSlop={8}
        >
          <Toggle {...ICON} />
        </Pressable>
      }
    />
  )
}
