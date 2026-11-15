import { View } from 'react-native'
import { ArrowRight, Mail } from 'lucide-react-native'
import { FormInput } from '@/components/form/FormInput'
import { FormPasswordInput } from '@/components/form/FormPasswordInput'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { useLoginForm } from '../hooks/useLoginForm'

export function LoginForm() {
  const { control, onSubmit, isSubmitting, errorMessage } = useLoginForm()

  return (
    <View className="gap-4">
      {errorMessage ? <Alert message={errorMessage} /> : null}

      <FormInput
        control={control}
        name="identifier"
        label="E-mail ou NIF"
        placeholder="exemplo@email.com ou NIF"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        keyboardType="email-address"
        leftIcon={<Mail size={18} strokeWidth={1.5} color="#94A3B8" />}
      />
      <FormPasswordInput control={control} name="password" label="Senha" placeholder="A tua senha" autoComplete="current-password" />

      <Button title="Entrar" isLoading={isSubmitting} onPress={onSubmit} rightIcon={<ArrowRight size={18} strokeWidth={1.5} color="#0B192C" />} />
    </View>
  )
}
