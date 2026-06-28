import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../utils/axios/axios.service';
import { User } from './@types/user.interface';
import { GetQueryDto } from '../../utils/common/dto/get-query.dto';
import { GetResponseInterface } from '../../utils/response/get-response.interface';

@Injectable()
export class UsersService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAllUsers(query: GetQueryDto): Promise<GetResponseInterface<User>> {
    const url = `/customers?page=${query.page}&per_page=${query.per_page}&search=${query.search ?? ''}&role=${query.role ?? ''}`;

    const response = await this.axiosService.paginate<User>(
      url,
      query.page,
      query.per_page,
    );

    response.data = response.data.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role,
      billing: user.billing,
      shipping: user.shipping,
      date_created: user.date_created,
      date_created_gmt: user.date_created_gmt,
      date_modified: user.date_modified,
      date_modified_gmt: user.date_modified_gmt,
      is_paying_customer: user.is_paying_customer,
      avatar_url: user.avatar_url,
    }));

    return response;
  }
}
