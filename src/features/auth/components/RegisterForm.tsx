import { View } from 'react-native'
import { ArrowRight, IdCard, Mail, User } from 'lucide-react-native'
import { FormInput } from '@/components/form/FormInput'
import { FormPasswordInput } from '@/components/form/FormPasswordInput'
import { FormSegmentedControl } from '@/components/form/FormSegmentedControl'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { roleOptions } from '../data/roles'
import { useRegisterForm } from '../hooks/useRegisterForm'

const ICON = { size: 18, strokeWidth: 1.5, color: '#94A3B8' }

export function RegisterForm() {
  const { control, onSubmit, isSubmitting, errorMessage } = useRegisterForm()

  return (
    <View className="gap-4">
      {errorMessage ? <Alert message={errorMessage} /> : null}

      <FormSegmentedControl control={control} name="role" label="Quero entrar como" options={roleOptions} />
      <FormInput control={control} name="name" label="Nome completo" placeholder="O teu nome" autoComplete="name" leftIcon={<User {...ICON} />} />
      <FormInput control={control} name="nif" label="NIF" placeholder="000000000" autoCapitalize="characters" leftIcon={<IdCard {...ICON} />} />
      <FormInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="exemplo@email.com"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        keyboardType="email-address"
        leftIcon={<Mail {...ICON} />}
      />
      <FormPasswordInput control={control} name="password" label="Senha" placeholder="Mínimo 8 caracteres" autoComplete="new-password" />

      <Button title="Criar conta" isLoading={isSubmitting} onPress={onSubmit} rightIcon={<ArrowRight size={18} strokeWidth={1.5} color="#0B192C" />} />
    </View>
  )
}
