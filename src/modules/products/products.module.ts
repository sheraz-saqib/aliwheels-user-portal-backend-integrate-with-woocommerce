import { Module } from '@nestjs/common';
import { AxiosModule } from '../../utils/axios/axios.module';
import { ProductsController } from './product/product.controller';
import { ProductVariationsController } from './variations/variations.controller';
import { ProductCategoriesController } from './categories/categories.controller';
import { ProductTagsController } from './tags/tags.controller';
import { ProductAttributesController } from './attributes/attributes.controller';
import { ProductAttributeTermsController } from './attribute-terms/attribute-terms.controller';
import { ProductShippingClassesController } from './shipping-classes/shipping-classes.controller';
import { ProductReviewsController } from './reviews/reviews.controller';
import { ProductsService } from './product/product.service';
import { ProductVariationsService } from './variations/variations.service';
import { ProductCategoriesService } from './categories/categories.service';
import { ProductTagsService } from './tags/tags.service';
import { ProductAttributesService } from './attributes/attributes.service';
import { ProductAttributeTermsService } from './attribute-terms/attribute-terms.service';
import { ProductShippingClassesService } from './shipping-classes/shipping-classes.service';
import { ProductReviewsService } from './reviews/reviews.service';

@Module({
  imports: [AxiosModule],
  controllers: [
    ProductCategoriesController,
    ProductTagsController,
    ProductAttributeTermsController,
    ProductAttributesController,
    ProductShippingClassesController,
    ProductReviewsController,
    ProductVariationsController,
    ProductsController,
  ],
  providers: [
    ProductsService,
    ProductVariationsService,
    ProductCategoriesService,
    ProductTagsService,
    ProductAttributesService,
    ProductAttributeTermsService,
    ProductShippingClassesService,
    ProductReviewsService,
  ],
})
export class ProductsModule {}
