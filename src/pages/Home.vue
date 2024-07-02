<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
import StatsCard from '@/components/StatsCard.vue'

</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <Sidebar></Sidebar>
    <div class="flex flex-col px-4">
      <StatsCard></StatsCard>
      <StatsCard></StatsCard>
    </div>
  </div>
</template>