import axios from 'axios'
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/app/"

class GetbankDetails
{
    getUserSub(id)
    {
        return axios.get(API_URL+"show_usersub/"+id, { headers: authHeader() });
    }
    getImage(id)
    {
        return axios.get(API_URL+"show_image/"+id, { headers: authHeader() });
    }
    getEmail(id)
    {
        return axios.get(API_URL+"show_email/"+id, { headers: authHeader() });
    }
    addResource(resource)
    {
        return axios.post(API_URL+"add_resource",resource, { headers: authHeader() })
    }
    addBank(bank)
    {
        return axios.post(API_URL+"add_bank",bank, { headers: authHeader() })
    }
    addImage(image)
    {
        return axios.post(API_URL+"add_image",image, { headers: authHeader() })
    }
    addEmail(email)
    {
        return axios.post(API_URL+"add_email",email, { headers: authHeader() })
    }
}

export default new GetbankDetails();