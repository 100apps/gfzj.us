{
	"difficulty":"2",
	"submit_num":"524642",
	"show_id":"75",
	"leetcode_id":"75",
	"answers":[
		{
			"lc_ans_id":"26472",
			"view":"55813",
			"top":"0",
			"title":"Share my at most two-pass constant space 10-line solution",
			"vote":"474",
			"content":"The idea is to sweep all 0s to the left and all 2s to the right, then all 1s are left in the middle.\\n\\nIt is hard to define what is a \"one-pass\" solution but this algorithm is bounded by O(2n), meaning that at most each element will be seen and operated twice (in the case of all 0s). You may be able to write an algorithm which goes through the list only once, but each step requires multiple operations, leading the total operations larger than O(2n).\\n\\n        class Solution {\\n        public:\\n            void sortColors(int A[], int n) {\\n                int second=n-1, zero=0;\\n                for (int i=0; i<=second; i++) {\\n                    while (A[i]==2 && i<second) swap(A[i], A[second--]);\\n                    while (A[i]==0 && i>zero) swap(A[i], A[zero++]);\\n                }\\n            }\\n        };"
		},
		{
			"lc_ans_id":"26500",
			"view":"26922",
			"top":"1",
			"title":"Four different solutions",
			"vote":"115",
			"content":"    // two pass O(m+n) space\\n    void sortColors(int A[], int n) {\\n        int num0 = 0, num1 = 0, num2 = 0;\\n        \\n        for(int i = 0; i < n; i++) {\\n            if (A[i] == 0) ++num0;\\n            else if (A[i] == 1) ++num1;\\n            else if (A[i] == 2) ++num2;\\n        }\\n        \\n        for(int i = 0; i < num0; ++i) A[i] = 0;\\n        for(int i = 0; i < num1; ++i) A[num0+i] = 1;\\n        for(int i = 0; i < num2; ++i) A[num0+num1+i] = 2;\\n    }\\n    \\n    // one pass in place solution\\n    void sortColors(int A[], int n) {\\n        int n0 = -1, n1 = -1, n2 = -1;\\n        for (int i = 0; i < n; ++i) {\\n            if (A[i] == 0) \\n            {\\n                A[++n2] = 2; A[++n1] = 1; A[++n0] = 0;\\n            }\\n            else if (A[i] == 1) \\n            {\\n                A[++n2] = 2; A[++n1] = 1;\\n            }\\n            else if (A[i] == 2) \\n            {\\n                A[++n2] = 2;\\n            }\\n        }\\n    }\\n    \\n    // one pass in place solution\\n    void sortColors(int A[], int n) {\\n        int j = 0, k = n - 1;\\n        for (int i = 0; i <= k; ++i){\\n            if (A[i] == 0 && i != j)\\n                swap(A[i--], A[j++]);\\n            else if (A[i] == 2 && i != k)\\n                swap(A[i--], A[k--]);\\n        }\\n    }\\n    \\n    // one pass in place solution\\n    void sortColors(int A[], int n) {\\n        int j = 0, k = n-1;\\n        for (int i=0; i <= k; i++) {\\n            if (A[i] == 0)\\n                swap(A[i], A[j++]);\\n            else if (A[i] == 2)\\n                swap(A[i--], A[k--]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26479",
			"view":"10408",
			"top":"2",
			"title":"AC Python in place one pass solution O(n) time O(1) space, no swap no count",
			"vote":"75",
			"content":"    def sortColors(self, nums):\\n        i = j = 0\\n        for k in xrange(len(nums)):\\n            v = nums[k]\\n            nums[k] = 2\\n            if v < 2:\\n                nums[j] = 1\\n                j += 1\\n            if v == 0:\\n                nums[i] = 0\\n                i += 1\\n\\n    # 86 / 86 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 44 ms\\n    # 84.03%\\n\\n\\nJust like the Lomuto partition algorithm usually used in quick sort. We keep a loop invariant that [0,i) [i, j) [j, k) are 0s, 1s and 2s sorted in place for [0,k). Here \")\" means exclusive. We don't need to swap because we know the values we want."
		},
		{
			"lc_ans_id":"26474",
			"view":"9645",
			"top":"3",
			"title":"Sharing C++ solution with Good Explanation",
			"vote":"66",
			"content":"The solution requires the use of tracking 3 positions, the Low, Mid and High.\\n\\nWe assume that the mid is the \"Unknown\" area that we must evaluate.\\n\\nIf we encounter a 0, we know that it will be on the low end of the array, and if we encounter a 2, we know it will be on the high end of the array.\\n\\nTo achieve this in one pass without preprocessing (counting), we simply traverse the unknown will generating the low and high ends.\\n\\nTake this example:\\n\\nAssume our input is: 1 0 2 2 1 0 (short for simplicity).\\n\\nRunning the algorithm by hand would look something like:\\n\\n        1 0 2 2 1 0\\n        ^         ^\\n        L         H\\n        M\\n\\n        Mid != 0 || 2\\n        Mid++\\n\\n        1 0 2 2 1 0\\n        ^ ^       ^\\n        L M       H\\n\\n        Mid == 0\\n        Swap Low and Mid\\n        Mid++\\n        Low++\\n\\n        0 1 2 2 1 0\\n          ^ ^     ^\\n          L M     H\\n\\n        Mid == 2\\n        Swap High and Mid\\n        High--\\n\\n        0 1 0 2 1 2\\n          ^ ^   ^\\n          L M   H\\n\\n        Mid == 0\\n        Swap Low and Mid\\n        Mid++\\n        Low++\\n\\n        0 0 1 2 1 2\\n            ^ ^ ^\\n            L M H\\n\\n        Mid == 2\\n        Swap High and Mid\\n        High--\\n\\n        0 0 1 1 2 2\\n            ^ ^\\n            L M\\n              H\\n\\n        Mid <= High is our exit case\\n\\nImplemented in C++, it looks like:\\n\\n    class Solution {\\n        public:\\n        void sortColors(vector<int>& nums) \\n        {\\n            int tmp = 0, low = 0, mid = 0, high = nums.size() - 1;\\n        \\n            while(mid <= high)\\n            {\\n                if(nums[mid] == 0)\\n                {\\n                    tmp = nums[low];\\n                    nums[low] = nums[mid];\\n                    nums[mid] = tmp;\\n                    low++;\\n                    mid++;\\n                }\\n                else if(nums[mid] == 1)\\n                {\\n                    mid++;\\n                }\\n                else if(nums[mid] == 2)\\n                {\\n                    tmp = nums[high];\\n                    nums[high] = nums[mid];\\n                    nums[mid] = tmp;\\n                    high--;\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26549",
			"view":"8577",
			"top":"4",
			"title":"Java solution, both 2-pass and 1-pass",
			"vote":"41",
			"content":"\\n    public void sortColors(int[] nums) {\\n        // 1-pass\\n        int p1 = 0, p2 = nums.length - 1, index = 0;\\n        while (index <= p2) {\\n            if (nums[index] == 0) {\\n                nums[index] = nums[p1];\\n                nums[p1] = 0;\\n                p1++;\\n            }\\n            if (nums[index] == 2) {\\n                nums[index] = nums[p2];\\n                nums[p2] = 2;\\n                p2--;\\n                index--;\\n            }\\n            index++;\\n        }\\n    }\\n\\n\\n----------\\n\\n    public void sortColors(int[] nums) {\\n        // 2-pass\\n        int count0 = 0, count1 = 0, count2 = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] == 0) {count0++;}\\n            if (nums[i] == 1) {count1++;}\\n            if (nums[i] == 2) {count2++;}\\n        }\\n        for(int i = 0; i < nums.length; i++) {\\n            if (i < count0) {nums[i] = 0;}\\n            else if (i < count0 + count1) {nums[i] = 1;}\\n            else {nums[i] = 2;}\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26518",
			"view":"4403",
			"top":"5",
			"title":"4ms and only 5 lines c++ code without delete and insert",
			"vote":"38",
			"content":"Here I label the end of same colour, and update for every item in nums.\\n\\n    void sortColors(vector<int>& nums) {\\n        int r=0, w=0, b=0; // label the end of different colors;\\n        for(int num: nums){\\n            if(num==0) {nums[b++]=2; nums[w++]=1; nums[r++]=0; } \\n            else if(num==1) {nums[b++]=2; nums[w++]=1;}\\n            else if(num==2) b++;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26700",
			"view":"3039",
			"top":"6",
			"title":"My C++ solution with one pass and O(n) time and O(n) space",
			"vote":"21",
			"content":"    class Solution {\\n    public:\\n    //use counting sort\\n    void sortColors(int A[], int n) {\\n    int red = -1, white = -1, blue = -1;\\n\\n    for(int i = 0; i < n; i++){\\n        if(A[i] == 0){   \\n            A[++blue] = 2;\\n            A[++white] = 1;\\n            A[++red] = 0;\\n        }\\n        else if(A[i] == 1){\\n            A[++blue] = 2;\\n            A[++white] = 1;\\n        }\\n        else if(A[i] == 2)   \\n            A[++blue] = 2;\\n    }\\n    }\\n    };\\n\\nthe clever thing is that use three variable to store the three colors' index position.\\nWhen you face A[i] == 0, all the variables add 1 because 0 is former.\\nDo the same thing to other 2 situation.\\n\\nEx:\\nIf you just face 2, just need to assign 2 to the A[++blue], and \"++blue\" will increase \"blue\" with 1.\\nNext if you face 0, you will increase 3 variable and assign the number to A!\\n\\nIt will make sure you always get the right sorted array when you run the for loop."
		},
		{
			"lc_ans_id":"26760",
			"view":"2002",
			"top":"7",
			"title":"C++ solution in 8 lines: an instance of the Dutch national flag problem by Edsger Dijkstra",
			"vote":"20",
			"content":"A more general problem is the [Dutch national flag problem][1] by Edsger Dijkstra, which can be used to solve this problem, as well as partition in quicksort.\\n\\n    class Solution {\\n    public:\\n        void sortColors(int A[], int n) {\\n            int i = 0, lo = 0, hi = n - 1;\\n            // invariants: A[0..lo-1] are less than pivot 1, A[lo..i-1] equal, A[hi+1..end] greater\\n            while (i <= hi)\\n                if (A[i] < 1)\\n                    swap(A[i++], A[lo++]);\\n                else if (A[i] > 1)\\n                    swap(A[i], A[hi--]);\\n                else\\n                    i++;\\n        }\\n    };\\n\\n  [1]: http://en.wikipedia.org/wiki/Quicksort#Repeated_elements"
		},
		{
			"lc_ans_id":"26635",
			"view":"1353",
			"top":"8",
			"title":"Short C++ 5 line solution (Dutch national flag problem)",
			"vote":"16",
			"content":"It's actually [Dutch national flag problem][1].\\n\\n    [, i): 0 \\n    [i, j]: 1\\n    (k, ...]: 2\\n    Once j meets k, the sorting is complete\\n\\nCode\\n\\n    class Solution { \\n    public:\\n        void sortColors(vector<int>& nums) {\\n            int i = 0, j = i, k = nums.size() - 1;\\n            \\n            while(j <= k){\\n                if(nums[j] == 0) swap(nums[i++], nums[j++]);\\n                else if(nums[j] == 1) j++;\\n                else swap(nums[k--], nums[j]);\\n            }\\n        }\\n    }; \\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Dutch_national_flag_problem"
		},
		{
			"lc_ans_id":"26481",
			"view":"2441",
			"top":"9",
			"title":"Python O(n) 1 pass in-place solution with explanation",
			"vote":"16",
			"content":"This is a [dutch partitioning problem][1]. We are classifying the array into four groups: red, white, unclassified, and blue. Initially we group all elements into unclassified. We iterate from the beginning as long as the white pointer is less than the blue pointer. \\n\\nIf the white pointer is red (nums[white] == 0), we swap with the red pointer and move both white and red pointer forward. If the pointer is white (nums[white] == 1), the element is already in correct place, so we don't have to swap, just move the white pointer forward. If the white pointer is blue, we swap with the latest unclassified element.\\n\\n\\n    def sortColors(self, nums):\\n        red, white, blue = 0, 0, len(nums)-1\\n        \\n        while white <= blue:\\n            if nums[white] == 0:\\n                nums[red], nums[white] = nums[white], nums[red]\\n                white += 1\\n                red += 1\\n            elif nums[white] == 1:\\n                white += 1\\n            else:\\n                nums[white], nums[blue] = nums[blue], nums[white]\\n                blue -= 1\\n                \\n                \\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Dutch_national_flag_problem"
		}
	],
	"id":"75",
	"title":"Sort Colors",
	"content":"<p>\r\nGiven an array with <i>n</i> objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.\r\n</p>\r\n\r\n<p>\r\nHere, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nYou are not suppose to use the library's sort function for this problem.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show follow up.</a></p>\r\n\r\n<div class=\"spoilers\">\r\n<p><b>Follow up:</b><br />\r\nA rather straight forward solution is a two-pass algorithm using counting sort.<br />\r\nFirst, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.</p>\r\n<p>Could you come up with an one-pass algorithm using only constant space?<br />\r\n</p>\r\n</div>",
	"frequency":"400",
	"ac_num":"203096"
}