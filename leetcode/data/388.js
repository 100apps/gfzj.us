{
	"difficulty":"2",
	"submit_num":"111951",
	"show_id":"388",
	"leetcode_id":"388",
	"answers":[
		{
			"lc_ans_id":"86615",
			"view":"35534",
			"top":"0",
			"title":"9 lines 4ms Java solution",
			"vote":"118",
			"content":"```\\npublic int lengthLongestPath(String input) {\\n        Deque<Integer> stack = new ArrayDeque<>();\\n        stack.push(0); // \"dummy\" length\\n        int maxLen = 0;\\n        for(String s:input.split(\"\\\\n\")){\\n            int lev = s.lastIndexOf(\"\\\\t\")+1; // number of \"\\\\t\"\\n            while(lev+1<stack.size()) stack.pop(); // find parent\\n            int len = stack.peek()+s.length()-lev+1; // remove \"/t\", add\"/\"\\n            stack.push(len);\\n            // check if it is file\\n            if(s.contains(\".\")) maxLen = Math.max(maxLen, len-1); \\n        }\\n        return maxLen;\\n    }\\n```\\n\\nAn even shorter and faster solution using array instead of stack:\\n```\\npublic int lengthLongestPath(String input) {\\n    String[] paths = input.split(\"\\\\n\");\\n    int[] stack = new int[paths.length+1];\\n    int maxLen = 0;\\n    for(String s:paths){\\n        int lev = s.lastIndexOf(\"\\\\t\")+1, curLen = stack[lev+1] = stack[lev]+s.length()-lev+1;\\n        if(s.contains(\".\")) maxLen = Math.max(maxLen, curLen-1);\\n    }\\n    return maxLen;\\n}\\n```"
		},
		{
			"lc_ans_id":"86619",
			"view":"13782",
			"top":"1",
			"title":"Simple Python solution",
			"vote":"83",
			"content":"The number of tabs is my `depth` and for each depth I store the current path length.\\n\\n    def lengthLongestPath(self, input):\\n        maxlen = 0\\n        pathlen = {0: 0}\\n        for line in input.splitlines():\\n            name = line.lstrip('\\\\t')\\n            depth = len(line) - len(name)\\n            if '.' in name:\\n                maxlen = max(maxlen, pathlen[depth] + len(name))\\n            else:\\n                pathlen[depth + 1] = pathlen[depth] + len(name) + 1\\n        return maxlen"
		},
		{
			"lc_ans_id":"86636",
			"view":"5270",
			"top":"2",
			"title":"This problem is not well-defined. It should state that 4-space is considered as a TAB under certain situation.",
			"vote":"50",
			"content":"After many try-and-error, I finally figured out the solution is required to handle the blank spaces in a special way. I think it should be stated in the problem statement, not just let people guess this from the expected answers. This will waste many people a lot of time...."
		},
		{
			"lc_ans_id":"86625",
			"view":"8836",
			"top":"3",
			"title":"Simple C++ O(n) Solution,0ms",
			"vote":"23",
			"content":"```class Solution {\\npublic:\\n    int lengthLongestPath(string input) {\\n        int maxi=0,count=0,ln=1;\\n        bool isFile=false;\\n        vector<int> level(200);\\n        level[0]=0;\\n        for(int i=0,fin=input.size();i<fin;++i){\\n            //find which level\\n            while(input[i]=='\\\\t'){\\n                ++ln;++i;\\n            }\\n            //read file name\\n            while(input[i]!='\\\\n'&&i<fin){\\n                if(input[i]=='.')isFile=true;\\n                ++count;++i;\\n            }\\n            //calculate\\n            if(isFile){\\n                maxi=max(maxi,level[ln-1]+count);\\n            }\\n            else{\\n                level[ln]=level[ln-1]+count+1;// 1 means '/'\\n            }\\n            //reset\\n            count=0;ln=1;isFile=false;\\n        }\\n        return maxi;\\n    }\\n};"
		},
		{
			"lc_ans_id":"86666",
			"view":"9571",
			"top":"4",
			"title":"Java O(n) Solution Using Stack",
			"vote":"23",
			"content":"The depth of the directory/file is calculated by counting how many \"\\\\t\"s are there.\\nThe time complexity is O(n) because each substring in the input string only goes into the stack once, and pops out from the stack once.\\n```\\npublic class Solution {\\n    public int lengthLongestPath(String input) {\\n        String[] tokens = input.split(\"\\\\n\");\\n        int result = 0;\\n        int curLen = 0;\\n        Stack<Integer> stack = new Stack<>();\\n\\n        for (String s : tokens) {\\n            int level = countLevel(s);\\n\\n            // if current directory/file depth is lower that the top directory/file on the stack, pop from stack \\n            while (stack.size() > level) {\\n                curLen -= stack.pop();\\n            }\\n\\n            // +1 here because a \"/\" needs to be counted following each diretory\\n            int len = s.replaceAll(\"\\\\t\", \"\").length() + 1;\\n            curLen += len;\\n\\n            // if s contains \".\", we have found a file!\\n            if (s.contains(\".\")) {\\n                result = curLen - 1 > result ? curLen - 1 : result;\\n            }\\n            stack.add(len);\\n        }\\n        return result;\\n    }\\n    \\n    private int countLevel(String s) {\\n        String cur = s.replaceAll(\"\\\\t\", \"\");\\n        return s.length() - cur.length();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"86719",
			"view":"3571",
			"top":"5",
			"title":"Two different solutions in java using stack and hashmap",
			"vote":"15",
			"content":"`\"dir\\\\n\\\\tsubdir1\\\\n\\\\t\\\\tfile1.ext\\\\n\\\\t\\\\tsubsubdir1\\\\n\\\\tsubdir2\\\\n\\\\t\\\\tsubsubdir2\\\\n\\\\t\\\\t\\\\tfile2.ext\"`\\nthe root dir `dir` is in level 1, we push a initial value `0` into stack first indicating a not existing file with length 0\\n```\\n    public int lengthLongestPath(String input) {\\n        ArrayDeque<Integer> stack = new ArrayDeque<>();\\n        stack.push(0);\\n        int result = 0;\\n        for (String s : input.split(\"\\\\n\")) {\\n            int level = s.lastIndexOf('\\\\t') + 1;\\n            int len = s.length() - level;\\n            while (stack.size() > level + 1) {\\n                stack.pop();\\n            }\\n            if (s.contains(\".\")) {\\n                result = Math.max(result, stack.peek() + len);\\n            } else {\\n                stack.push(stack.peek() + len + 1);\\n            }\\n        }\\n        return result;\\n    }\\n```\\nhashMap stores (level, the length of the path up to level `level`) pairs. By default, we use a (0,0) to initialize the hashmap. But for example `\"dir\\\\n\\\\tsubdir1\\\\n\\\\t\\\\tfile1.ext\\\\n\\\\t\\\\tsubsubdir1\\\\n\\\\tsubdir2\\\\n\\\\t\\\\tsubsubdir2\\\\n\\\\t\\\\t\\\\tfile2.ext\"`.\\ndir is in level 1, not 0. subdir1 is in level 2, so on...\\nwe update the hashMap using **hashMap.get(level) + len + 1** because the current level is level+1, previous level is level, we `+1` because the additional path separator char `\\\\` , if s contains `.` , we update the current max length\\nHope helps\\n\\n```\\n    public int lengthLongestPath(String input) {\\n        HashMap<Integer, Integer> hashMap = new HashMap<>();\\n        hashMap.put(0, 0);\\n        int result = 0;\\n        for (String s : input.split(\"\\\\n\")) {\\n            int level = s.lastIndexOf('\\\\t') + 1;\\n            int len = s.length() - level;\\n            if (s.contains(\".\")) {\\n                result = Math.max(result, hashMap.get(level) + len);\\n            } else {\\n                hashMap.put(level + 1, hashMap.get(level) + len + 1);\\n            }\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"86649",
			"view":"703",
			"top":"6",
			"title":"What is purpose of weird test cases?",
			"vote":"12",
			"content":"I am not sure if testing code against ```\"dir\\\\n    file.txt\"``` will imply any intelligence. What is the purpose of such cases? Do they really occur in tab organized directory structure file? Dear problem setters, think about it OR please clarify me here. Thanks."
		},
		{
			"lc_ans_id":"86793",
			"view":"2351",
			"top":"7",
			"title":"Very concise 5-liner in Python, 52ms",
			"vote":"12",
			"content":"Split the string using '\\\\n' to get all directories and files. For each item, the number of '\\\\t' is how deep the item is.\\n\\nList slice assignment is our good friend to build the whole path.\\n\\nThanks to @StefanPochmann , I have corrected the time complexity of the code. Here is the O(n) version:\\n```\\nclass Solution(object):\\n    def lengthLongestPath(self, input):\\n        path, maxLen = [], 0\\n        for s in input.split('\\\\n'):\\n            path[s.count('\\\\t'):] = [len(s.strip('\\\\t'))]\\n            maxLen = max(maxLen, sum(path)+len(path)-1 if '.' in s else 0)\\n        return maxLen\\n```"
		},
		{
			"lc_ans_id":"86628",
			"view":"1515",
			"top":"8",
			"title":"4-space considered as a TAB is totally confusing, which makes the string ambiguous and test case wrong.",
			"vote":"10",
			"content":"There are two test cases in OJ: \"dir\\\\n(4-space)file.txt\" and \"dir\\\\n(4-space)(4-space)file.txt\". In the first case, the 4-space is considered as a tab, so that the official answer should be 12. In the second case, the first 4-space is considered as a tab and the second 4-space is considered parts of the file name, so that it should return 16.\\n       \\nHere comes a problem. Suggest the input String is \"dir\\\\n\\\\tsubdir\\\\n(4-space)(4-space)file.txt\".Should I consider the String \"dir\\\\n\\\\tsubdir\\\\n\\\\t(4-space)file.txt\" or \"dir\\\\n\\\\tsubdir\\\\n\\\\t\\\\tfile.txt\"? Actually, the funniest part is, the OJ treats it neither of them. OJ will only return the length of \"(4-space)(4-space)file.txt\", which is 16. That means, if there is a input String \"dirrrrrrrrrrrrrrrrrr\\\\n\\\\tsubdir\\\\n(4-space)(4-space)file.txt\", it also returns 16.\\n\\nThat is why I think 4-space considered as a TAB is totally confusing. It seems the author only consider \"dir\\\\n(4-space)file.txt\" and \"dir\\\\n(4-space)(4-space)file.txt\" those 2 conditions without sub-dir."
		},
		{
			"lc_ans_id":"86761",
			"view":"993",
			"top":"9",
			"title":"If you're getting \"ValueError: Unterminated string\", here's why",
			"vote":"10",
			"content":"If you're getting something like this\\n```\\nLine 42: ValueError: Unterminated string starting at: line 1 column 1 (char 0)\\n```\\nwhen clicking `Run Code`, LeetCode OJ has a problem.  Open up the the Custom Testcase, and you'll see that OJ has converted `\\\\n` and `\\\\t` into whitespace, which is mucking things up.  Copy-paste the strings in the statement of the problem in, and it'll work."
		}
	],
	"id":"388",
	"title":"Longest Absolute File Path",
	"content":"<p>Suppose we abstract our file system by a string in the following manner:</p>\r\n\r\n<p>The string <code>\"dir\\n\\tsubdir1\\n\\tsubdir2\\n\\t\\tfile.ext\"</code> represents:</p>\r\n\r\n<pre>dir\r\n    subdir1\r\n    subdir2\r\n        file.ext\r\n</pre>\r\n\r\n<p>The directory <code>dir</code> contains an empty sub-directory <code>subdir1</code> and a sub-directory <code>subdir2</code> containing a file <code>file.ext</code>.</p>\r\n\r\n<p>The string <code>\"dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext\"</code> represents:</p>\r\n\r\n<pre>dir\r\n    subdir1\r\n        file1.ext\r\n        subsubdir1\r\n    subdir2\r\n        subsubdir2\r\n            file2.ext\r\n</pre>\r\n\r\n<p>The directory <code>dir</code> contains two sub-directories <code>subdir1</code> and <code>subdir2</code>. <code>subdir1</code> contains a file <code>file1.ext</code> and an empty second-level sub-directory <code>subsubdir1</code>. <code>subdir2</code> contains a second-level sub-directory <code>subsubdir2</code> containing a file <code>file2.ext</code>.</p>\r\n\r\n<p>We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is <code>\"dir/subdir2/subsubdir2/file2.ext\"</code>, and its length is <code>32</code> (not including the double quotes).</p>\r\n\r\n<p>Given a string representing the file system in the above format, return the length of the longest absolute path to file in the abstracted file system. If there is no file in the system, return <code>0</code>.</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>The name of a file contains at least a <code>.</code> and an extension.</li>\r\n<li>The name of a directory or sub-directory will not contain a <code>.</code>.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>Time complexity required: <code>O(n)</code> where <code>n</code> is the size of the input string.</p>\r\n\r\n<p>Notice that <code>a/aa/aaa/file1.txt</code> is not the longest file path, if there is another path <code>aaaaaaaaaaaaaaaaaaaaa/sth.png</code>.</p>",
	"frequency":"574",
	"ac_num":"41712"
}