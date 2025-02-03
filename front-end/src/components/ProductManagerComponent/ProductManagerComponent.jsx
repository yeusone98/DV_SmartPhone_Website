import React, { useState, useEffect } from 'react';
import {
    Table,
    Card,
    Button,
    Tag,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Drawer,
    Descriptions,
    Space,
    Upload,
    message,
} from 'antd';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { createProductAPI, updateProductAPI, deleteProductAPI, fetchProductsAPI } from '../../apis';

const { Option } = Select;

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState([]); // Lưu file ảnh upload
    const [form] = Form.useForm();

    const productStatuses = [
        { label: 'Available', value: 'available', color: 'green' },
        { label: 'Unavailable', value: 'unavailable', color: 'red' },
    ];

    // Fetch products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const data = await fetchProductsAPI();
            const formattedData = data.map((product) => ({
                ...product,
                price: String(product.price), // Ensure price is a string
                stock: String(product.stock), // Ensure stock is a string
            }));
            setProducts(formattedData);
        } catch (error) {
            message.error('Failed to fetch products!');
        }
    };

    // Handle adding or updating a product
    const handleSaveProduct = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('category_id', values.category_id);
        formData.append('price', String(values.price));
        formData.append('price_discount', values.price_discount || null);
        formData.append('stock', String(values.stock));
        formData.append('status', values.status);
        formData.append('description_detail', description);
        formData.append('youtube_link', values.youtube_link || null);

        // Thêm ảnh cũ (URL) vào formData
        const existingImages = imageFiles
            .filter((file) => file.url)
            .map((file) => file.url);
        formData.append('existingImages', JSON.stringify(existingImages));

        // Thêm ảnh mới vào formData
        imageFiles
            .filter((file) => !file.url)
            .forEach((file) => {
                formData.append('images', file.originFileObj);
            });

        try {
            if (editingProduct) {
                await updateProductAPI(editingProduct._id, formData);
                message.success('Product updated successfully!');
            } else {
                await createProductAPI(formData);
                message.success('Product added successfully!');
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingProduct(null);
            setImageFiles([]);
            fetchProducts();
        } catch (error) {
            message.error('Failed to save product!');
        }
    };


    // Handle deleting a product
    const handleDeleteProduct = async (product) => {
        try {
            await deleteProductAPI(product._id);
            message.success('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            message.error('Failed to delete product!');
        }
    };

    const handleViewProduct = (product) => {
        setViewProduct(product);
        setIsDrawerVisible(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setDescription(product.description_detail || ''); // Load description into editor
        setImageFiles(product.image_urls?.map((url) => ({ url })) || []); // Load existing images
        form.setFieldsValue({
            ...product,
            price: Number(product.price), // Convert to number for the InputNumber component
            stock: Number(product.stock),
        });
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category ID',
            dataIndex: 'category_id',
            key: 'category_id',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                const price = Number(record.price).toLocaleString('vi-VN'); // Định dạng số
                const discountPrice = record.price_discount
                    ? Number(record.price_discount).toLocaleString('vi-VN')
                    : null;
                return discountPrice ? (
                    <div>
                        <span style={{ color: 'green', fontWeight: 'bold', marginRight: 8 }}>
                            {discountPrice} VND
                        </span>
                        <span style={{ textDecoration: 'line-through', color: '#888' }}>
                            {price} VND
                        </span>
                    </div>
                ) : (
                    `${price} VND`
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusObj = productStatuses.find((s) => s.value === status);
                return <Tag color={statusObj?.color}>{statusObj?.label}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => handleViewProduct(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEditProduct(record)} />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDeleteProduct(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setEditingProduct(null);
                        form.resetFields();
                        setDescription(''); // Reset description
                        setImageFiles([]); // Clear images
                        setIsModalVisible(true);
                    }}
                >
                    Add Product
                </Button>
            </Card>

            <Table columns={columns} dataSource={products} rowKey="_id" pagination={{ pageSize: 5 }} />

            {/* Add/Edit Product Modal */}
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingProduct(null);
                    setImageFiles([]);
                }}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSaveProduct}>
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category_id"
                        label="Category ID"
                        rules={[{ required: true, message: 'Please input category ID!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="youtube_link"
                        label="YouTube Link"
                        rules={[{ type: 'url', message: 'Please input a valid URL!' }]}
                    >
                        <Input placeholder="https://example.com" />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please input stock!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="price_discount"
                        label="Discount Price"
                        rules={[
                            { required: false, message: 'Please input discount price!' },
                        ]}
                    >
                        <Input placeholder="Enter discount price" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select>
                            {productStatuses.map((status) => (
                                <Option key={status.value} value={status.value}>
                                    {status.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description">
                        <ReactQuill value={description} onChange={setDescription} />
                    </Form.Item>
                    <Form.Item label="Upload Images">
                        <Upload
                            listType="picture-card"
                            fileList={imageFiles}
                            beforeUpload={() => false} // Prevent automatic upload
                            onChange={({ fileList }) => setImageFiles(fileList)}
                            onRemove={(file) => {
                                const updatedFiles = imageFiles.filter((item) => item.uid !== file.uid);
                                setImageFiles(updatedFiles); // Cập nhật danh sách ảnh sau khi xóa
                            }}
                        >
                            <div>
                                <UploadOutlined /> Upload
                            </div>
                        </Upload>

                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsModalVisible(false);
                                    form.resetFields();
                                    setEditingProduct(null);
                                    setImageFiles([]);
                                }}
                            >
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Product Drawer */}
            <Drawer
                title="Product Details"
                width={2000}
                visible={isDrawerVisible}
                onClose={() => {
                    setIsDrawerVisible(false);
                    setViewProduct(null);
                }}
            >
                {viewProduct && (
                    <Descriptions column={1}>
                        <Descriptions.Item label="Name">{viewProduct.name}</Descriptions.Item>
                        <Descriptions.Item label="Category ID">{viewProduct.category_id}</Descriptions.Item>
                        <Descriptions.Item label="YouTube Link">
                            {viewProduct.youtube_link ? (
                                <a href={viewProduct.youtube_link} target="_blank" rel="noopener noreferrer">
                                    {viewProduct.youtube_link}
                                </a>
                            ) : (
                                'No Link'
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Stock">{viewProduct.stock}</Descriptions.Item>
                        <Descriptions.Item label="Price">
                            {viewProduct.price_discount ? (
                                <>
                                    <span style={{ color: 'green', fontWeight: 'bold', marginRight: 8 }}>
                                        {Number(viewProduct.price_discount).toLocaleString('vi-VN')} VND
                                    </span>
                                    <span style={{ textDecoration: 'line-through', color: '#888' }}>
                                        {Number(viewProduct.price).toLocaleString('vi-VN')} VND
                                    </span>
                                </>
                            ) : (
                                `${Number(viewProduct.price).toLocaleString('vi-VN')} VND`
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Status">
                            <Tag color={productStatuses.find((s) => s.value === viewProduct.status)?.color}>
                                {productStatuses.find((s) => s.value === viewProduct.status)?.label}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                            <div dangerouslySetInnerHTML={{ __html: viewProduct.description_detail }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Images">
                            {viewProduct.image_urls?.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`product-img-${index}`}
                                    style={{ width: '50px', marginRight: '8px' }}
                                />
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
};

export default ProductManagement;
