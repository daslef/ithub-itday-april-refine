---
title: <AutoSaveIndicator />
description: <AutoSaveIndicator> component shows `autoSave` status on edit actions.
source: packages/antd/src/components/autoSaveIndicator/index.tsx
---

Компонент `<AutoSaveIndicator>` для **Ant Design** может быть использован для информирования пользователя о статусе автосохранения.

```jsx
import { AutoSaveIndicator, useForm } from "@refinedev/antd";

const MyComponent = () => {
  const { autoSaveProps } = useForm({
    autoSave: {
      enabled: true,
    },
  });

  console.log(autoSaveProps);
  /*
    {
      status: "success",  // "loading" | "error" | "idle" | "success"
      error: null,        // HttpError | null
      data: { ... },      // UpdateResponse | undefined,
    }
  */

  return <AutoSaveIndicator {...autoSaveProps} />;
};
```

### Свойства

<PropsTable module="@refinedev/antd/AutoSaveIndicator" />

:::simple Good to know

Компонент является расширением над базовым компонентом[`<AutoSaveIndicator>`](/docs/core/components/auto-save-indicator) от Refine. Для дополнительной информации и примеров использования обратитесь по ссылке выше.

:::
