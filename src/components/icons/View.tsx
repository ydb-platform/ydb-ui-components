import React from 'react';

export function ViewIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.625 2H7.49951C6.47457 2.77006 5.7552 3.92488 5.55588 5.25H1.625V7.6875H5.79193C6.48417 9.6186 8.33076 11 10.5 11C10.877 11 11.2443 10.9583 11.5974 10.8792L12.7748 12.5799C12.4905 13.0601 11.9665 13.375 11.375 13.375H1.625C0.710938 13.375 0 12.6641 0 11.75V3.625C0 2.73633 0.710938 2 1.625 2ZM1.625 11.75V9.3125H5.6875V11.75H1.625Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4411 8.71106C14.0985 7.9983 14.5 7.04604 14.5 6C14.5 3.79086 12.7091 2 10.5 2C8.29086 2 6.5 3.79086 6.5 6C6.5 8.20914 8.29086 10 10.5 10C11.0316 10 11.5389 9.89631 12.0029 9.70806L14.2807 12.9981C14.5557 13.3955 15.1008 13.4946 15.4981 13.2195C15.8955 12.9444 15.9946 12.3993 15.7195 12.002L13.4411 8.71106ZM12.5 6C12.5 7.10457 11.6046 8 10.5 8C9.39543 8 8.5 7.10457 8.5 6C8.5 4.89543 9.39543 4 10.5 4C11.6046 4 12.5 4.89543 12.5 6Z"
            />
        </svg>
    );
}