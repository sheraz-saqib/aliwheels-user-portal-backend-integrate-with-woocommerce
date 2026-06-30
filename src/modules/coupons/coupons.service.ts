import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { Coupon } from './@types/coupon.interface';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { GetCouponQueryDto } from './dto/get-coupon-query.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllCoupons(
    query: GetCouponQueryDto,
  ): Promise<GetResponseInterface<Coupon>> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.paginate<Coupon>(
      `/coupons?${params.toString()}`,
      query.page,
      query.per_page,
    );
  }

  async getCoupon(id: number): Promise<Coupon> {
    return await this.axiosService.get<Coupon>(`/coupons/${id}`);
  }

  async createCoupon(dto: CreateCouponDto): Promise<Coupon> {
    return await this.axiosService.post<Coupon>('/coupons', dto);
  }

  async updateCoupon(id: number, dto: UpdateCouponDto): Promise<Coupon> {
    return await this.axiosService.put<Coupon>(`/coupons/${id}`, dto);
  }

  async deleteCoupon(id: number, force = true): Promise<Coupon> {
    return await this.axiosService.delete<Coupon>(
      `/coupons/${id}?force=${force}`,
    );
  }
}
