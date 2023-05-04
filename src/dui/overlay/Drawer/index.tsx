import React, { useCallback, useEffect, useState } from 'react'
import scss from '@/scss/dui/overlay/drawer.module.scss'
import cn from 'classnames/bind'
import { createPortal } from 'react-dom'
import Dui from '@/dui/types'

const cx = cn.bind(scss)

type ComponentClassName = 'root' | 'body' | 'backdrop'

export interface DrawerProps extends Dui.DefaultDivProps {
  open: boolean
  onClose: () => void
  position?: 'top' | 'bottom' | 'left' | 'right'
  lockScroll?: boolean
  closeOnClickBackdrop?: boolean
  closeOnEscape?: boolean
  transitionProps?: {
    duration?: number
    timingFunction?: string
  }
  classNames?: { [key in ComponentClassName]?: string }
}

function Base(
  {
    className,
    position = 'left',
    open,
    children,
    onClose,
    lockScroll = true,
    transitionProps = { duration: 100, timingFunction: 'ease' },
    closeOnClickBackdrop = true,
    closeOnEscape = true,
    classNames = {},
    ...props
  }: DrawerProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const transitionStyle: React.CSSProperties = {
    transformOrigin: `${position} center`,
    transitionDuration: `${transitionProps.duration}ms`,
    transitionTimingFunction: transitionProps.timingFunction,
  }

  const [element, setElement] = useState<HTMLElement | null>(null)
  const [isShow, setIsShow] = useState(open)

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    setElement(document.getElementById('portal'))
  }, [])

  useEffect(() => {
    if (closeOnEscape && open) document.addEventListener('keydown', onKeyPress)
    return () => document.removeEventListener('keydown', onKeyPress)
  }, [closeOnEscape, onKeyPress, open])

  useEffect(() => {
    const timeout = setTimeout(() => setIsShow(open), transitionProps.duration)
    return () => clearTimeout(timeout)
  }, [transitionProps.duration, open])

  useEffect(() => {
    if (document.body) {
      document.body.style.overflow = lockScroll && open ? 'hidden' : ''
    }
  }, [open, lockScroll])

  if (!element) return null

  return !open && !isShow
    ? null
    : createPortal(
        <div
          ref={ref}
          className={`${cx('root')} ${classNames.root ?? ''} ${
            className ?? ''
          }`}
          {...props}
        >
          <div
            role="dialog"
            className={`${cx('body')} ${classNames.body ?? ''}`}
            data-open={open && isShow}
            data-position={position}
            style={transitionStyle}
          >
            {children}
          </div>
          <div
            role="presentation"
            className={`${cx('backdrop')} ${classNames.backdrop ?? ''}`}
            style={transitionStyle}
            onClick={closeOnClickBackdrop ? onClose : undefined}
            data-open={open && isShow}
          ></div>
        </div>,
        document.getElementById('portal') as Element,
      )
}

const Drawer = React.forwardRef(Base)
Drawer.displayName = 'Drawer'

export default Drawer
