'use client'

import { Button, Form, Input, Modal, Space, Table } from "antd";
import styles from "./styles/classroom.module.scss"
import { useEffect, useState } from "react";
import { getAllClassroomThunk, selectClassroom, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { SearchProps } from "antd/lib/input/Search";
import Header from "../home/components/Header";
import NavbarMenu from "../components/navbar/navbar";
import {
    createClassroom,
    deleteClassroom,
    editClassroom,
    getDetailClassroom
} from "@/lib/redux/slices/classroomSlice/api";
import { ClassroomOutputType } from "@/lib/redux/slices/classroomSlice/model";
import Loading from "../home/components/Loading";

const { Search } = Input;
const { Column } = Table;

const ClassroomPage = () => {
    const dispatch = useDispatch();
    const useAppSelector = useSelector(selectClassroom);
    const [isLoading, setIsLoading] = useState(true);

    const [filterStringify, setFilterStringify] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalClassroom, setTotalClassroom] = useState(0);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createClassroomForm] = Form.useForm();

    const [classroomDetail, setClassroomDetail] = useState<ClassroomOutputType>();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editClassroomForm] = Form.useForm();
    const [editClassroomDetail, setEditClassroomDetail] = useState<ClassroomOutputType>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteClassroomDetail, setDeleteClassroomDetail] = useState<ClassroomOutputType>();

    const handlePageChange = (numberPage: number, numberPageSize: number) => {
        setPage(numberPage - 1);
        setSize(numberPageSize);
    }
    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setFilterStringify(value);
    };


    // Handle onclick
    const handleGetOnclick = async (id: number) => {
        try {
            const respone = await getDetailClassroom(Number(id));
            setClassroomDetail(respone);
            setIsDetailModalOpen(true);
        } catch (error) {
            toast.error(String(error));
        }
    }
    const handleEditOnclick = (data: any) => {
        setIsEditModalOpen(true);
        setEditClassroomDetail(data);
    }
    const handleDeleteOnclick = (data: any) => {
        setIsDeleteModalOpen(true);
        setDeleteClassroomDetail(data);
    }
    const handleCreateOnClick = () => {
        setIsCreateModalOpen(true);
    }

    // Handle cancel
    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };
    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
    }
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    }
    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    }
    const onFormCreateFinish = async (data: any) => {
        try {
            await createClassroom(data);
            toast.success("Create new classroom success");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllClassroomThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsCreateModalOpen(false);
        }
    }
    const onFormEditFinish = async (data: any) => {
        try {
            await editClassroom(editClassroomDetail?.id, data);
            toast.success("A classroom is updated");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllClassroomThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsEditModalOpen(false);
        }
    }
    const handleDeleteOk = async () => {
        try {
            await deleteClassroom(Number(deleteClassroomDetail?.id));
            toast.success("Delete successfully!");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllClassroomThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsDeleteModalOpen(false);
        }
    }

    useEffect(() => {
        dispatch(getAllClassroomThunk({
            page: String(page),
            size: size,
            sort: ["id", "desc"],
            name: filterStringify || "",
        }));
        setIsLoading(false);
    }, [dispatch, page, size, filterStringify]);
    useEffect(() => {
        setTotalClassroom(useAppSelector.totalClassroom);
        setPage(useAppSelector.page);
    }, [useAppSelector.totalClassroom, useAppSelector.page]);

    type IInputClassroom = {
        name: string,
        maxSv: number,
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <NavbarMenu menuItem="navmenu3" />
            <div className={styles.bodyctn}>
                <div className={styles.contentctn}>
                    <h2>Classroom</h2>

                    <div className={styles.searchandcreate}>
                        <Search placeholder="Name" size="large" onSearch={onSearch} style={{ width: 300 }} />
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleCreateOnClick}
                        >
                            Create
                        </Button>
                    </div>
                    <div className={styles.table}>
                        <Table
                            dataSource={useAppSelector.data}
                            pagination={{
                                pageSize: size,
                                total: totalClassroom,
                                pageSizeOptions: [5, 10, 20, 50, 100],
                                showSizeChanger: true,
                                onChange: (numPage, numPageSize) => handlePageChange(numPage, numPageSize),
                            }}
                            scroll={{ y: 500 }}
                            rowKey={record => "classroom_" + record.id}
                        >
                            <Column title="ID"
                                dataIndex="id"
                                key="id"
                                render={(id: number) =>
                                    <a onClick={() => handleGetOnclick(id)}>{id}</a>} />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Max" dataIndex="maxSv" key="maxSv" />
                            <Column
                                key="action"
                                render={(data) => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            onClick={() => handleEditOnclick(data)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => handleDeleteOnclick(data)}
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
            <Modal
                // title="Create classroom"
                open={isCreateModalOpen}
                onOk={createClassroomForm.submit}
                onCancel={handleCreateModalCancel}
            >
                <Form
                    form={createClassroomForm}
                    onFinish={onFormCreateFinish}
                    autoComplete="off"
                >
                    <h3>Name classroom</h3>
                    <Form.Item<IInputClassroom>
                        className={styles.formInput}
                        name="name"
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input size="large" placeholder="Name classroom" />
                    </Form.Item>
                    <h3>Max student</h3>
                    <Form.Item<IInputClassroom>
                        className={styles.formInput}
                        name="maxSv"
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input size='large' placeholder="Max student" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                open={isDetailModalOpen}
                onCancel={handleDetailModalCancel}
                footer={false}
                className={styles.modalDetailClassroom}
            >
                <h2>Classroom infomation</h2>
                {isDetailModalOpen && classroomDetail && (
                    <div>
                        <p className={styles.textContent}> Name: {classroomDetail.name}</p>
                        <p className={styles.textContent}> Max number of students: {classroomDetail.maxSv}</p>
                    </div>
                )}
            </Modal>
            <Modal
                open={isEditModalOpen}
                onOk={editClassroomForm.submit}
                onCancel={handleEditModalCancel}
            >
                {isEditModalOpen && editClassroomDetail && (
                    <Form
                        form={editClassroomForm}
                        initialValues={{
                            name: editClassroomDetail.name,
                            maxSv: editClassroomDetail.maxSv,
                        }}
                        onFinish={onFormEditFinish}
                        autoComplete="off"
                    >
                        <h3>Name classroom</h3>
                        <Form.Item<IInputClassroom>
                            className={styles.formInput}
                            name="name"
                            rules={[{ required: true, message: 'This field is required!' }]}
                        >
                            <Input size="large" placeholder="Name classroom" defaultValue={editClassroomDetail.name} />
                        </Form.Item>
                        <h3>Max student</h3>
                        <Form.Item<IInputClassroom>
                            className={styles.formInput}
                            name="maxSv"
                            rules={[{ required: true, message: 'This field is required!' }]}
                        >
                            <Input size='large' placeholder="Max student" defaultValue={editClassroomDetail.id} />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
            <Modal
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalCancel}
                onOk={handleDeleteOk}
            >
                <h2>Delete classroom</h2>
                {isDeleteModalOpen && deleteClassroomDetail && (
                    <div>
                        <p className={styles.textContent}>Are you sure you want to delete classroom <b>{deleteClassroomDetail.name}</b>?</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ClassroomPage;