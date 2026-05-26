import React from 'react';

import ReactList from 'react-list';

import {EmptyView} from './EmptyView/EmptyView';
import {ErrorView} from './ErrorView/ErrorView';
import {LoaderView} from './LoaderView/LoaderView';
import {NavigationTreeNode} from './NavigationTreeNode';
import {NavigationTreeActionType, getNodeState, reducer, selectTreeAsList} from './state';
import type {
    NavigationTreeNodeState,
    NavigationTreeProps,
    NavigationTreeServiceNode,
} from './types';
import {isServiceNode} from './utils';

export type {NavigationTreeProps};

export interface NavigationTreeHandle {
    /**
     * Scrolls the currently active node into view (if any).
     * Has no effect if there is no active node or it is not present in the tree.
     */
    scrollToActive: () => void;
}

const renderServiceNode = (node: NavigationTreeServiceNode) => {
    const key = `${node.path}|${node.status}`;

    if (node.status === 'loading') {
        return <LoaderView key={key} level={node.level} />;
    }

    if (node.status === 'error') {
        return <ErrorView key={key} level={node.level} />;
    }

    return <EmptyView key={key} level={node.level} />;
};

function NavigationTreeInner<D = any, M = any>(
    {
        rootState: partialRootState,
        fetchPath,
        getActions,
        renderAdditionalNodeElements,
        activePath,
        onActionsOpenToggle,
        onActivePathUpdate,
        cache = true,
        virtualize = false,
    }: NavigationTreeProps<D, M>,
    ref: React.ForwardedRef<NavigationTreeHandle>,
) {
    const [state, dispatch] = React.useReducer(reducer, {
        [partialRootState.path]: getNodeState(partialRootState),
    });
    const nodesList = React.useMemo(
        () => selectTreeAsList(state, partialRootState.path),
        [partialRootState.path, state],
    );
    const nodesToLoad = React.useMemo(
        () =>
            nodesList.filter(
                (node): node is NavigationTreeNodeState =>
                    !isServiceNode(node) &&
                    !node.collapsed &&
                    !node.loaded &&
                    !node.loading &&
                    !node.error,
            ),
        [nodesList],
    );
    const reactListRef = React.useRef<ReactList>(null);
    const activeItemRef = React.useRef<HTMLDivElement>(null);
    const activeNodeIndex = React.useMemo(
        () => nodesList.findIndex((node) => !isServiceNode(node) && node.path === activePath),
        [activePath, nodesList],
    );
    const scrolledActivePathRef = React.useRef<string | undefined>(undefined);

    const scrollToActive = React.useCallback(() => {
        if (activeNodeIndex < 0) return;

        if (virtualize) {
            reactListRef.current?.scrollAround(activeNodeIndex);
        } else {
            activeItemRef.current?.scrollIntoView({block: 'nearest'});
        }
    }, [activeNodeIndex, virtualize]);

    React.useImperativeHandle(ref, () => ({scrollToActive}), [scrollToActive]);

    React.useEffect(() => {
        nodesToLoad.forEach((node) => {
            dispatch({
                type: NavigationTreeActionType.StartLoading,
                payload: {path: node.path},
            });

            fetchPath(node.path)
                .then((data) => {
                    dispatch({
                        type: NavigationTreeActionType.FinishLoading,
                        payload: {path: node.path, activePath, data},
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: NavigationTreeActionType.ErrorLoading,
                        payload: {path: node.path, error},
                    });
                });
        });
    }, [activePath, dispatch, fetchPath, nodesToLoad]);

    React.useEffect(() => {
        if (scrolledActivePathRef.current === activePath) return;
        if (activeNodeIndex < 0) return;

        scrollToActive();
        scrolledActivePathRef.current = activePath;
    }, [activeNodeIndex, activePath, scrollToActive]);

    const renderNode = (node: NavigationTreeNodeState) => {
        const isActive = node.path === activePath;
        return (
            <NavigationTreeNode
                key={node.path}
                state={state}
                path={node.path}
                activePath={activePath}
                dispatch={dispatch}
                onActivate={onActivePathUpdate}
                getActions={getActions}
                onActionsOpenToggle={onActionsOpenToggle}
                renderAdditionalNodeElements={renderAdditionalNodeElements}
                cache={cache}
                level={node.level}
                activeItemRef={isActive ? activeItemRef : undefined}
            />
        );
    };

    const renderVirtualizedTree = () => (
        <ReactList
            ref={reactListRef}
            type="uniform"
            length={nodesList.length}
            useStaticSize
            itemRenderer={(index) => {
                const node = nodesList[index];
                return isServiceNode(node) ? renderServiceNode(node) : renderNode(node);
            }}
        />
    );

    const renderSimpleTree = () => (
        <React.Fragment>
            {nodesList.map((node) =>
                isServiceNode(node) ? renderServiceNode(node) : renderNode(node),
            )}
        </React.Fragment>
    );

    return virtualize ? renderVirtualizedTree() : renderSimpleTree();
}

/**
 * `React.forwardRef` loses generics, so we cast to preserve the `<D, M>` API.
 */
export const NavigationTree = React.forwardRef(NavigationTreeInner) as <D = any, M = any>(
    props: NavigationTreeProps<D, M> & {ref?: React.ForwardedRef<NavigationTreeHandle>},
) => ReturnType<typeof NavigationTreeInner>;
