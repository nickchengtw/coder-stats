<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ref } from 'vue'


const progressBars = ref([
  {name: 'Easy', progress: 85},
  {name: 'Medium', progress: 13},
  {name: 'Hard', progress: 13},
])
const recentActivity = ref([
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
  {date: new Date(Date.now()), submission: 5},
])
const recentProblems = ref([
  {name: 'Two Sum', status: 'Accept'},
  {name: 'Two Sum', status: 'Accept'},
  {name: 'Two Sum', status: 'Accept'},
])
</script>

<template>
  <Card class="mt-4 flex">
    <div class="w-2/3">
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
      <CardContent class="p-2 pt-0 md:p-4 md:pt-0 flex">
        <div class="w-full">
          <div class="flex items-center gap-4 mt-4" v-for="progress in progressBars">
            <p class="text-sm min-w-16">{{ progress.name }}</p>
            <Progress v-model="progress.progress" class="h-2" />
          </div>
        </div>
        <div class="pl-8 pt-4 flex gap-2">
          <div class="w-12 h-full flex flex-col" v-for="activity in recentActivity">
            <p class="font-bold text-center mb-2">
              {{ activity.date.getMonth() + 1 }}/{{ activity.date.getDate() }}
            </p>
            <div class="h-full w-full bg-black rounded-lg"></div>
          </div>
        </div>
      </CardContent>
    </div>
    <div class="pl-4 w-1/3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recent problem</TableHead>
            <TableHead class="text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="problem in recentProblems">
            <TableCell>
              <div class="font-bold">{{ problem.name }}</div>
            </TableCell>
            <TableCell class="text-right">{{ problem.status }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Card>
</template>