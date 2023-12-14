import axios from '../axios'

export const apiBanner = () => axios({
    url : '/banner',
    method : 'get'
})
export const apiProducts = (params) => axios({
    url : '/product',
    method : 'get',
    params
})
export const apiOneProduct = (pid) => axios({
    url : `/product/${pid}`,
    method : 'get',
    
})
export const apiBlog = () => axios({
    url : '/blog',
    method : 'get'
})
export const apiOneBlog = (bid) => axios({
    url : '/blog',
    method : 'get',
    params : bid
})
export const apiCategory = () => axios({
    url : '/category',
    method : 'get'
})
export const apiSize = () => axios({
    url : '/size',
    method : 'get'
})


