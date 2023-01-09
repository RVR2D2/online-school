import React, { ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'

import { InputProps } from './Input.props'

import style from './Input.module.css'
import { spawn } from 'child_process'

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(className, style.inputWrapper)}>
				<input
					type='text'
					className={cn(style.input, {
						[style.error]: error,
					})}
					ref={ref}
					{...props}
				/>
				{error && <span className={style.errorMessage}>{error.message}</span>}
			</div>
		)
	}
)
