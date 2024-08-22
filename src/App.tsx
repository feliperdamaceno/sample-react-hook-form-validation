import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createRegisterSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(32, { message: 'Password must be no more than 32 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter'
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter'
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character'
    })
})

type RegisterSchema = z.infer<typeof createRegisterSchema>

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(createRegisterSchema)
  })

  const onSubmit = (data: RegisterSchema) => {
    console.log(data)
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="registration">
        <label>
          <span>First Name</span>
          <input
            {...register('firstName')}
            name="firstName"
            type="text"
            required
          />
          <span className="error">
            <ErrorMessage errors={errors} name="firstName" />
          </span>
        </label>

        <label>
          <span>Last Name</span>
          <input
            {...register('lastName')}
            name="lastName"
            type="text"
            required
          />
          <span className="error">
            <ErrorMessage errors={errors} name="lastName" />
          </span>
        </label>

        <label>
          <span>Email</span>
          <input {...register('email')} name="email" type="email" required />
          <span className="error">
            <ErrorMessage errors={errors} name="email" />
          </span>
        </label>

        <label>
          <span>Password</span>
          <input
            {...register('password')}
            name="password"
            type="password"
            required
          />
          <span className="error">
            <ErrorMessage errors={errors} name="password" />
          </span>
        </label>

        <button type="submit">Register</button>
      </form>
    </main>
  )
}
