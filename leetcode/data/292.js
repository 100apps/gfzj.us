{
	"difficulty":"1",
	"submit_num":"276806",
	"show_id":"292",
	"leetcode_id":"292",
	"answers":[
		{
			"lc_ans_id":"73749",
			"view":"28191",
			"top":"0",
			"title":"Theorem: all 4s shall be false",
			"vote":"154",
			"content":"> Theorem: The first one who got the number that is multiple of 4 (i.e. n % 4 == 0) will lost, otherwise he/she will win.\\n\\nProof: \\n\\n 1. the base case: when `n = 4`, as suggested by the hint from the problem, no matter which number that that first player, the second player would always be able to pick the remaining number.\\n \\n 2. For `1* 4 < n < 2 * 4, (n = 5, 6, 7)`, the first player can reduce the initial number into 4 accordingly, which will leave the death number 4 to the second player. i.e. The numbers 5, 6, 7 are winning numbers for any player who got it first. \\n\\n 3. Now to the beginning of the next cycle, `n = 8`, no matter which number that the first player picks, it would always leave the winning numbers (5, 6, 7) to the second player. Therefore, 8 % 4 == 0, again is a death number.\\n\\n 4. Following the second case, for numbers between (2\\\\*4 = 8) and (3\\\\*4=12), which are `9, 10, 11`, are winning numbers for the first player again, because the first player can always reduce the number into the death number 8.\\n\\n\\nFollowing the above theorem and proof, the solution could not be simpler: \\n\\n    public boolean canWinNim(int n) {    \\n        return n % 4 != 0 ;\\n    }"
		},
		{
			"lc_ans_id":"73760",
			"view":"12887",
			"top":"1",
			"title":"One line O(1) solution and explanation",
			"vote":"60",
			"content":"suppose there are x stones left for first player (A), he can take 1,2,3 stones away, so second player B will have three cases to deal with (x -1), (x-2), (x-3). after he pick the stones, there will be 9 cases left for A.\\n\\n    B (x-1) -> A: (x-2), (x-3), (x-4)\\n    B (x-2) -> A: (x-3), (x-4), (x-5)\\n    B (x-3) -> A: (x-4), (x-5), (x-6)\\n\\nNow, if A can guarantee he win at either of three groups, then he can force B to into that one of the three states and A can end up in that particular group after B's move. \\n\\n    f(x) = (f(x-2)&&f(x-3)&&f(x-4)) || (f(x-3)&&f(x-4)&&f(x-5)) || (f(x-4)&&f(x-5)&&f(x-6))\\n\\nif we examine the equation a little closer, we can find f(x - 4) is a critical point, if f(x-4) is false, then f(x) will be always false.\\n\\nwe can also find out the initial conditions, f(1), f(2), f(3) will be true (A always win), and f(4) will be false. so\\nbased on previous equation and initial conditions f(5) = f(6) = f(7) = true, f(8) = false;\\nobviously, f(1), f(2), f(3) can make all f(4n + 1), f(4n + 2), f(4n + 3) to be true, only f(4n) will be false then.\\nso here we go our one line solution:\\n\\nreturn (n % 4 != 0);"
		},
		{
			"lc_ans_id":"73837",
			"view":"5925",
			"top":"2",
			"title":"O(1) Efficient Single-line Java using Bit Checking",
			"vote":"39",
			"content":"If the two least significant bits of `n` are zeros, you will never win.\\nWhy? Because **whoever is dealt a hand of 4 will never win**. Since your opponent is also very smart, she can reduce any multiple of `4` to `4` for you and you'll never win. Instead of using modulo or division, you can verify if a number is a multiple of `4` by checking its two least significant bits.\\n\\n    public boolean canWinNim(int n) {\\n      return (n & 0b11) != 0;\\n    }"
		},
		{
			"lc_ans_id":"73863",
			"view":"4185",
			"top":"3",
			"title":"1 line 0 ms C++ solution with explanation",
			"vote":"31",
			"content":"**Explanation:** <br>\\nAt first this problem might seems a bit tough but it is easy and has a pattern which is as follow. <br>\\nI have applied the bottom up dynamic programming approach to fill the array and noticed that only number divisible by 4 are the positions where player1(playing first chance) is losing. <br>\\n\\n    class Solution {\\n    public:\\n        bool canWinNim(int n) {\\n            return n%4 ;\\n        }\\n    };\\n\\n 1. **Base case :** <i><br> \\n   If the numbers of stones are 1,2 or 3, then player 1 will win. <br>\\n   If the numbers of stones are 4, then player 1 will lose irrespective of the number of stones he/she remove<br>\\n   So lookup table will look like this : W[1]->W[2]->W[3]->L[4]. <br>\\n 2. For num_stones=5, the player can either remove 1,2 or 3 stones i.e. the other player (player 2) will win if the number of stones left are 1,2 or 3 and will lose only when the number of stones left are 4 ( see the lookup table in step 1) . <br> So, if Player1 remove 1 stone, the number of stones left will be 4, which will defeat player2. So, now the lookup entry for num_stones=5 will be W. \\nLookup now will look like this : W->W->W->L->W (for player 1-> who is taking the first chance). <br>\\n 3. Likewise, we can fill the complete lookup table by looking at the values at last three index. If anyone of them is L => Player 1 will win the game as he will remove only that many number of stones which will bring player 2 to the L position <br>\\n 4. In the end, you will notice that only positions 4->8->12->16 will contain L for player 1 thus answer is simple n%4."
		},
		{
			"lc_ans_id":"73845",
			"view":"6347",
			"top":"4",
			"title":"Two Java Solution.",
			"vote":"31",
			"content":"DP : Line 7: java.lang.OutOfMemoryError: Java heap space\\n\\n    public boolean canWinNim(int n) {\\n        if(n <= 0)\\n            throw new IllegalArgumentException();\\n        if(n < 4)\\n            return true;\\n        boolean[] res = new boolean[n + 1];\\n        res[0] = true;\\n        res[1] = true;\\n        res[2] = true;\\n        res[3] = true;\\n        for(int i = 4 ; i <= n ; i++)\\n            res[i] = !(res[i - 1] && res[i - 2] && res[i - 3]);\\n        return res[n];\\n    }\\n\\nDirectly\\n\\n    if(n <= 0)\\n        throw new IllegalArgumentException();\\n    return !(n % 4 == 0);"
		},
		{
			"lc_ans_id":"73851",
			"view":"5039",
			"top":"5",
			"title":"1 liner with explanations",
			"vote":"30",
			"content":"    class Solution(object):\\n        def canWinNim(self, n):\\n            \"\"\"\\n            :type n: int\\n            :rtype: bool\\n            \"\"\"\\n            # strategy: the one with 4 remaining must loose\\n            # A, B players\\n            # if n == 4k, then at each round B can make A+B both take 4, \\n            # eventually leave 4 to A, A lose\\n            # if n == 4k + i (i <= 3), then A can always take i first and B will\\n            # finanly lose as he faces above scenario like A\\n    \\n            return bool(n%4!=0)"
		},
		{
			"lc_ans_id":"73774",
			"view":"8068",
			"top":"6",
			"title":"If I'm a interviewer, I prefer the candidates using burte force instead of math method.",
			"vote":"20",
			"content":"Because it is a \"coding interview\", not acm/icpc or other competitions. Similar to Josephus Cycle, I prefer LinkedList Cycle than Mod-Method during interviews. Here's a backtraking-dp solution.\\n\\n    public class Solution {\\n        public boolean canWinNim(int n) {\\n    \\t\\t    if(n>=134882061){//I have no any other ways,please forgive my unchastity(\\u65e0\\u8282\\u64cd)!\\n    \\t\\t\\t   return n%4 != 0;\\n    \\t\\t    }\\n    \\t\\t    int[] array=new int[n+1];\\n    \\t        return dfs(n, array);\\n    \\t }\\n    \\t public boolean dfs(int n,int[] array){\\n    \\t\\t if(array[n]!=0){\\n    \\t\\t\\t return array[n]==1?true:false;\\n    \\t\\t }\\n    \\t\\t if(n<=3){\\n    \\t        \\tarray[n]=1;\\n    \\t        \\treturn true;\\n    \\t        }else{\\n    \\t        \\tfor(int i=1;i<=3;i++){\\n    \\t        \\t\\tif(!dfs(n-i,array)){\\n    \\t        \\t\\t\\tarray[n-i]=-1;\\n    \\t        \\t\\t\\tarray[n]=1;\\n    \\t        \\t\\t\\treturn true;\\n    \\t        \\t\\t}\\n    \\t        \\t}\\n    \\t        \\tarray[n]=-1;\\n    \\t        \\treturn false;\\n    \\t        }\\n    \\t }\\n    }"
		},
		{
			"lc_ans_id":"73841",
			"view":"1404",
			"top":"7",
			"title":"Math Proof for: 4k is a Sufficient and Necessary Condition for Not Win",
			"vote":"18",
			"content":"Sufficient Condition (\"n = 4k => the first guy encounters n = 4k will fail\")\\n\\n  (1) Base case, true;   (2) Assume n = 4k makes one who take the first step from n=4k fail. For n = 4(k+1), you have no strategy to make your opponent be the one take the first step from n'=4k, while he can, thus you will fail. Therefore, for any \"n = 4k\", you will fail.\\n\\nNecessary Condition (\"fail => n = 4k\")\\n\\nIf the statement \"fail => n = 4k\" is true then the statement \"n != 4k => win\" is true. We can prove the later one: if n != 4k, thus n = 4k +1, or 4k + 2, or 4k + 3. For any of n = 4k +1, or 4k + 2, or 4k + 3, you can remove 1, or 2, or 3 stones to make your opponent be the guy who first encounter \"n is a multiple of 4 (n = 4 k' )\" situation in which the opponent is doom to fail, because we have proved \"n = 4k => the first guy encounters n = 4k will fail\". Therefore we've prove \"n != 4k => win\" is true, so \"fail => n = 4k\" is true.\\n\\nSo now we can confirm the one line solution is correct:\\n\\n```\\n    return n%4 == 0? false: true;\\n```"
		},
		{
			"lc_ans_id":"73809",
			"view":"3301",
			"top":"8",
			"title":"Simple java solution with explanation",
			"vote":"17",
			"content":"\\n    public boolean canWinNim(int n) {\\n        if (n <= 0) {return false;}\\n        return n % 4 != 0;\\n    }\\n\\n\\n----------\\n\\n - According to the hint, we know that if n = 4, no matter how many stones I remove, I lose. If n = 5, I can remove one stone and there are 4 stones for another player. Thus, I win. Similarly, if n = 6 or 7, I can remove 2 or 3 stones and i win finally.\\n - If n = 8, no matter how many stones I remove, there are 7 or 6 or 5 stones for another player, s/he can remove stones as we said before and then wins.\\n - If n = 9 or 10 or 11, I can leave 8 stones to another player, then I win.\\n - If n = 12, I can leave 9, 10 or 11 stones to another player. Then, s/he can leave 8 stones to me, then I lose.\\n......\\n - The rule is: if (n % 4 == 0) then I lose."
		},
		{
			"lc_ans_id":"73829",
			"view":"4243",
			"top":"9",
			"title":"Simple one line code  get the result (java)",
			"vote":"13",
			"content":"    public boolean canWinNim(int n) {\\n        return n % 4 != 0;\\n    }\\n\\nP.s. It passed test case, but it didn't cover negative input\\n\\n    canWinNim(-1);\\n\\n I guess we don't have to care for illegal input when submit solution here."
		}
	],
	"id":"292",
	"title":"Nim Game",
	"content":"<p>\r\nYou are playing the following Nim Game with your friend: There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove the stones.\r\n</p>\r\n\r\n<p>\r\nBoth of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones in the heap.\r\n</p>\r\n\r\n<p>\r\nFor example, if there are 4 stones in the heap, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"627",
	"ac_num":"153166"
}