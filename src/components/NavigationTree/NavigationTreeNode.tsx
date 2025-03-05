import React from 'react';

import {TreeView} from '../TreeView/TreeView';
import {AsyncReplicationIcon} from '../icons/AsyncReplication';
import {ColumnTableIcon} from '../icons/ColumnTable';
import {DatabaseIcon} from '../icons/Database';
import {ExternalDataSourceIcon} from '../icons/ExternalDataSource';
import {ExternalTableIcon} from '../icons/ExternalTable';
import {FolderIcon} from '../icons/Folder';
import {FolderOpenIcon} from '../icons/FolderOpen';
import {IndexIcon} from '../icons/Index';
import {ResourcePoolIcon} from '../icons/ResourcePool';
import {TableIcon} from '../icons/Table';
import {TopicIcon} from '../icons/Topic';
import {TransferIcon} from '../icons/Transfer';
import {ViewIcon} from '../icons/View';

import {NavigationTreeActionType} from './state';
import type {NavigationTreeAction} from './state';
import type {NavigationTreeNodeType, NavigationTreeProps, NavigationTreeState} from './types';

export interface NavigationTreeNodeProps {
    path: string;
    fetchPath: NavigationTreeProps['fetchPath'];
    activePath?: string;
    state: NavigationTreeState;
    level?: number;
    dispatch: React.Dispatch<NavigationTreeAction>;
    children?: React.ReactNode;
    onActivate?: (path: string) => void;
    getActions?: NavigationTreeProps['getActions'];
    onActionsOpenToggle?: NavigationTreeProps['onActionsOpenToggle'];
    renderAdditionalNodeElements?: NavigationTreeProps['renderAdditionalNodeElements'];
    cache?: boolean;
}

function renderIcon(type: NavigationTreeNodeType, collapsed: boolean) {
    switch (type) {
        case 'async_replication':
            return <AsyncReplicationIcon height={16} />;
        case 'transfer':
            return <TransferIcon height={16} />;
        case 'database':
            // this icon is larger than the others, therefore 14 for a better fit
            return <DatabaseIcon height={14} />;
        case 'directory':
            return collapsed ? <FolderIcon height={16} /> : <FolderOpenIcon height={16} />;
        case 'index':
            return <IndexIcon height={16} />;
        case 'table':
        case 'index_table':
            return <TableIcon height={16} />;
        case 'column_table':
            return <ColumnTableIcon height={16} />;
        case 'stream':
        case 'topic':
            return <TopicIcon height={16} />;
        case 'external_table':
            return <ExternalTableIcon height={16} />;
        case 'external_data_source':
            return <ExternalDataSourceIcon height={16} />;
        case 'view':
            return <ViewIcon height={16} />;
        case 'resource_pool':
            return <ResourcePoolIcon height={16} />;
        default:
            return null;
    }
}

export function NavigationTreeNode({
    path,
    fetchPath,
    activePath,
    state,
    level,
    dispatch,
    children,
    onActivate,
    getActions,
    onActionsOpenToggle,
    renderAdditionalNodeElements,
    cache,
}: NavigationTreeNodeProps) {
    const nodeState = state[path];

    React.useEffect(() => {
        if (nodeState.collapsed) {
            if (!cache) {
                dispatch({
                    type: NavigationTreeActionType.ResetNode,
                    payload: {path},
                });
            }

            return;
        }

        if (nodeState.loaded || nodeState.loading) {
            return;
        }

        dispatch({
            type: NavigationTreeActionType.StartLoading,
            payload: {path},
        });

        fetchPath(path)
            .then((data) => {
                dispatch({
                    type: NavigationTreeActionType.FinishLoading,
                    payload: {path, activePath, data},
                });
            })
            .catch((error) => {
                dispatch({
                    type: NavigationTreeActionType.ErrorLoading,
                    payload: {path, error},
                });
            });
    }, [nodeState.collapsed]);

    const handleClick = React.useCallback(() => {
        if (onActivate) {
            onActivate(path);
        }
    }, [path, onActivate]);

    const handleArrowClick = React.useCallback(() => {
        dispatch({type: NavigationTreeActionType.ToggleCollapsed, payload: {path}});
    }, [dispatch, path]);

    const additionalNodeElements = React.useMemo(() => {
        return renderAdditionalNodeElements?.(nodeState.path, nodeState.type);
    }, [renderAdditionalNodeElements, nodeState]);

    const actions = React.useMemo(() => {
        return getActions?.(nodeState.path, nodeState.type);
    }, [getActions, nodeState]);

    const handleActionsOpenToggle = React.useCallback(
        (isOpen: boolean) => {
            onActionsOpenToggle?.({
                path: nodeState.path,
                type: nodeState.type,
                isOpen,
            });
        },
        [nodeState.path, nodeState.type, onActionsOpenToggle],
    );

    return (
        <TreeView
            name={nodeState.name}
            icon={renderIcon(nodeState.type, nodeState.collapsed)}
            collapsed={nodeState.collapsed}
            active={nodeState.path === activePath}
            actions={actions}
            additionalNodeElements={additionalNodeElements}
            hasArrow={nodeState.expandable}
            onClick={handleClick}
            onArrowClick={handleArrowClick}
            onActionsOpenToggle={handleActionsOpenToggle}
            level={level}
        >
            {children}
        </TreeView>
    );
}
