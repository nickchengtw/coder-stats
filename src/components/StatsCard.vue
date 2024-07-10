<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import getUserStats from '@/api/statsCard'

const recentAcLimit = 3

const props = defineProps({
  username: String
})

const progressBars = ref([
  { name: 'Easy', progress: 85 },
  { name: 'Medium', progress: 13 },
  { name: 'Hard', progress: 13 },
])
const recentActivity = ref([
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
  { date: new Date(Date.now()), submission: 5 },
])
const recentProblems = ref([
  { name: 'Two Sum', status: 'Accept' },
  { name: 'Two Sum', status: 'Accept' },
  { name: 'Two Sum', status: 'Accept' },
])

onMounted(async () => {
  const data = await getUserStats(props.username, recentAcLimit)
  console.log(data)
})

</script>

<template>
  <Card class="mt-4 flex">
    <div class="w-1/3 flex flex-col">
      <CardHeader class="p-2 pt-0 md:p-4">
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
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
      <CardContent class="p-2 pt-0 md:p-4 md:pt-0 flex flex-grow">
        <div class="flex flex-grow gap-2 justify-center items-end">
          <div class="w-full flex flex-col item" v-for="(activity, idx) in recentActivity">
            <p class="text-center mb-2" v-if="idx == 0 || idx == recentActivity.length - 1">
              {{ activity.date.getMonth() + 1 }}/{{ activity.date.getDate() }}
            </p>
            <div class="h-16 w-full bg-green-800 rounded-lg"></div>
          </div>
        </div>
      </CardContent>
    </div>

    <div class="px-4 w-1/3 flex flex-col justify-center">
      <div class="flex text-lg font-bold mx-auto">Solved : {{ 9999 }} / {{ 9999 }}</div>
      <div class="flex items-center gap-4 mt-4" v-for="progress in progressBars">
        <p class="text-sm min-w-16 font-bold">{{ progress.name }}</p>
        <Progress v-model="progress.progress" class="h-2" />
        <p class="text-sm min-w-20">{{ 1000 }} / {{ 1000 }}</p>
      </div>
    </div>

    <div class="pl-4 w-1/3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recent AC</TableHead>
            <TableHead class="text-right">Submission Time</TableHead>
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