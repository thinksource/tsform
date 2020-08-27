import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik, Form, Field} from 'formik'
import useSWR, { mutate } from 'swr';
import { myRequest } from '../libs/auth';
import Axios from 'axios';
interface Props {
    username: string;
    password: string;
    message: string;
}

const LoginForm: React.FC<Props> = (loginData: Props)=>{
    const login_req = new myRequest('post', loginData)
    const {data} = useSWR('/api/user/login', login_req.send)

    return (
        <>
            <Typography variant="h3">
            Login
            </Typography>
            <Formik  onSubmit ={async(values, formikHelpers) =>{
                mutate('/api/user/login', [...data, values], false)
                await Axios.post('/api/user/login', values)
                alert(JSON.stringify(values))
                formikHelpers.setSubmitting(false)
            }}
            initialValues={{ username: '', password:'' }}
            >
                <Form>
                    <label htmlFor="message"></label>
                    <label htmlFor="username">email:</label>
                    <Field name="username" ref ></Field>
                    <label htmlFor="password">password:</label>
                    <Field name='password' type="password"></Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>  
    )

}

export default LoginForm