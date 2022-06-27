import React from 'react';

import {NavigationTreeProps} from './types';
import {reducer, getNodeState} from './state';
import {NavigationTreeNode} from './NavigationTreeNode';
import {NavigationTreeDirectory} from './NavigationTreeDirectory';

export type {NavigationTreeProps};

export function NavigationTree({
    rootState: partialRootState,
    fetchPath,
    getActions,
    activePath,
    onActivePathUpdate,
    cache = true,
}: NavigationTreeProps) {
    const [state, dispatch] = React.useReducer(reducer, {
        [partialRootState.path]: getNodeState(partialRootState),
    });
    const rootState = state[partialRootState.path];

    return (
        <NavigationTreeNode
            path={rootState.path}
            state={state}
            dispatch={dispatch}
            active={rootState.path === activePath}
            onActivate={onActivePathUpdate}
            getActions={getActions}
        >
            <NavigationTreeDirectory
                state={state}
                dispatch={dispatch}
                path={rootState.path}
                fetchPath={fetchPath}
                activePath={activePath}
                onItemActivate={onActivePathUpdate}
                getActions={getActions}
                cache={cache}
            />
        </NavigationTreeNode>
    );
}
