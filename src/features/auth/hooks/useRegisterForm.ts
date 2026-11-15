import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { toErrorMessage } from '@/lib/errors'
import { registerSchema } from '@/types/schemas'
import type { RegisterFormData } from '@/types/schemas'

export function useRegisterForm() {
  const { register, login, isRegistering, isLoggingIn, registerError } = useAuth()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', nif: '', email: '', password: '', role: 'CLIENT' },
  })

  const submit = form.handleSubmit(async (values) => {
    try {
      await register(values)
      await login({ identifier: values.email, password: values.password })
    } catch {
      // o erro de cadastro fica em registerError
    }
  })

  return {
    control: form.control,
    // handleSubmit espera um evento web; no onPress do RN não há nenhum.
    onSubmit: () => void submit(),
    isSubmitting: isRegistering || isLoggingIn,
    errorMessage: toErrorMessage(registerError, 'Não foi possível criar a conta'),
  }
}
