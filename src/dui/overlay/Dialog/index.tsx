import Dui from '@/dui/types'
import React, { useEffect, useState } from 'react'
import scss from '@/scss/dui/overlay/dialog.module.scss'
import cn from 'classnames/bind'
import { createPortal } from 'react-dom'

const cx = cn.bind(scss)

export interface DialogProps extends Dui.DefaultDivProps {
  open?: boolean
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  distance?: number | string
  animationProps?: { duration?: number; timingFunction?: string }
}

const POS_MAP = {
  'top-left': { bottom: 'auto', right: 'auto' },
  'top-center': { bottom: 'auto' },
  'top-right': { bottom: 'auto', left: 'auto' },
  'middle-left': { right: 'auto' },
  'middle-right': { left: 'auto' },
  'bottom-left': { top: 'auto', right: 'auto' },
  'bottom-center': { top: 'auto' },
  'bottom-right': { top: 'auto', left: 'auto' },
}

function Base(
  {
    className,
    children,
    open,
    style,
    position = 'bottom-right',
    distance = '2rem',
    animationProps = { duration: 200, timingFunction: 'ease' },
    ...props
  }: DialogProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const [vertical, horizontal] = position.split('-')
  const d = typeof distance === 'number' ? `${0.0625 * distance}rem` : distance
  const dialogStyle: React.CSSProperties = {
    top: d,
    left: d,
    right: d,
    bottom: d,
    transformOrigin: `${
      vertical === 'middle' ? 'center' : vertical
    } ${horizontal}`,
    animationDuration: `${animationProps.duration}ms`,
    animationTimingFunction: animationProps.timingFunction,
    ...(POS_MAP[position] ?? {}),
  }

  const [element, setElement] = useState<HTMLElement | null>(null)
  const [isShow, setIsShow] = useState(open)

  useEffect(() => {
    setElement(document.getElementById('portal'))
  }, [])

  useEffect(() => {
    if (open) {
      setIsShow(open)
    } else {
      const timeout = setTimeout(() => setIsShow(open), animationProps.duration)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [animationProps.duration, open])

  if (!element) return null

  return !isShow
    ? null
    : createPortal(
        <div
          ref={ref}
          className={`${cx('root', { open })} ${className ?? ''}`}
          style={{ ...dialogStyle, ...style }}
          {...props}
        >
          {children}
        </div>,
        document.getElementById('portal') as Element,
      )
}

const Dialog = React.forwardRef(Base)
Dialog.displayName = 'Dialog'

export default Dialog
