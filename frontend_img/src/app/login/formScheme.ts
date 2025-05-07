import * as Yup from 'yup';

export type FormLoginProps ={
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const formLoginScheme: FormLoginProps = {email:'',name:'', password: '', passwordMatch:''}

export const formLoginValidationSchema =  Yup.object().shape({
    email: Yup.string().trim().required('Email is required!').email('Invalid email'),
    password: Yup.string().required('Password is required').min(8, 'Password must have at least 8 characters'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'Password must match')
})