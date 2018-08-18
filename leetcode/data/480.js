{
	"difficulty":"3",
	"submit_num":"14400",
	"show_id":"488",
	"leetcode_id":"488",
	"answers":[
		{
			"lc_ans_id":"97007",
			"view":"4068",
			"top":"0",
			"title":"Standard test program is wrong?",
			"vote":"46",
			"content":"Hi all,\\n\\nI tried case `\"RRWWRRBBRR\", \"WB\"`. The test program gave the expected answer `-1`. However, I thought the answer might be `2`. Because:\\n\\n`RRWWRRBBRR -> RRWWRRBBR[W]R -> RRWWRRBB[B]RWR -> RRWWRRRWR -> RRWWWR -> RRR -> empty`\\n\\nThe possible reason might be the first `[W]` was inserted but not adjacent to a `W` in the sequence. I read the description twice but didn't find any condition about it.\\n\\nCould someone give me some ideas about it?"
		},
		{
			"lc_ans_id":"97010",
			"view":"4439",
			"top":"1",
			"title":"\"short\" java solution, beats 98%",
			"vote":"18",
			"content":"Since most top solutions are very long and it's uncomfortable to read, so I share my shorter solution, and it beats 98% java solution.\\n\\nMy idea is simple and clear. it's just like a DFS or a Backtracking solution. word is poor, just look the code.\\n\\n'''\\npublic class Solution {\\n\\n    int MAXCOUNT = 6;   // the max balls you need will not exceed 6 since \"The number of balls in your hand won't exceed 5\"\\n\\n    public int findMinStep(String board, String hand) {\\n        int[] handCount = new int[26];\\n        for (int i = 0; i < hand.length(); ++i) ++handCount[hand.charAt(i) - 'A'];\\n        int rs = helper(board + \"#\", handCount);  // append a \"#\" to avoid special process while j==board.length, make the code shorter.\\n        return rs == MAXCOUNT ? -1 : rs;\\n    }\\n    private int helper(String s, int[] h) {\\n        s = removeConsecutive(s);     \\n        if (s.equals(\"#\")) return 0;\\n        int  rs = MAXCOUNT, need = 0;\\n        for (int i = 0, j = 0 ; j < s.length(); ++j) {\\n            if (s.charAt(j) == s.charAt(i)) continue;\\n            need = 3 - (j - i);     //balls need to remove current consecutive balls.\\n            if (h[s.charAt(i) - 'A'] >= need) {\\n                h[s.charAt(i) - 'A'] -= need;\\n                rs = Math.min(rs, need + helper(s.substring(0, i) + s.substring(j), h));\\n                h[s.charAt(i) - 'A'] += need;\\n            }\\n            i = j;\\n        }\\n        return rs;\\n    }\\n    //remove consecutive balls longer than 3\\n    private String removeConsecutive(String board) {\\n        for (int i = 0, j = 0; j < board.length(); ++j) {\\n            if (board.charAt(j) == board.charAt(i)) continue;\\n            if (j - i >= 3) return removeConsecutive(board.substring(0, i) + board.substring(j));\\n            else i = j;\\n        }\\n        return board;\\n    }\\n}\\n'''"
		},
		{
			"lc_ans_id":"97027",
			"view":"439",
			"top":"2",
			"title":"StraightForward Recursive Java Solution beat 97%",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    \\n    private int aux(String s, int[] c){\\n        if(\"\".equals(s)) return 0;\\n//worst case, every character needs 2 characters; plus one to make it impossible, ;-)\\n        int res = 2 * s.length() + 1; \\n        for(int i = 0; i < s.length();){\\n            int j = i++;\\n            while(i < s.length() && s.charAt(i) == s.charAt(j)) i++;\\n            int inc = 3 - i + j;\\n            if(c[s.charAt(j)] >= inc){\\n                int used = inc <= 0 ? 0 : inc;\\n                c[s.charAt(j)] -= used;\\n                int temp = aux(s.substring(0, j) + s.substring(i), c);\\n                if(temp >= 0) res = Math.min(res, used + temp);\\n                c[s.charAt(j)] += used;\\n            }\\n        }\\n        return res == 2 * s.length() + 1 ? -1 : res;\\n    }\\n    \\n    public int findMinStep(String board, String hand) {\\n        int[] c = new int[128];\\n        for(char x : hand.toCharArray()){\\n            c[x]++;\\n        }\\n        return  aux(board, c);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97053",
			"view":"2993",
			"top":"3",
			"title":"Concise 3ms C++ Solution",
			"vote":"5",
			"content":"At the first look, it is similar to [Can I Win](https://leetcode.com/problems/can-i-win/). But not like that problem, the ```board``` state is not relevant to the state of ```hand``` and this problem requires the minimum value. So, it seems that memorization might not help much. So, I just do it brute-force and stop iff it is sure there no better results than current one.\\n\\nSort ```hand``` string so that we easily know if there at least 2 balls with same color in hand to eliminate a single ball on board. Refer to inline comments for details.\\n\\nAccording to the description, the number of balls in hand won't exceed ```5```, to make life easier, I just return a number equal or greater than ```6``` when there is no way to clear board.\\n\\n```\\n#define MAX_STEP 6 \\nclass Solution {\\npublic:\\n    int findMinStep(string board, string hand) {\\n        sort(hand.begin(), hand.end()); \\n        int res = helper(board, hand); \\n        return res > hand.size() ? -1 : res;\\n    }\\n    \\n    int helper(string b, string h) {\\n        if (b.empty()) return 0;\\n        if (h.empty()) return MAX_STEP;\\n        int res = MAX_STEP;\\n        for (int i = 0; i < h.size(); i++) {\\n            int j = 0;\\n            int n = b.size();\\n            while (j < n) {\\n                int k = b.find(h[i], j);\\n                if (k == string::npos) break;\\n                if (k < n-1 && b[k] == b[k+1]) { // 2 consecutive balls with same color on board\\n                    string nextb = shrink(b.substr(0, k) + b.substr(k+2)); // shrink the string until no 3 or more consecutive balls in same color\\n                    if (nextb.empty()) return 1; // this is the best result for current board, no need to continue\\n                    string nexth = h;\\n                    nexth.erase(i, 1); // remove the used ball from hand\\n                    res = min(res, helper(nextb, nexth) + 1);\\n                    k++;\\n                }\\n                else if (i > 0 && h[i] == h[i-1]) { // 2 balls with same color in hand\\n                    string nextb = shrink(b.substr(0, k) + b.substr(k+1)); // shrink the string until no 3 or more consecutive balls in same color\\n                    if (nextb.empty()) return 2;  // this is the best result for current board, no need to continue\\n                    string nexth = h;\\n                    nexth.erase(i, 1); // remove the used balls from hand\\n                    nexth.erase(i-1, 1);\\n                    res = min(res, helper(nextb, nexth) + 2);\\n                }\\n                j = k + 1;\\n            }\\n        }\\n        return res;\\n    }\\n    \\n    string shrink(string s) {\\n        while(s.size() > 0) {\\n            int start = 0;\\n            bool done = true;\\n            for (int i = 0; i <= s.size(); i++) {\\n                if (i == s.size() || s[i] != s[start]) {\\n                    if (i - start >= 3) {\\n                        s = s.substr(0, start) + s.substr(i);\\n                        done = false;\\n                        break;\\n                    }\\n                    start = i;\\n                }\\n            }\\n            if (done) break;\\n        }\\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97012",
			"view":"4581",
			"top":"4",
			"title":"Recursive java solution",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    public int findMinStep(String board, String hand) {\\n        List<Character> boardList = new ArrayList<Character>();\\n        for (char c : board.toCharArray()) {\\n            boardList.add(c);\\n        }\\n        Map<Character,Integer> handMap = new HashMap<>();\\n        handMap.put('R',0);\\n        handMap.put('Y',0);\\n        handMap.put('B',0);\\n        handMap.put('G',0);\\n        handMap.put('W',0);\\n        for (char h : hand.toCharArray()) {\\n            handMap.put(h, handMap.get(h) + 1);\\n        }\\n        return find(boardList, handMap);\\n    }\\n    \\n    private int find(List<Character> board, Map<Character, Integer> hand) {\\n        cleanupBoard(board);\\n        if (board.size() == 0) return 0;\\n        if (empty(hand)) return -1;\\n        int count = 0;\\n        int min = Integer.MAX_VALUE;\\n        for (int i = 0; i<board.size(); i++) {\\n            char c = board.get(i);\\n            count++;\\n            if (i == board.size() - 1 || board.get(i+1) != c) {\\n                int missing = 3 - count;\\n                if (hand.get(c) >= missing) {\\n                    hand.put(c, hand.get(c) - missing);\\n                    List<Character> smallerBoard = new ArrayList<>(board);\\n                    for (int j = 0; j<count; j++) {\\n                        smallerBoard.remove(i-j);\\n                    }\\n                    int smallerFind = find(smallerBoard, hand);\\n                    if ( smallerFind != -1 ) {\\n                        min = Math.min(smallerFind + missing, min);\\n                    }\\n                    hand.put(c, hand.get(c) + missing);\\n                }\\n                count = 0;\\n            }\\n        }\\n        return (min == Integer.MAX_VALUE) ? -1 : min;\\n    }\\n    \\n    private void cleanupBoard(List<Character> board) {\\n        int count = 0;\\n        boolean cleaned = false;\\n        for (int i = 0; i<board.size(); i++) {\\n            char c = board.get(i);\\n            count++;\\n            if (i == board.size() - 1 || board.get(i+1) != c) {\\n                if (count >= 3) {\\n                    for (int j = 0; j<count; j++) {\\n                        board.remove(i-j);\\n                    }\\n                    cleaned = true;\\n                    break;\\n                }\\n                count = 0;\\n            }\\n        }\\n        if (cleaned) {\\n            cleanupBoard(board);\\n        }\\n    }\\n    \\n    private boolean empty(Map<Character,Integer> hand) {\\n        for (int val : hand.values()) {\\n            if (val > 0) return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97033",
			"view":"1041",
			"top":"5",
			"title":"16-line 9ms recursive solution with pre-process, memorization and edge case test, no helper functions (detailed explanation)",
			"vote":"3",
			"content":"Many fellow coders have posted similar recursive solutions. This is my version with several key observations for improvement:\\n1. Letters in `hand` are actually *order insensitive*, i.e., two anagram `hand` strings with a same `board` always give the same answer. So we should sort `hand` to speed up memorization.\\n2. If a letter `c` of `board` has total count `< 3` in `board + hand` combined, obviously, we cannot empty the board.\\n3. If a letter `c` in `hand` does not appear in `board`, such letter is useless and should be abandoned.\\n4. If a letter `c` in `hand` is inserted to position `i` and `j` in `board` which result to a same board, apparently, only need to consider one case.\\n\\nThe usage of hash map memorization speeds total test running time from 35ms to 9ms.\\n```\\n    int findMinStep(string b, string h) {\\n      // pre-process\\n      string a; int L, r = 0;\\n      for (char c:b) // shrink b to remove consecutive identical letters\\n        if (c-r) if ((L=a.size()) < 2 || c-a[L-1] || c-a[L-2]) a += c, r = 0;\\n                 else r = c, a.pop_back(), a.pop_back();\\n      sort(h.begin(), h.end()); // sort hand for memorization\\n      \\n      // memorization\\n      if (m.count(b=a) && m[b].count(h)) return m[b][h];\\n        \\n      // base cases\\n      if (b.empty()) return 0; else if (h.empty()) return -1;\\n    \\n      // edge cases\\n      for (char c:b) if (count(a.begin(),(a=b+h).end(),c) < 3) return m[b][h] = -1; \\n      \\n      // recursion\\n      for (int i = 0, res = INT_MAX; i <= h.size(); ++i) { // each letter in hand\\n        if (i==h.size()) return m[b][h] = res<INT_MAX? res : -1;\\n        if (i && h[i]==h[i-1] || b.find(h[i])==string::npos) continue;\\n        for (int j = 0, step; j < b.size(); ++j) { // each insertion position\\n          if (b[j]-h[i] || (j && b[j]==b[j-1])) continue;\\n          string bb(b); bb.insert(bb.begin() + j, h[i]); // insert h[i] to board\\n          string hh(h); hh.erase(hh.begin() + hh.find(h[i])); // remove h[i] from hand\\n          if (step = findMinStep(bb, hh)+1) res = min(res, step);\\n        }\\n      }\\n    }\\n    \\n    // m[b][h] = min steps for borad=b & hand=h\\n    unordered_map<string, unordered_map<string, int>> m;\\n```"
		},
		{
			"lc_ans_id":"97055",
			"view":"529",
			"top":"6",
			"title":"Misunderstanding!",
			"vote":"3",
			"content":"I thought this zuma game is like the real one, the ball in hand should not be out-of-order, you can not use the later one then back to the former one.......\\n\"WRYYRWWRRWW\"\\n\"WYBR\"\\nthis should be -1......"
		},
		{
			"lc_ans_id":"97009",
			"view":"371",
			"top":"7",
			"title":"Java Recursive Solution with comments, 22ms",
			"vote":"2",
			"content":"\\n    public int findMinStep(String board, String hand) {\\n        //precomputation\\n        //convert board from String to StringBuilder, easy to delete and insert char.\\n        //convert hand from String to HashMap, easy to get the number of a particular kind of ball in hand.\\n        StringBuilder b = new StringBuilder(board);\\n        Map<Character,Integer> handMap = new HashMap<>(5);\\n        handMap.put('R', 0);\\n        handMap.put('B', 0);\\n        handMap.put('G', 0);\\n        handMap.put('W', 0);\\n        handMap.put('Y', 0);\\n        for(char c : hand.toCharArray()) {\\n            handMap.put(c, handMap.get(c)+1);\\n        }\\n        //after precomputation, use helper method to find the answer recursively.\\n        return helper(b, handMap);\\n     }\\n\\n    public int helper(StringBuilder board, Map<Character,Integer> hand) {\\n        if(board.length() == 0) return 0;\\n        if(handIsEmpty(hand)) return -1;\\n        int count = 1;\\n        int min = Integer.MAX_VALUE;\\n        //find a place to insert ball(s) to remove at least three balls.\\n        for (int i = 0; i < board.length(); i++) {\\n            char nowChar = board.charAt(i);\\n            if(i+1 < board.length() && board.charAt(i+1) == nowChar) {\\n                count++;\\n                continue;\\n            }\\n            int missing = 3-count;\\n            if(hand.get(nowChar) - missing >= 0) {\\n                //new board to manipulate\\n                StringBuilder newBoard = new StringBuilder(board);\\n                //insert ball(s) according to the missing number\\n                newBoard = newBoard.insert(i+1,nowChar);\\n                if(missing == 2) newBoard = newBoard.insert(i+1,nowChar);\\n                //update the number of balls in hand\\n                hand.put(nowChar, hand.get(nowChar)-missing);\\n                //shrink board\\n                shrinkBoard(newBoard);\\n                //find the min for the new board\\n                int res = helper(newBoard, hand);\\n                //if find a way to remove all balls\\n                if(res != -1) {\\n                    min = Math.min(min, res+missing);\\n                }\\n                //recover the balls in hand for further computation\\n                hand.put(nowChar, hand.get(nowChar)+missing);\\n\\n            }\\n            count = 1;\\n\\n        }\\n        return min == Integer.MAX_VALUE ? -1:min;\\n    }\\n\\n    //method to shrink the board if possible.\\n    public void shrinkBoard(StringBuilder b) {\\n        if(b.length() < 3) return;\\n        boolean clean = true;\\n        int count = 0;\\n        char c = b.charAt(0);\\n        for (int i = 0; i < b.length(); i++) {\\n            if(b.charAt(i) == c) count++;\\n            else {\\n                if(count >= 3) {\\n                    b.delete(i-count,i);\\n                    clean = false;\\n                    count = 0;\\n                    break;\\n                } else {\\n                    c = b.charAt(i);\\n                    count = 1;\\n                }\\n            }\\n        }\\n        if(count >= 3) {\\n            b.delete(b.length()-count, b.length());\\n            clean = false;\\n        }\\n\\n        if(!clean) shrinkBoard(b);\\n    }\\n    //test hand is empty or not.\\n    public boolean handIsEmpty(Map<Character,Integer> hand) {\\n        for(int temp:hand.values()) {\\n            if(temp != 0 ) return false;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"97059",
			"view":"1001",
			"top":"8",
			"title":"Search and memorize Java solution",
			"vote":"2",
			"content":"Just searching and memorizing...\\nIt is not a good interview question because many codes are not related to the algorithm.\\n\\n```\\npublic class Solution {\\n\\t    public int findMinStep(String board, String hand) {\\n\\t        HashMap<Character, int[]> mhand = new HashMap<Character, int[]>();\\n\\t        mhand.put('R', new int[]{0});\\n\\t        mhand.put('Y', new int[]{0});\\n\\t        mhand.put('B', new int[]{0});\\n\\t        mhand.put('G', new int[]{0});\\n\\t        mhand.put('W', new int[]{0});\\n\\t        for(char c:hand.toCharArray()){\\n\\t                mhand.get(c)[0]++;\\n\\t        }\\n\\t        HashMap<String, Integer> record = new HashMap<String, Integer>();\\n\\t        int min = helper(board, mhand, record);\\n\\t        if(min>=10000){\\n\\t            return -1;\\n\\t        } else {\\n\\t            return min;\\n\\t        }\\n\\t    }\\n\\t    \\n\\t    int helper(String board, HashMap<Character, int[]> hand, HashMap<String, Integer> record){\\n\\t        if(board.length()==0){\\n\\t            return 0;\\n\\t        } else {\\n\\t            int min = 10000;\\n                for(int i=0;i<board.length();i++){\\n                    if(hand.get(board.charAt(i))[0]>0){\\n                        hand.get(board.charAt(i))[0]--;\\n                        String newboard = board.substring(0,i)+board.charAt(i)+board.substring(i);\\n                        newboard = further(newboard);\\n                        String c = code(newboard, hand);\\n\\t                    if(record.containsKey(c)){\\n\\t                    \\tmin = Math.min(min, 1+record.get(c));\\n\\t                    } else {\\n\\t                    \\tint s = helper(newboard, hand, record);\\n\\t                    \\tmin = Math.min(min, 1+s);\\n\\t                    \\trecord.put(c, s);\\n\\t                    }\\n                        hand.get(board.charAt(i))[0]++;\\n                    }\\n                }\\n\\t            return min;\\n\\t        }\\n\\t    }\\n\\t    String further(String board){\\n\\t        if(board.length()==0){\\n\\t            return \"\";\\n\\t        }\\n\\t        int count=1;\\n\\t        for(int i=1;i<board.length();i++){\\n\\t            if(board.charAt(i-1)==board.charAt(i)){\\n\\t                count++;\\n\\t            } else {\\n\\t                if(count>=3){\\n\\t                    return further(board.substring(0, i-count)+board.substring(i));\\n\\t                } else {\\n\\t                    count=1;\\n\\t                }\\n\\t            }\\n\\t        }\\n\\t        if(count>=3){\\n\\t            return board.substring(0, board.length()-count);\\n\\t        }\\n\\t        return board;\\n\\t    }    \\n\\t    String code(String board, HashMap<Character, int[]> hand){\\n\\t    \\tStringBuilder sb = new StringBuilder();\\n\\t    \\tsb.append(board);\\n\\t    \\tfor(Map.Entry<Character, int[]> e: hand.entrySet()){\\n\\t    \\t\\tsb.append(e.getKey());\\n\\t    \\t\\tsb.append(e.getValue()[0]);\\n\\t    \\t}\\n\\t    \\treturn sb.toString();\\n\\t    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97013",
			"view":"108",
			"top":"9",
			"title":"Java DFS Iteration code, using Stack",
			"vote":"1",
			"content":"```\\npublic int findMinStep(String board, String hand) {\\n        Map<Character, Integer> rootMap = new HashMap<>();\\n        for (char c : hand.toCharArray()) {\\n            if (!rootMap.containsKey(c)) {\\n                rootMap.put(c, 1);\\n            } else {\\n                rootMap.put(c, rootMap.get(c) + 1);\\n            }\\n        }\\n        int rootBall = hand.length();\\n        StringBuilder rootString = new StringBuilder(board);\\n        Stack<TreeNode> stack = new Stack<>();\\n        stack.push(new TreeNode(rootString, rootMap, rootBall));\\n        int result = Integer.MAX_VALUE;\\n        while (!stack.isEmpty()) {\\n            TreeNode node = stack.pop();\\n            // Leaf Node:\\n            if (node._cur.length() == 0) {\\n                result = Math.min(hand.length() - node._remainBall, result);\\n            }\\n            // push children\\n            if (hand.length() - node._remainBall < result) {  // Improving performance by pruning\\n                int i = 0; // start point\\n                for (int j = 1; j <= node._cur.length(); j++) {\\n                    StringBuilder childcur = new StringBuilder(node._cur);\\n                    if (j == node._cur.length() || node._cur.charAt(j) != node._cur.charAt(i)) {\\n                        if (j - i >= 3) {\\n                            childcur.delete(i, j);\\n                            stack.push(new TreeNode(childcur, node._map, node._remainBall));\\n                        } else if (j - i < 3 && node._map.containsKey(node._cur.charAt(i)) && node._map.get(node._cur.charAt(i)) >= 3 - (j - i)) {\\n                            childcur.delete(i, j);\\n                            Map<Character, Integer> childMap = new HashMap<>(node._map);\\n                            childMap.put(node._cur.charAt(i), childMap.get(node._cur.charAt(i)) - (3 - (j - i)));\\n                            stack.push(new TreeNode(childcur, childMap, node._remainBall - (3 - (j - i))));\\n                        }\\n                        i = j; // set start point to cur position\\n                    }\\n                }\\n            }\\n        }\\n        return result == Integer.MAX_VALUE ? -1 : result;\\n    }\\n\\n    private class TreeNode {\\n        StringBuilder _cur;\\n        Map<Character, Integer> _map;\\n        int _remainBall;\\n        TreeNode(StringBuilder cur, Map<Character, Integer> map, int remainBall) {\\n            _cur = cur;\\n            _map = map;\\n            _remainBall = remainBall;\\n        }\\n    }\\n````"
		}
	],
	"id":"480",
	"title":"Zuma Game",
	"content":"<p>Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.</p>\n<p>\nEach time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.</p>\n<p>\nFind the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.\n</p>\n<pre>\n<p><b>Examples:</b><br />\n<b>Input:</b> \"WRRBBW\", \"RB\"\n<b>Output:</b> -1\n<b>Explanation:</b> WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW\n\n<b>Input:</b> \"WWRRBBWW\", \"WRBRW\"\n<b>Output:</b> 2\n<b>Explanation:</b> WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty\n\n<b>Input:</b>\"G\", \"GGGGG\"\n<b>Output:</b> 2\n<b>Explanation:</b> G -> G[G] -> GG[G] -> empty \n\n<b>Input:</b> \"RBYYBBRRB\", \"YRBGB\"\n<b>Output:</b> 3\n<b>Explanation:</b> RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty \n</pre>\n</p>\n\n<p><b>Note:</b><br>\n<ol>\n<li>You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.</li>\n<li>The number of balls on the table won't exceed 20, and the string represents these balls is called \"board\" in the input.</li>\n<li>The number of balls in your hand won't exceed 5, and the string represents these balls is called \"hand\" in the input.</li>\n<li>Both input strings will be non-empty and only contain characters 'R','Y','B','G','W'.</li>\n</ol>\n</p>",
	"frequency":"65",
	"ac_num":"5353"
}