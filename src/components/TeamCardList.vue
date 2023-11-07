<template>
    <div id="teamCardList">
        <van-card v-for="team in props.teamList" :desc="team.description" :title="`${team.name}`" :thumb="picture">
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 5px; margin-top: 5px;">
                    {{ teamStatusEnum[team.status] }}
                </van-tag>
            </template>
            <template #bottom>
                <div>
                    {{ '队伍人数：' + team.hasJoinNum + '/' + team.maxNum }}
                </div>
                <div v-if="team.expireTime">
                    {{ '过期时间：' + team.expireTime }}
                </div>
                <div>
                    {{ '创建时间：' + team.createTime }}
                </div>
            </template>
            <template #footer>
                <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">加入队伍</van-button>
                <!-- 不是队长，且还没有加入队伍的人可见 -->
                <van-button v-if="team.userId === currentUser?.id" size="small" type="success" plain
                    @click="doUpdateTeam(team.id)">更新队伍</van-button>
                <!-- 仅队长可见 -->
                <van-button size="small" type="success" v-if="team.userId !== currentUser?.id && team.hasJoin" plain
                    @click="doQuitTeam(team.id)">退出队伍</van-button>
                <!-- 队员可见，队长不可见 -->
                <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍</van-button>
                <!-- 仅队长可见 -->
            </template>
        </van-card>
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
            @cancel="Cancel">
            <van-field v-model="password" placeholder="请输入密码" />
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import { teamStatusEnum } from '../constants/team';
import { TeamType } from '../models/team';
import picture from '../assets/nice.jpg';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';
import { onMounted, ref } from 'vue';
import { getCurrentUser } from '../plugins/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

const Cancel = () => {
    joinTeamId.value = 0;
    password.value = '';
}

interface TeamCardListProps {
    teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
    //@ts-ignore
    teamList: [] as TeamType[],
})

//获取当前用户并赋值给 currentUser，用来判断是否为该队伍创建人
const currentUser = ref()
onMounted(async () => {
    currentUser.value = await getCurrentUser()
})

const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0) {
        doJoinTeam()
    } else {
        showPasswordDialog.value = true;
    }
}

const doJoinTeam = async () => {
    if (!joinTeamId.value) {
        return
    }
    const res = await myAxios.post('/team/join', {
        teamId: joinTeamId.value,
        password: password.value
    })
    if (res?.code === 0) {
        showSuccessToast('加入成功')
    } else {
        showFailToast('加入失败' + (res.description ? `，${res.description}` : ''))
    }
}

//更新队伍带着队伍 id 传递
const doUpdateTeam = async (id: number) => {
    router.push({
        path: '/team/update',
        query: {
            id
        }
    })
}

const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/team/quit', {
        teamId: id
    })
    if (res?.code === 0) {
        showSuccessToast('退出成功')
    } else {
        showFailToast('退出失败' + (res.description ? `，${res.description}` : ''))
    }
}

const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/team/delete', {
        id
    })
    if (res?.code === 0) {
        showSuccessToast('删除成功')
    } else {
        showFailToast('删除失败' + (res.description ? `，${res.description}` : ''))
    }
}
</script>
<style scoped>
#teamCardList :deep(.van-image__img) {
    height: 116px;
    object-fit: unset;
}
</style>