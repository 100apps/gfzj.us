{
	"difficulty":"2",
	"submit_num":"168393",
	"show_id":"275",
	"leetcode_id":"275",
	"answers":[
		{
			"lc_ans_id":"71063",
			"view":"21829",
			"top":"0",
			"title":"Standard binary search",
			"vote":"69",
			"content":"Just binary search, each time check citations[mid]\\ncase 1: citations[mid] == len-mid, then it means there are citations[mid] papers that have at least citations[mid] citations.\\ncase 2: citations[mid] > len-mid, then it means there are citations[mid] papers that have moret than citations[mid] citations, so we should continue searching in the left half\\ncase 3:  citations[mid] < len-mid, we should continue searching in the right side\\nAfter iteration, it is guaranteed that right+1 is the one we need to find (i.e. len-(right+1) papars have at least len-(righ+1) citations)\\n\\n\\n    class Solution {\\n    public:\\n        int hIndex(vector<int>& citations) {\\n            int left=0, len = citations.size(), right= len-1,  mid;\\n            while(left<=right)\\n            {\\n                mid=(left+right)>>1;\\n                if(citations[mid]== (len-mid)) return citations[mid];\\n                else if(citations[mid] > (len-mid)) right = mid - 1;\\n                else left = mid + 1;\\n            }\\n            return len - (right+1);\\n        }\\n    };\\n\\nor simplified version\\n\\n    class Solution {\\n    public:\\n        int hIndex(vector<int>& citations) {\\n            int left=0, len = citations.size(), right= len-1,  mid;\\n            while(left<=right)\\n            {\\n                mid=left+ (right-left)/2;\\n                if(citations[mid] >= (len-mid)) right = mid - 1;\\n                else left = mid + 1;\\n            }\\n            return len - left;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71071",
			"view":"6834",
			"top":"1",
			"title":"O(logN)-time O(1)-space Easy Solution with Detailed Explanations (C++/Java/Python)",
			"vote":"19",
			"content":"The basic idea of this solution is to use **binary search** to find the minimum `index` such that\\n\\n    citations[index] >= length(citations) - index\\n\\nAfter finding this `index`, the answer is `length(citations) - index`.\\n\\nThis logic is very similar to the C++ function `lower_bound` or `upper_bound`.\\n\\n----------\\n\\nComplexities:\\n\\n- Time: O(log *n*)\\n- Space: O(1)\\n\\n----------\\n\\n\\n**C++:**\\n\\n    class Solution {\\n    public:\\n        int hIndex(vector<int>& citations) {\\n            int size = citations.size();\\n\\n            int first = 0;\\n            int mid;\\n            int count = size;\\n            int step;\\n            \\n            while (count > 0) {\\n                step = count / 2;\\n                mid = first + step;\\n                if (citations[mid] < size - mid) {\\n                    first = mid + 1;\\n                    count -= (step + 1);\\n                }\\n                else {\\n                    count = step;\\n                }\\n            }\\n            \\n            return size - first;\\n        }\\n    };\\n\\n\\n\\n\\n**Java:**\\n\\n    public class Solution {\\n        public int hIndex(int[] citations) {\\n            int len = citations.length;\\n\\n            int first = 0;\\n            int mid;\\n            int count = len;\\n            int step;\\n            \\n            while (count > 0) {\\n                step = count / 2;\\n                mid = first + step;\\n                if (citations[mid] < len - mid) {\\n                    first = mid + 1;\\n                    count -= (step + 1);\\n                }\\n                else {\\n                    count = step;\\n                }\\n            }\\n            \\n            return len - first;\\n        }\\n    }\\n\\n**Python:**\\n\\n    class Solution(object):\\n        def hIndex(self, citations):\\n            \"\"\"\\n            :type citations: List[int]\\n            :rtype: int\\n            \"\"\"\\n            \\n            length = len(citations)\\n            \\n            first = 0\\n            count = length\\n            \\n            while count > 0:\\n                step = count / 2\\n                mid = first + step\\n                if citations[mid] < length - mid:\\n                    first = mid + 1\\n                    count -= (step + 1)\\n                else:\\n                    count = step\\n            \\n            return length - first\\n            \\n------------------\\n\\n**@daviantan1890  @ruichang** Thank you for your comments and discussions.\\n\\nI am very sure that two-branch binary search is more efficient than three branch binary search.\\nand (low + high) is not good idea since it may rely on the overflow behavior.\\nIn fact, using `count` `step` `first` `mid` is the standard implement way of C++, so I do not think there are better ways to implement the binary search."
		},
		{
			"lc_ans_id":"71124",
			"view":"4310",
			"top":"2",
			"title":"Java binary search, simple and clean",
			"vote":"18",
			"content":"The idea is to search for the first index from the sorted array so that :\\n<br> <i>citations[index] >= length(citations) - index.</I> <br>\\nAnd return (length - index) as the result.\\nHere is the code:\\n\\n    public int hIndex(int[] citations) {\\n\\t\\tint len = citations.length;\\n\\t\\tint lo = 0, hi = len - 1;\\n\\t\\twhile (lo <= hi) {\\n\\t\\t\\tint med = (hi + lo) / 2;\\n\\t\\t\\tif (citations[med] == len - med) {\\n\\t\\t\\t\\treturn len - med;\\n\\t\\t\\t} else if (citations[med] < len - med) {\\n\\t\\t\\t\\tlo = med + 1;\\n\\t\\t\\t} else { \\n\\t\\t\\t\\t//(citations[med] > len-med), med qualified as a hIndex,\\n\\t\\t\\t    // but we have to continue to search for a higher one.\\n\\t\\t\\t\\thi = med - 1;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn len - lo;\\n\\t}"
		},
		{
			"lc_ans_id":"71117",
			"view":"2867",
			"top":"3",
			"title":"Share my C O(logN) solution with explanation.",
			"vote":"11",
			"content":"The basic idea comes from the description **h of his/her N papers have at least h citations each**.\\nTherefore, we know `if \"mid + 1\" is a valid h index, it means value of position \"citationsSize - mid - 1\" must exceed \"mid\"`. After we find a valid h index, we go on searching on the right part to see if we can find a larger h index.\\nIf it's not a valid h index, the h index can be found in the left part and we simply follow the standard binary search to solve this problem. \\n    \\n    int hIndex(int* citations, int citationsSize) {\\n        int lo = 0, hi = citationsSize, mid, index = 0;\\n        while (lo <= hi) {\\n            mid = lo + ((hi - lo) >> 1);\\n            if (citations[citationsSize - mid - 1] > mid) {\\n                lo = mid + 1;\\n                index = lo;\\n            } else {\\n                hi = mid - 1;\\n            }\\n        }\\n        return index;\\n    }"
		},
		{
			"lc_ans_id":"71093",
			"view":"1678",
			"top":"4",
			"title":"Short Python O(log n) Solution",
			"vote":"8",
			"content":"The idea is to do binary search to find the min index such that `citations[i] >= len(citations) - i`, then the answer is `len(citations)-i`\\n\\n    def hIndex(self, citations):\\n        n = len(citations)\\n        l, r = 0, n-1\\n        while l <= r:\\n            mid = (l+r)/2\\n            if citations[mid] >= n-mid:\\n                r = mid - 1\\n            else:\\n                l = mid + 1\\n        return n-l"
		},
		{
			"lc_ans_id":"71115",
			"view":"769",
			"top":"5",
			"title":"Very standard binary search using (start + 1 < end)",
			"vote":"7",
			"content":"    public class Solution {\\n        public int hIndex(int[] citations) {\\n            int length = citations.length;\\n            if (length == 0) return 0;\\n            int start = 0, end = length-1;\\n            while (start + 1 < end) {\\n                int mid = start + (end-start)/2;\\n                if (citations[mid] == length-mid) {\\n                    return length-mid;\\n                } else if (citations[mid] > length-mid) {\\n                    end = mid;\\n                } else {\\n                    start = mid;\\n                }\\n            }\\n            // once jump out, always check start & end\\n            if (citations[start] >= length-start) return length-start;\\n            if (citations[end] >= length-end) return length-end;\\n            return 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71097",
			"view":"2246",
			"top":"6",
			"title":"C++ binary search",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        int hIndex(vector<int>& citations) {\\n            if (citations.empty()) return 0;\\n            int start = 0, len = citations.size(), end = len - 1;\\n            while (start <= end) {\\n                int mid = (start + end)/2;\\n                if (citations[mid] < len - mid)\\n                    start = mid + 1;\\n                else if (citations[mid] > len - mid)\\n                    end = mid - 1;\\n                else return len - mid;\\n            }\\n            return len - start;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71090",
			"view":"791",
			"top":"7",
			"title":"Most clear explanation: Binary Search Java Solution",
			"vote":"6",
			"content":"We use two pinter to solve this problem: pointer l (low) and pointer h (high).\\n\\nSay n = citations.length. \\nBecause the range of H-index is [0,n], at the beginning we must point high pointer after the last element of the array: h = n. In this way we can generate all possible value without worrying about annoying corner case.\\n\\nThe rest is standard binary search, we find middle point m and compare **citations[m]** with **n-m** (n-m means number of papers has at least citations[m] citations.)\\n1. citations[m] == n-m : we find the answer\\n2. citations[m] < n-m : more papers has at least this number of citations we should raise the bar of citations so we go to the right part: l = m+1.\\n3. citations[m] > n-m : we should lower the bar so we go to the left part: h = m.\\n\\nIn the end **l == r** and the H-index is n-l.\\n\\n```\\npublic class Solution {\\n    public int hIndex(int[] citations) {\\n        int n=citations.length;\\n        int l=0, h=citations.length;\\n        while(l<h){\\n            int m=l+h>>>1;\\n            if(citations[m]==n-m)\\n                return n-m;\\n            else if(citations[m]<n-m){\\n                l=m+1;\\n            }else{\\n                h=m;\\n            }\\n        }\\n        return n-l;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"71119",
			"view":"822",
			"top":"8",
			"title":"C++ binary search H-Index II",
			"vote":"5",
			"content":"    int hIndex(vector<int>& citations) {\\n        const int size_c = citations.size();\\n        int left = 0, right = size_c - 1;\\n        while (left <= right) {\\n            int mid = left + (right - left) / 2;\\n            if (citations[mid] < size_c - mid) left = mid + 1;\\n            else right = mid - 1;\\n        }\\n        return size_c - left;\\n    }"
		},
		{
			"lc_ans_id":"71148",
			"view":"1291",
			"top":"9",
			"title":"Binary Search in Python",
			"vote":"4",
			"content":"Binary Search With Runtime Complexity of O(log n):\\n\\n    class Solution(object):\\n        def hIndex(self, citations):\\n            \"\"\"\\n            :type citations: List[int]\\n            :rtype: int\\n            \"\"\"\\n            N = len(citations)\\n            low, high = 0, N - 1\\n            while low <= high:\\n                mid = (low + high) / 2\\n                if N - mid > citations[mid]:\\n                    low = mid + 1\\n                else:\\n                    high = mid - 1\\n            return N - low\\n\\nRef: [http://bookshadow.com/weblog/2015/09/04/leetcode-h-index-ii/][1]\\n\\n\\n  [1]: http://bookshadow.com/weblog/2015/09/04/leetcode-h-index-ii/"
		}
	],
	"id":"275",
	"title":"H-Index II",
	"content":"<p>\r\n<b>Follow up</b> for <a href=\"/problems/h-index/\" target=\"_blank\">H-Index</a>: What if the <code>citations</code> array is sorted in ascending order? Could you optimize your algorithm?\r\n</p>",
	"frequency":"220",
	"ac_num":"58590"
}