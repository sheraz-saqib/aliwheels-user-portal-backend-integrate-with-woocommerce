import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductAttributeTermsService } from './attribute-terms.service';
import { ProductAttributeTerm } from './@types/product-attribute-term.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductAttributeTermQueryDto } from './dto/get-product-attribute-term-query.dto';
import { CreateProductAttributeTermDto } from './dto/create-product-attribute-term.dto';
import { UpdateProductAttributeTermDto } from './dto/update-product-attribute-term.dto';

@Controller('products/attributes/:attributeId/terms')
export class ProductAttributeTermsController {
  constructor(
    private readonly productAttributeTermsService: ProductAttributeTermsService,
  ) {}

  @Get()
  getAllTerms(
    @Param('attributeId') attributeId: number,
    @Query() query: GetProductAttributeTermQueryDto,
  ): Promise<GetResponseInterface<ProductAttributeTerm>> {
    return this.productAttributeTermsService.getAllTerms(attributeId, query);
  }

  @Get(':id')
  getTerm(
    @Param('attributeId') attributeId: number,
    @Param('id') id: number,
  ): Promise<ProductAttributeTerm> {
    return this.productAttributeTermsService.getTerm(attributeId, id);
  }

  @Post()
  createTerm(
    @Param('attributeId') attributeId: number,
    @Body() dto: CreateProductAttributeTermDto,
  ): Promise<ProductAttributeTerm> {
    return this.productAttributeTermsService.createTerm(attributeId, dto);
  }

  @Put(':id')
  updateTerm(
    @Param('attributeId') attributeId: number,
    @Param('id') id: number,
    @Body() dto: UpdateProductAttributeTermDto,
  ): Promise<ProductAttributeTerm> {
    return this.productAttributeTermsService.updateTerm(attributeId, id, dto);
  }

  @Delete(':id')
  deleteTerm(
    @Param('attributeId') attributeId: number,
    @Param('id') id: number,
  ): Promise<ProductAttributeTerm> {
    return this.productAttributeTermsService.deleteTerm(attributeId, id);
  }
}
