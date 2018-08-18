{
	"difficulty":"3",
	"submit_num":"20102",
	"show_id":"517",
	"leetcode_id":"517",
	"answers":[
		{
			"lc_ans_id":"99185",
			"view":"10767",
			"top":"0",
			"title":"Super Short & Easy Java O(n) Solution",
			"vote":"69",
			"content":"```\\npublic class Solution {\\n    public int findMinMoves(int[] machines) {\\n        int total = 0; \\n        for(int i: machines) total+=i;\\n        if(total%machines.length!=0) return -1;\\n        int avg = total/machines.length, cnt = 0, max = 0;\\n        for(int load: machines){\\n            cnt += load-avg; //load-avg is \"gain/lose\"\\n            max = Math.max(Math.max(max, Math.abs(cnt)), load-avg);\\n        }\\n        return max;\\n    }\\n}\\n```\\n\\nLet me use an example to briefly explain this. For example, your machines[] is [0,0,11,5]. So your total is 16 and the target value for each machine is 4. Convert the machines array to a kind of gain/lose array, we get: [-4,-4,7,1]. Now what we want to do is go from the first one and try to make all of them 0.\\nTo make the 1st machines 0, you need to give all its \"load\" to the 2nd machines. \\nSo we get: [0,-8,7,1]\\nthen: [0,0,-1,1]\\nlastly: [0,0,0,0], done. \\nYou don't have to worry about the details about how these machines give load to each other. In this process, the least steps we need to eventually finish this process is determined by the peak of abs(cnt) and the max of \"gain/lose\" array. In this case, the peak of abs(cnt) is 8 and the max of gain/lose array is 7. So the result is 8.\\n\\n\\nSome other example:\\nmachines: [0,3,0]; gain/lose array: [-1,2,-1]; max = 2, cnt = 0, -1, 1, 0, its abs peak is 1. So result is 2. \\nmachines: [1,0,5]; gain/lose array: [-1,-2,3]; max = 3, cnt = 0, -1, -3, 0, its abs peak is 3. So result is 3."
		},
		{
			"lc_ans_id":"99181",
			"view":"7827",
			"top":"1",
			"title":"C++ 16ms O(n) solution (with trivial proof)",
			"vote":"56",
			"content":"First we check the sum of dresses in all machines. if that number cannot be divided by count of machines, there is no solution.\\n\\nOtherwise, we can always transfer a dress from one machine to another, one at a time until every machines reach the same number, so there must be a solution. In this way, the total actions is sum of operations on every machine.\\n\\nSince we can operate several machines at the same time, the minium number of moves is the maximum number of necessary operations on every machine.\\n\\nFor a single machine, necessary operations is to transfer dresses from one side to another until sum of both sides and itself reaches the average number. We can calculate (required dresses) - (contained dresses) of each side as L and R:\\n\\nL > 0 && R > 0: both sides lacks dresses, and we can only export one dress from current machines at a time, so result is abs(L) + abs(R)\\nL < 0 && R < 0: both sides contains too many dresses, and we can import dresses from both sides at the same time, so result is max(abs(L), abs(R))\\nL < 0 && R > 0 or L >0 && R < 0: the side with a larger absolute value will import/export its extra dresses from/to current machine or other side, so result is max(abs(L), abs(R))\\n\\nFor example, [1, 0, 5], average is 2\\nfor 1, L = 0 * 2 - 0 = 0, R = 2 * 2 - 5= -1, result = 1\\nfor 0, L = 1 * 2 - 1= 1, R = 1 * 2 - 5 = -3, result = 3\\nfor 5, L = 2 * 2 - 1= 3, R = 0 * 2 - 0= 0, result = 3\\nso minium moves is 3\\n\\n```\\nclass Solution {\\npublic:\\n    int findMinMoves(vector<int>& machines) {\\n        int len = machines.size();\\n        vector<int> sum(len + 1, 0);\\n        for (int i = 0; i < len; ++i)\\n            sum[i + 1] = sum[i] + machines[i];\\n\\n        if (sum[len] % len) return -1;\\n\\n        int avg = sum[len] / len;\\n        int res = 0;\\n        for (int i = 0; i < len; ++i)\\n        {\\n            int l = i * avg - sum[i];\\n            int r = (len - i - 1) * avg - (sum[len] - sum[i] - machines[i]);\\n\\n            if (l > 0 && r > 0)\\n                res = std::max(res, std::abs(l) + std::abs(r));\\n            else\\n                res = std::max(res, std::max(std::abs(l), std::abs(r)));\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99188",
			"view":"4264",
			"top":"2",
			"title":"Java O(n) DP Solution",
			"vote":"21",
			"content":"```\\npublic class Solution {\\n    public int findMinMoves(int[] machines) {\\n        int total = 0, target = 0, result = 0, n = machines.length;\\n        for (int d : machines) total += d;\\n        if (total == 0) return 0;\\n        if (total % n != 0) return -1;\\n        target = total / n;\\n        \\n        int[] move = new int[n];\\n        for (int i = 0; i < n - 1; i++) {\\n            if (machines[i] > target) {\\n                move[i] += machines[i] - target;\\n                machines[i + 1] += machines[i] - target;\\n                machines[i] = target;\\n                result = Math.max(result, move[i]);\\n            }\\n            else {\\n                move[i + 1] = target - machines[i];\\n                machines[i + 1] -= target - machines[i];\\n                machines[i] = target;\\n                result = Math.max(result, move[i + 1]);\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99177",
			"view":"1961",
			"top":"3",
			"title":"Very intuitive O(n) solution",
			"vote":"18",
			"content":"Instead of using some DP methodology to solve the problem, I have a very intuitive way to approach the solution. \\n\\nThink about the machine ```i```, after we make all machines have the same dresses, **how many dresses will be passed through machine ```i```**?\\nLet's denote the current sum of dresses of machines ```[0...i-1]``` as ```leftSums[i]```, and the current sum of dresses of machines ```[i+1...n-1]``` as rightSums[i].\\nLet's denote the expected sum of dresses of machines ```[0...i-1]``` as ```expLeft```, which means after all dresses are equally distributed, the sum of address in machines ```[0...i-1]``` should be ```expLeft```. The same logic applies to machines ```[i+1...n-1]```, denoted as ```expRight```.\\n\\nThen the above question should be clearly answered. If ```expLeft``` is larger than ```leftSums[i]```, that means no matter how you move the dresses, there will be at least ```expLeft - leftSums[i]``` dresses being moved to left of machine ```i```, which means pass through machine ```i```. For the right machines of machine i, the logic remains the same. So we could conclude that the minimum dresses passed through machine ```i``` will be:\\n```\\nleft = expLeft > leftSums[i] ? expLeft - leftSums[i] : 0;\\nright = expRight > rightSums[i] ? expRight - rightSums[i] : 0;\\ntotal = left + right;\\n```\\n\\nWith this answer in mind, we could know that the minimum moves is the maximum dresses that pass through for each single machine, because for each dress, it will require at least one move. Hence the following solution. The code could be more concise, but I will leave it here for purpose of explanation. \\n\\nIf you have any doubts or suggestions for this solution, any comments are welcome.\\n\\n```\\npublic class Solution {\\n    public int findMinMoves(int[] machines) {\\n        int n = machines.length;\\n        int sum = 0;\\n        for (int num : machines) {\\n            sum += num;\\n        }\\n        if (sum % n != 0) {\\n            return -1;\\n        }\\n        int avg = sum / n;\\n        int[] leftSums = new int[n];\\n        int[] rightSums = new int[n];\\n        for (int i = 1; i < n; i ++) {\\n            leftSums[i] = leftSums[i-1] + machines[i-1];\\n        }\\n        for (int i = n - 2; i >= 0; i --) {\\n            rightSums[i] = rightSums[i+1] + machines[i+1];\\n        }\\n        int move = 0;\\n        for (int i = 0; i < n; i ++) {\\n            int expLeft = i * avg;\\n            int expRight = (n - i - 1) * avg;\\n            int left = 0;\\n            int right = 0;\\n            if (expLeft > leftSums[i]) {\\n                left = expLeft - leftSums[i];\\n            } \\n            if (expRight > rightSums[i]) {\\n                right = expRight - rightSums[i];\\n            }\\n            move = Math.max(move, left + right);\\n        }\\n        return move;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99187",
			"view":"1910",
			"top":"4",
			"title":"Easy understand solution O(n) time and O(1) space",
			"vote":"12",
			"content":"```toLeft```: the number of cloths moved to left from this machine\\n```toRight```: the number of cloths moved to right from this machine\\n```toLeft``` and ```toRight``` may be negative but it's okay.\\n\\n````\\ndef findMinMoves(self, machines):\\n    if sum(machines) % len(machines) == 0:\\n        target = sum(machines) / len(machines)\\n    else:\\n        return -1\\n    toLeft = 0\\n    res = 0\\n    for i in range(len(machines)):\\n        toRight =  machines[i]- target - toLeft\\n        res = max(res, toLeft, toRight, toLeft + toRight)\\n        toLeft = -toRight\\n    return res"
		},
		{
			"lc_ans_id":"99203",
			"view":"1158",
			"top":"5",
			"title":"C++ 12 ms O(n) 8 lines",
			"vote":"7",
			"content":"First. we determine the target dresses we should have in each machine (total dresses / # of machines), and return -1 if it's not an integer.\\n\\nWe then go from left to right, tracking the running balance of dresses we need to move through each machine. If, for example, we have 5 extra dresses so far, and this machine has 2 extra dresses, we need to pass total 7 dresses through that machine (requires 7 steps). Also, we need to track the number of dresses we need to offload from a particular machine (machine[i] - target dresses). This number may be higher than the running balance if dresses are passed both ways, as shown in the example 2. \\n\\nExample 1: [1, 1, 6, 6, 1], total dresses: 15, target dresses: 3, maximum offload is 3 (6 - 3).\\nRunning balance:[-2][-4][ -1][  2][  0]\\nAnswer: max(3, abs(-4)) = 4.\\n\\nExample 2: [1, 1, 4, 8, 1], total dresses: 15, target dresses: 3, maximum offload is 5 (8 - 3).\\nRunning balance:[-2][-4][ -3][  2][  0]\\nAnswer: max(5, abs(-4)) = 5\\n\\n```\\nint findMinMoves(vector<int>& machines) {\\n    int totalDresses = 0, size = machines.size();\\n    for (auto i = 0; i < size; ++i) totalDresses += machines[i];\\n    if (totalDresses % size != 0) return -1;\\n    \\n    auto targetDresses = totalDresses / size, totalMoves = 0, ballance = 0;\\n    for (auto i = 0; i < size; ++i) {\\n        ballance += machines[i] - targetDresses;\\n        totalMoves = max(totalMoves, max(machines[i] - targetDresses, abs(ballance)));\\n    }\\n    return totalMoves;\\n}\\n```"
		},
		{
			"lc_ans_id":"99206",
			"view":"1106",
			"top":"6",
			"title":"why [0,0,11,5] needs 8 steps?...",
			"vote":"3",
			"content":"my algorithm gives 7 steps and is considered wrong\\n\\n[0,0,11,5]:\\n\\n[1,1,10,4]\\n[2,2,9,3]\\n[3,3,8,2]\\n[3,3,7,3]\\n[3,4,6,3]\\n[4,4,5,3]\\n[4,4,4,4]\\n\\nis this path wrong?"
		},
		{
			"lc_ans_id":"99186",
			"view":"89",
			"top":"7",
			"title":"Should improve the wording (unprecise)",
			"vote":"2",
			"content":"It is not clear that the direction in which we pass a dress can be different for different machines during one round.\\nTo make that clear, we should add an example like:\\nInput: [2,0,0,2]\\nOuptut: 1\\nExplanation:\\n1st move:    2 --> 0     0 <-- 2    =>    1     1     1     1"
		},
		{
			"lc_ans_id":"99190",
			"view":"382",
			"top":"8",
			"title":"Just a simple explanation",
			"vote":"2",
			"content":"1. Calculate the average number of dresses per machine.\\n\\n2. Don't worry about each machine should borrow dresses or give out dresses, transform all to give-out  => machines[i] = machines[i] - average, yes you can give out a negative amount to dresses.\\n\\n3. Max(machines[i]) should be the answer, yes at least you need to do machines[i] operations to give out machines[i] dresses.\\n\\n4. Wait, what if there is an accumulated number of give-outs that's greater than Max(machines[i])? Then use that accumulated number as the answer since those two give-outs can happen simultaneously. Example: [1, 1, 1, 0, -5, 0, 2], 1 + 1 + 1 > 2, so answer is 1 + 1 + 1 = 3."
		},
		{
			"lc_ans_id":"99194",
			"view":"162",
			"top":"9",
			"title":"What if the line is circle? Anyone has good idea?",
			"vote":"1",
			"content":"If the washing machines are in a circle, not in a line, then how to solve it?"
		}
	],
	"id":"503",
	"title":"Super Washing Machines",
	"content":"<p>You have <b>n</b> super washing machines on a line. Initially, each washing machine has some dresses or is empty. \r\n</p>\r\n\r\n<p>For each <b>move</b>, you could choose <b>any m</b> (1 &le; m &le; n) washing machines, and pass <b>one dress</b> of each washing machine to one of its adjacent washing machines <b> at the same time </b>.  </p>\r\n\r\n<p>Given an integer array representing the number of dresses in each washing machine from left to right on the line, you should find the <b>minimum number of moves</b> to make all the washing machines have the same number of dresses. If it is not possible to do it, return -1.</p>\r\n\r\n<p><b>Example1</b>\r\n<pre>\r\n<b>Input:</b> [1,0,5]\r\n\r\n<b>Output:</b> 3\r\n\r\n<b>Explanation:</b> \r\n1st move:    1     0 <-- 5    =>    1     1     4\r\n2nd move:    1 <-- 1 <-- 4    =>    2     1     3    \r\n3rd move:    2     1 <-- 3    =>    2     2     2   \r\n</pre>\r\n\r\n<p><b>Example2</b>\r\n<pre>\r\n<b>Input:</b> [0,3,0]\r\n\r\n<b>Output:</b> 2\r\n\r\n<b>Explanation:</b> \r\n1st move:    0 <-- 3     0    =>    1     2     0    \r\n2nd move:    1     2 --> 0    =>    1     1     1     \r\n</pre>\r\n\r\n<p><b>Example3</b>\r\n<pre>\r\n<b>Input:</b> [0,2,0]\r\n\r\n<b>Output:</b> -1\r\n\r\n<b>Explanation:</b> \r\nIt's impossible to make all the three washing machines have the same number of dresses. \r\n</pre>\r\n\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of n is [1, 10000].</li>\r\n<li>The range of dresses number in a super washing machine is [0, 1e5].</li>\r\n</ol>\r\n</p>",
	"frequency":"153",
	"ac_num":"7326"
}