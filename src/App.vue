<!-- @format -->

<script setup lang="ts">
import { onMounted } from 'vue'

function printLogo() {
    console.log(`
 ██╗      ████████╗  ███████╗██╗  ██╗ █████╗████████╗
 ██║      ██╔═════╝  ██╔════╝██║  ██║██╔══██╗  ██╔══╝
 ██║      ████████╗  ██║     ███████║███████║  ██║
 ██║      ██╔═════╝  ██║     ██╔══██║██╔══██║  ██║
 ████████╗████████╗  ███████╗██║  ██║██║  ██║  ██║
 ╚═══════╝╚═══════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═╝
`)
    console.log(
        '%cUni-AI  \n%cWelcome to join us.\n%chttps://github.com/uniai-lab\n%c',
        'font-family: "微软雅黑", sans-serif;font-size:50px;color: #f90;',
        "font-family: '微软雅黑';color: #fff;font-size:  20px;",
        "font-family: '微软雅黑';color: #fff;font-size: 15px;",
        'color: red;font-size: 14px;'
    )
}
onMounted(() => {
    printLogo()
})
</script>

<template>
    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style>
body,
html {
    overscroll-behavior-y: none;
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
}
</style>
