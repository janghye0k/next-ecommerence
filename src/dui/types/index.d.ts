import React from 'react'

declare namespace Dui {
  export type CoreRef<T> = React.ForwardedRef<T>

  type InputTypeAttribute =
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'
    | 'datetime-local'
    | 'date'
    | 'month'
    | 'week'
    | 'time'

  type DefaultInputProps = Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'ref'
  >

  type DefaultDivProps = Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  >

  type DefaultButtonProps = Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'ref'
  >

  type DefaultLabelProps = Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'ref'
  >
}

export = Dui
export as namespace Dui
