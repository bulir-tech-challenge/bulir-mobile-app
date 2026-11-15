import { Text, View } from 'react-native'
import { useWatch } from 'react-hook-form'
import { ArrowRight, Check, IdCard, Mail, User } from 'lucide-react-native'
import { FormInput } from '@/components/form/FormInput'
import { FormPasswordInput } from '@/components/form/FormPasswordInput'
import { FormSegmentedControl } from '@/components/form/FormSegmentedControl'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { roleHints } from '../data/register-steps'
import { roleOptions } from '../data/roles'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { useRegisterSteps } from '../hooks/useRegisterSteps'

const ICON = { size: 18, strokeWidth: 1.5, color: '#94A3B8' }
const ICON_DARK = { size: 18, strokeWidth: 1.5, color: '#0B192C' }

/** Cadastro em passos: perfil → dados pessoais → acesso. */
export function RegisterForm() {
  const { control, trigger, onSubmit, isSubmitting, errorMessage } = useRegisterForm()
  const { index, step, total, isFirst, isLast, next, back } = useRegisterSteps(trigger)
  const role = useWatch({ control, name: 'role' })

  return (
    <View className="gap-5">
      <StepIndicator current={index} total={total} />

      <View className="gap-1">
        <Text className="font-display text-lg text-navy-900">{step.title}</Text>
        <Text className="text-sm text-text-muted">{step.description}</Text>
      </View>

      {isLast && errorMessage ? <Alert message={errorMessage} /> : null}

      {index === 0 ? (
        <View className="gap-3">
          <FormSegmentedControl control={control} name="role" options={roleOptions} />
          <Text className="rounded-xl bg-primary/10 p-3 text-sm text-navy-900">{roleHints[role] ?? roleHints.CLIENT}</Text>
        </View>
      ) : null}

      {index === 1 ? (
        <View className="gap-4">
          <FormInput control={control} name="name" label="Nome completo" placeholder="O teu nome" autoComplete="name" leftIcon={<User {...ICON} />} />
          <FormInput control={control} name="nif" label="NIF" placeholder="000000000" autoCapitalize="characters" leftIcon={<IdCard {...ICON} />} />
        </View>
      ) : null}

      {index === 2 ? (
        <View className="gap-4">
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
        </View>
      ) : null}

      <View className="gap-2">
        {isLast ? (
          <Button title="Criar conta" isLoading={isSubmitting} onPress={onSubmit} rightIcon={<Check {...ICON_DARK} />} />
        ) : (
          <Button title="Continuar" onPress={() => void next()} rightIcon={<ArrowRight {...ICON_DARK} />} />
        )}
        {!isFirst ? <Button title="Voltar" variant="ghost" disabled={isSubmitting} onPress={back} /> : null}
      </View>
    </View>
  )
}
