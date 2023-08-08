import {DropdownMenuItemMixed} from '@gravity-ui/uikit';

export type NavigationTreeNodeType =
    | 'database'
    | 'directory'
    | 'table'
    | 'column_table'
    | 'index_table'
    | 'index'
    | 'topic'
    | 'external_table'
    | 'external_data_source';

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
    getActions?: (path: string, type: NavigationTreeNodeType) => DropdownMenuItemMixed<D>[];
    renderAdditionalNodeElements?: (path: string, type: NavigationTreeNodeType) => JSX.Element | undefined;
    activePath?: string;
    onActivePathUpdate?: (activePath: string) => void;
    cache?: boolean;
    virtualize?: boolean;
}
