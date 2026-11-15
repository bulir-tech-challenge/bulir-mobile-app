import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { AuthScreen } from '@/features/auth/components/AuthScreen'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export default function RegisterScreen() {
  return (
    <AuthScreen
      title="Criar conta"
      subtitle="Preenche os dados abaixo para começares."
      illustration={require('../../../assets/images/enthusiastic.svg')}
      footer={
        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-text-muted">Já tens conta?</Text>
          <Link href="/login" className="text-sm font-semibold text-primary-deep">
            Entrar
          </Link>
        </View>
      }
    >
      <RegisterForm />
    </AuthScreen>
  )
}
