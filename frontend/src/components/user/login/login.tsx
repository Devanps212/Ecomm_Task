import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import * as Yup from 'yup'

const Login = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must have at least 6 characters")
            .required("Password is required"),
    });

    const handleSubmit = async (values:{email:string, password: string}, { setSubmitting, setErrors }: FormikHelpers<{ email: string; password: string }>) => {
        try {
            
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ email: errorData.message });
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

        } catch (error) {
            console.error('Login error:', error);
            
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div className="container top vh-100">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="login border border-dark shadow-lg rounded p-5">
                    <h4 className='text-center'>Login</h4>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel label="Email" controlId='floating-input' className='mb-3'>
                                    <Field
                                        type='email'
                                        name='email'
                                        placeholder='enter your mail'
                                        as={Form.Control}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </FloatingLabel>
                                <FloatingLabel label="Password" controlId='floating-input' className='mb-3'>
                                    <Field
                                        type='password'
                                        name='password'
                                        placeholder='****'
                                        as={Form.Control}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </FloatingLabel>
                                <Button type='submit' disabled={isSubmitting} className="w-100">
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login
