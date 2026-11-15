import { useEffect, useState } from 'react'
import { Input } from './Input'
import type { InputProps } from './Input'

interface NumberInputProps extends Omit<InputProps, 'value' | 'onChangeText' | 'keyboardType'> {
  value: number | undefined
  onChangeValue: (value: number | undefined) => void
}

function parse(text: string): number | undefined {
  const normalized = text.replace(',', '.').trim()
  if (normalized === '') return undefined
  const parsed = Number(normalized)
  return Number.isNaN(parsed) ? undefined : parsed
}

/** Mantém o texto digitado ("12.") e expõe ao formulário um `number`. */
export function NumberInput({ value, onChangeValue, ...rest }: NumberInputProps) {
  const [text, setText] = useState(value === undefined ? '' : String(value))

  useEffect(() => {
    if (parse(text) !== value) setText(value === undefined ? '' : String(value))
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Input
      {...rest}
      keyboardType="decimal-pad"
      value={text}
      onChangeText={(next) => {
        setText(next)
        onChangeValue(parse(next))
      }}
    />
  )
}
