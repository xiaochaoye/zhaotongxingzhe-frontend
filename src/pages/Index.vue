<template>
    <van-cell center title="匹配道友">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>
    <user-card-list :user-list="userList" />
    <van-pagination v-model="pageNum" :page-count="totalPage" force-ellipses @change="loadData"/>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios"
import { showFailToast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
import { UserType } from '../models/user';

const isMatchMode = ref<boolean>(false);
const pageNum = ref(1);
const totalPage = ref(1);

const userList = ref([]);
const loadData = async () => {
    let userListData;
    // 根据标签匹配用户
    if (isMatchMode.value) {
        const num = 10;
        userListData = await myAxios.get('/user/match', {
            params: {
                num,
            },
        })
            .then(function (response) {
                return response?.data;
            })
            .catch(function (error) {
                showFailToast('请求失败');
            })
    } else {
        // 普通模式，直接分页查询用户
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 8,
                pageNum: pageNum.value,
            },
        })
            .then(function (response) {
                console.log('/user/recommend succeed', response);
                totalPage.value = response?.data?.pages
                return response?.data?.records;
            })
            .catch(function (error) {
                console.error('/user/recommend error', error);
                showFailToast('请求失败');
            })
    }
    if (userListData) {
        userListData.forEach((user: UserType) => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData;
    }
}

watchEffect(() => {
    loadData();
})
</script>
<style scoped>
.bottom-button {
    width: 160px;
    height: 40px;
}
</style>