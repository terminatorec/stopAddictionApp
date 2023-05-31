import React from 'react';

interface ButtonProps {
    label: string;
    onClickFunc?: any;
    small?: boolean;
    url?: string;
}

const Button = ({ label, onClickFunc, small, url }: ButtonProps) => {
    if (url) {
        return (
            <button className={`${small && 'small-d-2'} d-2`}>
                <a target={'_blank'} className="link" href={url}>
                    {label}
                </a>
            </button>
        );
    } else {
        return (
            <button className={`${small && 'small-d-2'} d-2`} onClick={() => onClickFunc()}>
                {label}
            </button>
        );
    }
};

export default Button;
