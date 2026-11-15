import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { AuthScreen } from '@/features/auth/components/AuthScreen'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginScreen() {
  return (
    <AuthScreen
      title="Bem-vindo de volta"
      subtitle="Entra com o teu e-mail ou NIF para continuares."
      illustration={require('../../../assets/images/cleaning.svg')}
      footer={
        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-text-muted">Ainda não tens conta?</Text>
          <Link href="/register" className="text-sm font-semibold text-primary-deep">
            Criar conta
          </Link>
        </View>
      }
    >
      <LoginForm />
    </AuthScreen>
  )
}
