---
title: Realtime
---

Realtime data is an important part of modern applications. Seeing the changes in the details page, without refreshing the page not only improves the user experience but also increases the productivity of the users by preventing accidental updates.

Refine handles realtime data operations through [Live Provider](/docs/realtime/live-provider) which provides a common interface for any integration. Once integrated, you'll get realtime updates across your app out of the box, without needing a further configuration.

Once a **Live Provider** is integrated, Refine takes care of the **invalidation**, **refetching** logic for your resources.

For example if a new record is created for `products` resource, a page where you use `useList` hook will automatically refetch the latest `products` data.

```jsx title="App.jsx"
import { Refine, LiveProvider } from "@refinedev/core";

import { liveProvider } from "./my-live-provider";

const App = () => {
  return (
    <Refine
      liveProvider={liveProvider}
      options={{ liveMode: "auto" }}
      onLiveEvent={(event) => {
        console.log(event);
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

```jsx title=my-page.jsx
import { useList } from "@refinedev/core";

const { data } = useList({
  resource: "products",
  // Can be configured per-hook basis.
  liveMode: "auto", // manual or off
});
```

## Supported Hooks

Refine hooks works out-of-the-box with **Live Provider**, means if the data these hooks consume is updated, they will automatically refetch.

See the [Integrated Hooks](/docs/realtime/live-provider#integrated-hooks) section for more information.

## Live Provider

The **Live Provider** is an object that contains `subscribe`, `unsubscribe` and `publish` methods. These methods are utilized by Refine to subscribe, unsubscribe to a certain resource updates and publish updates.

We have the following built-in integrations:

- Ably
- **Supabase** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts#L187)
- Appwrite
- Hasura

## Hooks

While most of the features already works out-of-the-box with **Live Provider**, you can also use the following hooks to subscribe, unsubscribe and publish updates for your custom use cases.

### useSubscription

The `useSubscription` hook can be used to subscribe to a certain resource updates. It calls **Live Provider**'s `subscribe` method with the given parameters.

```jsx
import { useSubscription } from "@refinedev/core";

useSubscription({
  resource: "products",
  types: ["created", "updated"],
  onLiveEvent: (event) => {
    console.log(event.channel); // products, orders, etc.
    console.log(event.type); // created, updated, deleted, etc.
    console.log(event.payload); // { id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }, etc.
  },
});
```

### usePublish

While generally it's not recommended to publish updates from the frontend, you can use `usePublish` hook to publish updates to a certain resource. It calls **Live Provider**'s `publish` method with the given parameters.

```jsx
import { usePublish } from "@refinedev/core";

const publish = usePublish();

publish({
  channel: "products",
  type: "deleted",
  payload: { id: 1 },
  date: new Date(),
});
```
