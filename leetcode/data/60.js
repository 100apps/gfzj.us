{
	"difficulty":"2",
	"submit_num":"330908",
	"show_id":"60",
	"leetcode_id":"60",
	"answers":[
		{
			"lc_ans_id":"22507",
			"view":"40795",
			"top":"0",
			"title":"\"Explain-like-I'm-five\" Java Solution in O(n)",
			"vote":"293",
			"content":"I'm sure somewhere can be simplified so it'd be nice if anyone can let me know. The pattern was that:\\n\\nsay n = 4, you have {1, 2, 3, 4}\\n\\nIf you were to list out all the permutations you have \\n\\n1 + (permutations of 2, 3, 4)\\n<br>2 + (permutations of 1, 3, 4)\\n<br>3 + (permutations of 1, 2, 4)\\n<br>4 + (permutations of 1, 2, 3)\\n\\n<br>We know how to calculate the number of permutations of n numbers... n! So each of those with permutations of 3 numbers means there are 6 possible permutations. Meaning there would be a total of 24 permutations in this particular one. So if you were to look for the (k = 14) 14th permutation, it would be in the \\n\\n3 + (permutations of 1, 2, 4) subset. \\n\\nTo programmatically get that, you take k = 13 (subtract 1 because of things always starting at 0) and divide that by the 6 we got from the factorial, which would give you the index of the number you want. In the array {1, 2, 3, 4}, k/(n-1)! = 13/(4-1)! = 13/3! = 13/6 = 2. The array {1, 2, 3, 4} has a value of 3 at index 2. So the first number is a 3.\\n\\nThen the problem repeats with less numbers.\\n\\nThe permutations of {1, 2, 4} would be:\\n\\n1 + (permutations of 2, 4)\\n<br>2 + (permutations of 1, 4)\\n<br>4 + (permutations of 1, 2)\\n\\nBut our k is no longer the 14th, because in the previous step, we've already eliminated the 12 4-number permutations starting with 1 and 2. So you subtract 12 from k.. which gives you 1. Programmatically that would be...\\n\\nk = k - (index from previous) * (n-1)! = k - 2*(n-1)! = 13 - 2*(3)! = 1\\n\\nIn this second step, permutations of 2 numbers has only 2 possibilities, meaning each of the three permutations listed above a has two possibilities, giving a total of 6. We're looking for the first one, so that would be in the 1 + (permutations of 2, 4) subset. \\n\\nMeaning: index to get number from is k / (n - 2)!  = 1 / (4-2)! = 1 / 2! = 0.. from {1, 2, 4}, index 0 is 1\\n\\n<br>so the numbers we have so far is 3, 1... and then repeating without explanations.\\n\\n<br>{2, 4}\\n<br>k = k - (index from pervious) * (n-2)! = k - 0 * (n - 2)! = 1 - 0 = 1;\\n<br>third number's index = k / (n - 3)! = 1 / (4-3)! = 1/ 1! = 1... from {2, 4}, index 1 has 4\\n<br>Third number is 4\\n\\n<br>{2}\\n<br>k = k - (index from pervious) * (n - 3)! = k - 1 * (4 - 3)! = 1 - 1 = 0;\\n<br>third number's index = k / (n - 4)! = 0 / (4-4)! = 0/ 1 = 0... from {2}, index 0 has 2\\n<br>Fourth number is 2\\n\\n<br>Giving us 3142. If you manually list out the permutations using DFS method, it would be 3142. Done! It really was all about pattern finding.\\n\\n\\n\\n    public class Solution {\\n    public String getPermutation(int n, int k) {\\n        int pos = 0;\\n        List<Integer> numbers = new ArrayList<>();\\n        int[] factorial = new int[n+1];\\n        StringBuilder sb = new StringBuilder();\\n        \\n        // create an array of factorial lookup\\n        int sum = 1;\\n        factorial[0] = 1;\\n        for(int i=1; i<=n; i++){\\n            sum *= i;\\n            factorial[i] = sum;\\n        }\\n        // factorial[] = {1, 1, 2, 6, 24, ... n!}\\n        \\n        // create a list of numbers to get indices\\n        for(int i=1; i<=n; i++){\\n            numbers.add(i);\\n        }\\n        // numbers = {1, 2, 3, 4}\\n        \\n        k--;\\n        \\n        for(int i = 1; i <= n; i++){\\n            int index = k/factorial[n-i];\\n            sb.append(String.valueOf(numbers.get(index)));\\n            numbers.remove(index);\\n            k-=index*factorial[n-i];\\n        }\\n        \\n        return String.valueOf(sb);\\n    }\\n}"
		},
		{
			"lc_ans_id":"22508",
			"view":"15112",
			"top":"1",
			"title":"An iterative solution for reference",
			"vote":"62",
			"content":"Recursion will use more memory, while this problem can be solved by iteration. I solved this problem before, but I didn't realize that using k = k-1 would avoid dealing with case k%(n-1)!==0. Rewrote this code, should be pretty concise now. \\n\\nOnly thing is that I have to use a list to store the remaining numbers, neither linkedlist nor arraylist are very efficient, anyone has a better idea?\\n\\nThe logic is as follows: for n numbers the permutations can be divided to (n-1)! groups, for n-1 numbers can be divided to (n-2)! groups, and so on. Thus k/(n-1)! indicates the index of current number, and k%(n-1)! denotes remaining index for the remaining n-1 numbers.\\nWe keep doing this until n reaches 0, then we get n numbers permutations that is kth. \\n\\n    public String getPermutation(int n, int k) {\\n            List<Integer> num = new LinkedList<Integer>();\\n            for (int i = 1; i <= n; i++) num.add(i);\\n            int[] fact = new int[n];  // factorial\\n            fact[0] = 1;\\n            for (int i = 1; i < n; i++) fact[i] = i*fact[i-1];\\n            k = k-1;\\n            StringBuilder sb = new StringBuilder();\\n            for (int i = n; i > 0; i--){\\n                int ind = k/fact[i-1];\\n                k = k%fact[i-1];\\n                sb.append(num.get(ind));\\n                num.remove(ind);\\n            }\\n            return sb.toString();\\n        }"
		},
		{
			"lc_ans_id":"22544",
			"view":"14728",
			"top":"2",
			"title":"Most concise C++ solution, minimal memory required",
			"vote":"50",
			"content":"    string getPermutation(int n, int k) {\\n        int i,j,f=1;\\n        // left part of s is partially formed permutation, right part is the leftover chars.\\n        string s(n,'0');\\n        for(i=1;i<=n;i++){\\n            f*=i;\\n            s[i-1]+=i; // make s become 1234...n\\n        }\\n        for(i=0,k--;i<n;i++){\\n            f/=n-i;\\n            j=i+k/f; // calculate index of char to put at s[i]\\n            char c=s[j];\\n            // remove c by shifting to cover up (adjust the right part).\\n            for(;j>i;j--)\\n                s[j]=s[j-1];\\n            k%=f;\\n            s[i]=c;\\n        }\\n        return s;\\n    }"
		},
		{
			"lc_ans_id":"22524",
			"view":"8498",
			"top":"3",
			"title":"Sharing my straightforward C++ solution with explanation",
			"vote":"34",
			"content":"    string getPermutation(int n, int k) {\\n        int pTable[10] = {1};\\n        for(int i = 1; i <= 9; i++){\\n            pTable[i] = i * pTable[i - 1];\\n        }\\n        string result;\\n        vector<char> numSet;\\n        numSet.push_back('1');\\n        numSet.push_back('2');\\n        numSet.push_back('3');\\n        numSet.push_back('4');\\n        numSet.push_back('5');\\n        numSet.push_back('6');\\n        numSet.push_back('7');\\n        numSet.push_back('8');\\n        numSet.push_back('9');\\n        while(n > 0){\\n            int temp = (k - 1) / pTable[n - 1];\\n            result += numSet[temp];\\n            numSet.erase(numSet.begin() + temp);\\n            k = k - temp * pTable[n - 1];\\n            n--;\\n        }\\n        return result;\\n    }\\n\\nIn this program, `pTable` refers to permutation table and `numSet` refers to a set of numbers from 1 to 9. Before while loop, we need to initialize `pTable` and `numSet`, which is trivial.\\n\\nIn while loop, we do these following things.\\n\\n1 calculate which number we will use.\\n\\n2 remove that number from `numSet`.\\n\\n3 recalculate k.\\n\\n4 `n--`. \\n\\nFinally, we return result."
		},
		{
			"lc_ans_id":"22512",
			"view":"4900",
			"top":"4",
			"title":"Share my Python solution with detailed explanation",
			"vote":"28",
			"content":"The idea is as follow:\\n\\nFor permutations of n, the first (n-1)! permutations start with 1, next (n-1)! ones start with 2, ... and so on. And in each group of (n-1)! permutations, the first (n-2)! permutations start with the smallest remaining number, ...\\n\\ntake n = 3 as an example, the first 2 (that is, (3-1)! ) permutations start with 1, next 2 start with 2 and last 2 start with 3. For the first 2 permutations (123 and 132), the 1st one (1!) starts with 2, which is the smallest remaining number (2 and 3). So we can use a loop to check the region that the sequence number falls in and get the starting digit. Then we adjust the sequence number and continue.\\n\\n    import math\\n    class Solution:\\n        # @param {integer} n\\n        # @param {integer} k\\n        # @return {string}\\n        def getPermutation(self, n, k):\\n            numbers = range(1, n+1)\\n            permutation = ''\\n            k -= 1\\n            while n > 0:\\n                n -= 1\\n                # get the index of current digit\\n                index, k = divmod(k, math.factorial(n))\\n                permutation += str(numbers[index])\\n                # remove handled number\\n                numbers.remove(numbers[index])\\n    \\n            return permutation"
		},
		{
			"lc_ans_id":"22650",
			"view":"2779",
			"top":"5",
			"title":"0ms C++ 12-line concise solution (no recursion, no helper function)",
			"vote":"21",
			"content":"Attached please find my solution.\\n\\nIdea:\\n\\n- For an n-element permutation, there are (n-1)! permutations started with '1', (n-1)! permutations started with '2', and so forth. Therefore we can determine the value of the first element.\\n\\n- After determining the first element, there are (n-1) candidates left. Then there are (n-2)! permutations started with the minimum element within the remaining set, and so forth.\\n\\nComplexities:\\n\\n- Time complexity: O(n^2)   \\n\\n- Space complexity: O(n)\\n\\n==\\n\\n    class Solution {\\n    public:\\n        string getPermutation(int n, int k) {\\n            // initialize a dictionary that stores 1, 2, ..., n. This string will store the permutation.\\n            string dict(n, 0);\\n            iota(dict.begin(), dict.end(), '1');\\n            \\n            // build up a look-up table, which stores (n-1)!, (n-2)!, ..., 1!, 0!\\n            vector<int> fract(n, 1);\\n            for (int idx = n - 3; idx >= 0; --idx) {\\n                fract[idx] = fract[idx + 1] * (n - 1 - idx);\\n            }\\n            \\n            // let k be zero base\\n            --k;\\n            \\n            // the main part.\\n            string ret(n, 0);\\n            for (int idx = 0; idx < n; ++idx) {\\n                int select = k / fract[idx];\\n                k %= fract[idx];\\n                ret[idx] = dict[select];\\n                dict.erase(next(dict.begin(), select)); // note that it is an O(n) operation\\n            }\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"22546",
			"view":"1951",
			"top":"6",
			"title":"Simple 0s C++ solution",
			"vote":"18",
			"content":"since n will be between 1 and 9 inclusive. pre-calculate the factorials is faster.\\n\\n    class Solution {\\n    public:\\n        string getPermutation(int n, int k) {\\n            string res;\\n            string nums = \"123456789\";\\n            int f[10] = {1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};\\n            --k;\\n            for (int i = n; i >= 1; --i) {\\n                int j = k / f[i - 1];\\n                k %= f[i - 1];\\n                res.push_back(nums[j]);\\n                nums.erase(nums.begin() + j);\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"22597",
			"view":"8096",
			"top":"7",
			"title":"Does anyone have a better idea? Share my accepted python code here",
			"vote":"18",
			"content":"It's obvious that if we try to come up with n! solutions one by one until it reach kth element - O(k), it will exceed the time limit. Therefore, I tried to implement a mathematical solution as follows:\\n\\n     class Solution:\\n        # @return a string\\n        def getPermutation(self, n, k):\\n    \\n            ll = [str(i) for i in range(1,n+1)] # build a list of [\"1\",\"2\",...\"n\"]\\n    \\n            divisor = 1\\n            for i in range(1,n): # calculate 1*2*3*...*(n-1)\\n                divisor *= i\\n    \\n            answer = \"\"\\n            while k>0 and k<=divisor*n:  # there are only (divisor*n) solutions in total \\n                group_num = k/divisor\\n                k %= divisor\\n    \\n                if k>0: # it's kth element of (group_num+1)th group\\n                    choose = ll.pop(group_num)\\n                    answer += choose\\n                else: # it's last element of (group_num)th group\\n                    choose = ll.pop(group_num-1) \\n                    answer += choose\\n                    ll.reverse() # reverse the list to get DESC order for the last element\\n                    to_add = \"\".join(ll)\\n                    answer += to_add\\n                    break\\n    \\n                divisor/=len(ll)\\n    \\n            return answer\\n     \\nBriefly take **(n,k) = (4,21)** for example, in the first iteration we divide the solution set into 4 groups: \"1xxx\", \"2xxx\", \"3xxx\", and \"4xxx\", while each group has 3! = 6 members. \\n\\nFrom 21/6 = 3...3, we know that the 21th element is the 3rd element in the (3+1)th group. In this group, we can divide it into 3 sub-groups again: \"41xx\", \"42xx\" and \"43xx\", and each group has 2!=2 members. \\n\\nThen, we calculate 3/2 and get 1...1, so it's the 1st element of (1+1)nd sub-group - \"421x\", and now it reach the base case with only one possibility - **\"4213\"**.\\n\\nAnyone pass the problem with different ideas?"
		},
		{
			"lc_ans_id":"22665",
			"view":"2387",
			"top":"8",
			"title":"Clean Java Solution",
			"vote":"9",
			"content":"The basic idea is to decide which is the correct number starting from the highest digit.\\nUse k divide the factorial of (n-1), the result represents the ith not used number.\\nThen update k and the factorial to decide next digit.\\n\\n\\n public String getPermutation(int n, int k) {\\n\\n       LinkedList<Integer> notUsed = new LinkedList<Integer>();\\n\\n\\t\\tint weight = 1;\\n\\n\\t\\tfor (int i = 1; i <= n; i++) {\\n\\t\\t\\tnotUsed.add(i);\\n\\t\\t\\tif (i == n)\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\tweight = weight * i;\\n\\t\\t}\\n\\n\\t\\tString res = \"\";\\n\\t\\tk = k - 1;\\n\\t\\twhile (true) {\\n\\t\\t\\tres = res + notUsed.remove(k / weight);\\n\\t\\t\\tk = k % weight;\\n\\t\\t\\tif (notUsed.isEmpty())\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\tweight = weight / notUsed.size();\\n\\t\\t}\\n\\n\\t\\treturn res;\\n    }"
		},
		{
			"lc_ans_id":"22540",
			"view":"2873",
			"top":"9",
			"title":"Share my easy understand solution with comments - Java",
			"vote":"8",
			"content":"     public int nFatorial(int n ) {\\n        \\tif(n == 0)\\n        \\t\\treturn 1;\\n        \\treturn n * nFatorial(n - 1);\\n     }\\n    \\n    public String getPermutation(int n, int k) {\\n        \\tif(n == 0)\\n        \\t\\treturn \"\";\\n        \\t\\n        \\tString res = \"\";\\n    \\n        \\t// numbers to be added to result string\\n            List<Integer> num = new ArrayList<Integer>();\\n            \\n            // initialization, 0 just for padding\\n            for(int i = 0; i <= n; i++)\\n            \\tnum.add(i);\\n            \\n            int factorial;\\n            int index;\\n            \\n            for(int i = n; i > 0; i--) {\\n            \\tfactorial = nFatorial(i - 1);\\n    \\n            \\t// calculate current number index\\n            \\tindex = (int) Math.ceil(k / (double) factorial);\\n            \\t\\n            \\tres += num.get(index);\\n            \\t\\n            \\t// after adding, delete it from rest set\\n            \\tnum.remove(index);\\n            \\t\\n            \\t// update k for the next loop\\n            \\tk = k % factorial;\\n            \\tif(k == 0)\\n            \\t\\tk = factorial;\\n            }\\n            return res;\\n    }"
		}
	],
	"id":"60",
	"title":"Permutation Sequence",
	"content":"<p>The set <code>[1,2,3,&#8230;,<i>n</i>]</code> contains a total of <i>n</i>! unique permutations.</p>\r\n\r\n<p>By listing and labeling all of the permutations in order,<br />\r\nWe get the following sequence (ie, for <i>n</i> = 3):\r\n<ol>\r\n<li><code>\"123\"</code></li>\r\n<li><code>\"132\"</code></li>\r\n<li><code>\"213\"</code></li>\r\n<li><code>\"231\"</code></li>\r\n<li><code>\"312\"</code></li>\r\n<li><code>\"321\"</code></li>\r\n</ol>\r\n</p>\r\n\r\n<p>Given <i>n</i> and <i>k</i>, return the <i>k</i><sup>th</sup> permutation sequence.</p>\r\n\r\n<p><b>Note:</b> Given <i>n</i> will be between 1 and 9 inclusive.</p>",
	"frequency":"336",
	"ac_num":"96759"
}