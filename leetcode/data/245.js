{
	"difficulty":"2",
	"submit_num":"49951",
	"show_id":"245",
	"leetcode_id":"245",
	"answers":[
		{
			"lc_ans_id":"67097",
			"view":"9679",
			"top":"0",
			"title":"12-16 lines Java, C++",
			"vote":"61",
			"content":"**Solution 1 ... Java \"short\"**\\n\\n`i1` and `i2` are the indexes where word1 and word2 were last seen. Except if they're the same word, then `i1` is the previous index.\\n\\n    public int shortestWordDistance(String[] words, String word1, String word2) {\\n        long dist = Integer.MAX_VALUE, i1 = dist, i2 = -dist;\\n        for (int i=0; i<words.length; i++) {\\n            if (words[i].equals(word1))\\n                i1 = i;\\n            if (words[i].equals(word2)) {\\n                if (word1.equals(word2))\\n                    i1 = i2;\\n                i2 = i;\\n            }\\n            dist = Math.min(dist, Math.abs(i1 - i2));\\n        }\\n        return (int) dist;\\n    }\\n\\n---\\n\\n**Solution 2 ... Java \"fast\"**\\n\\nSame as solution 1, but minimizing the number of string comparisons.\\n\\n    public int shortestWordDistance(String[] words, String word1, String word2) {\\n        long dist = Integer.MAX_VALUE, i1 = dist, i2 = -dist;\\n        boolean same = word1.equals(word2);\\n        for (int i=0; i<words.length; i++) {\\n            if (words[i].equals(word1)) {\\n                if (same) {\\n                    i1 = i2;\\n                    i2 = i;\\n                } else {\\n                    i1 = i;\\n                }\\n            } else if (words[i].equals(word2)) {\\n                i2 = i;\\n            }\\n            dist = Math.min(dist, Math.abs(i1 - i2));\\n        }\\n        return (int) dist;\\n    }\\n\\n---\\n\\n**Solution 3 ... C++ \"short\"**\\n\\nC++ version of solution 1.\\n\\n    int shortestWordDistance(vector<string>& words, string word1, string word2) {\\n        long long dist = INT_MAX, i1 = dist, i2 = -dist;\\n        for (int i=0; i<words.size(); i++) {\\n            if (words[i] == word1)\\n                i1 = i;\\n            if (words[i] == word2) {\\n                if (word1 == word2)\\n                    i1 = i2;\\n                i2 = i;\\n            }\\n            dist = min(dist, abs(i1 - i2));\\n        }\\n        return dist;\\n    }\\n\\n---\\n\\n**Solution 4 ... C++ \"fast\"**\\n\\nC++ version of solution 2.\\n\\n    int shortestWordDistance(vector<string>& words, string word1, string word2) {\\n        long long dist = INT_MAX, i1 = dist, i2 = -dist;\\n        bool same = word1 == word2;\\n        for (int i=0; i<words.size(); i++) {\\n            if (words[i] == word1) {\\n                i1 = i;\\n                if (same)\\n                    swap(i1, i2);\\n            } else if (words[i] == word2) {\\n                i2 = i;\\n            }\\n            dist = min(dist, abs(i1 - i2));\\n        }\\n        return dist;\\n    }"
		},
		{
			"lc_ans_id":"67095",
			"view":"4813",
			"top":"1",
			"title":"Short Java solution 10 lines O(n), modified from Shortest Word Distance I",
			"vote":"41",
			"content":" \\n **Shortest Word Distance I**:\\n\\n    public class Solution {\\n        public int shortestWordDistance(String[] words, String word1, String word2) {\\n            int index = -1;\\n            int min = words.length;\\n            for (int i = 0; i < words.length; i++) {\\n                if (words[i].equals(word1) || words[i].equals(word2)) {\\n                    if (index != -1 && !words[index].equals(words[i])) {\\n                        min = Math.min(i - index, min);\\n                    }\\n                    index = i;\\n                }\\n            }\\n            return min;\\n        }\\n    }\\n\\n**Shortest Word Distance III**:\\n  \\n\\n    public class Solution {\\n            public int shortestWordDistance(String[] words, String word1, String word2) {\\n                int index = -1;\\n                int min = words.length;\\n                for (int i = 0; i < words.length; i++) {\\n                    if (words[i].equals(word1) || words[i].equals(word2)) {\\n                        if (index != -1 && (word1.equals(word2) || !words[index].equals(words[i]))) {\\n                            min = Math.min(i - index, min);\\n                        }\\n                        index = i;\\n                    }\\n                }\\n                return min;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"67100",
			"view":"3465",
			"top":"2",
			"title":"My Concise JAVA Solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public int shortestWordDistance(String[] words, String word1, String word2) {\\n            int p1 = -1;\\n            int p2 = -1;\\n            int min = Integer.MAX_VALUE;\\n            for (int i = 0; i < words.length; i++) {\\n                if (words[i].equals(word1)) {\\n                    if (word1.equals(word2)) {\\n                        if (p1 != -1 && i - p1 < min) {\\n                            min = i - p1;\\n                        }\\n                        p1 = i;\\n                    } else {\\n                        p1 = i;\\n                        if (p2 != -1 && p1 - p2 < min) {\\n                            min = p1 - p2;\\n                        }\\n                    } \\n                } else if (words[i].equals(word2)) {\\n                    p2 = i;\\n                    if (p1 != -1 && p2 - p1 < min) {\\n                        min = p2 - p1;\\n                    }\\n                }\\n            }\\n            return min;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67150",
			"view":"1408",
			"top":"3",
			"title":"Do we prefer cleaner code or faster solution if we cannot achieve both with one solution? (280ms java solution)",
			"vote":"7",
			"content":"In [this post][1], Stefan's solutions are very concise. However, I found that the following solution only runs 280ms on OJ, which beats all other java solutions so far. It is fast because it only checks word1.equals(word2) once at the beginning. I wonder in real practice, do we prefer cleaner code or faster solution if we cannot achieve both with one solution? I hope people who have more industrial experience could give some adivce. \\n\\n     public int shortestWordDistance(String[] words, String word1, String word2) {\\n        int p1=-1; int p2=-1; int min = Integer.MAX_VALUE;\\n        \\n        if(word1.equals(word2)){\\n             for(int i=0;i<words.length;i++){\\n                if(word1.equals(words[i])){\\n                     if(p1==-1){  p1=i; }\\n                     else{  min=Math.min(min, i-p1); p1=i; }\\n                }\\n          }\\n        }else{\\n            for(int i=0;i<words.length;i++){\\n                if(word1.equals(words[i])){ p1=i; }\\n                if(word2.equals(words[i])){ p2=i; }\\n                if(p1!=-1 && p2!=-1){\\n                    min=Math.min(min, Math.abs(p1-p2));\\n                }\\n            }\\n        }\\n        return min;\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/50715/12-16-lines-java-c"
		},
		{
			"lc_ans_id":"67144",
			"view":"869",
			"top":"4",
			"title":"3ms Java clear Solution revised from Shortest Word Distance I with explanation",
			"vote":"5",
			"content":"    public int shortestWordDistance(String[] words, String word1, String word2) {\\n        if (words == null || words.length == 0) return 0;\\n        int i1 = -words.length;  //here is to guarantee mindistance will be greater than the word.length\\n        int i2 = words.length;\\n        int min = Integer.MAX_VALUE;\\n        for (int i = 0; i < words.length; i++) {\\n            if (!word1.equals(word2)) {\\n                if (words[i].equals(word1)) i1 = i;\\n                if (words[i].equals(word2)) i2 = i;\\n                min = Math.min(min, Math.abs(i1 - i2)); //so we don't have to check if (i1 != -1 && i2 != -1 in other solutions)\\n            } else {\\n                if (words[i].equals(word1)) {  //this the question on how to find the shortest distance of indices of the word\\n                    min = Math.min(min, Math.abs(i - i1));  //you can change to i - i1, it is also correct\\n                    i1 = i;  // update the i1 with current i for incoming distance checking\\n                }\\n            }\\n        }\\n        return min;\\n    }\\nApproach:  two case: \\n\\n1: word1 != word2 , it is simple, some are using i1 = -1, i2 = -1 to check, here I used the distance. Because when checking the min distance, I dont want fake min distance in my result, so I try to expand the initial distance of i1 and i2 be greater than words.length, (but we also cannot use i1 = -1 and i2 = words.length, because the target word might give i2 = 0, then mindistance is 1, which is also fake) \\n\\n2: word1 == word2, the question becomes how to find the min distance of the indices of a single word. Such as \"make\" has indices of 0, 3, 5,xxxxx...how to find the min distance. Just use use current i minus last index and keep the global min value. \\n\\nIf you like this solution, please thumb up : )"
		},
		{
			"lc_ans_id":"67171",
			"view":"563",
			"top":"5",
			"title":"AC Python solution clean and fast in one loop",
			"vote":"4",
			"content":"    def shortestWordDistance(self, words, word1, word2):\\n        n = len(words)\\n        ans = n\\n        p1 = p2 = -n\\n        same = word1 == word2\\n        for i in xrange(n):\\n            if words[i] == word1:\\n                p1 = i\\n                ans = min(ans, i - p2)\\n                if same:\\n                    p2 = p1\\n            elif not same and words[i] == word2:\\n                p2 = i\\n                ans = min(ans, i - p1)\\n        return ans\\n\\n\\nOnly check if word1 and word2 is same once and save it in a boolean and use it wisely. This way we don't lose the speed and the code remain clean."
		},
		{
			"lc_ans_id":"67167",
			"view":"670",
			"top":"6",
			"title":"Easy and clean JAVA solution",
			"vote":"3",
			"content":"    public int shortestWordDistance(String[] words, String word1, String word2) {\\n        if (words.length < 2) {\\n            return 0;\\n        }\\n        int index1 = -1;\\n        int index2 = -1;\\n        int min = Integer.MAX_VALUE;\\n        \\n        for (int i = 0; i < words.length; i++) {\\n            if (words[i].equals(word1)) {\\n                index1 = i;\\n            }\\n            if (index1 != -1 && index2 != -1 && index1 != index2) {\\n                min = Math.min(min, Math.abs(index1 - index2));\\n            }\\n            if (words[i].equals(word2)) {\\n                index2 = i;\\n            }\\n            if (index1 != -1 && index2 != -1 && index1 != index2) {\\n                min = Math.min(min, Math.abs(index1 - index2));\\n            }\\n        }\\n        \\n        return min;\\n    }"
		},
		{
			"lc_ans_id":"67164",
			"view":"426",
			"top":"7",
			"title":"C++ O(n) solution.",
			"vote":"2",
			"content":"       \\n    int shortestWordDistance(vector<string>& words, string word1, string word2) {\\n        int res = words.size(), l = words.size(), r = -words.size();\\n        for (unsigned int i=0; i<words.size(); i++) {\\n            if (words[i] == word1)\\n                l = (word1==word2)?r:i;\\n            if (words[i] == word2) \\n                r = i;\\n            res = min(res, abs(l-r));\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"67103",
			"view":"86",
			"top":"8",
			"title":"Add (3) lines to solution 243, w/ Explanations",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int shortestWordDistance(String[] words, String word1, String word2) {\\n        int ans = Integer.MAX_VALUE;\\n        int p = -1; //POS for word1\\n        int q = -1; //POS for word2\\n        \\n        for(int i = 0; i < words.length; i++){\\n            if(words[i].equals(word1) && words[i].equals(word2)){\\n                p = q;\\n                q = i; \\n                //slide two pointer, q is always the front pos when word1 == word2\\n            }\\n            else{\\n                if(words[i].equals(word1)){\\n                    p = i;\\n                }\\n                if(words[i].equals(word2)){\\n                    q = i;\\n                }\\n            }\\n            if(p!=-1 && q!=-1){\\n                ans = Math.min(ans,Math.abs(p-q));\\n            }\\n        }\\n        \\n        //Proof: word1 and word2 are both in the list. \\n        //Whenever update p/q, the existing q/p is the nearest one to the left.\\n        \\n        return ans;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"67113",
			"view":"149",
			"top":"9",
			"title":"Python short solution(keep track of last encountered)",
			"vote":"1",
			"content":"```Python\\n        prev = None\\n        result = float('inf')\\n        for idx in xrange(len(words)):\\n            if words[idx] == word1 or words[idx] == word2:\\n                if prev is not None and (word1 == word2 or words[idx] != words[prev]):\\n                    if idx - prev < result: result = idx - prev\\n                prev = idx\\n        return result\\n```"
		}
	],
	"id":"245",
	"title":"Shortest Word Distance III",
	"content":"<p>This is a <b>follow up</b> of <a href=\"/problems/shortest-word-distance\">Shortest Word Distance</a>. The only difference is now <i>word1</i> could be the same as <i>word2</i>.</p>\n\n<p>Given a list of words and two words <i>word1</i> and <i>word2</i>, return the shortest distance between these two words in the list.</p>\n\n<p><i>word1</i> and <i>word2</i> may be the same and they represent two individual words in the list.</p>\n<p>For example,<br>\nAssume that words = <code>[\"practice\", \"makes\", \"perfect\", \"coding\", \"makes\"]</code>.\n</p>\n<p>\nGiven <i>word1</i> = <code>“makes”</code>, <i>word2</i> = <code>“coding”</code>, return 1.<br>\nGiven <i>word1</i> = <code>\"makes\"</code>, <i>word2</i> = <code>\"makes\"</code>, return 3.\n</p>\n\n<p>\n<b>Note:</b><br>\nYou may assume <i>word1</i> and <i>word2</i> are both in the list.\n</p>",
	"frequency":"88",
	"ac_num":"25549"
}