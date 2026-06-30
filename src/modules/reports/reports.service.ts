import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import {
  ReportLink,
  ReportTotal,
  SalesReport,
  TopSellerReport,
} from './@types/report.interface';
import { GetSalesReportQueryDto } from './dto/get-sales-report-query.dto';
import { GetTopSellersReportQueryDto } from './dto/get-top-sellers-report-query.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getReportLinks(): Promise<ReportLink[]> {
    return await this.axiosService.get<ReportLink[]>('/reports');
  }

  async getSalesReport(query: GetSalesReportQueryDto): Promise<SalesReport[]> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.get<SalesReport[]>(
      `/reports/sales?${params.toString()}`,
    );
  }

  async getTopSellersReport(
    query: GetTopSellersReportQueryDto,
  ): Promise<TopSellerReport[]> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return await this.axiosService.get<TopSellerReport[]>(
      `/reports/top_sellers?${params.toString()}`,
    );
  }

  async getCouponsTotals(): Promise<ReportTotal[]> {
    return await this.axiosService.get<ReportTotal[]>(
      '/reports/coupons/totals',
    );
  }

  async getCustomersTotals(): Promise<ReportTotal[]> {
    return await this.axiosService.get<ReportTotal[]>(
      '/reports/customers/totals',
    );
  }

  async getOrdersTotals(): Promise<ReportTotal[]> {
    return await this.axiosService.get<ReportTotal[]>('/reports/orders/totals');
  }

  async getProductsTotals(): Promise<ReportTotal[]> {
    return await this.axiosService.get<ReportTotal[]>(
      '/reports/products/totals',
    );
  }

  async getReviewsTotals(): Promise<ReportTotal[]> {
    return await this.axiosService.get<ReportTotal[]>(
      '/reports/reviews/totals',
    );
  }
}
