{
	"difficulty":"1",
	"submit_num":"64680",
	"show_id":"575",
	"leetcode_id":"575",
	"answers":[
		{
			"lc_ans_id":"102879",
			"view":"10474",
			"top":"0",
			"title":"Java Solution, 3 lines, HashSet",
			"vote":"27",
			"content":"Thanks @wmcalyj , modified to use HashSet.\\n```\\npublic class Solution {\\n    public int distributeCandies(int[] candies) {\\n        Set<Integer> kinds = new HashSet<>();\\n        for (int candy : candies) kinds.add(candy);\\n        return kinds.size() >= candies.length / 2 ? candies.length / 2 : kinds.size();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102868",
			"view":"4779",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"25",
			"content":"There are ```len(set(candies))``` unique candies, and the sister picks only ```len(candies) / 2``` of them, so she can't have more than this amount.\\n\\nFor example, if there are 5 unique candies, then if she is picking 4 candies, she will take 4 unique ones.  If she is picking 7 candies, then she will only take 5 unique ones.\\n\\n```\\ndef distributeCandies(self, candies):\\n    return min(len(candies) / 2, len(set(candies)))\\n```"
		},
		{
			"lc_ans_id":"102870",
			"view":"2369",
			"top":"2",
			"title":"C++, bitset, beats 99.60%",
			"vote":"14",
			"content":"The idea is to use biset as hash table instead of unordered_set.\\n```\\nint distributeCandies(vector<int>& candies) {\\n        bitset<200001> hash;\\n        int count = 0;\\n        for (int i : candies) {\\n            if (!hash.test(i+100000)) {\\n               count++;\\n               hash.set(i+100000);\\n            }\\n        }\\n        int n = candies.size();\\n        return min(count, n/2);\\n    }\\n```"
		},
		{
			"lc_ans_id":"102924",
			"view":"3666",
			"top":"3",
			"title":"[C++] Clean Code - 2 Solutions: Set and Sort",
			"vote":"8",
			"content":"**Set - O(N) time, O(N) space**\\nWe can use a set to count all unique kinds of candies, but even all candies are unique, the sister cannot get more than half.\\n(Even though in reality my GF would always get more than half.)\\n```\\nclass Solution {\\npublic:\\n    int distributeCandies(vector<int>& candies) {\\n        unordered_set<int> kinds;\\n        for (int kind : candies) {\\n            kinds.insert(kind);\\n        }\\n        return min(kinds.size(), candies.size() / 2);\\n    }\\n};\\n```\\nUsing range constructor as @i_square suggested:\\n```\\nclass Solution {\\npublic:\\n    int distributeCandies(vector<int>& candies) {\\n        return min(unordered_set<int>(candies.begin(), candies.end()).size(), candies.size() / 2);\\n    }\\n};\\n```\\n**Sort - O(N logN) time, O(1) space**\\nOr we can sort the candies by kinds, count kind if different than the prevous:\\n```\\nclass Solution {\\npublic:\\n    int distributeCandies(vector<int>& candies) {\\n        size_t kinds = 0;\\n        sort(candies.begin(), candies.end());\\n        for (int i = 0; i < candies.size(); i++) {\\n            kinds += i == 0 || candies[i] != candies[i - 1];\\n        }\\n        return min(kinds, candies.size() / 2);\\n    }\\n};\\n```\\nThe counter can start from 1 since there is no test case for empty input:\\n```\\nclass Solution {\\npublic:\\n    int distributeCandies(vector<int>& candies) {\\n        size_t kinds = 1;\\n        sort(candies.begin(), candies.end());\\n        for (int i = 0; i < candies.size(); i++) {\\n            kinds += candies[i] != candies[i - 1];\\n        }\\n        return min(kinds, candies.size() / 2);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102866",
			"view":"671",
			"top":"4",
			"title":"1-line JavaScript O(n) solution using Set",
			"vote":"6",
			"content":"```\\nvar distributeCandies = function(candies) {\\n    return Math.min(new Set(candies).size, candies.length / 2);\\n};\\n```"
		},
		{
			"lc_ans_id":"102888",
			"view":"310",
			"top":"5",
			"title":"Java solution beats 99.07%",
			"vote":"3",
			"content":"Based on Bucket Sort:\\n<pre><code>\\n    public int distributeCandies(int[] candies) {\\n        int[] b = new int[200001];\\n        int nonEmptyBucketNo = 0;\\n        for (int i : candies) if (b[i + 100000]++ == 0) nonEmptyBucketNo++;\\n        return nonEmptyBucketNo <= candies.length / 2 ? nonEmptyBucketNo : candies.length / 2;\\n    }\\n</code></pre>"
		},
		{
			"lc_ans_id":"102939",
			"view":"1992",
			"top":"6",
			"title":"Java 8 one line solution O(n)",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public int distributeCandies(int[] candies) {\\n        return Math.min(candies.length / 2, IntStream.of(candies).boxed().collect(Collectors.toSet()).size());\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"102951",
			"view":"715",
			"top":"7",
			"title":"Python 1-line",
			"vote":"3",
			"content":"class Solution(object):\\n\\n    def distributeCandies(self, candies):\\n    \\treturn min(len(candies) / 2,len(set(candies)))"
		},
		{
			"lc_ans_id":"102942",
			"view":"1139",
			"top":"8",
			"title":"Java hashset solution",
			"vote":"2",
			"content":"    public int distributeCandies(int[] candies) {\\n        Set<Integer> set = new HashSet<>();\\n        for(Integer candie : candies) {\\n            set.add(candie);\\n            if(set.size() == candies.length/2) return set.size();\\n        }\\n        return Math.min(set.size(), candies.length/2);\\n    }"
		},
		{
			"lc_ans_id":"102858",
			"view":"66",
			"top":"9",
			"title":"1-liner Java and Python",
			"vote":"1",
			"content":"Given `n` (even) candies, the sister can at most get `n / 2` of them (distributed evenly). And if there are `k` kinds, `k` is also the upper bound of the number of kinds the sister can get.\\n\\n`n / 2` is simply `candies.length / 2`. To compute `k`, a traditional way is to use a hash map to count occurrences. And a shorter way is to use Java 8 streams.\\n\\n**1-liner Java 8 stream**\\n```\\nclass Solution {\\n    public int distributeCandies(int[] candies) {\\n        return Integer.min((int) Stream.of(candies).distinct().count(), candies.length / 2);\\n    }\\n}\\n```\\n\\n**Traditional HashMap**\\n```\\nclass Solution {\\n    public int distributeCandies(int[] candies) {\\n        final Map<Integer, Integer> kinds = new HashMap<>();\\n        for (final int candy : candies) {\\n            if (kinds.containsKey(candy)) {\\n                kinds.put(candy, kinds.get(candy) + 1);\\n            } else {\\n                kinds.put(candy, 1);\\n            }\\n        }\\n        return Integer.min(kinds.size(), candies.length / 2);\\n    }\\n}\\n```\\n\\n**Python 1-liner**\\nComputing `k` is just the use case of `Counter`.\\n```\\nfrom collections import Counter\\n\\nclass Solution(object):\\n    def distributeCandies(self, candies):\\n        \"\"\"\\n        :type candies: List[int]\\n        :rtype: int\\n        \"\"\"\\n        return min(len(Counter(candies)), len(candies) / 2)      \\n```\\nWith Java 8 streams, 1-liner becomes more likely for Java :-)"
		}
	],
	"id":"556",
	"title":"Distribute Candies",
	"content":"Given an integer array with <b>even</b> length, where different numbers in this array represent different <b>kinds</b> of candies. Each number means one candy of the corresponding kind. You need to distribute these candies <b>equally</b> in number to brother and sister. Return the maximum number of <b>kinds</b> of candies the sister could gain. \r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> candies = [1,1,2,2,3,3]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b>\r\nThere are three different kinds of candies (1, 2 and 3), and two candies for each kind.\r\nOptimal distribution: The sister has candies [1,2,3] and the brother has candies [1,2,3], too. \r\nThe sister has three different kinds of candies. \r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> candies = [1,1,2,3]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> For example, the sister has candies [2,3] and the brother has candies [1,1]. \r\nThe sister has two different kinds of candies, the brother has only one kind of candies. \r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The length of the given array is in range [2, 10,000], and will be even.</li>\r\n<li>The number in given array is in range [-100,000, 100,000].</li>\r\n<ol>\r\n</p>",
	"frequency":"321",
	"ac_num":"37714"
}