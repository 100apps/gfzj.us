{
	"difficulty":"2",
	"submit_num":"27027",
	"show_id":"681",
	"leetcode_id":"681",
	"answers":[
		{
			"lc_ans_id":"107776",
			"view":"4373",
			"top":"0",
			"title":"Python",
			"vote":"17",
			"content":"### Solution 1\\n\\nJust turn the clock forwards one minute at a time until you reach a time with the original digits.\\n```\\nfrom datetime import *\\n\\nclass Solution(object):\\n    def nextClosestTime(self, time):\\n        digits = set(time)\\n        while True:\\n            time = (datetime.strptime(time, '%H:%M') + timedelta(minutes=1)).strftime('%H:%M')\\n            if set(time) <= digits:\\n                return time\\n```\\n\\n### Solution 2\\n\\nReturn the smallest time that uses the given digits, just make being larger than the input a priority.\\n\\n    def nextClosestTime(self, time):\\n        return min((t <= time, t)\\n                   for i in range(24 * 60)\\n                   for t in ['%02d:%02d' % divmod(i, 60)]\\n                   if set(t) <= set(time))[1]\\n\\nGolfed:\\n\\n    def nextClosestTime(self, T):\\n        return min((t<=T,t)for i in range(1440)for t in['%02d:%02d'%divmod(i,60)]if set(t)<=set(T))[1]"
		},
		{
			"lc_ans_id":"107788",
			"view":"5340",
			"top":"1",
			"title":"Verbose Java solution, DFS",
			"vote":"14",
			"content":"Since there are at max ```4 * 4 * 4 * 4``` = ```256``` possible times, just try them all...\\n```\\nclass Solution {\\n    int diff = Integer.MAX_VALUE;\\n    String result = \"\";\\n    \\n    public String nextClosestTime(String time) {\\n        Set<Integer> set = new HashSet<>();\\n        set.add(Integer.parseInt(time.substring(0, 1)));\\n        set.add(Integer.parseInt(time.substring(1, 2)));\\n        set.add(Integer.parseInt(time.substring(3, 4)));\\n        set.add(Integer.parseInt(time.substring(4, 5)));\\n        \\n        if (set.size() == 1) return time;\\n        \\n        List<Integer> digits = new ArrayList<>(set);\\n        int minute = Integer.parseInt(time.substring(0, 2)) * 60 + Integer.parseInt(time.substring(3, 5));\\n\\n        dfs(digits, \"\", 0, minute);\\n\\n        return result;\\n    }\\n\\n    private void dfs(List<Integer> digits, String cur, int pos, int target) {\\n        if (pos == 4) {\\n            int m = Integer.parseInt(cur.substring(0, 2)) * 60 + Integer.parseInt(cur.substring(2, 4));\\n            if (m == target) return;\\n            int d = m - target > 0 ? m - target : 1440 + m - target;\\n            if (d < diff) {\\n                diff = d;\\n                result = cur.substring(0, 2) + \":\" + cur.substring(2, 4);\\n            }\\n            return;\\n        }\\n\\n        for (int i = 0; i < digits.size(); i++) {\\n            if (pos == 0 && digits.get(i) > 2) continue;\\n            if (pos == 1 && Integer.parseInt(cur) * 10 + digits.get(i) > 23) continue;\\n            if (pos == 2 && digits.get(i) > 5) continue;\\n            if (pos == 3 && Integer.parseInt(cur.substring(2)) * 10 + digits.get(i) > 59) continue;\\n            dfs(digits, cur + digits.get(i), pos + 1, target);\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107775",
			"view":"4087",
			"top":"2",
			"title":"JAVA three ways to solve this problem",
			"vote":"12",
			"content":"Solution 1:\\nwe can try to increase the minute and the hour one by one. If all these four digits of the next time is in hashset, we find it and output! because these four digits are all reused.\\n\\n```java\\n    public String nextClosestTime(String time) {\\n        String[] val = time.split(\":\");\\n        Set<Integer> set = new HashSet<>();\\n        int hour = add(set, val[0]);\\n        int minu = add(set, val[1]);\\n\\n        int[] times = new int[] {hour, minu};\\n        nxt(times);\\n\\n        while (!contains(times[0], times[1], set)) {\\n            nxt(times);\\n        }\\n        return valid(times[0]) + \":\" + valid(times[1]);\\n    }\\n\\n    public void nxt(int[] time) {\\n        int hour = time[0];\\n        int minu = time[1];\\n        minu ++;\\n        if (minu == 60) {\\n            hour ++;\\n            minu = 0;\\n            if (hour == 24) hour = 0;\\n        }\\n        time[0] = hour;\\n        time[1] = minu;\\n    }\\n\\n    public int add(Set<Integer> set, String timeStr) {\\n        int time = Integer.parseInt(timeStr);\\n        set.add(time / 10);\\n        set.add(time % 10);\\n        return time;\\n    }\\n\\n    public String valid(int time) {\\n        if (time >= 0 && time <= 9) return \"0\" + time;\\n        else return time + \"\";\\n    }\\n\\n    public boolean contains(int hour, int minu, Set<Integer> set) {\\n        return set.contains(hour / 10) && set.contains(hour % 10) && set.contains(minu / 10) && set.contains(minu % 10);\\n    }\\n```\\n\\nbut in this way, the cost will be 24* 60 = 1440.\\n\\nSolution 2:\\nBecause these four digits can be reused,so the next time can be constructed by these digits, so we try to use dfs to search all the next time.\\n\\nit will search 4 * 4 * 4 * 4 = 256 times.\\n\\n```java\\n    int diff = 0x3f3f3f3f;\\n    String result = \"\";\\n    int h;\\n    int m;\\n    public String nextClosestTime(String time) {\\n        int[] digit = new int[4];\\n        int tot = 0;\\n        String[] val = time.split(\":\");\\n        int hour = Integer.parseInt(val[0]);\\n        int minu = Integer.parseInt(val[1]);\\n        digit[tot++] = hour / 10;\\n        digit[tot++] = hour % 10;\\n        digit[tot++] = minu / 10;\\n        digit[tot++] = minu % 10;\\n\\n        h = hour;\\n        m = minu;\\n\\n        dfs(digit, 0, new int[4]);\\n\\n        return result;\\n    }\\n\\n    void dfs(int[] digit, int i, int[] ans) {\\n        if (i == 4) {\\n            int hour = 10 * ans[0] + ans[1];\\n            int minu = 10 * ans[2] + ans[3];\\n            if (hour >= 0 && hour <= 23 && minu >= 0 && minu <= 59) {\\n                int df = diff(hour, minu);\\n                if (df < diff) {\\n                    diff = df;\\n                    result = valid(hour) + \":\" + valid(minu);\\n                }\\n            }\\n        }\\n        else {\\n            for (int j = 0; j < 4; ++j) {\\n                ans[i] = digit[j];\\n                dfs(digit, i + 1, ans);\\n            }\\n        }\\n    }\\n\\n    int diff(int hour, int minu) {\\n        int c2o = 60 * 60 - h * 60 - m;\\n        int n2o = 60 * 60 - hour * 60 - minu;\\n        return n2o < c2o ? c2o - n2o : c2o - n2o + 3600;\\n    }\\n\\n    public String valid(int time) {\\n        if (time >= 0 && time <= 9) return \"0\" + time;\\n        else return time + \"\";\\n    }\\n```\\nSolution 3:\\nOf course, we can try to prune, if hour and minute is not valid, just stop search.\\n\\nfor the test case \"23:59\", it will search 24 times, but solution 2 searches 256 times.\\n\\n```java\\n    int diff = 0x3f3f3f3f;\\n    String result = \"\";\\n    int h;\\n    int m;\\n    public String nextClosestTime(String time) {\\n        int[] digit = new int[4];\\n        int tot = 0;\\n        String[] val = time.split(\":\");\\n        int hour = Integer.parseInt(val[0]);\\n        int minu = Integer.parseInt(val[1]);\\n        digit[tot++] = hour / 10;\\n        digit[tot++] = hour % 10;\\n        digit[tot++] = minu / 10;\\n        digit[tot++] = minu % 10;\\n\\n        h = hour;\\n        m = minu;\\n\\n        dfs(digit, 0, new int[4]);\\n\\n        return result;\\n    }\\n\\n    void dfs(int[] digit, int i, int[] ans) {\\n        if (i == 4) {\\n            int hour = 10 * ans[0] + ans[1];\\n            int minu = 10 * ans[2] + ans[3];\\n            int df = diff(hour, minu);\\n            if (df < diff) {\\n                diff = df;\\n                result = valid(hour) + \":\" + valid(minu);\\n            }\\n        }\\n        else {\\n            for (int j = 0; j < 4; ++j) {\\n                ans[i] = digit[j];\\n                if (i == 1) {\\n                    int hour = 10 * ans[0] + ans[1];\\n                    if (hour >= 0 && hour <= 23) dfs(digit, i + 1, ans);\\n                }\\n                else if (i == 3) {\\n                    int minu = 10 * ans[2] + ans[3];\\n                    if (minu >= 0 && minu <= 59) dfs(digit, i + 1, ans);\\n                }\\n                else {\\n                    dfs(digit, i + 1, ans);\\n                }\\n            }\\n        }\\n    }\\n\\n    int diff(int hour, int minu) {\\n        int c2o = 60 * 60 - h * 60 - m;\\n        int n2o = 60 * 60 - hour * 60 - minu;\\n        return n2o < c2o ? c2o - n2o : c2o - n2o + 3600;\\n    }\\n\\n    public String valid(int time) {\\n        if (time >= 0 && time <= 9) return \"0\" + time;\\n        else return time + \"\";\\n    }\\n```"
		},
		{
			"lc_ans_id":"107783",
			"view":"2871",
			"top":"3",
			"title":"[C++/Java] Clean Code",
			"vote":"7",
			"content":"**C++**\\n```\\nclass Solution {\\n    int mins[4] = { 600, 60, 10, 1 };\\npublic:\\n    string nextClosestTime(string time) {\\n        size_t colon = time.find(':');\\n        int cur = stoi(time.substr(0, colon)) * 60 + stoi(time.substr(colon + 1));\\n        string next = \"0000\";\\n        for (int i = 1, d = 0; i <= 1440 && d < 4; i++) {\\n            int m = (cur + i) % 1440;\\n            for (d = 0; d < 4; d++) {\\n                next[d] = '0' + m / mins[d]; m %= mins[d];\\n                if (time.find(next[d]) == string::npos) break;\\n            }\\n        }\\n        return next.substr(0, 2) + ':' + next.substr(2, 2);\\n    }\\n};\\n```\\n**Java**\\n```\\nclass Solution {\\n    static int[] mins = { 600, 60, 10, 1 };\\n    public String nextClosestTime(String time) {\\n        int colon = time.indexOf(':');\\n        int cur = Integer.valueOf(time.substring(0, colon)) * 60 + Integer.valueOf(time.substring(colon + 1));\\n        char[] next = new char[4];\\n        for (int i = 1, d = 0; i <= 1440 && d < 4; i++) {\\n            int m = (cur + i) % 1440;\\n            for (d = 0; d < 4; d++) {\\n                next[d] = (char)('0' + m / mins[d]); m %= mins[d];\\n                if (time.indexOf(next[d]) == -1) break;\\n            }\\n        }\\n        return new String(next, 0, 2) + ':' + new String(next, 2, 2);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107773",
			"view":"588",
			"top":"4",
			"title":"Java AC 5ms simple solution with detailed explaination",
			"vote":"5",
			"content":"This approach here is trying to find next digit for each postion in \"HH:MM\" from right to left. If the next digit is greater than current digit, return directly and keep other digits unchanged.\\nHere is the steps: (e.g. `\"17:38\"`)\\n1. Retrieve all four digits from given string and sort them in asscending order, `\"17:38\"` -> `digits[] {'1', '3', '7', '8'}`\\n2. Apply `findNext()` from the right most digit to left most digit, try to find next greater digit from `digits[]` (if exist) which is suitable for current position, otherwise return the minimum digit (`digits[0]`):\\n\\n    - `\"HH:M_\"`: there is no upperLimit for this position (0-9). Just pick the next different digit in the sequence. In the example above, `'8'` is already the greatest one, so we change it into the smallest one (`digits[0]` i.e. `'1'`) and move to next step: `\"17:38\" -> \"17:31\"`\\n\\n    - `\"HH:_M\"`: the upperLimit is `'5'` (00~59). The next different digit for `'3'` is `'7'`, which is greater than `'5'`, so we should omit it and try next. Similarly, `'8'` is beyond the limit, so we should choose next, i.e. `'1'`: `\"17:38\" -> \"17:11\"`\\n    - `\"H_:MM\"`: the upperLimit depends on `result[0]`. If `result[0] == '2'`, then it should be no more than `'3'`; else no upperLimit (0-9). Here we have `result[0]` = `'1'`, so we could choose any digit we want. The next digit for `'7'` is `'8'`, so we change it and return the result directly. `\"17:38\" -> \"18:11\"`\\n    - `\"_H:MM\"`: the upperLimit is `'2'` (00~23). e.g. `\"03:33\" -> \"00:00\"`\\n```\\nclass Solution {\\n    \\n    public String nextClosestTime(String time) {\\n        char[] result = time.toCharArray();\\n        char[] digits = new char[] {result[0], result[1], result[3], result[4]};\\n        Arrays.sort(digits);\\n        \\n        // find next digit for HH:M_\\n        result[4] = findNext(result[4], (char)('9' + 1), digits);  // no upperLimit for this digit, i.e. 0-9\\n        if(result[4] > time.charAt(4)) return String.valueOf(result);  // e.g. 23:43 -> 23:44\\n        \\n        // find next digit for HH:_M\\n        result[3] = findNext(result[3], '5', digits);\\n        if(result[3] > time.charAt(3)) return String.valueOf(result);  // e.g. 14:29 -> 14:41\\n        \\n        // find next digit for H_:MM\\n        result[1] = result[0] == '2' ? findNext(result[1], '3', digits) : findNext(result[1], (char)('9' + 1), digits);\\n        if(result[1] > time.charAt(1)) return String.valueOf(result);  // e.g. 02:37 -> 03:00 \\n        \\n        // find next digit for _H:MM\\n        result[0] = findNext(result[0], '2', digits);\\n        return String.valueOf(result);  // e.g. 19:59 -> 11:11\\n    }\\n    \\n    /** \\n     * find the next bigger digit which is no more than upperLimit. \\n     * If no such digit exists in digits[], return the minimum one i.e. digits[0]\\n     * @param current the current digit\\n     * @param upperLimit the maximum possible value for current digit\\n     * @param digits[] the sorted digits array\\n     * @return \\n     */\\n    private char findNext(char current, char upperLimit, char[] digits) {\\n        //System.out.println(current);\\n        if(current == upperLimit) {\\n            return digits[0];\\n        }\\n        int pos = Arrays.binarySearch(digits, current) + 1;\\n        while(pos < 4 && (digits[pos] > upperLimit || digits[pos] == current)) { // traverse one by one to find next greater digit\\n            pos++;\\n        }\\n        return pos == 4 ? digits[0] : digits[pos];\\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"107779",
			"view":"1887",
			"top":"5",
			"title":"Short and simple O(1) Python solution",
			"vote":"4",
			"content":"The idea is really simple. \\nGenerate all increments of the time given, and find the first time that has all the digits in the original time given.\\n```\\ndef nextClosestTime(self, time):\\n            digits = [int(y) for x in time.split(':') for y in x]\\n            h, m = time.split(':')\\n            while True:\\n                h, m = (str(int(h)+1), '00') if int(m) == 59 else (h, str(int(m)+1))\\n                h = '00' if int(h) > 23 else h\\n                h = '0' + h if len(h) == 1 else h\\n                m = '0' + m if len(m) == 1 else m\\n                if all([int(x) in digits for x in h+m]):\\n                    return h + ':' + m\\n```"
		},
		{
			"lc_ans_id":"107769",
			"view":"333",
			"top":"6",
			"title":"Lengthy Python beats 100% (42 ms)",
			"vote":"2",
			"content":"```\\n# 62 / 62 test cases passed.\\n# Status: Accepted\\n# Runtime: 42 ms\\nclass Solution(object):\\n    def nextClosestTime(self, time):\\n        num1 = int(time[0])\\n        num2 = int(time[1])\\n        num3 = int(time[3])\\n        num4 = int(time[4])\\n        rank = [num1,num2,num3,num4]\\n        rank = sorted(rank)\\n        \\n        def h(a, cur):\\n            res = 0\\n            for i in range(len(a)):\\n                if a[i] == cur:\\n                    res = i\\n            return res\\n        if num4 < rank[3]: \\n            return str(num1)+str(num2)+\":\"+str(num3)+str(rank[h(rank, num4)+1])\\n        ind3 = h(rank, num3)\\n        if ind3 < 3: \\n            cur = rank[ind3+1]\\n            if cur < 6:  return str(num1)+str(num2)+\":\"+str(cur)+str(rank[0])\\n            \\n        ind2 = h(rank, num2)\\n        if ind2 < 3:\\n            if num1 == 2:\\n                cur = rank[ind2+1]\\n                if cur < 4:\\n                    return str(num1)+str(cur)+\":\"+str(rank[0])+str(rank[0])\\n            else:\\n                cur = rank[ind2+1]\\n                return str(num1)+str(cur)+\":\"+str(rank[0])+str(rank[0])\\n        ind1 = h(rank,num1)\\n        if ind1 < 3:\\n            cur = rank[ind1 + 1]\\n            if cur < 3:\\n                return str(cur)+str(rank[0])+\":\"+str(rank[0])+str(rank[0])\\n        \\n        return str(rank[0])+str(rank[0])+\":\"+str(rank[0])+str(rank[0])\\n```"
		},
		{
			"lc_ans_id":"107836",
			"view":"457",
			"top":"7",
			"title":"Concise Java Solution",
			"vote":"2",
			"content":"```\\npublic String nextClosestTime(String s) {\\n    int[] time = new int[]{Integer.parseInt(s.substring(0,2)), Integer.parseInt(s.substring(3))};\\n    for (int i=time[0]; i<48; i++) \\n        for (int j= i == time[0] ? time[1] + 1 : 0; j<60; j++) \\n            if (isValid(s, String.format(\"%02d\", i % 24)) && isValid(s, String.format(\"%02d\", j))) \\n                return String.format(\"%02d\", i % 24) + \":\" + String.format(\"%02d\", j);\\n    return \"\";\\n}\\n\\npublic boolean isValid(String time, String newTime) {\\n    for (char c : newTime.toCharArray()) \\n        if (time.indexOf(c) == -1) return false;\\n    return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"107799",
			"view":"155",
			"top":"8",
			"title":"Java - simple, easy, intuitive approach - 10ms",
			"vote":"1",
			"content":"Basically, we have 4 digits in hand. Sort those 4 digits and to find the next closest time - start changing the time from 4th digit (as you would do it on a digital clock). Every time, just check if the time is valid or not. If not, change the 3rd digit, and so on..\\n\\nIf no changing the individual digits didn't work out, create a new time with the minimum digit and that would be our answer! \\n``` \\npublic String nextClosestTime(String inputTime) {\\n        inputTime = inputTime.substring(0,2) + inputTime.substring(3,5);\\n        \\n        char timeInChar[] = inputTime.toCharArray();\\n        int time[] = new int[4];\\n        int sortedTime[] = new int[4];\\n        \\n        for (int i=0; i<4; i++) {\\n            time[i] = timeInChar[i] - '0';\\n            sortedTime[i] = timeInChar[i] - '0';\\n        }\\n        Arrays.sort(sortedTime);\\n\\n        String res = \"\";\\n            \\n        // just changing 4th digit\\n        for (int i=0; i<4; i++) {\\n            if (time[3] < sortedTime[i]) {\\n                time[3] = sortedTime[i];\\n                \\n                res += timeInChar[0];\\n                res += timeInChar[1] + \":\";\\n                res += timeInChar[2];\\n                res += time[3];\\n                if (isValidTime(res))\\n                    return res;\\n                else\\n                    res = \"\";\\n            }\\n        }\\n        \\n        // changing 3rd digit (last digit might also change)\\n        for (int i=0; i<4; i++) {\\n            if (time[2] < sortedTime[i]) {\\n                time[2] = sortedTime[i];\\n                res += timeInChar[0];\\n                res += timeInChar[1] + \":\";\\n                res += time[2];\\n                res += sortedTime[0];\\n                if (isValidTime(res))\\n                    return res;\\n                else\\n                    res = \"\";\\n            }\\n        }\\n        \\n        // changing 2nd digit\\n        for (int i=0; i<4; i++) {\\n            if (time[1] < sortedTime[i]) {\\n                time[1] = sortedTime[i];\\n                res += timeInChar[0];\\n                res += time[1] + \":\";\\n                res += sortedTime[0];\\n                res += sortedTime[0];\\n                \\n                if (isValidTime(res))\\n                    return res;\\n                else\\n                    res = \"\";\\n            }\\n        }\\n\\n        // changing 1st digit\\n        for (int i=0; i<4; i++) {\\n            if (time[0] < sortedTime[i]) {\\n                time[0] = sortedTime[i];\\n                res += time[0];\\n                res += timeInChar[0] + \":\";\\n                res += sortedTime[0];\\n                res += sortedTime[0];\\n                \\n                if (isValidTime(res))\\n                    return res;\\n                else\\n                    res = \"\";\\n            }\\n        }\\n        \\n        // if I'm here, changing none of digits worked\\n        res += sortedTime[0];\\n        res += sortedTime[0]+\":\";\\n        res += sortedTime[0];\\n        res += sortedTime[0];\\n        return res;\\n    }\\n    \\n    public static boolean isValidTime(String s) {\\n        String timeInStr = s.replaceAll(\":\", \"\");\\n        // System.out.println(\"s:\"+s+\", timeInStr:\"+timeInStr);\\n        String hr = timeInStr.substring(0,2);\\n        String min = timeInStr.substring(2);\\n        \\n        int h = Integer.parseInt(hr);\\n        int m = Integer.parseInt(min);\\n        \\n        return ((h<=23) && m <60);\\n    }\\n```"
		},
		{
			"lc_ans_id":"107802",
			"view":"110",
			"top":"9",
			"title":"Ugly Java Solution???",
			"vote":"1",
			"content":"That is not cool, I feel that my code uses too much extra spaces.  \\n```\\nclass Solution {\\n    public String nextClosestTime(String time) {\\n        String hour = time.substring(0,2);\\n        String minute = time.substring(3,5);\\n        HashSet<Character> set = new HashSet<>();\\n        for (char c : time.toCharArray()) {\\n            if (c != ':') {\\n                set.add(c);\\n            }\\n        }\\n        List<Character> digits = new ArrayList(set);\\n        List<String> hours = new ArrayList<>();\\n        List<String> minutes = new ArrayList<>();\\n        StringBuilder sb = new StringBuilder();\\n        \\n        for (char c1 : digits) {\\n            sb.append(c1);\\n            for (char c2 : digits) {\\n                sb.append(c2);\\n                if (sb.toString().compareTo(\"59\") <= 0) {\\n                    minutes.add(sb.toString());\\n                    if (sb.toString().compareTo(\"23\") <= 0) {\\n                        hours.add(sb.toString());\\n                    }\\n                }\\n                sb.deleteCharAt(1);\\n            }\\n            sb.deleteCharAt(0);\\n        }\\n        \\n        int h = hours.indexOf(hour);\\n        int m = minutes.indexOf(minute);\\n        if (m != minutes.size() - 1) {\\n            return hour + \":\" + minutes.get(m+1);\\n        } else if (h != hours.size() - 1) {\\n            return hours.get(h+1) + \":\" + minutes.get(0);\\n        } else {\\n            return hours.get(0) + \":\" + minutes.get(0);\\n        }\\n    }\\n}\\n```"
		}
	],
	"id":"658",
	"title":"Next Closest Time",
	"content":"<p>Given a time represented in the format \"HH:MM\", form the next closest time by reusing the current digits. There is no limit on how many times a digit can be reused.</p>\r\n\r\n<p>You may assume the given input string is always valid. For example, \"01:34\", \"12:09\" are all valid. \"1:34\", \"12:9\" are all invalid.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> \"19:34\"\r\n<b>Output:</b> \"19:39\"\r\n<b>Explanation:</b> The next closest time choosing from digits <b>1</b>, <b>9</b>, <b>3</b>, <b>4</b>, is <b>19:39</b>, which occurs 5 minutes later.  It is not <b>19:33</b>, because this occurs 23 hours and 59 minutes later.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> \"23:59\"\r\n<b>Output:</b> \"22:22\"\r\n<b>Explanation:</b> The next closest time choosing from digits <b>2</b>, <b>3</b>, <b>5</b>, <b>9</b>, is <b>22:22</b>. It may be assumed that the returned time is next day's time since it is smaller than the input time numerically.\r\n</pre>\r\n</p>",
	"frequency":"350",
	"ac_num":"11574"
}