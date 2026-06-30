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
import { ProductTagsService } from './tags.service';
import { ProductTag } from './@types/product-tag.interface';
import { GetResponseInterface } from '../../../utils/response/get-response.interface';
import { GetProductTagQueryDto } from './dto/get-product-tag-query.dto';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';

@Controller('products/tags')
export class ProductTagsController {
  constructor(private readonly productTagsService: ProductTagsService) {}

  @Get()
  getAllTags(
    @Query() query: GetProductTagQueryDto,
  ): Promise<GetResponseInterface<ProductTag>> {
    return this.productTagsService.getAllTags(query);
  }

  @Get(':id')
  getTag(@Param('id') id: number): Promise<ProductTag> {
    return this.productTagsService.getTag(id);
  }

  @Post()
  createTag(@Body() dto: CreateProductTagDto): Promise<ProductTag> {
    return this.productTagsService.createTag(dto);
  }

  @Put(':id')
  updateTag(
    @Param('id') id: number,
    @Body() dto: UpdateProductTagDto,
  ): Promise<ProductTag> {
    return this.productTagsService.updateTag(id, dto);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: number): Promise<ProductTag> {
    return this.productTagsService.deleteTag(id);
  }
}
