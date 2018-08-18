{
	"difficulty":"1",
	"submit_num":"857314",
	"show_id":"20",
	"leetcode_id":"20",
	"answers":[
		{
			"lc_ans_id":"9178",
			"view":"50071",
			"top":"0",
			"title":"Short java solution",
			"vote":"270",
			"content":"    public boolean isValid(String s) {\\n\\t\\tStack<Character> stack = new Stack<Character>();\\n\\t\\tfor (char c : s.toCharArray()) {\\n\\t\\t\\tif (c == '(')\\n\\t\\t\\t\\tstack.push(')');\\n\\t\\t\\telse if (c == '{')\\n\\t\\t\\t\\tstack.push('}');\\n\\t\\t\\telse if (c == '[')\\n\\t\\t\\t\\tstack.push(']');\\n\\t\\t\\telse if (stack.isEmpty() || stack.pop() != c)\\n\\t\\t\\t\\treturn false;\\n\\t\\t}\\n\\t\\treturn stack.isEmpty();\\n\\t}"
		},
		{
			"lc_ans_id":"9248",
			"view":"34251",
			"top":"1",
			"title":"My easy to understand Java Solution with one stack",
			"vote":"87",
			"content":"    public class Solution {\\n        public boolean isValid(String s) {\\n            Stack<Character> stack = new Stack<Character>();\\n            // Iterate through string until empty\\n            for(int i = 0; i<s.length(); i++) {\\n                // Push any open parentheses onto stack\\n                if(s.charAt(i) == '(' || s.charAt(i) == '[' || s.charAt(i) == '{')\\n                    stack.push(s.charAt(i));\\n                // Check stack for corresponding closing parentheses, false if not valid\\n                else if(s.charAt(i) == ')' && !stack.empty() && stack.peek() == '(')\\n                    stack.pop();\\n                else if(s.charAt(i) == ']' && !stack.empty() && stack.peek() == '[')\\n                    stack.pop();\\n                else if(s.charAt(i) == '}' && !stack.empty() && stack.peek() == '{')\\n                    stack.pop();\\n                else\\n                    return false;\\n            }\\n            // return true if no open parentheses left in stack\\n            return stack.empty();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"9203",
			"view":"19363",
			"top":"2",
			"title":"Simple Python solution with stack",
			"vote":"60",
			"content":"    class Solution:\\n        # @return a boolean\\n        def isValid(self, s):\\n            stack = []\\n            dict = {\"]\":\"[\", \"}\":\"{\", \")\":\"(\"}\\n            for char in s:\\n                if char in dict.values():\\n                    stack.append(char)\\n                elif char in dict.keys():\\n                    if stack == [] or dict[char] != stack.pop():\\n                        return False\\n                else:\\n                    return False\\n            return stack == []\\n\\nIt's quite obvious."
		},
		{
			"lc_ans_id":"9252",
			"view":"21193",
			"top":"3",
			"title":"2ms C++ sloution",
			"vote":"48",
			"content":"Repetitive code but I guess this is clean, and easy to understand. This solution also accepts (and ignores) any characters other than parenthesis in the string. Hence, it can be used to check if the parenthesis matches in an equation for example.\\n\\n    #include <stack>\\n\\n    class Solution {\\n    public:\\n        bool isValid(string s) {\\n            stack<char> paren;\\n            for (char& c : s) {\\n                switch (c) {\\n                    case '(': \\n                    case '{': \\n                    case '[': paren.push(c); break;\\n                    case ')': if (paren.empty() || paren.top()!='(') return false; else paren.pop(); break;\\n                    case '}': if (paren.empty() || paren.top()!='{') return false; else paren.pop(); break;\\n                    case ']': if (paren.empty() || paren.top()!='[') return false; else paren.pop(); break;\\n                    default: ; // pass\\n                }\\n            }\\n            return paren.empty() ;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"9187",
			"view":"10608",
			"top":"4",
			"title":"12 lines of Java",
			"vote":"30",
			"content":"    public class Solution {\\n        public boolean isValid(String s) {\\n            Stack<Integer> p = new Stack<>();\\n            for(int i = 0; i < s.length(); i++) {\\n                int q = \"(){}[]\".indexOf(s.substring(i, i + 1));\\n                if(q % 2 == 1) {\\n                    if(p.isEmpty() || p.pop() != q - 1) return false;\\n                } else p.push(q);\\n            }\\n            return p.isEmpty();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"9341",
			"view":"3642",
			"top":"5",
			"title":"Java iterative solution beating 97%",
			"vote":"27",
			"content":"Just implement a simple stack using a char array and check that, for each closing bracket, there is its counterpart in the top of the stack.\\n\\n    public class Solution {\\n    \\tpublic boolean isValid(String s) {\\n    \\t\\tchar[] stack = new char[s.length()];\\n    \\t\\tint head = 0;\\n    \\t\\tfor(char c : s.toCharArray()) {\\n    \\t\\t\\tswitch(c) {\\n    \\t\\t\\t\\tcase '{':\\n    \\t\\t\\t\\tcase '[':\\n    \\t\\t\\t\\tcase '(':\\n    \\t\\t\\t\\t\\tstack[head++] = c;\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t\\tcase '}':\\n    \\t\\t\\t\\t\\tif(head == 0 || stack[--head] != '{') return false;\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t\\tcase ')':\\n    \\t\\t\\t\\t\\tif(head == 0 || stack[--head] != '(') return false;\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t\\tcase ']':\\n    \\t\\t\\t\\t\\tif(head == 0 || stack[--head] != '[') return false;\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn head == 0;\\n    \\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"9225",
			"view":"3924",
			"top":"6",
			"title":"[Python] is this a cheating method? accepted with 40ms, easy to understand, but",
			"vote":"26",
			"content":"    class Solution(object):\\n        def isValid(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: bool\\n            \"\"\"\\n            n = len(s)\\n            if n == 0:\\n                return True\\n            \\n            if n % 2 != 0:\\n                return False\\n                \\n            while '()' in s or '{}' in s or '[]' in s:\\n                s = s.replace('{}','').replace('()','').replace('[]','')\\n            \\n            if s == '':\\n                return True\\n            else:\\n                return False"
		},
		{
			"lc_ans_id":"9528",
			"view":"3342",
			"top":"7",
			"title":"Short, Easy to Follow 8ms Java Solution",
			"vote":"20",
			"content":"    public class Solution {\\n        public boolean isValid(String s) {\\n            int length;\\n        \\n            do {\\n                length = s.length();\\n                s = s.replace(\"()\", \"\").replace(\"{}\", \"\").replace(\"[]\", \"\");\\n            } while(length != s.length());\\n        \\n            return s.length() == 0;\\n        }\\n    }\\n\\nIn this solution you essentially can remove parentheses that you know are valid until the string is empty. If the string is not empty, that means that the parentheses were malformed."
		},
		{
			"lc_ans_id":"9222",
			"view":"2924",
			"top":"8",
			"title":"My 0ms c++ solution using stack",
			"vote":"18",
			"content":"\\n\\n    bool isValid(string s) {\\n        stack<char> st;\\n        for(char c : s){\\n            if(c == '('|| c == '{' || c == '['){\\n                st.push(c);\\n            }else{\\n                if(st.empty()) return false;\\n                if(c == ')' && st.top() != '(') return false;\\n                if(c == '}' && st.top() != '{') return false;\\n                if(c == ']' && st.top() != '[') return false;\\n                st.pop();\\n            }\\n        }\\n        return st.empty();"
		},
		{
			"lc_ans_id":"9660",
			"view":"2440",
			"top":"9",
			"title":"Sharing my simple cpp code with 2ms",
			"vote":"13",
			"content":"        class Solution {\\n        public:\\n            bool isValid(string s) {\\n                map<char, char> parenth_dict;\\n                parenth_dict['('] = ')';\\n                parenth_dict['{'] = '}';\\n                parenth_dict['['] = ']';\\n                \\n                stack<char> aux;\\n                for (int i = 0; i < s.size(); i++) {\\n                    if (s[i] == '(' || s[i] == '{' || s[i] == '[') \\n                        aux.push(s[i]);\\n                    else if (aux.empty() || parenth_dict[aux.top()] != s[i])\\n                        return false;\\n                    else\\n                        aux.pop();\\n                }\\n                \\n                return aux.empty();\\n                \\n            }\\n    \\n    };"
		}
	],
	"id":"20",
	"title":"Valid Parentheses",
	"content":"<p>Given a string containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>\r\n\r\n<p>The brackets must close in the correct order, <code>\"()\"</code> and <code>\"()[]{}\"</code> are all valid but <code>\"(]\"</code> and <code>\"([)]\"</code> are not.</p>\r\n",
	"frequency":"605",
	"ac_num":"290340"
}