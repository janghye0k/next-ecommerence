import React, { forwardRef } from 'react'
import Dui from '@/dui/types'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/select.module.scss'
import { FaChevronDown } from 'react-icons/fa'

export interface SelectProps extends Omit<Dui.DefaultSelectProps, 'size'> {
  color?: ThemeColor
  variant?: 'outline' | 'filled' | 'underline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  displaySize?: number
  error?: boolean
  disableError?: boolean
}

const cx = cn.bind(scss)

interface CoreSelect
  extends React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLSelectElement>
  > {
  Wrapper: typeof Wrapper
  Label: typeof Label
  Description: typeof Description
  Error: typeof Error
}

function BaseWrapper(
  { children, className, ...props }: Dui.DefaultDivProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div className={`${cx('wrapper')} ${className ?? ''}`} ref={ref} {...props}>
      {children}
    </div>
  )
}

function BaseLabel(
  { children, className, ...props }: Dui.DefaultLabelProps,
  ref?: Dui.CoreRef<HTMLLabelElement>,
) {
  return (
    <label className={`${cx('label')} ${className ?? ''}`} ref={ref} {...props}>
      {children}
    </label>
  )
}

function BaseDescription(
  { children, className, ...props }: Dui.DefaultDivProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div
      className={`${cx('description')} ${className ?? ''}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}

function BaseError(
  { children, className, ...props }: Dui.DefaultDivProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  return (
    <div className={`${cx('error')} ${className ?? ''}`} ref={ref} {...props}>
      {children}
    </div>
  )
}

function BaseSelect(
  {
    className,
    color,
    variant = 'outline',
    size = 'md',
    icon,
    displaySize,
    children,
    placeholder,
    error,
    disableError,
    ...props
  }: SelectProps,
  ref?: Dui.CoreRef<HTMLSelectElement>,
) {
  return (
    <div className={cx('container')}>
      <select
        className={`${cx('main', variant, size, {
          error,
          'invalid-none': disableError,
          [color as string]: !!color,
        })} ${className ?? ''}`}
        size={displaySize}
        ref={ref}
        {...props}
      >
        {!placeholder ? null : <option value="">{placeholder}</option>}
        {children}
      </select>
      {!icon ? null : <span className={cx('iconbox')}>{icon}</span>}
      <span className={cx('down')}>
        <FaChevronDown />
      </span>
    </div>
  )
}

const Wrapper = forwardRef(BaseWrapper)
const Label = forwardRef(BaseLabel)
const Description = forwardRef(BaseDescription)
const Error = forwardRef(BaseError)
const Select: CoreSelect = forwardRef(BaseSelect) as CoreSelect

Wrapper.displayName = 'Wrapper'
Label.displayName = 'Label'
Description.displayName = 'Description'
Error.displayName = 'Error'
Select.displayName = 'Select'

Select.Wrapper = Wrapper
Select.Label = Label
Select.Description = Description
Select.Error = Error

export default Select
