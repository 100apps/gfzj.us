{
	"difficulty":"1",
	"submit_num":"75231",
	"show_id":"243",
	"leetcode_id":"243",
	"answers":[
		{
			"lc_ans_id":"66931",
			"view":"17927",
			"top":"0",
			"title":"AC Java clean solution",
			"vote":"120",
			"content":"    public int shortestDistance(String[] words, String word1, String word2) {\\n        int p1 = -1, p2 = -1, min = Integer.MAX_VALUE;\\n        \\n        for (int i = 0; i < words.length; i++) {\\n            if (words[i].equals(word1)) \\n                p1 = i;\\n\\n            if (words[i].equals(word2)) \\n                p2 = i;\\n                \\n            if (p1 != -1 && p2 != -1)\\n                min = Math.min(min, Math.abs(p1 - p2));\\n        }\\n        \\n        return min;\\n    }"
		},
		{
			"lc_ans_id":"66939",
			"view":"4730",
			"top":"1",
			"title":"Java: only need to keep one index",
			"vote":"45",
			"content":"    public int shortestDistance(String[] words, String word1, String word2) {\\n       int index = -1, minDistance = Integer.MAX_VALUE;\\n       for (int i = 0; i < words.length; i++) {\\n          if (words[i].equals(word1) || words[i].equals(word2)) {\\n             if (index != -1 && !words[index].equals(words[i])) {\\n                minDistance = Math.min(minDistance, i - index);\\n              }\\n              index = i;\\n          }\\n       }\\n       return minDistance;\\n    }"
		},
		{
			"lc_ans_id":"66953",
			"view":"5386",
			"top":"2",
			"title":"Java solution using minimum difference between 2 sorted arrays",
			"vote":"21",
			"content":"   \\n\\nCreating two lists storing indexes of each occurrence of the `word1` and `word2` accordingly. After that finding minimum difference between two elements from these lists.\\n\\n    public class Solution {\\n            public int shortestDistance(String[] words, String word1, String word2) {\\n                List<Integer> w1occ=new ArrayList<Integer>();\\n                List<Integer> w2occ=new ArrayList<Integer>();\\n                \\n                for (int i=0; i<words.length; ++i){\\n                    if (words[i].equals(word1)){\\n                        w1occ.add(i);\\n                    }\\n                    if (words[i].equals(word2)){\\n                        w2occ.add(i);\\n                    }\\n                }\\n                \\n                int min=words.length;\\n                int p1=0;\\n                int p2=0;\\n                while (p1<w1occ.size() && p2<w2occ.size()){\\n                    min=Math.min(Math.abs(w1occ.get(p1)-w2occ.get(p2)), min);\\n                    if (w1occ.get(p1)<w2occ.get(p2)){\\n                        p1++;\\n                    } else \\n                        p2++;\\n                }\\n                return min;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"66973",
			"view":"2674",
			"top":"3",
			"title":"Java Solution with one for loop",
			"vote":"13",
			"content":"    public class Solution {\\n    public int shortestDistance(String[] words, String word1, String word2) {\\n        int ret = Integer.MAX_VALUE, index1 = -1, index2 = -1;\\n        for(int i = 0; i < words.length; i++) {\\n            if(words[i].equals(word1)) {\\n                index1 = i; \\n                if(index2 >= 0) ret = Math.min(ret, i - index2);\\n            } else if(words[i].equals(word2)) {\\n                index2 = i;\\n                if(index1 >= 0) ret = Math.min(ret, i - index1);\\n            }\\n        }\\n        return ret;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"66947",
			"view":"2575",
			"top":"4",
			"title":"Python solution O(n) time, O(1) space",
			"vote":"9",
			"content":"\\n    def shortestDistance(self, words, word1, word2):\\n        size = len(words)\\n        index1, index2 = size, size\\n        ans = size\\n        \\n        for i in xrange(size):\\n            if words[i] == word1:\\n                index1 = i\\n                ans = min(ans, abs(index1-index2))\\n            elif words[i] == word2:\\n                index2 = i\\n                ans = min(ans, abs(index1-index2))\\n        return ans"
		},
		{
			"lc_ans_id":"66972",
			"view":"1439",
			"top":"5",
			"title":"Python 3 lines solution",
			"vote":"6",
			"content":"    class Solution(object):\\n        def shortestDistance(self, words, word1, word2):\\n\\n            w1 = [i for i in xrange(len(words)) if words[i] == word1]\\n            w2 = [i for i in xrange(len(words)) if words[i] == word2]\\n\\n            return min([abs(i - j) for i in w1 for j in w2])\\n\\nJust use list comprehension to make the code shorter."
		},
		{
			"lc_ans_id":"67025",
			"view":"1104",
			"top":"6",
			"title":"Simple C++ solution",
			"vote":"4",
			"content":"    class Solution {\\n    public:\\n        int shortestDistance(vector<string>& words, string word1, string word2) {\\n            int pos1 = -1, pos2 = -1, res = words.size();\\n            for (auto it = words.begin(); it != words.end(); ++it){\\n                if ((*it).compare(word1) == 0) pos1 = it - words.begin();\\n                else if ((*it).compare(word2) == 0) pos2 = it - words.begin();\\n                else continue;\\n                //if neither equals to word1 and 2, loop is continued and last step skipped\\n                if (pos1 >= 0 && pos2 >= 0 && abs(pos1 - pos2) < res) res = abs(pos1 - pos2); \\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"66997",
			"view":"808",
			"top":"7",
			"title":"C++ easy understand solution",
			"vote":"3",
			"content":"    int shortestDistance(vector<string>& words, string word1, string word2) {\\n        int id1 = -1, id2 = -1;\\n        int minDist = INT_MAX;\\n        for (int i = 0; i < words.size(); i++) {\\n            if (words[i] == word1) {\\n                id1 = i;\\n                if (id2 != -1) {\\n                    minDist = min(minDist, id1 - id2);\\n                }\\n            } else if (words[i] == word2) {\\n                id2 = i;\\n                if (id1 != -1) {\\n                    minDist = min(minDist, id2 - id1);\\n                }\\n            }\\n        }\\n        return minDist;\\n    }"
		},
		{
			"lc_ans_id":"66961",
			"view":"228",
			"top":"8",
			"title":"Python 8 Lines Code ( Beating 94% )",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def shortestDistance(self, words, word1, word2):\\n        \"\"\"\\n        :type words: List[str]\\n        :type word1: str\\n        :type word2: str\\n        :rtype: int\\n        \"\"\"\\n        ret = len(words)\\n        index1 = [ x for x in range(len(words)) if words[x] == word1 ]\\n        index2 = [ x for x in range(len(words)) if words[x] == word2 ]\\n        \\n        for i in index1:\\n            for j in index2:\\n                distance = abs(i - j)\\n                if distance < ret: ret = distance\\n        \\n        return ret\\n```"
		},
		{
			"lc_ans_id":"67014",
			"view":"455",
			"top":"9",
			"title":"A Python 7 lines O(N) solution",
			"vote":"2",
			"content":"        def shortestDistance(self, words, word1, word2):\\n            last, min_dist = -1, len(words)\\n            for i in xrange(len(words)):\\n                if words[i] in [word1, word2]:\\n                    if last != -1 and words[last] != words[i]: # if current matched word is different from last matched word\\n                        min_dist = min(min_dist, i-last)\\n                    last = i\\n            return min_dist"
		}
	],
	"id":"243",
	"title":"Shortest Word Distance",
	"content":"<p>Given a list of words and two words <i>word1</i> and <i>word2</i>, return the shortest distance between these two words in the list.</p>\n<p>For example,<br>\nAssume that words = <code>[\"practice\", \"makes\", \"perfect\", \"coding\", \"makes\"]</code>.\n</p>\n<p>\nGiven <i>word1</i> = <code>“coding”</code>, <i>word2</i> = <code>“practice”</code>, return 3.<br>\nGiven <i>word1</i> = <code>\"makes\"</code>, <i>word2</i> = <code>\"coding\"</code>, return 1.\n</p>\n\n<p>\n<b>Note:</b><br>\nYou may assume that <i>word1</i> <b>does not equal to</b> <i>word2</i>, and <i>word1</i> and <i>word2</i> are both in the list.\n</p>",
	"frequency":"267",
	"ac_num":"40184"
}