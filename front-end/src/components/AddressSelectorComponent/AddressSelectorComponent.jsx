import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const AddressSelector = ({ form }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  const handleProvinceChange = (value) => {
    const province = provinces.find(p => p.code === value);
    setSelectedProvince(value);
    
    // Directly set the name in the form
    form.setFieldsValue({
      province: province.name,
      district: undefined,
      ward: undefined
    });
    
    setDistricts(province ? province.districts : []);
    setWards([]);
  };

  const handleDistrictChange = (value) => {
    const district = districts.find(d => d.code === value);
    setSelectedDistrict(value);
    
    // Directly set the name in the form
    form.setFieldsValue({
      district: district.name,
      ward: undefined
    });
    
    setWards(district ? district.wards : []);
  };

  const handleWardChange = (value) => {
    const ward = wards.find(w => w.code === value);
    
    // Directly set the name in the form
    form.setFieldsValue({
      ward: ward.name
    });
  };

  return (
    <>
      <Form.Item 
        label="Tỉnh/Thành phố" 
        name="province" 
        rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
      >
        <Select
          placeholder="Chọn tỉnh/thành phố"
          onChange={handleProvinceChange}
          value={selectedProvince}
        >
          {provinces.map(province => (
            <Option key={province.code} value={province.code}>
              {province.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item 
        label="Quận/Huyện" 
        name="district" 
        rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
      >
        <Select
          placeholder="Chọn quận/huyện"
          onChange={handleDistrictChange}
          value={selectedDistrict}
          disabled={!selectedProvince}
        >
          {districts.map(district => (
            <Option key={district.code} value={district.code}>
              {district.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item 
        label="Phường/Xã" 
        name="ward" 
        rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
      >
        <Select
          placeholder="Chọn phường/xã"
          onChange={handleWardChange}
          disabled={!selectedDistrict}
        >
          {wards.map(ward => (
            <Option key={ward.code} value={ward.code}>
              {ward.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default AddressSelector;