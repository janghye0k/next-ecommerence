import React, { forwardRef, useState } from 'react'
import Dui from '@/dui/types'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/burger.module.scss'

const cx = cn.bind(scss)

interface BurgerProps extends Dui.DefaultButtonProps {
  open?: boolean
  variant?: 'solid' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor
}

function Base(
  {
    className = '',
    open,
    variant = 'ghost',
    size = 'md',
    color = '' as ThemeColor,
    ...props
  }: BurgerProps,
  ref?: Dui.CoreRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${cx('button', variant, size, color)} ${className}`}
      {...props}
    >
      <div className={cx('bar')} data-open={open}></div>
    </button>
  )
}

const Burger = forwardRef(Base)
Burger.displayName = 'Burger'

export default Burger
