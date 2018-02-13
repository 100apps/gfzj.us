{
	"difficulty":"2",
	"submit_num":"26233",
	"show_id":"636",
	"leetcode_id":"636",
	"answers":[
		{
			"lc_ans_id":"105062",
			"view":"6488",
			"top":"0",
			"title":"Java Stack Solution O(n) Time O(n) Space",
			"vote":"22",
			"content":"```\\npublic int[] exclusiveTime(int n, List<String> logs) {\\n    int[] res = new int[n];\\n    Stack<Integer> stack = new Stack<>();\\n    int prevTime = 0;\\n    for (String log : logs) {\\n        String[] parts = log.split(\":\");\\n        if (!stack.isEmpty()) res[stack.peek()] +=  Integer.parseInt(parts[2]) - prevTime; \\n        prevTime = Integer.parseInt(parts[2]);\\n        if (parts[1].equals(\"start\")) stack.push(Integer.parseInt(parts[0]));\\n        else {\\n            res[stack.pop()]++;\\n            prevTime++;\\n        }\\n    }\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"105100",
			"view":"1790",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"18",
			"content":"We examine two approaches - both will be stack based.\\n\\nIn a more conventional approach, let's look between adjacent events, with duration ```time - prev_time```.  If we started a function, and we have a function in the background, then it was running during this time.  Otherwise, we ended the function that is most recent in our stack.\\n```\\ndef exclusiveTime(self, N, logs):\\n    ans = [0] * N\\n    stack = []\\n    prev_time = 0\\n\\n    for log in logs:\\n        fn, typ, time = log.split(':')\\n        fn, time = int(fn), int(time)\\n\\n        if typ == 'start':\\n            if stack:\\n                ans[stack[-1]] += time - prev_time \\n            stack.append(fn)\\n            prev_time = time\\n        else:\\n            ans[stack.pop()] += time - prev_time + 1\\n            prev_time = time + 1\\n\\n    return ans\\n```\\n\\n<hr>\\n\\nIn the second approach, we try to record the \"penalty\" a function takes.  For example, if function 0 is running at time [1, 10], and function 1 runs at time [3, 5], then we know function 0 ran for 10 units of time, less a 3 unit penalty.  The idea is this: **Whenever a function completes using T time, any functions that were running in the background take a penalty of T.**  Here is a slow version to illustrate the idea:\\n\\n```\\ndef exclusiveTime(self, N, logs):\\n    ans = [0] * N\\n    #stack = SuperStack()\\n    stack = []\\n\\n    for log in logs:\\n        fn, typ, time = log.split(':')\\n        fn, time = int(fn), int(time)\\n\\n        if typ == 'start':\\n            stack.append(time)\\n        else:\\n            delta = time - stack.pop() + 1\\n            ans[fn] += delta\\n            #stack.add_across(delta)\\n            stack = [t+delta for t in stack] #inefficient\\n\\n    return ans\\n```\\n\\nThis code already ACs, but it isn't efficient.  However, we can easily upgrade our stack to a \"superstack\" that supports ```self.add_across```: addition over the whole array in constant time.\\n\\n```\\nclass SuperStack(object):\\n    def __init__(self):\\n        self.A = []\\n    def append(self, x):\\n        self.A.append([x, 0])\\n    def pop(self):\\n        x, y = self.A.pop()\\n        if self.A:\\n            self.A[-1][1] += y\\n        return x + y\\n    def add_across(self, y):\\n        if self.A:\\n            self.A[-1][1] += y\\n```"
		},
		{
			"lc_ans_id":"105084",
			"view":"1551",
			"top":"2",
			"title":"How is function 1 executing 4 units of time?",
			"vote":"14",
			"content":"0----1----2----3----4----5----6\\n|----|----|----|----|----|----|----|\\n\\nfun0 - 0 to 1, 1 to 2            - 2 time units\\nfun1 - 2 to 3, 3 to 4, 4 to 5 - 3 time units \\nfun0 - 5 to 6                       - 1 time units\\n\\nWondering how fun1 took 4 time units?\\n\\n\\nUpdate - \\n\\nfigured it, instead of seeing x as clock strike (or coordinate on line), see x as an item\\n\\n[0][1][2][3][4][5][6]\\n\\nNow it makes sense, \\nfun0 - took first 2 boxes\\nfun1 - took next 4 boxes\\nfun0 - took last 1 box"
		},
		{
			"lc_ans_id":"105101",
			"view":"1078",
			"top":"3",
			"title":"Java clean solution with normalized time explained",
			"vote":"7",
			"content":"The sample input is very confusing when time `t` has mixed meaning of beginning of time `t` for `start` and end of time `t` for `end`\\n```\\nlogs = \\n[\"0:start:0\",\\n \"1:start:2\",\\n \"1:end:5\",\\n \"0:end:6\"]\\n```\\nWe can increase all end time by 1 to normalize the meaning of time `t`, so time `t`always means \"beginning of time `t`\"\\n```\\nlogs = \\n[\"0:start:0\",\\n \"1:start:2\",\\n \"1:end:6\",\\n \"0:end:7\"]\\n```\\nNow it is clear to see that function 0 spent `(2 - 0) + (7 - 6)` and function 1 spent `(6 - 2)`\\n\\n```\\n    public int[] exclusiveTime(int n, List<String> logs) {\\n        int[] res = new int[n];\\n        int ptime = 0, running = 0;\\n        Stack<Integer> stack = new Stack<>();\\n\\n        for (String log : logs) {\\n            String[] split = log.split(\":\");\\n            int func = Integer.parseInt(split[0]);\\n            boolean start = split[1].equals(\"start\");\\n            int time = Integer.parseInt(split[2]);\\n            if (!start)\\n                time++;\\n\\n            res[running] += (time - ptime);\\n            if (start) {\\n                stack.push(running);\\n                running = func;\\n            } else {\\n                running = stack.pop();\\n            }\\n            ptime = time;\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"105103",
			"view":"890",
			"top":"4",
			"title":"C++ O(n) stack with explaination",
			"vote":"6",
			"content":"The idea is simple everytime we see a start, we just push it to the stack. Now when we reach an end, we are guaranteed that the top of the stack is a start with the same id as the current item because all completed start/ends in between this start and end has been removed already. We just add current item timestamp - stack top timestamp + 1 to times[i].\\n\\nSo for example\\n[..., {0:start:3}] and item = {0:end:6} we add 6 - 3 + 1\\n\\nHowever, what if there are function calls in between the start and end of the function of id 0? We can account for this by subtracting the length of the function calls in between the function id 0 whenever we complete an inner function marked by an end.\\n\\n[..., {0:start:3}, {2:start:4}]  and item = {2:end:5} so we increment times[2] by curr_length = 5 - 4 + 1 = 2 and then we subtract times[0] by curr_length as it takes up that amount of time out of the total time\\n\\nSo whenever we see an end, we have to make sure to subtract our curr_length to whatever function is enclosing it if it exists.\\n\\n```\\n#include <iostream>\\n#include <vector>\\n#include <stack>\\n#include <sstream>\\n#include <cassert>\\n\\nusing namespace std;\\n\\nstruct Log {\\n    int id;\\n    string status;\\n    int timestamp;\\n};\\n\\nclass Solution {\\npublic:\\n    vector<int> exclusiveTime(int n, vector<string>& logs) {\\n        vector<int> times(n, 0);\\n        stack<Log> st;\\n        for(string log: logs) {\\n            stringstream ss(log);\\n            string temp, temp2, temp3;\\n            getline(ss, temp, ':');\\n            getline(ss, temp2, ':');\\n            getline(ss, temp3, ':');\\n\\n            Log item = {stoi(temp), temp2, stoi(temp3)};\\n            if(item.status == \"start\") {\\n                st.push(item);\\n            } else {\\n                assert(st.top().id == item.id);\\n\\n                int time_added = item.timestamp - st.top().timestamp + 1;\\n                times[item.id] += time_added;\\n                st.pop();\\n\\n                if(!st.empty()) {\\n                    assert(st.top().status == \"start\");\\n                    times[st.top().id] -= time_added;\\n                }\\n            }\\n        }\\n\\n        return times;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105075",
			"view":"1098",
			"top":"5",
			"title":"[C++] Solution - stack",
			"vote":"3",
			"content":"```\\n/**\\n * Every time end an function, deduce its life span from its parent\\n */\\nclass Solution {\\npublic:\\n    vector<int> exclusiveTime(int n, vector<string>& logs) {\\n        vector<int> times(n, 0);\\n        stack<pair<int, int>> starters;\\n        for (int i = 0; i < logs.size(); i++) {\\n            Line line = getLine(logs[i]);\\n            if (line.start) {\\n                starters.push({ line.fid, line.time });\\n            }\\n            else {\\n                pair<int, int> starter = starters.top();\\n                int lifespan = line.time + 1 - starter.second;\\n                starters.pop();\\n                times[line.fid] += lifespan;\\n                if (!starters.empty()) {\\n                    times[starters.top().first] -= lifespan;\\n                }\\n            }\\n        }\\n        return times;\\n    }\\n\\n    struct Line {\\n        int fid;\\n        bool start;\\n        int time;\\n        Line(int fid, bool start, int time) : fid(fid), start(start), time(time) {};\\n    };\\n\\n    Line getLine(string s) {\\n        int colon1 = s.find(\":\", 0);\\n        int colon2 = s.find(\":\", colon1 + 1);\\n        string fid = s.substr(0, colon1);\\n        string start = s.substr(colon1 + 1, colon2 - (colon1 + 1));\\n        string time = s.substr(colon2 + 1);\\n        return Line(stoi(fid), start == \"start\", stoi(time));\\n    }\\n\\n};\\n```"
		},
		{
			"lc_ans_id":"105072",
			"view":"99",
			"top":"6",
			"title":"Python Stack Solution",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def exclusiveTime(self, n, logs):\\n        \"\"\"\\n        :type n: int\\n        :type logs: List[str]\\n        :rtype: List[int]\\n        \"\"\"\\n        ans = [0] * n\\n        stack = []\\n        for log in logs:\\n            uid, status, time = map(int, log.replace(\"start\", \"1\").replace(\"end\", \"0\").split(\":\"))\\n            if status:\\n                stack.append([time, 0])\\n            else:\\n                start, innerTime = stack.pop()\\n                ans[uid] += time - start + 1 - innerTime\\n                if stack:\\n                    stack[-1][1] += time - start + 1\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"105078",
			"view":"81",
			"top":"7",
			"title":"Simple O(n) time and O(n) space C++ solution",
			"vote":"1",
			"content":"\\n```\\nclass Solution {\\npublic:\\n    vector<int> exclusiveTime(int n, vector<string>& logs) {\\n        int lastTime = 0; // Remember the time in previous log entry\\n        stack<int> callStack; \\n        vector<int> runTime( n, 0 );\\n        size_t pos;\\n        for( int i = 0; i < logs.size(); i++ ) {\\n            // Parse the line\\n            string str = logs[ i ];\\n            pos = str.find( \":\" );\\n            int funcId = stoi( str.substr( 0, pos ) );\\n            str.erase( 0, pos+1 );\\n            pos = str.find( \":\" );\\n            string type = str.substr( 0, pos );\\n            str.erase( 0, pos+1 );\\n            int currTime = stoi( str );\\n            \\n            if ( type == \"start\" ) {\\n                // If a new function is called top of stack will contain the execution\\n                // context of this function. Update the runTime using that and push \\n                // current function of stack.\\n                if ( callStack.size() > 0 ) runTime[ callStack.top() ] += currTime-lastTime;\\n                callStack.push( funcId );\\n                lastTime = currTime;\\n            } else {\\n                // If a function has ended the top of stack will tell us its id\\n                // Update the runTime using that and pop the function from stack.\\n                runTime[ callStack.top() ] += currTime+1-lastTime;\\n                callStack.pop();\\n                lastTime = currTime+1;\\n            }\\n        }\\n        return runTime;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105087",
			"view":"203",
			"top":"8",
			"title":"Easy code(c++) with explaination",
			"vote":"1",
			"content":"Important thing is two.\\n\\n1. Stack is used implementing function call.\\nwhen function is start, push()\\nwhen function is end, pop()\\nand the current function is top().\\n\\n2. Let's define the timestamp with cmd \"start\"  is A and  with cmd  \"end\"  is B. \\nthen, exclusive time have 4 cases \\n[A, A'), [A, B], (B, A), (B, B']\\n\\nA is alway open at start point\\nA is alway close at end point\\nB is alway close at start point\\nB is alway open at end point\\n\\ngeneraly  Y - X  means the length of [X, Y) \\n\\nso, in my code\\nI made an end point open']' by inc exclusive_time when cmd is 'end'. (1)\\nand also I made start point close'(' by inc last_time when last cmd is 'end'.(2)\\n```\\n\\n\\nclass Solution {\\nprivate:\\n\\tvoid parselog(string& s, int& log_id, int& time, string& cmd)\\n\\t{\\t\\n\\t\\tint first = s.find(':');\\n\\t\\tint second = s.find(':' , first + 1);\\n\\t\\tlog_id = stoi(s.substr(0, first));\\n\\t\\tcmd = s.substr(first + 1, second - (first + 1));\\n\\t\\ttime = stoi(s.substr(second + 1));\\n\\t}\\npublic:\\n\\tvector<int> exclusiveTime(int n, vector<string>& logs) \\n\\t{\\n\\t\\tvector<int> ret(n,0);\\n\\t\\tstack<int> st;\\n\\t\\tif (logs.empty())return ret;\\n\\t\\tstring cmd = \"\";\\n\\t\\tint log_id = -1;\\n\\t\\tint end_point = -1;\\n\\t\\tint start_point = 0;\\n\\t\\tparselog(logs[0], log_id, start_point, cmd);\\n\\t\\tst.push(log_id);\\n\\t\\tfor (int j = 1 ; j < logs.size(); j++)\\n\\t\\t{\\n\\t\\t\\tparselog(logs[j], log_id, end_point, cmd);\\n\\t\\t\\tint working_time = end_point - start_point + (cmd == \"end\");//(1)\\n\\t\\t\\tret[st.top()] += working_time;\\n\\t\\t\\tif (cmd == \"start\")st.push(log_id);\\n\\t\\t\\telse st.pop();\\n\\t\\t\\tstart_point = end_point + (cmd == \"end\");//(2)\\n\\t\\t}\\n\\t\\treturn ret;\\n\\t}\\n};\\n```"
		},
		{
			"lc_ans_id":"105104",
			"view":"180",
			"top":"9",
			"title":"Java by using stack",
			"vote":"1",
			"content":"\\n```java\\npublic int[] exclusiveTime(int n, List<String> logs) {\\n        Stack<Integer> stack = new Stack<>();\\n        int[] res = new int[n]; \\n        \\n        String[] temp = logs.get(0).split(\":\");\\n        int time_stamp = Integer.valueOf(temp[0]);\\n        int prev = Integer.valueOf(temp[2]);\\n        stack.push(time_stamp);\\n        \\n        for(int i = 1; i < logs.size(); i++) {\\n            String cur = logs.get(i);\\n            String[] str = cur.split(\":\");\\n            int id = Integer.valueOf(str[0]);\\n            boolean end = str[1].equals(\"end\");\\n            int time = Integer.valueOf(str[2]);\\n            //System.out.println(id+\" \"+ time+\" \"+prev);\\n            if(end) {\\n                res[stack.peek()] += (time + 1 - prev);\\n                prev = time + 1;\\n                stack.pop();\\n            } else {\\n                if(stack.isEmpty()) {\\n                    stack.push(id);\\n                    prev = time;\\n                } else {\\n                    res[stack.peek()] += time - prev;\\n                    prev = time;\\n                    stack.push(id);\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n```"
		}
	],
	"id":"614",
	"title":"Exclusive Time of Functions",
	"content":"<p>Given the running logs of <b>n</b> functions that are executed in a nonpreemptive single threaded CPU, find the exclusive time of these functions. </p>\r\n\r\n<p>Each function has a unique id, start from <b>0</b> to <b>n-1</b>. A function may be called recursively or by another function.</p>\r\n\r\n<p>A log is a string has this format : <code>function_id:start_or_end:timestamp</code>. For example, <code>\"0:start:0\"</code> means function 0 starts from the very beginning of time 0. <code>\"0:end:0\"</code> means function 0 ends to the very end of time 0. </p>\r\n\r\n<p>Exclusive time of a function is defined as the time spent within this function, the time spent by calling other functions should not be considered as this function's exclusive time. You should return the exclusive time of each function sorted by their function id.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\nn = 2\r\nlogs = \r\n[\"0:start:0\",\r\n \"1:start:2\",\r\n \"1:end:5\",\r\n \"0:end:6\"]\r\n<b>Output:</b>[3, 4]\r\n<b>Explanation:</b>\r\nFunction 0 starts at time 0, then it executes 2 units of time and reaches the end of time 1. \r\nNow function 0 <b>calls function 1</b>, function 1 starts at time 2, executes 4 units of time and end at time 5.\r\nFunction 0 is running again at time 6, and also end at the time 6, thus executes 1 unit of time. \r\nSo function 0 totally execute 2 + 1 = 3 units of time, and function 1 totally execute 4 units of time.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>Input logs will be sorted by timestamp, NOT log id.</li>\r\n<li>Your output should be sorted by function id, which means the 0th element of your output corresponds to the exclusive time of function 0.</li>\r\n<li>Two functions won't start or end at the same time.</li>\r\n<li>Functions could be called recursively, and will always end.</li>\r\n<li>1 <= n <= 100</li>\r\n</ol>\r\n</p>",
	"frequency":"186",
	"ac_num":"11640"
}