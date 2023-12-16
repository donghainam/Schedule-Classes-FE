"use client"

import styles from './styles/home.module.scss'
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { signInThunk, useDispatch } from '@/lib/redux';
import { toast } from 'react-toastify';
import { IAuthInput } from '@/lib/redux/slices/authSlice/model';
import { signUpApi } from '@/lib/redux/slices/authSlice/api';

export const HomeNotLogin = () => {
    const dispatch = useDispatch();
    const onFinish = async (data: any) => {
        const newData = { ...data, username: data.username.trim() };
        dispatch(signInThunk(newData))
    };

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [registerForm] = Form.useForm();
    const handleRegisterModalCancel = () => {
        setIsRegisterModalOpen(false);
    };
    const handleRegisterOnClick = () => {
        setIsRegisterModalOpen(true);
    }
    const onFormRegisterFinish = async (data: any) => {
        try {
            console.log(">>>>>>>>CHecked", data);
            const newData = { ...data, email: data.email?.trim() };
            console.log(">>>>>>>>CHecked", newData);
            await signUpApi(newData);
            toast.success("Register successfully");
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsRegisterModalOpen(false);
        }
    }

    type IAuthSignin = {
        username: string,
        password: string,
        rememberme: boolean,
    }

    return (
        <>
            <section className={styles.welcome}>
                <div className={styles.welcomeMain}>
                    <h2>
                        Welcome to the Class Schedule Website!
                    </h2>
                    <div className={styles.hometext}>
                        We are extremely excited for you to come and use our services. This website is designed to help you manage and organize
                        your study time easily and effectively. Regardless of whether you are a student, teacher, or classroom manager, we hope
                        that this website will meet and serve your needs.
                    </div>
                </div>
                <div className={styles.loginForm}>
                    <div className={styles.loginTitle}>Login</div>
                    <Form
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<IAuthSignin>
                            className={styles.formInput}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item<IAuthSignin>
                            className={styles.formInput}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                size='large'
                                prefix={<LockOutlined />}
                                placeholder="Password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space size={120}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Button type="link">Forgot password</Button>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            className={styles.formSubmit}
                            wrapperCol={{ offset: 10, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                        You don't have an account yet?<Button type="link" onClick={handleRegisterOnClick} >Register a new account</Button>
                    </Form>
                    <Modal
                        open={isRegisterModalOpen}
                        onOk={registerForm.submit}
                        onCancel={handleRegisterModalCancel}
                    >
                        <Form
                            form={registerForm}
                            onFinish={onFormRegisterFinish}
                            autoComplete="off"
                        >
                            <h3>Email</h3>
                            <Form.Item<IAuthInput>
                                className={styles.formInput}
                                name="email"
                                rules={[{ required: true, message: 'This field is required!' }]}
                            >
                                <Input size='large' placeholder="Your email" />
                            </Form.Item>
                            <h3>Password</h3>
                            <Form.Item<IAuthInput>
                                className={styles.formInput}
                                name="password"
                                rules={[
                                    { required: true, message: 'This field is required!' },
                                    { min: 5, message: 'Password must be minimum 5 characters.' },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    size='large'
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <h3>Password Confirmation</h3>
                            <Form.Item<IAuthInput>
                                className={styles.formInput}
                                name="rePassword"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'This field is required!' },
                                    { min: 5, message: 'Password must be minimum 5 characters.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    size='large'
                                    prefix={<LockOutlined />}
                                    placeholder="Confirm the password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </section >
        </>
    )
}

export default HomeNotLogin;