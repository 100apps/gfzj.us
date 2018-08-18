{
	"difficulty":"2",
	"submit_num":"6338",
	"show_id":"555",
	"leetcode_id":"555",
	"answers":[
		{
			"lc_ans_id":"101797",
			"view":"2107",
			"top":"0",
			"title":"Easy understanding C++ solution with detailed explnation",
			"vote":"9",
			"content":"To solve this problem, we must keep in heart the following points:\\n1. We know the cut point must come from the one string, assumed it is called c-string.\\n2. Then except the c-string, **all the other string** must become its lexicographically biggest status, assumed it is called b-status. Since only in this situation, we could get the lexicographically biggest string after cutting.\\n3. To reach the point 2, we need to first let all the string reach its b-status for the convenience of traversing all the strings afterward.\\n4. Then, for each string's traversal procedure, we need to decide whether it should be reversed or not since we don't know which might generate the final answer, and then we enumerated all the characters in this string.\\n\\n```\\nclass Solution {\\npublic:\\n    int n;\\n    string ans = \"\";\\n    // solve function: flag - whether we need to reverse the string; i - the ith string in the strs\\n    void solve(vector<string>& strs, int i, bool flag) {\\n        string temp = strs[i]; // intermediate string for not disturbing the original structure of 'strs'\\n        if (flag) reverse(temp.begin(), temp.end());\\n        int size = (int)temp.size();\\n        string str1 = \"\", str2 = \"\";\\n        for (int j=i+1; j<n; ++j) str1 += strs[j]; // Concatenate all the string behind the strs[i]\\n        for (int j=0; j<i; ++j) str2 += strs[j]; // Concatenate all the string before the strs[i]\\n        // traverse all the string character\\n        for (int k=0; k<size; ++k) {\\n            string newOne = temp.substr(k) + str1 + str2 + temp.substr(0, k); // cut and find the regular string\\n            ans = ans == \"\" ? newOne : max(ans, newOne); // update the ans\\n        }\\n    }\\n    // Reach the b-status for all the strings.\\n    void findMaxStrings(vector<string>& strs) {\\n        for (int i=0; i<n; ++i) {\\n            string temp = strs[i];\\n            reverse(temp.begin(), temp.end());\\n            strs[i] = strs[i] > temp ? strs[i] : temp;\\n        }\\n    }\\n    // Main function\\n    string splitLoopedString(vector<string>& strs) {\\n        n = (int)strs.size();\\n        if (n == 0) return \"\";\\n        findMaxStrings(strs);\\n        for (int i=0; i<n; ++i) {\\n            // we dont's know which will generate the final answer, so we traverse both situations.\\n            solve(strs, i, true); // reverse the string situation\\n            solve(strs, i, false); // not reverse the string situation\\n        }\\n        return ans;\\n    }\\n};\\n```\\n```"
		},
		{
			"lc_ans_id":"101798",
			"view":"1469",
			"top":"1",
			"title":"C++ 9ms 12 lines",
			"vote":"7",
			"content":"The idea is similar to [this post](https://discuss.leetcode.com/topic/86509/easy-understanding-c-solution-with-detailed-explnation) by @love_FDU_llp; just optimized for brevity and performance (9 ms vs. 100 ms).\\nOptimization 1: do not check the cutting point if the first letter is smaller than the first letter of the current best result.\\n[Removed as producing incorrect results] Optimization 2: if a sub-string best result is the same as the current best result, then there is a lop and we are done.\\nI also tried few more ideas, but it did not improve OJ runtime but increased the number of lines.\\n```\\nstring splitLoopedString(vector<string>& strs) {\\n    string s = \"\", res = \"a\";\\n    for (auto i = 0; i < strs.size(); ++i) {\\n        auto r = strs[i];\\n        reverse(r.begin(), r.end());\\n        s += max(r, strs[i]);\\n    }\\n    for (auto i = 0, st = 0; i < strs.size(); st += strs[i++].size()) {\\n        auto p1 = strs[i], p2 = strs[i], body = s.substr(st + p1.size()) + s.substr(0, st);\\n        reverse(p2.begin(), p2.end());\\n        for (auto j = 0; j < strs[i].size(); ++j) {\\n            if (p1[j] >= res[0]) res = max(res, p1.substr(j) + body + p1.substr(0, j));\\n            if (p2[j] >= res[0]) res = max(res, p2.substr(j) + body + p2.substr(0, j));\\n        }\\n    }\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"101800",
			"view":"1211",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"7",
			"content":"For every starting direction and letter, let's determine the best string we can make.  For subsequent fragments we encounter, we always want them flipped in the orientation that makes them largest.\\n\\nThus, for every token, for every starting direction, for every starting letter in the token, we can compute the candidate string directly.  We take the maximum of these.\\n\\n```\\ndef splitLoopedString(self, A):\\n    B = [max(x, x[::-1]) for x in A]\\n    ans = None\\n    for i, token in enumerate(B):\\n        for start in (token, token[::-1]):\\n            for j in xrange(len(start) + 1):\\n                ans = max(ans, start[j:] + \"\".join(B[i+1:] + B[:i]) + start[:j])\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"101803",
			"view":"1533",
			"top":"3",
			"title":"Neat Java Solution",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    public String splitLoopedString(String[] strs) {\\n        for (int i = 0; i < strs.length; i++) {\\n            String rev = new StringBuilder(strs[i]).reverse().toString();\\n            if (strs[i].compareTo(rev) < 0)\\n                strs[i] = rev;\\n        }\\n        String res = \"\";\\n        for (int i = 0; i < strs.length; i++) {\\n            String rev = new StringBuilder(strs[i]).reverse().toString();\\n            for (String st: new String[] {strs[i], rev}) {\\n                for (int k = 0; k < st.length(); k++) {\\n                    StringBuilder t = new StringBuilder(st.substring(k));\\n                    for (int j = i + 1; j < strs.length; j++)\\n                        t.append(strs[j]);\\n                    for (int j = 0; j < i; j++)\\n                        t.append(strs[j]);\\n                    t.append(st.substring(0, k));\\n                    if (t.toString().compareTo(res) > 0)\\n                        res = t.toString();\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101804",
			"view":"483",
			"top":"4",
			"title":"Java straight forward method with explanation",
			"vote":"3",
			"content":"1. for each string other than the one we place the cut we choose the bigger one between itself and its reverse. We use the bigger one in the final concatenation.\\n2. for the string which we cut - strs[i], we try each cut position for both strs[i] and its reverese, concatenate the other words after it to find the maximum result.\\n3. we don't need to recaculate the concatenated string completely everytime. When we iterate through the cutting string we just need remove the first string and add last string to the mid part.\\n```\\n    public static String splitLoopedString(String[] strs) {\\n        int n = strs.length;\\n        for (int i = 0; i < n; i++) {\\n            String rev = new StringBuilder(strs[i]).reverse().toString();\\n            if (strs[i].compareTo(rev) < 0) strs[i] = rev;\\n        }\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < n-1; i++) sb.append(strs[i]);\\n        String mid = sb.toString(), result = mid+strs[n-1];\\n        for (int i = 0; i < n; i++) {\\n            String str = strs[i], rev = new StringBuilder(str).reverse().toString();\\n            mid = mid.substring(str.length())+strs[(i+n-1)%n];\\n            for (int j = 0; j <= str.length(); j++) {\\n                String s1 = str.substring(j)+mid+str.substring(0, j), s2 = rev.substring(j)+mid+rev.substring(0, j);\\n                if (s1.compareTo(s2) >= 0 && s1.compareTo(result) > 0) result = s1;\\n                else if (s2.compareTo(s1) >= 0 && s2.compareTo(result) > 0) result = s2;\\n            }\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101812",
			"view":"764",
			"top":"5",
			"title":"neat Java solution with brief explanation",
			"vote":"2",
			"content":"Updated: optimized by using a variable to maintain the lexicographically biggest character. Thanks to the idea from @shawngao. The running time now is about 60ms.\\n\\nStep 1: Compare every string with its own reverse, if the reverse is lexicographically bigger, then replace the string with reverse.\\nStep 2: Concatenate all the strings into one, called 'stot'. Use 'maxch' to maintain the current biggest character. \\nStep 3: Loop over every string and every character within the string. Each time you meet a character that is no smaller than 'maxch', update 'maxch', then build two candidate solutions s1, s2 based on 'stot'. (s1 and s2 starts at 'maxch' in two directions). Compare s1, s2 with the current best solution. Finally you get the best solution.\\n\\n\\n'''\\n\\n    public String splitLoopedString(String[] strs) {\\n        String stot = \"\";\\n        for (int i = 0; i < strs.length; i++) {\\n            String rever = new StringBuffer(strs[i]).reverse().toString();\\n            if (rever.compareTo(strs[i]) > 0) strs[i] = rever;\\n            stot = stot + strs[i];\\n        }\\n        int start = 0;\\n        String sol = stot;\\n        char maxch = 'a';\\n        for (int i = 0; i < strs.length; i++) {\\n            int n = strs[i].length();\\n            start += n;\\n            String rever = new StringBuffer(strs[i]).reverse().toString();\\n            String other_strs = stot.substring(start) + stot.substring(0, start - n);\\n            for (int j = 0; j < n; j++) {\\n                if (strs[i].charAt(j) - maxch >= 0) {\\n                    maxch = strs[i].charAt(j);\\n                    String s1 = strs[i].substring(j) + other_strs + strs[i].substring(0, j);\\n                    String s2 = rever.substring(n-1-j) + other_strs + rever.substring(0, n-1-j);\\n                    if (s1.compareTo(sol) > 0) sol = s1;\\n                    if (s2.compareTo(sol) > 0) sol = s2;\\n                }\\n            }\\n        }\\n        return sol;\\n    }\\n\\n'''\\n\\nIt's true that you don't have to consider comparing the two strings which are both as long as solution. Ideally you may just need to consider comparing two strings both with length 2. But in the worst case you still have to.  \\nTo save memory you have to write more lines. And in some cases like when a 'z' appear in the first or last position in a string, you need to write more 'if-else'. \\nBy the way, in java, substring() method is O(1). Thus my time complexity should be better than considering character by character."
		},
		{
			"lc_ans_id":"101809",
			"view":"210",
			"top":"6",
			"title":"Python solution",
			"vote":"1",
			"content":"````\\ndef splitLoopedString(self, strs):\\n        strs = [max(s, s[::-1]) for s in strs]\\n        res = \"\"\\n        for i, s in enumerate(strs):\\n            for j in range(len(s)):\\n                words = ''.join(strs[i + 1:] + strs[:i])\\n                res = max(res, s[j:] + words + s[:j], s[j::-1] + words + s[:j:-1])\\n        return res"
		},
		{
			"lc_ans_id":"101796",
			"view":"38",
			"top":"7",
			"title":"C++",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    string splitLoopedString(vector<string>& strs) {\\n        vector<string>tmp;\\n        for(auto str:strs)\\n        {\\n            string clone = str;\\n            reverse(clone.begin(),clone.end());\\n            if(str.compare(clone)>0)\\n                tmp.push_back(str);\\n            else\\n                tmp.push_back(clone);\\n        }        \\n        string res;\\n        for(int i = 0;i<tmp.size();i++)\\n        {\\n            string str = tmp[i];\\n            string rev = tmp[i];\\n            reverse(rev.begin(),rev.end());\\n            vector<string> candidates = {str,rev};\\n            for(auto candidate:candidates)\\n            {\\n                for(int k = 0;k<candidate.size();k++)\\n                {\\n                    string t = candidate.substr(k);\\n                    for (int j = i + 1; j < tmp.size(); j++)t+=tmp[j];\\n                    for (int j = 0; j < i; j++)t+=tmp[j];\\n                    t+=candidate.substr(0,k);\\n                    if (t.compare(res) > 0)\\n                        res = t;\\n                }\\n            } \\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101799",
			"view":"86",
			"top":"8",
			"title":"Straight forward java solution. Beat 90%",
			"vote":"0",
			"content":"```\\npublic class Solution {\\n    public String splitLoopedString(String[] strs) {\\n        char max = 'a';\\n        StringBuilder sb = new StringBuilder();\\n        \\n        for (int i = 0; i < strs.length; i++) {\\n            String reversed = new StringBuilder(strs[i]).reverse().toString();\\n            strs[i] = (reversed.compareTo(strs[i]) > 0 ? reversed : strs[i]);\\n            sb.append(strs[i]);\\n             for (int j = 0; j < strs[i].length(); j++) {\\n                max = max < strs[i].charAt(j) ? strs[i].charAt(j) : max;\\n            }\\n        }\\n        String s = sb.toString();\\n        \\n         int cur = 0;\\n         String rst = \"\";\\n         for (int i = 0; i < strs.length; i++) {\\n            String s1 = strs[i];\\n            String s2 = new StringBuilder(s1).reverse().toString();\\n            cur += (i - 1 >= 0 ? strs[i - 1].length() : 0);\\n            String middle = s.substring(cur + s1.length(), s.length()) + s.substring(0, cur);\\n            for (int j = 0; j < s1.length(); j++) {\\n                String temp = \"\";\\n                if(s1.charAt(j) == max) {\\n                    temp = s1.substring(j) + middle + s1.substring(0, j);\\n                    rst = (rst.compareTo(temp) >= 0 ? rst : temp);\\n                }\\n                if(s2.charAt(j) == max) {\\n                    temp = s2.substring(j) + middle + s2.substring(0, j);\\n                    rst = (rst.compareTo(temp) >= 0 ? rst : temp);\\n                }\\n            }\\n        }\\n        return rst;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101801",
			"view":"93",
			"top":"9",
			"title":"Quick Java solution",
			"vote":"0",
			"content":"    public class Solution {\\n    public String splitLoopedString(String[] strs) {\\n        char maxChar = 'a';\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < strs.length; i++) {\\n            for (char c : strs[i].toCharArray()) {\\n                if (c > maxChar)\\n                    maxChar = c;\\n            }\\n            String reversed = new StringBuilder(strs[i]).reverse().toString();\\n            if (reversed.compareTo(strs[i]) > 0) {\\n                sb.append(reversed);\\n                strs[i] = reversed;\\n            } else {\\n                sb.append(strs[i]);\\n            }\\n        }\\n\\n        String maxStr = \"\";\\n        for (int i = 0; i < strs.length; i++) {\\n            String str = strs[i];\\n            int len = str.length();\\n            String reversed = new StringBuilder(str).reverse().toString();\\n            sb.replace(0, len, \"\");\\n\\n            if (str.indexOf(maxChar) > -1) {\\n                int sbLen = sb.length();\\n                for (String toTest : new String[]{str, reversed}) {\\n                    sb.insert(0, toTest);\\n                    for (int j = 0; j < len; j++) {\\n                        if (j > 0) {\\n                            sb.replace(0, 1, \"\");\\n                            sb.append(toTest.charAt(j - 1));\\n                        }\\n                        if (toTest.charAt(j) < maxChar)\\n                            continue;\\n\\n                        String s = sb.toString();\\n                        if (s.compareTo(maxStr) > 0)\\n                            maxStr = s;\\n                    }\\n                    sb.replace(0, 1, \"\");\\n                    sb.setLength(sbLen);\\n                }\\n            }\\n\\n            sb.append(str);\\n        }\\n        return maxStr;\\n    }\\n}"
		}
	],
	"id":"538",
	"title":"Split Concatenated Strings",
	"content":"<p>Given a list of strings, you could concatenate these strings together into a loop, where for each string you could choose to reverse it or not. Among all the possible loops, you need to find the lexicographically biggest string after cutting the loop, which will make the looped string into a regular one.</p>\r\n\r\n<p>Specifically, to find the lexicographically biggest string, you need to experience two phases: \r\n<ol>\r\n<li>Concatenate all the strings into a loop, where you can reverse some strings or not and connect them in the same order as given.</li>\r\n<li>Cut and make one breakpoint in any place of the loop, which will make the looped string into a regular one starting from the character at the cutpoint. </li>\r\n</ol>\r\n</p>\r\n\r\n<p>And your job is to find the lexicographically biggest one among all the possible regular strings.</p>\r\n\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \"abc\", \"xyz\"\r\n<b>Output:</b> \"zyxcba\"\r\n<b>Explanation:</b> You can get the looped string \"-abcxyz-\", \"-abczyx-\", \"-cbaxyz-\", \"-cbazyx-\", <br/>where '-' represents the looped status. <br/>The answer string came from the fourth looped one, <br/>where you could cut from the middle character 'a' and get \"zyxcba\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input strings will only contain lowercase letters.</li>\r\n<li>The total length of all the strings will not over 1,000.</li>\r\n</ol>\r\n</p>",
	"frequency":"16",
	"ac_num":"2393"
}