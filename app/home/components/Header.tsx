import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    authSlice,
    infoUserAuth,
    selectAuth,
    useDispatch,
    useSelector
} from "@/lib/redux";
import Link from "next/link";
import styles from "./styles/header.module.scss"
import { Dropdown, MenuProps, Space } from "antd";
import { CaretDownOutlined, LockFilled, ToolFilled, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const useAppSelector = useSelector(selectAuth);
    const isAuth = useAppSelector.isAuth;
    const infoUser = useAppSelector.infoUser;
    const dispatch = useDispatch()

    useEffect(() => {
        !!isAuth && dispatch(infoUserAuth(""));
    }, [dispatch]);

    const logOut = () => {
        dispatch(authSlice.actions.logOutAction());
        // TODO: handle log out
        // dispatch(clearOwnListAction());
        toast.success("Logout successfully");
    };

    const items: MenuProps['items'] = [
        {
            label: <Link href="/setting">Setting</Link>,
            icon: <ToolFilled />,
            key: 'account1',
        },
        {
            label: <Link href="/home/password">Password</Link>,
            icon: <LockFilled />,
            key: 'account2',
        },

        {
            label: <Link
                href="/"
                onClick={() => {
                    logOut();
                }}
            >
                Sign out
            </Link>,
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            key: 'account3',
        },
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.mgcontainer}>
                    <div className={styles.appName}>
                        <div className={styles.brandLogo}>
                            <img src='/images/logo.png' alt='Logo' />
                        </div>
                        <span className={styles.brandTitle}>Schedule</span>
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
            </div>

        </>
    );
};

export default Header;