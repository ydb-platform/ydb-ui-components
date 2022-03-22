import '@yandex-cloud/uikit/styles/styles.scss';

import React from 'react';
import {ThemeProvider} from '@yandex-cloud/uikit';
import {withTheme} from './decorators/withTheme';

const withContextProvider = (Story, context) => {
    const theme = context.globals.theme;

    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === 'light' ? 'white' : 'black',
    };

    context.globals.background = theme;

    return (
        <ThemeProvider>
            <Story {...context} />
        </ThemeProvider>
    );
};

export const decorators = [withTheme, withContextProvider];

export const parameters = {
    jsx: {showFunctions: true},
    backgrounds: {
        default: 'light',
        values: [
            {name: 'light', value: 'white'},
            {name: 'dark', value: 'rgba(45, 44, 51, 1)'},
        ],
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            items: [
                {value: 'light', icon: 'circlehollow', title: 'Light'},
                {value: 'dark', icon: 'circle', title: 'Dark'},
            ],
        },
    },
};
