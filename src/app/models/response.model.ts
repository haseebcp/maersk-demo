export interface LoginResponse{
    token?:string,
    error?:string
}

export interface User {
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    avatar:string
}
export interface UserListResponse {
    page:number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Array<User>
}
export interface UserDetailResponse {
    data: User
}