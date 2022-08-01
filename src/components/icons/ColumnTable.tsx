import React from 'react';

export function ColumnTableIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
            <rect x="2" y="3" width="5" height="2.5" rx="0.5" />
            <rect x="2" y="7" width="5" height="2.5" rx="0.5" />
            <rect x="2" y="11" width="5" height="2.5" rx="0.5" />
            <rect x="9" y="3" width="5" height="2.5" rx="0.5" />
            <rect x="9" y="7" width="5" height="2.5" rx="0.5" />
            <rect x="9" y="11" width="5" height="2.5" rx="0.5" />
        </svg>
    );
}
