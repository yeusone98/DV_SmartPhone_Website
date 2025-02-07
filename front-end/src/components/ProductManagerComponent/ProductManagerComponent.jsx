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
import { WrapperDescription } from '../ProductDetailComponent/style';

const { Option } = Select;

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [form] = Form.useForm();
    const [variants, setVariants] = useState([]);
    const [technicalSpecifications, setTechnicalSpecifications] = useState('');

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
            
            // Sắp xếp theo thời gian (created_at) ở frontend, từ mới nhất đến cũ nhất
            const formattedData = data
                .map((product) => ({
                    ...product,
                    price: String(product.price),
                    stock: String(product.stock),
                }))
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));  // Sắp xếp theo thời gian, sản phẩm mới nhất lên đầu
            
            setProducts(formattedData);
        } catch (error) {
            message.error('Failed to fetch products!');
        }
    };
    

    // Handle adding or updating a product
    const handleSaveProduct = async (values) => {
        const formData = new FormData();

        // Thêm các trường dữ liệu cơ bản
        formData.append("name", values.name);
        formData.append("youtube_link", values.youtube_link || '');
        formData.append("description_detail", description);
        formData.append("technical_specifications", technicalSpecifications);
        formData.append("status", values.status);

        // Xử lý ảnh chính
        formData.append("image_urls", JSON.stringify(
            imageFiles
              .filter(file => file.url) // Chỉ lấy các ảnh đã tồn tại
              .map(file => file.url)
          ));

        
        // Thêm ảnh mới vào FormData
        imageFiles
            .filter(file => !file.url)
            .forEach(file => {
                formData.append('images', file.originFileObj);
            });
    
        // Xử lý variants: Gửi metadata dưới dạng JSON và ảnh riêng
        // Xử lý variants
        const processedVariants = variants.map(variant => ({
            storage: variant.storage,
            color: variant.color,
            price: Number(variant.price),
            price_discount: variant.price_discount ? Number(variant.price_discount) : null,
            stock: Number(variant.stock),
            // Giữ nguyên ảnh cũ nếu có
            images: variant.images.filter(img => img.url).map(img => img.url) 
        }));

        formData.append('variants', JSON.stringify(processedVariants));

        // Xử lý upload ảnh mới cho từng variant
        variants.forEach((variant, index) => {
            variant.images.forEach((image) => {
                if (image.originFileObj) {
                    formData.append(`variants[${index}][images]`, image.originFileObj);
                }
            });
        });

        try {
            if (editingProduct) {
                await updateProductAPI(editingProduct._id, formData);
            } else {
                await createProductAPI(formData);
            }
            // Reset form và fetch lại dữ liệu
            setIsModalVisible(false);
            fetchProducts();
            form.resetFields();
            setEditingProduct(null);
            setImageFiles([]);
            message.success("Product saved successfully!");
        } catch (error) {
            message.error("Failed to save product!");
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
        if (!product) {
            console.error("Error: Product is null or undefined");
            return;
        }
    
        console.log("Product Data:", product);
        console.log("Variants Data:", product.variants);
    
        setViewProduct({
            ...product,
            variants: product.variants || [], // ✅ Đảm bảo variants không bị `null`
        });
    
        setIsDrawerVisible(true);
    };
    
    const tableStyle = {
        width: '100%',
        overflowX: 'auto',
        marginBottom: '10px'
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setDescription(product.description_detail || '');
        setTechnicalSpecifications(product.technical_specifications || ''); // Thêm dòng này
        
        // Xử lý ảnh slide
        setImageFiles(product.image_urls?.map((url, index) => ({ 
            uid: `old-${index}`, 
            url,
            status: 'done' 
        })) || []);
        
        // Xử lý variants và ảnh của variant
        setVariants(product.variants?.map(variant => ({
            ...variant,
            images: variant.images?.map((img, imgIndex) => ({
                uid: `variant-img-${imgIndex}`,
                url: img,
                status: 'done'
            })) || []
        })) || []);
        
        form.setFieldsValue({
            ...product,
        });
        setIsModalVisible(true);
    };

    const handleVariantChange = (index, key, value) => {
        console.log(`Variant ${index} updated:`, value);  // Kiểm tra giá trị variant đã thay đổi
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index][key] = value;
            return updatedVariants;
        });
    };
    
    
    const addVariant = () => {
        setVariants((prevVariants) => [
            ...prevVariants,
            { storage: '', color: '', price: '', price_discount: '', stock: 0, images: [] }
        ]);
    };
    
    const removeVariant = (index) => {
        setVariants((prevVariants) => {
            const newVariants = [...prevVariants];
            newVariants.splice(index, 1);
            return newVariants.length > 0 ? newVariants : [{ storage: '', color: '', price: '', stock: 0, images: [] }];
        });
    };
    
    const handleOpenModal = () => {
        setEditingProduct(null);
        form.resetFields();
        setDescription('');
        setTechnicalSpecifications(''); 
        setImageFiles([]);
        setVariants([{ storage: '', color: '', price: 0, price_discount: 0, stock: 0, images: [] }]); 
        setIsModalVisible(true);
    };
    
      

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                const statusObj = productStatuses.find((s) => s.value === status);
                return <Tag color={statusObj?.color}>{statusObj?.label}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => handleViewProduct(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEditProduct(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteProduct(record)} />
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
                    onClick={handleOpenModal} // Thay vì setIsModalVisible(true), gọi hàm handleOpenModal
                >
                    Add Product
             </Button>

            </Card>

            <Table columns={columns} dataSource={products} rowKey="_id" pagination={{ pageSize: 10 }} />

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
                width={1000}
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
                        name="youtube_link"
                        label="YouTube Link"
                        rules={[{ type: 'url', message: 'Please input a valid URL!' }]}
                    >
                        <Input placeholder="https://example.com" />
                    </Form.Item>

                    {/* Variant Form - Adding Multiple Variants */}
                    <Form.Item label="Variants">
                        <div style={tableStyle}>
                            <Table
                                columns={[
                                    {
                                        title: 'Storage',
                                        dataIndex: 'storage',
                                        key: 'storage',
                                        render: (text, record, index) => (
                                            <Input
                                                value={text}
                                                onChange={(e) => handleVariantChange(index, 'storage', e.target.value)}
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Color',
                                        dataIndex: 'color',
                                        key: 'color',
                                        render: (text, record, index) => (
                                            <Input
                                                value={text}
                                                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Price',
                                        dataIndex: 'price',
                                        key: 'price',
                                        render: (text, record, index) => (
                                            <InputNumber
                                                min={0}
                                                value={text || 0}
                                                onChange={(value) => handleVariantChange(index, 'price', value || 0)}
                                                style={{ width: '100%' }}
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Price Discounted',
                                        dataIndex: 'price_discount',
                                        key: 'price_discount',
                                        render: (text, record, index) => (
                                            <InputNumber
                                                min={0}
                                                value={text || 0}
                                                onChange={(value) => handleVariantChange(index, 'price_discount', value || 0)}
                                                style={{ width: '100%' }}
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Stock',
                                        dataIndex: 'stock',
                                        key: 'stock',
                                        render: (text, record, index) => (
                                            <InputNumber
                                                min={0}
                                                value={text}
                                                onChange={(value) => handleVariantChange(index, 'stock', value)}
                                                style={{ width: '100%' }}
                                            />
                                        ),
                                    },
                                    {
                                        title: 'Images',
                                        dataIndex: 'images',
                                        key: 'images',
                                        render: (text, record, index) => (
                                            <Upload
                                                listType="picture-card"
                                                fileList={record.images}
                                                onChange={({ fileList }) => handleVariantChange(index, 'images', fileList)}
                                                beforeUpload={() => false}
                                                multiple
                                            >
                                                {record.images?.length < 5 && (
                                                    <div>
                                                        <UploadOutlined />
                                                        <div style={{ marginTop: 8 }}>Upload</div>
                                                    </div>
                                                )}
                                            </Upload>
                                        )
                                    },
                                    {
                                        title: 'Actions',
                                        key: 'actions',
                                        render: (_, record, index) => (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button danger size="small" onClick={() => removeVariant(index)}>Remove</Button>
                                            </div>
                                        ),
                                    }
                                ]}
                                dataSource={variants}
                                rowKey={(record, index) => `variant-${index}`}
                                pagination={false}
                                footer={() => (
                                    <Button type="dashed" icon={<PlusOutlined />} onClick={addVariant}>
                                        Add Variant
                                    </Button>
                                )}
                            />
                        </div>
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
                    <Form.Item label="Technical Specifications">
                        <ReactQuill value={technicalSpecifications} onChange={setTechnicalSpecifications} />
                    </Form.Item>

                    <Form.Item label="Upload Images For Slide">
                        <Upload
                            name="images"
                            listType="picture-card"
                            fileList={imageFiles}
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setImageFiles(fileList)}
                            onRemove={(file) => {
                                const updatedFiles = imageFiles.filter((item) => item.uid !== file.uid);
                                setImageFiles(updatedFiles);
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
                    <Descriptions column={1} bordered>
                        {/* Thông tin chung */}
                        <Descriptions.Item label="Name">{viewProduct.name}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={productStatuses.find((s) => s.value === viewProduct.status)?.color}>
                                {productStatuses.find((s) => s.value === viewProduct.status)?.label}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="YouTube Link">
                            {viewProduct.youtube_link ? (
                                <a href={viewProduct.youtube_link} target="_blank" rel="noopener noreferrer">
                                    {viewProduct.youtube_link}
                                </a>
                            ) : (
                                'No Link'
                            )}
                        </Descriptions.Item>

                        {/* Mô tả sản phẩm */}
                        <Descriptions.Item label="Description">
                            <WrapperDescription dangerouslySetInnerHTML={{ __html: viewProduct.description_detail }} />
                        </Descriptions.Item>

                        {/* Thông số kỹ thuật */}
                        <Descriptions.Item label="Technical Specifications">
                            <WrapperDescription dangerouslySetInnerHTML={{ __html: viewProduct.technical_specifications }} />
                        </Descriptions.Item>

                        {/* Danh sách phiên bản */}
                        <Descriptions.Item label="Variants">
                            <Table
                                columns={[
                                    {
                                        title: 'Storage',
                                        dataIndex: 'storage',
                                        key: 'storage',
                                        width: 100,
                                    },
                                    {
                                        title: 'Color',
                                        dataIndex: 'color',
                                        key: 'color',
                                        width: 120,
                                        render: (text, record) => (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {text}
                                            </div>
                                        ),
                                    },
                                    {
                                        title: 'Price',
                                        dataIndex: 'price',
                                        key: 'price',
                                        width: 180,
                                        render: (text, record) => (
                                            record.price_discount ? (
                                                <>
                                                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                                                        {Number(record.price_discount).toLocaleString('vi-VN')} VND
                                                    </span>
                                                    <br />
                                                    <span style={{ textDecoration: 'line-through', color: '#888' }}>
                                                        {Number(record.price).toLocaleString('vi-VN')} VND
                                                    </span>
                                                </>
                                            ) : (
                                                `${Number(record.price).toLocaleString('vi-VN')} VND`
                                            )
                                        ),
                                    },
                                    {
                                        title: 'Stock',
                                        dataIndex: 'stock',
                                        key: 'stock',
                                        width: 100,
                                    },
                                    {
                                        title: 'Images',
                                        dataIndex: 'images',
                                        key: 'images',
                                        width: 200,
                                        render: (images) => (
                                            images?.length > 0 ? (
                                                images.map((url, index) => (
                                                    <img
                                                        key={index}
                                                        src={url}
                                                        alt={`variant-img-${index}`}
                                                        style={{ width: '40px', height: '40px', marginRight: '5px' }}
                                                    />
                                                ))
                                            ) : (
                                                <span>No Images</span>
                                            )
                                        ),
                                    },
                                ]}
                                dataSource={viewProduct.variants || []}
                                rowKey={(record, index) => `variant-${index}`}
                                pagination={false}
                            />
                        </Descriptions.Item>


                        {/* Hình ảnh chung của sản phẩm */}
                        <Descriptions.Item label="Product Images Slide">
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
