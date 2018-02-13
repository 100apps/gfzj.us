{
	"difficulty":"1",
	"submit_num":"29311",
	"show_id":"682",
	"leetcode_id":"682",
	"answers":[
		{
			"lc_ans_id":"107871",
			"view":"2019",
			"top":"0",
			"title":"Straightforward Python",
			"vote":"12",
			"content":"It not stated in the question but you can assume there is not invalid operations, such as `C` when the points history is empty, it still passed.\\n\\n```\\nclass Solution(object):\\n    def calPoints(self, ops):\\n        # Time: O(n)\\n        # Space: O(n)\\n        history = []\\n        for op in ops:\\n            if op == 'C':\\n                history.pop()\\n            elif op == 'D':\\n                history.append(history[-1] * 2)\\n            elif op == '+':\\n                history.append(history[-1] + history[-2])\\n            else:\\n                history.append(int(op))\\n        return sum(history)\\n\\n```"
		},
		{
			"lc_ans_id":"107860",
			"view":"3623",
			"top":"1",
			"title":"Verbose Java solution, LinkedList",
			"vote":"8",
			"content":"```\\nclass Solution {\\n    public int calPoints(String[] ops) {\\n        int sum = 0;\\n        LinkedList<Integer> list = new LinkedList<>();\\n        for (String op : ops) {\\n            if (op.equals(\"C\")) {\\n                sum -= list.removeLast();\\n            }\\n            else if (op.equals(\"D\")) {\\n                list.add(list.peekLast() * 2);\\n                sum += list.peekLast();\\n            }\\n            else if (op.equals(\"+\")) {\\n                list.add(list.peekLast() + list.get(list.size() - 2));\\n                sum += list.peekLast();\\n            }\\n            else {\\n                list.add(Integer.parseInt(op));\\n                sum += list.peekLast();\\n            }\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107877",
			"view":"2119",
			"top":"2",
			"title":"Does anybody see this before?",
			"vote":"5",
			"content":"![0_1506234177757_QQ\\u56fe\\u724720170924142202.png](/assets/uploads/files/1506234179530-qq\\u56fe\\u724720170924142202-resized.png) \\n\\nI am confused!!!"
		},
		{
			"lc_ans_id":"107859",
			"view":"1631",
			"top":"3",
			"title":"[C++] Clean Code",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int calPoints(vector<string>& ops) {\\n        int sum = 0, score = 0;\\n        vector<int> rounds;\\n        for (string op : ops) {\\n            if (op == \"C\") {\\n                sum -= rounds.back();\\n                rounds.pop_back();\\n                continue;\\n            }\\n            if (op == \"D\") {\\n                sum += score = rounds.back() * 2;\\n            }\\n            else if (op == \"+\") {\\n                sum += score = rounds[rounds.size() - 1] + rounds[rounds.size() - 2];\\n            }\\n            else {\\n                sum += score = stoi(op);\\n            }\\n            rounds.push_back(score);\\n        }\\n        return sum;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107929",
			"view":"333",
			"top":"4",
			"title":"Simple C++ using std::vector",
			"vote":"3",
			"content":"Use vector ```r``` to store previous rounds' points.  Each new round's points are appended to the end of vector ```r```, so we can simply ```pop_back()``` to erase the previous round for operation ```\"C\"```.  In the end, add up all rounds' points using ```accumulate```.\\n\\n**Note:** there is a typo in this problem description.  The **Example 1 output should be 30**, ```(15 is NOT correct)```\\n\\nExample 1:\\nInput: [\"5\",\"2\",\"C\",\"D\",\"+\"]\\n```Output: 15```\\n\\n\\n```\\nclass Solution{\\npublic:\\n    int calPoints(vector<string>& ops){\\n        vector<int> r{};\\n        for (string& op : ops){\\n            if      (op==\"C\"){ r.pop_back(); }\\n            else if (op==\"D\"){ r.push_back(2*r.back()); }\\n            else if (op==\"+\"){ r.push_back(r.end()[-2]+r.end()[-1]); }\\n            else             { r.push_back(stoi(op)); }\\n        }\\n        return accumulate(r.begin(), r.end(), 0);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107855",
			"view":"574",
			"top":"5",
			"title":"Very easy-to-understand solution using stack!",
			"vote":"2",
			"content":"basic idea is to store a number into stack so that you can use it in future reference since stack has LIFO properties.\\ntwo cases to consider:\\n1. if you get a number from ops[i], implement a function called (isdigit) by using try catch to check if a string element is digit. Since string array doesn't have the isDigit method like Cha. However, there is no point to put it as char array since if a user passed in a negative value or not a single digit its time consuming to check and add it to sum.\\n2. before u perform each of the \"C\", \"D\", \"+\" make sure u check if a stack is empty or not if the stack is empty you don't need to do anything;  but for the \"+\" method you need to check twice since it requires last two score. if the second time u checked is empty simply use the first time score and add to the sum and ofcourse added it back after you pop it\\n\\n      \\n     public int calPoints(String[] ops) {\\n        if(ops == null || ops.length == 0){\\n            return  0;}\\n\\n        Deque<Integer> stack = new LinkedList<>();\\n        int sum = 0;\\n        //has to use .equals not ==\\n        for(String ccc: ops){\\n            if(isdigit(ccc)){\\n                int temp = Integer.parseInt(ccc);\\n                stack.offerFirst(temp);\\n                sum += temp;\\n            }else if(ccc.equals(\"D\")){\\n                if(!stack.isEmpty()){\\n                    int c = stack.peekFirst()*2;\\n                    sum += c;\\n                    stack.offerFirst(c);\\n                }\\n            }else if(ccc.equals(\"C\")){\\n                if(!stack.isEmpty()){\\n                    int remove = stack.removeFirst();\\n                    sum -= remove;\\n                }\\n            }else if(ccc.equals(\"+\")){\\n                if(!stack.isEmpty()){  \\n                    int addmid = stack.removeFirst();\\n                    if(!stack.isEmpty()){\\n                        int addfirst = stack.removeFirst();\\n                        int curr = addfirst + addmid;\\n                        sum += curr;\\n                        stack.offerFirst(addfirst);\\n                        stack.offerFirst(addmid);\\n                        stack.offerFirst(curr);\\n                        continue;\\n                    }\\n                    sum += addmid;\\n                    stack.offerFirst(addmid);\\n                    stack.offerFirst(addmid);\\n                }\\n            }\\n            \\n        }\\n        return sum;\\n    }\\n    \\n  \\n    private boolean isdigit(String ops){\\n        try{\\n            Integer.parseInt(ops);\\n            return true;\\n        }catch(Exception ex){\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"107926",
			"view":"671",
			"top":"6",
			"title":"My Accepted Code in Java 7ms",
			"vote":"2",
			"content":"My idea is that just keeping track of the current valid round's point in an array and use it to have a next valid round's point.\\n\\n```\\n  public int calPoints(String[] ops) {\\n    int sum = 0;\\n    int valid[] = new int[ops.length];\\n    int v = -1;\\n    for (int i = 0; i < ops.length; i++) {\\n      if (ops[i].equals(\"C\")) {\\n        sum -= valid[v];\\n        v--;\\n      } else if (ops[i].equals(\"D\")) {\\n        int d = (valid[v] + valid[v]);\\n        v++;\\n        valid[v] = d;\\n        sum += d;\\n      } else if (ops[i].equals(\"+\")) {\\n        int p = (valid[v] + valid[v - 1]);\\n        v++;\\n        valid[v] = p;\\n        sum += p;\\n      } else {\\n        int val = Integer.parseInt(ops[i]);\\n        v++;\\n        valid[v] = val;\\n        sum += val;\\n      }\\n    }\\n\\n    return sum;\\n  }\\n````"
		},
		{
			"lc_ans_id":"107873",
			"view":"74",
			"top":"7",
			"title":"JAVA very concise and easy to understand using stack",
			"vote":"1",
			"content":"\\n    public int calPoints(String[] ops) {\\n        int sum = 0;\\n        Stack<Integer> stack = new Stack<Integer>();\\n        for(int i = 0; i < ops.length; i++)\\n        {\\n            if(ops[i].equals(\"+\"))\\n            {\\n                int temp1 = stack.pop();\\n                int temp2 = stack.pop();\\n                int temp_sum = temp1 + temp2;\\n                sum += temp_sum;\\n                stack.push(temp2);\\n                stack.push(temp1);\\n                stack.push(temp_sum);\\n            }\\n            else if(ops[i].equals(\"D\"))\\n            {\\n                int temp = stack.pop();\\n                int temp_d = 2 * temp;\\n                sum += temp_d;\\n                stack.push(temp);\\n                stack.push(temp_d);\\n            }\\n            else if(ops[i].equals(\"C\"))\\n            {\\n                int cancel = stack.pop();\\n                sum -= cancel;\\n            }\\n            else\\n            {\\n                int temp = Integer.parseInt(ops[i]);\\n                sum += temp;\\n                stack.push(temp);   \\n            }\\n        }\\n        return sum;\\n    }"
		},
		{
			"lc_ans_id":"107886",
			"view":"73",
			"top":"8",
			"title":"Golang solution in 3ms",
			"vote":"1",
			"content":"```\\nimport (\\n    \"strconv\"\\n)\\n\\nfunc calPoints(ops []string) int {\\n    stack := make([]int, len(ops))\\n    top := 0\\n\\n    for i := 0; i < len(ops); i++ {\\n        op := ops[i]\\n        switch op {\\n        case \"+\":\\n            last1 := stack[top-1]\\n            last2 := stack[top-2]\\n            stack[top] = last1 + last2\\n            top += 1\\n        case \"D\":\\n            last1 := stack[top-1]\\n            stack[top] = last1 * 2\\n            top += 1\\n        case \"C\":\\n            top -= 1\\n        default:\\n            stack[top], _ = strconv.Atoi(op)\\n            top += 1\\n        }\\n    }\\n\\n    points := 0\\n    for i := 0; i < top; i++ {\\n        points += stack[i]\\n    }\\n    return points\\n}\\n```"
		},
		{
			"lc_ans_id":"107897",
			"view":"71",
			"top":"9",
			"title":"python just pass it without checking the boundary",
			"vote":"1",
			"content":"    def calPoints(self, ops):\\n  \\n        ops1=[]\\n        for i in range(len(ops)):\\n            if ops[i]=='D':ops1.append(ops1[-1]*2)\\n            elif ops[i]=='+':ops1.append(ops1[-1]+ops1[-2])                \\n            elif ops[i]=='C':\\n                ops1.pop()\\n            else:\\n                ops1.append(int(ops[i]))\\n        return sum(ops1)"
		}
	],
	"id":"659",
	"title":"Baseball Game",
	"content":"<p>\r\nYou're now a baseball game point recorder.\r\n</p>\r\n\r\n<p>\r\nGiven a list of strings, each string can be one of the 4 following types:\r\n<ol>\r\n<li><code>Integer</code> (one round's score): Directly represents the number of points you get in this round.</li>\r\n<li><code>\"+\"</code> (one round's score): Represents that the points you get in this round are the sum of the last two <code>valid</code> round's points.</li>\r\n<li><code>\"D\"</code> (one round's score): Represents that the points you get in this round are the doubled data of the last <code>valid</code> round's points.</li>\r\n<li><code>\"C\"</code> (an operation, which isn't a round's score): Represents the last <code>valid</code> round's points you get were invalid and should be removed.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nEach round's operation is permanent and could have an impact on the round before and the round after.\r\n</p>\r\n\r\n<p>\r\nYou need to return the sum of the points you could get in all the rounds.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"5\",\"2\",\"C\",\"D\",\"+\"]\r\n<b>Output:</b> 30\r\n<b>Explanation:</b> \r\nRound 1: You could get 5 points. The sum is: 5.\r\nRound 2: You could get 2 points. The sum is: 7.\r\nOperation 1: The round 2's data was invalid. The sum is: 5.  \r\nRound 3: You could get 10 points (the round 2's data has been removed). The sum is: 15.\r\nRound 4: You could get 5 + 10 = 15 points. The sum is: 30.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"5\",\"-2\",\"4\",\"C\",\"D\",\"9\",\"+\",\"+\"]\r\n<b>Output:</b> 27\r\n<b>Explanation:</b> \r\nRound 1: You could get 5 points. The sum is: 5.\r\nRound 2: You could get -2 points. The sum is: 3.\r\nRound 3: You could get 4 points. The sum is: 7.\r\nOperation 1: The round 3's data is invalid. The sum is: 3.  \r\nRound 4: You could get -4 points (the round 3's data has been removed). The sum is: -1.\r\nRound 5: You could get 9 points. The sum is: 8.\r\nRound 6: You could get -4 + 9 = 5 points. The sum is 13.\r\nRound 7: You could get 9 + 5 = 14 points. The sum is 27.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<li>The size of the input list will be between 1 and 1000.</li>\r\n<li>Every integer represented in the list will be between -30000 and 30000.</li>\r\n</p>",
	"frequency":"300",
	"ac_num":"17166"
}