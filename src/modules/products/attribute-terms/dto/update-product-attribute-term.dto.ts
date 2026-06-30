import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAttributeTermDto } from './create-product-attribute-term.dto';

export class UpdateProductAttributeTermDto extends PartialType(
  CreateProductAttributeTermDto,
) {}
