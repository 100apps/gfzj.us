{
	"difficulty":"1",
	"submit_num":"79323",
	"show_id":"657",
	"leetcode_id":"657",
	"answers":[
		{
			"lc_ans_id":"106315",
			"view":"5205",
			"top":"0",
			"title":"Python one liner",
			"vote":"25",
			"content":"```\\ndef judgeCircle(self, moves):\\n    return moves.count('L') == moves.count('R') and moves.count('U') == moves.count('D')\\n```"
		},
		{
			"lc_ans_id":"106316",
			"view":"12002",
			"top":"1",
			"title":"[C++] [Java] Clean Code",
			"vote":"20",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    bool judgeCircle(string moves) {\\n        int v = 0;\\n        int h = 0;\\n        for (char ch : moves) {\\n            switch (ch) {\\n                case 'U' : v++; break;\\n                case 'D' : v--; break;\\n                case 'R' : h++; break;\\n                case 'L' : h--; break;\\n            }\\n        }\\n        return v == 0 && h == 0;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public boolean judgeCircle(String moves) {\\n        int x = 0;\\n        int y = 0;\\n        for (char ch : moves.toCharArray()) {\\n            if (ch == 'U') y++;\\n            else if (ch == 'D') y--;\\n            else if (ch == 'R') x++;\\n            else if (ch == 'L') x--;\\n        }\\n        return x == 0 && y == 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106330",
			"view":"3269",
			"top":"2",
			"title":"If you can't describe the problem in a right way, please don't make it a problem.",
			"vote":"11",
			"content":"There are a few problems has vague descriptions which is quite confusing that make the contestants to submit multiple of time to \"guess\" or \"try out\" what is the real meaning of the problem.\\n\\nIt's remotely what we want in Leetcode. So please STOP making this kind of problem again. It's no more than a waste of our time.\\n\\nTHANK YOU!"
		},
		{
			"lc_ans_id":"106393",
			"view":"4794",
			"top":"3",
			"title":"2 Lines Python",
			"vote":"6",
			"content":"    def judgeCircle(self, moves):\\n        c = collections.Counter(moves)\\n        return c['L'] == c['R'] and c['U'] == c['D']"
		},
		{
			"lc_ans_id":"106342",
			"view":"5950",
			"top":"4",
			"title":"Easy 2 lines Java",
			"vote":"5",
			"content":"Easy solution using split.(It needs spaces from front and behind to be calculated correctly):\\n```\\n public boolean judgeCircle(String moves) {\\n        moves=\" \" + moves + \" \";\\n        return moves.split(\"L\").length==moves.split(\"R\").length && moves.split(\"U\").length == moves.split(\"D\").length;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106378",
			"view":"328",
			"top":"5",
			"title":"Solution by vinnyoodles",
			"vote":"3",
			"content":"#### Approach #1 Iterative [Accepted]\\n\\n**Intuition**\\n\\nKeep track of the current coordinate and compare the final coordinate to the initial coordinate.\\n\\n**Algorithm**\\n\\nThe initial coordinate is *(0, 0)*. If we visualize the initial coordinate as the origin in the coordinate plane, then we can give each of the four direction a vector value. \\n\\n```\\nU => +1 y\\nD => -1 y\\nL => -1 x\\nR => +1 x\\n```\\n\\nThe algorithm will keep track of the current coordinate for every move in the sequence of moves. For every move, the coordinate will be updated by adding the move's corresponding vector value.\\n\\nAfter the last move is taken into consideration, the final coordinate has been calculated. At this point, the final coordinate can be compared to the initial coordinate to determine if a circle has been completed. If the final coordinate and the initial coordinate are equivalent, then a circle has been completed.\\n\\n**Java**\\n\\n```java\\npublic class Solution {\\n    public boolean judgeCircle(String moves) {\\n        int x = 0;\\n        int y = 0;\\n        for (char c : moves.toCharArray()) {\\n            if (c == 'U') {\\n                y ++;\\n            } else if (c == 'D') { \\n                y --;\\n            } else if (c == 'L') {\\n                x --; \\n            } else if (c == 'R') {\\n                x ++;  \\n            }\\n        }\\n        \\n        return x == 0 && y == 0;\\n    }\\n}\\n```\\n\\n**Complexity Analysis**\\n\\n* Time complexity: $$O(n)$$. *n* is the number of moves and each move must be taken into consideration to find the final coordinate.\\n\\n* Space complexity: $$O(1)$$. The only variables needed are to keep track of the current coordinate. This can be done with two integer variables which both require constant space."
		},
		{
			"lc_ans_id":"106404",
			"view":"1473",
			"top":"6",
			"title":"[Java/C++] 4 lines solution",
			"vote":"3",
			"content":"Actually, I think the question is not quite clear. It should note that the robot **finally** returns to (0,0).\\n\\nC++ version:\\n```\\n    bool judgeCircle(string moves) {\\n        int x = 0, y = 0;\\n        for(char c: moves){\\n            x += (c == 'R') - (c == 'L'), y += (c == 'U') - (c == 'D');\\n        }\\n        return x == 0 && y == 0;\\n    }\\n```\\n\\nJava version:\\n```\\n    public boolean judgeCircle(String moves) {\\n        int x = 0, y = 0;\\n        for(char c: moves.toCharArray()){\\n            x += (c=='R'?1:0) + (c=='L'?-1:0); y += (c=='U'?1:0) + (c=='D'?-1:0);\\n        }\\n        return x == 0 && y == 0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106415",
			"view":"448",
			"top":"7",
			"title":"Java solution, if else...",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public boolean judgeCircle(String moves) {\\n        int x = 0, y = 0;\\n        for (char c : moves.toCharArray()) {\\n            if (c == 'R') x++;\\n            else if (c == 'L') x--;\\n            else if (c == 'U') y--;\\n            else if (c == 'D') y++;\\n        }\\n        return x == 0 && y == 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106368",
			"view":"310",
			"top":"8",
			"title":"Very short Python and Ruby",
			"vote":"2",
			"content":"Python:\\n\\n    def judgeCircle(self, moves):\\n        return not sum(1j**'RUL'.find(m) for m in moves)\\n\\nRuby:\\n```\\ndef judge_circle(moves)\\n  moves.chars.map { |m| 1i**\"RULD\".index(m) }.sum == 0\\nend\\n```\\n\\nHad posted the Python version before as a [reply](https://discuss.leetcode.com/post/208187) to @waigx."
		},
		{
			"lc_ans_id":"106373",
			"view":"205",
			"top":"9",
			"title":"Python solution with detailed explanation",
			"vote":"2",
			"content":"**Judge Route Circle** https://leetcode.com/problems/judge-route-circle/description/\\n\\n**Balance U with D and R with L**\\n```\\nclass Solution(object):\\n    def judgeCircle(self, moves):\\n        \"\"\"\\n        :type moves: str\\n        :rtype: bool\\n        \"\"\"\\n        return (moves.count(\"U\") == moves.count(\"D\")) and (moves.count(\"R\") == moves.count(\"L\"))\\n```\\n\\n**Simulate movements**\\n* Imagine we start with origin. After all movements, we must be back at origin.\\n```\\nclass Solution(object):\\n    def judgeCircle(self, moves):\\n        \"\"\"\\n        :type moves: str\\n        :rtype: bool\\n        \"\"\"\\n        x,y = 0,0\\n        offsets = {\"U\":[0,1], \"D\":[0,-1], \"R\":[1,0], \"L\":[-1,0]}\\n        for move in moves:\\n            x,y = x+offsets[move][0], y+offsets[move][1]\\n        return (x == 0) and (y == 0)\\n```\\n\\n**User a counter and balance U/D and R/L**\\n```\\nfrom collections import Counter    \\nclass Solution(object):\\n    def judgeCircle(self, moves):\\n        \"\"\"\\n        :type moves: str\\n        :rtype: bool\\n        \"\"\"\\n        ctr = Counter(moves)\\n        ctr += Counter(\"UDRL\")\\n        return (ctr[\"U\"] == ctr[\"D\"]) and (ctr[\"R\"] == ctr[\"L\"])\\n```"
		}
	],
	"id":"634",
	"title":"Judge Route Circle",
	"content":"<p>\r\nInitially, there is a Robot at position (0, 0). Given a sequence of its moves, judge if this robot makes a circle, which means it moves back to <b>the original place</b>. \r\n</p>\r\n\r\n<p>\r\nThe move sequence is represented by a string. And each move is represent by a character. The valid robot moves are <code>R</code> (Right), <code>L</code> (Left), <code>U</code> (Up) and <code>D</code> (down). The output should be true or false representing whether the robot makes a circle.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"UD\"\r\n<b>Output:</b> true\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"LL\"\r\n<b>Output:</b> false\r\n</pre>\r\n</p>",
	"frequency":"541",
	"ac_num":"54493"
}