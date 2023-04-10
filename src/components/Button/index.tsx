/* eslint-disable react/button-has-type */
import React from 'react'
import classNames from 'classnames/bind'
import styles from '@/scss/components/button.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor
  variant?: 'solid' | 'ghost' | 'outline'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Button({
  children,
  className,
  size = 'md',
  variant = 'solid',
  leftIcon,
  rightIcon,
  color,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${cx(
        'main',
        `s-${size}`,
        `v-${variant}`,
        color ? `c-${color}` : '',
      )} ${className}`}
      {...props}
      data-shadow="dp02"
      data-shadow-in="dp04"
      data-shadow-on="dp08"
    >
      {leftIcon ? <span className={cx('iconbox')}>{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className={cx('iconbox')}>{rightIcon}</span> : null}
    </button>
  )
}

export default Button
