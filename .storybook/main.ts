import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            setDisplayName: false,
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
        },
    },
    docs: {
        autodocs: true,
    },
    core: {
        disableTelemetry: true,
    },
    babel: (transformOptions) => {
        return {
            ...transformOptions,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            chrome: 100,
                        },
                    },
                ],
                '@babel/preset-typescript',
                ['@babel/preset-react', {runtime: 'automatic'}],
            ],
        };
    },
};

export default config;
