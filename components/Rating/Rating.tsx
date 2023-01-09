import {
	ForwardedRef,
	Fragment,
	KeyboardEvent,
	forwardRef,
	useEffect,
	useState,
} from 'react'
import cn from 'classnames'

import { RatingProps } from './Rating.props'

import style from './Rating.module.css'
import StarIcon from '../../assets/icons/star.svg'

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		)

		useEffect(() => {
			constructRating(rating)
		}, [rating])

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						className={cn(style.star, {
							[style.filled]: i < currentRating,
							[style.editable]: isEditable,
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : -1}
							onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
								isEditable && handleSpace(i + 1, e)
							}
						/>
					</span>
				)
			})

			setRatingArray(updatedArray)
		}

		const changeDisplay = (i: number) => {
			if (!isEditable) {
				return
			}

			constructRating(i)
		}

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return
			}

			setRating(i)
		}

		const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
			if (e.code !== 'Space' || !setRating) {
				return
			}

			setRating(i)
		}

		return (
			<div {...props} ref={ref}>
				{ratingArray.map((r, i) => (
					<Fragment key={i}>{r}</Fragment>
				))}
			</div>
		)
	}
)
