{
	"difficulty":"2",
	"submit_num":"36128",
	"show_id":"658",
	"leetcode_id":"658",
	"answers":[
		{
			"lc_ans_id":"106419",
			"view":"5548",
			"top":"0",
			"title":"O(log n) Java, 1 line O(log(n) + k) Ruby",
			"vote":"34",
			"content":"I binary-search for where the resulting elements start in the array. It's the first index `i` so that `arr[i]` is better than `arr[i+k]` (with \"better\" meaning closer to or equally close to `x`). Then I just return the `k` elements starting there.\\n```\\ndef find_closest_elements(arr, k, x)\\n  arr[(0..arr.size).bsearch { |i| x - arr[i] <= (arr[i+k] || 1/0.0) - x }, k]\\nend\\n```\\nI think that's simpler than binary-searching for `x` and then expanding to the left and to the right like I've seen in other binary search solutions.\\n\\n---\\n\\nHere's a Java version without using the library's binary search:\\n\\n    public List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n        int lo = 0, hi = arr.size() - k;\\n        while (lo < hi) {\\n            int mid = (lo + hi) / 2;\\n            if (x - arr.get(mid) > arr.get(mid+k) - x)\\n                lo = mid + 1;\\n            else\\n                hi = mid;\\n        }\\n        return arr.subList(lo, lo + k);\\n    }\\nThe binary search costs O(log n) (actually also just O(log (n-k)) and the `subList` call probably only takes O(1). As @sagimann [pointed out](https://discuss.leetcode.com/post/211008), `subList` [returns a view](https://docs.oracle.com/javase/8/docs/api/java/util/List.html#subList-int-int-), not a separate copy. So it should only take O(1). Can be seen for example in `ArrayList`'s [subList](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/util/ArrayList.java#l980) and the [`SubList` constructor](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/util/ArrayList.java#l1001) it calls. I also checked `LinkedList`, it gets its `subList` method inherited from `AbstractList`, where it also takes only O(1). And `AbstractList` is a basis for most lists.\\n\\n**Edit:** I also [implemented it in Go](https://discuss.leetcode.com/topic/99831/o-log-n) now, to make it O(log n). **Edit 2:** Ha, didn't have to do that, as the Java version apparently already was O(log n) (I didn't originally know Java returns a view, only added that now). **Edit 3:** Lol, I had mistakenly written \"Python\" in the title instead of \"Ruby\" but apparently nobody noticed (and it's at 1800 views). Fixed that now."
		},
		{
			"lc_ans_id":"106439",
			"view":"3448",
			"top":"1",
			"title":"[Java/C++] Very simple binary search solution",
			"vote":"15",
			"content":"The idea is to find the first number which is equal to or greater than ```x``` in ```arr```. Then, we determine the indices of the start and the end of a subarray in ```arr```, where the subarray is our result. The time complexity is ```O(logn + k)```.\\n\\nIn the following code, ```arr[index]``` is the first number which is euqal to or geater than ```x``` (if all numbers are less than ```x```, ```index``` is ```arr.size()```), and the result  is ```arr[i+1, i+2, ... j]```.\\n\\nJava version:\\n```\\n    public List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n        int index = Collections.binarySearch(arr, x);\\n        if(index < 0) index = -(index + 1);\\n        int i = index - 1, j = index;                                    \\n        while(k-- > 0){\\n            if(i<0 || (j<arr.size() && Math.abs(arr.get(i) - x) > Math.abs(arr.get(j) - x) ))j++;\\n            else i--;\\n        }\\n        return arr.subList(i+1, j);\\n    }\\n```\\n\\nC++ version:\\n```\\n    vector<int> findClosestElements(vector<int>& arr, int k, int x) {\\n        int index = std::lower_bound(arr.begin(), arr.end(), x) - arr.begin();\\n        int i = index - 1, j = index;                                    \\n        while(k--) (i<0 || (j<arr.size() && abs(arr[i] - x) > abs(arr[j] - x) ))? j++: i--;\\n        return vector<int>(arr.begin() + i + 1, arr.begin() + j );\\n    }\\n```"
		},
		{
			"lc_ans_id":"106424",
			"view":"5002",
			"top":"2",
			"title":"Java 4-Liner and O(n) Time Solution",
			"vote":"15",
			"content":"\\nO(nlog(n)) Time Solution:\\n\\n```\\npublic List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n     Collections.sort(arr, (a,b) -> a == b ? a - b : Math.abs(a-x) - Math.abs(b-x));\\n     arr = arr.subList(0, k);\\n     Collections.sort(arr);\\n     return arr;\\n}\\n```\\n\\nO(n) Time Solution:\\n\\n```\\npublic List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n    List<Integer> less = new ArrayList<>(), greater = new ArrayList<>(),\\n                  lessResult = new LinkedList<>(), greaterResult = new LinkedList<>();\\n \\n    for (Integer i : arr) {\\n        if (i <= x) less.add(i);\\n        else greater.add(i);\\n    }\\n    \\n    Collections.reverse(less);\\n    int  i = 0, j = 0, n = less.size(), m = greater.size();\\n    for (int size=0;size<k;size++) {\\n        if (i < n && j < m) {\\n            if (Math.abs(less.get(i) - x) <= Math.abs(greater.get(j) - x)) lessResult.add(less.get(i++));\\n            else greaterResult.add(greater.get(j++));\\n        }\\n        else if (i < n) lessResult.add(less.get(i++));\\n        else greaterResult.add(greater.get(j++));\\n    }\\n\\n    Collections.reverse(lessResult);\\n    lessResult.addAll(greaterResult);\\n    return lessResult;\\n}\\n```\\n\\nNote that above solution can be improved using binary search under the assumption that we have O(1) access to elements in input list."
		},
		{
			"lc_ans_id":"106426",
			"view":"1132",
			"top":"3",
			"title":"Python easy solution, O(K+logN)",
			"vote":"9",
			"content":"````\\ndef findClosestElements(self, arr, k, x):\\n        left = right = bisect.bisect_left(arr, x)\\n        while right - left < k:\\n            if left == 0: return arr[:k]\\n            if right == len(arr): return arr[-k:]\\n            if x - arr[left - 1] <= arr[right] - x: left -= 1\\n            else: right += 1\\n        return arr[left:right]"
		},
		{
			"lc_ans_id":"106438",
			"view":"1232",
			"top":"4",
			"title":"easy java",
			"vote":"8",
			"content":"```\\n    public List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n        List<Integer> result = new LinkedList<>();\\n        TreeMap<Integer, List<Integer>> map = new TreeMap<>();\\n        for (int a : arr) {\\n            int abs = Math.abs(a - x);\\n            if (!map.containsKey(abs)) map.put(abs, new LinkedList<>());\\n            map.get(abs).add(a);\\n        }\\n        for (Map.Entry<Integer, List<Integer>> e : map.entrySet()) {\\n            for (int i : e.getValue()) {\\n                result.add(i);\\n                if (result.size() == k) break;\\n            }\\n            if (result.size() == k) break;\\n        }\\n        Collections.sort(result);\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106430",
			"view":"100",
			"top":"5",
			"title":"Updated Java Solution",
			"vote":"2",
			"content":"Here is an updated Java solution that takes in the array of integers rather than the list of integers based on StefanPochmann's Binary Search implementation:\\n\\n```\\n    public List<Integer> findClosestElements(int[] arr, int k, int x) {\\n        int start = 0, end = arr.length-k;\\n        \\n        while(start<end) {\\n            int mid = (start + end)/2;\\n            if (x - arr[mid] > arr[mid+k]-x)\\n                start = mid + 1;\\n            else\\n                end = mid;\\n        }\\n\\n        List<Integer> results = new ArrayList<Integer>();\\n        for(int i=start;i<start+k;i++){\\n            results.add(arr[i]);\\n        }\\n        return results;\\n        \\n    }\\n```"
		},
		{
			"lc_ans_id":"106454",
			"view":"242",
			"top":"6",
			"title":"O(log n) in 1 line Go",
			"vote":"2",
			"content":"Here I implemented my [O(log(n) + k) solution](https://discuss.leetcode.com/topic/99281/1-line-o-log-n-k) in Go, to get rid of the k in the complexity (because due to how Go's slices work, `arr[i:i+k]` only takes O(1) time).\\n```\\nfunc findClosestElements(arr []int, k int, x int) []int {\\n\\ti := sort.Search(len(arr) - k, func(i int) bool { return x - arr[i] <= arr[i+k] - x })\\n\\treturn arr[i:i+k]\\n}\\n```\\nOneliner version by slicing twice:\\n```\\nfunc findClosestElements(arr []int, k int, x int) []int {\\n\\treturn arr[sort.Search(len(arr) - k, func(i int) bool { return x - arr[i] <= arr[i+k] - x }):][:k]\\n}\\n```"
		},
		{
			"lc_ans_id":"106451",
			"view":"1104",
			"top":"7",
			"title":"Binary Search and Two Pointers  - 18 ms",
			"vote":"2",
			"content":"Noticing the array is sorted, so we can using binary search to get a rough area of target numbers, and then expand it to the left k-1 more and right k-1 more elements, then searching from the left to right. If the left element is more close or equal to the target number x than the right element, then move the right index to the left one step. Otherwise, move the left index to right one step. Once, the element between the left and right is k, then return the result.\\n\\n**Java**\\n```java\\npublic class Solution {\\n\\tpublic List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n\\t\\tint index = Collections.binarySearch(arr, x);\\n\\t\\tif (index == -1)\\n\\t\\t\\treturn arr.subList(0, k);\\n\\t\\telse if (index >= arr.size())\\n\\t\\t\\treturn arr.subList(arr.size() - k, arr.size());\\n\\t\\telse {\\n\\t\\t\\tif (index < 0)\\n\\t\\t\\t\\tindex = -index - 1;\\n\\t\\t\\tint left = Math.max(0, index - k - 1), right = Math.min(arr.size() - 1, index + k - 1);\\n\\n\\t\\t\\twhile (right - left > k - 1) {\\n\\t\\t\\t\\tif (left < 0 || (x - arr.get(left)) <= (arr.get(right) - x))\\n\\t\\t\\t\\t\\tright--;\\n\\t\\t\\t\\telse if (right > arr.size() - 1 || (x - arr.get(left)) > (arr.get(right) - x))\\n\\t\\t\\t\\t\\tleft++;\\n\\t\\t\\t\\telse\\n\\t\\t\\t\\t\\tSystem.out.println(\"unhandled case: \" + left + \" \" + right);\\n\\t\\t\\t}\\n\\n\\t\\t\\treturn arr.subList(left, right + 1);\\n\\t\\t}\\n\\t}\\n}\\n```\\nHere is an updated version.\\n```java\\npublic class Solution {\\n\\tpublic List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n\\t\\tint n = arr.size();\\n\\t\\tif (x <= arr.get(0)) {\\n\\t\\t\\treturn arr.subList(0, k);\\n\\t\\t} else if (arr.get(n - 1) <= x) {\\n\\t\\t\\treturn arr.subList(n - k, n);\\n\\t\\t} else {\\n\\t\\t\\tint index = Collections.binarySearch(arr, x);\\n\\t\\t\\tif (index < 0)\\n\\t\\t\\t\\tindex = -index - 1;\\n\\t\\t\\tint low = Math.max(0, index - k - 1), high = Math.min(arr.size() - 1, index + k - 1);\\n\\n\\t\\t\\twhile (high - low > k - 1) {\\n\\t\\t\\t\\tif (low < 0 || (x - arr.get(low)) <= (arr.get(high) - x))\\n\\t\\t\\t\\t\\thigh--;\\n\\t\\t\\t\\telse if (high > arr.size() - 1 || (x - arr.get(low)) > (arr.get(high) - x))\\n\\t\\t\\t\\t\\tlow++;\\n\\t\\t\\t\\telse\\n\\t\\t\\t\\t\\tSystem.out.println(\"unhandled case: \" + low + \" \" + high);\\n\\t\\t\\t}\\n\\t\\t\\treturn arr.subList(low, high + 1);\\n\\t\\t}\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"106435",
			"view":"1114",
			"top":"8",
			"title":"Java short O(NlogN) solution and O(logN + k) solution",
			"vote":"2",
			"content":"O(NlogN) solution: \\nThe idea here is to simply sort the array based on the distance to the target and grab the top k elements.\\n\\n```\\npublic static List<Integer> findClosestElements(List<Integer> arr, int k, int x) {\\n        arr.sort(Comparator.comparingInt(i -> Math.abs(i - x)));\\n        arr = arr.subList(0, k);\\n        arr.sort(Comparator.naturalOrder());\\n        return arr;\\n    }\\n```\\nO(logN + k) solution:\\nWe use binary search to find the nearest location of x in the array. This is logN.\\nThen we expand on both sides using 2 pointers, to get the k nearest elements.\\n```\\n    public static List<Integer> findClosestElements2(List<Integer> arr, int k, int x) {\\n        if(x < arr.get(0)) return arr.subList(0, k);\\n        if(x > arr.get(arr.size()-1)) return arr.subList(arr.size()-k+1, arr.size());\\n\\n        List<Integer> result = new ArrayList<>();\\n        int index = binSearch(arr, x);\\n        System.out.println(index);\\n        int i = 0; int j = 0;\\n        if(arr.get(index) == x) {\\n            result.add(x);\\n            i = index - 1;\\n            j = index + 1;\\n        } else {\\n            i = index - 1;\\n            j = index;\\n        }\\n\\n        while(i >= 0 && j < arr.size() && result.size() != k) {\\n           if(Math.abs(arr.get(i) - x) <= Math.abs(arr.get(j) - x)) {\\n              result.add(0, arr.get(i--));\\n           } else {\\n               result.add(arr.get(j++));\\n           }\\n        }\\n\\n        if(result.size() == k) {\\n        } else if(i < 0) {\\n            result.addAll(arr.subList(j, j + k - result.size()));\\n        } else {\\n            result.addAll(0, arr.subList(i+1-k+result.size(), i+1));\\n        }\\n\\n        return result;\\n    }\\n\\n    public static int binSearch(List<Integer> a, int target) {\\n        int st = 0;\\n        int end = a.size() - 1;\\n        int mid = 0;\\n        while(st <= end) {\\n            mid = (st + end)/2;\\n            if(a.get(mid) == target) {\\n                break;\\n            } else if (a.get(mid) > target) {\\n                end = mid -1;\\n            } else {\\n                st = mid +1;\\n            }\\n        }\\n        return mid;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"106453",
			"view":"305",
			"top":"9",
			"title":"Python Simple, O(n) Solution",
			"vote":"1",
			"content":"```\\n    def findClosestElements(self, arr, k, x):\\n        end = k\\n        for i in xrange(k, len(arr)):\\n            delta = abs(arr[i] - x) - abs(arr[i - k] - x)\\n            if delta > 0:\\n                return arr[end - k:end]\\n            if delta < 0:\\n                end = i + 1\\n        return arr[end - k:end]"
		}
	],
	"id":"635",
	"title":"Find K Closest Elements",
	"content":"<p>\r\nGiven a sorted array, two integers <code>k</code> and <code>x</code>, find the <code>k</code> closest elements to <code>x</code> in the array.  The result should also be sorted in ascending order.\r\nIf there is a tie,  the smaller elements are always preferred.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,4,5], k=4, x=3\r\n<b>Output:</b> [1,2,3,4]\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,4,5], k=4, x=-1\r\n<b>Output:</b> [1,2,3,4]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The value k is positive and will always be smaller than the length of the sorted array.</li>\r\n<li> Length of the given array is positive and will not exceed 10<sup>4</sup></li>\r\n<li> Absolute value of elements in the array and x will not exceed 10<sup>4</sup></li>\r\n</ol>\r\n</p>\r\n\r\n<hr />\r\n\r\n<p>\r\n<b><font color=\"red\">UPDATE (2017/9/19):</font></b><br />\r\nThe <i>arr</i> parameter had been changed to an <b>array of integers</b> (instead of a list of integers). <b><i>Please reload the code definition to get the latest changes</i></b>.\r\n</p>",
	"frequency":"151",
	"ac_num":"12816"
}