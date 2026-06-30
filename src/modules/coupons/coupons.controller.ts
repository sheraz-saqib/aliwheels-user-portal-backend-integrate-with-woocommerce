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
import { CouponsService } from './coupons.service';
import { Coupon } from './@types/coupon.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetCouponQueryDto } from './dto/get-coupon-query.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  getAllCoupons(
    @Query() query: GetCouponQueryDto,
  ): Promise<GetResponseInterface<Coupon>> {
    return this.couponsService.getAllCoupons(query);
  }

  @Get(':id')
  getCoupon(@Param('id') id: number): Promise<Coupon> {
    return this.couponsService.getCoupon(id);
  }

  @Post()
  createCoupon(@Body() dto: CreateCouponDto): Promise<Coupon> {
    return this.couponsService.createCoupon(dto);
  }

  @Put(':id')
  updateCoupon(
    @Param('id') id: number,
    @Body() dto: UpdateCouponDto,
  ): Promise<Coupon> {
    return this.couponsService.updateCoupon(id, dto);
  }

  @Delete(':id')
  deleteCoupon(@Param('id') id: number): Promise<Coupon> {
    return this.couponsService.deleteCoupon(id);
  }
}
