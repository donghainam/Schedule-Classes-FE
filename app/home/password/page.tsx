"use client"

import { Button, Form, Input } from 'antd';
import styles from './styles/password.module.scss'
import Header from '../components/Header';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { resetPassword } from '@/lib/redux/slices/authSlice/api';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useState } from 'react';

export default function Password() {
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (data: any) => {
        try {
            setIsLoading(true);
            await resetPassword(data.currentPassword, data.newPassword);
            toast.success("Change password successfully");
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsLoading(false);
        }
    };
    type IPasswordAccount = {
        currentPassword: string,
        newPassword: string,
        reNewPassword: string,
    }
    return (
        <>
            <Loading show={isLoading} />
            <Header />
            <div className={styles.passwordForm}>
                <div className={styles.titlePageName}>User Setting</div>
                <Form
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h3>Current Password</h3>
                    <Form.Item<IPasswordAccount>
                        className={styles.formInput}
                        name="currentPassword"
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input.Password
                            size='large'
                            placeholder="Current password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <h3>New Password</h3>
                    <Form.Item<IPasswordAccount>
                        className={styles.formInput}
                        name="newPassword"
                        hasFeedback
                        rules={[
                            { required: true, message: 'This field is required!' },
                            { min: 5, message: 'Password must be minimum 5 characters.' },
                        ]}
                    >
                        <Input.Password
                            size='large'
                            placeholder="New password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <h3>New Password Confirmation</h3>
                    <Form.Item<IPasswordAccount>
                        className={styles.formInput}
                        name="reNewPassword"
                        hasFeedback
                        rules={[
                            { required: true, message: 'This field is required!' },
                            { min: 5, message: 'Password must be minimum 5 characters.' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            size='large'
                            placeholder="Confirm the new password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        className={styles.formInput}
                    >
                        <Button type="primary" htmlType="submit" className="setting-form-button">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}