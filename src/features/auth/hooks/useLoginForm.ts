import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { toErrorMessage } from '@/lib/errors'
import { loginSchema } from '@/types/schemas'
import type { LoginFormData } from '@/types/schemas'

/** Após o login o guarda de rotas (Stack.Protected) leva a pessoa à área privada. */
export function useLoginForm() {
  const { login, isLoggingIn, loginError } = useAuth()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  const submit = form.handleSubmit(async (values) => {
    await login(values).catch(() => undefined) // o erro fica em loginError
  })

  return {
    control: form.control,
    // handleSubmit espera um evento web; no onPress do RN não há nenhum.
    onSubmit: () => void submit(),
    isSubmitting: isLoggingIn,
    errorMessage: toErrorMessage(loginError, 'Credenciais inválidas'),
  }
}
