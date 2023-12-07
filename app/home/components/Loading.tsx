import { Spin } from "antd";
import styles from "./styles/loading.module.scss"

export default function Loading() {
    return (
        <>
            <Spin size="large" className={styles.loadingPage}>
            </Spin>
        </>
    )
}