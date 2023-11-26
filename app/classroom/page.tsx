import { Button, Input } from "antd";
import styles from "./styles/classroom.module.scss"

const { Search } = Input;

const ClassroomPage = () => {
    return (
        <>
            <div className={styles.contentctn}>
                <div className={styles.title}>Classroom anagement</div>
                <div className={styles.searchandcreate}>
                    <Search placeholder="Name" size="large" style={{ width: 300 }} />
                    <Button type="primary" size="large">
                        Create Classroom
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ClassroomPage;