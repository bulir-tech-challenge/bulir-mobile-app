import { Controller } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { PasswordInput } from '../ui/PasswordInput'
import type { InputProps } from '../ui/Input'

interface FormPasswordInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur' | 'leftIcon' | 'rightElement' | 'secureTextEntry'> {
  control: Control<T>
  name: FieldPath<T>
}

export function FormPasswordInput<T extends FieldValues>({ control, name, ...rest }: FormPasswordInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput {...rest} value={field.value ?? ''} onChangeText={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} />
      )}
    />
  )
}
