import React from 'react';

export function TopicIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={16}
            width={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            {...props}
        >
            <rect x="2" y="2.20001" width="9" height="2.5" rx="0.5" />
            <rect x="5" y="6.70001" width="9" height="2.5" rx="0.5" />
            <rect x="2" y="11.2" width="9" height="2.5" rx="0.5" />
        </svg>
    );
}
