import { Controller } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { NumberInput } from '../ui/NumberInput'
import type { InputProps } from '../ui/Input'

interface FormNumberInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur' | 'keyboardType'> {
  control: Control<T>
  name: FieldPath<T>
}

export function FormNumberInput<T extends FieldValues>({ control, name, ...rest }: FormNumberInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <NumberInput {...rest} value={field.value as number | undefined} onChangeValue={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} />
      )}
    />
  )
}
