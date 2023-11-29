'use client'

import { Button, Input, Pagination, Space, Table } from "antd";
import styles from "./styles/classroom.module.scss"
import { useEffect, useState } from "react";
import { getAllClassroomThunk, selectClassroom, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { SearchProps } from "antd/lib/input/Search";
import Header from "../home/components/Header";
import NavbarMenu from "../components/navbar/navbar";

const { Search } = Input;
const { Column } = Table;

const ClassroomPage = () => {
    const dispatch = useDispatch();
    const useAppSelector = useSelector(selectClassroom);
    const [filterStringify, setFilterStringify] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalClassroom, setTotalClassroom] = useState(0);

    const handlePageChange = (e: number) => {
        setPage(e - 1);
    }
    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setFilterStringify(value);
    };
    const handleEditOnclick = () => {
        toast.warn("Click button edit");
    }
    const handleDeleteOnclick = () => {
        toast.success("Delete successfully!");
    }

    useEffect(() => {
        dispatch(getAllClassroomThunk({
            page: String(page),
            size: size,
            sort: ["id", "desc"],
            name: filterStringify || "",
        }));
    }, [dispatch, page, size, filterStringify]);
    useEffect(() => {
        setTotalClassroom(useAppSelector.totalClassroom);
        setPage(useAppSelector.page);
    }, [useAppSelector.totalClassroom, useAppSelector.page]);
    console.log(">>>>>>>>>>>>CHeck data: ", useAppSelector);

    return (
        <>
            <Header />
            <NavbarMenu menuItem="navmenu3" />
            <div className={styles.bodyctn}>
                <div className={styles.contentctn}>
                    <h2>Classroom</h2>

                    <div className={styles.searchandcreate}>
                        <Search placeholder="Name" size="large" onSearch={onSearch} style={{ width: 300 }} />
                        <Button type="primary" size="large">
                            Create
                        </Button>
                    </div>
                    <div className={styles.table}>
                        <Table
                            dataSource={useAppSelector.data}
                            pagination={{
                                pageSize: size,
                                total: totalClassroom,
                                onChange: (e) => handlePageChange(e)
                            }}
                            scroll={{ y: 300 }}
                            rowKey={record => "classroom_" + record.id}
                        >
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Max" dataIndex="maxSv" key="maxSv" />
                            <Column
                                key="action"
                                render={() => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            onClick={handleEditOnclick}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={handleDeleteOnclick}
                                            danger
                                        >
                                            Delete
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ClassroomPage;