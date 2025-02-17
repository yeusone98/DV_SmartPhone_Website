import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, Typography, Space, Image, Row, Col, Input, Drawer } from 'antd';
import { SearchOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchProductsAPI } from "../../apis";
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import empty_state from '../../assets/images/empty_state.png'
import EmptySearchResults from '../EmptySearchResultsComponent/EmptySearchResults';

const { Text } = Typography;

const ProductComparisonComponent = () => {
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDeleteProduct = (productId) => {
    setComparisonProducts(prev => prev.filter(product => product.id !== productId));
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const response = await fetchProductsAPI();
        const initialProducts = response.slice(0, 2).map(product => {
          const firstVariant = product.variants?.[0];
          const specs = product.same_specifications?.[0] || {};
          return {
            id: product._id,
            name: product.name,
            price: firstVariant?.price,
            price_discount: firstVariant?.price_discount,
            image: firstVariant?.images?.[0],
            specs: {
              weight: specs.weight,
              material: specs.material,
              cpu: specs.cpu,
              cores: specs.cores,
              ram: specs.ram,
              screen_size: specs.screen_size,
              screen_resolution: specs.screen_resolution,
              storage: specs.storage,
              battery: specs.battery
            }
          };
        });
        setComparisonProducts(initialProducts);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm ban đầu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, record) => (
        <Space style={{ minWidth: '250px', padding: '10px' }} direction="vertical" size="middle">
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <Image
              style={{ height: '100px', width: '100px' }}
              preview={false}
              src={record.image}
              alt={text}
            />
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteProduct(record.id)}
              style={{ 
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '4px 8px',
                minWidth: 'unset',
                borderRadius: '50%'
              }}
            />
          </div>
          <Text strong>{text}</Text>
          <Space direction="vertical" size="small">
            <Text style={{ fontSize: '16px', fontWeight: '700' }}>
              {record.price?.toLocaleString('vi-VN')}đ
            </Text>
            {record.price_discount && (
              <Text style={{ fontSize: '14px', fontWeight: '400', color: 'rgb(133, 133, 133)' }} delete>
                {record.price_discount?.toLocaleString('vi-VN')}đ
              </Text>
            )}
          </Space>
           <Button style={{border:'1px solid rgb(133, 133, 133)', fontWeight:'500', color:'rgb(80, 78, 78)'}} type="text" onClick={() => window.location.href = `/product-detail/${record.id}`}>Xem chi tiết</Button>
        </Space>
      ),
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'weight',
      key: 'weight',
      render: (_, record) => record.specs?.weight || 'N/A',
    },
    {
      title: 'Chất liệu',
      dataIndex: 'material',
      key: 'material',
      render: (_, record) => record.specs?.material || 'N/A',
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      key: 'cpu',
      render: (_, record) => record.specs?.cpu || 'N/A',
    },
    {
      title: 'Số nhân',
      dataIndex: 'cores',
      key: 'cores',
      render: (_, record) => record.specs?.cores || 'N/A',
    },
    {
      title: 'RAM',
      dataIndex: 'ram',
      key: 'ram',
      render: (_, record) => record.specs?.ram || 'N/A',
    },
    {
      title: 'Màn hình',
      dataIndex: 'screen_size',
      key: 'screen_size',
      render: (_, record) => `${record.specs?.screen_size || 'N/A'} (${record.specs?.screen_resolution || 'N/A'})`,
    },
    {
      title: 'ROM',
      dataIndex: 'storage',
      key: 'storage',
      render: (_, record) => record.specs?.storage || 'N/A',
    },
    {
      title: 'Pin',
      dataIndex: 'battery',
      key: 'battery',
      render: (_, record) => record.specs?.battery || 'N/A',
    }
  ];

  const handleAddProduct = (product) => {
    const firstVariant = product.variants?.[0];
    const newProduct = {
      id: product._id,
      name: product.name,
      price: firstVariant?.price,
      price_discount: firstVariant?.price_discount,
      image: firstVariant?.images?.[0],
      specs: {
        weight: product.same_specifications?.[0]?.weight,
        material: product.same_specifications?.[0]?.material,
        cpu: product.same_specifications?.[0]?.cpu,
        cores: product.same_specifications?.[0]?.cores,
        ram: product.same_specifications?.[0]?.ram,
        screen_size: product.same_specifications?.[0]?.screen_size,
        screen_resolution: product.same_specifications?.[0]?.screen_resolution,
        storage: product.same_specifications?.[0]?.storage,
        battery: product.same_specifications?.[0]?.battery
      }
    };

    
    setComparisonProducts(prev => {
     
      return [...prev, newProduct];
    });
    setIsDrawerOpen(false);
  };

  const ProductSelectionContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [drawerLoading, setDrawerLoading] = useState(false);
    const [defaultProducts, setDefaultProducts] = useState([]);

    useEffect(() => {
      const fetchDefaultProducts = async () => {
        try {
          setDrawerLoading(true);
          const response = await fetchProductsAPI();
          setDefaultProducts(response.slice(0, 5));
        } catch (error) {
          console.error("Lỗi khi tải sản phẩm mặc định:", error);
          setDefaultProducts([]);
        } finally {
          setDrawerLoading(false);
        }
      };

      if (isDrawerOpen) {
        fetchDefaultProducts();
      }
    }, [isDrawerOpen]);

    const searchProducts = useCallback(
      debounce(async (value) => {
        if (!value.trim()) {
          setSearchResults([]);
          setDrawerLoading(false);
          return;
        }

        setDrawerLoading(true);
        try {
          const response = await fetchProductsAPI({ search: value });
          setSearchResults(response);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm sản phẩm:", error);
          setSearchResults([]);
        } finally {
          setDrawerLoading(false);
        }
      }, 500),
      []
    );

    useEffect(() => {
      searchProducts(searchTerm);
      return () => searchProducts.cancel();
    }, [searchTerm, searchProducts]);

    const displayProducts = searchTerm.trim() ? searchResults : defaultProducts;

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suffix={drawerLoading ? <span>Đang tìm...</span> : <SearchOutlined />}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
        {!drawerLoading && searchTerm.trim() && displayProducts.length === 0 ? (
          <EmptySearchResults searchTerm={searchTerm}/>
      ) : (
        displayProducts.map(product => {
          const firstVariant = product.variants?.[0];
          return (
            <Card key={product._id} style={{ marginBottom: '8px' }}>
              <Row>
                <Col span={12}>
                  <Space align="start">
                    <div>
                      <Image
                        src={firstVariant?.images?.[0]}
                        alt={product.name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                    <Space direction="vertical">
                      <div>
                        <Text strong>{product.name}</Text>
                      </div>
                      <div>
                        <Text>{firstVariant?.price?.toLocaleString('vi-VN')}đ</Text>
                        {firstVariant?.price_discount && (
                          <div>
                            <Text type="secondary" delete>
                              {firstVariant.price_discount.toLocaleString('vi-VN')}đ
                            </Text>
                          </div>
                        )}
                      </div>
                    </Space>
                  </Space>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    type="primary"
                    onClick={() => handleAddProduct(product)}
                  >
                    Thêm vào so sánh
                  </Button>
                </Col>
              </Row>
            </Card>
          );

        })
      )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <Row>
        <Col span={12}>
          <span style={{ fontSize: '20px', fontWeight: '600', padding: '16px' }}>So sánh sản phẩm tương tự</span>
        </Col>
        <Col span={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="link"
              icon={<SearchOutlined />}
              onClick={() => setIsDrawerOpen(true)}
              style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(0, 69, 255)' }}
            >
              Tìm sản phẩm khác để so sánh
            </Button>
          </div>
        </Col>
      </Row>

      <Table
        dataSource={comparisonProducts}
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        loading={loading}
      />

      <Drawer
        title="Chọn sản phẩm so sánh"
        placement="right"
        width={500}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        closeIcon={<CloseOutlined />}
      >
        <ProductSelectionContent />
      </Drawer>
    </Card>
  );
};

export default ProductComparisonComponent;