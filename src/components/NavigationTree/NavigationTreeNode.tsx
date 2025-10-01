import React from 'react';

import {TreeView} from '../TreeView/TreeView';
import {
    AsyncReplicationIcon,
    ColumnTableIcon,
    DatabaseIcon,
    ExternalDataSourceIcon,
    ExternalTableIcon,
    FolderIcon,
    FolderOpenIcon,
    ResourcePoolIcon,
    TableIcon,
    TableIndexIcon,
    TopicIcon,
    TransferIcon,
    ViewIcon,
} from '../icons';

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
            return <AsyncReplicationIcon />;
        case 'transfer':
            return <TransferIcon />;
        case 'database':
            return <DatabaseIcon />;
        case 'directory':
            return collapsed ? <FolderIcon /> : <FolderOpenIcon />;
        case 'index':
            return <TableIndexIcon />;
        case 'table':
        case 'index_table':
        case 'system_table':
            return <TableIcon />;
        case 'column_table':
            return <ColumnTableIcon />;
        case 'stream':
        case 'topic':
            return <TopicIcon />;
        case 'external_table':
            return <ExternalTableIcon />;
        case 'external_data_source':
            return <ExternalDataSourceIcon />;
        case 'view':
            return <ViewIcon />;
        case 'resource_pool':
            return <ResourcePoolIcon />;
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

        if (nodeState.loaded || nodeState.loading || nodeState.error) {
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
    }, [
        activePath,
        cache,
        dispatch,
        fetchPath,
        nodeState.collapsed,
        nodeState.loaded,
        nodeState.loading,
        nodeState.error,
        path,
    ]);

    const handleClick = React.useCallback(() => {
        if (onActivate) {
            onActivate(path);
        }
    }, [path, onActivate]);

    const handleArrowClick = React.useCallback(() => {
        dispatch({type: NavigationTreeActionType.ToggleCollapsed, payload: {path}});
    }, [dispatch, path]);

    const additionalNodeElements = React.useMemo(() => {
        return renderAdditionalNodeElements?.(nodeState.path, nodeState.type, nodeState.meta);
    }, [renderAdditionalNodeElements, nodeState]);

    const actions = React.useMemo(() => {
        return getActions?.(nodeState.path, nodeState.type, nodeState.meta);
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
