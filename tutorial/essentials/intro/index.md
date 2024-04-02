---
title: Введение
---

import { Sandpack } from "./sandpack.tsx";
import { TutorialParameterDropdown } from "@site/src/refine-theme/tutorial-parameter-dropdown";

<Sandpack>

Этот обучающий курс проведет тебя от основ использования Refine к продвинутым темам, в результате чего ты разработаешь полноценное CRUD-приложение с помощью Refine. 

Refine можно интегрировать с любой библиотекой роутинга, более того, для трёх из них (`React Router DOM`, `Next.js`, `Remix`) реализованы официальные адаптеры, однако в данном курсе мы рекомендуем использовать именно `React Router DOM`.

Выбери библиотеку роутинга:

<TutorialParameterDropdown parameter="routerSelection" label="Routing" className="w-min pb-4" />

Последующие разделы будут адаптированы под выбранный тобой UI-фреймворк. Официально, Refine поддерживает Ant Design, Material UI, Mantine и Chakra UI, но этот курс подготовлен под два наиболее популярных: [Ant Design](/docs/ui-integrations/ant-design/introduction) и [Material UI](docs/ui-integrations/material-ui/introduction).

Выбери UI-фреймворк:

<TutorialParameterDropdown parameter="uiSelection" label="UI Framework" className="w-min pb-4" />

</Sandpack>
