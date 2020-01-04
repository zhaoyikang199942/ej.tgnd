<-- 员工管理 -->
<template>
    <div>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
            <el-button size="small" type="danger">批量删除</el-button>
        </div>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="employees">
        <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
        <el-table-column prop="username" label="职业"></el-table-column>
        <el-table-column prop="realname" label="姓名" fixed="left"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="telephone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toUpdateHandler(slot.row.id)">修改</a>
            </template>
        </el-table-column>
        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
        <el-pagination
            layout="prev, pager, next" :total="50">
         </el-pagination>
        <!-- /分页 -->
        <!-- 模态框 -->
         <el-dialog
            :title="title"
            :visible.sync="visible"
            width="60%">
            ---{{form}}
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.realname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.telephone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.idCard"></el-input>
                </el-form-item>
                 <el-form-item label="银行卡号">
                     <el-input v-model="form.bankCard"></el-input>
                 </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeModalHander">取 消</el-button>
            <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
            </span>
         </el-dialog> 
        <!-- /模态框 -->
    </div>
</template>
<script>
import request from '@/utils/request'    
import querystring from 'querystring'
export default {
    data(){
        return{
           title:"录入员工信息",
            visible:false,
            employees:[],
            form:{
                type:"waiter"
            }
        }
    },
    created(){
        // 在页面加载出来时加载数据
        this.loadData();
    },
    methods:{
        // 提交
        submitHandler(){
            let url = "http://localhost:6677/waiter/saveOrUpdate";
            request({
                url,
                method:"post",
                // 告诉给后台我的请求体中放的是查询字符串
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                // 请求体中的数据，将this.form转换为查询字符串发送给后台
                data:querystring.stringify(this.form)
            }).then((response)=>{
                this.closeModalHander();
                this.loadData();
                this.$message({type:"success",message:response.message})
            })
        },
        // 重载员工数据
        loadData(){
            let url= "http://localhost:6677/waiter/findAll"
            request.get(url).then((response)=>{
                this.employees=response.data;
            })
            // 箭头函数的this指向外部函数中的this
        },
        toAddHandler(){
            this.title="录入员工信息";
            this.visible=true;
        },
        closeModalHander(){
            this.visible=false;
        },
        toDeleteHandler(id){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })

        },
        toUpdateHandler(row){
            this.title="修改员工信息";
            this.visible="true";
        }
    }
    
}
</script>
<style scoped>

</style>