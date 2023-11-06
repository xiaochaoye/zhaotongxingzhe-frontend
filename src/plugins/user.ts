import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import { getCurrentUserStatus, setCurrentUserStatus } from "../status/user";

const router = useRouter()

export const getCurrentUser = async () => {

    const res = await myAxios.get('/user/current');
    if (res.code === 0) {
        setCurrentUserStatus(res.data);
        return res.data;
    }
      
    return null;
}

