'use client'
import { Button } from '@/shared/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register } from '@/shared/api/auth/auth.api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const FormSchema = z.object({
	email: z.string().email({
		message: 'Поле e-mail не являеться строкой'
	}),
	password: z
		.string()
		.min(6, {
			message: 'Пароль должен быть не менее 6 символов'
		})
		.max(32, {
			message: 'Пароль должен быть не более 32 символов'
		}),
	username: z
		.string()
		.min(4, {
			message: 'Имя должно быть не менее 4 символов'
		})
		.max(32, {
			message: 'Имя должно быть не более 32 символов'
		}),
	repeatPassword: z
		.string()
		.min(6, {
			message: 'Пароль должен быть не менее 6 символов'
		})
		.max(32, {
			message: 'Пароль должен быть не более 32 символов'
		})
})

export const RegisterForm = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	})

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		if (data.password !== data.repeatPassword)
			return toast.error('Пароли не свопадают')
		await register({
			email: data.email,
			password: data.password,
			name: data.username
		})
		router.push('/')
		router.refresh()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-96 space-y-6'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input placeholder='E-mail' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имя</FormLabel>
							<FormControl>
								<Input placeholder='Имя' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input placeholder='Пароль' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='repeatPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Повторите пароль</FormLabel>
							<FormControl>
								<Input
									placeholder='Повторите пароль'
									type='password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Зарегестрироваться</Button>
			</form>
		</Form>
	)
}
