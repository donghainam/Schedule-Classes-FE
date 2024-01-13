import { Modal, Spin } from "antd";
import styles from "./styles/loading.module.scss"

interface IProps {
    show: boolean;
}

const Loading = (props: IProps) => {
    return (
        <>
            <Spin
                spinning={props.show}
                size="large"
                className={styles.loadingPage}
                fullscreen
            >
                <div className="content" />
            </Spin>
        </>
    )
}

export default Loading;