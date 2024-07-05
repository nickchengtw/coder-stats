<script setup lang="ts">
import { Search, Globe, Users, BarChartHorizontal } from 'lucide-vue-next'

import ModeToggle from './ModeToggle.vue';

const scoreboardList = [
  {name: 'UTCS LeetCode', id: 'utcs_leetcode'},
  {name: 'UTCS Other (for testing)', id: 'utcs_other'},
]
</script>

<template>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold">
          <BarChartHorizontal />
          <span class="">Coder Stats</span>
        </RouterLink>
        <ModeToggle></ModeToggle>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <RouterLink to="/my-friends"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users class="h-4 w-4" />
            My Friends
          </RouterLink>
          <!-- TODO -->
          <RouterLink to="#"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Search class="h-4 w-4" />
            Find User
          </RouterLink>
          <p class="text-sm py-2">
            Public Scoreboard
          </p>
          <RouterLink :to="'/public/' + scoreboard.id"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            v-for="scoreboard in scoreboardList">
            <Globe class="h-4 w-4" />
            {{ scoreboard.name }}
          </RouterLink>
          <!-- <a href="#"
            class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
            <Package class="h-4 w-4" />
            Products
          </a> -->
        </nav>
      </div>
    </div>
  </div>
</template>