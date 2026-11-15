import type { FieldPath } from 'react-hook-form'
import type { RegisterFormData } from '@/types/schemas'

export interface RegisterStep {
  title: string
  description: string
  /** Campos validados antes de avançar para o passo seguinte. */
  fields: FieldPath<RegisterFormData>[]
}

export const registerSteps: RegisterStep[] = [
  { title: 'Como queres usar a Bulir?', description: 'Escolhe o teu perfil. Podes contratar ou oferecer serviços.', fields: ['role'] },
  { title: 'Fala-nos de ti', description: 'Usamos o teu nome e NIF para identificar a tua conta.', fields: ['name', 'nif'] },
  { title: 'Cria o teu acesso', description: 'Com o e-mail e a senha vais entrar na aplicação.', fields: ['email', 'password'] },
]

export const roleHints = {
  CLIENT: 'Vais encontrar prestadores e reservar serviços com o saldo da tua carteira.',
  PROVIDER: 'Vais publicar os teus serviços, definir o preço e receber diretamente na carteira.',
} as const
