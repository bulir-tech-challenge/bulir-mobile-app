import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Logo } from '@/components/ui/Logo'
import type { ImageSource } from 'expo-image'

interface AuthScreenProps {
  title: string
  subtitle: string
  illustration: ImageSource
  children: ReactNode
  footer: ReactNode
}

/** Moldura partilhada pelo login e pelo registo: logo, ilustração, título e conteúdo. */
export function AuthScreen({ title, subtitle, illustration, children, footer }: AuthScreenProps) {
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }}
        contentContainerClassName="gap-6 px-6"
      >
        <Logo />
        <View className="items-center rounded-3xl bg-primary/10 py-4">
          <Image source={illustration} style={{ width: 170, height: 170 }} contentFit="contain" />
        </View>
        <View className="gap-1">
          <Text accessibilityRole="header" className="font-display-bold text-3xl text-navy-900">
            {title}
          </Text>
          <Text className="text-sm text-text-muted">{subtitle}</Text>
        </View>
        {children}
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
