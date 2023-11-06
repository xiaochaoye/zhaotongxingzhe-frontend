<template>
    <div id="teamPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="addTeamData.name" name="name" label="队伍名" placeholder="请填写队伍名"
                    :rules="[{ required: true, message: '请填写队伍名' }]" />
                <van-field v-model="addTeamData.description" rows="4" autosize label="队伍描述" type="textarea"
                    placeholder="请填写队伍描述" />

                <van-field v-model="addTeamData.expireTime" is-link readonly name="datePicker" label="过期时间"
                    placeholder="点击选择时间" @click="showPicker = true" />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-date-picker :min-date="minDate" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>

                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-if="Number(addTeamData.status) === 2" v-model="addTeamData.password" type="password" name="密码"
                    label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />

            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { onMounted } from 'vue';

const router = useRouter()
const route = useRoute()
const id = route.query.id
const minDate = new Date()

const showPicker = ref(false)

const addTeamData = ref({})

onMounted(async() => {
    if (id <= 0) {
        showFailToast('加载队伍失败')
        return
    }
    const res = await myAxios.get('/team/get', {
        params:{
            id
        }
    })
    if (res?.code === 0) {
        addTeamData.value = res.data;
    } else {
        showFailToast('获取队伍信息失败')
    }
})


//日期选择器拿到的数据是一个数组
const onConfirm = ({ selectedValues }) => { 
    addTeamData.value.expireTime = selectedValues.join("-")
    showPicker.value = false; 
};

const onSubmit = async () => {
    const postData = {
        ...addTeamData.value,
        status: Number(addTeamData.value.status),
        expireTime: moment(addTeamData.value.expireTime).format("YYYY-MM-DD"),
    }
    const res = await myAxios.post('/team/update', postData)

    if (res?.code === 0 && res.data) {
        showSuccessToast('更新成功')
        router.push({
            path: '/team',
            replace: true
        })
    } else {
        showFailToast('更新失败')
    }
}

</script>

<style scoped></style>