import React from 'react';

import {NavigationTreeState, NavigationTreeProps} from './types';
import {NavigationTreeAction, NavigationTreeActionType} from './state';
import {NavigationTreeNode} from './NavigationTreeNode';
import {LoaderView} from './LoaderView/LoaderView';
import {ErrorView} from './ErrorView/ErrorView';
import {EmptyView} from './EmptyView/EmptyView';

export interface NavigationTreeDirectoryProps {
    state: NavigationTreeState;
    dispatch: React.Dispatch<NavigationTreeAction>;
    path: string;
    fetchPath: NavigationTreeProps['fetchPath'];
    activePath?: string;
    onItemActivate?: (itemPath: string) => void;
    getActions?: NavigationTreeProps['getActions'];
    cache?: boolean;
}

export function NavigationTreeDirectory({
    state,
    dispatch,
    path,
    fetchPath,
    activePath,
    onItemActivate,
    getActions,
    cache,
}: NavigationTreeDirectoryProps) {
    const nodeState = state[path];

    React.useEffect(() => {
        if ((nodeState.loaded && cache) || nodeState.loading) {
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
                    type: NavigationTreeActionType.FinishLoading,
                    payload: {path, error},
                });
            });
    }, []);

    if (nodeState.loading) {
        return <LoaderView />;
    }

    if (nodeState.error) {
        return <ErrorView />;
    }

    if (nodeState.loaded && nodeState.children.length > 0) {
        return (
            <React.Fragment>
                {nodeState.children.map((childName) => {
                    const childPath = `${path}/${childName}`;
                    let children;

                    if (state[childPath].type === 'directory') {
                        children = (
                            <NavigationTreeDirectory
                                state={state}
                                dispatch={dispatch}
                                path={childPath}
                                fetchPath={fetchPath}
                                activePath={activePath}
                                onItemActivate={onItemActivate}
                                getActions={getActions}
                                cache={cache}
                            />
                        );
                    }

                    return (
                        <NavigationTreeNode
                            key={childPath}
                            path={childPath}
                            state={state}
                            dispatch={dispatch}
                            active={childPath === activePath}
                            onActivate={onItemActivate}
                            getActions={getActions}
                            children={children}
                        />
                    );
                })}
            </React.Fragment>
        );
    }

    return <EmptyView />;
}
