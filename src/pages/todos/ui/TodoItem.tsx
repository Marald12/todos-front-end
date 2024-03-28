'use client'
import * as React from 'react'
import { FC, useState } from 'react'
import { ITodo } from '@/shared/api/todo/todo.interface'

import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo, updateTodo } from '@/shared/api/todo/todo.api'
import { toast } from 'react-toastify'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Label } from '@/shared/components/ui/label'

interface IProps {
	todo: ITodo
}

const TodoItem: FC<IProps> = ({ todo }) => {
	const queryClient = useQueryClient()
	const [isDone, setIsDone] = useState<boolean>(todo.isDone)

	const { mutateAsync, data } = useMutation({
		mutationFn: (id: string) => deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user']
			})
		}
	})

	const clickHandler = async () => {
		await mutateAsync(todo._id)
		toast.success(data)
	}

	const checkedChangeHandler = async (e: CheckedState) => {
		setIsDone(Boolean(e))
		const update = await updateTodo(todo._id, { isDone: !isDone })
		console.log(update)
		await queryClient.invalidateQueries({
			queryKey: ['user']
		})
	}

	return (
		<Card className='w-[350px] my-5'>
			<CardHeader>
				<CardTitle>{todo.title}</CardTitle>
				<CardDescription>{todo.todo}</CardDescription>
			</CardHeader>

			<CardFooter className='flex justify-between'>
				<div className='flex'>
					<Label htmlFor='isDone' className='mr-3'>
						Выполнено ли:
					</Label>
					<Checkbox
						id='isDone'
						checked={isDone}
						onCheckedChange={e => checkedChangeHandler(e)}
					/>
				</div>
				<Button onClick={clickHandler}>Удалить</Button>
			</CardFooter>
		</Card>
	)
}

export default TodoItem
