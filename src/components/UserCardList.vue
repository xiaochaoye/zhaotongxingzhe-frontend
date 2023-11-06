<template>
    <van-card v-for="user in props.userList" :tag="user.id.toString()" :title="user.username" :thumb="user.avatarUrl">
        <template #tags>
            <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 5px; margin-top: 5px;">
                {{ tag }}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="small" type="danger" plain @click="contactMe(user)">联系我</van-button>
        </template>
    </van-card>
    <van-empty v-if="!userList || userList.length < 1" image="search" description="结果为空" />
    <van-dialog v-model:show="showDialog" :title="myEmail" show-cancel-button />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UserType } from '../models/user';
import myAxios from '../plugins/myAxios';


const showDialog = ref(false);
const myEmail = ref('')


interface UserCardListProps {
    userList: UserType[];
}


const props = withDefaults(defineProps<UserCardListProps>(), {
    //@ts-ignore
    userList: [] as UserType[],
})

const contactMe = async (user: UserType) => {
    showDialog.value = true
    const res = await myAxios.get('/user/search', {
        params: {
            username: user.username
        }
    })
    if (res.code === 0) {
        myEmail.value = res.data[0].email ? res.data[0].email : "用户暂未留下邮箱";
    }
}
</script>
<style scoped></style>