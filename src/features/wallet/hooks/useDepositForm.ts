import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/Toast'
import { useWallet } from '@/hooks/useWallet'
import { toErrorMessage } from '@/lib/errors'
import { formatKz } from '@/lib/format'
import { depositSchema } from '@/types/schemas'
import type { DepositFormData } from '@/types/schemas'

export function useDepositForm() {
  const toast = useToast()
  const { deposit, isDepositing, depositError } = useWallet()

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: undefined },
  })

  const submit = form.handleSubmit(async (values) => {
    try {
      await deposit(values)
      toast.show(`Saldo carregado com ${formatKz(values.amount)}`)
      form.reset({ amount: undefined })
    } catch {
      // o erro fica em depositError
    }
  })

  return {
    control: form.control,
    setAmount: (amount: number) => form.setValue('amount', amount, { shouldValidate: true }),
        // handleSubmit espera um evento web; no onPress do RN não há nenhum.
    onSubmit: () => void submit(),
    isSubmitting: isDepositing,
    errorMessage: toErrorMessage(depositError, 'Não foi possível carregar o saldo'),
  }
}
