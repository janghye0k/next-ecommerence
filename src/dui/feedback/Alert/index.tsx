import React, { ReactNode } from 'react'
import scss from '@/scss/dui/feedback/alert.module.scss'
import cn from 'classnames/bind'
import Dui from '@/dui/types'
import { MdClose } from 'react-icons/md'

type ComponentClassName = 'root' | 'icon' | 'body' | 'title' | 'content'

export interface AlertProps extends Omit<Dui.DefaultDivProps, 'title'> {
  color?: ThemeColor
  icon?: ReactNode
  withCloseButton?: boolean
  title?: ReactNode
  classNames?: { [key in ComponentClassName]?: string }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'outline' | 'filled'
  closeButtonProps?: Dui.DefaultSpanProps
}

const cx = cn.bind(scss)

function BaseAlert(
  {
    classNames = {},
    className = '',
    children,
    color = 'blue',
    size = 'md',
    icon,
    title,
    variant = 'light',
    closeButtonProps = {},
    withCloseButton = false,
    ...props
  }: AlertProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={`${cx('root', color, size, variant)} ${
        classNames.root ?? ''
      } ${className}`}
      {...props}
    >
      <div className={`${cx('body')} ${classNames.body ?? ''}`}>
        {!icon ? null : (
          <div className={`${cx('icon')} ${classNames.icon ?? ''}`}>{icon}</div>
        )}
        <div className={cx('container')}>
          <div className={`${cx('title')} ${classNames.title ?? ''}`}>
            <span>{title}</span>
            {!withCloseButton ? null : (
              <span className={cx('close')} {...closeButtonProps}>
                <MdClose />
              </span>
            )}
          </div>
          <div className={`${cx('content')} ${classNames.content ?? ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const Alert = React.forwardRef(BaseAlert)
Alert.displayName = 'Alert'

export default Alert
