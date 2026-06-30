import { PartialType } from '@nestjs/mapped-types';
import { CreateProductShippingClassDto } from './create-product-shipping-class.dto';

export class UpdateProductShippingClassDto extends PartialType(
  CreateProductShippingClassDto,
) {}
