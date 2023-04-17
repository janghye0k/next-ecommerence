import Dui from '@/dui/types'
import React, { forwardRef, useId, useMemo } from 'react'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/breadcrumbs.module.scss'

const cx = cn.bind(scss)

type ComponentName = 'root' | 'body' | 'item' | 'separator'

export interface BreadcrumbsProps extends Dui.DefaultDivProps {
  size?: Dui.Size
  color?: ThemeColor
  separator?: React.ReactNode
  spacing?: number | string
  classNames?: { [key in ComponentName]?: string }
}

function Base(
  {
    classNames = {},
    className = '',
    size = 'md',
    color,
    children,
    separator = '/',
    spacing,
    ...props
  }: BreadcrumbsProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const randomId = useId()
  const space = useMemo(
    () => (typeof spacing === 'number' ? `${spacing}px` : spacing),
    [spacing],
  )

  return (
    <div
      className={`${cx('root', classNames.root ?? '')} ${className}`}
      ref={ref}
      {...props}
    >
      <ul
        className={cx('body', size, classNames.body ?? '', {
          [color as string]: !!color,
        })}
        aria-label="breadcrumbs"
      >
        {(Array.isArray(children) ? children : [children]).map(
          (item, index) => {
            const key = `${randomId}-${index}`
            return (
              <React.Fragment key={key}>
                <li className={cx('item', classNames.item ?? '')}>{item}</li>
                <span
                  className={cx('separator', classNames.separator ?? '')}
                  style={space ? { padding: `0 ${space}` } : undefined}
                  role="presentation"
                >
                  {separator}
                </span>
              </React.Fragment>
            )
          },
        )}
      </ul>
    </div>
  )
}

const Breadcrumbs = forwardRef(Base)
Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
