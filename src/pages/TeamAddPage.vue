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


                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" max="10" min="3" />
                    </template>
                </van-field>
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0" checked-color="green" >公开</van-radio>
                            <van-radio name="1" checked-color="blue">私有</van-radio>
                            <van-radio name="2" checked-color="red">加密</van-radio>
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
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

const router = useRouter()
const showPicker = ref(false)
const minDate = new Date()

const temp = {
    "description": "",
    "expireTime": "",
    "maxNum": 6,
    "name": "",
    "password": "",
    "status": 0,
}

const addTeamData = ref({ ...temp })


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
    const res = await myAxios.post('/team/add', postData)

    if (res?.code === 0 && res.data) {
        showSuccessToast('添加队伍成功')
        router.push({
            path: '/team',
            replace: true
        })
    } else {
        showFailToast('添加失败' + (res.description ? `，${res.description}` : ''))
    }
}



</script>



<style scoped></style>