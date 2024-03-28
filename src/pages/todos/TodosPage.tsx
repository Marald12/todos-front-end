'use client'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/shared/api/user/user.api'
import TodoItem from '@/pages/todos/ui/TodoItem'
import { CreateTodoPopover } from '@/pages/todos/ui/CreateTodoPopover'

const TodosPage: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: () => getProfile()
	})

	if (!data && isLoading) return <div>Loading</div>

	return (
		<div>
			<div className='flex justify-between'>
				{!data?.todos.length ? (
					<h1 className='text-2xl'>Ваш список Todo пуст</h1>
				) : (
					<h1 className='text-2xl'>Ваши Todo:</h1>
				)}
				<CreateTodoPopover />
			</div>
			{data?.todos.map(todo => <TodoItem key={todo._id} todo={todo} />)}
		</div>
	)
}

export default TodosPage
