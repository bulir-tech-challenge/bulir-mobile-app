import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const TOKEN_KEY = 'bulir_auth_token'

/**
 * Persistência do token JWT. No telemóvel usa o armazenamento seguro do
 * sistema (Keychain/Keystore); na web, onde não existe, usa o localStorage.
 */
export const sessionStorage = {
  async getToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') return localStorage.getItem(TOKEN_KEY)
      return await SecureStore.getItemAsync(TOKEN_KEY)
    } catch {
      return null
    }
  },

  async setToken(token: string | null): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (token) localStorage.setItem(TOKEN_KEY, token)
        else localStorage.removeItem(TOKEN_KEY)
        return
      }
      if (token) await SecureStore.setItemAsync(TOKEN_KEY, token)
      else await SecureStore.deleteItemAsync(TOKEN_KEY)
    } catch {
      // armazenamento indisponível: a sessão fica só em memória
    }
  },
}
