{
	"difficulty":"2",
	"submit_num":"48543",
	"show_id":"486",
	"leetcode_id":"486",
	"answers":[
		{
			"lc_ans_id":"96828",
			"view":"12185",
			"top":"0",
			"title":"JAVA 9 lines DP solution, easy to understand with improvement to O(N) space complexity.",
			"vote":"97",
			"content":"The dp[i][j] saves how much ***more*** scores that the first-in-action player will get from i to j than the second player. First-in-action means whomever moves first. You can still make the code even shorter but I think it looks clean in this way.\\n\\n    public boolean PredictTheWinner(int[] nums) {\\n        int n = nums.length;\\n        int[][] dp = new int[n][n];\\n        for (int i = 0; i < n; i++) { dp[i][i] = nums[i]; }\\n        for (int len = 1; len < n; len++) {\\n            for (int i = 0; i < n - len; i++) {\\n                int j = i + len;\\n                dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);\\n            }\\n        }\\n        return dp[0][n - 1] >= 0;\\n    }\\n\\nHere is the code for O(N) space complexity:\\n```\\n\\npublic boolean PredictTheWinner(int[] nums) {\\n    if (nums == null) { return true; }\\n    int n = nums.length;\\n    if ((n & 1) == 0) { return true; } // Improved with hot13399's comment.\\n    int[] dp = new int[n];\\n    for (int i = n - 1; i >= 0; i--) {\\n        for (int j = i; j < n; j++) {\\n            if (i == j) {\\n                dp[i] = nums[i];\\n            } else {\\n                dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);\\n            }\\n        }\\n    }\\n    return dp[n - 1] >= 0;\\n}\\n\\n```\\n\\nEdit : Since I have some time now, I will explain how I come up with this solution step by step:\\n\\n1, The first step is to break the question into the sub-problems that we can program. From the question, the winning goal is that \"The player with the maximum score wins\". So one way to approach it is that we may want to find a way to maximize player 1's sum and check if it is greater than player 2's sum (or more than half of the sum of all numbers). Another way, after noting that the sum of all numbers is fixed, I realized that it doesn't matter how much player 1's total sum is as long as the sum is no less than player 2's sum. No matter how, I think we can easily recognize that it is a recursive problem where we may use the status on one step to calculate the answer for the next step. It is a common way to solve game problems. So we may start with using a brutal force recursive method to solve this one.\\n\\n2, However, we always want to do better than brutal force. We may easily notice that there will be lots of redundant calculation. For example, \"player 1 picks left, then player 2 picks left, then player 1 picks right, then player 2 picks right\" will end up the same as \"player 1 picks right, then player 2 picks right, then player 1 picks left, then player 2 picks left\". So, we may want to use dynamic programming to save intermediate states.\\n\\n3, I think it will be easy to think about using a two dimensional array dp[i][j] to save all the intermediate states. From step 1, we may see at least two ways of doing it. It just turned out that if we choose to save how much more scores that the first-in-action player will earn from position i to j in the array (as I did), the code will be better in a couple of ways.\\n\\n4, After we decide that dp[i][j] saves how much more scores that the first-in-action player will get from i to j than the second player, the next step is how we update the dp table from one state to the next. Going back to the question, each player can pick one number either from the left or the right end of the array. Suppose they are picking up numbers from position i to j in the array and it is player A's turn to pick the number now. If player A picks position i, player A will earn nums[i] score instantly. Then player B will choose from i + 1 to j. Please note that dp[i + 1][j] already saves how much more score that the first-in-action player will get from i + 1 to j than the second player. So it means that player B will eventually earn dp[i + 1][j] more score from i + 1 to j than player A. So if player A picks position i, eventually player A will get nums[i] - dp[i + 1][j] more score than player B after they pick up all numbers. Similarly, if player A picks position j, player A will earn nums[j] - dp[i][j - 1] more score than player B after they pick up all numbers. Since A is smart, A will always choose the max in those two options, so:\\ndp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);\\n\\n5, Now we have the recursive formula, the next step is to decide where it all starts. This step is easy because we can easily recognize that we can start from dp[i][i], where dp[i][i] = nums[i]. Then the process becomes a very commonly seen process to update the dp table. I promise that this is a very useful process. Everyone who is preparing for interviews should get comfortable with this process:\\nUsing a 5 x 5 dp table as an example, where i is the row number and j is the column number. Each dp[i][j] corresponds to a block at row i, column j on the table. We may start from filling dp[i][i], which are all the diagonal blocks. I marked them as 1. Then we can see that each dp[i][j] depends only on dp[i + 1][j] and dp[i][j - 1]. On the table, it means each block (i, j) only depends on the block to its left (i, j - 1) and to its down (i + 1, j). So after filling all the blocks marked as 1, we can start to calculate those blocks marked as 2. After that, all blocks marked as 3 and so on.\\n![0_1488092542752_dp.jpg](/uploads/files/1488092557587-dp.jpg) \\nSo in my code, I always use len to denote how far the block is away from the diagonal. So len ranges from 1 to n - 1. Remember this is the outer loop. The inner loop is all valid i positions. After filling all the upper side of the table, we will get our answer at dp[0][n - 1] (marked as 5). This is the end of my code.\\n\\n6. However, if you are interviewing with a good company, they may challenge you to further improve your code, probably in the aspect of space complexity. So far, we are using a n x n matrix so the space complexity is O(n^2). It actually can be improved to O(n). That can be done by changing our way of filling the table. We may use only one dimensional dp[i] and we start to fill the table at the bottom right corner where dp[4] = nums[4]. On the next step, we start to fill the second to the last line, where it starts from dp[3] = nums[3]. Then dp[4] = Math.max(nums[4] - dp[3], nums[3] - dp[4]). Then we fill the third to the last line where dp[2] = nums[2] and so on... Eventually after we fill the first line and after the filling, dp[4] will be the answer.\\n\\n7. On a related note, whenever we do sum, subtract, multiply or divide of integers, we might need to think about overflow. It doesn't seem to be a point to check for this question. However, we may want to consider using long instead of int for some cases. Further, in my way of code dp[i][j] roughly varies around zero or at least it doesn't always increases with approaching the upper right corner. So it will be less likely to overflow."
		},
		{
			"lc_ans_id":"96838",
			"view":"14001",
			"top":"1",
			"title":"Java 1 Line Recursion Solution",
			"vote":"76",
			"content":"```\\npublic class Solution {\\n    public boolean PredictTheWinner(int[] nums) {\\n        return helper(nums, 0, nums.length-1)>=0;\\n    }\\n    private int helper(int[] nums, int s, int e){        \\n        return s==e ? nums[e] : Math.max(nums[e] - helper(nums, s, e-1), nums[s] - helper(nums, s+1, e));\\n    }\\n}\\n```\\n\\nInspired by @sameer13, add a cache: \\n```\\npublic class Solution {\\n    public boolean PredictTheWinner(int[] nums) {\\n        return helper(nums, 0, nums.length-1, new Integer[nums.length][nums.length])>=0;\\n    }\\n    private int helper(int[] nums, int s, int e, Integer[][] mem){    \\n        if(mem[s][e]==null)\\n            mem[s][e] = s==e ? nums[e] : Math.max(nums[e]-helper(nums,s,e-1,mem),nums[s]-helper(nums,s+1,e,mem));\\n        return mem[s][e];\\n    }\\n}\\n```\\n\\n**Explanation**\\nSo assuming the sum of the array it SUM, so eventually player1 and player2 will split the SUM between themselves. For player1 to win, he/she has to get more than what player2 gets. If we think from the prospective of one player, then what he/she gains each time is a **plus**, while, what the other player gains each time is a **minus**. Eventually if player1 can have a >0 total, player1 can win. \\n\\nHelper function simulate this process. In each round: \\nif e==s, there is no choice but have to select nums[s]\\notherwise, this current player has 2 options: \\n --> nums[s]-helper(nums,s+1,e): this player select the front item, leaving the other player a choice from s+1 to e\\n --> nums[e]-helper(nums,s,e-1): this player select the tail item, leaving the other player a choice from s to e-1\\nThen take the max of these two options as this player's selection, return it."
		},
		{
			"lc_ans_id":"96829",
			"view":"7415",
			"top":"2",
			"title":"DP O(n^2)  + MIT OCW solution explanation",
			"vote":"28",
			"content":"The idea is that this is a minimax game, and if you went to MIT and took 6.046 then you would have seen something similar to this problem in class.  And thanks to MIT OCW everyone can see the [explanation](https://youtu.be/Tw1k46ywN6E?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp&t=3622)\\n\\nThe DP solution \\n```\\nclass Solution {\\npublic:\\n    bool PredictTheWinner(vector<int>& nums) {\\n        if(nums.size()% 2 == 0) return true;\\n        \\n        int n = nums.size();\\n        vector<vector<int>> dp(n, vector<int>(n, -1));\\n        \\n        int myBest = utill(nums, dp, 0, n-1);\\n        return 2*myBest >= accumulate(nums.begin(), nums.end(), 0);\\n    }\\n    \\n    int utill(vector<int>& v, vector<vector<int>> &dp, int i, int j){\\n        if(i > j) return 0;\\n        if(dp[i][j] != -1) return dp[i][j];\\n        \\n        int a = v[i] + min(utill(v,dp, i+1, j-1), utill(v, dp, i+2, j));\\n        int b = v[j] + min(utill(v,dp,i, j-2), utill(v,dp, i+1, j-1));\\n        dp[i][j] = max(a, b);\\n                        \\n        return dp[i][j];\\n    }\\n};"
		},
		{
			"lc_ans_id":"96832",
			"view":"5266",
			"top":"3",
			"title":"C++ DP solution with explanation",
			"vote":"15",
			"content":"Store the maximum score player1 can get for any sub array [i, j]\\n\\nGiven an array ```A[i, j]```, player 1 can either take the first number A[i] or A[j], after that, it forms a new array``` A[i+1, j]``` or ```A[i, j-1]``` accordingly and it is player2's turn to pick up. The maximum score that player1 can get from the the sub arrays will be the larger one left by player2. So,\\n\\nDP formula: \\n```dp(i, j) = max(sum(i, j-1)  - dp(i, j-1) + nums[j], sum(i+1, j) - dp(i+1, j) + nums[i])```\\n\\nBecause  ```sum(i, j-1) + nums[j]  = sum(i, j) = nums[i] + sum(i+1, j)```, the formula can be simplified to\\n```dp(i, j) = max(sum(i, j)  - dp(i, j-1), sum(i, j) - dp(i+1, j))```\\n\\nMore simpler:\\n~~From ```dp(i, j) = max(sum(i, j)  - dp(i, j-1), sum(i, j) - dp(i+1, j))```, each ```dp(i, j)``` contains ```sum(i, j)```, then if we subtract the sum, it should have no impact to final result.~~\\n\\nThanks to @coder2 point out that the mistake of the dp formula deduction. \\n**If we do more deduction, we can eliminate the ```sum(i, j)``` from the formula**:\\nInstead of storing the maximum score that player 1 can get in each sub array, we can store the ```diff``` between player1 and player 2. For example: if player 1 get ```A```, player 2 get ```B```, **we can use ```dp'``` to store ```A-B```**. \\n\\nif ```A = dp(i, j)```, then ```B = sum(i, j) - dp(i, j)```\\n\\nSo ```dp'(i, j)``` =  ```dp(i, j) - ( sum(i, j) - dp(i, j) )``` = ```2*dp(i, j) - sum(i, j)```, so\\n```2*dp(i, j) = dp'(i, j) + sum(i, j)``` (**this will be used below**)\\n\\n```dp'(i, j)``` =  ```dp(i, j) - ( sum(i, j) - dp(i, j) )``` = ```2dp(i, j) - sum(i, j)```\\n= ``` 2 * max( sum(i, j)  - dp(i, j-1), sum(i, j) - dp(i+1, j) ) - sum(i, j)```\\n= ```max(sum(i, j) - 2*dp(i, j-1), sum(i, j) - 2*dp(i+1, j) )```\\n= ```max(sum(i, j) - ( dp'(i, j-1) + sum(i, j-1) ), sum(i, j) - ( dp'(i+1, j) + sum(i+1, j))) ```\\n= ```max(sum(i, j) - sum(i, j-1)  - dp'(i, j-1), sum(i, j) - sum(i+1, j) - dp'(i+1, j))```\\n= ```max(nums[j] - dp'(i, j-1), nums[i] - dp'(i+1, j)) ```\\n\\nFinal formula: ```dp(i, j) = max(nums[j]  - dp(i, j-1), nums[i] - dp(i+1, j))```\\n\\n\\n```\\nclass Solution {\\npublic:\\n    bool PredictTheWinner(vector<int>& nums) {\\n        int n = nums.size();\\n        vector<vector<int>> dp(n, vector<int>(n)); // use to keep the score gap between player1 and player2\\n        for (int i = 0; i < n; i++) dp[i][i] = nums[i];\\n        for (int i = 1; i < n; i++) {\\n            for (int j = 0; j+i < n; j++) {\\n                dp[j][j+i] = max(nums[j+i]-dp[j][j+i-1], nums[j]-dp[j+1][j+i]);\\n            }\\n        }\\n        return dp[0][n-1] >= 0; // player1 get more score points than player2\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"96835",
			"view":"3080",
			"top":"4",
			"title":"Clean 3ms C++ DP solution with detailed explanation",
			"vote":"10",
			"content":"This problem can be solved in DP.\\n\\nLet first outline the DP state:\\n\\n**dp[i][j] means that for a sub-game in between [i, j] inclusive, the maximum score that Player 1 could get.**\\n\\nOur final goal is to find out whether Player 1 could score more than half of the total score in the game between [0, n-1], or in other words the dp[0][n-1]. Another thing to notice is that, because Player 1 and Player 2 pick numbers one after each other, this means:\\n\\n**If dp[i][j] means maximum score Player 1 could get between [i, j] then dp[i-1][j] could mean the maximum score Player 2 could get between [i-1, j], and same thing for dp[i][j-1].**\\n\\nAnother more **important** thing based on the above statement is that:\\n\\n**The sum[i-1][j] - dp[i-1][j] means the maximum score Player 1 can get between [i-1, j] after he picks nums[i] in between [i, j]. Also the same rule applies to dp[i][j-1].**\\n\\nThus we have the following induction rule for this DP solution:\\n\\n**pickLeft = nums[i] + sum[i-1][j] - dp[i-1][j]  //if left number is picked**\\n**pickRight = nums[j] + sum[i][j-1] - dp[i][j-1] //if right number is picked**\\n**dp[i][j] = max(pickLeft, pickRight)**\\n\\nOf course we can treat i == j and i == j-1 as special cases:\\ndp[i][j] = nums[i] // if i == j\\ndp[i][j] = max(nums[i], nums[j) // if i == j-1\\n\\nFor space complexity reason the sum[i][j] can be replaced with prefixSum.\\nsum[i][j] = prefixSum[j] - prefixSum[i-1]\\n\\n```\\n    bool PredictTheWinner(vector<int>& nums) {\\n        vector<vector<int>> score(nums.size(), vector<int>(nums.size()));\\n        vector<int> prefixSum(nums.size()+1);\\n        prefixSum[0] = 0;\\n        for (int i=0; i<nums.size(); i++) {\\n            prefixSum[i+1] = prefixSum[i] + nums[i];\\n        }\\n        \\n        for (int len=1; len<=nums.size(); len++) {\\n            for (int lhs=0; lhs+len-1<nums.size(); lhs++) {\\n                int rhs = lhs + len - 1;\\n                if (lhs == rhs) {\\n                    score[lhs][rhs] = nums[lhs];\\n                } else if (lhs == rhs-1) {\\n                    score[lhs][rhs] = max(nums[lhs], nums[rhs]);\\n                } else {\\n                    int pickLeft = nums[lhs] + prefixSum[rhs+1] - prefixSum[lhs+1] - score[lhs+1][rhs];\\n                    int pickRight = nums[rhs] + prefixSum[rhs] - prefixSum[lhs] - score[lhs][rhs-1];\\n                    score[lhs][rhs] = max(pickLeft, pickRight);\\n                }\\n            }\\n        }\\n        \\n        return score[0][nums.size()-1] >= prefixSum.back()/2 + prefixSum.back()%2;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96875",
			"view":"3357",
			"top":"5",
			"title":"Share my 9ms recursive solution with explanation",
			"vote":"8",
			"content":"The main idea is each player will play optimally,\\nso if there exist that my opponent will lose the game (false), I will return true, that's why I use '!' in the return;\\n\\nFor example : [1, 5, 2]\\n```\\nif (player1 pick 1) the rest is [5, 2];\\n\\tif (player2 pick 2) player1 win(true),\\n\\tif (player2 pick 5) player1 lose(false),\\n-> because player2 play optimally, so he choose to pick 5,\\n   player2 = !(pick 2) || !(pick 5)  = !true || !false = true;\\n   so when player1 first choose 1, he always loses.\\n\\nif (player1 pick 2) the rest is [1, 5];\\n\\tif (player2 pick 1) player1 win(true),\\n\\tif (player2 pick 5) player1 lose(false),\\n-> because player2 play optimally, so he choose to pick 5,\\n   player2 = !(pick 1) || !(pick 5)  = !true || !false = true;\\n   so when player1 first choose 2, he always loses.\\n\\nSo, it this case, no matter player1 first choose 1 or 2, he always loses.\\n   player1 = !(pick 1) || !(pick 2)  = !true || !true = false;\\n```\\n\\nHere is my code:\\n```\\npublic boolean PredictTheWinner(int[] nums) {\\n\\treturn first(0, 0, nums, 0, nums.length-1);\\n}\\n\\nprivate boolean first(int s1, int s2, int[] nums, int start, int end) {\\n\\tif (start > end ){\\n\\t\\tif (s1 >= s2) return true;\\n\\t\\telse return false;\\n\\t}\\n\\treturn !second(s1+nums[start], s2, nums, start+1, end) || !second(s1+nums[end], s2, nums, start, end-1);\\n}\\n\\nprivate boolean second(int s1, int s2, int[] nums, int start, int end) {\\n\\tif (start > end ){\\n\\t\\tif (s1 < s2) return true;\\n\\t\\telse return false;\\n\\t}\\n\\treturn !first(s1, s2+nums[start], nums, start+1, end) || !first(s1, s2+nums[end], nums, start, end-1);\\n}\\n```"
		},
		{
			"lc_ans_id":"96901",
			"view":"642",
			"top":"6",
			"title":"java DP solution with explanation",
			"vote":"7",
			"content":"If the first player choose nums[0], the max he can get is sum( nums )-max[1, end](which is max for the second player). If the first player choose the last element in nums, then the max he can get is sum(nums)-max[0, end-1](which is the max for the second player). Thus, the DP formula is DP[start][end]=Max(sum-dp[start][end-1], sum-dp[start+1][end]).\\n\\nOne thing I wanna to mention is that, sum in the DP formula is not the total sum for nums, but the sum for nums[start, end].\\n```\\npublic boolean PredictTheWinner(int[] nums) {\\n        int length = nums.length;\\n        \\n        int sum = 0;\\n        for(int num : nums) sum+=num;\\n        \\n        int[][] dp = new int[length][length];\\n        \\n        for(int j = 0 ; j< length ; j++)\\n        {\\n            int curSum = 0;\\n            for(int i = j ; i>= 0 ; i--)\\n            {\\n                curSum+=nums[i];\\n                if(i == j) dp[i][j]=nums[j];\\n                else\\n                {\\n                    dp[i][j]=Math.max(curSum-dp[i][j-1], curSum-dp[i+1][j]);\\n                }\\n            }\\n        }\\n        return dp[0][length-1]*2>=sum;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96862",
			"view":"714",
			"top":"7",
			"title":"Explanation of the question",
			"vote":"6",
			"content":"I did not understand what the question was asking exactly during the contest. I came up with multiple solutions based on what I thought was being asked, but they were all incorrect. Looks like I finally understood it. I wanted to clarify the question for people who may be confused like me.\\n\\nThe setup should be easy to understand. p1 and p2 take turns in picking a number from the input array, either the first item or the last item. When an item is picked by one of the player, that item cannot be used anymore; you can imagine it being removed from the array.\\n\\nWhat made me confused was the part \"... predict whether player 1 is the winner. You can assume each player plays to maximize his score.\" I was not sure what maximizing the score meant. Here is what it means.\\n\\nLet's say the initial array is [1, 5, 2]. It's p1's turn. p1 will pick either 1 or 2, but it wants to make sure that whichever one he picks will maximize his gain at the end. What if p1 picks 1? Now the array is [5, 2] and it's p2's turn to pick. p2 looks at the current array and thinks about how to maximize his gain at the end. Obviously, picking 5 will maximize his gains. So, p2 will pick 5, leaving 2 for p1. Resulting scores for p1 and p2 are 3 and 5 respectively. This one did not work out for p1.\\n\\nWhat if p1 picks 2 at the beginning? Then the array becomes [1, 5]. Again, p2 looks at the current array and thinks about how to maximize his gain at the end. Picking 5 will maximize his gains. So, p2 will pick 5, leaving 1 for p1. Resulting scores for p1 and p2 are 3 and 5 respectively. This one did not work out for p1 either. Those were the only two possibilities for game play. p1 can never win.\\n\\nWhat if the input array is [1, 5, 233, 7]? For this one, let me list all possibilities and explain which ones are valid and which ones are not.\\n\\n![0_1485064722628_upload-5137006d-197e-47b8-92a3-276224ff6f97](/uploads/files/1485064725743-upload-5137006d-197e-47b8-92a3-276224ff6f97.png) \\n\\nWhat clarified the question for me was realizing that in each step the current player takes a look at the current array as a whole and tries to make the best pick for maximizing it's gain (taking into consideration what the other player may do). \\n\\nI hope this helps someone."
		},
		{
			"lc_ans_id":"96884",
			"view":"329",
			"top":"8",
			"title":"Java 7ms recursion Solution with explaination, easy to understand",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public boolean PredictTheWinner(int[] nums) {\\n        if(nums.length <= 1){\\n            return true;\\n        }\\n        return canWin(nums, 0, nums.length-1, 0, 0);\\n    }\\n    private boolean canWin(int[] nums, int left, int right, int fistScore, int secondScore){\\n        // assume fistScore is the score of current player (to pick in this round)\\n        if(left > right){\\n            return fistScore >= secondScore;\\n        }\\n        fistScore += nums[left++]; //  pick left\\n        if(!canWin(nums, left, right, secondScore, fistScore)){ \\n        // check if next player can win. if next player cannot win, return true, which means the current player can win \\n            return true;\\n        }\\n        // backtrack\\n        left--;\\n        fistScore -= nums[left];\\n        // pick right;\\n        fistScore += nums[right--];\\n        if(!canWin(nums, left, right, secondScore, fistScore)){\\n        //check if next player can win\\n            return true;\\n        }\\n        right++;\\n        fistScore -= nums[right];\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96843",
			"view":"831",
			"top":"9",
			"title":"Java DP solution with explanation",
			"vote":"3",
			"content":"We can use dynamic programming. Suppose after several rounds, the remaining array is nums[i], nums[i+1],... nums[j]\\n- dp[i][j] = the maximum score of player1 on subarray nums[i..j] \\n\\nPlayer1 can choose either nums[i] or nums[j]. If nums[i] is chosen, player2 will also make best effort to get dp[i+1][j]. So for the subarray nums[i+1] ... nums[j], player1 can get:\\n- nums[i + 1] + nums[i + 2] + ... + nums[j] - dp[i+1][j], which is\\n- sum(nums[i+1] to nums[j]) - dp[i+1][j]\\n\\nSo we need another array sum to do range sum query, I set sum[0] to 0, sum[i] is the sum of all elements in nums before index i. so finally:\\n- dp[i][j] = max { sum[j+1] - sum[i+1] - dp[i+1][j] + nums[i], \\n                          sum[j] - sum[i] - dp[i][j-1] + nums[j]}\\n \\n\\n```\\n    public boolean PredictTheWinner(int[] nums) {\\n        if(nums.length <= 2) return true;\\n        int n = nums.length;\\n        int[] sum = new int[n+1];\\n        sum[0] = 0;\\n        for(int i = 1; i <= n; i ++) {\\n            sum[i] = sum[i-1] + nums[i-1];\\n        }\\n        \\n        int[][] dp = new int[n][n];\\n        for(int len = 1; len < n; len ++) {\\n            for(int i = 0; i + len < n; i ++) {\\n                int j = i + len;\\n                if(len == 1) dp[i][j] = Math.max(nums[i], nums[j]);\\n                else {\\n                    int can1 = sum[j+1] - sum[i+1] - dp[i+1][j] + nums[i];\\n                    int can2 = sum[j] - sum[i] - dp[i][j-1] + nums[j];\\n                    dp[i][j] = Math.max(can1, can2);\\n                }\\n            }\\n        }\\n        return sum[n] - dp[0][n-1] <= dp[0][n-1];\\n    }\\n    \\n```"
		}
	],
	"id":"478",
	"title":"Predict the Winner",
	"content":"<p>Given an array of scores that are non-negative integers. Player 1 picks one of the numbers from either end of the array followed by the player 2 and then player 1 and so on. Each time a player picks a number, that number will not be available for the next player. This continues until all the scores have been chosen. The player with the maximum score wins. </p>\r\n\r\n<p>Given an array of scores, predict whether player 1 is the winner. You can assume each player plays to maximize his score. </p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1, 5, 2]\r\n<b>Output:</b> False\r\n<b>Explanation:</b> Initially, player 1 can choose between 1 and 2. <br/>If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). <br/>So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. <br/>Hence, player 1 will never be the winner and you need to return False.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1, 5, 233, 7]\r\n<b>Output:</b> True\r\n<b>Explanation:</b> Player 1 first chooses 1. Then player 2 have to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.<br />Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>1 <= length of the array <= 20. </li>\r\n<li>Any scores in the given array are non-negative integers and will not exceed 10,000,000.</li>\r\n<li>If the scores of both players are equal, then player 1 is still the winner.</li>\r\n</ol>\r\n</p>",
	"frequency":"220",
	"ac_num":"21918"
}