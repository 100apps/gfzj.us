{
	"difficulty":"2",
	"submit_num":"405934",
	"show_id":"71",
	"leetcode_id":"71",
	"answers":[
		{
			"lc_ans_id":"25680",
			"view":"17996",
			"top":"0",
			"title":"C++ 10-lines solution",
			"vote":"137",
			"content":"C++ also have  *getline* which acts like Java's *split*. I guess the code can comment itself.\\n\\n    string simplifyPath(string path) {\\n        string res, tmp;\\n        vector<string> stk;\\n        stringstream ss(path);\\n        while(getline(ss,tmp,'/')) {\\n            if (tmp == \"\" or tmp == \".\") continue;\\n            if (tmp == \"..\" and !stk.empty()) stk.pop_back();\\n            else if (tmp != \"..\") stk.push_back(tmp);\\n        }\\n        for(auto str : stk) res += \"/\"+str;\\n        return res.empty() ? \"/\" : res;\\n    }"
		},
		{
			"lc_ans_id":"25686",
			"view":"24526",
			"top":"1",
			"title":"Java 10-lines solution with stack",
			"vote":"107",
			"content":"Hi guys!\\n\\nThe main idea is to push to the stack every valid file name (not in {\"\",\".\",\"..\"}), popping only if there's smth to pop and we met \"..\". I don't feel like the code below needs any additional comments.\\n\\n    public String simplifyPath(String path) {\\n        Deque<String> stack = new LinkedList<>();\\n        Set<String> skip = new HashSet<>(Arrays.asList(\"..\",\".\",\"\"));\\n        for (String dir : path.split(\"/\")) {\\n            if (dir.equals(\"..\") && !stack.isEmpty()) stack.pop();\\n            else if (!skip.contains(dir)) stack.push(dir);\\n        }\\n        String res = \"\";\\n        for (String dir : stack) res = \"/\" + dir + res;\\n        return res.isEmpty() ? \"/\" : res;\\n    }\\n\\nHope it helps!"
		},
		{
			"lc_ans_id":"25678",
			"view":"8497",
			"top":"2",
			"title":"Can someone please explain what does simplify means in this context?",
			"vote":"57",
			"content":"Hi, I need more explanation about the question, how does the question define simplify here?"
		},
		{
			"lc_ans_id":"25691",
			"view":"4532",
			"top":"3",
			"title":"9 lines of Python code",
			"vote":"26",
			"content":"    class Solution(object):\\n        def simplifyPath(self, path):\\n            places = [p for p in path.split(\"/\") if p!=\".\" and p!=\"\"]\\n            stack = []\\n            for p in places:\\n                if p == \"..\":\\n                    if len(stack) > 0:\\n                        stack.pop()\\n                else:\\n                    stack.append(p)\\n            return \"/\" + \"/\".join(stack)"
		},
		{
			"lc_ans_id":"25773",
			"view":"7282",
			"top":"4",
			"title":"My O(n) AC code . just need to handle two special cases.",
			"vote":"18",
			"content":" 1. traverse the string to record each folder name.\\n 2. two special cases:\\n\\na.double dot:pop one.\\n  \\nb.single dot: do nothing (don`t push it).\\n\\n\\n\\n\\n    string simplifyPath(string path) {\\n    \\tvector<string>   nameVect;\\n    \\tstring name;\\n    \\t\\n    \\tpath.push_back('/');\\n    \\tfor(int i=0;i<path.size();i++){\\n    \\t\\tif(path[i]=='/'){\\n    \\t\\t\\tif(name.size()==0)continue;\\n    \\t\\t\\tif(name==\"..\"){\\t\\t//special case 1\\uff1adouble dot\\uff0cpop dir\\n    \\t\\t\\t     if(nameVect.size()>0)nameVect.pop_back();\\n    \\t\\t\\t}else if(name==\".\"){//special case 2:singel dot\\uff0cdon`t push\\n    \\t\\t\\t}else{\\t\\t\\t\\n    \\t\\t\\t\\tnameVect.push_back(name);\\n    \\t\\t\\t}\\n    \\t\\t\\tname.clear();\\n    \\t\\t}else{\\n    \\t\\t\\tname.push_back(path[i]);//record the name\\n    \\t\\t}\\n    \\t}\\n    \\n    \\tstring result;\\n    \\tif(nameVect.empty())return \"/\";\\n    \\tfor(int i=0;i<nameVect.size();i++){\\n    \\t\\tresult.append(\"/\"+nameVect[i]);\\n    \\t}\\n    \\treturn result;\\n    }"
		},
		{
			"lc_ans_id":"25704",
			"view":"1377",
			"top":"5",
			"title":"Share  my 8ms Java solution",
			"vote":"9",
			"content":"\\tpublic String simplifyPath(String path) {\\n\\t\\tString[] dir = path.split(\"/\");\\n\\t\\tString[] stack = new String[dir.length];\\n\\t\\tint ptr = 0;\\n\\t\\tfor(int i = 0; i < dir.length; i++){\\n\\t\\t\\tif(dir[i].equals(\".\") || dir[i].equals(\"\")){\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\t}else if(dir[i].equals(\"..\")){\\n\\t\\t\\t\\tif(ptr > 0) ptr--;\\n\\t\\t\\t}else{\\n\\t\\t\\t\\tstack[ptr] = dir[i];\\n\\t\\t\\t\\tptr++;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tStringBuilder result = new StringBuilder();\\n\\t\\tfor(int i = 0; i < ptr; i++){\\n\\t\\t\\tresult.append(\"/\");\\n\\t\\t\\tresult.append(stack[i]);\\n\\t\\t}\\n\\t\\treturn result.length() == 0 ? \"/\" : result.toString();\\n\\t}"
		},
		{
			"lc_ans_id":"25725",
			"view":"1035",
			"top":"6",
			"title":"Accepted solution using Deque",
			"vote":"8",
			"content":"I think using Deque is probably the most intuitive way to solve this problem.\\n\\n    /**\\n     * Deque of strings (directories).\\n     * iterate path:\\n     *  if \"/\", continue,\\n     *  if \".\", conitnue,\\n     *  if \"..\", poll last,\\n     *  else, add a new directory\\n     * in the end, build result from deque.\\n     */\\n    public String simplifyPath(String path) {\\n        Deque<String> deque = new LinkedList<String>();\\n        String[] splits = path.split(\"/\");\\n        for (String split : splits) {\\n            // CATCH: must use \"equals()\" instead of \"==\",\\n            // because 'split' is a variable!\\n            // Also, 'split' could be empty string.\\n            if (split.equals(\"\"))\\n                continue;\\n            else if (split.equals(\".\"))\\n                continue;\\n            else if (split.equals(\"..\"))\\n                deque.pollLast();\\n            else\\n                deque.addLast(split);\\n        }\\n        StringBuilder builder = new StringBuilder();\\n        while (!deque.isEmpty()) {\\n            String s = deque.pollFirst();\\n            builder.append(\"/\").append(s);\\n        }\\n        if (builder.length() == 0)\\n            return \"/\";\\n        return builder.toString();\\n    }"
		},
		{
			"lc_ans_id":"25841",
			"view":"1939",
			"top":"7",
			"title":"Don't understand the testcase \"/abc/...\"",
			"vote":"8",
			"content":"My code failed at the test case \"/abc/...\".\\n\\nThe expected output is \"/abc/...\".\\n\\nBut I think it may be \"/...\".\\n\\nCould anybody who have passed this one tell me why it is \"/abc/...\"?"
		},
		{
			"lc_ans_id":"25778",
			"view":"725",
			"top":"8",
			"title":"Java easy to understand Stack solution.",
			"vote":"7",
			"content":"    public String simplifyPath(String path) {\\n        Stack<String> stack = new Stack<>();\\n        String[] p = path.split(\"/\");\\n        for (int i = 0; i < p.length; i++) {\\n            if (!stack.empty() && p[i].equals(\"..\"))\\n                stack.pop();\\n            else if (!p[i].equals(\".\") && !p[i].equals(\"\") && !p[i].equals(\"..\"))\\n                stack.push(p[i]);\\n        }\\n        List<String> list = new ArrayList(stack);\\n        return \"/\"+String.join(\"/\", list);\\n    }"
		},
		{
			"lc_ans_id":"25779",
			"view":"800",
			"top":"9",
			"title":"9-line Python solution, easy to understand",
			"vote":"7",
			"content":"    def simplifyPath(self, path):\\n        stack = []\\n        for token in path.split('/'):\\n            if token in ('', '.'):\\n                pass\\n            elif token == '..':\\n                if stack: stack.pop()\\n            else:\\n                stack.append(token)\\n        return '/' + '/'.join(stack)"
		}
	],
	"id":"71",
	"title":"Simplify Path",
	"content":"<p>Given an absolute path for a file (Unix-style), simplify it.</p>\r\n\r\n<p>For example,<br />\r\n<b>path</b> = <code>\"/home/\"</code>, => <code>\"/home\"</code><br />\r\n<b>path</b> = <code>\"/a/./b/../../c/\"</code>, => <code>\"/c\"</code><br />\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show corner cases.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Corner Cases:</b>\r\n\r\n<p>\r\n<ul>\r\n<li>Did you consider the case where <b>path</b> = <code>\"/../\"</code>?<br />\r\nIn this case, you should return <code>\"/\"</code>.</li>\r\n<li>Another corner case is the path might contain multiple slashes <code>'/'</code> together, such as <code>\"/home//foo/\"</code>.<br />\r\nIn this case, you should ignore redundant slashes and return <code>\"/home/foo\"</code>.</li>\r\n</p>\r\n</div>",
	"frequency":"354",
	"ac_num":"105949"
}