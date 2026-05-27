import type {
    NavigationTreeDataItem,
    NavigationTreeNodePartialState,
    NavigationTreeNodeState,
    NavigationTreeServiceNode,
    NavigationTreeState,
} from './types';
import {getServiceNode, traverseDFS} from './utils';

export enum NavigationTreeActionType {
    ToggleCollapsed = 'toggle-collapsed',
    StartLoading = 'start-loading',
    FinishLoading = 'finish-loading',
    ErrorLoading = 'error-loading',
    ResetNode = 'reset-node',
}

export type NavigationTreeAction =
    | {
          type: NavigationTreeActionType.ToggleCollapsed;
          payload: {
              path: string;
          };
      }
    | {
          type: NavigationTreeActionType.StartLoading;
          payload: {
              path: string;
          };
      }
    | {
          type: NavigationTreeActionType.FinishLoading;
          payload: {
              path: string;
              activePath?: string;
              data: NavigationTreeDataItem[];
          };
      }
    | {
          type: NavigationTreeActionType.ErrorLoading;
          payload: {
              path: string;
              error: unknown;
          };
      }
    | {
          type: NavigationTreeActionType.ResetNode;
          payload: {
              path: string;
          };
      };

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
            const currentNode = state[action.payload.path];
            // Ignore stale results: the node was reset (e.g. collapsed with `cache: false`,
            // which dispatches `ResetNode`) or removed entirely while the fetch was in flight.
            // `StartLoading` is the only action that sets `loading: true`, and `ResetNode` clears it,
            // so a missing node or `loading === false` means this resolution no longer applies.
            // Note: a plain collapse with `cache: true` keeps `loading: true`, so the fetch is
            // still allowed to complete and populate the cache — that's intentional.
            if (!currentNode || !currentNode.loading) {
                return state;
            }

            const newState: NavigationTreeState = {
                ...state,
                [action.payload.path]: {
                    ...currentNode,
                    loading: false,
                    loaded: Boolean(action.payload.data),
                    error: false,
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

            if (!action.payload.data || action.payload.data.length === 0) {
                newState[action.payload.path] = {
                    ...newState[action.payload.path],
                    expandable: false,
                    collapsed: true,
                };
            }

            return newState;
        }
        case NavigationTreeActionType.ErrorLoading: {
            const currentNode = state[action.payload.path];
            // Ignore stale errors: the node was reset (e.g. collapsed with `cache: false`,
            // which dispatches `ResetNode`) or removed entirely while the fetch was in flight.
            // See the matching note on `FinishLoading` above.
            if (!currentNode || !currentNode.loading) {
                return state;
            }

            return {
                ...state,
                [action.payload.path]: {
                    ...currentNode,
                    loading: false,
                    loaded: false,
                    error: true,
                },
            };
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
