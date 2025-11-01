import type {DropdownMenuItemMixed} from '@gravity-ui/uikit';

export type NavigationTreeNodeType =
    | 'async_replication'
    | 'column_table'
    | 'resource_pool'
    | 'database'
    | 'directory'
    | 'external_data_source'
    | 'external_table'
    | 'index_table'
    | 'index'
    | 'stream'
    | 'system_table'
    | 'streaming_query'
    | 'table'
    | 'topic'
    | 'transfer'
    | 'view';

export interface NavigationTreeDataItem<M = unknown> {
    name: string;
    type: NavigationTreeNodeType;
    /** determined by type by default */
    expandable?: boolean;
    meta?: M;
}

export interface NavigationTreeState {
    [path: string]: NavigationTreeNodeState;
}

export interface NavigationTreeNodeState {
    path: string;
    name: string;
    type: NavigationTreeNodeType;
    /** determined by type by default */
    expandable?: boolean;
    collapsed: boolean;
    loading: boolean;
    loaded: boolean;
    error: boolean;
    children: string[];
    level?: number;
    meta?: unknown;
}

export interface NavigationTreeServiceNode {
    path: string;
    status: 'loading' | 'error' | 'empty';
    level?: number;
}

export type NavigationTreeNodePartialState = Omit<
    NavigationTreeNodeState,
    'loading' | 'loaded' | 'error' | 'children'
>;

export interface NavigationTreeProps<D = any, M = any> {
    rootState: NavigationTreeNodePartialState;
    fetchPath: (path: string) => Promise<NavigationTreeDataItem<M>[]>;
    onActionsOpenToggle?: (args: {
        path: string;
        type: NavigationTreeNodeType;
        isOpen: boolean;
    }) => void;
    getActions?: (
        path: string,
        type: NavigationTreeNodeType,
        meta: M,
    ) => DropdownMenuItemMixed<D>[];
    renderAdditionalNodeElements?: (
        path: string,
        type: NavigationTreeNodeType,
        meta: M,
    ) => JSX.Element | undefined;
    activePath?: string;
    onActivePathUpdate?: (activePath: string) => void;
    cache?: boolean;
    virtualize?: boolean;
}
