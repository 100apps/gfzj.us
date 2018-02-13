{
	"difficulty":"2",
	"submit_num":"269319",
	"show_id":"274",
	"leetcode_id":"274",
	"answers":[
		{
			"lc_ans_id":"70778",
			"view":"47030",
			"top":"0",
			"title":"My O(n) time solution use Java",
			"vote":"413",
			"content":"    public class Solution {\\n        // 9.3 70 years diaoZhaTian China jiaYou \\n        public int hIndex(int[] citations) {\\n            int length = citations.length;\\n            if (length == 0) {\\n            \\treturn 0;\\n            }\\n            \\n            int[] array2 = new int[length + 1];\\n            for (int i = 0; i < length; i++) {\\n            \\tif (citations[i] > length) {\\n            \\t\\tarray2[length] += 1;\\n            \\t} else {\\n            \\t\\tarray2[citations[i]] += 1;\\n            \\t}\\n            }\\n            int t = 0;\\n            int result = 0;\\n    \\n            for (int i = length; i >= 0; i--) {\\n            \\tt = t + array2[i];\\n            \\tif (t >= i) {\\n            \\t\\treturn i;\\n            \\t}\\n            }\\n            return 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"70768",
			"view":"11375",
			"top":"1",
			"title":"Java bucket sort O(n) solution with detail explanation",
			"vote":"140",
			"content":"This type of problems always throw me off, but it just takes some getting used to.  The idea behind it is some bucket sort mechanisms.  First, you may ask why bucket sort.  Well, the h-index is defined as the number of papers with reference greater than the number.  So assume `n` is the total number of papers, if we have `n+1` buckets, number from 0 to n, then for any paper with reference corresponding to the index of the bucket, we increment the count for that bucket.  The only exception is that for any paper with larger number of reference than `n`, we put in the `n`-th bucket.  \\n\\nThen we iterate from the back to the front of the buckets, whenever the total count exceeds the index of the bucket, meaning that we have the index number of papers that have reference greater than or equal to the index.  Which will be our h-index result.  The reason to scan from the end of the array is that we are looking for the greatest h-index.  For example, given array `[3,0,6,5,1]`, we have 6 buckets to contain how many papers have the corresponding index.  Hope to image and explanation help.\\n\\n\\n![Buckets][1]\\n\\n\\n\\n\\n    public int hIndex(int[] citations) {\\n        int n = citations.length;\\n        int[] buckets = new int[n+1];\\n        for(int c : citations) {\\n            if(c >= n) {\\n                buckets[n]++;\\n            } else {\\n                buckets[c]++;\\n            }\\n        }\\n        int count = 0;\\n        for(int i = n; i >= 0; i--) {\\n            count += buckets[i];\\n            if(count >= i) {\\n                return i;\\n            }\\n        }\\n        return 0;\\n    }\\n\\n\\n  [1]: http://i67.tinypic.com/2yvpfv5.jpg"
		},
		{
			"lc_ans_id":"70810",
			"view":"13189",
			"top":"2",
			"title":"A Clean O(N) Solution in Java",
			"vote":"86",
			"content":"    public int hIndex(int[] citations) {\\n        int len = citations.length;\\n        int[] count = new int[len + 1];\\n        \\n        for (int c: citations)\\n            if (c > len) \\n                count[len]++;\\n            else \\n                count[c]++;\\n        \\n        \\n        int total = 0;\\n        for (int i = len; i >= 0; i--) {\\n            total += count[i];\\n            if (total >= i)\\n                return i;\\n        }\\n        \\n        return 0;\\n    }"
		},
		{
			"lc_ans_id":"70818",
			"view":"6907",
			"top":"3",
			"title":"Java, O(n) time, with easy explanation.",
			"vote":"54",
			"content":"The idea is to see that the result can only range from 0 to the length of the array (because we can't have h-index greater than the total papers published). So we create an array \"arr\" which acts like a HashMap (using pigeon hole principle) and loop backwards from the highest element, then we find \"tot\" which is the total number of papers that has more than i citations, and we stop when tot>=i (total number of papers with more than i citations >= i). We don't need to keep going because we are trying the biggest i possible, we we stop and return the result.\\n\\n    public class Solution {\\n    public int hIndex(int[] citations) {\\n        int n = citations.length, tot=0;\\n        int[] arr = new int[n+1];\\n        for (int i=0; i<n; i++) {\\n            if (citations[i]>=n) arr[n]++;\\n            else arr[citations[i]]++;\\n        }\\n        for (int i=n; i>=0; i--) {\\n            tot += arr[i];\\n            if (tot>=i) return i;\\n        }\\n        return 0;\\n    }\\n}"
		},
		{
			"lc_ans_id":"70918",
			"view":"7735",
			"top":"4",
			"title":"My easy solution",
			"vote":"45",
			"content":"     public int hIndex(int[] citations) {\\n       Arrays.sort(citations);\\n       int len=citations.length;\\n        for(int i=0;i<len;i++){\\n            if(citations[i]>=len-i) return len-i;\\n            \\n        }\\n        return 0;\\n    }"
		},
		{
			"lc_ans_id":"70808",
			"view":"3059",
			"top":"5",
			"title":"Simple Java solution with sort",
			"vote":"27",
			"content":"    public class Solution {\\n        public int hIndex(int[] citations) {\\n            if (citations == null || citations.length == 0) return 0;\\n            Arrays.sort(citations);\\n            int len = citations.length;\\n            for (int i = 0; i < citations.length; i++) {\\n                if (len <= citations[i])\\n                    return len;\\n                else\\n                    len--;\\n            }\\n            return len;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71008",
			"view":"2155",
			"top":"6",
			"title":"O(n) Java solution using O(n) space",
			"vote":"23",
			"content":"Explanation: The idea is to use another array, index is the citation and value is the number of papers that has at least the citation. Since the h-index can only be n, the new array will only need the index to be at most n, thus the array size will only need n+1. Papers that have more than n citations will store in array[n].\\nGo through the array based on h index definition: array[i]>=i, find the max value of i.\\n\\n\\n    public class Solution {\\n    public int hIndex(int[] citations) {\\n        if(citations == null || citations.length == 0) return 0;\\n        \\n        int n = citations.length;\\n        int[] num = new int[n+1];\\n        \\n        for(int i=0; i<n; i++) {\\n            if(citations[i]>n) num[n]++;\\n            else num[citations[i]]++;\\n        }\\n        \\n        if(num[n]>=n) return n;\\n        for(int i=n-1; i>=0; i--) {\\n            num[i] += num[i+1];\\n            if(num[i]>=i) return i;\\n        }\\n        return 0;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"70894",
			"view":"3635",
			"top":"7",
			"title":"O(n) time C++ solution using hash table",
			"vote":"21",
			"content":"class Solution {\\npublic:\\n\\n    int hIndex(vector<int>& citations) {\\n        if(citations.empty())\\n            return 0;\\n        int n = citations.size();\\n        vector<int> hash(n + 1, 0);\\n        for(int i = 0; i < n; ++i){\\n            if(citations[i] >= n)\\n                hash[n]++;\\n            else\\n                hash[citations[i]]++;\\n        }\\n        int paper = 0;\\n        for(int i = n; i >= 0; --i){\\n            paper += hash[i];\\n            if(paper >= i)\\n                return i;\\n        }\\n    }\\n};"
		},
		{
			"lc_ans_id":"70927",
			"view":"2021",
			"top":"8",
			"title":"Better solution than Hint, no extra space",
			"vote":"14",
			"content":"Have a better solution without extra space. \\nUsing in place divide (not sort) and the time in normal case is n + n/2 + n/4 + ... ~= 2n = O(n). \\nIn worst case is: O(n^2), but just like quicksort, in most cases, it's a better solution.\\nIt beats 100% submits at least in my desktop.\\n\\nHere is the code:\\n\\n    public int hIndex(int[] citations) \\n    {\\n        int length = citations.length;\\n        int start = 0;\\n        int end = length - 1;\\n        int hIndex = 0;\\n        \\n        while (start <= end)\\n        {\\n            int current = divideByPartition(citations, start, end);\\n            if (length - current <= citations[current])\\n            {\\n                hIndex = length - current;\\n                end = current - 1;\\n            }\\n            else\\n                start = current + 1;\\n        }\\n        \\n        return hIndex;\\n    }\\n\\n     // divide the array by the last item and return the new index of this partition item.\\n    private int divideByPartition(int[] a, int start, int end)\\n    {\\n        if (start == end) return end;\\n        \\n        int p = a[end];\\n        int head = start;\\n        for (int current = start; current < end; current++)\\n        {\\n            if (a[current] < p)\\n            {\\n                int temp = a[head];\\n                a[head] = a[current];\\n                a[current] = temp;\\n                head++;\\n            }\\n        }\\n        a[end] = a[head];\\n        a[head] = p;\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"70897",
			"view":"2375",
			"top":"9",
			"title":"Python O(n lgn) time with sort, O(n) time with O(n) space",
			"vote":"13",
			"content":"Sort\\n\\n    def hIndex(self, citations):\\n        citations.sort()\\n        n = len(citations)\\n        for i in xrange(n):\\n            if citations[i] >= (n-i):\\n                return n-i\\n        return 0\\n\\n\\nO(n) space, O(n) time\\n\\n    def hIndex(self, citations):\\n        n = len(citations)\\n        citeCount = [0] * (n+1)\\n        for c in citations:\\n            if c >= n:\\n                citeCount[n] += 1\\n            else:\\n                citeCount[c] += 1\\n        \\n        i = n-1\\n        while i >= 0:\\n            citeCount[i] += citeCount[i+1]\\n            if citeCount[i+1] >= i+1:\\n                return i+1\\n            i -= 1\\n        return 0"
		}
	],
	"id":"274",
	"title":"H-Index",
	"content":"<p>\r\nGiven an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.\r\n</p>\r\n\r\n<p>\r\nAccording to the <a href=\"https://en.wikipedia.org/wiki/H-index\" target=\"_blank\">definition of h-index on Wikipedia</a>: \"A scientist has index <i>h</i> if <i>h</i> of his/her <i>N</i> papers have <b>at least</b> <i>h</i> citations each, and the other <i>N &minus; h</i> papers have <b>no more than</b> <i>h</i> citations each.\"\r\n</p>\r\n\r\n<p>\r\nFor example, given <code>citations = [3, 0, 6, 1, 5]</code>, which means the researcher has <code>5</code> papers in total and each of them had received <code>3, 0, 6, 1, 5</code> citations respectively. Since the researcher has <code>3</code> papers with <b>at least</b> <code>3</code> citations each and the remaining two with <b>no more than</b> <code>3</code> citations each, his h-index is <code>3</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>: If there are several possible values for <code>h</code>, the maximum one is taken as the h-index.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"287",
	"ac_num":"90680"
}