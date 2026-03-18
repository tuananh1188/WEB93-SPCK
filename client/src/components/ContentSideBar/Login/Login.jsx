import styles from './styles.module.scss';
import InputCommon from '@components/InputCommon/InputCommon';
import Button from '@components/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { ToastContext } from '../../../contexts/ToastProvider';
import { register, signIn } from '../../../apis/authService';
import Cookies from 'js-cookie';
import { SideBarContext } from '../../../contexts/SideBarProvider';
import { StoreContext } from '../../../contexts/storeProvider';

function Login() {
    const { container, title, boxRememberMe, lostPw } = styles;
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { setIsOpen } = useContext(SideBarContext);
    const { setUserId, setUserInfo } = useContext(StoreContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Passwords must match'
            )
        }),
        onSubmit: async (values) => {
            if (isLoading) return;
            const { email, password } = values;
            setIsLoading(true);
            if (isRegister) {
                await register({ email, password })
                    .then((res) => {
                        toast.success(res.data.message);
                        setIsLoading(false);
                        handleToggle();
                    })
                    .catch((err) => {
                        toast.error(err.data.message);
                        setIsLoading(false);
                    });
            }
            if (!isRegister) {
                await signIn({ email, password })
                    .then((res) => {
                        setIsLoading(false);
                        const { accessToken, user } = res.data;
                        setUserId(user._id);
                        setUserInfo(user);
                        Cookies.set('token', accessToken);
                        if (user?._id) {
                            Cookies.set('userId', user._id);
                        }
                        toast.success('Login successfully !');
                        setIsOpen(false);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        toast.error(
                            err.response?.data?.message || 'Login failed'
                        );
                    });
            }
        }
    });
    const handleToggle = () => {
        setIsRegister(!isRegister);
        formik.resetForm();
    };
    return (
        <div className={container}>
            <div className={title}>{isRegister ? 'SIGN UP' : 'SIGN IN'}</div>
            <form onSubmit={formik.handleSubmit}>
                <InputCommon
                    id='email'
                    label='Email'
                    type='text'
                    autoComplete='email'
                    isRequired
                    formik={formik}
                />

                <InputCommon
                    id='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    isRequired
                    formik={formik}
                />
                {isRegister && (
                    <InputCommon
                        id='cfmpassword'
                        label='Confirm Password'
                        type='password'
                        isRequired
                        formik={formik}
                    />
                )}
                {!isRegister && (
                    <div className={boxRememberMe}>
                        <input type='checkbox' />
                        <span>Remember me</span>
                    </div>
                )}
                <Button
                    content={
                        isLoading
                            ? 'LOADING...'
                            : isRegister
                              ? 'REGISTER'
                              : 'LOGIN'
                    }
                    type='button'
                />
            </form>
            <Button
                content={
                    isRegister
                        ? 'Already have an account?'
                        : "Don't have an account?"
                }
                type='submit'
                isPrimary={false}
                style={{ marginTop: '10px' }}
                onClick={handleToggle}
            />
            {!isRegister && <div className={lostPw}>Lost your password</div>}
        </div>
    );
}

export default Login;
