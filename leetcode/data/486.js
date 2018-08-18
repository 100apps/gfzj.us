{
	"difficulty":"2",
	"submit_num":"40919",
	"show_id":"495",
	"leetcode_id":"495",
	"answers":[
		{
			"lc_ans_id":"97475",
			"view":"3699",
			"top":"0",
			"title":"Python Solution for Teemo",
			"vote":"30",
			"content":"![alt text](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSa-yd3K7uW2ocdpJ-7mA3kMyF-XLUjkVproRQxIzhrRzh_osOW)\\n\\n    class Solution(object):\\n        def findPoisonedDuration(self, timeSeries, duration):\\n            ans = duration * len(timeSeries)\\n            for i in range(1,len(timeSeries)):\\n                ans -= max(0, duration - (timeSeries[i] - timeSeries[i-1]))\\n            return ans\\n\\n![alt text](https://www.baronsteal.net/images/champion/loading/Ashe_4.jpg)"
		},
		{
			"lc_ans_id":"97465",
			"view":"4504",
			"top":"1",
			"title":"O(n) Java Solution using same idea of merge intervals",
			"vote":"18",
			"content":"The same idea as https://leetcode.com/problems/merge-intervals/\\nAlgorithm:\\n1. Use two variable to record current start and end point.\\n2. If the start of new interval is greater than current end, meaning NO overlapping, we can sum the current interval length to result and then update start and end.\\n3. Otherwise just update the current end;\\n\\n```\\npublic class Solution {\\n    public int findPosisonedDuration(int[] timeSeries, int duration) {\\n        if (timeSeries == null || timeSeries.length == 0 || duration == 0) return 0;\\n        \\n        int result = 0, start = timeSeries[0], end = timeSeries[0] + duration;\\n        for (int i = 1; i < timeSeries.length; i++) {\\n            if (timeSeries[i] > end) {\\n                result += end - start;\\n                start = timeSeries[i];\\n            }\\n            end = timeSeries[i] + duration;\\n        }\\n        result += end - start;\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97451",
			"view":"4719",
			"top":"2",
			"title":"Java 7 lines O(n) solution",
			"vote":"10",
			"content":"For each ```begin``` followed by ```t```\\nIf ```t``` is within previous duration ```[begin, begin + duration]``` then increase total by ```t - begin```\\nIf ```t``` in out of previous duration ```[begin, begin + duration]``` then increase total by ```duration```\\nIn both cases update ```begin``` to the new begin time ```t```\\n\\n```\\n    public int findPoisonedDuration(int[] timeSeries, int duration) {\\n        if (timeSeries.length == 0) return 0;\\n        int begin = timeSeries[0], total = 0;\\n        for (int t : timeSeries) {\\n            total = total + (t < begin + duration ? t - begin : duration);\\n            begin = t;\\n        }   \\n        return total + duration;\\n    } \\n```"
		},
		{
			"lc_ans_id":"97502",
			"view":"1588",
			"top":"3",
			"title":"Simple question obscured by unnecessary story",
			"vote":"8",
			"content":"One of the reasons I prefer Leetcode to other coding sites is that the questions are presented in a straightforward way, if it's about trees or arrays then that is what is asked in the question.  Unfortunately that is not the case here and the real logic is dressed up with a story about Teemo and Ashe (which I have never heard of).  I would prefer to get straight to the point and for the title of the question to convey some meaning about what it is about.\\n\\nHowever, the underlying problem is simple, I would not say this was \"medium\"\\n```\\n    def findPosisonedDuration(self, timeSeries, duration):\\n        if not timeSeries:\\n            return 0\\n        poisoned = duration\\n        for i in range(1, len(timeSeries)):\\n            poisoned += duration - max(0, timeSeries[i-1]+duration - timeSeries[i])\\n        return poisoned"
		},
		{
			"lc_ans_id":"97584",
			"view":"412",
			"top":"4",
			"title":"Easy to understand Java solution",
			"vote":"6",
			"content":"We just need to take the minimum value between the difference of previous timestamp and the current timestamp, and the duration.\\nThis makes sense because the poisoning will happen at each timestamp.\\nAt the end, I am adding the duration to the total answer to take in consideration the poisoning at the last timestamp.\\n\\n```\\npublic class Solution {\\n    public int findPosisonedDuration(int[] timeSeries, int duration) {\\n        \\n        if(timeSeries.length == 0)return 0;\\n        if(timeSeries.length == 1)return duration;\\n        \\n        int total = 0;\\n        for(int i=1; i<timeSeries.length;i++)\\n        {\\n            total += Math.min(duration,timeSeries[i]-timeSeries[i-1]);\\n        }\\n        \\n        total += duration;\\n     \\n     return total;   \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97523",
			"view":"2093",
			"top":"5",
			"title":"Short O(n) C++ solution",
			"vote":"6",
			"content":"```\\nlass Solution {\\npublic:\\n    int findPosisonedDuration(vector<int>& ts, int duration) {\\n        int tp = 0, pe = 0;\\n        for(int i=0; i<ts.size(); ++i){\\n            tp += duration - (ts[i] < pe) *(pe - ts[i]);\\n            pe = ts[i] + duration;\\n        }\\n        return tp;\\n    }\\n};"
		},
		{
			"lc_ans_id":"97573",
			"view":"200",
			"top":"6",
			"title":"6 lines of Java O(n) using Math.min",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    /*\\n    if time.length == 0: return 0\\n    for i = 1...n\\n        diff = time[i] - time[i-1]\\n        result += diff > duration ? duration : diff\\n    result += duration\\n    */\\n    public int findPoisonedDuration(int[] timeSeries, int duration) {\\n        if (timeSeries.length == 0) return 0;\\n        int result = 0;\\n        for (int i = 1; i < timeSeries.length; i += 1) \\n            result += Math.min(timeSeries[i] - timeSeries[i-1], duration);\\n        result += duration;\\n        return result;\\n```\\n    }\\n}"
		},
		{
			"lc_ans_id":"97577",
			"view":"264",
			"top":"7",
			"title":"O(n) Java Solution",
			"vote":"4",
			"content":"```java\\npublic class Solution {\\n    public int findPoisonedDuration(int[] timeSeries, int duration) {\\n        int res=0;\\n        if(timeSeries==null||timeSeries.length==0||duration<=0) return res;\\n        for(int i=1;i<timeSeries.length;i++){\\n            res+=Math.min(duration, timeSeries[i]-timeSeries[i-1]);\\n        }\\n        return res+duration;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97578",
			"view":"233",
			"top":"8",
			"title":"4 lines O(n) Python",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def findPosisonedDuration(self, timeSeries, duration):\\n        \"\"\"\\n        :type timeSeries: List[int]\\n        :type duration: int\\n        :rtype: int\\n        \"\"\"\\n        ans = 0\\n        for i in range(len(timeSeries) - 1):\\n            ans += min(duration, timeSeries[i+1] - timeSeries[i])\\n        return ans + duration if timeSeries else 0\\n```"
		},
		{
			"lc_ans_id":"97476",
			"view":"100",
			"top":"9",
			"title":"Python, 1-line straightforward and concise solution",
			"vote":"2",
			"content":"Just calculate ````sum(min(duration, next attack time - this attack time))````\\n`````\\ndef findPoisonedDuration(self, s, d):\\n        return sum(min(d, b - a) for a, b in zip(s, s[1:] + [10e7]))"
		}
	],
	"id":"486",
	"title":"Teemo Attacking",
	"content":"<p>\r\nIn LOL world, there is a hero called Teemo and his attacking can make his enemy Ashe be in poisoned condition. Now, given the Teemo's attacking <b>ascending</b> time series towards Ashe and the poisoning time duration per Teemo's attacking, you need to output the total time that Ashe is in poisoned condition.\r\n</p>\r\n\r\n<p>You may assume that Teemo attacks at the very beginning of a specific time point, and makes Ashe be in poisoned condition immediately.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,4], 2\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned immediately. <br />This poisoned status will last 2 seconds until the end of time point 2. <br />And at time point 4, Teemo attacks Ashe again, and causes Ashe to be in poisoned status for another 2 seconds. <br />So you finally need to output 4.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2], 2\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned. <br />This poisoned status will last 2 seconds until the end of time point 2. <br/>However, at the beginning of time point 2, Teemo attacks Ashe again who is already in poisoned status. <br/>Since the poisoned status won't add up together, though the second poisoning attack will still work at time point 2, it will stop at the end of time point 3. <br/>So you finally need to output 3.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume the length of given time series array won't exceed 10000.</li>\r\n<li>You may assume the numbers in the Teemo's attacking time series and his poisoning time duration per attacking are non-negative integers, which won't exceed 10,000,000.</li>\r\n</ol>\r\n</p>",
	"frequency":"176",
	"ac_num":"21110"
}