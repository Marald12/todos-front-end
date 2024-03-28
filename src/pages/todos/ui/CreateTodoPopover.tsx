'use client'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'
import { useForm } from 'react-hook-form'
import { ICreateTodo } from '@/shared/api/todo/todo.interface'
import { useQueryClient } from '@tanstack/react-query'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useState } from 'react'
import { createTodo } from '@/shared/api/todo/todo.api'
import { toast } from 'react-toastify'

export function CreateTodoPopover() {
	const [isDone, setIsDone] = useState(false)
	const queryClient = useQueryClient()
	const { register, handleSubmit } = useForm<ICreateTodo>()

	const submitHandler = async (data: ICreateTodo) => {
		await createTodo({
			todo: data.todo,
			title: data.title,
			isDone
		})
		toast.success('Вы успешно создали Todo')
		await queryClient.invalidateQueries({
			queryKey: ['user']
		})
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Создать todo</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<form className='grid gap-4' onSubmit={handleSubmit(submitHandler)}>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Создать Todo</h4>
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='title'>Заголовок</Label>
							<Input
								id='title'
								className='col-span-2 h-8'
								{...register('title')}
							/>
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='todo'>Дело</Label>
							<Input
								id='todo'
								{...register('todo')}
								className='col-span-2 h-8'
							/>
						</div>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='isDone'>Выполнено ли</Label>
							<Checkbox
								id='isDone'
								onCheckedChange={checked => setIsDone(Boolean(checked))}
								checked={isDone}
							/>
						</div>
					</div>
					<div className='grid gap-3'>
						<Button type='submit'>Создать</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	)
}
