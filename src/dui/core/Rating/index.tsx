import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import cn from 'classnames/bind'
import scss from '@/scss/dui/core/rating.module.scss'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import Dui from '@/dui/types'

type RatingScore = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
type RatingComponent = 'root' | 'body' | 'star'

export interface RatingProps extends Dui.DefaultDivProps {
  classNames?: { [key in RatingComponent]: string }
  defaultValue?: RatingScore
  value?: RatingScore
  size?: Dui.Size
  color?: ThemeColor
  colors?: [ThemeColor, ThemeColor, ThemeColor, ThemeColor, ThemeColor]
  name?: string
  precision?: boolean
  selectedOnly?: boolean
  icon?: React.ReactNode
  icons?: [
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
  ]
  onChangeValue?: (value: number) => void
}

const cx = cn.bind(scss)

function BaseRating(
  {
    classNames,
    className,
    size = 'md',
    value,
    defaultValue,
    name,
    color = 'yellow',
    colors,
    precision,
    selectedOnly,
    icon,
    onChangeValue,
    icons,
    ...props
  }: RatingProps,
  ref?: Dui.CoreRef<HTMLDivElement>,
) {
  const randomId = useId()
  const groupName = useMemo(() => name ?? randomId, [name, randomId])
  const useHalf = useMemo(
    () => !icon && !icons && precision,
    [icon, icons, precision],
  )

  const [score, setScore] = useState<number>(value ?? defaultValue ?? 0)
  const [hover, setHover] = useState<number | undefined>()

  const onChangeStar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation()
      event.preventDefault()
      setScore(Number(event.currentTarget.value))
    },
    [],
  )

  const onEnterIcon = useCallback(
    (num: number) => (event: React.MouseEvent<HTMLElement>) => {
      if (selectedOnly) return
      event.preventDefault()
      setHover(num)
    },
    [selectedOnly],
  )
  const onLeaveIcon = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (selectedOnly) return
      event.preventDefault()
      setHover(undefined)
    },
    [selectedOnly],
  )

  useEffect(() => {
    onChangeValue?.(score)
  }, [onChangeValue, score])

  return (
    <div
      className={`${cx('root')} ${className ?? ''} ${classNames?.root ?? ''}`}
      ref={ref}
      {...props}
    >
      <div
        className={cx('body', size, {
          'select-only': selectedOnly,
          body: !!classNames?.body,
        })}
        onMouseLeave={onLeaveIcon}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const number = index + 1
          const startId = `${groupName}-start-${number}`
          const halfScore = number - 0.5

          const compare = hover ?? score

          return (
            <span
              key={startId}
              className={cx('star', { star: !!classNames?.star })}
            >
              <label
                className={cx('icon', colors?.[index] || color, {
                  on: selectedOnly ? compare === number : compare >= number,
                })}
                htmlFor={startId}
                onMouseEnter={onEnterIcon(number)}
              >
                <input
                  id={startId}
                  className={cx('radio')}
                  name={groupName}
                  type="radio"
                  value={number}
                  onChange={onChangeStar}
                />

                {icons?.[index] ?? icon ?? <FaStar className={cx('full')} />}
              </label>
              {!useHalf ? null : (
                <label
                  className={cx('icon', color, {
                    on: selectedOnly
                      ? compare === halfScore
                      : compare >= halfScore,
                  })}
                  htmlFor={`half${startId}`}
                  onMouseEnter={onEnterIcon(halfScore)}
                >
                  <input
                    id={`half${startId}`}
                    className={cx('radio')}
                    name={groupName}
                    type="radio"
                    value={halfScore}
                    onChange={onChangeStar}
                  />
                  <span>
                    <FaStarHalf className={cx('half')} />
                  </span>
                </label>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

const Rating = forwardRef(BaseRating)
Rating.displayName = 'Rating'

export default Rating
