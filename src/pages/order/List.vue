<template>
    <div>

    <el-table :data="orders">
        <el-table-column prop="id" label="订单编号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="total" label="总价"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="customerId" label="顾客id"></el-table-column>
        <el-table-column label="操作">
            <template v-slot="slot">
                  <a href="">详情</a>
            </template>
        </el-table-column>
    </el-table>
    </div>    
    </template>
    <script>
    import request from '@/utils/request'
    import querystring from 'querystring'
    export default { 
        methods:{
            loadData(){
                let url ="http://localhost:6677/order/findAll"
                request.get(url).then((response)=>{
                // 将查询结果设置到customers中，this指向外部函数的this
                this.orders = response.data;            
            })
            },
            closeModalHandler(){
                this.visible =false;
                },
            toAddHandler(){
                this.form = {
                 type :"customer"  
                }
                this.visible =true;
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
                orders:[],
                form:{
                    type:"order"
                }
                }
        },
        created(){
           this.loadData()
        }
    }
    </script>
    <style scoped>
    </style>