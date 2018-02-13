{
	"difficulty":"3",
	"submit_num":"500574",
	"show_id":"32",
	"leetcode_id":"32",
	"answers":[
		{
			"lc_ans_id":"14126",
			"view":"39038",
			"top":"0",
			"title":"My O(n) solution using a stack",
			"vote":"305",
			"content":"    class Solution {\\n    public:\\n        int longestValidParentheses(string s) {\\n            int n = s.length(), longest = 0;\\n            stack<int> st;\\n            for (int i = 0; i < n; i++) {\\n                if (s[i] == '(') st.push(i);\\n                else {\\n                    if (!st.empty()) {\\n                        if (s[st.top()] == '(') st.pop();\\n                        else st.push(i);\\n                    }\\n                    else st.push(i);\\n                }\\n            }\\n            if (st.empty()) longest = n;\\n            else {\\n                int a = n, b = 0;\\n                while (!st.empty()) {\\n                    b = st.top(); st.pop();\\n                    longest = max(longest, a-b-1);\\n                    a = b;\\n                }\\n                longest = max(longest, a);\\n            }\\n            return longest;\\n        }\\n    };\\n\\nThe workflow of the solution is as below.\\n\\n 1. Scan the string from beginning to end.  \\n 2. If current character is '(',\\n    push its index to the stack. If current character is ')' and the\\n    character at the index of the top of stack is '(', we just find a\\n    matching pair so pop from the stack. Otherwise, we push the index of\\n    ')' to the stack.\\n 3. After the scan is done, the stack will only\\n    contain the indices of characters which cannot be matched. Then\\n    let's use the opposite side -  substring between adjacent indices\\n    should be valid parentheses. \\n 4. If the stack is empty, the whole input\\n    string is valid. Otherwise, we can scan the stack to get longest\\n    valid substring as described in step 3."
		},
		{
			"lc_ans_id":"14133",
			"view":"29875",
			"top":"1",
			"title":"My DP, O(n) solution without using stack",
			"vote":"191",
			"content":"My solution uses DP. The main idea is as follows: I construct a array <b>longest[]</b>, for any longest[i], it stores the longest length of valid parentheses which is end at i.\\n<br>And the DP idea is :\\n<br> If s[i] is '(', set longest[i] to 0,because any string end with '(' cannot be a valid one.\\n<br>Else if s[i] is ')'\\n<br>\\xa0\\xa0\\xa0\\xa0 If s[i-1] is '(', longest[i] = longest[i-2] + 2\\n<br>\\xa0\\xa0\\xa0\\xa0 Else if s[i-1] is ')' **and s[i-longest[i-1]-1] == '('**, longest[i] = longest[i-1] + 2 + longest[i-longest[i-1]-2]\\n<br> For example, input \"()(())\", at i = 5, longest array is [0,2,0,0,2,0], longest[5] = longest[4] + 2 + longest[1] = 6.\\n<br>\\n \\n\\n       int longestValidParentheses(string s) {\\n                if(s.length() <= 1) return 0;\\n                int curMax = 0;\\n                vector<int> longest(s.size(),0);\\n                for(int i=1; i < s.length(); i++){\\n                    if(s[i] == ')'){\\n                        if(s[i-1] == '('){\\n                            longest[i] = (i-2) >= 0 ? (longest[i-2] + 2) : 2;\\n                            curMax = max(longest[i],curMax);\\n                        }\\n                        else{ // if s[i-1] == ')', combine the previous length.\\n                            if(i-longest[i-1]-1 >= 0 && s[i-longest[i-1]-1] == '('){\\n                                longest[i] = longest[i-1] + 2 + ((i-longest[i-1]-2 >= 0)?longest[i-longest[i-1]-2]:0);\\n                                curMax = max(longest[i],curMax);\\n                            }\\n                        }\\n                    }\\n                    //else if s[i] == '(', skip it, because longest[i] must be 0\\n                }\\n                return curMax;\\n            }\\n\\nUpdated: thanks to **Philip0116**, I have a more concise solution(though this is not as readable as the above one, but concise):\\n\\n    int longestValidParentheses(string s) {\\n            if(s.length() <= 1) return 0;\\n            int curMax = 0;\\n            vector<int> longest(s.size(),0);\\n            for(int i=1; i < s.length(); i++){\\n                if(s[i] == ')' && i-longest[i-1]-1 >= 0 && s[i-longest[i-1]-1] == '('){\\n                        longest[i] = longest[i-1] + 2 + ((i-longest[i-1]-2 >= 0)?longest[i-longest[i-1]-2]:0);\\n                        curMax = max(longest[i],curMax);\\n                }\\n            }\\n            return curMax;\\n        }"
		},
		{
			"lc_ans_id":"14167",
			"view":"16445",
			"top":"2",
			"title":"Simple JAVA solution, O(n) time, one stack",
			"vote":"113",
			"content":"```\\npublic class Solution {\\n    public int longestValidParentheses(String s) {\\n        Stack<Integer> stack = new Stack<Integer>();\\n        int max=0;\\n        int left = -1;\\n        for(int j=0;j<s.length();j++){\\n            if(s.charAt(j)=='(') stack.push(j);            \\n            else {\\n                if (stack.isEmpty()) left=j;\\n                else{\\n                    stack.pop();\\n                    if(stack.isEmpty()) max=Math.max(max,j-left);\\n                    else max=Math.max(max,j-stack.peek());\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"14147",
			"view":"6669",
			"top":"3",
			"title":"My simple 8ms C++ code",
			"vote":"67",
			"content":"    class Solution {\\n    public:\\n        int longestValidParentheses(string s) {\\n            stack<int> stk;\\n            stk.push(-1);\\n            int maxL=0;\\n            for(int i=0;i<s.size();i++)\\n            {\\n                int t=stk.top();\\n                if(t!=-1&&s[i]==')'&&s[t]=='(')\\n                {\\n                    stk.pop();\\n                    maxL=max(maxL,i-stk.top());\\n                }\\n                else\\n                    stk.push(i);\\n            }\\n            return maxL;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"14355",
			"view":"7026",
			"top":"4",
			"title":"My solution using one stack in one pass",
			"vote":"41",
			"content":"Since any valid parentheses sequence starts from a '(' and ends at ')', we can calculate new length when we meet a ')'. The key is to use a stack to store all the indices and the start position is always the one on top of the stack. See the code below for details.\\n\\n\\n     // Using a stack. One pass\\n        int longestValidParentheses(string s) {\\n            vector<int> stack;\\n            int maxLen = 0;\\n            for (int i = 0; i < s.size(); ++i)\\n            {\\n                if (s[i] == '(')\\n                    stack.push_back(i);\\n                else {\\n                    if (!stack.empty() && s[stack.back()] == '(') {\\n                        stack.pop_back();\\n                        int lastPos = -1;\\n                        if (!stack.empty())\\n                            lastPos = stack.back();\\n                        int curLen = i - lastPos;\\n                        maxLen = (maxLen < curLen) ? curLen : maxLen;\\n                    } else\\n                        stack.push_back(i);\\n                }\\n            }\\n            return maxLen;\\n        }"
		},
		{
			"lc_ans_id":"14256",
			"view":"2553",
			"top":"5",
			"title":"My easy O(n) java solution with explanation",
			"vote":"30",
			"content":"    public class Solution {\\n        public int longestValidParentheses(String s) {\\n            int res=0;\\n            int tep=0;\\n            Stack<Integer> s1=new Stack<>();\\n            int data[]=new int[s.length()];\\n            for(int i=0;i<s.length();i++){\\n                char c=s.charAt(i);\\n                if(c=='(') s1.push(i);\\n                else{\\n                    if(!s1.empty()){\\n                        data[i]=1;\\n                        data[s1.pop()]=1;\\n                    }\\n                }\\n            }\\n            for(int i:data){\\n                if(i==1) tep++;\\n                else {res=Math.max(tep,res);tep=0;}\\n            }\\n            return Math.max(tep,res);\\n        }\\n    }\\n\\nImaging we are coloring the original string, each substring that has valid parentheses is colored with '1' and other characters are colored by '0'.\\nFor example \"( ) ( ( ) \"would become \"11011\". Thus, the problem has converted to finding the longest subsequence that all elements are '1', which could be easily solved."
		},
		{
			"lc_ans_id":"14140",
			"view":"1893",
			"top":"6",
			"title":"Constant space, O(n) time with forward and backward pass",
			"vote":"26",
			"content":"When right parentheses are more than left parentheses in the forward pass, we can discard previous parentheses. In the backward pass, when left parentheses are more than right parentheses, we can discard previous parentheses. \\n\\n\\n    int longestValidParentheses(string s) {\\n        int longest = 0;\\n        int extra=0;\\n        int length=0;\\n        for(int i=0; i<s.size(); i++) {\\n            if(s[i] == '(') {\\n                extra++;\\n                length++;\\n            }\\n            else {\\n                if(extra>0) {\\n                    extra--;\\n                    length++;\\n                    if(extra == 0)\\n                        longest = max(longest, length);\\n                }\\n                else {\\n                    extra = 0;\\n                    length=0;\\n                }\\n            }\\n        }\\n        length = 0;\\n        extra=0;\\n        for(int i=s.size()-1; i>=0; i--) {\\n            if(s[i] == ')') {\\n                extra++;\\n                length++;\\n            }\\n            else {\\n                if(extra>0){\\n                    extra--;\\n                    length++;\\n                    if(extra == 0)\\n                        longest = max(longest, length);\\n                    \\n                }\\n                else {\\n                    extra = 0;\\n                    length=0;\\n                }\\n            }\\n        }\\n        return longest;\\n    }"
		},
		{
			"lc_ans_id":"14278",
			"view":"1383",
			"top":"7",
			"title":"Two Java solutions with explanation. Stack & DP. Short & easy to understand.",
			"vote":"18",
			"content":"// **Stack solution  10ms**  \\nThe idea is simple, we only update the result (max) when we find a \"pair\".  \\nIf we find a pair. We throw this pair away and see how big the gap is between current and previous invalid.  \\nEX: \"( )( )\"  \\nstack: -1, 0,  \\nwhen we get to index 1 \")\", the peek is \"(\" so we pop it out and see what's before \"(\".  \\nIn this example it's -1. So the gap is \"current_index\" - (-1) = 2.  \\n\\nThe idea **only update the result (max) when we find a \"pair\"** and **push -1 to stack first** covered all edge cases.  \\n\\n    public class Solution {\\n        public int longestValidParentheses(String s) {\\n            LinkedList<Integer> stack = new LinkedList<>();\\n            int result = 0;\\n            stack.push(-1);\\n            for (int i = 0; i < s.length(); i++) {\\n                if (s.charAt(i) == ')' && stack.size() > 1 && s.charAt(stack.peek()) == '(') {\\n                    stack.pop();\\n                    result = Math.max(result, i - stack.peek());\\n                } else {\\n                    stack.push(i);\\n                }\\n            }\\n            return result;\\n        }\\n    }\\n\\n\\n\\n**//DP solution  4ms**  \\nThe idea is go through the string and use DP to store the longest valid parentheses at that point.  \\ntake example \"()(())\"  \\ni :    [0,1,2,3,4,5]  \\ns :   [( ,) ,( ,( ,) ,) ]  \\nDP:[0,2,0,0,2,6]  \\n\\n1, We count all the \\u2018(\\u2018.  \\n2, If we find a \\u2018)\\u2019 and \\u2018(\\u2018 counter is not 0, we have at least a valid result size of 2. \\u201c()\"  \\n3, Check the the one before (i - 1). If DP[i - 1] is not 0 means we have something like this \\u201c(())\\u201d . This will have DP \\u201c0024\"  \\n4, We might have something before \"(())\\u201d. Take \"()(())\\u201d example, Check the i = 1 because this might be a consecutive valid string.  \\n\\n    public class Solution {\\n        public int longestValidParentheses(String s) {\\n            int[] dp = new int[s.length()];\\n            int result = 0;\\n            int leftCount = 0;\\n            for (int i = 0; i < s.length(); i++) {\\n                if (s.charAt(i) == '(') {\\n                    leftCount++;\\n                } else if (leftCount > 0){\\n                    dp[i] = dp[i - 1] + 2;\\n                    dp[i] += (i - dp[i]) >= 0 ? dp[i - dp[i]] : 0;\\n                    result = Math.max(result, dp[i]);\\n                    leftCount--;\\n                }\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"14146",
			"view":"3306",
			"top":"8",
			"title":"Simple Java solution.",
			"vote":"17",
			"content":"![enter image description here][1]\\n\\n\\n  [1]: http://s11.postimg.org/9i4ju3imr/IMG_20150202_130621.jpg\\n\\n\\n    public int longestValidParentheses(String s) {\\n        char[] S = s.toCharArray();\\n        int[] V = new int[S.length];\\n        int open = 0;\\n        int max = 0;\\n        for (int i=0; i<S.length; i++) {\\n        \\tif (S[i] == '(') open++;\\n        \\tif (S[i] == ')' && open > 0) {\\n        \\t\\tV[i] = 2 + V[i-1] + (i-2-V[i-1] > 0 ? V[i-2-V[i-1]] : 0);\\n        \\t\\topen--;\\n        \\t}\\n        \\tif (V[i] > max) max = V[i];\\n        }\\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"14131",
			"view":"1595",
			"top":"9",
			"title":"Explaining solution using Stack",
			"vote":"16",
			"content":"I have seen a lot of good answers but it is not immediately clear how they are achieving the result. I am going to make an attempt to explain my solution using a stack. Every time we encounter '(' we push the index onto the stack and when we encounter ')' we pop the stack and use the current index minus the index at the top of the stack to be the current_length. we check against the max found so far and update if needed. Here is the code\\n\\n \\n\\n    public static int longestValidParentheses(String s) {\\n    \\n    \\n            Stack<Integer> bracketStack = new Stack<Integer>();\\n            int max_len=0;\\n            int current_len=0;\\n            int last = -1;\\n            for (int i = 0; i < s.length(); i++) {\\n                if (s.charAt(i) == '(') {\\n                    \\n                        bracketStack.push(i);\\n                }\\n                else{\\n    \\n                    if(!bracketStack.isEmpty())\\n                    {\\n                        bracketStack.pop();\\n    \\n                    if(!bracketStack.isEmpty())\\n                        current_len = i-bracketStack.peek();\\n                    else\\n                        current_len=i-last;\\n                    max_len = Math.max(max_len,current_len);\\n                    }\\n                    else{\\n                        \\n                        last = i;\\n                    }\\n                }\\n    \\n            }\\n    \\n    \\n            return max_len;\\n        }"
		}
	],
	"id":"32",
	"title":"Longest Valid Parentheses",
	"content":"<p>Given a string containing just the characters <code>'('</code> and <code>')'</code>, find the length of the longest valid (well-formed) parentheses substring.\r\n</p>\r\n<p>\r\nFor <code>\"(()\"</code>, the longest valid parentheses substring is <code>\"()\"</code>, which has length = 2.\r\n</p>\r\n<p>\r\nAnother example is <code>\")()())\"</code>, where the longest valid parentheses substring is <code>\"()()\"</code>, which has length = 4.\r\n</p>",
	"frequency":"407",
	"ac_num":"116076"
}