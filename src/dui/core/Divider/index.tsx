import Dui from '@/dui/types'
import React, { forwardRef, useMemo } from 'react'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/divider.module.scss'

const cx = cn.bind(scss)

export interface DividerProps extends Omit<Dui.DefaultDivProps, 'role'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  textColor?: ThemeColor | 'theme'
  variant?: 'solid' | 'dashed' | 'dotted'
  orientation?: 'vertical' | 'horizontal'
}

function BaseDivider(
  {
    className = '',
    children,
    size = 'xs',
    variant,
    textColor = '' as ThemeColor,
    orientation,
    ...props
  }: DividerProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  if (size < 1 || size > 30) {
    throw new Error('Prop size must be in range(1, 30)')
  }

  const s = useMemo(
    () => (typeof size === 'number' ? `s${size}` : size),
    [size],
  )

  return (
    <div
      className={`${cx(
        'root',
        s,
        variant ?? '',
        textColor,
        orientation ?? '',
      )} ${className}`}
      ref={ref}
      role="separator"
      {...props}
    >
      {!children || orientation === 'vertical' ? null : (
        <div className={cx('text')}>{children}</div>
      )}
    </div>
  )
}

const Divider = forwardRef(BaseDivider)
Divider.displayName = 'Divider'

export default Divider
