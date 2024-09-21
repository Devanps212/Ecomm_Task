import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import * as Yup from 'yup';

const Signup = () => {
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required"),
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must have at least 6 characters")
            .required("Password is required"),
    });

    const handleSubmit = async (values: { username: string; email: string; password: string }, { setSubmitting, setErrors }: FormikHelpers<{ username: string; email: string; password: string }>) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ email: errorData.message });
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log('Signup successful:', data);

        } catch (error) {
            console.error('Signup error:', error);
            
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div className="container top vh-100">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="login border border-dark shadow-lg rounded p-5" style={{ backgroundColor: '#f8f9fa' }}>
                    <h4 className='text-center text-primary'>Sign Up</h4>
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel label="Username" controlId='floating-username' className='mb-3'>
                                    <Field
                                        type='text'
                                        name='username'
                                        placeholder='Enter your username'
                                        as={Form.Control}
                                        className="rounded border-secondary"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </FloatingLabel>
                                <FloatingLabel label="Email" controlId='floating-email' className='mb-3'>
                                    <Field
                                        type='email'
                                        name='email'
                                        placeholder='Enter your email'
                                        as={Form.Control}
                                        className="rounded border-secondary"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </FloatingLabel>
                                <FloatingLabel label="Password" controlId='floating-password' className='mb-4'>
                                    <Field
                                        type='password'
                                        name='password'
                                        placeholder='Enter your password'
                                        as={Form.Control}
                                        className="rounded border-secondary"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </FloatingLabel>
                                <Button 
                                    type='submit' 
                                    disabled={isSubmitting} 
                                    className="w-100 bg-primary text-white border-0 shadow"
                                    style={{ transition: 'background-color 0.3s' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Signup;
