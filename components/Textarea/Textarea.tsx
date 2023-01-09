import React, { ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'

import { TextareaProps } from './Textarea.props'

import style from './Textarea.module.css'

export const Textarea = forwardRef(
	(
		{ className, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<textarea className={cn(className, style.input)} ref={ref} {...props} />
		)
	}
)
