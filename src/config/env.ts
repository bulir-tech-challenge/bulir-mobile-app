/**
 * Variáveis de ambiente tipadas. No Expo só as que começam por EXPO_PUBLIC_
 * chegam ao bundle. Em dispositivo físico, `localhost` aponta para o próprio
 * telemóvel: use o IP da máquina (ex.: http://192.168.1.10:3000).
 */
export const env = {
  apiUrl: (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
} as const
