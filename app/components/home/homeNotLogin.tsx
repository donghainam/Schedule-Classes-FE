"use client"

import styles from './styles/home.module.scss'
import React from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { signInThunk, useDispatch } from '@/lib/redux';
import { toast } from 'react-toastify';

export const HomeNotLogin = () => {
    const dispatch = useDispatch();
    const onFinish = async (data: any) => {
        const newData = { ...data, username: data.username.trim() };
        dispatch(signInThunk(newData))
    };

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
                            <Space size={80}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Button type="link">Forgot password</Button>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            className={styles.formSubmit}
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section >
        </>
    )
}

export default HomeNotLogin;