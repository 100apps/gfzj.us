{
	"difficulty":"2",
	"submit_num":"42572",
	"show_id":"462",
	"leetcode_id":"462",
	"answers":[
		{
			"lc_ans_id":"94937",
			"view":"13743",
			"top":"0",
			"title":"Java(just like meeting point problem)",
			"vote":"50",
			"content":"```\\npublic class Solution {\\n    public int minMoves2(int[] nums) {\\n        Arrays.sort(nums);\\n        int i = 0, j = nums.length-1;\\n        int count = 0;\\n        while(i < j){\\n            count += nums[j]-nums[i];\\n            i++;\\n            j--;\\n        }\\n        return count;\\n    }\\n}"
		},
		{
			"lc_ans_id":"94923",
			"view":"6806",
			"top":"1",
			"title":"2 lines Python, 2 ways",
			"vote":"23",
			"content":"    def minMoves2(self, nums):\\n        median = sorted(nums)[len(nums) / 2]\\n        return sum(abs(num - median) for num in nums)\\n\\n    def minMoves2(self, nums):\\n        nums.sort()\\n        return sum(nums[~i] - nums[i] for i in range(len(nums) / 2))"
		},
		{
			"lc_ans_id":"94917",
			"view":"8038",
			"top":"2",
			"title":"Java O(n) Time using QuickSelect",
			"vote":"18",
			"content":"This solution relies on the fact that if we increment/decrement each element to the median of all the elements, the optimal number of moves is necessary. The median of all elements can be found in expected O(n) time using QuickSelect (or deterministic O(n) time using Median of Medians).\\n\\n```\\npublic int minMoves2(int[] A) {\\n    int sum = 0, median = quickselect(A, A.length/2+1, 0, A.length-1);\\n    for (int i=0;i<A.length;i++) sum += Math.abs(A[i] - median);\\n    return sum;\\n}\\n\\npublic int quickselect(int[] A, int k, int start, int end) {\\n    int l = start, r = end, pivot = A[(l+r)/2];\\n    while (l<=r) {\\n        while (A[l] < pivot) l++;\\n        while (A[r] > pivot) r--;\\n        if (l>=r) break;\\n        swap(A, l++, r--);\\n    }\\n    if (l-start+1 > k) return quickselect(A, k, start, l-1);\\n    if (l-start+1 == k && l==r) return A[l];\\n    return quickselect(A, k-r+start-1, r+1, end);\\n}\\n\\npublic void swap(int[] A, int i, int j) {\\n    int temp = A[i];\\n    A[i] = A[j];\\n    A[j] = temp;\\n}\\n```"
		},
		{
			"lc_ans_id":"94930",
			"view":"5822",
			"top":"3",
			"title":"O(n) solution with detailed explanation.",
			"vote":"14",
			"content":"```\\n// O(n).\\n// Imagine the nums are sorted, and the final value is k, we start find k from the first element.\\n// If we increase k, the elements <= k will need move one step more, and the elements > k will need to move one step less.\\n// If there are more elements > k than elements <= k, we should increase k to minimize the moves.\\n// So we just increase k, until k reach the median of of the nums array. By then, the number of elements <= k equals to that of elements > k.\\n// (There is a slight different when the number of array is odd, but it's similar).\\n// If we keep increasing k after k reach the median of the array, more numbers >k than <= k, and more moves needed, so we should stop.\\n//\\n// The sort is not needed since we find the k is the median of the array, there is an average O(n) algorithm to find such k.\\nclass Solution {\\npublic:\\n    int minMoves2(vector<int>& nums) {\\n        int n = nums.size();\\n        auto it = nums.begin() + n/2;\\n        nth_element(nums.begin(), it, nums.end());\\n        int median = *it;\\n        int total = 0;\\n        for (auto &i : nums)\\n            total += abs(i-median);\\n        return total;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"94951",
			"view":"1209",
			"top":"4",
			"title":"3-line C++ solution with rigorous math proof (same as problem \"Best Meeting Point\")",
			"vote":"7",
			"content":"If the minimum number of moves makes all array entries {**x<sub>i=1:N</sub>**} to some value **x**, it can be proved that the optimal value **x** must be the median of {**x<sub>i=1:N</sub>**} (or any integer between the two central entries).\\n\\nI have posted a rigorous math proof using triangle inequality here in problem \"Best Meeting Point\": https://discuss.leetcode.com/topic/53593/strict-mathematics-proof-to-minimize-sum_i-abs-x-x_i-using-triangle-inequality\\n```\\n    int minMoves2(vector<int>& nums) {\\n      sort(nums.begin(), nums.end()); int n = nums.size(), res = 0;\\n      for (int i = 0; i < n/2; ++i) res += (nums[n-1-i]-nums[i]);\\n      return res;\\n    }\\n```\\n**Problem:** Given a sequence {x<sub>i=1:N</sub>}, prove that median x minimizes function f(x) := &Sigma;<sub>i=1:N</sub> | x-x<sub>i</sub> |.\\n\\n**Proof:** Without losing generality, assume {x<sub>i=1:N</sub>} is sorted. Simply grouping the sum into pairs:\\n* f(x) = &Sigma;<sub>i=1:N/2</sub> (| x-x<sub>i</sub> | + | x-x<sub>N+1-i</sub> |) + (N%2)*| x-x<sub>N/2+1</sub> |.\\n\\nNote that we don't have the last term if N is even since they are all grouped into pairs. I will explain why we need to (have to) group the sum in such a form later.\\n\\nUsing triangle inequality, |x-x<sub>i</sub>| + |x-x<sub>N+1-i</sub>| >= |x<sub>N+1-i</sub> - x<sub>i</sub>| = x<sub>N+1-i</sub> - x<sub>i</sub>, and the fact N%2 >= 0, so we can find a lower bound for f\\n* f(x) >= &Sigma;<sub>i=1:N/2</sub> (x<sub>N+1-i</sub> - x<sub>i</sub>),\\n\\nwhich means if we could actually pick an x to achieve this value, we find the optimal x!\\n\\nActually, inequality |x-x<sub>i</sub>| + |x-x<sub>N+1-i</sub>| >= |x<sub>N+1-i</sub> - x<sub>i</sub>| achieves equality if and only if x is in [x<sub>i</sub>, x<sub>N+1-i</sub>]. Since {x<sub>i=1:N</sub>} is increasing, closed interval sequence { [x<sub>i</sub>, x<sub>N+1-i</sub>] }<sub>i=1:N/2</sub> is nested, and so they have non-empty common intersection [x<sub>N/2</sub>, x<sub>N-N/2+1</sub>]. This is critical, and this is why we need to design the grouping like this. Now it is trivial to see that picking any value in the intersection [x<sub>N/2</sub>, x<sub>N-N/2+1</sub>] will reach the minimum if N is even, and only x = x<sub>N/2+1</sub> can reach the minimum if N is odd (since we also have to make |x-x<sub>N/2+1</sub>| zero)."
		},
		{
			"lc_ans_id":"94919",
			"view":"3560",
			"top":"5",
			"title":"Java solution with thinking process",
			"vote":"7",
			"content":"Hi there! I am sharing my full thinking process under time pressure and solution. The resultant array elements must be all the same. Let's say some integer k, so final array looks like [k,k,k,...,k]. The number of moves to get that array can be calculated by, moves = |k - a1| + |k-a2| + ...+|k-ai|+...+|k-an|. Note that some elements are greater than k and some elements are less. Thus, it worth to know the number of elements that are less than k, and the number of elements that are greater that k. If know them we can reformulate the equation as moves = Nless*k - sumLess +sumGreater-Ngreater*k. Now the equation gets more \"programmable\", and we have to search for such k, that minimizes value of moves. It is obvious that k must be selected among the original array elements, because it reduces the number of operations at least by one. Thus, we came up with an idea. For each element in array calculate moves, then select minimum among them. Now, we see another problem, how to calculate them number of elements that are less than k and their sum? The same problem occurs for greater elements. Naive solution is to calculate number of smalles  elements and greater elements along with their sum for each element of the array seperately. That would give us solution with O(n^2) time complexity. \\n  Can we do better? Yes we can, if we sort out the original array first, we can immediately know both the number of elements that are less than the current element and the number of elements that are greater that the current element. In addition we have to know total sum of elements and sum of elements before each element. Finally we came up with O(nlog(n)) time and O(1) space solution! Below is the code for that solution: \\n```\\npublic class Solution {\\n    public int minMoves2(int[] nums) {\\n        if(nums==null||  nums.length==0) return 0;\\n        long moves = Integer.MAX_VALUE;\\n        Arrays.sort(nums);\\n        long totalSum = 0L;\\n        long sum = 0L;\\n        for(int i =0;i<nums.length;i++){\\n            totalSum += (long)nums[i];\\n        }\\n        for(int i =0;i<nums.length;i++){\\n            long m = (long)(i-(nums.length-i-1)-1)*(long)nums[i]-sum+(totalSum-sum);\\n            moves = Math.min(m, moves);\\n            sum+=nums[i];\\n        }\\n        return (int)moves;\\n    }\\n}\\n```\\nCan we do better? Yes, we can! Let's think about k. Intuitively that value must be the median element in the original sorted array. Proof of that fact is simple, just look at our equation moves = numLess*k-sumLess + sumGreater - numGreater*k. Let's take derivative from that function by k. dmoves/dk = numLess-numGreater. The moves becomes minimum when the derivative is zero, so numLess-numGreater = 0 or numsLess = numGreater. Which is possible only when the element is the median element. We can find k in O(1) time. Instead of brute forcing all elements in the array we just consider the middle element in the sorted array. Despite generally the time complexity remains being O(nlog(n)), due to sorting, it improves performance very much. Further it can be optimized up to O(n), by using Quick select algorithm, and you can find this solution [here](https://discuss.leetcode.com/topic/68758/java-o-n-time-using-quickselect)\\n```\\npublic class Solution {\\n    public int minMoves2(int[] nums) {\\n        if(nums==null||  nums.length==0) return 0;\\n        long moves = Integer.MAX_VALUE;\\n        Arrays.sort(nums);\\n        long totalSum = 0L;\\n        long sum = 0L;\\n        for(int i =0;i<nums.length;i++){\\n            totalSum += (long)nums[i];\\n           if(i<nums.length/2) sum+=(long)nums[i];\\n        }\\n       \\n        int k = nums.length/2;\\n        moves = (long)(k-(nums.length-k-1)-1)*(long)nums[k]-sum+(totalSum-sum);\\n           \\n        return (int)moves;\\n    }\\n}\\n```\\n\\nP.S:  I have demonstrated the calculation of moves to be understandable, that is why it looks poor. Also be careful with shortening equation for moves in the first code. Because it may exceed the integer range if not to be careful with multiplications. Sorry for poor code."
		},
		{
			"lc_ans_id":"94932",
			"view":"918",
			"top":"6",
			"title":"Why median is better than average?",
			"vote":"3",
			"content":"I'm confused for this problem that we choose median to be the number everyone tries to move to, but not the average. Some post gives the reason that if we choose a number in the array, we save operations to change itself. But I'm thinking this reason doesn't stand because if we choose the average, other numbers may take less moves than choosing median.\\n\\nCan anyone help me understand the thinking process of choosing median instead of average?\\n\\nThanks!"
		},
		{
			"lc_ans_id":"94915",
			"view":"1051",
			"top":"7",
			"title":"5 line solution with comment",
			"vote":"2",
			"content":"```\\n/*\\nIntuitive solution might be making all the numbers the same as average.\\nHowever that does not always work \\n[1,0,0,8,6]. average is 3, the total cost of making every number 3 is 16\\nHowever if we were to make every number 1, cost is 14.\\n\\nMake every number the medium, instead of average would generate the smallest cost\\n*/\\n\\npublic class Solution {\\n    public int minMoves2(int[] nums) {\\n        int sum = 0;\\n        Arrays.sort(nums);\\n        int medium = nums[nums.length / 2];\\n        for(int n : nums) sum += Math.abs(n - medium);\\n        return sum;\\n    }\\n}````"
		},
		{
			"lc_ans_id":"94931",
			"view":"102",
			"top":"8",
			"title":"O(n logn) Java Simple Solution with Median",
			"vote":"1",
			"content":"We can find a median by sorting the array (although there is at least one more efficient way to do it) and just calculate the number of moves:\\n```\\npublic class Solution {\\n    public int minMoves2(int[] nums) {\\n        if (nums == null || nums.length <= 1) return 0;\\n        Arrays.sort(nums);\\n        int median = nums[nums.length/2], moves = 0;\\n        for (int num : nums)\\n            moves += Math.abs(num - median);\\n        return moves;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94933",
			"view":"80",
			"top":"9",
			"title":"Clean java solution. O(n log n) time",
			"vote":"1",
			"content":"```\\n    public int minMoves2(int[] nums) {\\n        Arrays.sort(nums);\\n\\n        int length = nums.length;\\n        int halfLength = length>>1;\\n        int median = nums[halfLength];\\n\\n        int numberOfMoves = 0;\\n\\n        for (int i = 0; i < halfLength; i++) {\\n            numberOfMoves += median - nums[i];\\n            numberOfMoves += nums[length - i - 1] - median;\\n        }\\n\\n        return numberOfMoves;\\n    }\\n```\\n\\nYou can see that addition and subtraction of the median occur the same amount of time, so we can make it shorter.\\n\\n```\\n    public int minMoves2(int[] nums) {\\n        Arrays.sort(nums);\\n\\n        int length = nums.length;\\n        int halfLength = length>>1;\\n\\n        int numberOfMoves = 0;\\n\\n        for (int i = 0; i < halfLength; i++) {\\n            numberOfMoves -= nums[i];\\n            numberOfMoves += nums[length - i - 1];\\n        }\\n\\n        return numberOfMoves;\\n    }\\n```"
		}
	],
	"id":"456",
	"title":"Minimum Moves to Equal Array Elements II",
	"content":"<p><p>Given a <b>non-empty</b> integer array, find the minimum number of moves required to make all array elements equal, where a move is incrementing a selected element by 1 or decrementing a selected element by 1.</p>\r\n\r\n<p>You may assume the array's length is at most 10,000.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[1,2,3]\r\n\r\n<b>Output:</b>\r\n2\r\n\r\n<b>Explanation:</b>\r\nOnly two moves are needed (remember each move increments or decrements one element):\r\n\r\n[1,2,3]  =>  [2,2,3]  =>  [2,2,2]\r\n</pre>\r\n</p></p>",
	"frequency":"175",
	"ac_num":"22100"
}