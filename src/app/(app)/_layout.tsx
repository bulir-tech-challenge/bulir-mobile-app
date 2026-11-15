import type { ColorValue } from 'react-native'
import { Tabs } from 'expo-router'
import { Briefcase, CalendarCheck, LayoutDashboard, Wallet } from 'lucide-react-native'
import type { LucideIcon } from 'lucide-react-native'
import { AppHeader } from '@/features/app-shell/components/AppHeader'
import { useAuth } from '@/hooks/useAuth'

const icon = (Icon: LucideIcon) =>
  function TabIcon({ color }: { color: ColorValue }) {
    return <Icon size={22} strokeWidth={1.5} color={String(color)} />
  }

export default function AppLayout() {
  const { user } = useAuth()

  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
        tabBarActiveTintColor: '#0B192C',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        sceneStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Início', tabBarIcon: icon(LayoutDashboard) }} />
      <Tabs.Screen
        name="services"
        options={{ title: user?.role === 'PROVIDER' ? 'Meus serviços' : 'Serviços', tabBarIcon: icon(Briefcase) }}
      />
      <Tabs.Screen name="bookings" options={{ title: 'Reservas', tabBarIcon: icon(CalendarCheck) }} />
      <Tabs.Screen name="wallet" options={{ title: 'Carteira', tabBarIcon: icon(Wallet) }} />
    </Tabs>
  )
}
