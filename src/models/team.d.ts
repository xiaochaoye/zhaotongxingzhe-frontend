/**
 * 队伍类别
 */
export type TeamType = {
    id:number;
    description:string,
    expireTime?: Date,
    maxNum: string,
    name: string,
    password?: string,
    status: number,
    createTime:Date,
    createUser:string
};