{
	"difficulty":"2",
	"submit_num":"66399",
	"show_id":"294",
	"leetcode_id":"294",
	"answers":[
		{
			"lc_ans_id":"73954",
			"view":"26827",
			"top":"0",
			"title":"Theory matters - from Backtracking(128ms) to DP (0ms)",
			"vote":"203",
			"content":"\\n\\nAt first glance, backtracking seems to be the only feasible solution to this problem. We can basically try every possible move for the first player (Let's call him 1P from now on), and recursively check if the second player 2P has any chance to win. If 2P is guaranteed to lose, then we know the current move 1P takes must be the winning move. The naive implementation is actually very simple:\\n\\n    int len;\\n    string ss;\\n    bool canWin(string s) {\\n        len = s.size();\\n        ss = s;\\n        return canWin();\\n    }\\n    bool canWin() {\\n        for (int is = 0; is <= len-2; ++is) {\\n            if (ss[is] == '+' && ss[is+1] == '+') {\\n                ss[is] = '-'; ss[is+1] = '-';\\n                bool wins = !canWin(); \\n                ss[is] = '+'; ss[is+1] = '+';\\n                if (wins) return true;\\n            }\\n        }\\n        return false;\\n    } \\n\\n\\nNow let's check the time complexity: Suppose originally the board of size N contains only '+' signs, then roughly we have:\\n\\n\\n    T(N) = (N-2) * T(N-2) = (N-2) * (N-4) * T(N-4) ... = (N-2) * (N-4) * (N-6) * ... ~ O(N!!)\\n\\nThis algorithm can be optimized with memoization. For instance: \\nhttps://discuss.leetcode.com/topic/27291/memoization-3150ms-130ms-44ms-python\\n\\nCan we even do better than that? Sure! Below I'll show the time complexity can be reduced to O(N^2) using Dynamic Programming, but the improved method requires some non-trivial understanding of the game theory, and therefore is not expected in a real interview. If you are not interested, please simply skip the rest of the article:\\n\\n------------------------------------------------------------\\n\\n> Concept 1 (**Impartial Game**): Given a particular arrangement of the game\\n> board, if either player have exactly the same set of moves should he\\n> move first, and both players have exactly the same winning condition,\\n> then this game is called **impartial game**. For example, chess is not\\n> impartial because the players can control only their own pieces, and\\n> the +- flip game, on the other hand, is impartial.\\n\\n--\\n\\n> Concept 2 (**Normal Play vs Misere Play**): If the winning condition of\\n> the game is that the **opponent has no valid moves**, then this game is\\n> said to follow the **normal play convention**; if, alternatively, the\\n> winning condition is that the **player himself has no valid moves,** then\\n> the game is a **Misere** game. Our +- flip has  apprently normal play.\\n\\nNow we understand the the flip game is an impartial game under normal play. Luckily, this type of game has been extensively studied. Note that our following discussion only applies to normal impartial games.\\n\\nIn order to simplify the solution, we still need to understand one more concept:\\n\\n> Concept 3 (**Sprague-Grundy Function**): Suppose x represents a particular\\n> arrangement of board, and x_0, x_1, x_2, ... ,x_k represent the board\\n> after a valid move, then we define the Sprague-Grundy function as:\\n \\n     g(x) = FirstMissingNumber(g(x_0), g(x_1), g(x_2), ... , g(x_k)). \\n\\n> where FirstMissingNumber(y) stands for the smallest positive number\\n> that is not in set y. For instance, if g(x_0) = 0, g(x_1) = 0, g(x_k) =\\n> 2, then g(x) = FMV({0, 0, 2}) = 1.\\n\\nWhy do we need this bizarre looking S-G function? Because we can instantly decide whether 1P has a winning move simply by looking at its value. I don't want to write a book out of it, so for now, please simply take the following theorem for granted:\\n\\n> Theorem 1: If g(x) != 0, then 1P must have a guaranteed winning move\\n> from board state x. Otherwise, no matter how 1P moves, 2P must then\\n> have a winning move.\\n\\nSo our task now is to calculate g(board). But how to do that? Let's first of all find a way to numerically describe the board. Since we can only flip ++ to --, then apparently, we only need to write down the lengths of consecutive ++'s of length >= 2 to define a board. For instance, ++--+-++++-+----- can be represented as (2, 4).\\n\\n(2, 4) has two separate '+' subsequences. Any operation made on one subsequence does not interfere with the state of the other. Therefore, we say (2, 4) consists of two **subgames**: (2) and (4).\\n\\nOkay now we are only one more theorem away from the solution. This is the last theorem. I promise:\\n\\n> Theorem 2 (**Sprague-Grundy Theorem**): The S-G function of game x = (s1,\\n> s2, ..., sk) equals the XOR of all its subgames s1, s2, ..., sk. e.g.\\n> g((s1, s2, s3)) = g(s1) XOR g(s2) XOR g(s3).\\n\\nWith the S-G theorem, we can now compute any arbitrary g(x). If x contains only one number N (there is only one '+' subsequence), then \\n\\n    g(x) = FMV(g(0, N-2), g(1, N-3), g(2, N-4), ... , g(N/2-1, N-N/2-2));\\n         = FMV(g(0)^g(N-2), g(1)^g(N-3), g(2)^g(N-4)), ... g(N/2-1, N-N/2-2));\\n\\nNow we have the whole algorithm:\\n\\n    Convert the board to numerical representation: x = (s1, s2, ..., sk)\\n    Calculate g(0) to g(max(si)) using DP.\\n    if g(s1)^g(s2)^...^g(sk) != 0 return true, otherwise return false.\\n\\nCalculating g(N) takes O(N) time (N/2 XOR operations plus the O(N) First Missing Number algorithm). And we must calculate from g(1) all the way to g(N). So overall, the algorithm has an O(N^2) time complexity.\\n\\nNaturally, the code is bit more complicated than the backtracking version. But it reduces the running time from ~128ms to less than 1ms. The huge improvement is definitely worth all the hassle we went through:\\n\\n------------------------------------------------------------\\n\\n\\n    int firstMissingNumber(unordered_set<int> lut) {\\n        int m = lut.size();\\n        for (int i = 0; i < m; ++i) {\\n            if (lut.count(i) == 0) return i;\\n        }\\n        return m;\\n    }\\n    \\n    bool canWin(string s) {\\n        int curlen = 0, maxlen = 0;\\n        vector<int> board_init_state;\\n        for (int i = 0; i < s.size(); ++i) {    \\n            if (s[i] == '+') curlen++;              // Find the length of all continuous '+' signs\\n            if (i+1 == s.size() || s[i] == '-') {\\n                if (curlen >= 2) board_init_state.push_back(curlen);    // only length >= 2 counts\\n                maxlen = max(maxlen, curlen);       // Also get the maximum continuous length\\n                curlen = 0;\\n            }\\n        }          // For instance ++--+--++++-+ will be represented as (2, 4)\\n        vector<int> g(maxlen+1, 0);    // Sprague-Grundy function of 0 ~ maxlen\\n        for (int len = 2; len <= maxlen; ++len) {\\n            unordered_set<int> gsub;    // the S-G value of all subgame states\\n            for (int len_first_game = 0; len_first_game < len/2; ++len_first_game) {\\n                int len_second_game = len - len_first_game - 2;\\n                // Theorem 2: g[game] = g[subgame1]^g[subgame2]^g[subgame3]...;\\n                gsub.insert(g[len_first_game] ^ g[len_second_game]);\\n            }\\n            g[len] = firstMissingNumber(gsub);\\n        }\\n        \\n        int g_final = 0;\\n        for (auto& s: board_init_state) g_final ^= g[s];\\n        return g_final != 0;    // Theorem 1: First player must win iff g(current_state) != 0\\n     }\\n\\n-------------------"
		},
		{
			"lc_ans_id":"73962",
			"view":"14731",
			"top":"1",
			"title":"Share my Java backtracking solution",
			"vote":"88",
			"content":"The idea is try to replace every `\"++\"` in the current string `s` to `\"--\"` and see if the opponent can win or not, if the opponent cannot win, great, we win!\\n\\nFor the time complexity, here is what I thought, let's say the length of the input string `s` is `n`, there are at most `n - 1` ways to replace `\"++\"` to `\"--\"` (imagine `s` is all `\"+++...\"`), once we replace one `\"++\"`, there are at most `(n - 2) - 1` ways to do the replacement, it's a little bit like solving the N-Queens problem, the time complexity is `(n - 1) x (n - 3) x (n - 5) x ...`, so it's `O(n!!)`, [double factorial][1]. \\n\\nThat's what I thought, but I could be wrong :)\\n\\n    public boolean canWin(String s) {\\n      if (s == null || s.length() < 2) {\\n        return false;\\n      }\\n        \\n      for (int i = 0; i < s.length() - 1; i++) {\\n        if (s.startsWith(\"++\", i)) {\\n          String t = s.substring(0, i) + \"--\" + s.substring(i + 2);\\n          \\n          if (!canWin(t)) {\\n            return true;\\n          }\\n        }\\n      }\\n        \\n      return false;\\n    }\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Double_factorial"
		},
		{
			"lc_ans_id":"73958",
			"view":"8308",
			"top":"2",
			"title":"Memoization: 3150ms -> 130ms -> 44ms (Python)",
			"vote":"32",
			"content":"**Without memoization:  \\n~ 3150 ms**\\n\\n    class Solution(object):\\n        def canWin(self, s):\\n            return any(s[i:i+2] == '++' and not self.canWin(s[:i] + '-' + s[i+2:])\\n                       for i in range(len(s)))\\n\\n---\\n\\n**With memoization:  \\n~ 130 ms**\\n\\n    class Solution(object):\\n        _memo = {}\\n        def canWin(self, s):\\n            memo = self._memo\\n            if s not in memo:\\n                memo[s] = any(s[i:i+2] == '++' and not self.canWin(s[:i] + '-' + s[i+2:])\\n                              for i in range(len(s)))\\n            return memo[s]\\n\\n---\\n\\n**With memoization:  \\n~ 140 ms**\\n\\nThe previous one reuses memoized results from previous test cases, but that's not why it's fast. It's almost as fast without that.\\n\\n    class Solution(object):\\n        def canWin(self, s):\\n            memo = {}\\n            def can(s):\\n                if s not in memo:\\n                    memo[s] = any(s[i:i+2] == '++' and not can(s[:i] + '-' + s[i+2:])\\n                                  for i in range(len(s)))\\n                return memo[s]\\n            return can(s)\\n\\n---\\n\\n**With memoization and counts instead of a string:  \\n~ 44 ms**\\n\\nUsing tuples like `(2, 3)` to represent a state instead of strings like `\"-+++---++--\"`.\\n\\n    class Solution(object):\\n        def canWin(self, s):\\n            memo = {}\\n            def can(piles):\\n                piles = tuple(sorted(p for p in piles if p >= 2))\\n                if piles not in memo:\\n                    memo[piles] = any(not can(piles[:i] + (j, pile-2-j) + piles[i+1:])\\n                                      for i, pile in enumerate(piles)\\n                                      for j in range(pile - 1))\\n                return memo[piles]\\n            return can(map(len, re.findall(r'\\\\+\\\\++', s)))"
		},
		{
			"lc_ans_id":"73982",
			"view":"4798",
			"top":"3",
			"title":"Simple backtracking inspired by Flip Game I",
			"vote":"23",
			"content":"    public boolean canWin(String s) {\\n        List<String> list = new ArrayList<>();\\n        for(int i = 0; i < s.length() - 1; i++){\\n            if(s.charAt(i) == '+' && s.charAt(i + 1) == '+')\\n                list.add(s.substring(0, i) + \"--\" + s.substring(i + 2, s.length()));         // generate all possible sequence after every attempt\\n        }\\n        /*if(list.isEmpty())\\n            return false;*/\\n        for(String str : list){\\n            if(!canWin(str))             // if there is any one way the next player can't win, take it and you'll win\\n                return true;\\n        }\\n        return false;      \\n    }"
		},
		{
			"lc_ans_id":"73971",
			"view":"6398",
			"top":"4",
			"title":"Java backtracking solution with time optimization through DP(205ms -> 19ms)",
			"vote":"18",
			"content":"Thanks jeantimex for sharing his code and explanation. \\n\\nhttps://leetcode.com/discuss/64291/share-my-java-backtracking-solution\\n\\nThe idea of the solution is clear, but the time complexity of the backtracking method is high. During the process of searching, we could encounter duplicate computation as the following simple case. \\n\\n**One search path**:\\n\\nInput s = \"++++++++\"\\n\\nPlayer 0: \"--++++++\"\\n\\nPlayer 1: \"----++++\"\\n\\nPlayer 0: \"----+--+\"\\n\\nPlayer0 can win for the input string  as \"----++++\".\\n\\n**Another search path**: \\n\\nPlayer 0: \"++--++++\"\\n\\nPlayer 1: \"----++++\"\\n\\nPlayer 0: \"----+--+\"\\n\\n(Duplicate computation happens. We have already known anyone can win for the \\n\\ninput string  as \"----++++\".)\\n\\n\\n**Use a HashMap to avoid duplicate computation**\\n\\nKey :  InputString.\\n\\nValue: can win or not.\\n\\n   \\n    public boolean canWin(String s) {\\n        if (s == null || s.length() < 2) {\\n            return false;\\n        }\\n        HashMap<String, Boolean> winMap = new HashMap<String, Boolean>();\\n        return helper(s, winMap);\\n    }\\n    \\n    public boolean helper(String s, HashMap<String, Boolean> winMap) {\\n        if (winMap.containsKey(s)) {\\n            return winMap.get(s);\\n        }\\n        for (int i = 0; i < s.length() - 1; i++) {\\n            if (s.startsWith(\"++\", i)) {\\n                String t = s.substring(0, i) + \"--\" + s.substring(i+2);\\n                if (!helper(t, winMap)) {\\n                    winMap.put(s, true);\\n                    return true;\\n                }\\n            }\\n        }\\n        winMap.put(s, false);\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"73998",
			"view":"1172",
			"top":"5",
			"title":"Python Solution 3 Lines",
			"vote":"9",
			"content":"    def canWin(self, s):\\n        for i in xrange(len(s)-1):\\n            if s[i]=='+' and s[i+1]=='+' and not self.canWin(s[:i]+'--'+s[i+2:]): return True\\n        return False"
		},
		{
			"lc_ans_id":"73960",
			"view":"2387",
			"top":"6",
			"title":"Neat C++ code with DFS",
			"vote":"9",
			"content":"    bool canWin(string s) {\\n        if (s.size() == 0) {\\n            return false;\\n        }\\n        \\n        bool isMoved = false;\\n        for (size_t i = 0; i < s.size() - 1; ++i) {\\n            if (s[i] == '+' && s[i + 1] == '+') {\\n                isMoved = true;\\n                s[i] = '-';\\n                s[i + 1] = '-';\\n                if (!canWin(s)) {\\n                    return true;\\n                }\\n                s[i] = '+';\\n                s[i + 1] = '+';\\n            }\\n        }\\n        \\n        if (!isMoved) {\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"73961",
			"view":"1139",
			"top":"7",
			"title":"Is \"guarantee a win\" equivalent to \"win\"?",
			"vote":"6",
			"content":"I'm not sure why the simple recursive algorithm would work. It replaces every pair of \"++\" in the original string with \"--\" and ask the questions: can my opponent win? \\n\\nHowever, the canWin() function returns true if the current player is \"guarantee a win\", and it returns false if the current player cannot guarantee a win - meaning the current player might win or lose depending on the action of the opponent. If this is the case, why algorithm like [this][1] works?\\n\\n\\n\\n \\n\\n\\n  [1]: https://leetcode.com/discuss/64291/share-my-java-backtracking-solution"
		},
		{
			"lc_ans_id":"74010",
			"view":"3180",
			"top":"8",
			"title":"Short Java & Ruby",
			"vote":"6",
			"content":"You win if and only if you can make some move so that the resulting state can't be won. One thing I do differently from everyone else so far is that I replace `\"++\"` with `\"-\"` instead of `\"--\"`.\\n\\n---\\n\\n**Ruby**\\n\\n    def can_win(s)\\n      (0..s.size).any? { |i| s[i,2] == \"++\" && !can_win(s[0, i] + \"-\" + s[i+2..-1]) }\\n    end\\n\\n---\\n\\n**Java**\\n\\nI let the library do the searching for \"++\", which I find nicer and apparently it's faster as well (see below).\\n\\n    public boolean canWin(String s) {\\n        for (int i=-1; (i = s.indexOf(\"++\", i+1)) >= 0; )\\n            if (!canWin(s.substring(0, i) + \"-\" + s.substring(i+2)))\\n                return true;\\n        return false;\\n    }\\n\\nBoth the library-searching and the `\"-\"`-replacement seem to speed it up significantly, here are results of submitting different similar solutions five times each:\\n\\nAverage 153 ms: Mine with `\"-\"` (150, 156, 152, 149 and 156)  \\nAverage 169 ms: Mine with `\"--\"` (184, 169, 156, 162 and 174)  \\nAverage 209 ms: [easonhu's](https://leetcode.com/discuss/64330/4-line-java-solution) (214, 204, 207, 207 and 213)  \\nAverage 221 ms: [jeantimex's](https://leetcode.com/discuss/64291/share-my-java-backtracking-solution) (168, 196, 202, 194 and 345) (without the 345 the average is 190 ms)"
		},
		{
			"lc_ans_id":"74027",
			"view":"749",
			"top":"9",
			"title":"1-line python solution",
			"vote":"5",
			"content":"    def canWin(self, s):\\n        return any(not self.canWin(s[:i]+\"--\"+s[i+2:]) for i in xrange(len(s)-1) if s[i:i+2] == \"++\")"
		}
	],
	"id":"294",
	"title":"Flip Game II",
	"content":"<p>\r\nYou are playing the following Flip Game with your friend: Given a string that contains only these two characters: <code>+</code> and <code>-</code>, you and your friend take turns to flip two <b>consecutive</b> <code>\"++\"</code> into <code>\"--\"</code>. The game ends when a person can no longer make a move and therefore the other person will be the winner.\r\n</p>\r\n\r\n<p>\r\nWrite a function to determine if the starting player can guarantee a win.\r\n</p>\r\n\r\n<p>\r\nFor example, given <code>s = \"++++\"</code>, return true. The starting player can guarantee a win by flipping the middle <code>\"++\"</code> to become <code>\"+--+\"</code>.\r\n</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nDerive your algorithm's runtime complexity.\r\n</p>",
	"frequency":"120",
	"ac_num":"31093"
}