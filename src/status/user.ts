//当前用户的get和set方法
import { UserType } from "../models/user";

let currentUser: UserType;

const setCurrentUserStatus = (user : UserType) => {
    currentUser = user
}

const getCurrentUserStatus = () : UserType => {
    return currentUser
}

export {
    setCurrentUserStatus,
    getCurrentUserStatus
}