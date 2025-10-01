import React from 'react';

export function TableIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={16}
            width={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.01033 3.79551C2.11275 2.787 2.96447 2 4 2H7.3H8.8H12C13.1046 2 14 2.89543 14 4V5.5V8.2002V9.7002V12C14 13.1046 13.1046 14 12 14H8.8H7.3H4C2.89543 14 2 13.1046 2 12V9.7002V8.2002V5.5V4C2 3.93096 2.0035 3.86275 2.01033 3.79551ZM8.8 12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V9.7002H8.8V12.5ZM7.3 9.7002V12.5H4.5C3.94772 12.5 3.5 12.0523 3.5 11.5V9.7002H7.3ZM8.8 8.2002H12.5V5.5H8.8L8.8 8.2002ZM7.3 5.5L7.3 8.2002H3.5V5.5H7.3Z"
            />
        </svg>
    );
}
