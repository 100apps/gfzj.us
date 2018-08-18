{
	"difficulty":"1",
	"submit_num":"95108",
	"show_id":"401",
	"leetcode_id":"401",
	"answers":[
		{
			"lc_ans_id":"88458",
			"view":"30748",
			"top":"0",
			"title":"Simple Python+Java",
			"vote":"250",
			"content":"Just go through the possible times and collect those with the correct number of one-bits.\\n\\nPython:\\n\\n    def readBinaryWatch(self, num):\\n        return ['%d:%02d' % (h, m)\\n                for h in range(12) for m in range(60)\\n                if (bin(h) + bin(m)).count('1') == num]\\n\\nJava:\\n\\n    public List<String> readBinaryWatch(int num) {\\n        List<String> times = new ArrayList<>();\\n        for (int h=0; h<12; h++)\\n            for (int m=0; m<60; m++)\\n                if (Integer.bitCount(h * 64 + m) == num)\\n                    times.add(String.format(\"%d:%02d\", h, m));\\n        return times;        \\n    }"
		},
		{
			"lc_ans_id":"88456",
			"view":"19907",
			"top":"1",
			"title":"3ms Java Solution Using Backtracking and Idea of \"Permutation and Combination\"",
			"vote":"87",
			"content":"```\\npublic class Solution {\\n    public List<String> readBinaryWatch(int num) {\\n        List<String> res = new ArrayList<>();\\n        int[] nums1 = new int[]{8, 4, 2, 1}, nums2 = new int[]{32, 16, 8, 4, 2, 1};\\n        for(int i = 0; i <= num; i++) {\\n            List<Integer> list1 = generateDigit(nums1, i);\\n            List<Integer> list2 = generateDigit(nums2, num - i);\\n            for(int num1: list1) {\\n                if(num1 >= 12) continue;\\n                for(int num2: list2) {\\n                    if(num2 >= 60) continue;\\n                    res.add(num1 + \":\" + (num2 < 10 ? \"0\" + num2 : num2));\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n\\n    private List<Integer> generateDigit(int[] nums, int count) {\\n        List<Integer> res = new ArrayList<>();\\n        generateDigitHelper(nums, count, 0, 0, res);\\n        return res;\\n    }\\n\\n    private void generateDigitHelper(int[] nums, int count, int pos, int sum, List<Integer> res) {\\n        if(count == 0) {\\n            res.add(sum);\\n            return;\\n        }\\n        \\n        for(int i = pos; i < nums.length; i++) {\\n            generateDigitHelper(nums, count - 1, i + 1, sum + nums[i], res);    \\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88465",
			"view":"11300",
			"top":"2",
			"title":"Straight-forward 6-line c++ solution, no need to explain",
			"vote":"69",
			"content":"```\\nvector<string> readBinaryWatch(int num) {\\n    vector<string> rs;\\n    for (int h = 0; h < 12; h++)\\n    for (int m = 0; m < 60; m++)\\n        if (bitset<10>(h << 6 | m).count() == num)\\n            rs.emplace_back(to_string(h) + (m < 10 ? \":0\" : \":\") + to_string(m));\\n    return rs;\\n}\\n```"
		},
		{
			"lc_ans_id":"88471",
			"view":"16488",
			"top":"3",
			"title":"Just for fun!!!!!!!   java 1ms, beats 100%",
			"vote":"64",
			"content":"```\\npublic class Solution {\\n    String[][] hour = {{\"0\"},\\n            {\"1\", \"2\", \"4\", \"8\"},\\n            {\"3\", \"5\", \"6\", \"9\", \"10\"},\\n            {\"7\", \"11\"}};\\n    String[][] minute = {{\"00\"},\\n            {\"01\", \"02\", \"04\", \"08\", \"16\", \"32\"},\\n            {\"03\", \"05\", \"06\", \"09\", \"10\", \"12\", \"17\", \"18\", \"20\", \"24\", \"33\", \"34\", \"36\", \"40\", \"48\"},\\n            {\"07\", \"11\", \"13\", \"14\", \"19\", \"21\", \"22\", \"25\", \"26\", \"28\", \"35\", \"37\", \"38\", \"41\", \"42\", \"44\", \"49\", \"50\", \"52\", \"56\"},\\n            {\"15\", \"23\", \"27\", \"29\", \"30\", \"39\", \"43\", \"45\", \"46\", \"51\", \"53\", \"54\", \"57\", \"58\"},\\n            {\"31\", \"47\", \"55\", \"59\"}};\\n\\n    public List<String> readBinaryWatch(int num) {\\n        List<String> ret = new ArrayList();\\n        for (int i = 0; i <= 3 && i <= num; i++) {\\n            if (num - i <= 5) {\\n                for (String str1 : hour[i]) {\\n                    for (String str2 : minute[num - i]) {\\n                        ret.add(str1 + \":\" + str2);\\n                    }\\n                }\\n            }\\n        }\\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88536",
			"view":"5593",
			"top":"4",
			"title":"straightforward java answer",
			"vote":"35",
			"content":"```\\n    public List<String> readBinaryWatch(int num) {\\n        ArrayList<String> result = new ArrayList<>();\\n        for (int i = 0; i < 12; i++) {\\n            for (int j = 0; j < 60; j++) {\\n                if (Integer.bitCount(i) + Integer.bitCount(j) == num) {\\n                    result.add(String.format(\"%d:%02d\", i, j));\\n                }\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"88453",
			"view":"1829",
			"top":"5",
			"title":"Python DFS, and complexity analysis",
			"vote":"11",
			"content":"Similar to other solutions out there. \\n\\nThe code has `O(1)` time complexity, because all the possible watch combinations (valid or invalid) can't be more that 12 * 59.\\nRegarding space complexity, it's also `O(1)` cause the DFS will have depth of maximum `n`, which can't be more than `9` as per problem boundary.\\n\\n```\\nclass Solution(object):\\n    def readBinaryWatch(self, n):\\n        \\n        def dfs(n, hours, mins, idx):\\n            if hours >= 12 or mins > 59: return\\n            if not n:\\n                res.append(str(hours) + \":\" + \"0\" * (mins < 10) + str(mins))\\n                return\\n            for i in range(idx, 10):\\n                if i < 4: \\n                    dfs(n - 1, hours | (1 << i), mins, i + 1)\\n                else:\\n                    k = i - 4\\n                    dfs(n - 1, hours, mins | (1 << k), i + 1)\\n        \\n        res = []\\n        dfs(n, 0, 0, 0)\\n        return res\\n```"
		},
		{
			"lc_ans_id":"88451",
			"view":"3257",
			"top":"6",
			"title":"0ms C++ Back-tracking Solution with explanation",
			"vote":"9",
			"content":"I guess this is a pretty readable back-tracking solution. Using `pair<int, int>` time to represent time, `time.first` is hour and `time.second` is minute.   \\n\\n Here is some corner cases you might need to think about:\\n1. Is \"01:00\" valid?\\n2. Is \"12:00\" valid?\\n3. Is \"3:60\" valid?\\n4. Is \"11:4\" valid?\\n    \\n   \\n**Code:**\\n```c++\\nclass Solution \\n{\\n    // date: 2016-09-18     location: Vista Del Lago III\\n    vector<int> hour = {1, 2, 4, 8}, minute = {1, 2, 4, 8, 16, 32};\\npublic:\\n    vector<string> readBinaryWatch(int num) {\\n        vector<string> res;\\n        helper(res, make_pair(0, 0), num, 0);\\n        return res;\\n    }\\n    \\n    void helper(vector<string>& res, pair<int, int> time, int num, int start_point) {\\n        if (num == 0) {\\n            res.push_back(to_string(time.first) +  (time.second < 10 ?  \":0\" : \":\") + to_string(time.second));\\n            return;\\n        }\\n        for (int i = start_point; i < hour.size() + minute.size(); i ++)\\n            if (i < hour.size()) {    \\n                time.first += hour[i];\\n                if (time.first < 12)     helper(res, time, num - 1, i + 1);     // \"hour\" should be less than 12.\\n                time.first -= hour[i];\\n            } else {     \\n                time.second += minute[i - hour.size()];\\n                if (time.second < 60)    helper(res, time, num - 1, i + 1);     // \"minute\" should be less than 60.\\n                time.second -= minute[i - hour.size()];\\n            }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88564",
			"view":"3626",
			"top":"7",
			"title":"Simple Java AC solution with Explanation",
			"vote":"9",
			"content":"The logic is based on DFS, to generate nCk. Represent all the lights by an array of n = 10.\\n    Then generate all possible values of the array by setting all possible k bits.\\n    Convert these array positions into their corresponding times, making sure to handle any time that exceeds hours >= 12 and minutes > 59\\n\\nFor A[10] with indices 0 to 9\\n\\n0 1 2 3 represents the Hour lights\\n4 5 6 7 8 9 represents the Minute lights\\n\\n```\\npublic static List<String> readBinaryWatch(int num) {\\n        List<String> list = new ArrayList<>();\\n        dfs(new int[10], 0, 0, list, num);\\n        return list;\\n    }\\n\\n    private static void dfs(int[] a, int i, int k, List<String> list, int num) {\\n        if(k == num) {\\n            String res = getTime(a);\\n            if(res != null)\\n                list.add(res);\\n            return;\\n        }\\n        if(i == a.length) {\\n            return;\\n        }\\n        a[i] = 0;\\n        dfs(a, i+1, k, list, num);\\n\\n        a[i] = 1;\\n        dfs(a, i+1, k+1, list, num);\\n\\n        a[i] = 0;\\n    }\\n\\n    private static String getTime(int[] a) {\\n        int hours = 0;\\n        for(int i = 0; i < 4; i++) {\\n            if(a[i] == 1) {\\n                hours = hours + (int)Math.pow(2, i);\\n            }\\n        }\\n\\n        int minutes = 0;\\n        for(int i = 4; i < 10; i++) {\\n            if(a[i] == 1) {\\n                minutes = minutes + (int)Math.pow(2, i-4);\\n            }\\n        }\\n        String min = \"\" + minutes;\\n        if(minutes  <  10)\\n            min = \"0\" + min;\\n        String res = hours + \":\" + min;\\n        if(hours  >= 12  ||  minutes  >=  60)\\n            return null;\\n        return res;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"88475",
			"view":"1269",
			"top":"8",
			"title":"sorry, I cheat..",
			"vote":"8",
			"content":"Just for fun, here is my code:\\n\\n```\\ndef read_binary_watch(num)\\n    case num\\n    when 0\\n    \\t[\"0:00\"]\\n    when 1\\n    \\t[\"0:01\",\"0:02\",\"0:04\",\"0:08\",\"0:16\",\"0:32\",\"1:00\",\"2:00\",\"4:00\",\"8:00\"]\\n    when 2\\n    \\t[\"0:03\",\"0:05\",\"0:06\",\"0:09\",\"0:10\",\"0:12\",\"0:17\",\"0:18\",\"0:20\",\"0:24\",\"0:33\",\"0:34\",\"0:36\",\"0:40\",\"0:48\",\"1:01\",\"1:02\",\"1:04\",\"1:08\",\"1:16\",\"1:32\",\"2:01\",\"2:02\",\"2:04\",\"2:08\",\"2:16\",\"2:32\",\"3:00\",\"4:01\",\"4:02\",\"4:04\",\"4:08\",\"4:16\",\"4:32\",\"5:00\",\"6:00\",\"8:01\",\"8:02\",\"8:04\",\"8:08\",\"8:16\",\"8:32\",\"9:00\",\"10:00\"]\\n    when 3\\n    \\t[\"0:07\",\"0:11\",\"0:13\",\"0:14\",\"0:19\",\"0:21\",\"0:22\",\"0:25\",\"0:26\",\"0:28\",\"0:35\",\"0:37\",\"0:38\",\"0:41\",\"0:42\",\"0:44\",\"0:49\",\"0:50\",\"0:52\",\"0:56\",\"1:03\",\"1:05\",\"1:06\",\"1:09\",\"1:10\",\"1:12\",\"1:17\",\"1:18\",\"1:20\",\"1:24\",\"1:33\",\"1:34\",\"1:36\",\"1:40\",\"1:48\",\"2:03\",\"2:05\",\"2:06\",\"2:09\",\"2:10\",\"2:12\",\"2:17\",\"2:18\",\"2:20\",\"2:24\",\"2:33\",\"2:34\",\"2:36\",\"2:40\",\"2:48\",\"3:01\",\"3:02\",\"3:04\",\"3:08\",\"3:16\",\"3:32\",\"4:03\",\"4:05\",\"4:06\",\"4:09\",\"4:10\",\"4:12\",\"4:17\",\"4:18\",\"4:20\",\"4:24\",\"4:33\",\"4:34\",\"4:36\",\"4:40\",\"4:48\",\"5:01\",\"5:02\",\"5:04\",\"5:08\",\"5:16\",\"5:32\",\"6:01\",\"6:02\",\"6:04\",\"6:08\",\"6:16\",\"6:32\",\"7:00\",\"8:03\",\"8:05\",\"8:06\",\"8:09\",\"8:10\",\"8:12\",\"8:17\",\"8:18\",\"8:20\",\"8:24\",\"8:33\",\"8:34\",\"8:36\",\"8:40\",\"8:48\",\"9:01\",\"9:02\",\"9:04\",\"9:08\",\"9:16\",\"9:32\",\"10:01\",\"10:02\",\"10:04\",\"10:08\",\"10:16\",\"10:32\",\"11:00\"]\\n    when 4\\n    \\t[\"0:15\",\"0:23\",\"0:27\",\"0:29\",\"0:30\",\"0:39\",\"0:43\",\"0:45\",\"0:46\",\"0:51\",\"0:53\",\"0:54\",\"0:57\",\"0:58\",\"1:07\",\"1:11\",\"1:13\",\"1:14\",\"1:19\",\"1:21\",\"1:22\",\"1:25\",\"1:26\",\"1:28\",\"1:35\",\"1:37\",\"1:38\",\"1:41\",\"1:42\",\"1:44\",\"1:49\",\"1:50\",\"1:52\",\"1:56\",\"2:07\",\"2:11\",\"2:13\",\"2:14\",\"2:19\",\"2:21\",\"2:22\",\"2:25\",\"2:26\",\"2:28\",\"2:35\",\"2:37\",\"2:38\",\"2:41\",\"2:42\",\"2:44\",\"2:49\",\"2:50\",\"2:52\",\"2:56\",\"3:03\",\"3:05\",\"3:06\",\"3:09\",\"3:10\",\"3:12\",\"3:17\",\"3:18\",\"3:20\",\"3:24\",\"3:33\",\"3:34\",\"3:36\",\"3:40\",\"3:48\",\"4:07\",\"4:11\",\"4:13\",\"4:14\",\"4:19\",\"4:21\",\"4:22\",\"4:25\",\"4:26\",\"4:28\",\"4:35\",\"4:37\",\"4:38\",\"4:41\",\"4:42\",\"4:44\",\"4:49\",\"4:50\",\"4:52\",\"4:56\",\"5:03\",\"5:05\",\"5:06\",\"5:09\",\"5:10\",\"5:12\",\"5:17\",\"5:18\",\"5:20\",\"5:24\",\"5:33\",\"5:34\",\"5:36\",\"5:40\",\"5:48\",\"6:03\",\"6:05\",\"6:06\",\"6:09\",\"6:10\",\"6:12\",\"6:17\",\"6:18\",\"6:20\",\"6:24\",\"6:33\",\"6:34\",\"6:36\",\"6:40\",\"6:48\",\"7:01\",\"7:02\",\"7:04\",\"7:08\",\"7:16\",\"7:32\",\"8:07\",\"8:11\",\"8:13\",\"8:14\",\"8:19\",\"8:21\",\"8:22\",\"8:25\",\"8:26\",\"8:28\",\"8:35\",\"8:37\",\"8:38\",\"8:41\",\"8:42\",\"8:44\",\"8:49\",\"8:50\",\"8:52\",\"8:56\",\"9:03\",\"9:05\",\"9:06\",\"9:09\",\"9:10\",\"9:12\",\"9:17\",\"9:18\",\"9:20\",\"9:24\",\"9:33\",\"9:34\",\"9:36\",\"9:40\",\"9:48\",\"10:03\",\"10:05\",\"10:06\",\"10:09\",\"10:10\",\"10:12\",\"10:17\",\"10:18\",\"10:20\",\"10:24\",\"10:33\",\"10:34\",\"10:36\",\"10:40\",\"10:48\",\"11:01\",\"11:02\",\"11:04\",\"11:08\",\"11:16\",\"11:32\"]\\n    when 5\\n    \\t[\"0:31\",\"0:47\",\"0:55\",\"0:59\",\"1:15\",\"1:23\",\"1:27\",\"1:29\",\"1:30\",\"1:39\",\"1:43\",\"1:45\",\"1:46\",\"1:51\",\"1:53\",\"1:54\",\"1:57\",\"1:58\",\"2:15\",\"2:23\",\"2:27\",\"2:29\",\"2:30\",\"2:39\",\"2:43\",\"2:45\",\"2:46\",\"2:51\",\"2:53\",\"2:54\",\"2:57\",\"2:58\",\"3:07\",\"3:11\",\"3:13\",\"3:14\",\"3:19\",\"3:21\",\"3:22\",\"3:25\",\"3:26\",\"3:28\",\"3:35\",\"3:37\",\"3:38\",\"3:41\",\"3:42\",\"3:44\",\"3:49\",\"3:50\",\"3:52\",\"3:56\",\"4:15\",\"4:23\",\"4:27\",\"4:29\",\"4:30\",\"4:39\",\"4:43\",\"4:45\",\"4:46\",\"4:51\",\"4:53\",\"4:54\",\"4:57\",\"4:58\",\"5:07\",\"5:11\",\"5:13\",\"5:14\",\"5:19\",\"5:21\",\"5:22\",\"5:25\",\"5:26\",\"5:28\",\"5:35\",\"5:37\",\"5:38\",\"5:41\",\"5:42\",\"5:44\",\"5:49\",\"5:50\",\"5:52\",\"5:56\",\"6:07\",\"6:11\",\"6:13\",\"6:14\",\"6:19\",\"6:21\",\"6:22\",\"6:25\",\"6:26\",\"6:28\",\"6:35\",\"6:37\",\"6:38\",\"6:41\",\"6:42\",\"6:44\",\"6:49\",\"6:50\",\"6:52\",\"6:56\",\"7:03\",\"7:05\",\"7:06\",\"7:09\",\"7:10\",\"7:12\",\"7:17\",\"7:18\",\"7:20\",\"7:24\",\"7:33\",\"7:34\",\"7:36\",\"7:40\",\"7:48\",\"8:15\",\"8:23\",\"8:27\",\"8:29\",\"8:30\",\"8:39\",\"8:43\",\"8:45\",\"8:46\",\"8:51\",\"8:53\",\"8:54\",\"8:57\",\"8:58\",\"9:07\",\"9:11\",\"9:13\",\"9:14\",\"9:19\",\"9:21\",\"9:22\",\"9:25\",\"9:26\",\"9:28\",\"9:35\",\"9:37\",\"9:38\",\"9:41\",\"9:42\",\"9:44\",\"9:49\",\"9:50\",\"9:52\",\"9:56\",\"10:07\",\"10:11\",\"10:13\",\"10:14\",\"10:19\",\"10:21\",\"10:22\",\"10:25\",\"10:26\",\"10:28\",\"10:35\",\"10:37\",\"10:38\",\"10:41\",\"10:42\",\"10:44\",\"10:49\",\"10:50\",\"10:52\",\"10:56\",\"11:03\",\"11:05\",\"11:06\",\"11:09\",\"11:10\",\"11:12\",\"11:17\",\"11:18\",\"11:20\",\"11:24\",\"11:33\",\"11:34\",\"11:36\",\"11:40\",\"11:48\"]\\n    when 6\\n    \\t[\"1:31\",\"1:47\",\"1:55\",\"1:59\",\"2:31\",\"2:47\",\"2:55\",\"2:59\",\"3:15\",\"3:23\",\"3:27\",\"3:29\",\"3:30\",\"3:39\",\"3:43\",\"3:45\",\"3:46\",\"3:51\",\"3:53\",\"3:54\",\"3:57\",\"3:58\",\"4:31\",\"4:47\",\"4:55\",\"4:59\",\"5:15\",\"5:23\",\"5:27\",\"5:29\",\"5:30\",\"5:39\",\"5:43\",\"5:45\",\"5:46\",\"5:51\",\"5:53\",\"5:54\",\"5:57\",\"5:58\",\"6:15\",\"6:23\",\"6:27\",\"6:29\",\"6:30\",\"6:39\",\"6:43\",\"6:45\",\"6:46\",\"6:51\",\"6:53\",\"6:54\",\"6:57\",\"6:58\",\"7:07\",\"7:11\",\"7:13\",\"7:14\",\"7:19\",\"7:21\",\"7:22\",\"7:25\",\"7:26\",\"7:28\",\"7:35\",\"7:37\",\"7:38\",\"7:41\",\"7:42\",\"7:44\",\"7:49\",\"7:50\",\"7:52\",\"7:56\",\"8:31\",\"8:47\",\"8:55\",\"8:59\",\"9:15\",\"9:23\",\"9:27\",\"9:29\",\"9:30\",\"9:39\",\"9:43\",\"9:45\",\"9:46\",\"9:51\",\"9:53\",\"9:54\",\"9:57\",\"9:58\",\"10:15\",\"10:23\",\"10:27\",\"10:29\",\"10:30\",\"10:39\",\"10:43\",\"10:45\",\"10:46\",\"10:51\",\"10:53\",\"10:54\",\"10:57\",\"10:58\",\"11:07\",\"11:11\",\"11:13\",\"11:14\",\"11:19\",\"11:21\",\"11:22\",\"11:25\",\"11:26\",\"11:28\",\"11:35\",\"11:37\",\"11:38\",\"11:41\",\"11:42\",\"11:44\",\"11:49\",\"11:50\",\"11:52\",\"11:56\"]\\n    when 7\\n    \\t[\"3:31\",\"3:47\",\"3:55\",\"3:59\",\"5:31\",\"5:47\",\"5:55\",\"5:59\",\"6:31\",\"6:47\",\"6:55\",\"6:59\",\"7:15\",\"7:23\",\"7:27\",\"7:29\",\"7:30\",\"7:39\",\"7:43\",\"7:45\",\"7:46\",\"7:51\",\"7:53\",\"7:54\",\"7:57\",\"7:58\",\"9:31\",\"9:47\",\"9:55\",\"9:59\",\"10:31\",\"10:47\",\"10:55\",\"10:59\",\"11:15\",\"11:23\",\"11:27\",\"11:29\",\"11:30\",\"11:39\",\"11:43\",\"11:45\",\"11:46\",\"11:51\",\"11:53\",\"11:54\",\"11:57\",\"11:58\"]\\n    when 8\\n    \\t[\"7:31\",\"7:47\",\"7:55\",\"7:59\",\"11:31\",\"11:47\",\"11:55\",\"11:59\"]\\n    else\\n    \\t[]\\n    end\\nend\\n```"
		},
		{
			"lc_ans_id":"88550",
			"view":"948",
			"top":"9",
			"title":"Easy, simple, and, naive Python solution",
			"vote":"6",
			"content":"No need to explain.\\n\\n```python\\nclass Solution(object):\\n    def readBinaryWatch(self, num):\\n        \"\"\"\\n        :type num: int\\n        :rtype: List[str]\\n        \"\"\"\\n        output = []\\n        for h in range(12):\\n          for m in range(60):\\n            if bin(h * 64 + m).count('1') == num:\\n              output.append('%d:%02d' % (h, m))\\n        return output\\n\\n```"
		}
	],
	"id":"401",
	"title":"Binary Watch",
	"content":"<p>A binary watch has 4 LEDs on the top which represent the <b>hours</b> (<b>0-11</b>), and the 6 LEDs on the bottom represent the <b>minutes</b> (<b>0-59</b>).</p>\r\n<p>Each LED represents a zero or one, with the least significant bit on the right.</p>\r\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/8/8b/Binary_clock_samui_moon.jpg\" height=\"300\" />\r\n<p>For example, the above binary watch reads \"3:25\".</p>\r\n\r\n<p>Given a non-negative integer <i>n</i> which represents the number of LEDs that are currently on, return all possible times the watch could represent.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>Input: n = 1<br>Return: [\"1:00\", \"2:00\", \"4:00\", \"8:00\", \"0:01\", \"0:02\", \"0:04\", \"0:08\", \"0:16\", \"0:32\"]</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>The order of output does not matter.</li>\r\n<li>The hour must not contain a leading zero, for example \"01:00\" is not valid, it should be \"1:00\".</li>\r\n<li>The minute must be consist of two digits and may contain a leading zero, for example \"10:2\" is not valid, it should be \"10:02\".</li>\r\n</ul>\r\n</p>",
	"frequency":"322",
	"ac_num":"42663"
}