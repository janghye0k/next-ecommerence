import Dui from '@/dui/types'
import React, { forwardRef } from 'react'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/badge.module.scss'

const cx = cn.bind(scss)

interface BadgeProps extends Dui.DefaultDivProps {
  color?: ThemeColor
  size?: Dui.Size | number
  radius?: Dui.Size | number
  variant?: 'light' | 'filled' | 'outline' | 'dot'
}

function BaseBadge(
  {
    className = '',
    children,
    size = 'sm',
    color = 'black',
    radius = 'sm',
    variant = 'light',
    ...props
  }: BadgeProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  if (typeof radius === 'number' && radius < 0) {
    throw new Error(`Prop radius must be a positive integer`)
  }
  if (typeof size === 'number' && (size < 0 || size > 100)) {
    throw new Error('Prop size must be in range(0, 100)')
  }

  const s = typeof size === 'number' ? `s${size}` : size
  const r = typeof radius === 'number' ? `r${radius}` : radius

  return (
    <div className={`${cx('root')} ${className}`} ref={ref} {...props}>
      {variant === 'dot' ? <span className={cx('dot')}></span> : null}
      <span
        className={cx('body')}
        data-size={s}
        data-color={color}
        data-radius={r}
        data-variant={variant}
      >
        {children}
      </span>
    </div>
  )
}

const Badge = forwardRef(BaseBadge)
Badge.displayName = 'Badge'

export default Badge
