import React, { forwardRef } from 'react'
import Dui from '@/dui/types'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/switch.module.scss'

const cx = cn.bind(scss)

type SwitchComponentKeys = 'root' | 'label' | 'switch'

export interface SwitchProps
  extends Omit<Dui.DefaultInputProps, 'type' | 'style' | 'size'> {
  labelPosition?: 'left' | 'right'
  classNames?: { [key in SwitchComponentKeys]?: string }
  styles?: { [key in SwitchComponentKeys]?: React.CSSProperties }
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor | 'theme'
}

function BaseSwitch(
  {
    className,
    classNames,
    children,
    labelPosition = 'right',
    styles,
    size = 'sm',
    color,
    ...props
  }: SwitchProps,
  ref?: Dui.CoreRef<HTMLInputElement>,
) {
  const isLeft = labelPosition === 'left'
  return (
    <div
      className={`${cx('root')}  ${className ?? ''} ${classNames?.root ?? ''}`}
      style={styles?.root}
    >
      <label
        htmlFor={props.id}
        className={`${cx('label')} ${classNames?.label ?? ''}`}
        style={styles?.label}
      >
        {isLeft ? children : null}
        <input
          className={cx('input', size, { [color as string]: !!color })}
          type="checkbox"
          ref={ref}
          {...props}
        />
        <span
          className={`${cx('switch')} ${classNames?.switch ?? ''}`}
          role="checkbox"
          aria-checked={props.checked}
          style={styles?.switch}
        >
          <span className={cx('circle')}></span>
        </span>
        {!isLeft ? children : null}
      </label>
    </div>
  )
}

const Switch = forwardRef(BaseSwitch)
Switch.displayName = 'Switch'

export default Switch
