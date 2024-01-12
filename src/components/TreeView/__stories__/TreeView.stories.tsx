import {Button} from '@gravity-ui/uikit';
import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';
import {TreeView, TreeViewProps} from '../TreeView';

export default {
    title: 'TreeView',
    component: TreeView,
} as Meta<TreeViewProps>;

export const Default: Story<TreeViewProps> = () => {
    const [state, setState] = useState<Record<string, boolean>>({'0': true});

    return (
        <TreeView
            name="Root"
            hasArrow
            collapsed={!state['0']}
            actions={[{text: 'Show Directory', action: console.log}]}
            additionalNodeElements={
                <Button size="s" onClick={console.log}>
                    Make
                </Button>
            }
            onClick={() =>
                setState((current) => ({
                    ...current,
                    '0': !current['0'],
                }))
            }
        >
            <TreeView
                name="Folder 1"
                active
                hasArrow
                collapsed={!state['1']}
                onClick={() =>
                    setState((current) => ({
                        ...current,
                        '1': !current['1'],
                    }))
                }
            >
                <TreeView
                    name="Item 1"
                    collapsed={!state['1-1']}
                    onClick={() =>
                        setState((current) => ({
                            ...current,
                            '1-1': !current['1-1'],
                        }))
                    }
                />
            </TreeView>
            <TreeView
                name="Item 2"
                collapsed={!state['2']}
                onClick={() =>
                    setState((current) => ({
                        ...current,
                        '2': !current['2'],
                    }))
                }
            />
        </TreeView>
    );
};
