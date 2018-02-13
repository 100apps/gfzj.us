{
	"difficulty":"1",
	"submit_num":"253943",
	"show_id":"167",
	"leetcode_id":"167",
	"answers":[
		{
			"lc_ans_id":"51239",
			"view":"33763",
			"top":"0",
			"title":"Share my java AC solution.",
			"vote":"99",
			"content":"Without HashMap, just have two pointers, A points to index 0, B points to index len - 1, shrink the scope based on the value and target comparison.\\n\\n    public int[] twoSum(int[] num, int target) {\\n        int[] indice = new int[2];\\n        if (num == null || num.length < 2) return indice;\\n        int left = 0, right = num.length - 1;\\n        while (left < right) {\\n            int v = num[left] + num[right];\\n            if (v == target) {\\n                indice[0] = left + 1;\\n                indice[1] = right + 1;\\n                break;\\n            } else if (v > target) {\\n                right --;\\n            } else {\\n                left ++;\\n            }\\n        }\\n        return indice;\\n    }"
		},
		{
			"lc_ans_id":"51253",
			"view":"20727",
			"top":"1",
			"title":"A simple O(n) solution",
			"vote":"47",
			"content":"We only have to shrink the range to find the pair:\\n\\nclass Solution {\\n\\npublic:\\n\\n    vector<int> twoSum(vector<int>& numbers, int target) {\\n        int lo=0, hi=numbers.size()-1;\\n        while (numbers[lo]+numbers[hi]!=target){\\n            if (numbers[lo]+numbers[hi]<target){\\n                lo++;\\n            } else {\\n                hi--;\\n            }\\n        }\\n        return vector<int>({lo+1,hi+1});\\n    }\\n\\n};"
		},
		{
			"lc_ans_id":"51249",
			"view":"10164",
			"top":"2",
			"title":"Python different solutions (two-pointer, dictionary, binary search).",
			"vote":"42",
			"content":"        \\n    # two-pointer\\n    def twoSum1(self, numbers, target):\\n        l, r = 0, len(numbers)-1\\n        while l < r:\\n            s = numbers[l] + numbers[r]\\n            if s == target:\\n                return [l+1, r+1]\\n            elif s < target:\\n                l += 1\\n            else:\\n                r -= 1\\n     \\n    # dictionary           \\n    def twoSum2(self, numbers, target):\\n        dic = {}\\n        for i, num in enumerate(numbers):\\n            if target-num in dic:\\n                return [dic[target-num]+1, i+1]\\n            dic[num] = i\\n     \\n    # binary search        \\n    def twoSum(self, numbers, target):\\n        for i in xrange(len(numbers)):\\n            l, r = i+1, len(numbers)-1\\n            tmp = target - numbers[i]\\n            while l <= r:\\n                mid = l + (r-l)//2\\n                if numbers[mid] == tmp:\\n                    return [i+1, mid+1]\\n                elif numbers[mid] < tmp:\\n                    l = mid+1\\n                else:\\n                    r = mid-1"
		},
		{
			"lc_ans_id":"51268",
			"view":"12681",
			"top":"3",
			"title":"A less efficient way (binary search)",
			"vote":"25",
			"content":"I know that the best solution is using two pointers like what is done in the previous solution sharing. However, I see the tag contains \"binary search\". I do not know if I misunderstand but is binary search a less efficient way for this problem.\\n\\nSay, fix the first element A[0] and do binary search on the remaining n-1 elements. If cannot find any element which equals target-A[0], Try A[1]. That is, fix A[1] and do binary search on A[2]~A[n-1]. Continue this process until we have the last two elements A[n-2] and A[n-1]. \\n\\nDoes this gives a time complexity lg(n-1) + lg(n-2) + ... + lg(1) ~ O(lg(n!)) ~ O(nlgn). So it is less efficient than the O(n) solution. Am I missing something here?\\n\\nThe code also passes OJ.\\n\\n    vector<int> twoSum(vector<int> &numbers, int target) {\\n        if(numbers.empty()) return {};\\n        for(int i=0; i<numbers.size()-1; i++) {\\n            int start=i+1, end=numbers.size()-1, gap=target-numbers[i];\\n            while(start <= end) {\\n                int m = start+(end-start)/2;\\n                if(numbers[m] == gap) return {i+1,m+1};\\n                else if(numbers[m] > gap) end=m-1;\\n                else start=m+1;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"51303",
			"view":"5519",
			"top":"4",
			"title":"C++ solution simple and sweet",
			"vote":"18",
			"content":"    vector<int> twoSum(vector<int>& numbers, int target) {\\n            \\n            int l = 0;\\n            int r = numbers.size() -1;\\n            while(l < r){\\n                if(numbers[l] + numbers[r] == target){\\n                    vector<int> res{l+1,r+1};\\n                    return res;\\n                }\\n                else if(numbers[l] + numbers[r] > target){\\n                    r--;\\n                }\\n                else{\\n                    l++;\\n                }\\n            }\\n        }"
		},
		{
			"lc_ans_id":"51282",
			"view":"2936",
			"top":"5",
			"title":"Simple 8 line Java solution with explanation. O(n)",
			"vote":"17",
			"content":"    public int[] twoSum(int[] numbers, int target) {\\n        int l = 0, r = numbers.length - 1;\\n        while (numbers[l] + numbers[r] != target) {\\n            if (numbers[l] + numbers[r] > target) r--;\\n            else l++;\\n        }\\n        return new int[]{l + 1, r + 1};\\n    }\\n\\nwe use `l` and `r` to denote the first index and second index respectively. \\n\\nWhen the sum is:<br>\\n1. smaller than the target:<br>\\n    we move `l` to the right by 1. we can't make `r` smaller because that's gonna make the sum even smaller.<br>\\n2. bigger than target:<br>\\n    move `r` to the left by 1. we can't make `l` bigger because that's gonna make the sum even bigger.<br>\\n3. equal to the target:<br>\\n    we found the answer and return.\\n\\nSince the question said there is EXACTLY one solution and didn't provide any info about when there is no valid answer, so we can always assume there is one and only one answer, which means `l` and `r` never across each other.\\n\\nAnother thing to notice is that this array is sorted."
		},
		{
			"lc_ans_id":"51251",
			"view":"1529",
			"top":"6",
			"title":"A O(logN) binary search Java Solution - 0ms, beat 98%",
			"vote":"9",
			"content":"```\\n    public int[] twoSum(int[] numbers, int target) {\\n        if (numbers == null || numbers.length == 0) {\\n            return new int[2];\\n        }\\n        int start = 0;\\n        int end = numbers.length - 1;\\n        while (start < end) {\\n            if (numbers[start] + numbers[end] == target) {\\n                return new int[]{start + 1, end + 1};\\n            } else if (numbers[start] + numbers[end] > target) {\\n                // move end forward to the last value that numbers[end] <= target - numbers[start]\\n                end = largestSmallerOrLastEqual(numbers, start, end, target - numbers[start]);\\n            } else {\\n                // move start backword to the first value that numbers[start] >= target - numbers[end]\\n                start = smallestLargerOrFirstEqual(numbers, start, end, target - numbers[end]);\\n            }\\n        }\\n        return new int[2];\\n    }\\n    private int largestSmallerOrLastEqual(int[] numbers, int start, int end, int target) {\\n        int left = start;\\n        int right = end;\\n        while (left <= right) {\\n            int mid = left + (right - left) / 2;\\n            if (numbers[mid] > target) {\\n                right = mid - 1;\\n            } else {\\n                left = mid + 1;\\n            }\\n        }\\n        return right;\\n    }\\n    private int smallestLargerOrFirstEqual(int[] numbers, int start, int end, int target) {\\n        int left = start;\\n        int right = end;\\n        while (left <= right) {\\n            int mid = left + (right - left) / 2;\\n            if (numbers[mid] < target) {\\n                left = mid + 1;\\n            } else {\\n                right = mid - 1;\\n            }\\n        }\\n        return left;\\n    }\\n```"
		},
		{
			"lc_ans_id":"51386",
			"view":"1170",
			"top":"7",
			"title":"Java 7 line simple solution",
			"vote":"6",
			"content":"    public int[] twoSum(int[] numbers, int target) {\\n            int start = 0, end = numbers.length - 1;\\n            while(start < end){\\n                if(numbers[start] + numbers[end] == target) break;\\n                if(numbers[start] + numbers[end] < target) start++;\\n                else end--;\\n            }\\n            return new int[]{start + 1, end + 1};\\n        }"
		},
		{
			"lc_ans_id":"51324",
			"view":"318",
			"top":"8",
			"title":"0ms, Java Solution, Binary Search with detailed comment, share you opinion",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    /*\\n     Idea: keep updating boundaries using binary search.\\n     \\n     Method: \\n     1) fix lower number and find the target upper number\\n        e.g. intilize lower = numbers[0], then our goal is to find the \"right\" index of upper bound which value \\n        is <= (target - lower)\\n        i) if lower + upper = target, we got the answer\\n        ii) if not, assign the \"upper\" number to numbers[right], go to step 2;\\n     2) fix the upper number and find the target lower number \\n        e.g. lower = target - upper, our goal is to find the \"left\" index of lower bound which value is >= (target - upper)\\n        i) if lower + upper = target, we got the answer\\n        ii) if not, assign lower to the number[left], repeat step 1 and 2, because we are guranteed to have an answer\\n    \\n    remark:\\n        Every time we update the upper value, it will be smaller than its previous value\\n        Every time we update the lower value, it will be bigger than its previous value\\n        Since this array is sorted in ascending order, the range of binary search is getting smaller each time.\\n        \\n    performance: O(logn)\\n                 real time: 0 ms\\n     */\\n    public int[] twoSum(int[] numbers, int target) {\\n        boolean isSmall = false;\\n        long small = numbers[0];\\n        long big = target - small;\\n        int left = 0;\\n        int right = numbers.length - 1;\\n        while (true) {\\n            if (isSmall) {\\n                isSmall = false;\\n                left = binarySearch(numbers, left, right - 1, small);\\n                if (numbers[left] + numbers[right] == target) {\\n                    break;\\n                } else {\\n                    small = numbers[++left];\\n                    big = target - small;\\n                }\\n            } else {\\n                isSmall = true;\\n                right = binarySearch(numbers, left + 1, right, big);\\n                if (numbers[left] + numbers[right] == target) {\\n                    break;\\n                } else {\\n                    big = numbers[right];\\n                    small = target - big;\\n                }\\n            }\\n        }\\n        return new int[]{left + 1, right + 1};\\n    }\\n    \\n    public int binarySearch(int[] nums, int l, int r, long target) {\\n        int left = l;\\n        int right = r;\\n        while (left < right) {\\n            int mid = right + (left - right) / 2;\\n            if (nums[mid] > target) {\\n                right = mid - 1;\\n            } else {\\n                left = mid;\\n            }\\n        }\\n        return left;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"51390",
			"view":"1690",
			"top":"9",
			"title":"What is the algorithm that runs 4ms for C++?",
			"vote":"4",
			"content":" My algorithm is O(n), but runs 8ms, I am just wondering whether there is more efficient algorithm?"
		}
	],
	"id":"167",
	"title":"Two Sum II - Input array is sorted",
	"content":"<p>Given an array of integers that is already <b><i>sorted in ascending order</i></b>, find two numbers such that they add up to a specific target number.</p>\r\n\r\n<p>The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.</p>\r\n\r\n<p>You may assume that each input would have <i>exactly</i> one solution and you may not use the <i>same</i> element twice.</p>\r\n\r\n<p style=\"font-family:monospace\">\r\n<b>Input:</b> numbers={2, 7, 11, 15}, target=9<br />\r\n<b>Output:</b> index1=1, index2=2\r\n</p>",
	"frequency":"466",
	"ac_num":"119983"
}