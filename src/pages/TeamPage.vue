<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public" />
            <van-tab title="加密" name="private" />
        </van-tabs>
        <van-button class="add-button" type="primary" icon="plus" @click="createTeam" />
        <team-card-list :teamList="teamList" />
        <van-empty v-if="teamList?.length < 1" image="network" description="数据为空" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TeamCardList from "../components/TeamCardList.vue";
import { onMounted, ref } from 'vue';
import myAxios from '../plugins/myAxios';
import { showFailToast } from 'vant';

const active = ref('public')
const router = useRouter()
const createTeam: any = () => {
    router.push({
        path: 'team/add'
    })
}

const searchText = ref('')
const teamList = ref([]);

const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

onMounted(() => {
    listTeam()
})


const listTeam = async (val = '', status = 0) => {
    const res = await myAxios.get('/team/list', {
        params: {
            searchText: val,
            pageNum: 1,
            status
        },
    })
    if (res?.code === 0) {
        teamList.value = res.data
    } else {
        showFailToast('加载队伍失败，刷新重试')
    }
}


const onSearch = (val) => {
    listTeam(val)
}

</script>



<style scoped>
.add-button {
    position: fixed;
    bottom: 60px;
    width: 50px;
    right: 12px;
    height: 50px;
    border-radius: 50%;
}</style>