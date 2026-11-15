import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { X } from 'lucide-react-native'

interface SheetProps {
  visible: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

/** Painel que sobe da base do ecrã (padrão mobile para formulários e confirmações). */
export function Sheet({ visible, title, onClose, children }: SheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 justify-end">
        <Pressable accessibilityLabel="Fechar" onPress={onClose} className="absolute inset-0 bg-navy-900/50" />
        <View className="max-h-[90%] rounded-t-3xl bg-white">
          <View className="flex-row items-center justify-between px-5 pt-5">
            <Text accessibilityRole="header" className="flex-1 font-display-bold text-xl text-navy-900">
              {title}
            </Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Fechar" hitSlop={8}>
              <X size={22} strokeWidth={1.5} color="#64748B" />
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="gap-4 p-5 pb-8">
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
