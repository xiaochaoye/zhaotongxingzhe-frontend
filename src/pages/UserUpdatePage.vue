<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" />
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"
      @click="toEdit('userAccount', '账号', user.userAccount)" />
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatar', '头像 (链接)', user.avatarUrl)">
      <img style="height: 48px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="标签" is-link to="/user/edit" @click="toEdit('tags', '标签 (性别和年级必填)', user.tags)">
      <van-tag plain type="primary" v-for="tag in userTags" style="margin-right: 5px; margin-top: 5px;">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-cell title="注册时间" :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../plugins/user";

const user = ref();
const userTags = ref([])

onMounted(async () => {
  user.value = await getCurrentUser();
  userTags.value = JSON.parse(user.value.tags)
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }

  })

}

</script>
<style scoped></style>