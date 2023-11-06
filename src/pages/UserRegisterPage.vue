<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="userAccount" name="account" label="用户名" placeholder="用户名" :rules="Rules.account"/>
            <van-field v-model="userPassword" type="password" name="password" label="密码" placeholder="密码" :rules="Rules.password"/>
            <van-field v-model="checkPassword" type="password" name="password" label="再次输入密码" placeholder="再次输入密码" :rules="Rules.password"/>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';

const Rules = {
   account: [
        { required: true, pattern: /^.{4,12}$/, message: '账户要在4位~12位之间', trigger: 'onChange' }
    ],
    password: [
        { required: true, pattern: /^.{1,9}$/, message: '密码要在1位~9位之间', trigger: 'onChange' }
    ]
}

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
    const res = await myAxios.post('/user/register', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
        checkPassword: checkPassword.value
    })
    if (res.code === 0 && res.data) {
        showSuccessToast('注册成功');
    } else {
        showFailToast('注册失败,' + res.description);
    }
};
</script>
<style scoped></style>