import { Pressable, Text, View } from 'react-native'
import { LogOut } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { formatKz } from '@/lib/format'

const roleLabel = { CLIENT: 'Cliente', PROVIDER: 'Bulidor' } as const

/** Cabeçalho comum às abas: quem sou, o meu saldo e como terminar a sessão. */
export function AppHeader() {
  const insets = useSafeAreaInsets()
  const { user, logout } = useAuth()

  return (
    <View style={{ paddingTop: insets.top + 8 }} className="flex-row items-center gap-3 border-b border-slate-100 bg-white px-5 pb-3">
      {user ? <Avatar name={user.name} size={40} /> : null}
      <View className="flex-1">
        <Text numberOfLines={1} className="text-sm font-semibold text-navy-900">
          {user?.name ?? ' '}
        </Text>
        <Text className="text-xs text-text-muted">{user ? roleLabel[user.role] : ' '}</Text>
      </View>
      {user ? (
        <View className="rounded-full bg-primary/15 px-3 py-1.5">
          <Text className="text-xs font-semibold text-navy-900">{formatKz(user.balance)}</Text>
        </View>
      ) : null}
      <Pressable onPress={() => void logout()} accessibilityRole="button" accessibilityLabel="Terminar sessão" hitSlop={8}>
        <LogOut size={20} strokeWidth={1.5} color="#64748B" />
      </Pressable>
    </View>
  )
}
