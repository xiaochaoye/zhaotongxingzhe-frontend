import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditUser from "../pages/UserEditPage.vue";
import UserLogin from "../pages/UserLoginPage.vue";
import UserRegister from "../pages/UserRegisterPage.vue";
import UserUpdate from "../pages/UserUpdatePage.vue";
import UserTeamCreate from "../pages/UserTeamCreatePage.vue";
import UserTeamJoin from "../pages/UserTeamJoinPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
// 定义一些路由
const routes = [
    {path: '/', component: Index},
    {path: '/team', title:'找队伍', component: Team},
    {path: '/user', title:'个人页', component: User},
    {path: '/search', title:'搜标签', component: SearchPage},
    {path: '/user/list', title:'用户列表', component: SearchResultPage},
    {path: '/user/edit', title:'用户信息更改', component: UserEditUser},
    {path: '/user/login', title:'用户登录', component: UserLogin},
    {path: '/user/register', title:'用户注册', component: UserRegister},
    {path: '/user/update', title:'我的信息', component: UserUpdate},
    {path: '/user/team/create', title:'我创建的队伍', component: UserTeamCreate},
    {path: '/user/team/join', title:'我加入的队伍', component: UserTeamJoin},
    {path: '/team/add', title:'创建队伍', component:TeamAddPage},
    {path: '/team/update', title:'更新队伍信息', component:TeamUpdatePage}

]

export default routes;