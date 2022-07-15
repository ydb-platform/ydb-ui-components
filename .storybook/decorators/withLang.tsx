import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react';

import {configure} from '../../src/utils';

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang;

    configure({lang});

    return <Story key={lang} {...context} />;
}
