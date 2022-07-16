import React from 'react';
import {Meta, Story} from '@storybook/react';
import {NavigationTreeDataItem, NavigationTreeNodeType} from '../types';
import {NavigationTree, NavigationTreeProps} from '../NavigationTree';

export default {
    title: 'NavigationTree',
    component: NavigationTree,
} as Meta<NavigationTreeProps>;

export const Default: Story<NavigationTreeProps> = () => {
    const [activePath, setActivePath] = React.useState('');

    return (
        <NavigationTree
            rootState={{
                path: '',
                name: 'ru/maps/maps_prod',
                type: 'database',
                collapsed: false,
            }}
            fetchPath={fetchPath}
            getActions={getActions}
            activePath={activePath}
            onActivePathUpdate={setActivePath}
        />
    );
};

export const Virtualized: Story<NavigationTreeProps> = () => {
    const [activePath, setActivePath] = React.useState('');

    return (
        <NavigationTree
            rootState={{
                path: '',
                name: 'ru/maps/maps_prod',
                type: 'database',
                collapsed: false,
            }}
            fetchPath={fetchPathWithLargeResults}
            getActions={getActions}
            activePath={activePath}
            onActivePathUpdate={setActivePath}
            virtualize
        />
    );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPath(path: string) {
    let items: NavigationTreeDataItem[] = [];
    console.log(`Fetching "${path}"...`);

    await sleep(1000);

    if (path === '') {
        items = [
            {
                name: 'folder_1',
                type: 'directory',
            },
            {
                name: 'folder_2',
                type: 'directory',
            },
            {
                name: 'folder_3',
                type: 'directory',
            },
            {
                name: 'table_1',
                type: 'table',
            },
            {
                name: 'table_2',
                type: 'table',
            },
            {
                name: 'table_3',
                type: 'table',
            },
        ];
    }

    if (path === '/folder_1') {
        items = [];
    }

    if (path === '/folder_2') {
        throw new Error('Ошибка');
    }

    if (path === '/folder_3') {
        items = [
            {
                name: 'table_3_1',
                type: 'table',
            },
            {
                name: 'table_3_2',
                type: 'table',
            },
            {
                name: 'table_3_3',
                type: 'table',
            },
        ];
    }

    return items;
}

async function fetchPathWithLargeResults(path: string) {
    let items: NavigationTreeDataItem[] = [];
    console.log(`Fetching "${path}"...`);

    await sleep(1000);

    if (path === '') {
        items = [
            {
                name: '200_items',
                type: 'directory',
            },
            {
                name: 'folder_with_error',
                type: 'directory',
            },
            {
                name: '10000_items',
                type: 'directory',
            },
            {
                name: 'table_1',
                type: 'table',
            },
            {
                name: 'table_2',
                type: 'table',
            },
            {
                name: 'table_3',
                type: 'table',
            },
        ];
    }

    if (path === '/200_items') {
        items = [];
        for (let i = 1; i < 200; i++) {
            items.push({
                name: `item_${i}`,
                type: 'table',
            });
        }
    }

    if (path === '/folder_with_error') {
        throw new Error('Ошибка');
    }

    if (path === '/10000_items') {
        items = [];
        for (let i = 1; i < 10000; i++) {
            items.push({
                name: `item_${i}`,
                type: 'table',
            });
        }
    }

    return items;
}

function getActions(path: string, type: NavigationTreeNodeType) {
    if (type === 'directory') {
        return [{text: 'Show Directory', action: () => alert(`Directory path is "${path}"`)}];
    }

    if (type === 'table') {
        return [{text: 'Show Table', action: () => alert(`Table path is "${path}"`)}];
    }

    return [];
}
