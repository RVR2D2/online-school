import React, { ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'

import { InputProps } from './Input.props'

import style from './Input.module.css'

export const Input = forwardRef(
	(
		{ className, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<input
				type='text'
				className={cn(className, style.input)}
				ref={ref}
				{...props}
			/>
		)
	}
)
