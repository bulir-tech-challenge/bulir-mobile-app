import { Controller } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Textarea } from '../ui/Textarea'
import type { TextareaProps } from '../ui/Textarea'

interface FormTextareaProps<T extends FieldValues> extends Omit<TextareaProps, 'value' | 'onChangeText' | 'onBlur'> {
  control: Control<T>
  name: FieldPath<T>
}

export function FormTextarea<T extends FieldValues>({ control, name, ...rest }: FormTextareaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Textarea {...rest} value={field.value ?? ''} onChangeText={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} />
      )}
    />
  )
}
