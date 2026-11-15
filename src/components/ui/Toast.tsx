import { createContext, use, useCallback, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ToastKind = 'success' | 'error'

interface ToastContextValue {
  show: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const value = use(ToastContext)
  if (!value) throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  return value
}

/** Aviso temporário no topo do ecrã (substitui o "toast" da web). */
export function ToastProvider({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets()
  const [toast, setToast] = useState<{ message: string; kind: ToastKind } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback((message: string, kind: ToastKind = 'success') => {
    if (timer.current) clearTimeout(timer.current)
    setToast({ message, kind })
    timer.current = setTimeout(() => setToast(null), 3500)
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext value={value}>
      {children}
      {toast ? (
        <View pointerEvents="none" style={{ top: insets.top + 8 }} className="absolute inset-x-4 z-50 items-center">
          <View
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            className={`rounded-2xl px-4 py-3 shadow-lg ${toast.kind === 'success' ? 'bg-navy-900' : 'bg-red-600'}`}
          >
            <Text className="text-sm font-medium text-white">{toast.message}</Text>
          </View>
        </View>
      ) : null}
    </ToastContext>
  )
}
