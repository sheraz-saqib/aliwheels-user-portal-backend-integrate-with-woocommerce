import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {
  ReportLink,
  ReportTotal,
  SalesReport,
  TopSellerReport,
} from './@types/report.interface';
import { GetSalesReportQueryDto } from './dto/get-sales-report-query.dto';
import { GetTopSellersReportQueryDto } from './dto/get-top-sellers-report-query.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReportLinks(): Promise<ReportLink[]> {
    return this.reportsService.getReportLinks();
  }

  @Get('sales')
  getSalesReport(
    @Query() query: GetSalesReportQueryDto,
  ): Promise<SalesReport[]> {
    return this.reportsService.getSalesReport(query);
  }

  @Get('top_sellers')
  getTopSellersReport(
    @Query() query: GetTopSellersReportQueryDto,
  ): Promise<TopSellerReport[]> {
    return this.reportsService.getTopSellersReport(query);
  }

  @Get('coupons/totals')
  getCouponsTotals(): Promise<ReportTotal[]> {
    return this.reportsService.getCouponsTotals();
  }

  @Get('customers/totals')
  getCustomersTotals(): Promise<ReportTotal[]> {
    return this.reportsService.getCustomersTotals();
  }

  @Get('orders/totals')
  getOrdersTotals(): Promise<ReportTotal[]> {
    return this.reportsService.getOrdersTotals();
  }

  @Get('products/totals')
  getProductsTotals(): Promise<ReportTotal[]> {
    return this.reportsService.getProductsTotals();
  }

  @Get('reviews/totals')
  getReviewsTotals(): Promise<ReportTotal[]> {
    return this.reportsService.getReviewsTotals();
  }
}
