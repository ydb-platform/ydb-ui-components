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
    | 'table'
    | 'topic'
    | 'transfer'
    | 'view';

export interface NavigationTreeDataItem {
    name: string;
    type: NavigationTreeNodeType;
    /** determined by type by default */
    expandable?: boolean;
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

export interface NavigationTreeProps<D = any> {
    rootState: NavigationTreeNodePartialState;
    fetchPath: (path: string) => Promise<NavigationTreeDataItem[]>;
    onActionsOpenToggle?: (args: {
        path: string;
        type: NavigationTreeNodeType;
        isOpen: boolean;
    }) => void;
    getActions?: (path: string, type: NavigationTreeNodeType) => DropdownMenuItemMixed<D>[];
    renderAdditionalNodeElements?: (
        path: string,
        type: NavigationTreeNodeType,
    ) => JSX.Element | undefined;
    activePath?: string;
    onActivePathUpdate?: (activePath: string) => void;
    cache?: boolean;
    virtualize?: boolean;
}
