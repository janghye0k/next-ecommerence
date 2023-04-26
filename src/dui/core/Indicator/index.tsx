import Dui from '@/dui/types'
import React from 'react'
import scss from '@/scss/dui/core/indicator.module.scss'
import cn from 'classnames/bind'

const cx = cn.bind(scss)

export interface IndicatorProps extends Dui.DefaultDivProps {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  size?: number
  color?: ThemeColor
  label?: string | number
  disabled?: boolean
}

function getTranslate(vertical: string, horizontal: string) {
  const y = vertical === 'end' ? '50%' : '-50%'
  const x = horizontal === 'right' ? '50%' : '-50%'
  return `translate(${x}, ${y})`
}

function getPostiton(vertical: string, horizontal: string) {
  const value: { [key: string]: number | string } = {}
  if (vertical !== 'middle') {
    value[vertical] = 0
  } else {
    value.top = '50%'
  }
  if (horizontal !== 'center') {
    value[horizontal] = 0
  } else {
    value.left = '50%'
  }

  return value
}

function BaseIndicator(
  {
    className = '',
    children,
    position = 'top-right',
    size = 10,
    color = 'blue',
    label,
    disabled = false,
    ...props
  }: IndicatorProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const s = `${size * 0.0625}rem`
  const fontSize = `${(size - 4) * 0.0625}rem`
  const borderRadius = `${(size * 0.0625) / 2}rem`
  const [y, x] = position.split('-')

  const style: { [key: string]: number | string | undefined } = {
    minWidth: s,
    height: s,
    fontSize,
    borderRadius,
    paddingInline: label ? '0.25rem' : label,
    transform: getTranslate(y, x),
    ...getPostiton(y, x),
  }

  return (
    <div ref={ref} className={`${cx('root')} ${className}`} {...props}>
      <div className={cx('indicator', color, { disabled })} style={style}>
        {label}
      </div>
      {children}
    </div>
  )
}

const Indicator = React.forwardRef(BaseIndicator)
Indicator.displayName = 'Indicator'

export default Indicator
