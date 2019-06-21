{
	"difficulty":"3",
	"submit_num":"1003467",
	"show_id":"4",
	"leetcode_id":"4",
	"answers":[
		{
			"lc_ans_id":"2481",
			"view":"201777",
			"top":"0",
			"title":"Share my O(log(min(m,n)) solution with explanation",
			"vote":"930",
			"content":"To solve this problem, we need to understand \"What is the use of median\". In statistics, the median is used for `dividing a set into two equal length subsets, that one subset is always greater than the other`. If we understand the use of median for dividing, we are very close to the answer.\\n\\nFirst let's cut **A** into two parts at a random position **i**:\\n    \\n          left_A             |        right_A\\n    A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]\\n\\nSince **A** has **m** elements, so there are **m+1** kinds of cutting( **i = 0 ~ m** ). And we know: **len(left\\\\_A) = i, len(right\\\\_A) = m - i** . Note: when **i = 0** , **left\\\\_A** is empty, and when **i = m** , **right\\\\_A** is empty.\\n\\nWith the same way, cut **B** into two parts at a random position **j**:\\n\\n          left_B             |        right_B\\n    B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]\\n\\nPut **left\\\\_A** and **left\\\\_B** into one set, and put **right\\\\_A** and **right\\\\_B** into another set. Let's name them **left\\\\_part** and **right\\\\_part** :\\n\\n          left_part          |        right_part\\n    A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]\\n    B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]\\n\\nIf we can ensure:\\n\\n    1) len(left_part) == len(right_part)\\n    2) max(left_part) <= min(right_part)\\n\\nthen we divide all elements in **{A, B}** into two parts with equal length, and one part is always greater than the other. Then **median = (max(left\\\\_part) + min(right\\\\_part))/2**.\\n\\nTo ensure these two conditions, we just need to ensure:\\n\\n    (1) i + j == m - i + n - j (or: m - i + n - j + 1)\\n        if n >= m, we just need to set: i = 0 ~ m, j = (m + n + 1)/2 - i\\n    (2) B[j-1] <= A[i] and A[i-1] <= B[j]\\n\\nps.1 For simplicity, I presume **A[i-1],B[j-1],A[i],B[j]** are always valid even if **i=0/i=m/j=0/j=n** . I will talk about how to deal with these edge values at last.\\n\\nps.2 Why n >= m? Because I have to make sure j is non-nagative since 0 <= i <= m and j = (m + n + 1)/2 - i. If n < m , then j may be nagative, that will lead to wrong result.\\n\\nSo, all we need to do is:\\n\\n    Searching i in [0, m], to find an object `i` that:\\n        B[j-1] <= A[i] and A[i-1] <= B[j], ( where j = (m + n + 1)/2 - i )\\n\\nAnd we can do a binary search following steps described below:\\n\\n    <1> Set imin = 0, imax = m, then start searching in [imin, imax]\\n\\n    <2> Set i = (imin + imax)/2, j = (m + n + 1)/2 - i\\n\\n    <3> Now we have len(left_part)==len(right_part). And there are only 3 situations\\n         that we may encounter:\\n        <a> B[j-1] <= A[i] and A[i-1] <= B[j]\\n            Means we have found the object `i`, so stop searching.\\n        <b> B[j-1] > A[i]\\n            Means A[i] is too small. We must `ajust` i to get `B[j-1] <= A[i]`.\\n            Can we `increase` i?\\n                Yes. Because when i is increased, j will be decreased.\\n                So B[j-1] is decreased and A[i] is increased, and `B[j-1] <= A[i]` may\\n                be satisfied.\\n            Can we `decrease` i?\\n                `No!` Because when i is decreased, j will be increased.\\n                So B[j-1] is increased and A[i] is decreased, and B[j-1] <= A[i] will\\n                be never satisfied.\\n            So we must `increase` i. That is, we must ajust the searching range to\\n            [i+1, imax]. So, set imin = i+1, and goto <2>.\\n        <c> A[i-1] > B[j]\\n            Means A[i-1] is too big. And we must `decrease` i to get `A[i-1]<=B[j]`.\\n            That is, we must ajust the searching range to [imin, i-1].\\n            So, set imax = i-1, and goto <2>.\\n\\nWhen the object **i** is found, the median is:\\n\\n    max(A[i-1], B[j-1]) (when m + n is odd)\\n    or (max(A[i-1], B[j-1]) + min(A[i], B[j]))/2 (when m + n is even)\\n\\nNow let's consider the edges values **i=0,i=m,j=0,j=n** where **A[i-1],B[j-1],A[i],B[j]** may not exist. Actually this situation is easier than you think. \\n\\nWhat we need to do is ensuring that `max(left_part) <= min(right_part)`. So, if **i** and **j** are not edges values(means **A[i-1],B[j-1],A[i],B[j]** all exist), then we must check both **B[j-1] <= A[i]** and **A[i-1] <= B[j]**. But if some of **A[i-1],B[j-1],A[i],B[j]** don't exist, then we don't need to check one(or both) of these two conditions. For example, if **i=0**, then **A[i-1]** doesn't exist, then we don't need to check **A[i-1] <= B[j]**. So, what we need to do is:\\n\\n    Searching i in [0, m], to find an object `i` that:\\n        (j == 0 or i == m or B[j-1] <= A[i]) and\\n        (i == 0 or j == n or A[i-1] <= B[j])\\n        where j = (m + n + 1)/2 - i\\n\\nAnd in a searching loop, we will encounter only three situations:\\n\\n    <a> (j == 0 or i == m or B[j-1] <= A[i]) and\\n        (i == 0 or j = n or A[i-1] <= B[j])\\n        Means i is perfect, we can stop searching.\\n\\n    <b> j > 0 and i < m and B[j - 1] > A[i]\\n        Means i is too small, we must increase it.\\n\\n    <c> i > 0 and j < n and A[i - 1] > B[j]\\n        Means i is too big, we must decrease it.\\n\\nThank @Quentin.chen , him pointed out that: `i < m ==> j > 0` and `i > 0 ==> j < n` . Because:\\n\\n    m <= n, i < m ==> j = (m+n+1)/2 - i > (m+n+1)/2 - m >= (2*m+1)/2 - m >= 0    \\n    m <= n, i > 0 ==> j = (m+n+1)/2 - i < (m+n+1)/2 <= (2*n+1)/2 <= n\\n\\nSo in situation \\\\<b\\\\> and \\\\<c\\\\>, we don't need to check whether `j > 0` and whether `j < n`.\\n\\nBelow is the accepted code:\\n\\n     def median(A, B):\\n        m, n = len(A), len(B)\\n        if m > n:\\n            A, B, m, n = B, A, n, m\\n        if n == 0:\\n            raise ValueError\\n\\n        imin, imax, half_len = 0, m, (m + n + 1) / 2\\n        while imin <= imax:\\n            i = (imin + imax) / 2\\n            j = half_len - i\\n            if i < m and B[j-1] > A[i]:\\n                # i is too small, must increase it\\n                imin = i + 1\\n            elif i > 0 and A[i-1] > B[j]:\\n                # i is too big, must decrease it\\n                imax = i - 1\\n            else:\\n                # i is perfect\\n\\n                if i == 0: max_of_left = B[j-1]\\n                elif j == 0: max_of_left = A[i-1]\\n                else: max_of_left = max(A[i-1], B[j-1])\\n\\n                if (m + n) % 2 == 1:\\n                    return max_of_left\\n\\n                if i == m: min_of_right = B[j]\\n                elif j == n: min_of_right = A[i]\\n                else: min_of_right = min(A[i], B[j])\\n\\n                return (max_of_left + min_of_right) / 2.0"
		},
		{
			"lc_ans_id":"2471",
			"view":"91281",
			"top":"1",
			"title":"Very concise O(log(min(M,N))) iterative solution with detailed explanation",
			"vote":"450",
			"content":"This problem is notoriously hard to implement due to all the corner cases. Most implementations consider odd-lengthed and even-lengthed arrays as two different cases and treat them separately. As a matter of fact, with a little mind twist. These two cases can be combined as one, leading to a very simple solution where (almost) no special treatment is needed.\\n\\nFirst, let's see the concept of 'MEDIAN' in a slightly unconventional way. That is: \\n\\n> \"**if we cut the sorted array to two halves of EQUAL LENGTHS, then\\n> median is the AVERAGE OF Max(lower_half) and Min(upper_half), i.e. the\\n> two numbers immediately next to the cut**\".\\n\\nFor example, for [2 3 5 7], we make the cut between 3 and 5:\\n\\n    [2 3 / 5 7]\\n\\nthen the median = (3+5)/2. **Note that I'll use '/' to represent a cut, and (number / number) to represent a cut made through a number in this article**.\\n\\nfor [2 3 4 5 6], we make the cut right through 4 like this:\\n\\n[2 3 (4/4) 5 7]\\n\\nSince we split 4 into two halves, we say now both the lower and upper subarray contain 4. This notion also leads to the correct answer: (4 + 4) / 2 = 4;\\n\\nFor convenience, let's use L to represent the number immediately left to the cut, and R the right counterpart. In [2 3 5 7], for instance, we have L = 3 and R = 5, respectively. \\n\\nWe observe the index of L and R have the following relationship with the length of the array N:\\n\\n    N        Index of L / R\\n    1               0 / 0\\n    2               0 / 1\\n    3               1 / 1  \\n    4               1 / 2      \\n    5               2 / 2\\n    6               2 / 3\\n    7               3 / 3\\n    8               3 / 4\\n\\nIt is not hard to conclude that index of L = (N-1)/2, and R is at N/2. Thus, the median can be represented as \\n\\n    (L + R)/2 = (A[(N-1)/2] + A[N/2])/2\\n\\n----------------\\n\\nTo get ready for the two array situation, let's add a few imaginary 'positions' (represented as #'s) in between numbers, and treat numbers as 'positions' as well. \\n\\n    [6 9 13 18]  ->   [# 6 # 9 # 13 # 18 #]    (N = 4)\\n    position index     0 1 2 3 4 5  6 7  8     (N_Position = 9)\\n\\t\\t\\t  \\n    [6 9 11 13 18]->   [# 6 # 9 # 11 # 13 # 18 #]   (N = 5)\\n    position index      0 1 2 3 4 5  6 7  8 9 10    (N_Position = 11)\\n\\nAs you can see, there are always exactly 2*N+1 'positions' regardless of length N. Therefore, the middle cut should always be made on the Nth position (0-based). Since index(L) = (N-1)/2 and index(R) = N/2 in this situation, we can infer that **index(L) = (CutPosition-1)/2, index(R) = (CutPosition)/2**. \\n\\n------------------------\\n\\nNow for the two-array case:\\n\\n    A1: [# 1 # 2 # 3 # 4 # 5 #]    (N1 = 5, N1_positions = 11)\\n    \\n    A2: [# 1 # 1 # 1 # 1 #]     (N2 = 4, N2_positions = 9)\\n\\nSimilar to the one-array problem, we need to find a cut that divides the two arrays each into two halves such that \\n\\n> \"any number in the two left halves\" <= \"any number in the two right\\n> halves\".\\n\\nWe can also make the following observations\\uff1a\\n\\n1. There are 2*N1 + 2*N2 + 2 position altogether. Therefore, there must be exactly N1 + N2 positions on each side of the cut, and 2 positions directly on the cut.\\n\\n2. Therefore, when we cut at position C2 = K in A2, then the cut position in A1 must be C1 = N1 + N2 - k. For instance, if C2 = 2, then we must have C1 = 4 + 5 - C2 = 7.\\n\\n        [# 1 # 2 # 3 # (4/4) # 5 #]    \\n    \\n        [# 1 / 1 # 1 # 1 #]   \\n\\n3. When the cuts are made, we'd have two L's and two R's. They are\\n\\n        L1 = A1[(C1-1)/2]; R1 = A1[C1/2];\\n        L2 = A2[(C2-1)/2]; R2 = A2[C2/2];\\n\\nIn the above example, \\n\\n        L1 = A1[(7-1)/2] = A1[3] = 4; R1 = A1[7/2] = A1[3] = 4;\\n        L2 = A2[(2-1)/2] = A2[0] = 1; R2 = A1[2/2] = A1[1] = 1;\\n\\n\\nNow how do we decide if this cut is the cut we want? Because L1, L2 are the greatest numbers on the left halves and R1, R2 are the smallest numbers on the right, we only need\\n\\n    L1 <= R1 && L1 <= R2 && L2 <= R1 && L2 <= R2\\n\\nto make sure that any number in lower halves <= any number in upper halves. As a matter of fact, since \\nL1 <= R1 and L2 <= R2 are naturally guaranteed because A1 and A2 are sorted, we only need to make sure:\\n\\nL1 <= R2 and L2 <= R1.\\n\\nNow we can use simple binary search to find out the result.\\n\\n    If we have L1 > R1, it means there are too many large numbers on the left half of A1, then we must move C1 to the left (i.e. move C2 to the right); \\n    If L2 > R1, then there are too many large numbers on the left half of A2, and we must move C2 to the left.\\n    Otherwise, this cut is the right one. \\n    After we find the cut, the medium can be computed as (max(L1, L2) + min(R1, R2)) / 2;\\n\\nTwo side notes: \\n\\nA. Since C1 and C2 can be mutually determined from each other, we can just move one of them first, then calculate the other accordingly. However, it is much more practical to move C2 (the one on the shorter array) first. The reason is that on the shorter array, all positions are possible cut locations for median, but on the longer array, the positions that are too far left or right are simply impossible for a legitimate cut. For instance, [1], [2 3 4 5 6 7 8]. Clearly the cut between 2 and 3 is impossible, because the shorter array does not have that many elements to balance out the [3 4 5 6 7 8] part if you make the cut this way. Therefore, for the longer array to be used as the basis for the first cut, a range check must be performed. It would be just easier to do it on the shorter array, which requires no checks whatsoever. Also, moving only on the shorter array gives a run-time complexity of O(log(min(N1, N2))) (edited as suggested by @baselRus)\\n\\nB. The only edge case is when a cut falls on the 0th(first) or the 2*Nth(last) position. For instance, if C2 = 2*N2, then R2 = A2[2*N2/2] = A2[N2], which exceeds the boundary of the array. To solve this problem, we can imagine that both A1 and A2 actually have two extra elements, INT_MAX at A[-1] and INT_MAX at A[N]. These additions don't change the result, but make the implementation easier: If any L falls out of the left boundary of the array, then L = INT_MIN, and if any R falls out of the right boundary, then R = INT_MAX.\\n\\n-----------------\\n\\nI know that was not very easy to understand, but all the above reasoning eventually boils down to the following concise code:\\n\\n     double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\\n        int N1 = nums1.size();\\n        int N2 = nums2.size();\\n        if (N1 < N2) return findMedianSortedArrays(nums2, nums1);\\t// Make sure A2 is the shorter one.\\n        \\n        int lo = 0, hi = N2 * 2;\\n        while (lo <= hi) {\\n            int mid2 = (lo + hi) / 2;   // Try Cut 2 \\n            int mid1 = N1 + N2 - mid2;  // Calculate Cut 1 accordingly\\n            \\n            double L1 = (mid1 == 0) ? INT_MIN : nums1[(mid1-1)/2];\\t// Get L1, R1, L2, R2 respectively\\n            double L2 = (mid2 == 0) ? INT_MIN : nums2[(mid2-1)/2];\\n            double R1 = (mid1 == N1 * 2) ? INT_MAX : nums1[(mid1)/2];\\n            double R2 = (mid2 == N2 * 2) ? INT_MAX : nums2[(mid2)/2];\\n            \\n            if (L1 > R2) lo = mid2 + 1;\\t\\t// A1's lower half is too big; need to move C1 left (C2 right)\\n            else if (L2 > R1) hi = mid2 - 1;\\t// A2's lower half too big; need to move C2 left.\\n            else return (max(L1,L2) + min(R1, R2)) / 2;\\t// Otherwise, that's the right cut.\\n        }\\n        return -1;\\n    } \\nIf you have any suggestions to make the logic and implementation even more cleaner. Please do let me know!"
		},
		{
			"lc_ans_id":"2499",
			"view":"59526",
			"top":"2",
			"title":"Share my simple O(log(m+n)) solution for your reference",
			"vote":"160",
			"content":"Binary search. Call 2 times getkth and k is about half of (m + n). Every time call getkth can reduce the scale k to its half. So the time complexity is log(m + n).\\n\\n    class Solution {\\n    public:\\n        int getkth(int s[], int m, int l[], int n, int k){\\n            // let m <= n\\n            if (m > n) \\n                return getkth(l, n, s, m, k);\\n            if (m == 0)\\n                return l[k - 1];\\n            if (k == 1)\\n                return min(s[0], l[0]);\\n    \\n            int i = min(m, k / 2), j = min(n, k / 2);\\n            if (s[i - 1] > l[j - 1])\\n                return getkth(s, m, l + j, n - j, k - j);\\n            else\\n                return getkth(s + i, m - i, l, n, k - i);\\n            return 0;\\n        }\\n        \\n        double findMedianSortedArrays(int A[], int m, int B[], int n) {\\n            int l = (m + n + 1) >> 1;\\n            int r = (m + n + 2) >> 1;\\n            return (getkth(A, m ,B, n, l) + getkth(A, m, B, n, r)) / 2.0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"2496",
			"view":"45208",
			"top":"3",
			"title":"Concise JAVA solution based on Binary Search",
			"vote":"127",
			"content":"**Explanation**\\n\\nThe key point of this problem is to ignore half part of A and B each step recursively by comparing the median of remaining A and B:\\n\\n\\n\\n```\\nif (aMid < bMid) Keep [aRight + bLeft]    \\nelse Keep [bRight + aLeft]\\n```\\n\\nAs the following: **time=O(log(m + n))** \\n\\n\\n    public double findMedianSortedArrays(int[] A, int[] B) {\\n    \\t    int m = A.length, n = B.length;\\n    \\t    int l = (m + n + 1) / 2;\\n    \\t    int r = (m + n + 2) / 2;\\n    \\t    return (getkth(A, 0, B, 0, l) + getkth(A, 0, B, 0, r)) / 2.0;\\n    \\t}\\n    \\n    public double getkth(int[] A, int aStart, int[] B, int bStart, int k) {\\n    \\tif (aStart > A.length - 1) return B[bStart + k - 1];            \\n    \\tif (bStart > B.length - 1) return A[aStart + k - 1];                \\n    \\tif (k == 1) return Math.min(A[aStart], B[bStart]);\\n    \\t\\n    \\tint aMid = Integer.MAX_VALUE, bMid = Integer.MAX_VALUE;\\n    \\tif (aStart + k/2 - 1 < A.length) aMid = A[aStart + k/2 - 1]; \\n    \\tif (bStart + k/2 - 1 < B.length) bMid = B[bStart + k/2 - 1];        \\n    \\t\\n    \\tif (aMid < bMid) \\n    \\t    return getkth(A, aStart + k/2, B, bStart,       k - k/2);// Check: aRight + bLeft \\n    \\telse \\n    \\t    return getkth(A, aStart,       B, bStart + k/2, k - k/2);// Check: bRight + aLeft\\n    }"
		},
		{
			"lc_ans_id":"2547",
			"view":"26433",
			"top":"4",
			"title":"Share my iterative solution with O(log(min(n, m)))",
			"vote":"113",
			"content":"This is my iterative solution using binary search. The main idea is to find the approximate location of the median and compare the elements around it to get the final result.\\n\\n1. do binary search. suppose the shorter list is A with length n. **the runtime is O(log(n)) which means no matter how large B array is, it only depends on the size of A**. It makes sense because if A has only one element while B has 100 elements, the median must be one of A[0],  B[49], and B[50] without check everything else. If A[0] <= B[49], B[49] is the answer; if B[49] < A[0] <= B[50], A[0] is the answer; else, B[50] is the answer.\\n\\n2. After binary search, we get the approximate location of median. Now we just need to compare at most 4 elements to find the answer. This step is O(1).\\n\\n3. the same solution can be applied to find kth element of 2 sorted arrays.\\n\\nHere is the code:\\n\\n        public double findMedianSortedArrays(int A[], int B[]) {\\n        int n = A.length;\\n        int m = B.length;\\n        // the following call is to make sure len(A) <= len(B).\\n        // yes, it calls itself, but at most once, shouldn't be\\n        // consider a recursive solution\\n        if (n > m)\\n            return findMedianSortedArrays(B, A);\\n\\n        // now, do binary search\\n        int k = (n + m - 1) / 2;\\n        int l = 0, r = Math.min(k, n); // r is n, NOT n-1, this is important!!\\n        while (l < r) {\\n            int midA = (l + r) / 2;\\n            int midB = k - midA;\\n            if (A[midA] < B[midB])\\n                l = midA + 1;\\n            else\\n                r = midA;\\n        }\\n        \\n        // after binary search, we almost get the median because it must be between\\n        // these 4 numbers: A[l-1], A[l], B[k-l], and B[k-l+1] \\n\\n        // if (n+m) is odd, the median is the larger one between A[l-1] and B[k-l].\\n        // and there are some corner cases we need to take care of.\\n        int a = Math.max(l > 0 ? A[l - 1] : Integer.MIN_VALUE, k - l >= 0 ? B[k - l] : Integer.MIN_VALUE);\\n        if (((n + m) & 1) == 1)\\n            return (double) a;\\n\\n        // if (n+m) is even, the median can be calculated by \\n        //      median = (max(A[l-1], B[k-l]) + min(A[l], B[k-l+1]) / 2.0\\n        // also, there are some corner cases to take care of.\\n        int b = Math.min(l < n ? A[l] : Integer.MAX_VALUE, k - l + 1 < m ? B[k - l + 1] : Integer.MAX_VALUE);\\n        return (a + b) / 2.0;\\n    }\\n\\n\\nI'm lazy to type. But I found a very good pdf to explain my algorithm: http://ocw.alfaisal.edu/NR/rdonlyres/Electrical-Engineering-and-Computer-Science/6-046JFall-2005/30C68118-E436-4FE3-8C79-6BAFBB07D935/0/ps9sol.pdf\\n\\nBTW: Thanks to  xdxiaoxin. I've removed the check \"midB > k\"."
		},
		{
			"lc_ans_id":"2652",
			"view":"14121",
			"top":"5",
			"title":"Share one divide and conquer O(log(m+n)) method with clear description",
			"vote":"74",
			"content":"    // using divide and conquer idea, each time find the mid of both arrays\\n    \\n    double findMedianSortedArrays(int A[], int m, int B[], int n) {\\n            /* A[0, 1, 2, ..., n-1, n] */\\n            /* A[0, 1, 2, ..., m-1, m] */\\n            int k = (m + n + 1) / 2;\\n            double v = (double)FindKth(A, 0, m - 1, B, 0, n - 1, k);\\n            \\n            if ((m+n) % 2 == 0) {\\n                int k2 = k+1;\\n                double v2 = (double)FindKth(A, 0, m - 1, B, 0, n - 1, k2);\\n                v = (v + v2) / 2;\\n            }\\n            \\n            return v;\\n        }\\n        \\n        // find the kth element int the two sorted arrays\\n        // let us say: A[aMid] <= B[bMid], x: mid len of a, y: mid len of b, then wen can know\\n        // \\n        // (1) there will be at least (x + 1 + y) elements before bMid\\n        // (2) there will be at least (m - x - 1 + n - y) = m + n - (x + y +1) elements after aMid\\n        // therefore\\n        // if k <= x + y + 1, find the kth element in a and b, but unconsidering bMid and its suffix\\n        // if k > x + y + 1, find the k - (x + 1) th element in a and b, but unconsidering aMid and its prefix\\n        int FindKth(int A[], int aL, int aR, int B[], int bL, int bR, int k) {\\n            if (aL > aR) return B[bL + k - 1];\\n            if (bL > bR) return A[aL + k - 1];\\n            \\n            int aMid = (aL + aR) / 2;\\n            int bMid = (bL + bR) / 2;\\n            \\n            if (A[aMid] <= B[bMid]) {\\n                if (k <= (aMid - aL) + (bMid - bL) + 1) \\n                    return FindKth(A, aL, aR, B, bL, bMid - 1, k);\\n                else\\n                    return FindKth(A, aMid + 1, aR, B, bL, bR, k - (aMid - aL) - 1);\\n            }\\n            else { // A[aMid] > B[bMid]\\n                if (k <= (aMid - aL) + (bMid - bL) + 1) \\n                    return FindKth(A, aL, aMid - 1, B, bL, bR, k);\\n                else\\n                    return FindKth(A, aL, aR, B, bMid + 1, bR, k - (bMid - bL) - 1);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"2588",
			"view":"10195",
			"top":"6",
			"title":"O(lg(m+n)) c++ solution using kth smallest number",
			"vote":"62",
			"content":"    class Solution {\\n    public:\\n        int kth(int a[], int m, int b[], int n, int k) {\\n            if (m < n) return kth(b,n,a,m,k);\\n            if (n==0) return a[k-1];\\n            if (k==1) return min(a[0],b[0]);\\n    \\n            int j = min(n,k/2);\\n            int i = k-j;\\n            if (a[i-1] > b[j-1]) return kth(a,i,b+j,n-j,k-j);\\n            return kth(a+i,m-i,b,j,k-i);\\n        }\\n    \\n        double findMedianSortedArrays(int a[], int m, int b[], int n) {\\n            int k = (m+n)/2;\\n            int m1 = kth(a,m,b,n,k+1);\\n            if ((m+n)%2==0) {\\n                int m2 = kth(a,m,b,n,k);\\n                return ((double)m1+m2)/2.0;\\n            }\\n            return m1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"2511",
			"view":"12697",
			"top":"7",
			"title":"Intuitive Python O(log (m+n)) solution, by kth smallest in the two sorted arrays, 252ms",
			"vote":"52",
			"content":"The idea is in the comment:\\n\\n     \\n    def findMedianSortedArrays(self, A, B):\\n        l = len(A) + len(B)\\n        if l % 2 == 1:\\n            return self.kth(A, B, l // 2)\\n        else:\\n            return (self.kth(A, B, l // 2) + self.kth(A, B, l // 2 - 1)) / 2.   \\n        \\n    def kth(self, a, b, k):\\n        if not a:\\n            return b[k]\\n        if not b:\\n            return a[k]\\n        ia, ib = len(a) // 2 , len(b) // 2\\n        ma, mb = a[ia], b[ib]\\n        \\n        # when k is bigger than the sum of a and b's median indices \\n        if ia + ib < k:\\n            # if a's median is bigger than b's, b's first half doesn't include k\\n            if ma > mb:\\n                return self.kth(a, b[ib + 1:], k - ib - 1)\\n            else:\\n                return self.kth(a[ia + 1:], b, k - ia - 1)\\n        # when k is smaller than the sum of a and b's indices\\n        else:\\n            # if a's median is bigger than b's, a's second half doesn't include k\\n            if ma > mb:\\n                return self.kth(a[:ia], b, k)\\n            else:\\n                return self.kth(a, b[:ib], k)"
		},
		{
			"lc_ans_id":"2567",
			"view":"7373",
			"top":"8",
			"title":"Python O(log(min(m,n)) solution",
			"vote":"27",
			"content":"It's guaranteed to be O(log(min(m,n)) because every time the findKth function cuts the shorter array by half of its size.\\n\\n    class Solution:\\n        # @return a float\\n        def findMedianSortedArrays(self, A, B):\\n            l=len(A)+len(B)\\n            return self.findKth(A,B,l//2) if l%2==1 else (self.findKth(A,B,l//2-1)+self.findKth(A,B,l//2))/2.0\\n                \\n                \\n        def findKth(self,A,B,k):\\n            if len(A)>len(B):\\n                A,B=B,A\\n            if not A:\\n                return B[k]\\n            if k==len(A)+len(B)-1:\\n                return max(A[-1],B[-1])\\n            i=len(A)//2\\n            j=k-i\\n            if A[i]>B[j]:\\n                #Here I assume it is O(1) to get A[:i] and B[j:]. In python, it's not but in cpp it is.\\n                return self.findKth(A[:i],B[j:],i)\\n            else:\\n                return self.findKth(A[i:],B[:j],j)"
		},
		{
			"lc_ans_id":"2616",
			"view":"5150",
			"top":"9",
			"title":"Another simple and neat solution, binary search, non-recursion, 3 rows of core code, O(log(min(m, n)))",
			"vote":"25",
			"content":"If you solve the k-th minmum value of two sorted arrays, you solve this problem.This is a classical problem of \"Divide and conquer\".<br/>\\nHere is another more simple and more neat solution.<br/>\\nCosider chosing first x numbers from A and k - x numbers from B.if these k numbers are the k minmum numbers of A and B, x must satisfies that A[x + 1] >= B[k - x] and B[k - x + 1] >= A[x] (for better explanation index is base-1). <br/>\\n**So this x is what we want.**<br/>\\nObviously, if A[x + 1] < B[k - x + 1] then x must be smaller, else if B[k - x] < A[x] then x must be greater.  **A nice two-value definition for binary search :)**<br/>\\nTo simplify edge cases,  we cosider each array indefinite, with value of INTMIN when index < 1 and INTMAX when index > n.\\n\\nHere is the solution of c++ version:\\n\\n    typedef vector<int> vi;\\n    const int inf = 0x7fffffff, ninf = 0x80000000;\\n    class Solution {\\n        int kth_min(vi& a, vi& b, int k, int n, int m){\\n            #define A(i) (i < 1 ? ninf : (i > n ? inf : a[i - 1]))\\n            #define B(i) (i < 1 ? ninf : (i > m ? inf : b[i - 1]))\\n            int l = 0, r = n + 1, x;\\n            while(l <= r){\\n                x = (l + r) >> 1;\\n                if(A(x) > B(k - x + 1)) r = x - 1;\\n                else if(B(k - x) > A(x + 1)) l = x + 1;\\n                else return max(A(x), B(k - x));\\n            }\\n            return 0;   //never execute , just to hide the warning :)\\n            #undef A\\n            #undef B\\n        }\\n    public:\\n        double findMedianSortedArrays(vector<int>& a, vector<int>& b) {\\n            int n = a.size(), m = b.size();\\n            if(n > m) return findMedianSortedArrays(b, a); //make sure that a.size() <= b.size()\\n            if((m + n) & 1) return kth_min(a, b, (m + n + 1) >> 1, n, m);\\n            return (0.0 + kth_min(a, b, (m + n + 1) >> 1, n, m) + kth_min(a, b, ((m + n) >> 1) + 1, n, m)) * 0.5;\\n        }\\n    };"
		}
	],
	"id":"4",
	"title":"Median of Two Sorted Arrays",
	"content":"<p>There are two sorted arrays <b>nums1</b> and <b>nums2</b> of size m and n respectively.</p>\r\n\r\n<p>Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nnums1 = [1, 3]\r\nnums2 = [2]\r\n\r\nThe median is 2.0\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\nnums1 = [1, 2]\r\nnums2 = [3, 4]\r\n\r\nThe median is (2 + 3)/2 = 2.5\r\n</pre>\r\n</p>",
	"frequency":"624",
	"ac_num":"227325"
}