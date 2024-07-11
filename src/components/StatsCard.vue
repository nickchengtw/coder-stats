<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { getUserStats, UserProfile, RecentSubmission } from '@/api/statsCard'

const recentAcLimit = 3

const props = defineProps({
  username: String
})

const isLoading: Ref<boolean> = ref(true)
const userProfile: Ref<UserProfile> = ref()
const totalSolved: Ref<{ count: number; total: number } | null> = ref(null)
const progressBars: Ref<{ difficulty: String; difficultyTotal: number; count: number; progress: number }[]> = ref([])
const recentActivity: Ref<{ timestamp: number; submission: number }[]> = ref([])
const recentProblems: Ref<RecentSubmission[]> = ref([])

onMounted(async () => {
  const { allQuestionsCount, matchedUser, recentAcSubmissionList } = await getUserStats(props.username, recentAcLimit)
  const difficultyTotal = allQuestionsCount.reduce(
    (acc: { [key: string]: number }, obj: { difficulty: string, count: number }) => {
      acc[obj.difficulty] = obj.count;
      return acc;
    },
    {}
  );
  const submissionRecord = JSON.parse(matchedUser.userCalendar.submissionCalendar)
  console.log(difficultyTotal, matchedUser, recentAcSubmissionList)

  userProfile.value = matchedUser
  totalSolved.value = {
    count: matchedUser.submitStatsGlobal.acSubmissionNum[0].count,
    total: difficultyTotal['All']
  }
  progressBars.value = matchedUser.submitStatsGlobal.acSubmissionNum.slice(1)
    .map(({ difficulty, count }: { difficulty: string, count: number }) => ({
      difficulty,
      difficultyTotal: difficultyTotal[difficulty],
      count,
      progress: Math.floor(count / difficultyTotal[difficulty] * 100),
    }))
  recentActivity.value = getLastWeekTimestamps().map((timestamp) => ({
    timestamp,
    submission: submissionRecord[timestamp] || 0
  }))
  recentProblems.value = recentAcSubmissionList
  isLoading.value = false
})

function getLastWeekTimestamps() {
  const timestamps = [];
  const now = new Date();

  // Create a date object for midnight UTC+0 of today
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);  // Create a new Date object for each day
    date.setUTCDate(today.getUTCDate() - i);  // Subtract i days from today
    timestamps.push(Math.floor(date.getTime() / 1000));  // Convert to Unix timestamp and add to array
  }

  timestamps.reverse()
  return timestamps;
}

function timestampToDate(timestampInSeconds: number): Date {
  const timestampInMilliseconds = timestampInSeconds * 1000;
  return new Date(timestampInMilliseconds);
}

function formatUnixTimestamp(timestampString: string) {
  // Convert timestampString to integer
  const timestamp = parseInt(timestampString, 10);

  // Create a new Date object with the timestamp in milliseconds
  const date = new Date(timestamp * 1000);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

function submissionToColor(submission: number) {
  if (submission == 0)
    return '#CCCCCC'

  // Ensure number is within the range 1 to 5
  const normalizedNumber = Math.min(submission, 5);
  // Calculate lightness based on the normalized number
  const lightness = 20 + (normalizedNumber - 1) * 10; // Adjust lightness for each step
  // Construct HSL color string
  const color = `hsl(120, 100%, ${lightness}%)`; // Hue 120 is for green
  return color;
}
</script>

<template>
  <Skeleton class="mt-4 w-full h-60" v-if="isLoading" />
  <Card class="mt-4 flex" v-if="!isLoading">
    <div class="w-1/3 flex flex-col">
      <CardHeader class="p-2 pt-0 md:p-4">
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage :src="userProfile.profile?.userAvatar" alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              {{ userProfile.profile.realName || userProfile.username }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ userProfile.username }}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent class="p-2 pt-0 md:p-4 md:pt-0 flex flex-grow">
        <div class="flex flex-grow gap-2 justify-center items-end">
          <div class="w-full flex flex-col item" v-for="(activity, idx) in recentActivity">
            <p class="text-center mb-2" v-if="idx == 0 || idx == recentActivity.length - 1">
              {{ timestampToDate(activity.timestamp).getMonth() + 1 }}
              /
              {{ timestampToDate(activity.timestamp).getDate() }}
            </p>
            <div class="h-16 w-full rounded-lg" :style="`background-color: ${submissionToColor(activity.submission)};`">
            </div>
          </div>
        </div>
      </CardContent>
    </div>

    <div class="px-4 w-1/3 flex flex-col justify-center">
      <div class="flex text-lg font-bold mx-auto">
        Solved : {{ totalSolved?.count }} / {{ totalSolved?.total }}
      </div>
      <div class="flex items-center gap-4 mt-4" v-for="progress in progressBars">
        <p class="text-sm min-w-16 font-bold">{{ progress.difficulty }}</p>
        <Progress v-model="progress.progress" class="h-2" />
        <p class="text-sm min-w-20">
          {{ progress.count }} / {{ progress.difficultyTotal }}
        </p>
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
              <div class="font-bold">
                <a :href="'https://leetcode.com/problems/' + problem.titleSlug">
                  {{ problem.title }}
                </a>
              </div>
            </TableCell>
            <TableCell class="text-right">{{ formatUnixTimestamp(problem.timestamp) }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Card>
</template>

<style scoped></style>
