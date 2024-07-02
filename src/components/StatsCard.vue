<script setup lang="ts">
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-vue-next'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'

import SideBar from '@/components/SideBar.vue'
import ModeToggle from '@/components/ModeToggle.vue'

import { ref } from 'vue'


const progress = ref(13)
</script>

<template>
  <Card class="mt-4">
    <CardHeader class="p-2 pt-0 md:p-4">
      <div class="flex items-center gap-4">
        <Avatar class="hidden h-9 w-9 sm:flex">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div class="grid gap-1">
          <p class="text-sm font-medium leading-none">
            Isabella Nguyen
          </p>
          <p class="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
      <div class="flex items-center gap-4 mt-4">
        <p class="text-sm w-12">Easy</p>
        <Progress v-model="progress" class="h-2 w-3/5 " />
      </div>
      <div class="flex items-center gap-4 mt-4">
        <p class="text-sm w-12">Medium</p>
        <Progress v-model="progress" class="h-2 w-3/5 " />
      </div>
      <div class="flex items-center gap-4 mt-4">
        <p class="text-sm w-12">Hard</p>
        <Progress v-model="progress" class="h-2 w-3/5 " />
      </div>
    </CardContent>
  </Card>
</template>