"use client"

import { Dropdown, MenuProps, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/header.module.scss'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const items: MenuProps['items'] = [
    {
        label: <Link href="/home">Login</Link>,
        key: '0',
    },
    {
        label: <Link href="/">Register</Link>,
        key: '1',
    },
];

const Header = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const prevScrollY = useRef<number>(0);

    useEffect(() => {
        const pageHeight = window.innerHeight;
        const handleScroll = () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            setIsHeaderVisible(prevScrollY.current > pageHeight);
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={styles.container}
            // style={{ top: isHeaderVisible ? '0' : '-100px' }}
            >
                <div className={styles.appName}>
                    <div className={styles.brandLogo}>
                        {/* <img src='/images/logoCalendar.png' alt='LogoCalendar' /> */}
                    </div>
                    <span className={styles.brandTitle}>ScheduleClasses</span>
                </div>
                <div className={styles.account}>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        className={styles.dropdown}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <UserOutlined />
                                Account
                                <CaretDownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default Header;
