import { Pressable, Text, View } from 'react-native'
import { ArrowRight, Banknote } from 'lucide-react-native'
import { FormNumberInput } from '@/components/form/FormNumberInput'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatKz } from '@/lib/format'
import { useDepositForm } from '../hooks/useDepositForm'

const quickAmounts = [5_000, 10_000, 50_000, 100_000]

export function DepositForm() {
  const { control, setAmount, onSubmit, isSubmitting, errorMessage } = useDepositForm()

  return (
    <Card className="gap-4">
      <View className="gap-1">
        <Text className="font-display text-lg text-navy-900">Carregar saldo</Text>
        <Text className="text-sm text-text-muted">Escolhe um valor e usa-o para reservar serviços.</Text>
      </View>

      {errorMessage ? <Alert message={errorMessage} /> : null}

      <FormNumberInput control={control} name="amount" label="Valor (Kz)" placeholder="0,00" leftIcon={<Banknote size={18} strokeWidth={1.5} color="#94A3B8" />} />

      <View className="flex-row flex-wrap gap-2">
        {quickAmounts.map((value) => (
          <Pressable key={value} onPress={() => setAmount(value)} accessibilityRole="button" className="rounded-full bg-navy-900/5 px-3 py-1.5 active:bg-primary/20">
            <Text className="text-xs font-medium text-navy-900">{formatKz(value)}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Carregar" isLoading={isSubmitting} onPress={onSubmit} rightIcon={<ArrowRight size={18} strokeWidth={1.5} color="#0B192C" />} />
    </Card>
  )
}
