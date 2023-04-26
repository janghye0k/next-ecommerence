import React from 'react'
import Dui from '@/dui/types/index'
import scss from '@/scss/dui/core/typography.module.scss'
import cn from 'classnames/bind'

const cx = cn.bind(scss)

interface BaseProps {
  color?: ThemeColor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export type TextProps = BaseProps & Dui.DefaultDivProps

function BaseText(
  { className = '', children, color, size = 'md', ...props }: TextProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div
      className={`${cx('text', color ?? '')} ${className}`}
      data-dui-fs={size}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}

const Text = React.forwardRef(BaseText)
Text.displayName = 'Text'

export type TitleProps = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
  'ref'
> &
  BaseProps & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

function BaseTitle(
  { className = '', color, size = 'md', as = 'h2', ...props }: TitleProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return React.createElement(as, {
    ref,
    className: `${cx('title', color ?? '')} ${className}`,
    'data-dui-fs': size,
    ...props,
  })
}

const Title = React.forwardRef(BaseTitle)
Title.displayName = 'Title'

export { Text, Title }
