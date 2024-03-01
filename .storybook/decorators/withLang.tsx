import type {StoryContext, StoryFn} from '@storybook/react';

import {configure} from '../../src/utils';

export function withLang(Story: StoryFn, context: StoryContext) {
    const lang = context.globals.lang;

    configure({lang});

    return <Story key={lang} {...context} />;
}
