{
	"difficulty":"2",
	"submit_num":"29147",
	"show_id":"678",
	"leetcode_id":"678",
	"answers":[
		{
			"lc_ans_id":"107577",
			"view":"5996",
			"top":"0",
			"title":"Short Java O(n) time, O(1) space, one pass",
			"vote":"56",
			"content":"The idea is to similar to validate a string only contains '(' and ')'. But extend it to tracking the lower and upper bound of valid '(' counts. My thinking process is as following.\\n\\nscan from left to right, and record counts of unpaired \\u2018(\\u2019 for all possible cases. For \\u2018(\\u2019 and \\u2018)\\u2019, it is straightforward, just increment and decrement all counts, respectively. \\nWhen the character is '\\\\*', there are three cases, \\u2018(\\u2019, empty, or \\u2018)\\u2019, we can think those three cases as three branches in the ongoing route. \\nTake \\u201c(**())\\u201d as an example. There are 6 chars:\\n----At step 0: only one count = 1.\\n----At step 1: the route will be diverted into three branches. \\nso there are three counts: 1 - 1, 1, 1 + 1 which is 0, 1, 2, for \\u2018)\\u2019, empty and \\u2018(\\u2019 respectively.\\n----At step 2 each route is diverged into three routes again. so there will be 9 possible routes now. \\n--\\tFor count = 0, it will be diverted into 0 \\u2013 1, 0, 0 + 1, which is -1, 0, 1, but when the count is -1, that means there are more \\u2018)\\u2019s than \\u2018(\\u2019s, and we need to stop early at that route, since it is invalid. we end with 0, 1.\\n--\\tFor count = 1, it will be diverted into 1 \\u2013 1, 1, 1 + 1, which is 0, 1, 2\\n--\\tFor count = 2, it will be diverted into 2 \\u2013 1, 2, 2 + 1, which is 1, 2, 3\\nTo summarize step 2, we end up with counts of 0,1,2,3\\n----At step 3, increment all counts --> 1,2,3,4\\n----At step 4, decrement all counts --> 0,1,2,3\\n----At step 5, decrement all counts --> -1, 0,1,2,  the route with count -1 is invalid, so stop early at that route. Now we have 0,1,2.\\nIn the very end, we find that there is a route that can reach count == 0. Which means all \\u2018(\\u2019 and \\u2018)\\u2019 are cancelled. So, the original String is valid.\\nAnother finding is counts of unpaired \\u2018(\\u2019 for all valid routes are consecutive integers. So we only need to keep a lower and upper bound of that consecutive integers to save space.\\nOne case doesn\\u2019t show up in the example is: if the upper bound is negative, that means all routes have more \\u2018)\\u2019 than \\u2018(\\u2019 --> all routes are invalid --> stop and return false.\\n\\nHope this explanation helps.\\n\\n```\\n    public boolean checkValidString(String s) {\\n        int low = 0;\\n        int high = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            if (s.charAt(i) == '(') {\\n                low++;\\n                high++;\\n            } else if (s.charAt(i) == ')') {\\n                if (low > 0) {\\n                    low--;\\n                }\\n                high--;\\n            } else {\\n                if (low > 0) {\\n                    low--;\\n                }\\n                high++;\\n            }\\n            if (high < 0) {\\n                return false;\\n            }\\n        }\\n        return low == 0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"107566",
			"view":"2964",
			"top":"1",
			"title":"Java 12 lines solution, backtracking",
			"vote":"33",
			"content":"1. How to check valid parenthesis w/ only ```(``` and ```)```? Easy. Count each char from left to right. When we see ```(```, count++; when we see ```)``` count--; if count < 0, it is invalid (```)``` is more than ```(```); At last, count should == 0.\\n2. This problem added ```*```. The easiest way is to try ```3``` possible ways when we see it. Return true if one of them is valid.\\n```\\nclass Solution {\\n    public boolean checkValidString(String s) {\\n        return check(s, 0, 0);\\n    }\\n    \\n    private boolean check(String s, int start, int count) {\\n        if (count < 0) return false;\\n        \\n        for (int i = start; i < s.length(); i++) {\\n            char c = s.charAt(i);\\n            if (c == '(') {\\n                count++;\\n            }\\n            else if (c == ')') {\\n                if (count <= 0) return false;\\n                count--;\\n            }\\n            else if (c == '*') {\\n                return check(s, i + 1, count + 1) || check(s, i + 1, count - 1) || check(s, i + 1, count);\\n            }\\n        }\\n        \\n        return count == 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107611",
			"view":"1174",
			"top":"2",
			"title":"Very concise C++ solution with explaination. No DP",
			"vote":"17",
			"content":"Since * can be used as 3 kinds of char, if we do backtrack the complexity can blow up if the string is *****.... We need to find a non-trivial method.\\nWithout *, we can just use a number to indicate the unmatch (, ( will increment it and ) will decrement it. We don't want this number less than 0 all the time and it should be 0 when all the string has been matched.\\nWhen * is introduced, the number becomes a range, indicating the number of possible unmatched ( found. One * just expand the range by 1. And we can use the same principle to check if the criteria above is within the range.\\n```\\nclass Solution {\\npublic:\\n    bool checkValidString(string s) {\\n        int lower = 0, upper = 0;\\n        for (char c : s) {\\n            if (c=='(') {\\n                lower++;\\n                upper++;\\n            } else if (c==')') {\\n                lower--;               \\n                upper--;\\n            } else { // * encountered\\n                lower--;\\n                upper++;\\n            }\\n            lower = max(lower, 0);\\n            if (upper<0) // unmatched ')' found in the middle of string\\n                return false;\\n        }\\n        return lower==0;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"107581",
			"view":"1352",
			"top":"3",
			"title":"O(n) time, O(1) space, no Recursion, just scan from left and then scan from right",
			"vote":"11",
			"content":"Share my accepted code. \\nFirst scan from left, then scan from right.\\n````\\n    public boolean checkFromLeft(String s) {\\n        if (s == null || s.length() == 0) {\\n            return true;\\n        }\\n        int star = 0;\\n        int open = 0;\\n        int close = 0;\\n        for (char c : s.toCharArray()) {\\n            if (c == '(') {\\n                open++;\\n            } else if (c == ')') {\\n                close++;\\n            } else {\\n                star++;\\n            }\\n            if (close > open + star) {\\n                return false;\\n            }\\n        }\\n        if (close == open || close - open <= star) {\\n            return true;\\n        }\\n        return false;\\n    }\\n    public boolean checkFromRight(String s) {\\n        if (s == null || s.length() == 0) {\\n            return true;\\n        }\\n        int star = 0;\\n        int open = 0;\\n        int close = 0;\\n        for (int i = s.length() - 1; i >= 0; i--) {\\n            char c = s.charAt(i);\\n            if (c == ')') {\\n                open++;\\n            } else if (c == '(') {\\n                close++;\\n            } else {\\n                star++;\\n            }\\n            if (close > open + star) {\\n                return false;\\n            }\\n        }\\n        if (close == open || close - open <= star) {\\n            return true;\\n        }\\n        return false;\\n    }\\n    public boolean checkValidString(String s) {\\n        return checkFromLeft(s) && checkFromRight(s);\\n    }\\n````"
		},
		{
			"lc_ans_id":"107572",
			"view":"1226",
			"top":"4",
			"title":"Java using 2 stacks.  O(n) space and time complexity.",
			"vote":"11",
			"content":"The basic idea is to track the index of the left bracket and star position.   \\nPush all the indices of the star and left bracket to their stack respectively.  \\n**STEP 1**\\nOnce a right bracket comes, **pop left bracket stack first if it is not empty.**    If the left bracket stack is empty, pop the star stack if it is not empty.   **A false return can be made provided that both stacks are empty.**\\n\\n**STEP 2**\\nNow attention is paid to the remaining stuff in these two stacks.   Note that the left bracket **CANNOT** appear after the star as there is NO way to balance the bracket.   In other words, whenever there is a left bracket index appears after the Last star,  **a false statement can be made.**   Otherwise, pop out each from the left bracket and star stack.  \\n\\n**STEP 3** \\nA correct sequence should have an empty left bracket stack.   You don't need to take care of the star stack.  \\n\\n**Final Remarks:**\\nGreedy algorithm is used here.  We always want to use left brackets to balance the right one first as the * symbol is a wild card.   There is probably an O(1) space complexity but I think this is worth mentioning. \\n\\n```\\n    public boolean checkValidString(String s) {\\n        Stack<Integer> leftID = new Stack<>();\\n        Stack<Integer> starID = new Stack<>();\\n        for (int i = 0; i < s.length(); i++) {\\n            char ch = s.charAt(i);\\n            if (ch == '(')\\n                leftID.push(i);\\n            else if (ch == '*')\\n                starID.push(i);\\n            else {\\n                if (leftID.isEmpty() && starID.isEmpty())   return false;\\n                if (!leftID.isEmpty())\\n                    leftID.pop();\\n                else \\n                    starID.pop();\\n            }\\n        }\\n        while (!leftID.isEmpty() && !starID.isEmpty()) {\\n            if (leftID.pop() > starID.pop()) \\n                return false;\\n        }\\n        return leftID.isEmpty();\\n    }\\n```"
		},
		{
			"lc_ans_id":"107570",
			"view":"713",
			"top":"5",
			"title":"Python easy understand solution",
			"vote":"6",
			"content":"The number of open parenthesis is in a range ```[cmin, cmax]```\\n```cmax``` counts the maximum open parenthesis, which means the maximum number of unbalanced '(' that **COULD** be paired.\\n```cmin``` counts the minimum open parenthesis, which means the number of unbalanced '(' that **MUST** be paired.\\n\\nThe string is valid for 2 condition:\\n1. ```cmax``` will never be negative.\\n2. ```cmin``` is 0 at the end.\\n\\n\\n\\n\\n\\n````\\ndef checkValidString(self, s):\\n        cmin = cmax = 0\\n        for i in s:\\n            if i == '(':\\n                cmax += 1\\n                cmin += 1\\n            if i == ')':\\n                cmax -= 1\\n                cmin = max(cmin - 1, 0)\\n            if i == '*':\\n                cmax += 1\\n                cmin = max(cmin - 1, 0)\\n            if cmax < 0:\\n                return False\\n        return cmin == 0\\n````\\nor shorter:\\n````\\ndef checkValidString(self, s):\\n        cmin = cmax = 0\\n        for i in s:\\n            cmax = cmax-1 if i==')' else cmax+1\\n            cmin = cmin+1 if i=='(' else max(cmin - 1, 0) \\n            if cmax < 0: return False\\n        return cmin == 0\\n````\\nEdited after vonzcy's suggestion."
		},
		{
			"lc_ans_id":"107589",
			"view":"147",
			"top":"6",
			"title":"Java, O(n), 2pass, ez to understand",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    public boolean checkValidString(String s) {\\n        int left = 0, right = 0, leftx = 0, rightx = 0;\\n        for (int i=0; i<s.length(); i++){\\n            if (s.charAt(i) == '(') left++;\\n            else if (s.charAt(i) == ')') left--;\\n            else leftx++;            \\n            if (left < 0){\\n                if (leftx == 0) return false;\\n                else{\\n                    leftx--;\\n                    left++;\\n                }\\n            }\\n        }\\n        for (int i=s.length()-1; i>=0; i--){\\n            if (s.charAt(i) == '(') right--;\\n            else if (s.charAt(i) == ')') right++;\\n            else rightx++;\\n            if (right < 0){\\n                if (rightx == 0) return false;\\n                else{\\n                    rightx--;\\n                    right++;\\n                }\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```\\nThis might be easier to understand than the top O(n) solution :)"
		},
		{
			"lc_ans_id":"107600",
			"view":"197",
			"top":"7",
			"title":"[678. Valid Parenthesis String] C++_Using stack",
			"vote":"2",
			"content":"In the stack, we also store the position information.\\n\\n    class Solution {\\n    public:\\n    bool checkValidString(string s) {\\n        if(s.empty()) return true;\\n        stack<pair<char, int> > st;\\n        stack<pair<char, int> > st2;\\n        int i = 0;\\n        for(;i < s.size(); ++i){\\n            if(s[i] == '*'){\\n                st2.push({s[i],i});\\n            }else if(s[i] == '('){\\n                st.push({s[i],i});\\n            }else{\\n                if(!st.empty()){\\n                    st.pop();\\n                }else if(!st2.empty()){\\n                    st2.pop();\\n                }else{\\n                    break;\\n                }\\n            }\\n        }\\n        while(!st.empty() && !st2.empty()){\\n            auto left = st.top();\\n            auto star = st2.top();\\n            if(left.second >= star.second){\\n                break;\\n            }\\n            st.pop();\\n            st2.pop();\\n        }\\n        return st.empty() && i == s.size();\\n    }\\n    };"
		},
		{
			"lc_ans_id":"107583",
			"view":"238",
			"top":"8",
			"title":"C++, Two pass forward and back, O(n)",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    bool checkValidString(string s) {\\n        for (int i = 0, cnt = 0, star = 0; i < n; i++) {\\n            if (s[i] == '(') \\n                cnt++;\\n            else if (s[i] == '*') \\n                star++;\\n            else {\\n                if (cnt == 0 && star == 0) return false;\\n                if (cnt) \\n                    cnt--;\\n                else \\n                    star--;\\n            }\\n        }\\n        for (int i = n-1, cnt = 0, star = 0; i >= 0; i--) {\\n            if (s[i] == ')') \\n                cnt++;\\n            else if (s[i] == '*') \\n                star++;\\n            else {\\n                if (cnt == 0 && star == 0) return false;\\n                if (cnt) \\n                    cnt--;\\n                else \\n                    star--;\\n            }\\n        }\\n        return true;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"107602",
			"view":"463",
			"top":"9",
			"title":"AC JAVA solution using recursion",
			"vote":"2",
			"content":"Key idea is to keep tracking the number of \"(\" and \")\", if, at any time, the number of right parenthesis is greater than the number of left parenthesis, return false.\\nWhen \"*\" is find, treat it as \"(\" or \")\" or empty string. When the String s is traversed, simply check if number of left parenthesis is equal to the number or right parenthesis or not.  \\n```\\nclass Solution {\\n    public boolean checkValidString(String s) {\\n        if (s == null || s.length() == 0) return true;\\n        return helper(s, 0, 0, 0);\\n    }\\n    private boolean helper(String s, int left, int right, int pos) {\\n        if (right > left) return false;\\n        for (int i = pos; i < s.length(); i++) {\\n            if (s.charAt(i) == '(') {\\n                left++;\\n            }\\n            else if (s.charAt(i) == ')') {\\n                right++;\\n                if (right > left) return false;\\n            }\\n            else {\\n                if (helper(s, left + 1, right, i + 1)) return true;\\n                else if (helper(s, left, right + 1, i + 1)) return true;\\n                else if (helper(s, left, right, i + 1)) return true;\\n                else return false;\\n            }\\n        }\\n        return left == right;\\n    }\\n}\\n```"
		}
	],
	"id":"655",
	"title":"Valid Parenthesis String",
	"content":"<p>\r\nGiven a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:\r\n<ol>\r\n<li>Any left parenthesis <code>'('</code> must have a corresponding right parenthesis <code>')'</code>.</li>\r\n<li>Any right parenthesis <code>')'</code> must have a corresponding left parenthesis <code>'('</code>.</li>\r\n<li>Left parenthesis <code>'('</code> must go before the corresponding right parenthesis <code>')'</code>.</li>\r\n<li><code>'*'</code> could be treated as a single right parenthesis <code>')'</code> or a single left parenthesis <code>'('</code> or an empty string.</li>\r\n<li>An empty string is also valid.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"()\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"(*)\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> \"(*))\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The string size will be in the range [1, 100].</li>\r\n</ol>\r\n</p>",
	"frequency":"163",
	"ac_num":"8525"
}