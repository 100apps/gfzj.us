{
	"difficulty":"1",
	"submit_num":"86403",
	"show_id":"475",
	"leetcode_id":"475",
	"answers":[
		{
			"lc_ans_id":"95886",
			"view":"20009",
			"top":"0",
			"title":"Short and Clean Java Binary Search Solution",
			"vote":"68",
			"content":"The idea is to leverage decent ```Arrays.binarySearch()``` function provided by Java.\\n1. For each ```house```, find its position between those ```heaters``` (thus we need the ```heaters``` array to be sorted). \\n2. Calculate the distances between this ```house``` and left ```heater``` and right ```heater```, get a ```MIN``` value of those two values. Corner cases are there is no left or right heater.\\n3. Get ```MAX``` value among distances in step 2. It's the answer.\\n\\nTime complexity: max(O(nlogn), O(mlogn)) - m is the length of houses, n is the length of heaters.\\n\\n```\\npublic class Solution {\\n    public int findRadius(int[] houses, int[] heaters) {\\n        Arrays.sort(heaters);\\n        int result = Integer.MIN_VALUE;\\n        \\n        for (int house : houses) {\\n            int index = Arrays.binarySearch(heaters, house);\\n            if (index < 0) {\\n        \\tindex = -(index + 1);\\n            }\\n            int dist1 = index - 1 >= 0 ? house - heaters[index - 1] : Integer.MAX_VALUE;\\n            int dist2 = index < heaters.length ? heaters[index] - house : Integer.MAX_VALUE;\\n        \\n            result = Math.max(result, Math.min(dist1, dist2));\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95881",
			"view":"11552",
			"top":"1",
			"title":"Simple Java Solution with 2 Pointers",
			"vote":"55",
			"content":"Based on 2 pointers, the idea is to find the nearest heater for each house, by comparing the next heater with the current heater.\\n```\\npublic class Solution {\\n    public int findRadius(int[] houses, int[] heaters) {\\n        Arrays.sort(houses);\\n        Arrays.sort(heaters);\\n        \\n        int i = 0, j = 0, res = 0;\\n        while (i < houses.length) {\\n            while (j < heaters.length - 1\\n                && Math.abs(heaters[j + 1] - houses[i]) <= Math.abs(heaters[j] - houses[i])) {\\n                j++;\\n            }\\n            res = Math.max(res, Math.abs(heaters[j] - houses[i]));\\n            i++;\\n        }\\n        \\n        return res;\\n    }\\n}\\n```\\n\\nUpdated solution inspired by @StefanPochmann \\n```\\npublic class Solution {\\n    public int findRadius(int[] houses, int[] heaters) {\\n        Arrays.sort(houses);\\n        Arrays.sort(heaters);\\n        \\n        int i = 0, res = 0;\\n        for (int house : houses) {\\n            while (i < heaters.length - 1 && heaters[i] + heaters[i + 1] <= house * 2) {\\n                i++;\\n            }\\n            res = Math.max(res, Math.abs(heaters[i] - house));\\n        }\\n        \\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95875",
			"view":"5882",
			"top":"2",
			"title":"Short Python",
			"vote":"31",
			"content":"Go through houses and heaters in ascending order. My `i` points to the current closest heater. Go to the next heater if the current house coordinate is larger than or equal to the middle between the current and the next heater.\\n\\n    def findRadius(self, houses, heaters):\\n        heaters = sorted(heaters) + [float('inf')]\\n        i = r = 0\\n        for x in sorted(houses):\\n            while x >= sum(heaters[i:i+2]) / 2.:\\n                i += 1\\n            r = max(r, abs(heaters[i] - x))\\n        return r\\n\\nI btw started with\\n&nbsp;&nbsp;&nbsp;&nbsp;`while abs(heaters[i+1] - x) <= abs(heaters[i] - x):`,\\nthe straight-forward check whether the next heater is closer than the current. Then I thought I probably don't need `abs` if I just use\\n&nbsp;&nbsp;&nbsp;&nbsp;`while heaters[i+1] - x <= x - heaters[i]:`.\\nThat's obviously correct if `x` is between the heaters, because then that's the correct distances of `x` to the two heaters. Less obviously (but imho not surprisingly) it's also correct if `x` isn't between them. Finally, after rewriting it to\\n&nbsp;&nbsp;&nbsp;&nbsp;`while heaters[i] + heaters[i+1] <= 2 * x:`\\nI realized what that meant :-)\\n\\n---\\nUpdate: Another solution by using binary search, inspired by others:\\n\\n    def findRadius(self, houses, heaters):\\n        heaters.sort()\\n        return max(min(abs(house - heater)\\n                       for i in [bisect.bisect(heaters, house)]\\n                       for heater in heaters[i-(i>0):i+1])\\n                   for house in houses)"
		},
		{
			"lc_ans_id":"95887",
			"view":"1557",
			"top":"3",
			"title":"C++ clean solution with explanation",
			"vote":"14",
			"content":"Sorting is `O(n log n)`. The rest is `O(n)`. \\nHere, `A = houses` and `H = heaters`.\\n```\\nclass Solution {\\npublic:\\n/*\\nExample:    h = house,  * = heater  M = INT_MAX\\n\\n        h   h   h   h   h   h   h   h   h    houses\\n        1   2   3   4   5   6   7   8   9    index\\n        *           *       *                heaters\\n                \\n        0   2   1   0   1   0   -   -   -    (distance to nearest RHS heater)\\n        0   1   2   0   1   0   1   2   3    (distance to nearest LHS heater)\\n\\n        0   1   1   0   1   0   1   2   3    (res = minimum of above two)\\n\\nResult is maximum value in res, which is 3.\\n*/\\n    int findRadius(vector<int>& A, vector<int>& H) {\\n        sort(A.begin(), A.end());\\n        sort(H.begin(), H.end());\\n        vector<int> res(A.size(), INT_MAX); \\n        \\n        // For each house, calculate distance to nearest RHS heater\\n        for (int i = 0, h = 0; i < A.size() && h < H.size(); ) {\\n            if (A[i] <= H[h]) { res[i] = H[h] - A[i]; i++; }\\n            else { h++; }\\n        }\\n        \\n        // For each house, calculate distance to nearest LHS heater\\n        for (int i = A.size()-1, h = H.size()-1; i >= 0 && h >= 0; ) {\\n            if (A[i] >= H[h]) { res[i] = min(res[i], A[i] - H[h]); i--; }\\n            else { h--; }\\n        }\\n       \\n        return *max_element(res.begin(), res.end());\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95889",
			"view":"3962",
			"top":"4",
			"title":"simple C++ solution",
			"vote":"11",
			"content":"Simple idea, sort and then iterate to the nearest point, not too much conor cases\\n```\\nclass Solution {\\npublic:\\n    int findRadius(vector<int>& houses, vector<int>& heaters) {\\n        if (heaters.size() == 0) {\\n            return 0;\\n        }\\n        sort(houses.begin(), houses.end());\\n        sort(heaters.begin(), heaters.end());\\n        int radius = 0;\\n        int index = 0;\\n        for (int i = 0; i < houses.size(); i++) {\\n            while (index + 1 < heaters.size() && (abs(heaters[index+1] - houses[i]) <= abs(heaters[index] - houses[i]))) {\\n                index++;\\n            }\\n            radius = max(radius, abs(heaters[index] - houses[i]));\\n        }\\n        return radius;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95928",
			"view":"779",
			"top":"5",
			"title":"Java TreeSet log(n) Solution with explanation",
			"vote":"8",
			"content":"Initially I was trying TreeSet  as it provides easier way to find the lowerBound and upperBound. While I mistakenly reversed the min and max relationship when updating the global min radius result. Thanks to @ckcz123 's solution and I realized my error and made it right. \\nThe idea using TreeSet is first put heaters' location into the tree, then iterate the houses' location finding the smallest radius with which one of the closest heaters may cover. Say heaters[1, 4] , houses[1,2,3,4]. When we scan the house = 1, found closest heater is at 1, so the global max till house at 1 is 0; then when house = 2, found the closest heater is min(house at 2 - heater at 1, heater at 4 - house at 2) = 1, which means the heater at 1 can cover the house at 2 and we do not need to use heater at 4. In the end, we may found the global res (min radius required) and remember that some of the heaters may not be effectively used as long as all the houses are already covered. O(logn) for TreeSet operations in this solution, but need O(heater) space which is not as good as binary search solution.\\n```\\npublic class Solution {\\n    public int findRadius(int[] houses, int[] heaters) {\\n        TreeSet<Integer> treeset = new TreeSet<>();\\n        for (int heater : heaters) treeset.add(heater);\\n        int res = 0;\\n        for (int house : houses) {\\n            Integer upper = treeset.ceiling(house); \\n            Integer lower = treeset.floor(house);\\n            res = Math.max(res, Math.min(upper == null ? Integer.MAX_VALUE : upper - house, lower == null ? Integer.MAX_VALUE : house - lower));\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95909",
			"view":"3540",
			"top":"6",
			"title":"c++ solution using lower_bound (binary search), with comments",
			"vote":"8",
			"content":"```\\nint findRadius(vector<int>& houses, vector<int>& heaters) {\\n    sort(heaters.begin(), heaters.end());\\n    int minRadius = 0;\\n    for (int i = 0; i < houses.size(); i++) {\\n    \\t// search for the closest heater whose position is at least the current house's position\\n    \\tauto larger = lower_bound(heaters.begin(), heaters.end(), houses[i]);\\n    \\tint curRadius = INT_MAX;\\n    \\t// if there is such a heater, update the radius for that heater to cover this house if necessary\\n    \\tif (larger != heaters.end())\\n    \\t    curRadius = *larger - houses[i];\\n    \\t// if the heater we found is not the first one, then the previous heater is the closest heater\\n    \\t// whose position is smaller than the current house's position\\n    \\tif (larger != heaters.begin()) {\\n    \\t    auto smaller = larger - 1;\\n    \\t   // the heater with the smaller required radius to cover the house wins\\n    \\t    curRadius = min(curRadius, houses[i] - *smaller);\\n    \\t}\\n    \\tminRadius = max(minRadius, curRadius);\\n    }\\n    return minRadius;\\n}\\n```\\nEdit: As @rui-guo-180 points out, some test cases were introduced to fail this kind of solution (I have tried to sort the houses and then optimize the binary search range and it didn't help). The weird thing is, the exact same algorithm written in Java can still pass."
		},
		{
			"lc_ans_id":"95919",
			"view":"4811",
			"top":"7",
			"title":"Java  Easy Solution",
			"vote":"8",
			"content":"Hi there! I am sharing my solution. The idea is to find the closest heater to each house and take maximum of the closest distances. Thus initially it is necessary to sort both houses and heaters by their coordinates. Then assign two pointers, one for houses and another for heaters. Then start traversing the houses. If the ith house is located between j-1th heater and jth heater, then take distance to the closest one and check whether it is the maximum radius found so far. The corner cases are when a house is located before the 1st heater, and when a house is located after the last heater. At the corner case position, there are only distance to consider. That's it. I think code will clarify the idea more.\\n\\nP.S: Do not forget to sort houses and heaters at the beginning. Most  contestants seem to get wrong answer, because they assumed the input to be sorted already (including me:=)).\\n```\\npublic class Solution {\\n    public int findRadius(int[] houses, int[] heaters) {\\n        if(houses == null || houses.length == 0) return 0;\\n        Arrays.sort(houses);\\n        Arrays.sort(heaters);\\n        int ans = 0;\\n        int i  = 0;\\n        int j = 0;\\n        while(i<houses.length){\\n            if(houses[i] <= heaters[j]){ //if house is located before heater j.\\n                if(j == 0){ // corner case when the heater is the first  one\\n                    ans = Math.max(ans, heaters[j]-houses[i]);\\n                    i++;\\n                    continue;\\n                }\\n            } else { // if house is located after some heater, \\n                while(j!=heaters.length-1 && heaters[j]<houses[i]){ // then find a heater that stands after the house\\n                    j++;\\n                }\\n                if(j == 0 || heaters[j] < houses[i]){ // corner cases if j is 0 or there is no more heaters\\n                    ans = Math.max(ans, houses[i]-heaters[j]);\\n                    i++;\\n                    continue;\\n                }\\n            }\\n            int dist = Math.min(houses[i]-heaters[j-1], heaters[j]-houses[i]); // if house is located between jth and j-1th heaters\\n            ans = Math.max(ans, dist);\\n            i++;\\n        }\\n        \\n        return ans;\\n    }\\n\\n}"
		},
		{
			"lc_ans_id":"95878",
			"view":"889",
			"top":"8",
			"title":"10 lines python with easy understanding",
			"vote":"4",
			"content":"Add two imaginary heaters at the infinite, then any house can be always between two heaters. Find the shortest distance of the two and compare it to the answer.\\n\\n``` python\\nclass Solution(object):\\n    def findRadius(self, houses, heaters):\\n        \"\"\"\\n        :type houses: List[int]\\n        :type heaters: List[int]\\n        :rtype: int\\n        \"\"\"\\n        houses.sort()\\n        heaters.sort()\\n        heaters=[float('-inf')]+heaters+[float('inf')] # add 2 fake heaters\\n        ans,i = 0,0\\n        for house in houses:\\n            while house > heaters[i+1]:  # search to put house between heaters\\n                i +=1\\n            dis = min (house - heaters[i], heaters[i+1]- house)\\n            ans = max(ans, dis)\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"95888",
			"view":"1012",
			"top":"9",
			"title":"A Binary Search Solution",
			"vote":"4",
			"content":"We're more likely to come up with the merge procedure algorithm, where we first sort the two vectors and then find the two surrounding heaters for each house. This is O(mlogm + nlogn + m + n) time.\\n\\nYet we have another binary search approach where only the heaters array need to be sorted. For each house, we apply binary search twice to find its left and right neighbor heaters to compute the radius for it to be covered. This algorithm is O(nlogn + mlogn), better than the merge one.\\n```\\n/***\\n     * \\\\Note\\n     * assume both vectors are in sorted order\\n     * \\n     * \\\\Algorithm\\n     * for each house in houses, apply binary search in heaters,\\n     * to find its closest left heater, and closest right side heater.\\n     * left = BsearchNoGreaterThan (house, heaters);\\n     * right= BsearchNoSmallerThan (house, heaters);\\n     * \\n     * HEATER_TO_RADIUS(heater, house)  (heater == -1 ? INT_MAX : abs(house - heater))\\n     * radius = min (HEATER_TO_RADIUS(left, house), HEATER_2_RADIUS(right, house));\\n     * \\n     * return max {radius for each house}\\n     * \\n     * \\\\Analysis\\n     * O(m * 2logn) = O(mlogn) time, O(1) auxiliary space\\n     */\\n    int findRadiusBSearch(vector<int>& houses, vector<int>& heaters) {\\n        int ret = 0;\\n        \\n        /* the input is not necessarily sorted */\\n        sort (heaters.begin(), heaters.end());\\n        for (int i = 0; i < houses.size(); i++) {\\n            int leftHeater = BSearchNoGreaterThan (heaters, houses[i]);\\n            int rightHeater= BSearchNoSmallerThan (heaters, houses[i]);\\n            \\n            //cout << leftHeater << \" \" << houses[i] << \" \" << rightHeater << endl;\\n            #define HEATER2R(ht, hs)    (ht == -1 ? INT_MAX : abs(hs - ht))\\n            int radius = min (HEATER2R(leftHeater, houses[i]), HEATER2R(rightHeater, houses[i]));\\n            ret = max (radius, ret);\\n        }\\n        \\n        return ret;\\n    }\\n    \\n    int BSearchNoGreaterThan (vector<int>& nums, int target) {\\n        int lo = 0;\\n        int hi = nums.size() - 1;\\n        \\n        while (lo < hi) {\\n            int mid = lo + (hi - lo + 1) / 2;\\n            if (nums[mid] <= target) {\\n                lo = mid;\\n            } else {\\n                hi = mid - 1;\\n            }\\n        }\\n        \\n        if (lo == hi && nums[lo] <= target) {\\n            return nums[lo];\\n        }\\n        \\n        /* not found */\\n        return -1;\\n    }\\n    \\n    int BSearchNoSmallerThan (vector<int>& nums, int target) {\\n        int lo = 0;\\n        int hi = nums.size() - 1;\\n        \\n        while (lo < hi) {\\n            int mid = lo + (hi - lo) / 2;\\n            if (target <= nums[mid]) {\\n                hi = mid;\\n            } else {\\n                lo = mid + 1;\\n            }\\n        }\\n        \\n        if (lo == hi && target <= nums[lo]) {\\n            return nums[lo];\\n        }\\n        return -1;\\n    }\\n```"
		}
	],
	"id":"468",
	"title":"Heaters",
	"content":"<p>Winter is coming! Your first job during the contest is to design a standard heater with fixed warm radius to warm all the houses.</p>\r\n\r\n<p>Now, you are given positions of houses and heaters on a horizontal line, find out minimum radius of heaters so that all houses could be covered by those heaters.</p>\r\n\r\n<p>So, your input will be the positions of houses and heaters seperately, and your expected output will be the minimum radius standard of heaters.</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>Numbers of houses and heaters you are given are non-negative and will not exceed 25000.</li>\r\n<li>Positions of houses and heaters you are given are non-negative and will not exceed 10^9.</li>\r\n<li>As long as a house is in the heaters' warm radius range, it can be warmed.</li>\r\n<li>All the heaters follow your radius standard and the warm radius will the same.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3],[2]\r\n<b>Output:</b> 1\r\n<b>Explanation:</b> The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,4],[1,4]\r\n<b>Output:</b> 1\r\n<b>Explanation:</b> The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.\r\n</pre>\r\n</p>",
	"frequency":"214",
	"ac_num":"25592"
}