import Dui from '@/dui/types'
import React from 'react'
import scss from '@/scss/dui/feedback/skeleton.module.scss'
import cn from 'classnames/bind'

const cx = cn.bind(scss)

export interface SkeletonProps extends Omit<Dui.DefaultDivProps, 'cildren'> {
  height: number | string
  width?: number | string
  circle?: boolean
  radius?: number
  animate?: boolean
}

function Base(
  {
    className,
    width,
    height,
    circle = false,
    radius,
    animate = true,
    style,
    ...props
  }: SkeletonProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const h = typeof height === 'number' ? `${0.0625 * height}rem` : height
  const w = circle
    ? h
    : typeof width === 'number'
    ? `${0.0625 * width}rem`
    : width
  const r = circle ? h : radius ? `${0.0625 * radius}rem` : radius

  return (
    <div
      ref={ref}
      className={`${cx('root', { animate })} ${className ?? ''}`}
      style={{ ...style, width: w, height: h, borderRadius: r }}
      {...props}
    ></div>
  )
}

const Skeleton = React.forwardRef(Base)
Skeleton.displayName = 'Skeleton'

export default Skeleton
