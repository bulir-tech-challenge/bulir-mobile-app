import { useState } from 'react'
import type { UseFormTrigger } from 'react-hook-form'
import type { RegisterFormData } from '@/types/schemas'
import { registerSteps } from '../data/register-steps'

/** Navegação entre os passos do cadastro; só avança se os campos do passo forem válidos. */
export function useRegisterSteps(trigger: UseFormTrigger<RegisterFormData>) {
  const [index, setIndex] = useState(0)

  const next = async () => {
    const valid = await trigger(registerSteps[index].fields)
    if (valid) setIndex((current) => Math.min(current + 1, registerSteps.length - 1))
  }

  const back = () => setIndex((current) => Math.max(current - 1, 0))

  return {
    index,
    step: registerSteps[index],
    total: registerSteps.length,
    isFirst: index === 0,
    isLast: index === registerSteps.length - 1,
    next,
    back,
  }
}
