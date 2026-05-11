import './Button.css'
import clsx from "clsx";
import type {ButtonHTMLAttributes, ReactNode} from "react";

export type ButtonProps = {
    variant?: 'outline' | 'link' | 'destructive' | 'ghost' | 'secondary';
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: ReactNode;
    className?: string
}

export function Button({variant, children, onClick, disabled, type, className}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'button',
                variant ? `button-${variant}` : 'button-default',
                className
            )}>
            {children}
        </button>
    )
}
