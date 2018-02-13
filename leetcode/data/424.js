{
	"difficulty":"2",
	"submit_num":"39187",
	"show_id":"424",
	"leetcode_id":"424",
	"answers":[
		{
			"lc_ans_id":"91271",
			"view":"17112",
			"top":"0",
			"title":"Java 12 lines O(n) sliding window solution with explanation",
			"vote":"84",
			"content":"```\\n    public int characterReplacement(String s, int k) {\\n        int len = s.length();\\n        int[] count = new int[26];\\n        int start = 0, maxCount = 0, maxLength = 0;\\n        for (int end = 0; end < len; end++) {\\n            maxCount = Math.max(maxCount, ++count[s.charAt(end) - 'A']);\\n            while (end - start + 1 - maxCount > k) {\\n                count[s.charAt(start) - 'A']--;\\n                start++;\\n            }\\n            maxLength = Math.max(maxLength, end - start + 1);\\n        }\\n        return maxLength;\\n    }\\n```\\n\\nThere's no edge case for this question. The initial step is to extend the window to its limit, that is, the longest we can get to with maximum number of modifications. Until then the variable **start** will remain at 0.\\n\\nThen as **end** increase, the whole substring from 0 to **end** will violate the rule, so we need to update **start** accordingly (slide the window). We move **start** to the right until the whole string satisfy the constraint again. Then each time we reach such situation, we update our max length."
		},
		{
			"lc_ans_id":"91285",
			"view":"9559",
			"top":"1",
			"title":"Sliding window, similar to finding longest substring with k distinct characters",
			"vote":"48",
			"content":"The problem says that we can make at most k changes to the string (any character can be replaced with any other character). So, let's say there were no constraints like the k. Given a string convert it to a string with all same characters with minimal changes. The answer to this is \\n>length of the entire string - number of times of the maximum occurring character in the string\\n\\nGiven this, we can apply the at most k changes constraint and maintain a sliding window such that\\n> (length of substring - number of times of the maximum occurring character in the substring) <= k\\n\\n```\\nclass Solution {\\npublic:\\n    int characterReplacement(string s, int k) {\\n        vector<int> counts(26, 0);\\n        int start = 0;\\n        int maxCharCount = 0;\\n        int n = s.length();\\n        int result = 0;\\n        for(int end = 0; end < n; end++){\\n            counts[s[end]-'A']++;\\n            if(maxCharCount < counts[s[end]-'A']){\\n                maxCharCount = counts[s[end]-'A'];\\n            }\\n            while(end-start-maxCharCount+1 > k){\\n                counts[s[start]-'A']--;\\n                start++;\\n                for(int i = 0; i < 26; i++){\\n                    if(maxCharCount < counts[i]){\\n                        maxCharCount = counts[i];\\n                    }\\n                }\\n            }\\n            result = max(result, end-start+1);\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91278",
			"view":"4645",
			"top":"2",
			"title":"7 lines C++",
			"vote":"17",
			"content":"Based on the Python [solution](https://discuss.leetcode.com/topic/63448/consise-python-sliding-window) by @dalwise. Use a sliding window `s[i:j]`, always add the new character, and remove the first window character if the extension isn't ok. So in each step, either extend the window by one or move it by one.\\n\\n    int characterReplacement(string s, int k) {\\n        int i = 0, j = 0, ctr[91] = {};\\n        while (j < s.size()) {\\n            ctr[s[j++]]++;\\n            if (j-i - *max_element(ctr+65, ctr+91) > k)\\n                ctr[s[i++]]--;\\n        }\\n        return j - i;\\n    }"
		},
		{
			"lc_ans_id":"91286",
			"view":"3188",
			"top":"3",
			"title":"Java Sliding Window Easy to Understand",
			"vote":"8",
			"content":"The problem is similar to longest substring with most K distinct characte. But this time, the constraint is we can only have most K characters that is different with the most frequent character in the substring. For example in the sliding window:\\n```\\n\"ABBBAC\" most frequent character is B with count 3, all other character is count as different to B, \\n    which is A and C, and the result is 2 + 1 = 3. \\n````\\nEach time we count the different characters. If it is not bigger than k we extend the sliding window. \\nSince we only have 26 characters, keep the count in a integer array is good enough.\\nComplete code:\\n```\\npublic class Solution {\\n    public int characterReplacement(String s, int k) {\\n        if(s == null || s.length() == 0){\\n            return 0;\\n        }\\n        int max = 0;\\n        int[] ch = new int[26];\\n        char[] str = s.toCharArray();\\n        for(int i=0, j=0; i<s.length(); i++){\\n            while(j < s.length()){\\n                ch[str[j] - 'A']++;\\n                if(count(ch) > k){  //If exceed k, break\\n                    ch[str[j] - 'A']--;\\n                    break;\\n                }\\n                j++;\\n            }\\n            max = Math.max(max, j-i);\\n            ch[str[i] - 'A']--;\\n        }\\n        return max;\\n    }\\n    //Count the number of character that is different to the longest character\\n    public int count(int[] ch){\\n        int max = 0;\\n        int sum = 0;\\n        for(int val:ch){\\n            sum += val;\\n            max = Math.max(max, val);\\n        }\\n        return sum - max;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"91272",
			"view":"2901",
			"top":"4",
			"title":"Consise Python sliding window",
			"vote":"7",
			"content":"Re: [Sliding window](similar to finding longest substring with k distinct characters)\\n\\nSimilar idea in Python but allowing any character, not just uppercase English letters [Updated based on comments below]:\\n```\\ndef characterReplacement(self, s, k):\\n    res = lo = hi = 0\\n    counts = collections.Counter()\\n    for hi in range(1, len(s)+1):\\n        counts[s[hi-1]] += 1\\n        max_char_n = counts.most_common(1)[0][1]\\n        if hi - lo - max_char_n > k:\\n            counts[s[lo]] -= 1\\n            lo += 1\\n    return hi - lo\\n```\\n\\n[Original code in order to understand comment from @StefanPochmann was:]\\n```   \\ndef characterReplacement(self, s, k):\\n    res = lo = 0\\n    counts = collections.Counter()\\n    for hi in range(len(s)):\\n        counts[s[hi]] += 1\\n        max_char_n = counts.most_common(1)[0][1]\\n        while (hi - lo - max_char_n + 1 > k):\\n            counts[s[lo]] -= 1\\n            lo += 1\\n        res = max(res, hi - lo + 1)\\n    return res\\n```"
		},
		{
			"lc_ans_id":"91311",
			"view":"836",
			"top":"5",
			"title":"Sliding Window - Java - Easy Explanation - 15 lines",
			"vote":"5",
			"content":"```\\n/*\\n    The whole idea is that if we have a string of length N out of which M characters are same,\\n    we can replace (N - M) characters to get a continueous string of N characters. \\n    If M <= K. N is the local maximum for this window.\\n    If this length is greater than K. Slide the window.\\n    */\\n    public int characterReplacement(String s, int k) {\\n        int[] charCount = new int[26];\\n        \\n        int left, right, maxCount, maxLen;\\n        left = right = maxCount = maxLen = 0;\\n    \\n        while(right < s.length()){\\n            charCount[s.charAt(right) - 'A']++;\\n            maxCount = Math.max(maxCount, charCount[s.charAt(right) - 'A']);\\n            if(right - left + 1 - maxCount > k) charCount[s.charAt(left++) - 'A']--;\\n            maxLen = Math.max(right++ - left + 1, maxLen);\\n        }\\n        return maxLen;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91323",
			"view":"653",
			"top":"6",
			"title":"Java O(n) solution using sliding window",
			"vote":"5",
			"content":"The idea is to find maximum valid substring with repeated character 'A' to 'Z' respectively. For each case, use sliding window to determine its maximum length, update the global maximum length if needed. \\n\\n```\\npublic class Solution {\\n    public int characterReplacement(String s, int k) {\\n        int maxLen = 0;\\n        for(int l = 0 ; l<26;l++){\\n            char c = (char)('A' + l); //repeated char we are looking for\\n            int i = 0, j = 0, count = 0;\\n            while(j<s.length()){\\n                char cur = s.charAt(j);\\n                if(cur != c) count++;\\n                \\n                //make the substring valid again\\n                while(count > k){\\n                    if(s.charAt(i) != c) count--;\\n                    i++;\\n                }\\n                \\n                //update maximun len\\n                maxLen = Math.max(maxLen,j-i+1);\\n                j++;\\n            }\\n        }\\n        return maxLen;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91283",
			"view":"214",
			"top":"7",
			"title":"The description of this question is confusing...",
			"vote":"4",
			"content":"Given a string that consists of only uppercase English letters, **you can replace any letter in the string with another letter at most k times.** Find the length of a longest substring containing all repeating letters you can get after performing the above operations.\\n\\nThe bold line above is confusing.\\n\\nInterpretation 1: Does it means to allow us replace every single letter for at most K times? \\nHumm well it's not, if it is then I think just by mentioning 1 times is enough and there's no need to emphasis K times.\\n\\ninterpretation 2: Does it means to allow us replace every unique letter for at most K times?\\nThis interpretation works for both example 1 and 2.\\nInput:\\ns = \"ABAB\", k = 2\\nOutput:\\n4\\nWe change letter A in this string for 2 times/We can change letter B in this string for 2 times\\n\\nBut when I was thinking how about the input is:\\ns = \"ACBABBE\", k = 1\\nThen I was thinking we can change letter C to B for once and change A to B for once and finally E to B for once to get \"ABBBBBB\", the output is 6. \\n\\nHowever I was wrong again...\\n\\nAnd after seeing other posts here, I finally realized that this question actually wants you **to replace at most k letters in this string** , that's it:)\\n\\nI strongly advice to avoid ambiguous definition/interpretation using broken english in question description."
		},
		{
			"lc_ans_id":"91314",
			"view":"475",
			"top":"8",
			"title":"Binary search. Slower but still interesting.",
			"vote":"3",
			"content":"Unlike most brilliant existing linear solutions, I solve this problem by a slower approach using binary search.\\n\\nWhy binary search? If we can convert a substring of length `x` into a valid one (a string with all unique letters) using no more than `k` replacements, then it is clear that we can also convert a substring of length no more than `x` into a valid one. Thus, if we know how to answer the following **decision** problem efficiently, we can use binary search to guess the final answer.\\n\\n**The decision problem:**\\nIs there a substring of length `x` such that we can make it consist of some unique letter with no more than `k` replacements?\\n\\nThe solution to this question is simple. We enumerate all substring of length `x`. For each substring, we denote the frequency of the most frequent letters in it as `mode`. Then, if `x - mode <= k`, the answer is **yes**. If `x - mode > k` holds for all substrings of length `x`, the answer is **no**. This process can be done via a sliding-window in `O(26 * n) = O(n)` time.\\n\\nTherefore, the total runtime is `O(n log n)`.\\n\\n```Java\\nprivate boolean ok(char[] ch, int k, int len) {\\n\\tint[] cnt = new int[26];\\n\\tfor (int i = 0; i < ch.length; i++) {\\n\\t\\tif (i >= len) cnt[ch[i - len] - 'A']--;\\n\\t\\tcnt[ch[i] - 'A']++;\\n\\t\\tif (i >= len - 1) {\\n\\t\\t\\tint max = 0;\\n\\t\\t\\tfor (int j : cnt) max = Math.max(max, j);\\n\\t\\t\\tif (len - max <= k) return true;\\n\\t\\t}\\n\\t}\\n\\treturn false;\\n}\\n\\npublic int characterReplacement(String s, int k) {\\n\\tif (s.length() == 0 || k >= s.length() - 1) return s.length();\\n\\tint left = 1, right = s.length() + 1;\\n\\tchar[] ch = s.toCharArray();\\n\\twhile (left + 1 < right) {\\n\\t\\tint mid = (left + right) / 2;\\n\\t\\tif (ok(ch, k, mid)) left = mid;\\n\\t\\telse right = mid;\\n\\t}\\n\\treturn left;\\n}\\n```"
		},
		{
			"lc_ans_id":"91301",
			"view":"222",
			"top":"9",
			"title":"Awesome python solution",
			"vote":"2",
			"content":"\\nuse dict instead of counter:\\n```\\n    def characterReplacement(self, s, k):\\n        count = {}\\n        max_count = start = result = 0\\n        for end in range(len(s)):\\n            count[s[end]] = count.get(s[end], 0) + 1\\n            max_count = max(max_count, count[s[end]])\\n            if end - start + 1 - max_count > k:\\n                count[s[start]] -= 1\\n                start += 1\\n            result = max(result, end - start + 1)\\n        return result\\n```\\nuse counter:\\n```\\n    def characterReplacement(self, s, k):\\n        count = collections.Counter()\\n        start = result = 0\\n        for end in range(len(s)):\\n            count[s[end]] += 1\\n            max_count = count.most_common(1)[0][1]\\n            if end - start + 1 - max_count > k:\\n                count[s[start]] -= 1\\n                start += 1\\n            result = max(result, end - start + 1)\\n        return result\\n```"
		}
	],
	"id":"424",
	"title":"Longest Repeating Character Replacement",
	"content":"<p>Given a string that consists of only uppercase English letters, you can replace any letter in the string with another letter at most <i>k</i> times. Find the length of a longest substring containing all repeating letters you can get after performing the above operations.</p>\r\n\r\n<p><b>Note:</b><br />\r\nBoth the string's length and <i>k</i> will not exceed 10<sup>4</sup>.\r\n</p>\r\n\r\n<p>\r\n<b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\ns = \"ABAB\", k = 2\r\n\r\n<b>Output:</b>\r\n4\r\n\r\n<b>Explanation:</b>\r\nReplace the two 'A's with two 'B's or vice versa.\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\ns = \"AABABBA\", k = 1\r\n\r\n<b>Output:</b>\r\n4\r\n\r\n<b>Explanation:</b>\r\nReplace the one 'A' in the middle with 'B' and form \"AABBBBA\".\r\nThe substring \"BBBB\" has the longest repeating letters, which is 4.\r\n</pre>\r\n</p>",
	"frequency":"177",
	"ac_num":"16795"
}