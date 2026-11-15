import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useWallet } from '@/hooks/useWallet'
import { BalanceCard } from './BalanceCard'
import { DepositForm } from './DepositForm'

export function WalletScreen() {
  const { user, balance, isLoading } = useWallet()

  if (isLoading || !user) return <Spinner />

  const isClient = user.role === 'CLIENT'

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="gap-5 p-5">
        <ScreenHeader
          title="Carteira"
          description={isClient ? 'Gere o saldo que usas nas reservas.' : 'Acompanha o que recebes pelos teus serviços.'}
        />
        <BalanceCard balance={balance} holder={user.name} caption={isClient ? 'Saldo disponível' : 'Saldo recebido'} />
        {isClient ? (
          <DepositForm />
        ) : (
          <Card>
            <EmptyState
              image={require('../../../../assets/images/cash-payment.svg')}
              title="Pagamento direto no teu bolso"
              description="Sempre que um cliente reservar um serviço teu, o valor é creditado aqui automaticamente."
            />
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
