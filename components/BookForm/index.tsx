import style from './BookForm.module.css'
import { useMutation } from '@tanstack/react-query'
import { bookCamper, bookCamperPayload } from '@/services/campers';
import toast from 'react-hot-toast';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface BookFormProps {
    catalogId: string;
}

const bookFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address'),
})

const BookForm = ({ catalogId }: BookFormProps) => {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<bookCamperPayload>({
        resolver: yupResolver(bookFormSchema),
    })

    const postBook = useMutation({
        mutationFn: (values: bookCamperPayload) => bookCamper(catalogId, values),
        onSuccess: () => {
            toast.success('Your booking request has been sent!');
            reset();
        },
        onError: () => {
            toast.error('Failed to submit booking. Please try again.');
        }
    })

    const onSubmit = (data: bookCamperPayload) => {
        postBook.mutate(data);
    }

  return (
    <div className={style.bookFormContainer}>
        <div className={style.topText}>
            <h4>Book your campervan now</h4>
            <p>Stay connected! We are always ready to help you.</p>
        </div>

      <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputGroup}>
            {errors.name && (
                <div className={style.errorLabel}>Name*</div>
            )}
          <input
            className={`${style.input} ${ errors.name && style.inputError}`}
            type="text"
            id="name"
            placeholder="Name*"
            {...register('name')}
          />
          {errors.name && <span className={style.errorText}>{errors.name.message}</span>}
        </div>

        <div className={style.inputGroup}>
            {errors.name && (
                <div className={style.errorLabel}>Email*</div>
            )}
          <input
            className={`${style.input} ${ errors.name && style.inputError}`}
            type="email"
            id="email"
            placeholder="Email*"
            {...register('email')}
          />
          {errors.email && <span className={style.errorText}>{errors.email.message}</span>}
        </div>

        <button type='submit' className={style.btn}>{postBook.isPending ? 'Sending...' : 'Send'}</button>

      </form>
    </div>
  )
}

export default BookForm
