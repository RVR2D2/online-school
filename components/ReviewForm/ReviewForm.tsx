import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import cn from 'classnames'

import { ReviewFormProps } from './ReviewForm.props'
import { IReviewForm } from './ReviewForm.interface'

import style from './ReviewForm.module.css'

import { Input, Rating, Textarea, Button } from '../../components'

import CloseIcon from '../../assets/icons/close.svg'

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>()

	const onSubmit = (data: IReviewForm) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(style.reviewForm, className)} {...props}>
				<Input {...register('name')} placeholder='Имя' />
				<Input
					{...register('title')}
					placeholder='Заголовок отзыва'
					className={style.title}
				/>
				<div className={style.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description')}
					placeholder='Текст отзыва'
					className={style.description}
				/>
				<div className={style.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={style.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
				</div>
				<CloseIcon className={style.close} />
			</div>
		</form>
	)
}
