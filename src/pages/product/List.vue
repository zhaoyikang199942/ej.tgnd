<-- 产品管理 -->
<template>
    <div>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
            <el-button size="small" type="danger">批量删除</el-button>
        </div>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="products">
        <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
        <el-table-column prop="name" label="产品名称" fixed="left"></el-table-column>
        <el-table-column prop="price" label="价格" ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="categoryId" label="所属产品" ></el-table-column>
        <el-table-column label="操作" fixed="right">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                <a href="" @click.prevent="toUpdateHandler(slot.row.id)">修改</a>
                <a href="" @click.prevent="toDetailsHandler(slot.row.id)">详情</a>
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
                <el-form-item label="名称">
                    <el-input  v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
               <el-form-item label="所属栏目">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option v-for="item in options"
                            :key="item.value" :label="item.name"
                            :value="item.parentId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="产品主图">
                    <el-input v-model="form.categoryId"></el-input>
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
           title:"录入产品信息",
            visible:false,
            products:[],
            form:{
                type:"product"
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
            let url = "http://localhost:6677/product/saveOrUpdate";
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
            let url= "http://localhost:6677/product/findAll"
            request.get(url).then((response)=>{
                this.products=response.data;
            })
            // 箭头函数的this指向外部函数中的this
        },
         toAddHandler(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
                this.options = response.data;
            })
            this.title="添加产品信息",
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
            this.title="修改产品信息";
            this.visible="true";
        }
    }
    
}
</script>
<style scoped>

</style>