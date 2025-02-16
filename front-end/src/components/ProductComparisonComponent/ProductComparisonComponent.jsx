import React, { useState } from 'react';
import { Card, Table, Button, Typography, Space, Image, Row, Col, Input, Drawer, Empty } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import empty_state from '../../assets/images/empty_state.png'
import { fetchProductsAPI } from "../../apis";




const { Title, Text } = Typography;

const ProductComparisonComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [product, setProduct] = useState(null);
  const [comparisonProducts, setComparisonProducts] = useState([
    {
      id: 1,
      name: 'iPhone 16 128GB',
      price: 21490000,
      oldPrice: 22990000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/iphone_16_teal_09fe254c00.png',
      weight: '170 g',
      material: 'Mặt lưng máy: Kính, Khung máy: Nhôm nguyên khối',
      cpu: 'Apple A18',
      cores: 6,
      ram: '8 GB',
      screenSize: '6.1 inch',
      resolution: '2532 x 1170 pixels',
      rom: '128 GB',
      battery: '3279 mAh'
    },
    {
      id: 2,
      name: 'Samsung Galaxy Z Flip4 5G 128GB',
      price: 9990000,
      oldPrice: 23000000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/iphone_16_teal_09fe254c00.png',
      weight: '183 g',
      material: 'Khung máy: Kim loại, Mặt lưng máy: Kính cường lực',
      cpu: 'Snapdragon 8+ Gen 1',
      cores: 8,
      ram: '8 GB',
      screenSize: '6.7 inch',
      resolution: '2640 x 1080 pixels',
      rom: '128 GB',
      battery: '3700 mAh'
    }
  ]);

  const modalProducts = [
    {
      id: 3,
      name: 'iPhone 16 128GB',
      price: 21390000,
      originalPrice: 22990000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/iphone_16_teal_09fe254c00.png',
      chip: 'Chip Apple A18',
      weight: '170 g',
      material: 'Mặt lưng máy: Kính, Khung máy: Nhôm nguyên khối',
      cores: 6,
      ram: '8 GB',
      screenSize: '6.1 inch',
      resolution: '2640 x 1080 pixels',
      rom: '128 GB',
      battery: '3700 mAh'
    },
    {
      id: 4,
      name: 'iPhone 16 Plus 128GB',
      price: 24790000,
      originalPrice: 26000000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/iphone_16_teal_09fe254c00.png',
      chip: 'Chip Apple A18', 
      weight: '175 g',
      material: 'Mặt lưng máy: Kính, Khung máy: Nhôm nguyên khối',
      cores: 6,
      ram: '8 GB',
      screenSize: '6.7 inch',
      resolution: '2640 x 1080 pixels',
      rom: '128 GB',
      battery: '3700 mAh'
    },
    {
      id: 5,
      name: 'iPhone 16 Pro 128GB',
      price: 27490000,
      originalPrice: 28990000,
      image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/iphone_16_teal_09fe254c00.png',
      chip: 'Chip A18 Pro',
      weight: '180 g',
      material: 'Mặt lưng máy: Kính, Khung máy: Titan',
      cores: 6,
      ram: '8 GB',
      screenSize: '6.1 inch',
      resolution: '2640 x 1080 pixels',
      rom: '128 GB',
      battery: '3700 mAh'
    }
  ];

  const handleAddProduct = (product) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.originalPrice,
      image: product.image,
      weight: product.weight,
      material: product.material,
      cpu: product.chip,
      cores: product.cores,
      ram: product.ram,
      screenSize: product.screenSize,
      resolution: product.resolution,
      rom: product.rom,
      battery: product.battery
    };
    
    setComparisonProducts([...comparisonProducts, newProduct]);
    setIsDrawerOpen(false);
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space style={{  minWidth: '250px', paddingTop:'10px',paddingLeft:'10px', paddingBottom:'10px'}} direction="vertical" size="middle" >
          <Image
            style={{ height: '100px', width: '100px' }}
            preview={false}
            src={record.image}
            alt={text}
          />
          <Text strong>{text}</Text>
          <Space direction="vertical" size="small">
            <Text style={{fontSize:'16px', fontWeight:'700'}}>
              {record.price.toLocaleString()}đ
            </Text>
            <Text style={{fontSize:'14px', fontWeight:'400', color:'rgb(133, 133, 133)'}} delete  >
              {record.oldPrice.toLocaleString()}đ
            </Text>
          </Space>
          <Button type="primary" >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
    {
      title: 'Trọng lượng sản phẩm',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Chất liệu',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Phiên bản CPU',
      dataIndex: 'cpu',
      key: 'cpu',
    },
    {
      title: 'Số nhân',
      dataIndex: 'cores',
      key: 'cores',
    },
    {
      title: 'RAM',
      dataIndex: 'ram',
      key: 'ram',
    },
    {
      title: 'Kích thước màn hình',
      dataIndex: 'screenSize',
      key: 'screenSize',
    },
    {
      title: 'Độ phân giải',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: 'Rom',
      dataIndex: 'rom',
      key: 'rom',
    },
    {
      title: 'Pin',
      dataIndex: 'battery',
      key: 'battery',
      render: (text) => <Text style={{ color: '#6b7280' }}>{text}</Text>,
    },
  ];

  const ProductSelectionContent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = modalProducts.filter(product =>
      searchTerm.trim() !== '' && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const NoResultsFound = () => (
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <Image
          src={empty_state}
          alt="No results found"
          preview={false}
          style={{ marginBottom: '16px' }}
        />
        <Text strong style={{ display: 'block', fontSize: '16px' }}>
          Tiếc quá! Chúng tôi không tìm thấy kết quả với từ khóa "<Text type="danger">{searchTerm}</Text>"
        </Text>
      </div>
    );

    return (
      <div >
        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suffix={<SearchOutlined className="text-gray-400" />}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {searchTerm.trim() !== '' && filteredProducts.length === 0 ? (
            <NoResultsFound />
          ) : (
            filteredProducts.map(product => (
              <Card key={product.id} style={{ marginBottom: '8px' }}>
                <Row>
                  <Col span={12}>
                      <Space align="start">
                      <div>
                        <Image
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>

                      <Space direction="vertical">
                        <div>
                          <Text strong>{product.name}</Text>
                        </div>

                        <div>
                          <Text>{product.price.toLocaleString()}đ</Text>
                          <div>
                            <Text type="secondary" delete>
                              {product.originalPrice.toLocaleString()}đ
                            </Text>
                          </div>
                        </div>

                        
                      </Space>
                    </Space>
                  </Col>
                  <Col span={12} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                  <Button
                      type="primary"
                      onClick={() => handleAddProduct(product)}
                    >
                      Thêm vào so sánh
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))
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
              style={{ fontSize: '16px', fontWeight: '600',color:'rgb(0, 69, 255)' }}
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