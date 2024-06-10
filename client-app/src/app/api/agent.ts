import axios, { AxiosError, AxiosResponse } from "axios";
import { Book } from "../models/book";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

axios.defaults.baseURL = "https://localhost:7072/api/";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            console.log(data.errors);
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')){
                router.navigate('/not-found')
            }
            if(data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data)
            }
            break;
        case 401:    
            toast.error('unauthorised')
            break;
        case 403:    
            toast.error('forbidden')
            break;
            case 404:    
            router.navigate('/not-found')
            break;
            case 500:    
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;  
            case 415:    
            console.log(data);
            break;  
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Books = {
    list: () => requests.get<Book[]>('/books'),
    details: (id: string) => requests.get<Book>(`/books/${id}`),
    add: (book: Book) => axios.post<void>('/books', book),
    update: (book: Book) => axios.put<void>(`/books/${book.id}`, book),
    delete: (id: string) => axios.delete<void>(`/books/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => axios.post<User>('/account/login', user),
    register: (user: UserFormValues) => axios.post<User>('/account/register', user)
}

const agent = {
    Books,
    Account
}

export default agent;