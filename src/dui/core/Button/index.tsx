/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react'
import classNames from 'classnames/bind'
import styles from '@/scss/dui/core/button.module.scss'
import Dui from '@/dui/types'

const cx = classNames.bind(styles)

interface ButtonProps extends Dui.DefaultButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor
  variant?: 'solid' | 'ghost' | 'outline'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function BaseButton(
  {
    children,
    className,
    size = 'md',
    variant = 'solid',
    leftIcon,
    rightIcon,
    color,
    ...props
  }: ButtonProps,
  ref?: Dui.CoreRef<HTMLButtonElement>,
) {
  return (
    <button
      className={`${cx('main', size, variant, {
        [color as string]: !!color,
      })} ${className || ''}`}
      {...props}
      ref={ref}
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

const Button = forwardRef(BaseButton)
Button.displayName = 'Button'

export default Button
