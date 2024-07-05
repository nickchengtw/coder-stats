<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

import StatsCard from '@/components/StatsCard.vue'

</script>

<template>
  <div class="flex flex-col px-4">
    <div class="grid gap-2 text-center mt-8">
      <h1 class="text-3xl font-bold">
        UTCS
      </h1>
      <p class="text-balance text-muted-foreground">
        <Users class="h-4 w-4" />0 User
      </p>
    </div>
    <Separator class="my-4"/>
    <StatsCard></StatsCard>
    <StatsCard></StatsCard>
  </div>
</template>