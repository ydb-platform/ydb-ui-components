import {DropdownMenuItemMixed} from '@yandex-cloud/uikit';

export type NavigationTreeNodeType = 'database' | 'directory' | 'table';

export interface NavigationTreeDataItem {
    name: string;
    type: NavigationTreeNodeType;
}

export interface NavigationTreeState {
    [path: string]: NavigationTreeNodeState;
}

export interface NavigationTreeNodeState {
    path: string;
    name: string;
    type: NavigationTreeNodeType;
    collapsed: boolean;
    loading: boolean;
    loaded: boolean;
    error: boolean;
    children: string[];
}

export interface NavigationTreeProps<D = any> {
    rootState: Omit<NavigationTreeNodeState, 'loading' | 'loaded' | 'error' | 'children'>;
    fetchPath: (path: string) => Promise<NavigationTreeDataItem[]>;
    getActions?: (path: string, type: NavigationTreeNodeType) => DropdownMenuItemMixed<D>[];
    activePath?: string;
    onActivePathUpdate?: (activePath: string) => void;
}
