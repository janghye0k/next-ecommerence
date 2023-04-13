import React, { forwardRef } from 'react'
import Dui from '@/dui/types'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/checkbox.module.scss'
import { FaCheck } from 'react-icons/fa'

const cx = cn.bind(scss)

type CheckboxComponentKeys = 'root' | 'label' | 'checkbox'

export interface CheckboxProps
  extends Omit<Dui.DefaultInputProps, 'type' | 'style' | 'size'> {
  labelPosition?: 'left' | 'right'
  classNames?: { [key in CheckboxComponentKeys]?: string }
  styles?: { [key in CheckboxComponentKeys]?: React.CSSProperties }
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ThemeColor | 'theme'
  icon?: React.ReactNode
}

function BaseCheckbox(
  {
    className,
    classNames,
    children,
    labelPosition = 'right',
    styles,
    size = 'sm',
    color,
    icon,
    ...props
  }: CheckboxProps,
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
          type="checkbox"
          ref={ref}
          {...props}
        />
        <span
          className={`${cx('checkbox')} ${classNames?.checkbox ?? ''}`}
          role="checkbox"
          aria-checked={props.checked}
          style={styles?.checkbox}
        >
          {icon ?? <FaCheck />}
        </span>
        {!isLeft ? children : null}
      </label>
    </div>
  )
}

const Checkbox = forwardRef(BaseCheckbox)
Checkbox.displayName = 'Checkbox'

export default Checkbox
