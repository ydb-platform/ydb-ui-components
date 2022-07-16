import type {
    NavigationTreeNodeState,
    NavigationTreeServiceNode,
    NavigationTreeState,
} from './types';

export function isServiceNode(
    node: NavigationTreeNodeState | NavigationTreeServiceNode,
): node is NavigationTreeServiceNode {
    return 'status' in node;
}

export function getServiceNode(
    node: NavigationTreeNodeState,
    level: number,
): NavigationTreeServiceNode | void {
    if (node.collapsed) {
        return undefined;
    }

    if (node.loading) {
        return {
            path: node.path,
            status: 'loading',
            level: level + 1,
        };
    }

    if (node.error) {
        return {
            path: node.path,
            status: 'error',
            level: level + 1,
        };
    }

    if (node.loaded && node.children.length === 0) {
        return {
            path: node.path,
            status: 'empty',
            level: level + 1,
        };
    }

    return undefined;
}

type TraverseDFSVisit = (
    node: NavigationTreeNodeState,
    level: number,
    path: string,
    state: NavigationTreeState,
) => void;

export function traverseDFS(
    state: NavigationTreeState,
    path: string,
    visit: TraverseDFSVisit,
    level = 0,
) {
    const currentNode = state[path];

    if (!currentNode) {
        return;
    }

    visit(currentNode, level, path, state);

    if (currentNode.collapsed) {
        return;
    }

    for (const childPath of currentNode.children) {
        traverseDFS(state, `${path}/${childPath}`, visit, level + 1);
    }
}
