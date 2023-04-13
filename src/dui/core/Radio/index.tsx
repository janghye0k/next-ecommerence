import React, { forwardRef } from 'react'
import Dui from '@/dui/types'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/radio.module.scss'

const cx = cn.bind(scss)

type RadioComponentKeys = 'root' | 'label' | 'radio'

export interface RadioProps
  extends Omit<Dui.DefaultInputProps, 'type' | 'style' | 'size'> {
  labelPosition?: 'left' | 'right'
  classNames?: { [key in RadioComponentKeys]?: string }
  styles?: { [key in RadioComponentKeys]?: React.CSSProperties }
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor | 'theme'
}

function BaseRadio(
  {
    className,
    classNames,
    children,
    labelPosition = 'right',
    styles,
    size = 'sm',
    color,
    ...props
  }: RadioProps,
  ref?: Dui.CoreRef<HTMLInputElement>,
) {
  const isLeft = labelPosition === 'left'
  return (
    <div
      className={`${cx('root')}  ${className ?? ''} ${classNames?.root ?? ''}`}
      style={styles?.root}
    >
      <label
        className={`${cx('label')} ${classNames?.label ?? ''}`}
        style={styles?.label}
      >
        {isLeft ? children : null}
        <input
          className={cx('input', size, { [color as string]: !!color })}
          type="radio"
          ref={ref}
          {...props}
        />
        <span
          className={`${cx('radio')} ${classNames?.radio ?? ''}`}
          role="radio"
          aria-checked={props.checked}
          style={styles?.radio}
        >
          <span className={cx('circle')}></span>
        </span>
        {!isLeft ? children : null}
      </label>
    </div>
  )
}

const Radio = forwardRef(BaseRadio)
Radio.displayName = 'Radio'

export default Radio
