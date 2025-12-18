import React from 'react';

import type {DropdownMenuItemMixed} from '@gravity-ui/uikit';
import {ActionTooltip, DropdownMenu} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import './TreeView.scss';

export interface TreeViewProps {
    children?: React.ReactNode;
    name: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    collapsed?: boolean;
    active?: boolean;
    onClick?: () => void;
    onArrowClick?: () => void;
    onActionsOpenToggle?: (isOpen: boolean) => void;
    hasArrow?: boolean;
    actions?: DropdownMenuItemMixed<any>[];
    additionalNodeElements?: JSX.Element;
    level?: number;
}

const TREE_LEVEL_CSS_VAR = '--ydb-tree-view-level';

const b = block('ydb-tree-view');

export function TreeView({
    children,
    name,
    title,
    icon,
    collapsed = true,
    active = false,
    onClick,
    onArrowClick,
    onActionsOpenToggle,
    hasArrow = false,
    actions,
    additionalNodeElements,
    level,
}: TreeViewProps) {
    const handleClick = React.useCallback<React.MouseEventHandler>(
        (event) => {
            if (!onClick) return;

            const shouldSkip = event.nativeEvent
                .composedPath()
                .some(
                    (target) =>
                        target instanceof HTMLElement &&
                        ((target.nodeName === 'BUTTON' && !target.hasAttribute('disabled')) ||
                            (target.hasAttribute('tabindex') && target.tabIndex > -1)),
                );

            if (!shouldSkip) onClick();
        },
        [onClick],
    );

    const handleArrowClick = onArrowClick || onClick;

    /**
     * These `className`s are left here for backward compatibility of CSS selectors.
     * @link https://github.com/ydb-platform/ydb-ui-components/pull/64
     */
    const itemClassName = 'tree-view_item';
    let arrowClassName = 'tree-view_arrow';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
        arrowClassName += ' tree-view_arrow-collapsed';
        containerClassName += ' tree-view_children-collapsed';
    }

    const tooltipContent = title ?? (typeof name === 'string' ? name : '');

    return (
        <div className={b()} style={{[TREE_LEVEL_CSS_VAR]: level} as React.CSSProperties}>
            <div className="tree-view">
                <div className={`${itemClassName} ${b('item', {active})}`} onClick={handleClick}>
                    <button
                        type="button"
                        className={`${arrowClassName} ${b('arrow', {
                            collapsed,
                            hidden: !hasArrow,
                        })}`}
                        disabled={!handleArrowClick}
                        onClick={handleArrowClick}
                    />
                    <div className={b('content')}>
                        <div className={b('label')}>
                            <ActionTooltip title={tooltipContent}>
                                <div className={b('label-content')}>
                                    {icon && <div className={b('icon')}>{icon}</div>}
                                    <div className={b('text')}>{name}</div>
                                </div>
                            </ActionTooltip>
                        </div>
                        {actions && actions.length > 0 && (
                            <div className={b('actions')}>
                                {additionalNodeElements}
                                <DropdownMenu
                                    onOpenToggle={onActionsOpenToggle}
                                    defaultSwitcherProps={{
                                        view: 'flat-secondary',
                                        size: 's',
                                        pin: 'brick-brick',
                                    }}
                                    items={actions}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={`${containerClassName} ${b('container', {collapsed})}`}>
                    {collapsed ? null : children}
                </div>
            </div>
        </div>
    );
}
