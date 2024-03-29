import React from 'react';

export function IndexIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.24935 2.94323L8.5 9.5H12.1L11.1446 14.2772C11.0322 14.839 11.7994 15.1177 12.0738 14.6147L15.9111 7.57956C16.1765 7.09311 15.8244 6.5 15.2703 6.5H12.9L13.5325 3.33728C13.6192 2.90413 13.2879 2.5 12.8461 2.5H9.74611C9.49194 2.5 9.27821 2.69069 9.24935 2.94323ZM7.40003 10.5L8.25717 3H1.625C0.710938 3 0 3.73633 0 4.625V12.75C0 13.6641 0.710938 14.375 1.625 14.375H10.1517C10.1538 14.2803 10.1646 14.1822 10.1848 14.0811L10.901 10.5H7.40003ZM5.6875 8.6875V6.25H1.625V8.6875H5.6875ZM1.625 10.3125V12.75H5.6875V10.3125H1.625Z"
            />
        </svg>
    );
}
