{
	"difficulty":"3",
	"submit_num":"471417",
	"show_id":"41",
	"leetcode_id":"41",
	"answers":[
		{
			"lc_ans_id":"17071",
			"view":"47449",
			"top":"0",
			"title":"My short c++ solution, O(1) space, and O(n) time",
			"vote":"364",
			"content":"\\nPut each number in its right place.\\n\\nFor example:\\n\\nWhen we find 5, then swap it with A[4].\\n\\nAt last, the first place where its number is not right, return the place + 1.\\n\\n    class Solution\\n    {\\n    public:\\n        int firstMissingPositive(int A[], int n)\\n        {\\n            for(int i = 0; i < n; ++ i)\\n                while(A[i] > 0 && A[i] <= n && A[A[i] - 1] != A[i])\\n                    swap(A[i], A[A[i] - 1]);\\n            \\n            for(int i = 0; i < n; ++ i)\\n                if(A[i] != i + 1)\\n                    return i + 1;\\n            \\n            return n + 1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"17073",
			"view":"30178",
			"top":"1",
			"title":"Share my O(n) time, O(1) space solution",
			"vote":"101",
			"content":"## Share my O(n)/O(1) solution ##\\n\\n----------\\nThe basic idea is ***for any k positive numbers (duplicates allowed), the first missing positive number must be within [1,k+1]***. The reason is like you put k balls into k+1 bins, there must be a bin empty, the empty bin can be viewed as the missing number. \\n\\n----------\\n\\n 1. Unfortunately, there are 0 and negative numbers in the array, so firstly I think of using partition technique (used in quick sort) to put all positive numbers together in one side. This can be finished in O(n) time, O(1) space. \\n 2. After partition step, you get all the positive numbers lying within A[0,k-1]. Now, According to the basic idea, I infer the first missing number must be within [1,k+1]. I decide to use A[i] (0<=i<=k-1) to indicate whether the number (i+1) exists. But here I still have to main the original information A[i] holds. Fortunately, A[i] are all positive numbers, so I can set them to negative to indicate the existence of (i+1) and I can still use abs(A[i]) to get the original information A[i] holds.\\n 3. After step 2, I can again scan all elements between A[0,k-1] to find the first positive element A[i], that means (i+1) doesn't exist, which is what I want.\\n\\n----------\\n\\n     public int firstMissingPositive(int[] A) {\\n        int n=A.length;\\n        if(n==0)\\n            return 1;\\n        int k=partition(A)+1;\\n        int temp=0;\\n        int first_missing_Index=k;\\n        for(int i=0;i<k;i++){\\n            temp=Math.abs(A[i]);\\n            if(temp<=k)\\n                A[temp-1]=(A[temp-1]<0)?A[temp-1]:-A[temp-1];\\n        }\\n        for(int i=0;i<k;i++){\\n            if(A[i]>0){\\n                first_missing_Index=i;\\n                break;\\n            }\\n        }\\n        return first_missing_Index+1;\\n    }\\n    \\n    public int partition(int[] A){\\n        int n=A.length;\\n        int q=-1;\\n        for(int i=0;i<n;i++){\\n            if(A[i]>0){\\n                q++;\\n                swap(A,q,i);\\n            }\\n        }\\n        return q;\\n    }\\n    \\n    public void swap(int[] A, int i, int j){\\n        if(i!=j){\\n            A[i]^=A[j];\\n            A[j]^=A[i];\\n            A[i]^=A[j];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"17083",
			"view":"23617",
			"top":"2",
			"title":"O(1) space Java Solution",
			"vote":"61",
			"content":"The key here is to use swapping to keep constant space and also make use of the length of the array, which means there can be at most n positive integers. So each time we encounter an valid integer, find its correct position and swap. Otherwise we continue.\\n\\n    public class Solution {\\n        public int firstMissingPositive(int[] A) {\\n            int i = 0;\\n            while(i < A.length){\\n                if(A[i] == i+1 || A[i] <= 0 || A[i] > A.length) i++;\\n                else if(A[A[i]-1] != A[i]) swap(A, i, A[i]-1);\\n                else i++;\\n            }\\n            i = 0;\\n            while(i < A.length && A[i] == i+1) i++;\\n            return i+1;\\n        }\\n        \\n        private void swap(int[] A, int i, int j){\\n            int temp = A[i];\\n            A[i] = A[j];\\n            A[j] = temp;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"17168",
			"view":"17106",
			"top":"3",
			"title":"A very nice solution (from Ants Aasma @stackoverflow)",
			"vote":"32",
			"content":"time complexity is O(N) and space complexity is O(1). <br>\\nLink: http://stackoverflow.com/questions/1586858/find-the-smallest-integer-not-in-a-list <br>\\nPosted by Ants Aasma on Oct 20 '09.\\n\\nThe code is pasted here: <br>\\n\\n    #Pass 1, move every value to the position of its value\\n    for cursor in range(N): \\n        target = array[cursor]\\n        while target < N and target != array[target]:\\n            new_target = array[target]\\n            array[target] = target\\n            target = new_target\\n    \\n    #Pass 2, find first location where the index doesn't match the value\\n    for cursor in range(N):\\n        if array[cursor] != cursor:\\n            return cursor\\n    return N"
		},
		{
			"lc_ans_id":"17286",
			"view":"6803",
			"top":"4",
			"title":"My c++ solution (4 ms)",
			"vote":"31",
			"content":"    class Solution {\\n    public:\\n        int firstMissingPositive(vector<int>& nums) {\\n            for(int i=0; i<nums.size(); i++){\\n                if(i+1==nums[i]) continue;\\n                int x = nums[i];\\n                while(x>=1 && x<=nums.size() && x!=nums[x-1]){\\n                    swap(x, nums[x-1]);\\n                }\\n            }\\n            for(int i=0; i<nums.size(); i++){\\n                if(i+1!=nums[i])    return i+1;\\n            }\\n            return nums.size()+1;\\n        }\\n    };\\n\\nSince we can not use extra space, so thinking about using the nums vector itself to record a positive number occurred."
		},
		{
			"lc_ans_id":"17126",
			"view":"3372",
			"top":"5",
			"title":"Beat 100% Fast Elegant Java Index-Based Solution with Explanation",
			"vote":"19",
			"content":"The basic idea is to traversal and try to move the current value to position whose index is exactly the value (swap them). Then travelsal again to find the first unusal value, which can not be corresponding to its index.\\n\\n    public int firstMissingPositive(int[] nums) {\\n\\n\\t\\tint i = 0, n = nums.length;\\n\\t\\twhile (i < n) {\\n            // If the current value is in the range of (0,length) and it's not at its correct position, \\n            // swap it to its correct position.\\n            // Else just continue;\\n\\t\\t\\tif (nums[i] >= 0 && nums[i] < n && nums[nums[i]] != nums[i])\\n\\t\\t\\t\\tswap(nums, i, nums[i]);\\n\\t\\t\\telse\\n\\t\\t\\t\\ti++;\\n\\t\\t}\\n\\t\\tint k = 1;\\n\\n        // Check from k=1 to see whether each index and value can be corresponding.\\n\\t\\twhile (k < n && nums[k] == k)\\n\\t\\t\\tk++;\\n\\n        // If it breaks because of empty array or reaching the end. K must be the first missing number.\\n\\t\\tif (n == 0 || k < n)\\n\\t\\t\\treturn k;\\n\\t\\telse   // If k is hiding at position 0, K+1 is the number. \\n\\t\\t\\treturn nums[0] == k ? k + 1 : k;\\n\\n\\t}\\n\\n\\tprivate void swap(int[] nums, int i, int j) {\\n\\t\\tint temp = nums[i];\\n\\t\\tnums[i] = nums[j];\\n\\t\\tnums[j] = temp;\\n\\t}"
		},
		{
			"lc_ans_id":"17204",
			"view":"4710",
			"top":"6",
			"title":"O(n) time, O(1) space C++",
			"vote":"18",
			"content":"Idea is to swap each positive integer you encounter to its \"rightful\" place at index (x-1) where x is the integer. It's O(n) because you visit each integer in at most 2 unique loop iterations. \\n\\n    class Solution {\\n    public:\\n        int firstMissingPositive(int A[], int n) {\\n            int i,j;\\n            for(i=0;i<n;i++){\\n                int cur=A[i];\\n                // if in place or non-pos or out of bounds, skip.\\n                if(cur==i+1||cur<=0||cur>n)continue;\\n                swap(A[i],A[cur-1]);\\n                // if not the same, then reprocess it.\\n                if(A[i]!=A[cur-1])\\n                    i--;\\n            }\\n            \\n            for(i=0;i<n;i++)\\n                if(A[i]!=i+1) \\n                    return i+1;\\n            return n+1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"17260",
			"view":"3147",
			"top":"7",
			"title":"Clear Java solution",
			"vote":"17",
			"content":"    public int firstMissingPositive(int[] nums) {\\n        int start = 0;\\n        int end = nums.length - 1;\\n        while (start <= end) {\\n            int index = nums[start] - 1;\\n            if (index == start)\\n                start++;\\n            else if (index < 0 || index > end || nums[start] == nums[index])\\n                nums[start] = nums[end--];\\n            else {\\n                nums[start] = nums[index];\\n                nums[index] = index + 1;\\n            }\\n        }\\n        return start + 1;\\n    }"
		},
		{
			"lc_ans_id":"17080",
			"view":"2877",
			"top":"8",
			"title":"Python O(1) space,  O(n) time solution with explanation",
			"vote":"16",
			"content":"     def firstMissingPositive(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n         Basic idea:\\n        1. for any array whose length is l, the first missing positive must be in range [1,...,l+1], \\n            so we only have to care about those elements in this range and remove the rest.\\n        2. we can use the array index as the hash to restore the frequency of each number within \\n             the range [1,...,l+1] \\n        \"\"\"\\n        nums.append(0)\\n        n = len(nums)\\n        for i in range(len(nums)): #delete those useless elements\\n            if nums[i]<0 or nums[i]>=n:\\n                nums[i]=0\\n        for i in range(len(nums)): #use the index as the hash to record the frequency of each number\\n            nums[nums[i]%n]+=n\\n        for i in range(1,len(nums)):\\n            if nums[i]/n==0:\\n                return i\\n        return n"
		},
		{
			"lc_ans_id":"17302",
			"view":"2363",
			"top":"9",
			"title":"Concise O(N) solution",
			"vote":"12",
			"content":"    // ignore all the negative, > n\\n    // put the other value back to its order position A[A[i]-1]\\n    int firstMissingPositive(int A[], int n) {\\n        if (n == 0) return 1;\\n        for (int i = 0; i != n; ) {\\n            if (A[i] != i + 1 && A[i] > 0 && A[i] <= n && A[A[i]-1] != A[i])\\n                swap(A[i], A[A[i] - 1]);\\n            else ++i;\\n        }\\n        \\n        for (int i = 0; i != n; ++i)\\n            if (A[i] != i + 1) return i + 1;\\n        return n+1;\\n    }"
		}
	],
	"id":"41",
	"title":"First Missing Positive",
	"content":"<p>\r\nGiven an unsorted integer array, find the first missing positive integer.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <code>[1,2,0]</code> return <code>3</code>,<br />\r\nand <code>[3,4,-1,1]</code> return <code>2</code>.\r\n</p>\r\n\r\n<p>\r\nYour algorithm should run in <i>O</i>(<i>n</i>) time and uses constant space.\r\n</p>",
	"frequency":"499",
	"ac_num":"121589"
}