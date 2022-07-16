import type {
    NavigationTreeNodeState,
    NavigationTreeNodePartialState,
    NavigationTreeState,
    NavigationTreeServiceNode,
} from './types';
import {getServiceNode, traverseDFS} from './utils';

export enum NavigationTreeActionType {
    ToggleCollapsed = 'toggle-collapsed',
    StartLoading = 'start-loading',
    FinishLoading = 'finish-loading',
    ResetNode = 'reset-node',
}

export interface NavigationTreeAction {
    type: NavigationTreeActionType;
    payload: any;
}

export function getDefaultNodeState() {
    return {
        collapsed: true,
        loading: false,
        loaded: false,
        error: false,
        children: [],
    };
}

export function getNodeState(
    partialState: NavigationTreeNodePartialState,
): NavigationTreeNodeState {
    return {
        ...getDefaultNodeState(),
        expandable: partialState.type === 'database' || partialState.type === 'directory',
        ...partialState,
    };
}

export function reducer(state: NavigationTreeState = {}, action: NavigationTreeAction) {
    switch (action.type) {
        case NavigationTreeActionType.ToggleCollapsed:
            return {
                ...state,
                [action.payload.path]: {
                    ...state[action.payload.path],
                    collapsed: !state[action.payload.path].collapsed,
                },
            };
        case NavigationTreeActionType.StartLoading:
            return {
                ...state,
                [action.payload.path]: {
                    ...state[action.payload.path],
                    loading: true,
                    loaded: false,
                    error: false,
                    children: [],
                },
            };
        case NavigationTreeActionType.FinishLoading: {
            const newState: NavigationTreeState = {
                ...state,
                [action.payload.path]: {
                    ...state[action.payload.path],
                    loading: false,
                    loaded: Boolean(action.payload.data),
                    error: Boolean(action.payload.error),
                },
            };

            if (action.payload.data) {
                newState[action.payload.path].children = action.payload.data.map(
                    ({name}: {name: string}) => name,
                );

                for (const item of action.payload.data) {
                    const path = `${action.payload.path}/${item.name}`;

                    // expand the tree according to the active path
                    // prioritize the existing state to expand the tree only on first load
                    const {activePath = ''} = action.payload;
                    const collapsed = state[path]?.collapsed ?? !activePath.startsWith(`${path}/`);

                    newState[path] = getNodeState({
                        ...item,
                        collapsed,
                        path,
                    });
                }
            }

            return newState;
        }
        case NavigationTreeActionType.ResetNode:
            return {
                ...state,
                [action.payload.path]: {
                    ...state[action.payload.path],
                    ...getDefaultNodeState(),
                },
            };
        default:
            return state;
    }
}

export function selectTreeAsList(state: NavigationTreeState, rootPath: string) {
    const list: (NavigationTreeNodeState | NavigationTreeServiceNode)[] = [];

    traverseDFS(state, rootPath, (node, level) => {
        list.push({
            ...node,
            level,
        });

        const serviceNode = getServiceNode(node, level);
        if (serviceNode) {
            list.push(serviceNode);
        }
    });

    return list;
}
