import React from 'react'

declare namespace Dui {
  export type CoreRef<T> = React.ForwardedRef<T>

  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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

  type DefaultSelectProps = Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'ref'
  >

  type DefaultTextareaProps = Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'ref'
  >

  type DefaultSvgProps = Omit<
    React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>,
    'ref'
  >

  type DefaultSpanProps = Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    'ref'
  >

  type DefaultDialogProps = Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    >,
    'ref'
  >
}

export = Dui
export as namespace Dui
