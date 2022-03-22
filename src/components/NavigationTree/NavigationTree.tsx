import React from 'react';

import {NavigationTreeProps} from './types';
import {reducer, getDefaultNodeState} from './state';
import {NavigationTreeNode} from './NavigationTreeNode';
import {NavigationTreeDirectory} from './NavigationTreeDirectory';

export {NavigationTreeProps};

export function NavigationTree({
    rootState: partialRootState,
    fetchPath,
    getActions,
    activePath,
    onActivePathUpdate,
}: NavigationTreeProps) {
    const [state, dispatch] = React.useReducer(reducer, {
        [partialRootState.path]: {
            ...getDefaultNodeState(),
            ...partialRootState,
        },
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
                path=""
                fetchPath={fetchPath}
                activePath={activePath}
                onItemActivate={onActivePathUpdate}
                getActions={getActions}
            />
        </NavigationTreeNode>
    );
}
