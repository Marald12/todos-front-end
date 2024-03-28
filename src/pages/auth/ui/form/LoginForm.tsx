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
import { login } from '@/shared/api/auth/auth.api'
import { useRouter } from 'next/navigation'

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
		})
})

export const LoginForm = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	})

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		await login({
			email: data.email,
			password: data.password
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Пароль' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Войти</Button>
			</form>
		</Form>
	)
}
