# Bulir Mobile App

Aplicação mobile da plataforma de reservas de serviços (Exercício 3). Consome a [Bulir Core API](../bulir-core-api).

**Stack:** Expo SDK 58 · React Native 0.88 · TypeScript · Expo Router (rotas por ficheiro) · NativeWind (Tailwind) · TanStack Query · React Hook Form + Zod · Axios · expo-secure-store

## Como correr

```bash
cp .env.example .env     # EXPO_PUBLIC_API_URL
npm install
npx expo start           # a (Android), i (iOS) ou w (web)
npx tsc --noEmit         # verificação de tipos
```

> Em **dispositivo físico**, `localhost` é o próprio telemóvel: use o IP da sua máquina em `EXPO_PUBLIC_API_URL` (ex.: `http://192.168.1.10:3000`). Num emulador Android o equivalente é `http://10.0.2.2:3000`.

## Funcionalidades

| Requisito | Onde |
|---|---|
| Login com **e-mail ou NIF** + senha; JWT guardado no armazenamento seguro | `features/auth`, `lib/session-storage.ts` |
| Cadastro de cliente ou prestador | `features/auth/components/RegisterForm` |
| Prestador: criar, listar (só os seus), editar e excluir serviços | `features/services/components/ProviderServices` |
| Cliente: ver todos os serviços, pesquisar e contratar | `features/services/components/ServicesCatalog` |
| Verificação de saldo antes de contratar | `BookServiceSheet` (UI) + API (`400`, atómico) |
| Histórico: serviço, prestador, cliente, valor e estado | `features/bookings` |
| Cancelamento com reembolso (cliente **ou** prestador) | `features/bookings` |
| Carregar saldo (cliente) e ver saldo | `features/wallet` |

## Validações e permissões

- Formulários com Zod (`types/schemas.ts`, o mesmo contrato do web): preço > 0, NIF de 9 a 14 caracteres alfanuméricos, senha de 8 a 72 caracteres.
- **Rotas protegidas** com `Stack.Protected`: sem token só existe o grupo `(auth)`; com token só o `(app)`. Terminar a sessão ou receber `401` leva automaticamente ao login.
- A aba "Serviços" muda conforme o perfil (catálogo para cliente, gestão para prestador). A API aplica as mesmas regras (`403`), por isso a UI nunca é a única barreira.

## Estrutura

```
src/
  app/                       rotas (auth) e (app) com abas
  components/ui|form         design system reutilizável (Button, Input, Sheet, Toast, Form*...)
  features/<area>/           auth, app-shell, overview, services, bookings, wallet (components + hooks)
  hooks/                     TanStack Query: useAuth, useServices, useBookings, useWallet
  services/                  cliente Axios por recurso
  lib/                       formatação, erros, armazenamento da sessão
```

Os componentes só desenham; a lógica fica em hooks por feature.

## Decisões

- **Token em memória + armazenamento seguro**: o interceptor do Axios lê da memória (sem I/O por pedido) e o `SessionProvider` sincroniza com Keychain/Keystore (`localStorage` só na web).
- **`web.output: "single"`**: o NativeWind não suporta a renderização no servidor; a web serve apenas para desenvolvimento e verificação rápida.
- **Painéis (`Sheet`) em vez de modais centrais**: padrão mobile para confirmações e formulários.
- Não foi configurado ESLint (o `expo lint` pede instalação); a verificação é por `tsc --noEmit`.
