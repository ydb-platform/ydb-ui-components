import React from 'react';

export function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={16}
            width={16}
            viewBox="0 0 16 16"
            fill="currentColor"
            {...props}
        >
            <path d="M13.2812 4.875H8.40625L6.78125 3.25H2.71875C2.0332 3.25 1.5 3.80859 1.5 4.46875V11.7812C1.5 12.4668 2.0332 13 2.71875 13H13.2812C13.9414 13 14.5 12.4668 14.5 11.7812V6.09375C14.5 5.43359 13.9414 4.875 13.2812 4.875Z" />
        </svg>
    );
}
