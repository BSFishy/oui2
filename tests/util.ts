import type { StoryIndexV3 } from '@storybook/types';

export async function getStories(): Promise<StoryIndexV3> {
  const req = await fetch('http://localhost:6006/stories.json');
  if (!req.ok) {
    throw new Error(await req.json());
  }

  return await req.json();
}
