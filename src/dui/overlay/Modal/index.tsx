import React, { useCallback, useEffect, useState } from 'react'
import scss from '@/scss/dui/overlay/modal.module.scss'
import cn from 'classnames/bind'
import { createPortal } from 'react-dom'
import Dui from '@/dui/types'

const cx = cn.bind(scss)

export interface ModalProps extends Dui.DefaultDivProps {
  open: boolean
  onClose: () => void
  closeOnEscape?: boolean
  closeOnClickBackdrop?: boolean
  lockScroll?: boolean
  transitionProps?: {
    duration?: number
    timingFunction?: string
  }
}

function Base(
  {
    className,
    children,
    open,
    onClose,
    closeOnClickBackdrop = true,
    closeOnEscape = true,
    lockScroll = true,
    transitionProps = { duration: 100, timingFunction: 'ease' },
    ...props
  }: ModalProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const transitionStyle: React.CSSProperties = {
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

  return !isShow && !open ? null : (
    <div ref={ref} className={`${cx('root')} ${className ?? ''}`} {...props}>
      <div
        role="dialog"
        className={`${cx('body')}`}
        style={transitionStyle}
        data-open={open && isShow}
      >
        {children}
      </div>
      <div
        role="presentation"
        className={`${cx('backdrop')}`}
        style={transitionStyle}
        data-open={open && isShow}
        onClick={closeOnClickBackdrop ? onClose : undefined}
      ></div>
    </div>
  )
}

const Modal = React.forwardRef(Base)
Modal.displayName = 'Modal'

export default Modal
