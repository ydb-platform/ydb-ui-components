import React from 'react';
import {Meta, Story} from '@storybook/react';
import {TreeView, TreeViewProps} from '../TreeView';

export default {
    title: 'TreeView',
    component: TreeView,
} as Meta<TreeViewProps>;

export const Default: Story<TreeViewProps> = () => (
    <TreeView name="Root" hasArrow collapsed={false}>
        <TreeView name="Folder 1" active hasArrow collapsed={false}>
            <TreeView name="Item 1" onClick={() => console.log(1)} />
        </TreeView>
        <TreeView name="Item 2" onClick={() => console.log(2)} />
    </TreeView>
);
