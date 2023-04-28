import React from 'react'
import scss from '@/scss/dui/feedback/notification.module.scss'
import cn from 'classnames/bind'
import Dui from '@/dui/types'
import { MdClose } from 'react-icons/md'

const cx = cn.bind(scss)

type ComponentClass = 'root' | 'body' | 'icon' | 'title' | 'content'

export interface NotificationProps extends Omit<Dui.DefaultDivProps, 'title'> {
  color?: ThemeColor
  size?: 'sm' | 'md' | 'lg'
  title?: string
  icon?: React.ReactNode
  withCloseButton?: boolean
  closeButtonProps?: Dui.DefaultButtonProps
  classNames?: { [key in ComponentClass]?: string }
}

function BaseNotification(
  {
    className = '',
    classNames = {},
    title,
    icon,
    size = 'md',
    color = 'blue',
    withCloseButton,
    closeButtonProps,
    children,
    ...props
  }: NotificationProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={`${cx('root', color, size)} ${
        classNames.root ?? ''
      } ${className}`}
      {...props}
    >
      {!icon ? null : (
        <div className={`${cx('icon')} ${classNames.icon ?? ''}`}>{icon}</div>
      )}
      <div className={`${cx('body')} ${classNames.body ?? ''}`}>
        {!title ? null : (
          <div className={`${cx('title')} ${classNames.title ?? ''}`}>
            {title}
          </div>
        )}
        <div className={`${cx('content')} ${classNames.content ?? ''}`}>
          {children}
        </div>
      </div>
      <button type="button" className={cx('close')} {...closeButtonProps}>
        <MdClose />
      </button>
    </div>
  )
}

const Notification = React.forwardRef(BaseNotification)
Notification.displayName = 'Notification'

export default Notification
