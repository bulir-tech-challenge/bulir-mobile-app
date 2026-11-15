import { Controller } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Input } from '../ui/Input'
import type { InputProps } from '../ui/Input'

interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur'> {
  control: Control<T>
  name: FieldPath<T>
}

export function FormInput<T extends FieldValues>({ control, name, ...rest }: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input {...rest} value={field.value ?? ''} onChangeText={field.onChange} onBlur={field.onBlur} ref={field.ref} error={fieldState.error?.message} />
      )}
    />
  )
}
