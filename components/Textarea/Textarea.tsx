import React, { ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'

import { TextareaProps } from './Textarea.props'

import style from './Textarea.module.css'

export const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cn(style.textareaWrapper, className)}>
				<textarea
					className={cn(style.textarea, {
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
