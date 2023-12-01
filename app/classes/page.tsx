'use client'

import Header from "../home/components/Header";
import styles from "./styles/classes.module.scss"
import NavbarMenu from "../components/navbar/navbar";
import { Button, Form, Image, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useDispatch, useSelector } from "@/lib/redux";
import { getAllSubjectThunk, selectSubject } from "@/lib/redux/slices/subjectSlice";
import Column from "antd/es/table/Column";
import { toast } from "react-toastify";
import { ISubjectInputType, ISubjectOutputType } from "@/lib/redux/slices/subjectSlice/model";
import { getDetailSubject } from "@/lib/redux/slices/subjectSlice/api";

const { Search } = Input;

const ClassesPage = () => {
    const dispatch = useDispatch();
    const useAppSelector = useSelector(selectSubject);

    // Pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalSubject, setTotalSubject] = useState(0);
    const handlePageChange = (numberPage: number, numberPageSize: number) => {
        setPage(numberPage - 1);
        setSize(numberPageSize);
    }

    /***************** Create *****************/
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createSubjectForm] = Form.useForm();
    const onFormSubjectCreateFinish = async (data: any) => {
        toast.success("create new subject");
        // try {
        //     await createClassroom(data);
        //     toast.success("Create new classroom success");
        // } catch (error) {
        //     toast.error(String(error));
        // } finally {
        //     dispatch(getAllClassroomThunk({
        //         page: String(page),
        //         size: size,
        //         sort: ["id", "desc"],
        //         name: filterStringify || "",
        //     }));
        //     setIsCreateModalOpen(false);
        // }
    }
    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };
    const handleCreateOnClick = () => {
        setIsCreateModalOpen(true);
    }

    /***************** Get data *****************/
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [subjectDetail, setSubjectDetail] = useState<ISubjectOutputType>();
    const handleGetOnclick = async (id: number) => {
        try {
            const respone = await getDetailSubject(Number(id));
            setSubjectDetail(respone);
            setIsDetailModalOpen(true);
        } catch (error) {
            toast.error(String(error));
        }
    }
    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
    }

    /***************** Edit *****************/
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editSubjectForm] = Form.useForm();
    const [editClassroomDetail, setEditClassroomDetail] = useState<ISubjectOutputType>();
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    }
    const handleEditOnclick = (data: any) => {
        toast.success("Click edit button");
        setIsEditModalOpen(true);
        // setEditClassroomDetail(data);
    }
    const onFormEditFinish = async (data: any) => {
        toast.success("Edit success!!");
        // try {
        //     await editClassroom(editClassroomDetail?.id, data);
        //     toast.success("A classroom is updated");
        // } catch (error) {
        //     toast.error(String(error));
        // } finally {
        //     dispatch(getAllClassroomThunk({
        //         page: String(page),
        //         size: size,
        //         sort: ["id", "desc"],
        //         name: filterStringify || "",
        //     }));
        //     setIsEditModalOpen(false);
        // }
    }

    /***************** Delete *****************/
    const handleDeleteOnclick = (data: any) => {
        toast.success("Click delete button");
    }

    const [visible, setVisible] = useState(false);
    const [filterStringify, setFilterStringify] = useState("");

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setFilterStringify(value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(getAllSubjectThunk({
            page: String(page),
            size: size,
            sort: ["id", "desc"],
            name: filterStringify || "",
        }));
    }, [dispatch, page, size, filterStringify]);
    useEffect(() => {
        setTotalSubject(useAppSelector.totalSubject);
        setPage(useAppSelector.page);
    }, [useAppSelector.totalSubject, useAppSelector.page]);

    return (
        <>
            <Header />
            <NavbarMenu menuItem="navmenu2" />
            <div className={styles.bodyctn}>
                <div className={styles.contentctn}>
                    <h2>Subject</h2>

                    <div className={styles.templateImport}>
                        <Button type="link" size="large" onClick={() => setVisible(true)}>
                            Template import subjects
                        </Button>
                        <Button type="primary" icon={<DownloadOutlined />} size="large" >Download</Button>
                        <Image
                            width={200}
                            style={{ display: 'none' }}
                            src="/images/templateImport.png"
                            preview={{
                                visible,
                                src: '/images/templateImport.png',
                                onVisibleChange: (value) => {
                                    setVisible(value);
                                },
                            }}
                        />
                    </div>
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
                                total: totalSubject,
                                pageSizeOptions: [5, 10, 20, 50, 100],
                                showSizeChanger: true,
                                onChange: (numPage, numPageSize) => handlePageChange(numPage, numPageSize),
                            }}
                            scroll={{ y: 500 }}
                            rowKey={record => "subject_" + record.id}
                        >
                            <Column title="ID"
                                dataIndex="id"
                                key="id"
                                width={80}
                                render={(id: number) =>
                                    <a onClick={() => handleGetOnclick(id)}>{id}</a>} />
                            <Column title="Department name" dataIndex="departmentName" key="departmentName" width={150} />
                            <Column title="Course ID" dataIndex="courseCode" key="courseCode" width={100} />
                            <Column title="Course name" dataIndex="name" key="name" width={200} />
                            <Column title="Note" dataIndex="classNote" key="classNote" width={200} />
                            <Column title="Start week" dataIndex="startWeek" key="startWeek" width={100} />
                            <Column title="Number of lessons" dataIndex="numberOfLessons" key="numberOfLessons" width={100} />
                            <Column title="Number of week study" dataIndex="numberOfWeekStudy" key="numberOfWeekStudy" width={100} />
                            <Column
                                title="Status"
                                key="action"
                                width={200}
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
            </div>
            <Modal
                open={isCreateModalOpen}
                onOk={createSubjectForm.submit}
                onCancel={handleCreateModalCancel}
            >
                <Form
                    form={createSubjectForm}
                    initialValues={{ remember: true }}
                    onFinish={onFormSubjectCreateFinish}
                    autoComplete="off"
                >
                    <h3>Name classroom</h3>
                    <Form.Item<ISubjectInputType>
                        className={styles.formInput}
                        name="name"
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input size="large" placeholder="Name classroom" />
                    </Form.Item>
                    <h3>Max student</h3>
                    <Form.Item<ISubjectInputType>
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
                {isDetailModalOpen && subjectDetail && (
                    <div>
                        <p className={styles.textContent}> Name: {subjectDetail.name}</p>
                        <p className={styles.textContent}> Max number of students: {subjectDetail.classNote}</p>
                    </div>
                )}
            </Modal>
            <Modal
                open={isEditModalOpen}
                onOk={editSubjectForm.submit}
                onCancel={handleEditModalCancel}
            >
                {isEditModalOpen && editClassroomDetail && (
                    <Form
                        form={editSubjectForm}
                        initialValues={{
                            name: editClassroomDetail.name,
                            maxSv: editClassroomDetail.classNote,
                        }}
                        onFinish={onFormEditFinish}
                        autoComplete="off"
                    >
                        <h3>Name classroom</h3>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="name"
                            rules={[{ required: true, message: 'This field is required!' }]}
                        >
                            <Input size="large" placeholder="Name classroom" defaultValue={editClassroomDetail.name} />
                        </Form.Item>
                        <h3>Max student</h3>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="maxSv"
                            rules={[{ required: true, message: 'This field is required!' }]}
                        >
                            <Input size='large' placeholder="Max student" defaultValue={editClassroomDetail.id} />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
            {/* <Modal
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
            </Modal> */}
        </>
    )
}

export default ClassesPage;