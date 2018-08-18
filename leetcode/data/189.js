{
	"difficulty":"1",
	"submit_num":"642819",
	"show_id":"189",
	"leetcode_id":"189",
	"answers":[
		{
			"lc_ans_id":"54250",
			"view":"39234",
			"top":"0",
			"title":"Easy to read Java solution",
			"vote":"277",
			"content":"I really don't like those _*something little*_ line solutions as they are incredibly hard to read. Below is my solution.\\n\\n    public void rotate(int[] nums, int k) {\\n        k %= nums.length;\\n        reverse(nums, 0, nums.length - 1);\\n        reverse(nums, 0, k - 1);\\n        reverse(nums, k, nums.length - 1);\\n    }\\n    \\n    public void reverse(int[] nums, int start, int end) {\\n        while (start < end) {\\n            int temp = nums[start];\\n            nums[start] = nums[end];\\n            nums[end] = temp;\\n            start++;\\n            end--;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"54277",
			"view":"23679",
			"top":"1",
			"title":"Summary of C++ solutions",
			"vote":"191",
			"content":"#1. Make an extra copy and then rotate. \\nTime complexity: O(n). Space complexity: O(n).\\n    \\n        class Solution \\n        {\\n        public:\\n            void rotate(int nums[], int n, int k) \\n            {\\n                if ((n == 0) || (k <= 0))\\n                {\\n                    return;\\n                }\\n                \\n                // Make a copy of nums\\n                vector<int> numsCopy(n);\\n                for (int i = 0; i < n; i++)\\n                {\\n                    numsCopy[i] = nums[i];\\n                }\\n                \\n                // Rotate the elements.\\n                for (int i = 0; i < n; i++)\\n                {\\n                    nums[(i + k)%n] = numsCopy[i];\\n                }\\n            }\\n        };\\n\\n#2. Start from one element and keep rotating until we have rotated n different elements.\\nTime complexity: O(n). Space complexity: O(1).\\n    \\n        class Solution \\n        {\\n        public:\\n            void rotate(int nums[], int n, int k) \\n            {\\n                if ((n == 0) || (k <= 0))\\n                {\\n                    return;\\n                }\\n                \\n                int cntRotated = 0;\\n                int start = 0;\\n                int curr = 0;\\n                int numToBeRotated = nums[0];\\n                int tmp = 0;\\n                // Keep rotating the elements until we have rotated n \\n                // different elements.\\n                while (cntRotated < n)\\n                {\\n                    do\\n                    {\\n                        tmp = nums[(curr + k)%n];\\n                        nums[(curr+k)%n] = numToBeRotated;\\n                        numToBeRotated = tmp;\\n                        curr = (curr + k)%n;\\n                        cntRotated++;\\n                    } while (curr != start);\\n                    // Stop rotating the elements when we finish one cycle, \\n                    // i.e., we return to start.\\n                    \\n                    // Move to next element to start a new cycle.\\n                    start++;\\n                    curr = start;\\n                    numToBeRotated = nums[curr];\\n                }\\n            }\\n        };\\n    \\n#3. Reverse the first n - k elements, the last k elements, and then all the n elements.\\nTime complexity: O(n). Space complexity: O(1).\\n        \\n        class Solution \\n        {\\n        public:\\n            void rotate(int nums[], int n, int k) \\n            {\\n                k = k%n;\\n        \\n                // Reverse the first n - k numbers.\\n                // Index i (0 <= i < n - k) becomes n - k - i.\\n                reverse(nums, nums + n - k);\\n                \\n                // Reverse tha last k numbers.\\n                // Index n - k + i (0 <= i < k) becomes n - i.\\n                reverse(nums + n - k, nums + n);\\n                \\n                // Reverse all the numbers.\\n                // Index i (0 <= i < n - k) becomes n - (n - k - i) = i + k.\\n                // Index n - k + i (0 <= i < k) becomes n - (n - i) = i.\\n                reverse(nums, nums + n);\\n            }\\n        };\\n\\n#4. Swap the last k elements with the first k elements.\\nTime complexity: O(n). Space complexity: O(1).\\n\\n    class Solution \\n    {\\n    public:\\n        void rotate(int nums[], int n, int k) \\n        {\\n            for (; k = k%n; n -= k, nums += k)\\n            {\\n                // Swap the last k elements with the first k elements. \\n                // The last k elements will be in the correct positions\\n                // but we need to rotate the remaining (n - k) elements \\n                // to the right by k steps.\\n                for (int i = 0; i < k; i++)\\n                {\\n                    swap(nums[i], nums[n - k + i]);\\n                }\\n            }\\n        }\\n    };\\n\\n#5. Keep swapping two subarrays.\\nTime complexity: O(n). Space complexity: O(1).\\n    \\n    class Solution \\n    {\\n    public:\\n        void rotate(int nums[], int n, int k) \\n        {\\n            if ((n == 0) || (k <= 0) || (k%n == 0))\\n            {\\n                return;\\n            }\\n            \\n            k = k%n;\\n            // Rotation to the right by k steps is equivalent to swapping \\n            // the two subarrays nums[0,...,n - k - 1] and nums[n - k,...,n - 1].\\n            int start = 0;\\n            int tmp = 0;\\n            while (k > 0)\\n            {\\n                if (n - k >= k)\\n                {\\n                    // The left subarray with size n - k is longer than \\n                    // the right subarray with size k. Exchange \\n                    // nums[n - 2*k,...,n - k - 1] with nums[n - k,...,n - 1].\\n                    for (int i = 0; i < k; i++)\\n                    {\\n                        tmp = nums[start + n - 2*k + i];\\n                        nums[start + n - 2*k + i] = nums[start + n - k + i];\\n                        nums[start + n - k + i] = tmp;\\n                    }\\n                    \\n                    // nums[n - 2*k,...,n - k - 1] are in their correct positions now.\\n                    // Need to rotate the elements of nums[0,...,n - k - 1] to the right \\n                    // by k%n steps.\\n                    n = n - k;\\n                    k = k%n;\\n                }\\n                else\\n                {\\n                    // The left subarray with size n - k is shorter than \\n                    // the right subarray with size k. Exchange \\n                    // nums[0,...,n - k - 1] with nums[n - k,...,2*(n - k) - 1].\\n                    for (int i = 0; i < n - k; i++)\\n                    {\\n                        tmp = nums[start + i];\\n                        nums[start + i] = nums[start + n - k + i];\\n                        nums[start + n - k + i] = tmp;\\n                    }\\n                    \\n                    // nums[n - k,...,2*(n - k) - 1] are in their correct positions now.\\n                    // Need to rotate the elements of nums[n - k,...,n - 1] to the right \\n                    // by k - (n - k) steps.\\n                    tmp = n - k;\\n                    n = k;\\n                    k -= tmp;\\n                    start += tmp;\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"54249",
			"view":"18023",
			"top":"2",
			"title":"3-line using reverse",
			"vote":"89",
			"content":"    void rotate(int nums[], int n, int k) {\\n        reverse(nums,nums+n);\\n        reverse(nums,nums+k%n);\\n        reverse(nums+k%n,nums+n);\\n    }"
		},
		{
			"lc_ans_id":"54252",
			"view":"15779",
			"top":"3",
			"title":"Java O(1) space solution of Rotate Array.",
			"vote":"82",
			"content":"The basic idea is that, for example, nums = [1,2,3,4,5,6,7] and k = 3, first we reverse [1,2,3,4], it becomes[4,3,2,1]; then we reverse[5,6,7], it becomes[7,6,5], finally we reverse the array as a whole, it becomes[4,3,2,1,7,6,5] ---> [5,6,7,1,2,3,4].\\n\\nReverse is done by using two pointers, one point at the head and the other point at the tail, after switch these two, these two pointers move one position towards the middle. \\n\\n\\npublic class Solution {\\n\\n    public void rotate(int[] nums, int k) {\\n\\n        if(nums == null || nums.length < 2){\\n            return;\\n        }\\n        \\n        k = k % nums.length;\\n        reverse(nums, 0, nums.length - k - 1);\\n        reverse(nums, nums.length - k, nums.length - 1);\\n        reverse(nums, 0, nums.length - 1);\\n        \\n    }\\n    \\n    private void reverse(int[] nums, int i, int j){\\n        int tmp = 0;       \\n        while(i < j){\\n            tmp = nums[i];\\n            nums[i] = nums[j];\\n            nums[j] = tmp;\\n            i++;\\n            j--;\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"54289",
			"view":"13770",
			"top":"4",
			"title":"My three way to solve this problem, the first way is interesting(JAVA)",
			"vote":"62",
			"content":"Method 1: ( Interesting way, O(n) time cost, O(1) space cost)\\n\\n    public class Solution {\\n        public void rotate(int[] nums, int k) {\\n            if(nums.length <= 1){\\n                return;\\n            }\\n            //step each time to move\\n            int step = k % nums.length;\\n            //find GCD between nums length and step\\n            int gcd = findGcd(nums.length, step);\\n            int position, count;\\n            \\n            //gcd path to finish movie\\n            for(int i = 0; i < gcd; i++){\\n                //beginning position of each path\\n                position = i;\\n                //count is the number we need swap each path\\n                count = nums.length / gcd - 1;\\n                for(int j = 0; j < count; j++){\\n                    position = (position + step) % nums.length;\\n                    //swap index value in index i and position\\n                    nums[i] ^= nums[position];\\n                    nums[position] ^= nums[i];\\n                    nums[i] ^= nums[position];\\n                }\\n            }\\n        }\\n        \\n        public int findGcd(int a, int b){\\n            return (a == 0 || b == 0) ? a + b : findGcd(b, a % b);\\n        }\\n        \\n    }\\n\\nMethod 2:( 3 reverse thinking, O(n) time cost, O(1) space cost)\\n\\n    public class Solution {\\n        public void rotate(int[] nums, int k) {\\n            if(nums.length <= 1){\\n                return;\\n            }\\n            //step each time to move\\n            int step = k % nums.length;\\n            reverse(nums,0,nums.length - 1);\\n            reverse(nums,0,step - 1);\\n            reverse(nums,step,nums.length - 1);\\n        }\\n        \\n        //reverse int array from n to m\\n        public void reverse(int[] nums, int n, int m){\\n            while(n < m){\\n                nums[n] ^= nums[m];\\n                nums[m] ^= nums[n];\\n                nums[n] ^= nums[m];\\n                n++;\\n                m--;\\n            }\\n        }\\n    }\\n\\nMethod 3:( Normal way, O(n) time cost, O(k % nums.length) space cost)\\n\\n    public class Solution {\\n        public void rotate(int[] nums, int k) {\\n            if(nums.length <= 1){\\n                return;\\n            }\\n            //step each time to move\\n            int step = k % nums.length;\\n            int[] tmp = new int[step];\\n            for(int i = 0; i < step; i++){\\n                tmp[i] = nums[nums.length - step + i];\\n            }\\n            for(int i = nums.length - step - 1; i >= 0; i--){\\n                nums[i + step] = nums[i];\\n            }\\n            for(int i = 0; i < step; i++){\\n                nums[i] = tmp[i];\\n            }\\n            \\n        }\\n        \\n    }"
		},
		{
			"lc_ans_id":"54263",
			"view":"8791",
			"top":"5",
			"title":"3 lines of C++ in one pass using swap",
			"vote":"51",
			"content":"Every swap will put one number into its correct position, so the running time is O(n)\\n\\nFor example,\\n\\nat first, `nums[]` is `[1,2,3,4,5,6,7]`, n is 7, k is 3\\n\\nafter first outer loop, `nums[]` is `[4,1,2,3]`, n is 4, k is 3\\n\\nafter second outer loop, `nums[]` is `[4]`, n is 1, k is 0\\n\\nloop ends.\\n\\n    void rotate(int nums[], int n, int k) {\\n        for (; k %= n; n -= k)\\n            for (int i = 0; i < k; i++)\\n                swap(*nums++, nums[n - k]);\\n    }"
		},
		{
			"lc_ans_id":"54294",
			"view":"5176",
			"top":"6",
			"title":"My solution by using Python",
			"vote":"38",
			"content":"    class Solution:\\n        # @param nums, a list of integer\\n        # @param k, num of steps\\n        # @return nothing, please modify the nums list in-place.\\n        def rotate(self, nums, k):\\n            n = len(nums)\\n            k = k % n\\n            nums[:] = nums[n-k:] + nums[:n-k]\\n        \\n\\nA little important thing to be cautious:  \\n\\n    nums[:] = nums[n-k:] + nums[:n-k] \\ncan't be written as:\\n\\n    nums = nums[n-k:] + nums[:n-k]\\n\\non the OJ. \\n    \\nThe previous one can truly change the value of **old** *nums*, but the following one just changes its reference to a **new** *nums* not the value of **old** *nums*."
		},
		{
			"lc_ans_id":"54308",
			"view":"3504",
			"top":"7",
			"title":"Simple and Most elegant logic",
			"vote":"32",
			"content":"Let the array be - 123456789 and k = 4\\n\\n\\n*Step 1* -  **12345** 6789  --->  **54321** 6789\\n\\n*Step 2* -  54321 **6789**  --->  54321 **9876**\\n\\n*Step 3* -  **543219876**    --->   **678912345**\\n\\n\\n> 678912345 !!"
		},
		{
			"lc_ans_id":"54438",
			"view":"3291",
			"top":"8",
			"title":"My c++ solution, o(n)time && o(1)space",
			"vote":"30",
			"content":"    class Solution {\\n    public:\\n        void rotate(int nums[], int n, int k) {\\n            int nowIndex = 0, nextIndex;\\n    \\t\\tint tmp1, tmp2 = nums[0];\\n    \\t\\tfor(int j=0,i=0; j<n; j++){\\n    \\t\\t\\ttmp1 = tmp2;\\n    \\t\\t\\tnowIndex = (k + nowIndex) % (n);\\n    \\t\\t\\ttmp2 = nums[nowIndex];\\n    \\t\\t\\tnums[nowIndex] = tmp1;\\n    \\t\\t\\tif(nowIndex == i) {\\n    \\t\\t\\t\\tnowIndex = ++i;\\n    \\t\\t\\t\\ttmp2 = nums[nowIndex];\\n    \\t\\t\\t}\\n    \\t\\t}\\n        }\\n    };"
		},
		{
			"lc_ans_id":"54702",
			"view":"3341",
			"top":"9",
			"title":"Java solution in one pass, O(1) space, O(n) time",
			"vote":"29",
			"content":"I got the idea from this C++ solution: [3 lines of C++ in one pass using swap][1]\\n\\n\\n  [1]: https://oj.leetcode.com/discuss/26501/3-lines-of-c-in-one-pass-using-swap\\n\\n\\nBut since Java doesn't have all those nice trick of swap() and pointer operations, I modified it to store the processed section at the end, and then handle the rest at the beginning of the array.\\n\\nThe idea is: for a given K, I can put (n - k) elements to their final locations at the end of the array in a single pass; after that, the problem is reduced to a sub-problem of processing the remaining elements.\\n\\nFor example, [1,2,3,4,5,6,7] k = 3, in the first iteration in the while loop, put n-k=4 elements to the final places at the end. Will have to start from the last element, so that the other elements will be bubbled down correctly. It will look like this after the first iteration: [7, 5, 6, 1, 2, 3, 4]\\n\\nThe 2nd iteration will handle the remaining 3 elements: [7, 5, 6]; to determine the new k, we first observe that the # of out-of-order elements being put to the beginning of the array are (range % k), and in this example, only one element (7) is out of order. then to move the out-of-order elements back in order, we just need to rotate the remaining 3 elements to the right by k' = n - (range % k) = 2.\\n\\ntherefore, after 2nd iteration in while loop, we will get [6, 5, 7], then n <- 2, k <- 1;\\n\\nthe 3rd iteration starts with sub array [6,5], k =1, and we will get [5,6] after it,  and then n <- 1.\\n\\n\\n        if (nums.length == 0) return;\\n        int n = nums.length;\\n        while ((k %= n) > 0 && n > 1) {\\n            int range = n - k;\\n            for (int i = 1; i <= range; i++) {\\n                int val = nums[n - i];\\n                nums[n - i] = nums[n - i - k];\\n                nums[n - i - k] = val;\\n            }\\n            n = k;\\n            k = n - (range % k);\\n        }\\n\\nHope this helps."
		}
	],
	"id":"189",
	"title":"Rotate Array",
	"content":"<p>Rotate an array of <i>n</i> elements to the right by <i>k</i> steps.</p>\r\n<p>For example, with <i>n</i> = 7 and <i>k</i> = 3, the array <code>[1,2,3,4,5,6,7]</code> is rotated to <code>[5,6,7,1,2,3,4]</code>. </p>\r\n\r\n<p><b>Note:</b><br />\r\nTry to come up as many solutions as you can, there are at least 3 different ways to solve this problem.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">[show hint]</a></p>\r\n<div class=\"spoilers\"><b>Hint:</b><br />\r\nCould you do it in-place with O(1) extra space?\r\n</div>\r\n\r\n<p>Related problem: <a href=\"/problems/reverse-words-in-a-string-ii/\">Reverse Words in a String II</a></p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/Freezen\">@Freezen</a> for adding this problem and creating all test cases.</p>",
	"frequency":"486",
	"ac_num":"161665"
}