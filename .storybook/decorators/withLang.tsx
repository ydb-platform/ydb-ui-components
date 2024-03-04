import {configure} from '@gravity-ui/uikit';
import type {StoryContext, StoryFn} from '@storybook/react';

export function withLang(Story: StoryFn, context: StoryContext) {
    const lang = context.globals.lang;

    configure({lang});

    return <Story key={lang} {...context} />;
}
