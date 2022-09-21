import '@gravity-ui/uikit/styles/styles.scss';

import React from 'react';
import {ThemeProvider} from '@gravity-ui/uikit';

import {configure, Lang} from '../src/utils';

import {withTheme} from './decorators/withTheme';
import {withLang} from './decorators/withLang';

configure({lang: Lang.Ru});

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

export const decorators = [withTheme, withLang, withContextProvider];

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
    lang: {
        name: 'Language',
        description: 'Global language for components',
        defaultValue: 'ru',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'ru', right: '🇷🇺', title: 'Русский'},
                {value: 'en', right: '🇬🇧', title: 'English'},
            ],
        },
    },
};
