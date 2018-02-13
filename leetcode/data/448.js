{
	"difficulty":"2",
	"submit_num":"55651",
	"show_id":"454",
	"leetcode_id":"454",
	"answers":[
		{
			"lc_ans_id":"93920",
			"view":"17322",
			"top":"0",
			"title":"Clean java solution O(n^2)",
			"vote":"78",
			"content":"    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {\\n        Map<Integer, Integer> map = new HashMap<>();\\n        \\n        for(int i=0; i<C.length; i++) {\\n            for(int j=0; j<D.length; j++) {\\n                int sum = C[i] + D[j];\\n                map.put(sum, map.getOrDefault(sum, 0) + 1);\\n            }\\n        }\\n        \\n        int res=0;\\n        for(int i=0; i<A.length; i++) {\\n            for(int j=0; j<B.length; j++) {\\n                res += map.getOrDefault(-1 * (A[i]+B[j]), 0);\\n            }\\n        }\\n        \\n        return res;\\n    }\\n\\t\\n\\tTime complexity:  O(n^2)\\n\\tSpace complexity: O(n^2)"
		},
		{
			"lc_ans_id":"93917",
			"view":"8645",
			"top":"1",
			"title":"Easy 2 lines O(N^2) Python",
			"vote":"53",
			"content":"    def fourSumCount(self, A, B, C, D):\\n        AB = collections.Counter(a+b for a in A for b in B)\\n        return sum(AB[-c-d] for c in C for d in D)"
		},
		{
			"lc_ans_id":"93946",
			"view":"5763",
			"top":"2",
			"title":"Simple Java Solution with Explanation",
			"vote":"24",
			"content":"```\\npublic int fourSumCount(int[] A, int[] B, int[] C, int[] D) {\\n\\tMap<Integer,Integer> sums = new HashMap<>();\\n\\tint count = 0;\\n\\tfor(int i=0; i<A.length;i++) {\\n\\t\\tfor(int j=0;j<B.length;j++){\\n\\t\\t\\tint sum = A[i]+B[j];\\n\\t\\t\\tif(sums.containsKey(sum)) {\\n\\t\\t\\t\\tsums.put(sum, sums.get(sum)+1);\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tsums.put(sum, 1);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\tfor(int k=0; k<A.length;k++) {\\n\\t\\tfor(int z=0;z<C.length;z++){\\n\\t\\t\\tint sum = -(C[k]+D[z]);\\n\\t\\t\\tif(sums.containsKey(sum)) {\\n\\t\\t\\t\\tcount+=sums.get(sum);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\treturn count;\\n}\\n```\\n\\nTake the arrays A and B, and compute all the possible sums of two elements. Put the sum in the Hash map, and increase the hash map value if more than 1 pair sums to the same value.\\n\\nCompute all the possible sums of the arrays C and D. If the hash map contains the opposite value of the current sum, increase the count of four elements sum to 0 by the counter in the map."
		},
		{
			"lc_ans_id":"93925",
			"view":"3092",
			"top":"3",
			"title":"Concise C++ 11 code beat 99.5%",
			"vote":"12",
			"content":"```\\n    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\\n        unordered_map<int, int>  abSum;\\n        for(auto a : A) {\\n            for(auto b : B) {\\n                ++abSum[a+b];\\n            }\\n        }\\n        int count = 0;\\n        for(auto c : C) {\\n            for(auto d : D) {\\n                auto it = abSum.find(0 - c - d);\\n                if(it != abSum.end()) {\\n                    count += it->second;\\n                }\\n            }\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"93941",
			"view":"4113",
			"top":"4",
			"title":"Concise hash map O(n^2) solution with explanation, c++",
			"vote":"6",
			"content":"Using 2 hash maps for each of possible sums in both (A,B) and (C,D) find number of occurrences of this sum. Then, for each sum in (A,B) we can find if (C,D) contains complimentary sum. Add (this sum occurrences(a,b)) * (complimentary sum occurrences(c,d)) to the result.\\n```\\nclass Solution {\\npublic:\\n    void fillMap(vector<int>& A, vector<int>& B, unordered_map<int,int> &m)\\n    {\\n        int n = A.size();\\n        for(int i = 0; i < n; ++i)\\n        for(int j = 0; j < n; ++j)\\n          ++m[A[i] + B[j]];\\n          \\n    }\\n    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\\n        unordered_map<int,int> m1, m2;\\n        fillMap(A, B, m1);\\n        fillMap(C, D, m2);\\n        int res = 0;\\n        for(auto it = m1.begin(); it != m1.end(); ++it)\\n        {\\n           auto it2 = m2.find(-it->first);\\n           if(it2 != m2.end())\\n             res += it->second*it2->second;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93927",
			"view":"608",
			"top":"5",
			"title":"python O(n^2) solution with hashtable",
			"vote":"4",
			"content":"\\n    class Solution(object):\\n        def fourSumCount(self, A, B, C, D):\\n            \"\"\"\\n            :type A: List[int]\\n            :type B: List[int]\\n            :type C: List[int]\\n            :type D: List[int]\\n            :rtype: int\\n            \"\"\"\\n            hashtable = {}\\n            for a in A:\\n                for b in B :\\n                    if a + b in hashtable :\\n                        hashtable[a+b] += 1\\n                    else :\\n                        hashtable[a+b] = 1\\n            count = 0         \\n            for c in C :\\n                for d in D :\\n                    if -c - d in hashtable :\\n                        count += hashtable[-c-d]\\n            return count"
		},
		{
			"lc_ans_id":"93940",
			"view":"1024",
			"top":"6",
			"title":"c++ O(n^2) algorithm with unordered_map",
			"vote":"4",
			"content":"The algorithm is to hash the sum of each elements in A and B, then find whether opposite number for sum of elements in C and D occurs.\\nThe time complexity is O(n^2), space complexity is O(n)\\n```\\nclass Solution {\\npublic:\\n    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\\n        int count = 0;\\n        unordered_map<int, int> mp;\\n        for (int i = 0; i < A.size(); i++) {\\n            for (int j = 0; j < B.size(); j++) {\\n                mp[A[i]+B[j]]++;\\n            }\\n        }\\n        for (int i = 0; i < C.size(); i++) {\\n            for (int j = 0; j < D.size(); j++) {\\n                if (mp.find(-(C[i] + D[j])) != mp.end()) {\\n                    count += mp[-(C[i] + D[j])];\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93973",
			"view":"1617",
			"top":"7",
			"title":"Dividing arrays into two parts. Full thinking process from naive(N^4) to effective(N^2) solution",
			"vote":"3",
			"content":"1) The naive solution is to run four loops by iterating all elements and check for (A[i] + B[j] + C[k] + d[h]) == 0. Time complexity: N^4\\n2) We can improve solution by iterating through elements of three arrays and check if the fourth array contains A[i] + B[j] + C[k] + d == 0  ---->  d = -A[i] - B[j] - C[k]. We can use HashSet to store elements of fourth array. Overall time complexity: N^3;\\n3) To improve the solution we can divide arrays into two parts. Then make calculation of sums of one part (A[i] + B[j]) and store their sum's occurences counter in a HashMap. While calculating second part arrays' sum (secondSum = C[k] + D[h]) we can check whether map contains secondSum*(-1);\\nA[i] + B[j] == - C[k] - D[h]\\nA[i] + B[j] == - (C[k]+D[h])\\n\\nThis solution can be extended for N arrays.\\n\\n```\\npublic class Solution {\\n    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {\\n        HashMap<Integer, Integer> sumCounter = getSumCounters(A,B);\\n        int fourSumCounter = 0;\\n        for (int c : C) {\\n            for (int d: D) {\\n                fourSumCounter += sumCounter.getOrDefault(c+d, 0);\\n            }\\n        }\\n        return fourSumCounter;\\n    }\\n    \\n    private HashMap<Integer, Integer> getSumCounters(int [] A, int [] B) {\\n        HashMap<Integer, Integer> sumCounter = new HashMap<>();\\n        for (int a : A) {\\n            for (int b: B) {\\n                int sum = -a-b;\\n                sumCounter.put(sum, sumCounter.getOrDefault(sum, 0) + 1);\\n            }\\n        }\\n        return sumCounter;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93962",
			"view":"305",
			"top":"8",
			"title":"Awesome beautiful java python code",
			"vote":"2",
			"content":"```\\n    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {\\n        HashMap<Integer, Integer> hashMap = new HashMap<>();\\n        for (int a : A) {\\n            for (int b : B) {\\n                hashMap.put(a + b, hashMap.getOrDefault(a + b, 0) + 1);\\n            }\\n        }\\n        int result = 0;\\n        for (int c : C) {\\n            for (int d : D) {\\n                result += hashMap.getOrDefault(-c - d, 0);\\n            }\\n        }\\n        return result;\\n    }\\n```\\npython\\n```\\n    def fourSumCount(self, A, B, C, D):\\n        AB = collections.Counter(a + b for a in A for b in B)\\n        return sum(AB[-c - d] for c in C for d in D)\\n```"
		},
		{
			"lc_ans_id":"93923",
			"view":"230",
			"top":"9",
			"title":"How to use Binary Search with \"4Sum II\"?",
			"vote":"1",
			"content":"This question has \"Binary Search\" as a tag but in the solutions proposed (in discuss) I don't see it used. How is that?\\nIs it actually possible to use binary search to solve such problem?"
		}
	],
	"id":"448",
	"title":"4Sum II",
	"content":"<p>Given four lists A, B, C, D of integer values, compute how many tuples <code>(i, j, k, l)</code> there are such that <code>A[i] + B[j] + C[k] + D[l]</code> is zero.</p>\r\n\r\n<p>To make problem a bit easier, all A, B, C, D have same length of N where 0 &le; N &le; 500. All integers are in the range of -2<sup>28</sup> to 2<sup>28</sup> - 1 and the result is guaranteed to be at most 2<sup>31</sup> - 1.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\nA = [ 1, 2]\r\nB = [-2,-1]\r\nC = [-1, 2]\r\nD = [ 0, 2]\r\n\r\n<b>Output:</b>\r\n2\r\n\r\n<b>Explanation:</b>\r\nThe two tuples are:\r\n1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0\r\n2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0\r\n</pre>\r\n</p>",
	"frequency":"259",
	"ac_num":"26538"
}