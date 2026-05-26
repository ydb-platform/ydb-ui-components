import React from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {NavigationTree} from '../NavigationTree';
import type {NavigationTreeHandle, NavigationTreeProps} from '../NavigationTree';
import type {NavigationTreeDataItem, NavigationTreeNodeType} from '../types';

export default {
    parameters: {
        controls: {expanded: true},
    },
    title: 'NavigationTree',
    component: NavigationTree,
    args: {
        cache: true,
        virtualize: false,
        rootState: {
            path: '',
            name: 'ru/maps/maps_prod',
            type: 'database',
            collapsed: false,
        },
        getActions: getActions,
    },
    argTypes: {
        rootState: {
            control: false,
        },
        fetchPath: {
            control: false,
        },
        getActions: {
            control: false,
        },
        renderAdditionalNodeElements: {
            control: false,
        },
        activePath: {
            control: false,
        },
        onActivePathUpdate: {
            control: false,
        },
    },
} as Meta<NavigationTreeProps>;

const navigationTreeContainerStyle: React.CSSProperties = {
    height: 400,
    overflow: 'auto',
};

const scrollActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 12,
};

const Template: StoryFn<NavigationTreeProps> = (props) => {
    const [activePath, setActivePath] = React.useState('');

    return (
        <div style={navigationTreeContainerStyle}>
            <NavigationTree {...props} activePath={activePath} onActivePathUpdate={setActivePath} />
        </div>
    );
};

export const Default: Meta<NavigationTreeProps> = {
    component: NavigationTree,
    render: (props) => {
        return <Template {...props} />;
    },
    args: {
        fetchPath: fetchPath,
        renderAdditionalNodeElements: renderAdditionalNodeElements,
    },
};

export const Virtualized: Meta<NavigationTreeProps> = {
    component: NavigationTree,
    render: (props) => {
        return <Template {...props} />;
    },
    args: {
        fetchPath: fetchPathWithLargeResults,
        virtualize: true,
    },
};

const ScrollToActiveVirtualizedTemplate: StoryFn<NavigationTreeProps> = (props) => {
    const [activePath, setActivePath] = React.useState('/item_500');
    const navigationTreeRef = React.useRef<NavigationTreeHandle>(null);

    return (
        <React.Fragment>
            <div style={scrollActionsStyle}>
                <Button size="s" onClick={() => setActivePath('/item_5')}>
                    Select top item
                </Button>
                <Button size="s" onClick={() => setActivePath('/item_500')}>
                    Select middle item
                </Button>
                <Button size="s" onClick={() => setActivePath('/item_995')}>
                    Select bottom item
                </Button>
                <Button
                    size="s"
                    view="action"
                    onClick={() => navigationTreeRef.current?.scrollToActive()}
                >
                    Scroll to selected
                </Button>
            </div>
            <div style={navigationTreeContainerStyle}>
                <NavigationTree
                    {...props}
                    ref={navigationTreeRef}
                    activePath={activePath}
                    onActivePathUpdate={setActivePath}
                />
            </div>
        </React.Fragment>
    );
};

export const VirtualizedScrollToActive: Meta<NavigationTreeProps> = {
    component: NavigationTree,
    render: (props) => {
        return <ScrollToActiveVirtualizedTemplate {...props} />;
    },
    args: {
        fetchPath: fetchFlatLargeList,
        virtualize: true,
        rootState: {
            path: '',
            name: 'flat_1000_items',
            type: 'directory',
            collapsed: false,
        },
    },
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
                expandable: true,
            },
            {
                name: 'column_table',
                type: 'column_table',
            },
            {
                name: 'topic',
                type: 'topic',
            },
            {
                name: 'table',
                type: 'table',
            },
            {
                name: 'replication',
                type: 'async_replication',
            },
            {
                name: 'transfer',
                type: 'transfer',
            },
            {
                name: 'external_table',
                type: 'external_table',
            },
            {
                name: 'external_data_source',
                type: 'external_data_source',
            },
            {
                name: 'streaming_query',
                type: 'streaming_query',
            },
            {
                name: 'view',
                type: 'view',
            },
            {
                name: 'resource_pool',
                type: 'resource_pool',
            },
        ];
    }

    if (path === '/folder_1') {
        items = [];
    }

    if (path === '/folder_2') {
        throw new Error('Fetch error.');
    }

    if (path === '/folder_3') {
        items = [
            {
                name: 'table_3_1',
                type: 'index',
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

    if (path === '/table_1') {
        items = [
            {
                name: 'table_1_index',
                type: 'index',
                expandable: true,
            },
            {
                name: 'stream',
                type: 'stream',
            },
        ];
    }

    if (path === '/table_1/table_1_index') {
        items = [
            {
                name: 'table_1_index_impl',
                type: 'index_table',
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

async function fetchFlatLargeList(path: string) {
    console.log(`Fetching "${path}"...`);

    await sleep(500);

    if (path === '') {
        const items: NavigationTreeDataItem[] = [];
        for (let i = 1; i <= 1000; i++) {
            items.push({
                name: `item_${i}`,
                type: 'table',
            });
        }
        return items;
    }

    return [];
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

function renderAdditionalNodeElements(path: string, type: NavigationTreeNodeType) {
    if (type === 'directory') {
        return (
            <Button
                onClick={() => {
                    alert(`Directory path is "${path}"`);
                }}
                size="s"
            >
                Show Directory
            </Button>
        );
    }

    if (type === 'table') {
        return (
            <Button
                onClick={() => {
                    alert(`Table path is "${path}"`);
                }}
                size="s"
            >
                Show Table
            </Button>
        );
    }

    return undefined;
}
