// eslint-disable-next-line import/order
import '@gravity-ui/uikit/styles/styles.scss';

import React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import type {Decorator, Preview} from '@storybook/react';

import {Lang, configure} from '../src/utils';

import {withLang} from './decorators/withLang';

configure({lang: Lang.Ru});

const withContextProvider: Decorator = (Story, context) => {
    const theme = context.globals.theme;

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Story {...context} />
            </ThemeProvider>
        </React.StrictMode>
    );
};

const preview: Preview = {
    parameters: {
        jsx: {showFunctions: true},
        backgrounds: {
            default: 'light',
            values: [
                {name: 'light', value: 'white'},
                {name: 'dark', value: 'rgba(45, 44, 51, 1)'},
            ],
        },
    },
    decorators: [withLang, withContextProvider],
    globalTypes: {
        theme: {
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    {value: 'light', right: '☼', title: 'Light'},
                    {value: 'dark', right: '☾', title: 'Dark'},
                    {value: 'light-hc', right: '☼', title: 'High Contrast Light (beta)'},
                    {value: 'dark-hc', right: '☾', title: 'High Contrast Dark (beta)'},
                ],
                dynamicTitle: true,
            },
        },
        lang: {
            defaultValue: 'en',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    {value: 'en', right: '🇬🇧', title: 'En'},
                    {value: 'ru', right: '🇷🇺', title: 'Ru'},
                ],
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
