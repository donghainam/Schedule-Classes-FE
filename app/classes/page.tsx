'use client'

import Header from "../home/components/Header";
import styles from "./styles/classes.module.scss"
import NavbarMenu from "../components/navbar/navbar";
import { Button, Form, Image, Input, InputNumber, Modal, Select, Space, Spin, Table, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useDispatch, useSelector } from "@/lib/redux";
import { getAllSubjectThunk, selectSubject } from "@/lib/redux/slices/subjectSlice";
import Column from "antd/es/table/Column";
import { toast } from "react-toastify";
import { ISubjectInputType, ISubjectOutputType } from "@/lib/redux/slices/subjectSlice/model";
import { createSubject, deleteSubject, editSubject, getDetailSubject, getTemplate, postExcel } from "@/lib/redux/slices/subjectSlice/api";
import Loading from "../home/components/Loading";
import axios from "axios";

const { Search } = Input;

const ClassesPage = () => {
    const dispatch = useDispatch();
    const useAppSelector = useSelector(selectSubject);
    const [isLoading, setIsLoading] = useState(true);

    // Pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalSubject, setTotalSubject] = useState(0);
    const handlePageChange = (numberPage: number, numberPageSize: number) => {
        setPage(numberPage - 1);
        setSize(numberPageSize);
    }

    /***************** Create *****************/
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createSubjectForm] = Form.useForm();
    const onFormSubjectCreateFinish = async (data: any) => {
        setIsLoading(true);
        setIsCreateModalOpen(false);
        try {
            await createSubject(data);
            toast.success("Create new subject success");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllSubjectThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsLoading(false);
        }
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
        setIsLoading(true);
        try {
            const respone = await getDetailSubject(Number(id));
            setSubjectDetail(respone);
            setIsDetailModalOpen(true);
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsLoading(false);
        }
    }
    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
    }

    /***************** Edit *****************/
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editSubjectForm] = Form.useForm();
    const [editSubjectDetail, setEditSubjectDetail] = useState<ISubjectOutputType>();
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
    }
    const handleEditOnclick = (data: any) => {
        setIsEditModalOpen(true);
        setEditSubjectDetail(data);
    }
    useEffect(() => {
        if (editSubjectDetail) {
            editSubjectForm.setFieldsValue({
                semester: editSubjectDetail.semester,
                name: editSubjectDetail.name,
                classNote: editSubjectDetail.classNote,
                courseCode: editSubjectDetail.courseCode,
                startWeek: editSubjectDetail.startWeek,
                totalNumberOfLessons: editSubjectDetail.numberOfLessons * editSubjectDetail.numberOfWeekStudy,
                conditions: editSubjectDetail.conditions,
                numberOfLessons: editSubjectDetail.numberOfLessons,
                departmentName: editSubjectDetail.departmentName,
                weekOff: editSubjectDetail.weekOff,
            });
        } else {
            editSubjectForm.resetFields();
        }
    }, [editSubjectDetail, editSubjectForm]);
    const onFormEditFinish = async (data: any) => {
        setIsLoading(true);
        setIsEditModalOpen(false);
        try {
            await editSubject(editSubjectDetail?.id, data);
            toast.success("A subject is updated");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllSubjectThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsLoading(false);
        }
    }

    /***************** Delete *****************/
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteSubjectDetail, setDeleteSubjectDetail] = useState<ISubjectOutputType>();
    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    }
    const handleDeleteOnclick = (data: any) => {
        setIsDeleteModalOpen(true);
        setDeleteSubjectDetail(data);
    }
    const handleDeleteOk = async () => {
        setIsLoading(true);
        setIsDeleteModalOpen(false);
        try {
            await deleteSubject(Number(deleteSubjectDetail?.id));
            toast.success("Delete successfully!");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllSubjectThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsLoading(false);
        }
    }

    const handleDownloadOnClick = async () => {
        setIsLoading(true);
        try {
            const response = await getTemplate();

            // Create a Blob URL from the response data
            const blobUrl = URL.createObjectURL(new Blob([response.data]));

            // Create a hidden link and simulate a click to trigger file download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'TemplateImportSubject.xlsx'; // Specify the file name
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();

            // Clean up - remove the link and revoke the Blob URL after download
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllSubjectThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsDeleteModalOpen(false);
            setIsLoading(false);
        }
    }

    const [visible, setVisible] = useState(false);
    const [filterStringify, setFilterStringify] = useState("");

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setPage(0);
        setFilterStringify(value);
    };

    useEffect(() => {
        dispatch(getAllSubjectThunk({
            page: String(page),
            size: size,
            sort: ["id", "desc"],
            name: filterStringify || "",
        }));
        setIsLoading(false);
    }, [dispatch, page, size, filterStringify]);
    useEffect(() => {
        setTotalSubject(useAppSelector.totalSubject);
        setPage(useAppSelector.page);
    }, [useAppSelector.totalSubject, useAppSelector.page]);

    // Handle upload
    const uploadChanged = async (data: any) => {
        setIsLoading(true);
        try {
            await postExcel(data);
            toast.success("Import data successfully!");
        } catch (error) {
            toast.error(String(error));
        } finally {
            dispatch(getAllSubjectThunk({
                page: String(page),
                size: size,
                sort: ["id", "desc"],
                name: filterStringify || "",
            }));
            setIsLoading(false);
        }
    };

    return (
        <>
            <Loading show={isLoading} />
            <Header />
            <NavbarMenu menuItem="navmenu2" />
            <div className={styles.bodyctn}>
                <div className={styles.contentctn}>
                    <h2>Subject</h2>

                    <div className={styles.templateImport}>
                        <div>
                            <Button type="link" size="large" onClick={() => setVisible(true)}>
                                Template import subjects
                            </Button>
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                size="large"
                                onClick={handleDownloadOnClick}
                            >Download</Button>
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
                        <Upload
                            name="file"
                            accept=".xls, .xlsx"
                            beforeUpload={() => false}
                            onChange={e => uploadChanged(e)}
                            showUploadList={false}
                        >
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                size="large"
                            >Import</Button>
                        </Upload>
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
                            <Column title="Semester" dataIndex="semester" key="semester" width={100} />
                            <Column title="Department name" dataIndex="departmentName" key="departmentName" width={150} />
                            <Column title="Course ID" dataIndex="courseCode" key="courseCode" width={100} />
                            <Column title="Course name" dataIndex="name" key="name" width={200} />
                            <Column title="Note" dataIndex="classNote" key="classNote" width={200} />
                            <Column title="Start week" dataIndex="startWeek" key="startWeek" width={100} />
                            <Column title="Number of lessons" dataIndex="numberOfLessons" key="numberOfLessons" width={100} />
                            <Column title="Number of week study" dataIndex="numberOfWeekStudy" key="numberOfWeekStudy" width={100} />
                            <Column title="Week off" dataIndex="weekOff" key="weekOff" width={100} />
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
                <div className={styles.modalTitle}>Create subject</div>
                <Form
                    form={createSubjectForm}
                    onFinish={onFormSubjectCreateFinish}
                    autoComplete="off"
                >
                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Semester:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="semester"
                            rules={[{ required: true, message: 'Please input semester!' }]}
                        >
                            <Input size='large' placeholder="Semester" />
                        </Form.Item>
                    </div>
                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Subject name:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="name"
                            rules={[{ required: true, message: 'Please input subject name!' }]}
                        >
                            <Input size="large" placeholder="Subject name" />
                        </Form.Item>
                    </div>
                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Note:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="classNote"
                            rules={[{ required: true, message: 'Please input subject note!' }]}
                        >
                            <Input size='large' placeholder="Note" />
                        </Form.Item>
                    </div>
                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Subject code:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="courseCode"
                            rules={[{ required: true, message: 'Please input subject code!' }]}
                        >
                            <Input size='large' placeholder="Subject code" />
                        </Form.Item>
                    </div>
                    <div className={styles.justifyField}>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Start week:</div>
                            <Form.Item<ISubjectInputType>
                                name="startWeek"
                                initialValue={1}
                            >
                                <InputNumber min={1} max={53} className={styles.inputNumberField} />
                            </Form.Item>
                        </div>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Total number of lesson:</div>
                            <Form.Item<ISubjectInputType>
                                name="totalNumberOfLessons"
                                initialValue={15}
                            >
                                <InputNumber min={1} className={styles.inputNumberField} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={styles.justifyField}>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Conditions:</div>
                            <Form.Item<ISubjectInputType>
                                name="conditions"
                                initialValue={1}
                            >
                                <InputNumber min={1} max={5} className={styles.inputNumberField} />
                            </Form.Item>
                        </div>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Number of lesson:</div>
                            <Form.Item<ISubjectInputType>
                                name="numberOfLessons"
                                initialValue={3}
                            >
                                <InputNumber min={1} max={6} className={styles.inputNumberField} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Department:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="departmentName"
                        >
                            <Input size='large' placeholder="Department name" />
                        </Form.Item>
                    </div>

                    <div className={styles.containerField}>
                        <div className={styles.titleField}>Week off:</div>
                        <Form.Item<ISubjectInputType>
                            className={styles.formInput}
                            name="weekOff"
                        >
                            <Input size='large' placeholder="11,35" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
            <Modal
                open={isDetailModalOpen}
                onCancel={handleDetailModalCancel}
                footer={false}
                className={styles.modalDetailClassroom}
            >
                <h2>Subject infomation</h2>
                {isDetailModalOpen && subjectDetail && (
                    <div>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Semester: </div>{subjectDetail.semester}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Department name: </div>{subjectDetail.departmentName}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Subject id: </div>{subjectDetail.courseCode}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Subject name: </div>{subjectDetail.name}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Class: </div>{subjectDetail.classNote}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Start week: </div>{subjectDetail.startWeek}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Number of lesson: </div>{subjectDetail.numberOfLessons}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Number of week study: </div>{subjectDetail.numberOfWeekStudy}</p>
                        <p className={styles.textContent}><div className={styles.detailModalTitle}>Week off: </div>{subjectDetail.weekOff}</p>
                    </div>
                )}
            </Modal>
            <Modal
                open={isEditModalOpen}
                onOk={editSubjectForm.submit}
                onCancel={handleEditModalCancel}
            >
                <div className={styles.modalTitle}>Edit subject</div>
                {isEditModalOpen && editSubjectDetail && (
                    <Form
                        form={editSubjectForm}
                        initialValues={{
                            semester: editSubjectDetail.semester,
                            name: editSubjectDetail.name,
                            classNote: editSubjectDetail.classNote,
                            courseCode: editSubjectDetail.courseCode,
                            startWeek: editSubjectDetail.startWeek,
                            totalNumberOfLessons: editSubjectDetail.numberOfLessons * editSubjectDetail.numberOfWeekStudy,
                            conditions: editSubjectDetail.conditions,
                            numberOfLessons: editSubjectDetail.numberOfLessons,
                            departmentName: editSubjectDetail.departmentName,
                            weekOff: editSubjectDetail.weekOff,
                        }}
                        onFinish={onFormEditFinish}
                        autoComplete="off"
                    >
                        {editSubjectDetail.name}
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Semester:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="semester"
                                rules={[{ required: true, message: 'Please input semester!' }]}
                            >
                                <Input size='large' placeholder="Semester" />
                            </Form.Item>
                        </div>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Subject name:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="name"
                                rules={[{ required: true, message: 'Please input subject name!' }]}
                            >
                                <Input size="large" placeholder="Subject name" />
                            </Form.Item>
                        </div>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Note:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="classNote"
                                rules={[{ required: true, message: 'Please input subject note!' }]}
                            >
                                <Input size='large' placeholder="Note" />
                            </Form.Item>
                        </div>
                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Subject code:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="courseCode"
                                rules={[{ required: true, message: 'Please input subject code!' }]}
                            >
                                <Input size='large' placeholder="Subject code" />
                            </Form.Item>
                        </div>
                        <div className={styles.justifyField}>
                            <div className={styles.containerField}>
                                <div className={styles.titleField}>Start week:</div>
                                <Form.Item<ISubjectInputType>
                                    name="startWeek"
                                >
                                    <InputNumber min={1} max={53} className={styles.inputNumberField} />
                                </Form.Item>
                            </div>
                            <div className={styles.containerField}>
                                <div className={styles.titleField}>Total number of lesson:</div>
                                <Form.Item<ISubjectInputType>
                                    name="totalNumberOfLessons"
                                >
                                    <InputNumber min={1} className={styles.inputNumberField} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className={styles.justifyField}>
                            <div className={styles.containerField}>
                                <div className={styles.titleField}>Conditions:</div>
                                <Form.Item<ISubjectInputType>
                                    name="conditions"
                                >
                                    <InputNumber min={1} max={5} className={styles.inputNumberField} />
                                </Form.Item>
                            </div>
                            <div className={styles.containerField}>
                                <div className={styles.titleField}>Number of lesson:</div>
                                <Form.Item<ISubjectInputType>
                                    name="numberOfLessons"
                                >
                                    <InputNumber min={1} max={6} className={styles.inputNumberField} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Department:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="departmentName"
                            >
                                <Input size='large' placeholder="Department name" />
                            </Form.Item>
                        </div>

                        <div className={styles.containerField}>
                            <div className={styles.titleField}>Week off:</div>
                            <Form.Item<ISubjectInputType>
                                className={styles.formInput}
                                name="weekOff"
                            >
                                <Input size='large' placeholder="11,35" />
                            </Form.Item>
                        </div>
                    </Form>
                )}
            </Modal>
            <Modal
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalCancel}
                onOk={handleDeleteOk}
            >
                <h2>Delete subject</h2>
                {isDeleteModalOpen && deleteSubjectDetail && (
                    <div>
                        <p className={styles.textContent}>Are you sure you want to delete subject <b>{deleteSubjectDetail.name}</b> of <b>{deleteSubjectDetail.classNote}</b>?</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ClassesPage;