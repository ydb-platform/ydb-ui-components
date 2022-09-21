import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react';
import {useTheme} from '@gravity-ui/uikit';

export function withTheme(Story: StoryType, context: StoryContext) {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme();

    React.useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
}
