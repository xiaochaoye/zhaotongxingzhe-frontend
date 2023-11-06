<template>
    <user-card-list :user-list="userList" />
    <van-button round type="primary" class="bottom-button" onclick="history.back()">返回</van-button>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from "../plugins/myAxios"
import { showFailToast, showSuccessToast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
import qs from 'qs';

const route = useRoute();
const { tags } = route.query;
const userList = ref([]);
onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags
        },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
        .then(function (response) {
            console.log('/user/search/tags success', response)
            showSuccessToast('请求成功')
            return response?.data;
        })
        .catch(function (error) {
            console.error('/user/search/tags error', error);
            showFailToast('请求失败')
        })
    if (userListData) {
        userListData.forEach((elem: { tags: string; }) => {
            if (elem.tags) {
                elem.tags = JSON.parse(elem.tags);
            }

        });
        userList.value = userListData;
    }
})

</script>
<style scoped>
.bottom-button {
    position: absolute;
    top: 80%;
    left: 30%;

    width: 160px;
    height: 40px;
}
</style>