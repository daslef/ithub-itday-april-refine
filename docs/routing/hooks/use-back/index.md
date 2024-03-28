---
title: useBack
---

`useBack` is a hook that leverages the `back` method of the `routerProvider` to perform the "go back" operation in the history stack.

## Usage

```tsx
import { useBack } from "@refinedev/core";

const MyComponent = () => {
  const back = useBack();

  return <Button onClick={() => back()}>Go Back</Button>;
};
```
