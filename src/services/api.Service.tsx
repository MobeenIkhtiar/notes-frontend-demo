import BaseRequestService from "./baseRequest.service";

const ApiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${ApiUrl}`;

interface CreateMessageLinkRequest {
    Message: string;
    Passoword: string | undefined;
    IsPassoword: boolean;
}
class ApiService extends BaseRequestService {
  
  createMessageLink(data: CreateMessageLinkRequest) {
    return this.post(`${API_URL}/createnotes`, data);
  }

getMessage(id: string, password: string) {
    return this.get(`${API_URL}/getnote/${id}?Password=${password}`);
  }

}

export default new ApiService();
