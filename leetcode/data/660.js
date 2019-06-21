{
	"difficulty":"3",
	"submit_num":"26924",
	"show_id":"683",
	"leetcode_id":"683",
	"answers":[
		{
			"lc_ans_id":"107931",
			"view":"9171",
			"top":"0",
			"title":"[Java/C++] Simple O(n) solution",
			"vote":"57",
			"content":"It seems that this question has some mistakes. I think there are two places that might  lead to misunderstandings: (please feel free to tell me if I'm incorrect)\\n1. ```flowers[i] = x```  should mean that the unique flower that blooms at day ```i+1``` (not ```i```) will be at position ```x```.\\n2. If you can get multiple possible results, then you need to return the minimum one.\\n\\nThe idea is to use an array ```days[]``` to record each position's flower's blooming day. That means  ```days[i] ``` is the blooming day of the flower in position ```i+1```. We just need to find a subarray ```days[left, left+1,..., left+k-1, right]``` which satisfies: for any ```i = left+1,..., left+k-1```,  we can have ```days[left] < days[i] &&  days[right] < days[i]```. Then, the result is ```max(days[left], days[right])```.\\n\\nJava version:\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n        int[] days =  new int[flowers.length];\\n        for(int i=0; i<flowers.length; i++)days[flowers[i] - 1] = i + 1;\\n        int left = 0, right = k + 1, res = Integer.MAX_VALUE;\\n        for(int i = 0; right < days.length; i++){\\n            if(days[i] < days[left] || days[i] <= days[right]){\\n                if(i == right)res = Math.min(res, Math.max(days[left], days[right]));   //we get a valid subarray\\n                left = i; \\n                right = k + 1 + i;\\n            }\\n        }\\n        return (res == Integer.MAX_VALUE)?-1:res;\\n    }\\n```\\n\\nC++ version:\\n```\\nint kEmptySlots(vector<int>& flowers, int k) {\\n        vector<int> days(flowers.size());\\n        for(int i=0; i<flowers.size();i++)days[flowers[i] - 1] = i + 1;\\n        int left = 0, right = k + 1, res = INT_MAX;\\n        for(int i = 0; right < days.size(); i++){\\n            if(days[i] < days[left] || days[i] <= days[right]){   \\n                if(i == right)res = min(res, max(days[left], days[right]));    //we get a valid subarray\\n                left = i, right = k + 1 + i;\\n            }\\n        }\\n        return (res == INT_MAX)?-1:res;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"107942",
			"view":"4127",
			"top":"1",
			"title":"Java Accepted Solution",
			"vote":"19",
			"content":"```\\npublic int kEmptySlots(int[] flowers, int k) {\\n\\tTreeSet<Integer> treeSet = new TreeSet<>();\\n\\tfor (int i = 0; i < flowers.length; i++) {\\n\\t\\tint current = flowers[i];\\n\\t\\tInteger next = treeSet.higher(current);\\n\\t\\tif (next != null && next - current == k + 1) {\\n\\t\\t\\treturn i + 1;\\n\\t\\t}\\n\\t\\tInteger pre = treeSet.lower(current);\\n\\t\\tif (pre != null && current - pre == k + 1) {\\n\\t\\t\\treturn i + 1;\\n\\t\\t}\\n\\t\\ttreeSet.add(current);\\n\\t}\\n\\treturn -1;\\n}\\n```"
		},
		{
			"lc_ans_id":"107960",
			"view":"1848",
			"top":"2",
			"title":"C++, ordered set, Easy solution",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    int kEmptySlots(vector<int>& flowers, int k) {\\n        set<int> bloom;\\n        for (int i = 0; i < flowers.size(); i++) {\\n            int p = flowers[i];\\n            auto it = bloom.insert(p).first;\\n            if (it != bloom.begin()) {\\n                if (p-*(--it) == k+1) return i+1;\\n                it++;\\n            }\\n            if (++it != bloom.end() && *it-p == k+1) return i+1; \\n        }\\n        return -1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107978",
			"view":"654",
			"top":"3",
			"title":"Python O(nlog(n)) solution using binary index tree",
			"vote":"7",
			"content":"```\\ndef kEmptySlots(self, flowers, k):\\n        \"\"\"\\n        :type flowers: List[int]\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        tree = [0]*(len(flowers)+1)\\n        maxVal = len(flowers)\\n        def update(idx,val):\\n            while idx <= maxVal:\\n                tree[idx] += val\\n                idx += (idx & -idx)\\n        def read(idx):\\n            sum = 0\\n            while idx > 0:\\n                sum += tree[idx]\\n                idx -= (idx&-idx)\\n            return sum\\n        d = dict()\\n        for i,v in enumerate(flowers):\\n            update(v,1)\\n            if v - k - 1 in d:\\n                if read(v)-read(v-k-1) == 1:\\n                    return i+1\\n            if v + k + 1 in d:\\n                if read(v+k+1) - read(v) == 1:\\n                    return i+1\\n            d[v] = True\\n        return -1\\n        \\n```"
		},
		{
			"lc_ans_id":"107977",
			"view":"2061",
			"top":"4",
			"title":"Simple simulation",
			"vote":"7",
			"content":"    def kEmptySlots(self, flowers, k):\\n        blooming = []\\n        for day, flower in enumerate(flowers, 1):\\n            i = bisect.bisect(blooming, flower)\\n            for neighbor in blooming[i-(i>0):i+1]:\\n                if abs(flower - neighbor) - 1 == k:\\n                    return day\\n            blooming.insert(i, flower)\\n        return -1\\n\\nKeep track of the already blooming flowers with a sorted list. When adding a flower, check how far away its already blooming neighbors are."
		},
		{
			"lc_ans_id":"107981",
			"view":"2017",
			"top":"5",
			"title":"Can someone explain this test case?",
			"vote":"7",
			"content":"EDIT: Solved; I just didn't read the question correctly. See the comments below for the correct understanding.\\n\\n[6,5,8,9,7,1,10,2,3,4]\\n2\\n\\nExpected output is 8, but why isn't it 7?\\n\\nOn the 7th day the flowers that have bloomed would look like this:\\n6, 5, 8, 9, 7, 1,10, 2, 3, 4\\nY, Y, N,N, Y, Y, N, Y, Y, Y\\n\\nThere are 2 flowers between the 7th flower and the 5th flower and they both haven't bloomed. 5 and 7 have both bloomed. Doesn't this satisfy the condition? Why is the answer not 7?"
		},
		{
			"lc_ans_id":"107980",
			"view":"340",
			"top":"6",
			"title":"Bad Grammar",
			"vote":"5",
			"content":"Please grammar check the questions prior to the contest. English is my second language so poor grammar makes it incredibly difficult, if not impossible, for me to understand the question. Thank you!"
		},
		{
			"lc_ans_id":"107948",
			"view":"138",
			"top":"7",
			"title":"Iterate over time vs. iterate over position",
			"vote":"3",
			"content":"---\\nThere are a bunch of solutions for this problem, which in general fall into two categories: process the data **day by day** or process the data **slot by slot**. These are actually the two perspectives for solving this type of problems. The former is equivalent to iterating over time while the latter equivalent to iterating over position (the `(time, position)` combination can be replaced by other duos, such as `(w, h)` in [lc354](https://leetcode.com/problems/russian-doll-envelopes/description/) ,  or `(t, d)` in [lc630](https://leetcode.com/problems/course-schedule-iii/description/)).\\n\\nSince the input array is given in terms of time (i.e., data are arranged in ascending days), it's most natural to go with the first perspective, so its solutions will be explained first. Then we will take a different view of the problem and see how we can obtain better solutions by switching to the second perspective.\\n\\n---\\n**`I -- Iterate over time`**\\n\\nFor notational purpose, let's denote the input array as `flowers` with length of `n`. As shown in the problem description, `flowers[i]` stands for the position of the flower that will bloom in the `(i + 1)`-th day. Now given an integer `k`, we are required to output the **first** day such that there exists two flowers in the status of blooming, and the number of flowers between them is `k` and these flowers are not blooming.\\n\\n**Side notes**: \\n1. The array index `i` starts from `0` while the count of the day starts from `1`, so we have the `(i + 1)`-th day notation.\\n\\n2. Though not specified explicitly in the problem description, if there are multiple days that satisfy the above condition, we are expected to return the first such day.\\n\\nPer our definition above, for this perspective, the `flowers` array will be scanned linearly from left to right, corresponding to iterating over time. Assume we are currently on the `(i + 1)`-th day. Let `xc = flowers[i]`, `xl = xc - (k + 1)`, `xr = xc + (k + 1)`, it's straightforward to show that if any of the following two statements is true, the current day will satisfy the aforementioned condition (and vice versa):\\n\\n1. `xl` is a valid slot; the flower at `xl` is blooming; all flowers between `xl` and `xc` are not blooming.\\n\\n2. `xr` is a valid slot; the flower at `xr` is blooming; all flowers between `xc` and `xr` are not blooming.\\n\\nTake statement `1` as an example (analyses of statement `2` are similar). Checking whether `xl` is a valid slot and whether the flower at `xl` is blooming is easy. Since if a flower is in blooming status, it must have been visited before the current day. We may maintain a collection of the positions of visited flowers and see if `xl` belongs to the collection. The tricky part is how to tell whether those flowers between `xl` and `xc` are blooming or not.\\n\\nThe naive way would be testing these flowers one by one, which will yield at best the `O(nk)` solution. This, to no surprise, will be met with `TLE`. Therefore we have to come up with a relatively faster way to do the range testing. Fortunately there is one observation to our advantage: the order of the positions of visited flowers in the collection does not matter so we are free to arrange them in a way that range testing can be done easily. And a naive try would be sorting, which turns out to be working pretty nicely.\\n\\nSo assume the collection is sorted in ascending order according to the positions of the visited flowers. We have multiple ways to check if any flower between `xl` and `xc` is blooming. For example, we can find the first blooming flower to the left of `xc` and check if it is the same as `xl`; or we can count the total numbers of flowers in blooming status whose position is no more than `xl` and no more than `xc`, respectively, and see if the former is equal to the latter minus one, and so forth. All these can be done in `O(logn)` time, a big improvement from the naive linear scan method.\\n\\nOne more point worth noting is that the collection is expanding as more and more flowers are visited (i.e., [the searching space is dynamic](https://discuss.leetcode.com/topic/79227/general-principles-behind-problems-similar-to-reverse-pairs)). So we have to strike a balance between searching and insertion, which prompts use of data structures like balanced binary search tree (`BST`) or binary indexed tree (`BIT`). Here are the two corresponding solutions, both of which run at `O(nlogn)` time with `O(n)` space.\\n\\n**1. `BST`-based solution**\\n\\nFor this problem, we don't have to design our own balanced `BST`. Instead we can take advantage of the built-in `TreeSet` of Java (or equivalent type in other languages), thanks to the fact that there are no duplicates of the positions in the collection. The range testing can be done using the first method I mentioned above: find the first blooming flower to the left of `xc` and check if it is the same as `xl`. Here is the Java program:\\n\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n    TreeSet<Integer> set = new TreeSet<>();\\n        \\n    for (int i = 0; i < flowers.length; i++) {\\n        int xc = flowers[i], xl = xc - (k + 1), xr = xc + (k + 1);\\n            \\n        Integer l = set.lower(xc);\\n        if (l != null && l == xl) return i + 1;\\n        \\n        Integer r = set.higher(xc);\\n        if (r != null && r == xr) return i + 1;\\n        \\n        set.add(xc);\\n    }\\n    \\n    return -1;\\n}\\n```\\n\\n**2. `BIT`-based solution**\\n\\nHere we need two arrays: one to keep track of visited flowers, the other to serve as the `BIT` so we can count the total numbers of flowers in blooming status whose position is no more than `xl`, `xc` and `xr`, respectively. Here is the Java program:\\n\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n    int n = flowers.length;\\n    boolean[] visited = new boolean[n + 1];\\n    int[] bit = new int[n + 1];\\n    \\n    for (int i = 0; i < n; i++) {\\n        int xc = flowers[i], xl = xc - (k + 1), xr = xc + (k + 1);\\n            \\n        insert(bit, xc); \\n        visited[xc] = true;\\n        \\n        int xc_cnt = search(bit, xc), xl_cnt = xc_cnt - 1, xr_cnt = xc_cnt + 1;\\n        \\n        if (xl > 0 && visited[xl] && search(bit, xl) == xl_cnt) return i + 1;\\n        if (xr <= n && visited[xr] && search(bit, xr) == xr_cnt) return i + 1;\\n    }\\n        \\n    return -1;\\n}\\n    \\nprivate int search(int[] bit, int i) {\\n    int sum = 0;\\n    for (; i > 0; i -= i & -i) sum += bit[i];\\n    return sum;\\n}\\n    \\nprivate void insert(int[] bit, int i) {\\n    for (; i < bit.length; i += i & -i) bit[i] += 1;\\n}\\n```\\n\\n---\\nFinal remarks for this perspective: it is relatively easy to come up with `O(nlogn)` solutions, if you have experience with `BST` and `BIT` before,  though [`O(n)`solution](https://discuss.leetcode.com/topic/104760/bucket-sort-time-o-n-space-o-n) is possible. Next we will shift our focus and take the other perspective to see if we can further improve the time performance here.\\n\\n---\\n\\n**`II -- Iterate over position`**\\n\\nFor this perspective, we need to first transform our input array `flowers` into another array `days` so that `days[i]` represents the day on which the flower at position `i + 1` will bloom (note again index `i` starts from `0`). Now given an integer `k`, we are required to output the **first** day such that there exists two flowers in the status of blooming, and the number of flowers between them is `k` and these flowers are not blooming.\\n\\nWhat is the difference between this perspective and the previous one? The answer is: all the candidate ranges of position of the flowers are readily known and are arranged in ascending order. Let `[j, i]` represent flowers from position `j + 1` to position `i + 1` (both inclusive). Then `[j, i]` is a candidate range if `j = i - (k + 1)`. This is because if we can determine that all flowers from positions `j + 2` to `i` will bloom after both flowers at position `j + 1` and position `i + 1`, let `d = max(days[i], days[j])`,  then `d` will be a day that satisfies the aforementioned condition (though may not be the first such day) and thus qualifies as a candidate day for the final answer. We just need to choose the smallest one from all these candidate days.\\n\\nSo how do we check if all flowers from positions `j + 2` to `i` will bloom after both flowers at position `j + 1` and `i + 1`? The solution is simple: of all the flowers from positions `j + 2` to `i`, find the one that will bloom first and denote  the day on which it blooms as `d_min`, then compare `d_min` with `d`. If `d_min > d`,  then `d` is a valid candidate day as specified above; otherwise it is not. Again, we will have multiple ways to implement this idea.\\n\\n**1. `PriorityQueue`-based solution**\\n\\nA straightforward way to keep track of minimum blooming day of the flowers from positions `j + 2` to `i` would be using a priority queue. Also since the positions are changing as the candidate ranges are shifting, the priority queue should store the positions of the flowers instead of blooming days so that we can get rid of invalid positions easily. Here is the Java program, which runs at `O(nlogn)` time with `O(n)` space:\\n\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n    int n = flowers.length, res = n + 1;\\n    int[] days = new int[n];\\n        \\n    for (int i = 0; i < n; i++) {\\n        days[flowers[i] - 1] = i + 1;\\n    }\\n    \\n    PriorityQueue<Integer> pq = new PriorityQueue<>(new Comparator<Integer>() {\\n        public int compare(Integer i, Integer j) {\\n            return Integer.compare(days[i], days[j]);\\n        }\\n    });\\n        \\n    for (int i = 0, j = i - (k + 1); i < n; i++, j++) {\\n        while (!pq.isEmpty() && pq.peek() <= j) pq.poll();\\n            \\n        if (j >= 0 && (pq.isEmpty() || days[pq.peek()] > Math.max(days[i], days[j]))) {\\n            res = Math.min(res, Math.max(days[i], days[j]));\\n        }\\n            \\n        pq.offer(i);\\n    }\\n        \\n    return (res > n ? -1 : res);\\n}\\n```\\n\\n**2. `Deque`-based solution**\\n\\nIt turned out that the blooming days of the flowers within the candidate range can be maintained in descending order using a double-ended queue (`deque`), The key here is to get rid of positions with blooming days larger than that of the current position before adding it to the `deque` from the left (this is because as long as the current position is in the `deque`, the position with minimum blooming day cannot be these removed positions). Each position will be pushed into and popped out from the `deque` once, so the overall time complexity will be `O(n)`. Here is the Java program, where I used an array to serve as the `deque` with `l` and `r` as its left and right boundaries (the built-in `Deque` seems to be slower than this home-made version):\\n\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n    int n = flowers.length, l = n, r = n - 1, res = n + 1;\\n    int[] days = new int[n];\\n    int[] deque = new int[n];\\n        \\n    for (int i = 0; i < n; i++) {\\n        days[flowers[i] - 1] = i + 1;\\n    }\\n        \\n    for (int i = 0, j = i - (k + 1); i < n; i++, j++) {\\n        while (l <= r && deque[r] <= j) r--;\\n            \\n        if (j >= 0 && (r < l || days[deque[r]] > Math.max(days[i], days[j]))) {\\n            res = Math.min(res, Math.max(days[i], days[j]));\\n        }\\n            \\n        while (l <= r && days[i] <= days[deque[l]]) l++; // Get rid of larger days before adding\\n            \\n        deque[--l] = i;\\n    }\\n        \\n    return (res > n ? -1 : res);\\n}\\n```\\n\\n**3. `No-queue` solution**\\n\\nTo see how we can get this `no-queue` solution (more info [here](https://discuss.leetcode.com/topic/104771/java-c-simple-o-n-solution)), let's take a look back at the two `queue`-based solutions above. The downside of those solutions is that we have to check all candidate ranges one by one, which turns out to be unnecessary. For example, if `[j, i]` is the current candidate range, `min` is the position corresponding to the minimum blooming day `d_min` in the queue such that `d_min < days[j]`, then all candidate ranges `[j', i']` with `j < j' < min` can be skipped, because the blooming day of the left boundary `days[j']` will always be greater than `d_min` and thus cannot be valid ranges.\\n\\nSo instead of testing all the candidate ranges one by one, we set up a target range and try to validate it by doing a linear scan, then update the target range according to the validation result. In the following Java program, the target range is denoted as `[l, r]`, with `l` and `r` as its left and right boundaries. `di`, `dl` and `dr` are the blooming days for position `i + 1`, 'l + 1' and `r + 1`, respectively. To validate the target range, we need to compare `di` with `dl` and `dr`. The target range will be invalid if `di < dl` or `di < dr`, and we can skip some of the candidate ranges to reset the target range to `[i, i + k + 1]`. On the other hand, if the target range is valid, `i` will eventually be equal to `r` (or `di` will be equal to `dr`), and we need to update the final result (to find the minimum day) as well as set up a new target range. The two cases can be combined into one as shown below:\\n\\n```\\npublic int kEmptySlots(int[] flowers, int k) {\\n    int n = flowers.length, res = n + 1;\\n    int[] days = new int[n];\\n        \\n    for (int i = 0; i < n; i++) {\\n        days[flowers[i] - 1] = i + 1;\\n    }\\n        \\n    for (int i = 1, l = 0, r = k + 1; i < n && r < n; i++) {\\n        int di = days[i], dl = days[l], dr = days[r];\\n        \\n        if (di < dl || di <= dr) {\\n            if (di == dr) res = Math.min(res, Math.max(dl, dr)); // target range is valid so update final result\\n            l = i;\\n            r = i + (k + 1);\\n        }\\n    }\\n    \\n    return (res > n ? -1 : res);\\n}\\n```\\n\\n---\\nFinal remarks: this type of problems typically exhibit \"symmetric\" features in the input data set. For this problem, we have equivalent perspectives of the input data as either `flowers` or `days`. Similar situations can be found for [lc354](https://leetcode.com/problems/russian-doll-envelopes/description/) and [lc630](https://leetcode.com/problems/course-schedule-iii/description/). However, in the presence of extra restrictions, this symmetry may be broken and solutions may favor one perspective over the other. In such cases, it would be advisable to make attempts from both perspectives and choose the one that suits you best.\\n\\n---"
		},
		{
			"lc_ans_id":"107957",
			"view":"265",
			"top":"8",
			"title":"Three solutions",
			"vote":"3",
			"content":"Solution 1: brute force\\nTime complexity O(k * n), space O(n). I thought this method would lead to TLE at first. Surprisingly, it beats 70%. It creates a `days` array to record the time of bloom at each position. Then check each end pair and loop through the internal positions one by one.\\n```\\nclass Solution {\\n    public int kEmptySlots(int[] flowers, int k) {\\n        if (flowers == null || flowers.length == 0) {\\n            return -1;\\n        }\\n        int n = flowers.length;\\n        int[] days = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            int index = flowers[i] - 1;\\n            days[index] = i + 1;\\n        }\\n        int res = Integer.MAX_VALUE;\\n        for (int i = k + 1; i < n; i++) {\\n            int max = Math.max(days[i - k - 1], days[i]);\\n            if (helper(days, i - k, k, max)) {\\n                res = Math.min(res, max);\\n            }\\n        }\\n        return (res == Integer.MAX_VALUE) ? -1 : res;\\n    }\\n    \\n    private boolean helper(int[] days, int start, int k, int max) {\\n        for (int i = start; i < start + k; i++) {\\n            if (days[i] < max) {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```\\n\\nSolution 2: Maintain a window using mono-queue, the queue `dayMin` is an ascending queue that put the day# with minimum days in the first element of queue. The space complexity is O(n) and time complexity is  O(n). However, the solution is slower on the OJ test cases compared to method 1. Probably due to the small test samples and extra overhead for maintaining the queue.\\n```\\nclass Solution {\\n    public int kEmptySlots(int[] flowers, int k) {\\n        if (flowers == null || flowers.length == 0 || k + 2 > flowers.length) {\\n            return -1;\\n        }\\n        int n = flowers.length;\\n        int[] days = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            int index = flowers[i] - 1;\\n            days[index] = i + 1;\\n        }\\n        int res = Integer.MAX_VALUE;\\n        // Create an ascending queue\\n        Deque<Integer> dayMin = new ArrayDeque<>();\\n        for (int i = 1; i < k + 1; i++) {\\n            while (!dayMin.isEmpty() && days[dayMin.peekLast()] > days[i]) {\\n                dayMin.removeLast();\\n            }\\n            dayMin.addLast(i);\\n        }\\n        for (int i = k + 1; i < n; i++) {\\n            int max = Math.max(days[i - k - 1], days[i]);\\n            if (k == 0) {\\n                res = Math.min(res, max);\\n                continue;\\n            }\\n            if (max < days[dayMin.peekFirst()]) {\\n                res = Math.min(res, max);\\n            }\\n            // retire expired element\\n            if (dayMin.peekFirst() == i - k) {\\n                dayMin.removeFirst();\\n            }\\n            while (!dayMin.isEmpty() && days[dayMin.peekLast()] > days[i]) {\\n                dayMin.removeLast();\\n            }\\n            dayMin.add(i);\\n        }\\n        return (res == Integer.MAX_VALUE) ? -1 : res;\\n    }\\n}\\n```\\n\\nSolution 3:\\nGreedy, maintain a window, left -> right. If an element days[I] is smaller than either of the two ends, update the ends. It can be proved all numbers before days[I] will not be an edge as they are either larger than days[I], or is checked already.\\nTime complexity O(n), space complexity O(n).\\n```\\nclass Solution {\\n    public int kEmptySlots(int[] flowers, int k) {\\n        if (flowers == null || flowers.length == 0 || k + 2 > flowers.length) {\\n            return -1;\\n        }\\n        int n = flowers.length;\\n        int[] days = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            int index = flowers[i] - 1;\\n            days[index] = i + 1;\\n        }\\n        int res = Integer.MAX_VALUE;\\n        int left = 0, right = k + 1;\\n        for (int i = 1; i < n; i++) {\\n            int max = Math.max(days[left], days[right]);\\n            if (days[i] <= max) {\\n                if (i == right) {\\n                    res = Math.min(max, res);\\n                }\\n                left = i;\\n                right = left + k + 1;\\n                if (right >= n) break;\\n            }\\n        }\\n        return (res == Integer.MAX_VALUE) ? -1 : res;\\n    }\\n}\\n```\\n\\nWondering if there is an algorithm to have space complexity O(1), in which case `days` array is not used."
		},
		{
			"lc_ans_id":"107956",
			"view":"522",
			"top":"9",
			"title":"bucket sort time: O(n), space: O(n)",
			"vote":"3",
			"content":"The point of the question is how to quickly check whether there are any flowers within k. We can use bucket with width of k to check this in constant time by just checking the 2 next buckets.\\n```\\nclass Solution {\\n    public int kEmptySlots(int[] flowers, int k) {\\n        if (flowers == null || k < 0)\\n            return 0;\\n        int n = flowers.length;\\n        int[] minArr = null;\\n        int[] maxArr = null;\\n        minArr = new int[(k != 0 ? n / k : n) + 1];\\n        maxArr = new int[(k != 0 ? n / k : n) + 1];\\n        int day = 1;\\n        for (int x : flowers) {\\n            int index = k != 0 ? x / k : x;\\n            minArr[index] = Math.min(minArr[index] != 0? minArr[index] : x, x);\\n            maxArr[index] = Math.max(maxArr[index] != 0? maxArr[index] : x, x);\\n            \\n            if (index + 2 < minArr.length && minArr[index + 2] != 0 && minArr[index + 2] - maxArr[index] == k + 1 && minArr[index + 1] == 0)\\n                return day;\\n            if (index + 1 < minArr.length && minArr[index + 1] != 0 && minArr[index + 1] - maxArr[index] == k + 1)\\n                return day;\\n            \\n            if (index - 2 >= 0 && maxArr[index - 2] != 0 && minArr[index] - maxArr[index - 2] == k + 1 && maxArr[index - 1] == 0)\\n                return day;\\n            \\n            if (index - 1 >= 0 && maxArr[index - 1] != 0 && minArr[index] - maxArr[index - 1] == k + 1)\\n                return day;\\n            \\n            day++;\\n        }\\n        \\n        return -1;\\n    }\\n}\\n```"
		}
	],
	"id":"660",
	"title":"K Empty Slots",
	"content":"<p>\r\nThere is a garden with <code>N</code> slots. In each slot, there is a flower. The <code>N</code> flowers will bloom one by one in <code>N</code> days. In each day, there will be <code>exactly</code> one flower blooming and it will be in the status of blooming since then.\r\n</p>\r\n\r\n<p>\r\nGiven an array <code>flowers</code> consists of number from <code>1</code> to <code>N</code>. Each number in the array represents the place where the flower will open in that day.\r\n</p>\r\n\r\n<p>\r\nFor example, <code>flowers[i] = x</code> means that the unique flower that blooms at day <code>i</code> will be at position <code>x</code>, where <code>i</code> and <code>x</code> will be in the range from <code>1</code> to <code>N</code>.\r\n</p>\r\n\r\n<p>\r\nAlso given an integer <code>k</code>, you need to output in which day there exists two flowers in the status of blooming, and also the number of flowers between them is <code>k</code> and these flowers are not blooming.\r\n</p>\r\n\r\n<p>\r\nIf there isn't such day, output -1.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nflowers: [1,3,2]\r\nk: 1\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> In the second day, the first and the third flower have become blooming.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nflowers: [1,2,3]\r\nk: 1\r\n<b>Output:</b> -1\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The given array will be in the range [1, 20000].</li>\r\n</ol>\r\n</p>",
	"frequency":"354",
	"ac_num":"9648"
}