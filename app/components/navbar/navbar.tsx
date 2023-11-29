import { CodeOutlined, HomeOutlined, ReadOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./styles/navbar.module.scss"

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
        getItem('Option 8', '8'),
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
    ]),
];

interface IProps {
    menuItem: string;
}

const NavbarMenu = (props: IProps) => {
    const router = useRouter();
    const [selectedMenuItem, setSelectedMenuItem] = useState(props.menuItem);

    useEffect(() => {
        if (selectedMenuItem === 'navmenu2') {
            router.push("/classes");
        } else if (selectedMenuItem === 'navmenu3') {
            router.push("/classroom");
        } else {
            router.push("/");
        }
    }, [selectedMenuItem]);

    return (
        <>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={[props.menuItem]}
                mode={('inline')}
                items={items}
                onSelect={(e) => setSelectedMenuItem(e.key)}
                className={styles.navctn}
            />
        </>
    )
}

export default NavbarMenu;