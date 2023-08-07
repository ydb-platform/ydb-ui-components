import React from 'react';
import ReactList from 'react-list';

import type {
    NavigationTreeNodeState,
    NavigationTreeProps,
    NavigationTreeServiceNode,
} from './types';
import {reducer, getNodeState, selectTreeAsList} from './state';
import {isServiceNode} from './utils';

import {NavigationTreeNode} from './NavigationTreeNode';
import {LoaderView} from './LoaderView/LoaderView';
import {ErrorView} from './ErrorView/ErrorView';
import {EmptyView} from './EmptyView/EmptyView';

export type {NavigationTreeProps};

const renderServiceNode = (node: NavigationTreeServiceNode) => {
    const key = `${node.path}|${node.status}`;

    if (node.status === 'loading') {
        return <LoaderView key={key} level={node.level} />;
    }

    if (node.status === 'error') {
        return <ErrorView key={key} level={node.level} />;
    }

    return <EmptyView key={key} level={node.level} />;
};

export function NavigationTree({
    rootState: partialRootState,
    fetchPath,
    getActions,
    getOptions,
    activePath,
    onActivePathUpdate,
    cache = true,
    virtualize = false,
}: NavigationTreeProps) {
    const [state, dispatch] = React.useReducer(reducer, {
        [partialRootState.path]: getNodeState(partialRootState),
    });
    const nodesList = React.useMemo(() => selectTreeAsList(state, partialRootState.path), [state]);

    const renderNode = (node: NavigationTreeNodeState) => {
        return (
            <NavigationTreeNode
                key={node.path}
                state={state}
                path={node.path}
                activePath={activePath}
                fetchPath={fetchPath}
                dispatch={dispatch}
                onActivate={onActivePathUpdate}
                getActions={getActions}
                getOptions={getOptions}
                cache={cache}
                level={node.level}
            />
        );
    };

    const renderVirtualizedTree = () => (
        <ReactList
            type="uniform"
            length={nodesList.length}
            useStaticSize
            itemRenderer={(index) => {
                const node = nodesList[index];
                return isServiceNode(node) ? renderServiceNode(node) : renderNode(node);
            }}
        />
    );

    const renderSimpleTree = () => (
        <>
            {nodesList.map((node) =>
                isServiceNode(node) ? renderServiceNode(node) : renderNode(node),
            )}
        </>
    );

    return virtualize ? renderVirtualizedTree() : renderSimpleTree();
}
