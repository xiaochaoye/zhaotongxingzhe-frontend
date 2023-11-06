<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-button block round type="danger" @click="loginOut">退出登录</van-button>
  </template>
  <van-space direction="vertical" size="2rem" fill>
    <van-button v-if="user === null" block round type="primary" to="/user/login">登录</van-button>
    <van-button v-if="user === null" block round type="warning" to="/user/register">注册</van-button>
  </van-space>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../plugins/user";
import myAxios from "../plugins/myAxios";
import { showSuccessToast } from "vant";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const loginOut = async () => {
  const res = await myAxios.post('/user/logout')
  if (res.data === 0) {
    showSuccessToast('已退出登录')
  }
  router.replace('/')
}

</script>
<style scoped></style>