<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'

</script>

<template>
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <RouterView />
    </div>
</template>

<style scoped>

</style>
