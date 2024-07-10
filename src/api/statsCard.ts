import axios from "axios";

interface QuestionCount {
  difficulty: string;
  count: number;
}

interface UserProfile {
  userAvatar: string;
  realName: string;
}

interface SubmissionCount {
  difficulty: string;
  count: number;
}

interface UserCalendar {
  streak: number;
  submissionCalendar: string;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
}

interface UserPublicProfileResponse {
  data: {
    allQuestionsCount: QuestionCount[];
    matchedUser: {
      username: string;
      profile: UserProfile;
      submitStatsGlobal: {
        acSubmissionNum: SubmissionCount[];
      };
      userCalendar: UserCalendar;
    };
    recentAcSubmissionList: RecentSubmission[];
  };
}

const userStatsQuery = `
  query userPublicProfile($username: String!, $limit: Int!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        userAvatar
        realName
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
        submissionCalendar
      }
    }
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
    }
  }
`;

const corsProxyUrl = "https://cors-proxy.nicklas0326.workers.dev/"
const endpoint = "https://leetcode.com/graphql";
const headers = {
  "Content-Type": "application/json",
};

export default async function getUserStats(
  username: string,
  limit: number
): Promise<UserPublicProfileResponse["data"]> {
  const response = await axios<UserPublicProfileResponse>({
    url: `${corsProxyUrl}?${endpoint}`,
    method: "POST",
    headers: headers,
    data: {
      query: userStatsQuery,
      variables: { username, limit },
    },
  });
  return response.data.data;
}
