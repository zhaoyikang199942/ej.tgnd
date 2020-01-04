<template>
<div>
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
    <el-button type="danger" size="small">批量删除</el-button>
    <el-table :data="orders.list">
        <el-table-column prop="id" label="订单编号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="total" label="总价"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="customerId" label="顾客id"></el-table-column>
         <el-table-column prop="addressId" label="地址id"></el-table-column>
         <el-table-column prop="waiterId" label="员工id"></el-table-column>
        <el-table-column fixed="right" label="操作">
            <template v-slot="slot">
                <a href="" @click.prevent="toDeleteHandler(slot.row.id)"><i class="el-icon-delete"></i></a>
                <a href="" @click.prevent="toUpdateHandler(slot.row)"><i class="el-icon-edit"></i></a>
                <a href="">详情</a>
            </template>
        </el-table-column>
    </el-table>
     <el-pagination
    layout="prev, pager, next" :total="orders.total" @current-change="pageChageHandler">
    </el-pagination>
    <el-dialog
        title="录入订单信息"
        :visible.sync="visible"
        width="60%">
         <el-form :model="form" label-width="80px">
            <el-form-item label="订单编号">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
             <el-form-item label="下单时间">
                <el-input v-model="form.orderTime"></el-input>
            </el-form-item>
             <el-form-item label="总价">
                <el-input v-model="form.total"></el-input>
            </el-form-item>
             <el-form-item label="状态">
                <el-input v-model="form.status"></el-input>
            </el-form-item>
             <el-form-item label="顾客id">
                <el-input v-model="form.customerId"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
        </span>
    </el-dialog>
    </div>    
    </template>
    <script>
    import request from '@/utils/request'
    import querystring from 'querystring'
    export default { 
        methods:{
            loadData(){
                let url ="http://localhost:6677/order/queryPage"
                request({
                    url,
                    method:"post",
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }, 
                    data:querystring.stringify(this.params)
                }).then((response)=>{
                this.orders = response.data;
                            
            })
            },

            toDeleteHandler(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let url ="http://localhost:6677/order/deleteById?id="+id;
            request.get(url).then((response)=>{
                this.loadData();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
            }); 
            })
        
        })
                },
            toUpdateHandler(row){
                this.form = row;
                this.visible =true;
                },
            closeModalHandler(){
                this.visible =false;
                },
            toAddHandler(){
                this.form = {
                 type :"order"  
                }
                this.visible =true;
                },
            pageChageHandler(page){
                    this.params.page = page-1;
                    this.loadData();
                },
            submitHandler(){
                let url ="http://localhost:6677/order/saveOrUpdate "
                request({
                    url,
                    method:"POST",
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                    data:querystring.stringify(this.form)
                }).then((response)=>{
                    this.closeModalHandler()
                    this.loadData()
                    this.$message({
                        type:"success",
                        message:response.message
                    })
                
            })
            }
        },   
        data(){
            return{
                visible:false,
                orders:{},
                form:{
                    type:"order"
                },
                params:{
                    page:0,
                    pageSize:10,
                }
                }
        },
        created(){
           this.loadData();
        }
    }
    </script>
    <style scoped>
    </style>
