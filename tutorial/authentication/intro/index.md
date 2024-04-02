---
title: Введение
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

Мы освоили базовую работу с данными в Refine. Теперь займемся процессами аутентификации.

Refine довольно легко интегрировать с любым провайдером аутентификации. Интеграцию с роутерами и UI-фреймворками оставим на более поздние разделы, а пока освоим базу:

- реализуем [`AuthProvider`](/docs/authentication/auth-provider),
- освоим хуки [`useLogin`](/docs/authentication/hooks/use-login) и [`useIsAuthenticated`](/docs/authentication/hooks/use-is-authenticated), компонент [`<Authenticated />`](/docs/authentication/components/authenticated).
- свяжем процессы аутентификации с провайдером данных и научимся обрабатывать ошибки.

</Sandpack>
