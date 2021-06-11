export interface Product {
  id: number;
  brandId: number;
  brandName;
  string;
  categoryId: number;
  categoryName: string;
  description: string;
  productName: string;
  productCode: string;
  productSKU: string;
  taxEffectDate: Date;
  hSNCode: string;
  purchageRate: number;
  saleRate: number;
  saleMargin: number;
  mrp: number;
  isStockable: boolean;
  isReturnable: boolean;
  isAllowMinStockSale: boolean;
  remark: string;
  warrantyMonth: number;
  taxId: number;
  taxName: string;
  taxRate: number;
  created: Date;
}
