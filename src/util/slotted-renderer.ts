import type { Args, Renderer, StoryContext } from '@storybook/types';

export function slottedRenderer<
  TRenderer extends Renderer = Renderer,
  TArgs extends { slot?: string } = Args
>({ slot, ...args }: TArgs, context: StoryContext<TRenderer, TArgs>) {
  const { id, component } = context;
  if (typeof component === 'undefined') {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }

  const element = document.createElement(component as string);
  Object.entries(args).forEach(([key, val]) => {
    element[key] = val;
  });

  if (typeof slot !== 'undefined') {
    element.innerText = slot;
  }

  return element;
}
