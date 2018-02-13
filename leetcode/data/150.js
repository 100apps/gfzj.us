{
	"difficulty":"2",
	"submit_num":"385310",
	"show_id":"150",
	"leetcode_id":"150",
	"answers":[
		{
			"lc_ans_id":"47429",
			"view":"10666",
			"top":"0",
			"title":"6/\\uff08-132\\uff09= 0 or -1",
			"vote":"59",
			"content":"when I test [\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"], \\nin this program, the result I got is 12, I think I am right. Because when I calculate 6/(-132) = -1, not 0, so i think the result is 12 not 22."
		},
		{
			"lc_ans_id":"47430",
			"view":"17285",
			"top":"1",
			"title":"[Java] Accepted Code: Stack implementation.",
			"vote":"49",
			"content":"Hi everyone.  \\nThe Reverse Polish Notation is a stack of operations, thus, I decided to use java.util.Stack to solve this problem. As you can see, I add every token as an integer in the stack, unless it's an operation. In that case, I pop two elements from the stack and then save the result back to it. After all operations are done through, the remaining element in the stack will be the result.  \\nAny comments or improvements are welcome.\\n\\nCheers.\\n\\n    import java.util.Stack;\\n    \\n    public class Solution {\\n        public int evalRPN(String[] tokens) {\\n            int a,b;\\n    \\t\\tStack<Integer> S = new Stack<Integer>();\\n    \\t\\tfor (String s : tokens) {\\n    \\t\\t\\tif(s.equals(\"+\")) {\\n    \\t\\t\\t\\tS.add(S.pop()+S.pop());\\n    \\t\\t\\t}\\n    \\t\\t\\telse if(s.equals(\"/\")) {\\n    \\t\\t\\t\\tb = S.pop();\\n    \\t\\t\\t\\ta = S.pop();\\n    \\t\\t\\t\\tS.add(a / b);\\n    \\t\\t\\t}\\n    \\t\\t\\telse if(s.equals(\"*\")) {\\n    \\t\\t\\t\\tS.add(S.pop() * S.pop());\\n    \\t\\t\\t}\\n    \\t\\t\\telse if(s.equals(\"-\")) {\\n    \\t\\t\\t\\tb = S.pop();\\n    \\t\\t\\t\\ta = S.pop();\\n    \\t\\t\\t\\tS.add(a - b);\\n    \\t\\t\\t}\\n    \\t\\t\\telse {\\n    \\t\\t\\t\\tS.add(Integer.parseInt(s));\\n    \\t\\t\\t}\\n    \\t\\t}\\t\\n    \\t\\treturn S.pop();\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"47446",
			"view":"5577",
			"top":"2",
			"title":"Accepted clean Java solution",
			"vote":"29",
			"content":"    public int evalRPN(String[] a) {\\n      Stack<Integer> stack = new Stack<Integer>();\\n      \\n      for (int i = 0; i < a.length; i++) {\\n        switch (a[i]) {\\n          case \"+\":\\n            stack.push(stack.pop() + stack.pop());\\n            break;\\n              \\n          case \"-\":\\n            stack.push(-stack.pop() + stack.pop());\\n            break;\\n              \\n          case \"*\":\\n            stack.push(stack.pop() * stack.pop());\\n            break;\\n\\n          case \"/\":\\n            int n1 = stack.pop(), n2 = stack.pop();\\n            stack.push(n2 / n1);\\n            break;\\n              \\n          default:\\n            stack.push(Integer.parseInt(a[i]));\\n        }\\n      }\\n      \\n      return stack.pop();\\n    }"
		},
		{
			"lc_ans_id":"47440",
			"view":"4681",
			"top":"3",
			"title":"Accepted C++ recursive solution (56 ms)  with explanation. Simplest possible?",
			"vote":"24",
			"content":"Algorithm:\\n1) pop string from the end of the vector\\n2) if it's number, just return it\\n3) if it's operation, call function recursively for 2nd operand and 1st \\n\\n    int evalRPN(vector<string> &n) {\\n        string s = n.back(); n.pop_back();\\n        if ( s== \"*\" || s==\"/\" || s==\"+\" || s == \"-\" ){\\n            int r2 = evalRPN(n);\\n            int r1 = evalRPN(n);\\n            if ( s==\"*\") return r1*r2;\\n            if ( s==\"/\") return r1/r2;\\n            if ( s==\"+\") return r1+r2;\\n            if ( s==\"-\") return r1-r2;\\n        }\\n        else\\n            return atoi(s.c_str());\\n    }"
		},
		{
			"lc_ans_id":"47444",
			"view":"3283",
			"top":"4",
			"title":"Python solution with comments (don't use eval() function).",
			"vote":"21",
			"content":"\\n    def evalRPN(self, tokens):\\n        stack = []\\n        for t in tokens:\\n            if t not in [\"+\", \"-\", \"*\", \"/\"]:\\n                stack.append(int(t))\\n            else:\\n                r, l = stack.pop(), stack.pop()\\n                if t == \"+\":\\n                    stack.append(l+r)\\n                elif t == \"-\":\\n                    stack.append(l-r)\\n                elif t == \"*\":\\n                    stack.append(l*r)\\n                else:\\n                    # here take care of the case like \"1/-22\",\\n                    # in Python 2.x, it returns -1, while in \\n                    # Leetcode it should return 0\\n                    if l*r < 0 and l % r != 0:\\n                        stack.append(l/r+1)\\n                    else:\\n                        stack.append(l/r)\\n        return stack.pop()"
		},
		{
			"lc_ans_id":"47514",
			"view":"1491",
			"top":"5",
			"title":"Fancy C++ lambda expression solution",
			"vote":"20",
			"content":"    class Solution {\\n    public:\\n        int evalRPN(vector<string>& tokens) {\\n            unordered_map<string, function<int (int, int) > > map = {\\n                { \"+\" , [] (int a, int b) { return a + b; } },\\n                { \"-\" , [] (int a, int b) { return a - b; } },\\n                { \"*\" , [] (int a, int b) { return a * b; } },\\n                { \"/\" , [] (int a, int b) { return a / b; } }\\n            };\\n            std::stack<int> stack;\\n            for (string& s : tokens) {\\n                if (!map.count(s)) {\\n                    stack.push(stoi(s));\\n                } else {\\n                    int op1 = stack.top();\\n                    stack.pop();\\n                    int op2 = stack.top();\\n                    stack.pop();\\n                    stack.push(map[s](op2, op1));\\n                }\\n            }\\n            return stack.top();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"47481",
			"view":"1723",
			"top":"6",
			"title":"A simple Python solution - O(n) 72ms",
			"vote":"9",
			"content":"    class Solution:\\n        # @param {string[]} tokens\\n        # @return {integer}\\n        def __init__(self):\\n            self.operators = {\\n                '+': lambda y, x: x + y,\\n                '-': lambda y, x: x - y,\\n                '*': lambda y, x: x * y,\\n                '/': lambda y, x: int(operator.truediv(x, y))\\n            }\\n    \\n        def evalRPN(self, tokens):\\n            if not tokens:\\n                return 0\\n    \\n            stack = []\\n    \\n            for token in tokens:\\n                if token in self.operators:\\n                    stack.append(self.operators[token](stack.pop(), stack.pop()))\\n                else:\\n                    stack.append(int(token))\\n    \\n            return stack[0]"
		},
		{
			"lc_ans_id":"47477",
			"view":"1118",
			"top":"7",
			"title":"JAVA--6ms---beats 99.64% !",
			"vote":"6",
			"content":" \\n6MS---JAVA\\n \\n    public int evalRPN(String[] tokens) {\\n     int[] ls = new int[tokens.length/2+1];\\n        int index = 0;\\n        for (String token : tokens) {\\n            switch (token) {\\n                case \"+\":\\n                    ls[index - 2] = ls[index - 2] + ls[index - 1];\\n                    index--;\\n                    break;\\n                case \"-\":\\n                    ls[index - 2] = ls[index - 2] - ls[index - 1];\\n                    index--;\\n                    break;\\n                case \"*\":\\n                    ls[index - 2] = ls[index - 2] * ls[index - 1];\\n                    index--;\\n                    break;\\n                case \"/\":\\n                    ls[index - 2] = ls[index - 2] / ls[index - 1];\\n                    index--;\\n                    break;\\n                default:\\n                    ls[index++] = Integer.parseInt(token);\\n                    break;\\n            }\\n        }\\n        return ls[0];\\n    }"
		},
		{
			"lc_ans_id":"47544",
			"view":"1616",
			"top":"8",
			"title":"Challenge me, neat C++ solution, could be simpler?",
			"vote":"6",
			"content":"    int evalRPN(vector<string>& tokens) {\\n        stack<int> stn;\\n        for(auto s:tokens) {\\n            if(s.size()>1 || isdigit(s[0])) stn.push(stoi(s));\\n            else {\\n                auto x2=stn.top(); stn.pop();\\n                auto x1=stn.top(); stn.pop();\\n                switch(s[0]) {\\n                    case '+': x1+=x2; break;\\n                    case '-': x1-=x2; break;\\n                    case '*': x1*=x2; break;\\n                    case '/': x1/=x2; break;\\n                }\\n                stn.push(x1);\\n            }\\n        }\\n        return stn.top();\\n    }"
		},
		{
			"lc_ans_id":"47558",
			"view":"2101",
			"top":"9",
			"title":"Accepted solution in C++",
			"vote":"6",
			"content":"    class Solution {\\n    public:\\n        int evalRPN(vector<string> &tokens) {\\n            stack<int> st;\\n            int s1,s2;\\n            s1=s2=0;\\n            int res=0;\\n            for(vector<string>::iterator iter=tokens.begin();iter!=tokens.end();iter++)\\n            {\\n                    if (*iter == \"+\")\\n                    {\\n                        s1=st.top();\\n                        st.pop();\\n                        s2=st.top();\\n                        st.pop();\\n                       res=s1+s2;\\n                       st.push(res);\\n                    }\\n                       \\n                    else if (*iter == \"-\")\\n                    {\\n                        s1=st.top();\\n                        st.pop();\\n                        s2=st.top();\\n                        st.pop();\\n                       res=s2-s1;\\n                       st.push(res);\\n                    }\\n                    else if (*iter == \"*\")\\n                    {\\n                        s1=st.top();\\n                        st.pop();\\n                        s2=st.top();\\n                        st.pop();\\n                       res=s1*s2;\\n                       st.push(res);\\n                    }\\n                    else if (*iter== \"/\")\\n                    {\\n                        s1=st.top();\\n                        st.pop();\\n                        s2=st.top();\\n                        st.pop();\\n                        res=s2/s1;\\n                        st.push(res);\\n                    }\\n                    else \\n                    {\\n                        st.push(atoi((*iter).c_str()));\\n                    }\\n                }\\n                return st.top();\\n    \\n                \\n            }\\n            \\n    };"
		}
	],
	"id":"150",
	"title":"Evaluate Reverse Polish Notation",
	"content":"<p>\r\nEvaluate the value of an arithmetic expression in <a href=\"http://en.wikipedia.org/wiki/Reverse_Polish_notation\">Reverse Polish Notation</a>.\r\n</p>\r\n\r\n<p>\r\nValid operators are <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. Each operand may be an integer or another expression.\r\n</p>\r\n\r\n<p>\r\nSome examples:<br>\r\n<pre>\r\n  [\"2\", \"1\", \"+\", \"3\", \"*\"] -> ((2 + 1) * 3) -> 9\r\n  [\"4\", \"13\", \"5\", \"/\", \"+\"] -> (4 + (13 / 5)) -> 6\r\n</pre>\r\n</p>",
	"frequency":"526",
	"ac_num":"108109"
}