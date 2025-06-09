import { environment } from 'src/environment/environment';

export class BaseService {
  static baseUrl = environment.apiUrl;
  static fileUrl = environment.fileUrl;
}