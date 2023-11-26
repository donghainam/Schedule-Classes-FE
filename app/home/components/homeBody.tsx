'use client'

import React, { useEffect, useState } from "react";
import { CodeOutlined, HomeOutlined, ReadOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import styles from "./styles/home.module.scss";
import ClassesPage from "@/app/classes/page";
import ClassroomPage from "@/app/classroom/page";
import HomeContent from "./homeContent";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', 'navmenu1', <HomeOutlined />),
    getItem('Subject', 'navmenu2', <ReadOutlined />),
    getItem('Classroom', 'navmenu3', <CodeOutlined />),
    getItem('Navigation Three', 'sub2', <SettingOutlined />, [
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
    ]),
];

const HomeBody = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('navmenu1');
    const [content, setContent] = useState(<HomeContent />);
    useEffect(() => {
        if (selectedMenuItem === 'navmenu2') {
            setContent(<ClassesPage />);
            setSelectedMenuItem('navmenu2');
        } else if (selectedMenuItem === 'navmenu3') {
            setContent(<ClassroomPage />);
            setSelectedMenuItem('navmenu3');
        } else {
            setContent(<HomeContent />);
            setSelectedMenuItem('navmenu1');
        }
    }, [selectedMenuItem]);
    return (
        <>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['navmenu1']}
                defaultOpenKeys={['sub1']}
                mode={('inline')}
                items={items}
                onSelect={(e) => setSelectedMenuItem(e.key)}
                className={styles.navctn}
            />
            <div className={styles.bodyctn}>
                {content}
            </div>

        </>
    )
}

export default HomeBody;