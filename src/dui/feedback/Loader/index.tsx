import React from 'react'
import scss from '@/scss/dui/feedback/loader.module.scss'
import cn from 'classnames/bind'
import Dui from '@/dui/types'

const cx = cn.bind(scss)

export interface LoaderProps extends Omit<Dui.DefaultSvgProps, 'children'> {
  color?: ThemeColor
  size?: number | string
}

function BaseLoader(
  { className = '', color = 'blue', size = 36, ...props }: LoaderProps,
  ref?: Dui.CoreRef<SVGSVGElement>,
) {
  const s = typeof size === 'number' ? `${0.0625 * size}rem` : size
  return (
    <svg
      ref={ref}
      className={`${cx('root', color)} ${className}`}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="blue"
      role="presentation"
      width={s}
      height={s}
      {...props}
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(2.5 2.5)" stroke-width="5">
          <circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle>
          <path d="M32 16c0-9.94-8.06-16-16-16">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 16"
              to="360 16 16"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </g>
      </g>
    </svg>
  )
}

const Loader = React.forwardRef(BaseLoader)
Loader.displayName = 'Loader'

export default Loader
