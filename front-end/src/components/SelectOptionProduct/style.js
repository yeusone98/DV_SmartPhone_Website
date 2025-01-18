import styled from "styled-components";

export const VariantContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 16px;
`;

export const DropdownTrigger = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: white;

  &:hover {
    border-color: #4096ff;
  }
`;

export const VariantItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  ${props => props.selected && `
    background-color: #e6f4ff;
  `}
`;

export const ColorPreview = styled.div`
  width: 32px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${props => props.color === '#FFFFFF' ? '#E5E7EB' : props.color};
  background-color: ${props => props.color};
`;

export const SizePreview = styled.div`
  width: 32px;
  height: 48px;
  margin-left: 4px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VariantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PriceContainer = styled.div`
  text-align: right;
`;

export const CurrentPrice = styled.div`
  color: #ff4d4f;
  font-weight: 500;
`;

export const OriginalPrice = styled.div`
  color: #bfbfbf;
  text-decoration: line-through;
  font-size: 12px;
`;