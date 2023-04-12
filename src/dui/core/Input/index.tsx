/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import classNames from 'classnames/bind'
import styles from '@/scss/dui/core/input.module.scss'
import Dui from '@/dui/types'

const cx = classNames.bind(styles)

export interface InputProps extends Omit<Dui.DefaultInputProps, 'size'> {
  type?: Dui.InputTypeAttribute
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'filled' | 'underline'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  disableValid?: boolean
  disableError?: boolean
}

interface CoreInput
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  > {
  Wrapper: typeof Wrapper
  Label: typeof Label
  Description: typeof Description
  Error: typeof Error
}

interface ContextState {
  error?: boolean
  setError: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const InputContext = createContext<ContextState>({} as ContextState)

function BaseWrapper(
  { children, className, ...props }: Dui.DefaultDivProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const [error, setError] = useState<boolean | undefined>(undefined)
  return (
    <InputContext.Provider value={{ error, setError }}>
      <div
        className={`${cx('wrapper', { error })} ${className ?? ''}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  )
}

const Wrapper = forwardRef(BaseWrapper)
Wrapper.displayName = 'Wrapper'

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

const Label = forwardRef(BaseLabel)
Label.displayName = 'Label'

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

const Description = forwardRef(BaseDescription)
Description.displayName = 'Description'

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

const Error = forwardRef(BaseError)
Error.displayName = 'Error'

function BaseInput(
  {
    className,
    type = 'text',
    size = 'md',
    placeholder = ' ',
    variant = 'outline',
    leftIcon,
    rightIcon,
    error,
    disableValid,
    disableError,
    ...props
  }: InputProps,
  ref?: Dui.CoreRef<HTMLInputElement>,
) {
  const { setError } = useContext(InputContext)

  useEffect(() => {
    if (!!setError) setError(error)
  }, [error, setError])

  const hasIcon = useMemo(
    () => !!leftIcon || !!rightIcon,
    [leftIcon, rightIcon],
  )

  const onClickInput = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const $input = event.currentTarget.querySelector('input')

    if ($input && document.activeElement !== $input) $input.focus()
  }, [])

  return !hasIcon ? (
    <input
      {...props}
      ref={ref}
      className={`${cx('input', variant, size, {
        'invalid-none': disableError,
        error,
        valid: !disableValid && !!props.pattern,
      })} ${className ?? ''}`}
      type={type}
      placeholder={placeholder}
    />
  ) : (
    <div className={cx('container')} onClick={onClickInput}>
      {!leftIcon ? null : (
        <span className={cx('iconbox', 'iconbox-left')}>{leftIcon}</span>
      )}
      <input
        {...props}
        className={`${cx('input', variant, size, {
          'invalid-none': disableError,
          error,
          valid: !disableValid && !!props.pattern,
          icl: !!leftIcon,
          icr: !!rightIcon,
        })} ${className ?? ''}`}
        type={type}
        placeholder={placeholder}
      />
      {!rightIcon ? null : (
        <span className={cx('iconbox', 'iconbox-right')}>{rightIcon}</span>
      )}
    </div>
  )
}

const Input: CoreInput = forwardRef(BaseInput) as CoreInput
Input.displayName = 'Input'
Input.Wrapper = Wrapper
Input.Label = Label
Input.Description = Description
Input.Error = Error

export default Input