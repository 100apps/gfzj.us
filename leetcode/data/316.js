{
	"difficulty":"3",
	"submit_num":"122602",
	"show_id":"316",
	"leetcode_id":"316",
	"answers":[
		{
			"lc_ans_id":"76768",
			"view":"36312",
			"top":"0",
			"title":"A short O(n) recursive greedy solution",
			"vote":"202",
			"content":"Given the string s, the greedy choice (i.e., the leftmost letter in the answer) is the smallest s[i], s.t.\\nthe suffix s[i .. ] contains all the unique letters. (Note that, when there are more than one smallest s[i]'s, we choose the leftmost one. Why? Simply consider the example: \"abcacb\".)\\n\\nAfter determining the greedy choice s[i], we get a new string s' from s by \\n\\n 1. removing all letters to the left of s[i],\\n 2. removing all s[i]'s from s.\\n\\nWe then recursively solve the problem w.r.t. s'. \\n\\nThe runtime is O(26 * n) = O(n).\\n\\n    public class Solution {\\n        public String removeDuplicateLetters(String s) {\\n            int[] cnt = new int[26];\\n            int pos = 0; // the position for the smallest s[i]\\n            for (int i = 0; i < s.length(); i++) cnt[s.charAt(i) - 'a']++;\\n            for (int i = 0; i < s.length(); i++) {\\n                if (s.charAt(i) < s.charAt(pos)) pos = i;\\n                if (--cnt[s.charAt(i) - 'a'] == 0) break;\\n            }\\n            return s.length() == 0 ? \"\" : s.charAt(pos) + removeDuplicateLetters(s.substring(pos + 1).replaceAll(\"\" + s.charAt(pos), \"\"));\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76766",
			"view":"20959",
			"top":"1",
			"title":"Easy to understand iterative Java solution",
			"vote":"117",
			"content":"The basic idea is to find out the smallest result letter by letter (one letter at a time). Here is the thinking process for input \"cbacdcbc\":\\n\\n1. find out the last appeared position for each letter;\\n    c - 7\\n    b - 6\\n    a - 2\\n    d - 4\\n2. find out the smallest index from the map in step 1 (a - 2);\\n3. the first letter in the final result must be the smallest letter from index 0 to index 2;\\n4. repeat step 2 to 3 to find out remaining letters.\\n\\n- the smallest letter from index 0 to index 2: a\\n- the smallest letter from index 3 to index 4: c\\n- the smallest letter from index 4 to index 4: d\\n- the smallest letter from index 5 to index 6: b\\n\\nso the result is \"acdb\"\\n\\nNotes:\\n\\n- after one letter is determined in step 3, it need to be removed from the \"last appeared position map\", and the same letter should be ignored in the following steps\\n- in step 3, the beginning index of the search range should be the index of previous determined letter plus one\\n\\n----\\n\\n    public class Solution {\\n    \\n        public String removeDuplicateLetters(String s) {\\n            if (s == null || s.length() <= 1) return s;\\n    \\n            Map<Character, Integer> lastPosMap = new HashMap<>();\\n            for (int i = 0; i < s.length(); i++) {\\n                lastPosMap.put(s.charAt(i), i);\\n            }\\n    \\n            char[] result = new char[lastPosMap.size()];\\n            int begin = 0, end = findMinLastPos(lastPosMap);\\n    \\n            for (int i = 0; i < result.length; i++) {\\n                char minChar = 'z' + 1;\\n                for (int k = begin; k <= end; k++) {\\n                    if (lastPosMap.containsKey(s.charAt(k)) && s.charAt(k) < minChar) {\\n                        minChar = s.charAt(k);\\n                        begin = k+1;\\n                    }\\n                }\\n    \\n                result[i] = minChar;\\n                if (i == result.length-1) break;\\n    \\n                lastPosMap.remove(minChar);\\n                if (s.charAt(end) == minChar) end = findMinLastPos(lastPosMap);\\n            }\\n    \\n            return new String(result);\\n        }\\n    \\n        private int findMinLastPos(Map<Character, Integer> lastPosMap) {\\n            if (lastPosMap == null || lastPosMap.isEmpty()) return -1;\\n            int minLastPos = Integer.MAX_VALUE;\\n            for (int lastPos : lastPosMap.values()) {\\n                 minLastPos = Math.min(minLastPos, lastPos);\\n            }\\n            return minLastPos;\\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"76769",
			"view":"11648",
			"top":"2",
			"title":"Java solution using Stack with comments",
			"vote":"97",
			"content":"    public String removeDuplicateLetters(String sr) {\\n    \\n        int[] res = new int[26]; //will contain number of occurences of character (i+'a')\\n        boolean[] visited = new boolean[26]; //will contain if character (i+'a') is present in current result Stack\\n        char[] ch = sr.toCharArray();\\n        for(char c: ch){  //count number of occurences of character \\n            res[c-'a']++;\\n        }\\n        Stack<Character> st = new Stack<>(); // answer stack\\n        int index;\\n        for(char s:ch){ \\n            index= s-'a';\\n            res[index]--;   //decrement number of characters remaining in the string to be analysed\\n            if(visited[index]) //if character is already present in stack, dont bother\\n                continue;\\n            //if current character is smaller than last character in stack which occurs later in the string again\\n            //it can be removed and  added later e.g stack = bc remaining string abc then a can pop b and then c\\n            while(!st.isEmpty() && s<st.peek() && res[st.peek()-'a']!=0){ \\n                visited[st.pop()-'a']=false;\\n            }\\n            st.push(s); //add current character and mark it as visited\\n            visited[index]=true;\\n        }\\n    \\n        StringBuilder sb = new StringBuilder();\\n        //pop character from stack and build answer string from back\\n        while(!st.isEmpty()){\\n            sb.insert(0,st.pop());\\n        }\\n        return sb.toString();\\n    }"
		},
		{
			"lc_ans_id":"76767",
			"view":"9412",
			"top":"3",
			"title":"C++ simple solution easy understanding",
			"vote":"72",
			"content":"    string removeDuplicateLetters(string s) {\\n        vector<int> cand(256, 0);\\n        vector<bool> visited(256, false);\\n        for (char c : s)\\n            cand[c]++;\\n        string result = \"0\";\\n        for (char c : s) {\\n            cand[c]--;\\n            if (visited[c]) continue;\\n            while (c < result.back() && cand[result.back()]) {\\n                visited[result.back()] = false;\\n                result.pop_back();\\n            }\\n            result += c;\\n            visited[c] = true;\\n        }\\n        return result.substr(1);\\n    }"
		},
		{
			"lc_ans_id":"76860",
			"view":"5709",
			"top":"4",
			"title":"15 ms Java solution",
			"vote":"41",
			"content":"for \"cbacdcbc\", we counts each letter's index:\\n\\n    a----2\\n    b----1,6\\n    c----0,3,5,7\\n    d----4\\n\\nwe go from a to d, to find the first letter who has a index smaller than the largest index of the rest. Here, index 2 of letter a is smaller than 6, 7, 4, so we first pick a; then we remove all index smaller than 2, and we have:\\n\\n    b----6\\n    c----3,5,7\\n    d----4\\n\\nthe next round we pick c not b, why ? cuz  6 of b is larger than 4, but 3 of c is smaller than 4 and 6.\\n\\n    b---6\\n    d---4\\n\\nthen we pick d and b to form \"acdb\"\\n\\nO(n) time to count index, and as we only have 26 letters, it's about O(26 * 26) to find a candidate letter and O(n) time to remove all index. So I think the running time is O(n).\\n\\n    public class Solution {\\n        public String removeDuplicateLetters(String s) {\\n            HashMap<Character, ArrayList<Integer>> counts = new HashMap<Character, ArrayList<Integer>>();\\n            ArrayList<Character> keys = new ArrayList<Character>();\\n            for (int i = 0; i < s.length(); i++) {\\n                char c = s.charAt(i);\\n                if (!counts.containsKey(c)) {\\n                    counts.put(c, new ArrayList<Integer>());\\n                    keys.add(c);\\n                }\\n                counts.get(c).add(i);\\n            }\\n            Collections.sort(keys);\\n            StringBuilder sb = new StringBuilder();\\n            while (!counts.isEmpty()) {\\n                boolean found = true;\\n                for (int i = 0; i < keys.size(); i++) {\\n                    int index = counts.get(keys.get(i)).get(0);\\n                    for (int j = 0; j < keys.size(); j++) {\\n                        ArrayList<Integer> count = counts.get(keys.get(j));\\n                        if (count.get(count.size() - 1) < index) {\\n                            found = false;\\n                            break;\\n                        }\\n                    }\\n                    if (found) {\\n                        sb.append(keys.get(i));\\n                        counts.remove(keys.get(i));\\n                        keys.remove(i);\\n                        for (int j = 0; j < keys.size(); j++) {\\n                            ArrayList<Integer> count = counts.get(keys.get(j));\\n                            while (count.get(0) < index) {\\n                                count.remove(0);\\n                            }\\n                        }\\n                        break;\\n                    }\\n                    found = true;\\n                }\\n            }\\n            return sb.toString();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76762",
			"view":"3797",
			"top":"5",
			"title":"Java O(n) solution using stack with detail explanation",
			"vote":"40",
			"content":"First, given `\"bcabc\"`, the solution should be `\"abc\"`.  If we think about this problem intuitively, you would sort of go from the beginning of the string and start removing one if there is still the same character left and a smaller character is after it.  Given `\"bcabc\"`, when you see a `'b'`, keep it and continue with the search, then keep the following `'c'`, then we see an `'a'`.  Now we get a chance to get a smaller lexi order, you can check if after `'a'`, there is still `'b'` and `'c'` or not.  We indeed have them and `\"abc\"` will be our result.  \\n\\nCome to the implementation, we need some data structure to store the previous characters `'b'` and `'c'`, and we need to compare the current character with previous saved ones, and if there are multiple same characters, we prefer left ones.  This calls for a stack.  \\n\\nAfter we decided to use stack, the implementation becomes clearer.  From the intuition, we know that we need to know if there are still remaining characters left or not.  So we need to iterate the array and save how many each characters are there.  A visited array is also required since we want unique character in the solution.  The line `while(!stack.isEmpty() && stack.peek() > c && count[stack.peek()-'a'] > 0)` checks that the queued character should be removed or not, like the `'b'` and `'c'` in the previous example.  After removing the previous characters, push in the new char and mark the visited array. \\n\\nTime complexity:  O(n), n is the number of chars in string.\\n\\nSpace complexity:  O(n) worst case.\\n\\n\\n    public String removeDuplicateLetters(String s) {\\n        Stack<Character> stack = new Stack<>();\\n        int[] count = new int[26];\\n        char[] arr = s.toCharArray();\\n        for(char c : arr) {\\n            count[c-'a']++;\\n        }\\n        boolean[] visited = new boolean[26];\\n        for(char c : arr) {\\n            count[c-'a']--;\\n            if(visited[c-'a']) {\\n                continue;\\n            }\\n            while(!stack.isEmpty() && stack.peek() > c && count[stack.peek()-'a'] > 0) {\\n                visited[stack.peek()-'a'] = false;\\n                stack.pop();\\n            }\\n            stack.push(c);\\n            visited[c-'a'] = true;\\n        }\\n        StringBuilder sb = new StringBuilder();\\n        for(char c : stack) {\\n            sb.append(c);\\n        }\\n        return sb.toString();\\n    }"
		},
		{
			"lc_ans_id":"76787",
			"view":"4519",
			"top":"6",
			"title":"Some Python solutions",
			"vote":"32",
			"content":"Solutions inspired by those of others. Simpler but less efficient (all still get accepted, of course, in about 50 to 100 ms, normal for Python).\\n\\n---\\n\\n**Solution 1**\\n\\nInspired by [lixx2100's explanation](https://leetcode.com/discuss/73761/a-short-o-n-recursive-greedy-solution).\\n\\n    def removeDuplicateLetters(self, s):\\n        for c in sorted(set(s)):\\n            suffix = s[s.index(c):]\\n            if set(suffix) == set(s):\\n                return c + self.removeDuplicateLetters(suffix.replace(c, ''))\\n        return ''\\n\\n---\\n\\n**Solution 2**\\n\\nInspired by [WHJ425's explanation](https://leetcode.com/discuss/73777/easy-to-understand-iterative-java-solution).\\n\\n    def removeDuplicateLetters(self, s):\\n        result = ''\\n        while s:\\n            i = min(map(s.rindex, set(s)))\\n            c = min(s[:i+1])\\n            result += c\\n            s = s[s.index(c):].replace(c, '')\\n        return result\\n\\n---\\n\\n**Solution 3**\\n\\nInspired by [halibut735's solution](https://leetcode.com/discuss/73824/short-16ms-solution-using-stack-which-can-optimized-down-4ms).\\n\\n    def removeDuplicateLetters(self, s):\\n        rindex = {c: i for i, c in enumerate(s)}\\n        result = ''\\n        for i, c in enumerate(s):\\n            if c not in result:\\n                while c < result[-1:] and i < rindex[result[-1]]:\\n                    result = result[:-1]\\n                result += c\\n        return result"
		},
		{
			"lc_ans_id":"76813",
			"view":"7741",
			"top":"7",
			"title":"Short 16ms O(n) c++ solution using stack which can be optimized down to 4ms",
			"vote":"24",
			"content":"    class Solution {\\n    public:\\n        string removeDuplicateLetters(string s) {\\n            unordered_map<char, int> cnts;\\n            string ret;\\n            stack<char> stk;\\n            vector<bool> isVisited(26, false);\\n            for (char each : s) cnts[each] ++;\\n            for (int i = 0; i < s.size(); cnts[s[i]] --, ++ i) {\\n                if (isVisited[s[i] - 'a'] || (!stk.empty() && stk.top() == s[i])) continue;\\n                while (!stk.empty() && stk.top() > s[i] && cnts[stk.top()] > 0) {\\n                    isVisited[stk.top() - 'a'] = false;\\n                    stk.pop();\\n                }\\n                stk.push(s[i]);\\n                isVisited[s[i] - 'a'] = true;\\n            }\\n            while (!stk.empty()) {\\n                ret.push_back(stk.top());\\n                stk.pop();\\n            }\\n            reverse(ret.begin(), ret.end());\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"76853",
			"view":"2320",
			"top":"8",
			"title":"4ms C++ solution, use return string as a stack",
			"vote":"22",
			"content":"\\n    string removeDuplicateLetters(string s) {\\n        vector<unsigned int> cnt(26,0); //only consider lowercase letters\\n        vector<bool> inRes(26, false); //true if the letter has been added to res \\n        for(char ch:s) cnt[ ch-'a' ]++;\\n        string res = \"\"; //use res as a stack\\n        for(char ch:s){\\n           cnt[ ch-'a' ]--;\\n           if(res.empty()){ \\n               res.push_back(ch);\\n               inRes[ ch-'a' ] = true;\\n               continue;\\n           }\\n           if(inRes[ch-'a']) continue;\\n           while(ch<res.back() && !res.empty() && cnt[ res.back()-'a' ]>0){\\n               inRes[ res.back()-'a' ] = false;\\n               res.pop_back();\\n               \\n           }\\n           res.push_back(ch);\\n           inRes[ ch-'a' ] = true;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"76841",
			"view":"2163",
			"top":"9",
			"title":"Clean and Easy Understand Java Stack Solution with Explanation",
			"vote":"20",
			"content":"The basic idea is to go through the given string char by char. If the current char has been used in the solution string, continue our loop to next char; If not, keep replacing the last char of current solution string with our current char being considered if the current character is smaller, then add current char to solution string.\\n\\nThe process requires an int array and a Boolean array to store the appearances and status(used or not) of each letter. And a stack is used to conveniently push and pop chars.\\n\\n    public String removeDuplicateLetters(String s) {\\n\\n\\t\\tStack<Character> stack = new Stack<Character>();\\n\\n         // appearance count\\n\\t\\tint[] count = new int[26];\\n        // used or not;\\n\\t\\tboolean[] added = new boolean[26];\\n\\n        // count appearances\\n\\t\\tfor (char ch : s.toCharArray())\\n\\t\\t\\tcount[ch - 'a']++;\\n\\n        // go through each char\\n\\t\\tfor (char ch : s.toCharArray()) {\\n\\t\\t\\t\\n\\t\\t\\tcount[ch - 'a']--;\\n\\t\\t\\t\\n\\t\\t\\tif (added[ch - 'a'])\\n\\t\\t\\t\\tcontinue;\\n\\n            // poping out the char which is bigger and still has some left in behind\\n\\t\\t\\twhile (!stack.isEmpty() && stack.peek() > ch\\n\\t\\t\\t\\t\\t&& count[stack.peek() - 'a'] > 0)\\n\\t\\t\\t\\tadded[stack.pop() - 'a'] = false;\\n\\n           // add current one\\n\\t\\t\\tstack.push(ch);\\n\\t\\t\\tadded[ch - 'a'] = true;\\n\\t\\t}\\n\\n           // move from stack to string\\n\\t\\tStringBuilder sb = new StringBuilder();\\n\\t\\twhile (!stack.isEmpty()) {\\n\\t\\t\\tsb.append(stack.pop());\\n\\t\\t}\\n\\n\\t\\treturn sb.reverse().toString();\\n\\n\\t}"
		}
	],
	"id":"316",
	"title":"Remove Duplicate Letters",
	"content":"<p>\r\nGiven a string which contains only lowercase letters, remove duplicate letters so that every letter appear once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.\r\n</p>\r\n\r\n<p>\r\n<b>Example:</b><br/>\r\n</p>\r\n<p>\r\nGiven <code>\"bcabc\"</code><br/>\r\nReturn <code>\"abc\"</code>\r\n</p>\r\n<p>\r\nGiven <code>\"cbacdcbc\"</code><br/>\r\nReturn <code>\"acdb\"</code>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"466",
	"ac_num":"37063"
}