<!-- @format -->

<script setup lang="ts"></script>

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
