{
	"difficulty":"1",
	"submit_num":"70278",
	"show_id":"566",
	"leetcode_id":"566",
	"answers":[
		{
			"lc_ans_id":"102491",
			"view":"9969",
			"top":"0",
			"title":"Java Concise O(nm) time",
			"vote":"59",
			"content":"```\\npublic int[][] matrixReshape(int[][] nums, int r, int c) {\\n    int n = nums.length, m = nums[0].length;\\n    if (r*c != n*m) return nums;\\n    int[][] res = new int[r][c];\\n    for (int i=0;i<r*c;i++) \\n        res[i/c][i%c] = nums[i/m][i%m];\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"102513",
			"view":"5172",
			"top":"1",
			"title":"One loop",
			"vote":"36",
			"content":"We can use `matrix[index / width][index % width]` for both the input and the output matrix.\\n\\n    public int[][] matrixReshape(int[][] nums, int r, int c) {\\n        int m = nums.length, n = nums[0].length;\\n        if (r * c != m * n)\\n            return nums;\\n        int[][] reshaped = new int[r][c];\\n        for (int i = 0; i < r * c; i++)\\n            reshaped[i/c][i%c] = nums[i/n][i%n];\\n        return reshaped;\\n    }"
		},
		{
			"lc_ans_id":"102500",
			"view":"5619",
			"top":"2",
			"title":"Python Solutions",
			"vote":"17",
			"content":"#### **Solution 1 - `NumPy`**\\n\\n\\nWhen I read \"MATLAB\", I immediately thought \"NumPy\". Thanks to @fallcreek for pointing out `tolist`, makes converting the result to the correct type easier than what I had originally.\\n```\\nimport numpy as np\\n\\nclass Solution(object):\\n    def matrixReshape(self, nums, r, c):\\n        try:\\n            return np.reshape(nums, (r, c)).tolist()\\n        except:\\n            return nums\\n```\\n#### **Solution 2 - Oneliner**\\n\\nAn ugly oneliner :-)\\n\\n    def matrixReshape(self, nums, r, c):\\n        return nums if len(sum(nums, [])) != r * c else map(list, zip(*([iter(sum(nums, []))]*c)))\\n\\nA more readable version of that:\\n\\n    def matrixReshape(self, nums, r, c):\\n        flat = sum(nums, [])\\n        if len(flat) != r * c:\\n            return nums\\n        tuples = zip(*([iter(flat)] * c))\\n        return map(list, tuples)\\n\\n#### **Solution 3 - `itertools`**\\n\\n    def matrixReshape(self, nums, r, c):\\n        if r * c != len(nums) * len(nums[0]):\\n            return nums\\n        it = itertools.chain(*nums)\\n        return [list(itertools.islice(it, c)) for _ in xrange(r)]"
		},
		{
			"lc_ans_id":"102511",
			"view":"3467",
			"top":"3",
			"title":"Easy Java Solution",
			"vote":"11",
			"content":"```\\npublic class Solution {\\n    public int[][] matrixReshape(int[][] nums, int r, int c) {\\n        int m = nums.length, n = nums[0].length;\\n        if (m * n != r * c) return nums;\\n        \\n        int[][] result = new int[r][c];\\n        int row = 0, col = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                result[row][col] = nums[i][j];\\n                col++;\\n                if (col == c) {\\n                    col = 0;\\n                    row++;\\n                }\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102563",
			"view":"1231",
			"top":"4",
			"title":"C solution",
			"vote":"9",
			"content":"```\\nint** matrixReshape(int** nums, int m, int n, int r, int c, int** columnSizes, int* returnSize) {\\n    if (r * c != m * n) {\\n        r = m;\\n        c = n;\\n    }\\n\\n    *returnSize = r;\\n    int** result = (int**) malloc(r * sizeof(int*));\\n    *columnSizes = (int*) malloc(r * sizeof(int));\\n    for (int i = 0; i < r; ++i) {\\n        result[i] = (int*) malloc(c * sizeof(int));\\n        (*columnSizes)[i] = c;\\n    }\\n    \\n    for (int i = 0; i < m * n; ++i)\\n        result[i/c][i%c] = nums[i/n][i%n];\\n\\n    return result;\\n}\\n```\\n\\nMost of the code is for creating the data structure, not for writing the real contents into it. This must be fun for masochists :-). I just did this because of @leaf2's [question about C solutions](https://discuss.leetcode.com/topic/88089/anyone-has-c-solution-of-this-question) and similar questions I've seen occasionally. Was a little challenge.\\n\\nThings to notice:\\n- If the requested shape is invalid, we can't just return `nums` (which is what the problem text somewhat sounds like). Think about what the judge is probably doing. Probably it uses and frees all the result data (the data pointed to by the `return` value as well as what we write in `returnSize` and `columnSizes`). So we should create an independent *copy* of the input matrix with all its own data. I do this by simply changing `r` and `c` to the input shape and then continuing as otherwise. Can also be done like this:\\n\\n       if (r * c != m * n)\\n           return matrixReshape(nums, m, n, m, n, columnSizes, returnSize);\\n\\n- The \"sizes\" we must write to are the numbers of rows and columns, not the malloc sizes (i.e., not multiplied with `sizeof(...)`). I found that unclear in the specification, but on the other hand, it makes more sense if you think about what the judge code probably looks like.\\n- I renamed `numsRowSize` and `numsColSize` to the standard matrix size names `m` and `n`. Can't stand those awfully long and nonstandard names."
		},
		{
			"lc_ans_id":"102496",
			"view":"3885",
			"top":"5",
			"title":"[C++] [Java] Clean Code - 5 lines (2 Solution)",
			"vote":"6",
			"content":"**Java**\\n```\\nclass Solution {\\n    public int[][] matrixReshape(int[][] nums, int r, int c) {\\n        int m = nums.length, n = nums[0].length, o = m * n;\\n        if (r * c != o) return nums;\\n        int[][] res = new int[r][c];\\n        for (int i = 0; i < o; i++) res[i / c][i % c] = nums[i / n][i % n];\\n        return res;        \\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> matrixReshape(vector<vector<int>>& nums, int r, int c) {\\n        int m = nums.size(), n = nums[0].size(), o = m * n;\\n        if (r * c != o) return nums;\\n        vector<vector<int>> res(r, vector<int>(c, 0));\\n        for (int i = 0; i < o; i++) res[i / c][i % c] = nums[i / n][i % n];\\n        return res;\\n    }\\n};\\n```\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> matrixReshape(vector<vector<int>>& nums, int r, int c) {\\n        int m = nums.size(), n = nums[0].size();\\n        if (m * n != r * c) {\\n            return nums;\\n        }\\n\\n        vector<vector<int>> res(r, vector<int>(c, 0));\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                int k = i * n + j;\\n                res[k / c][k % c] = nums[i][j];\\n            }\\n        }\\n\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102499",
			"view":"1143",
			"top":"6",
			"title":"Python, Simple with Explanation",
			"vote":"5",
			"content":"Collect the values of the array A, and then put them into the answer of size ```nR x nC```.\\n\\n```\\ndef matrixReshape(self, A, nR, nC):\\n    if len(A) * len(A[0]) != nR * nC:\\n        return A\\n        \\n    vals = (val for row in A for val in row)\\n    return [[vals.next() for c in xrange(nC)] for r in xrange(nR)]\\n```\\n\\nAlternative solution without generators:\\n```\\ndef matrixReshape(self, A, nR, nC):\\n    if len(A) * len(A[0]) != nR * nC:\\n        return A\\n        \\n    vals = [val for row in A for val in row]\\n    ans = [[None] * nC for _ in xrange(nR)]\\n    i = 0\\n    for r in xrange(nR):\\n        for c in xrange(nC):\\n            ans[r][c] = vals[i]\\n            i += 1\\n    return ans"
		},
		{
			"lc_ans_id":"102572",
			"view":"352",
			"top":"7",
			"title":"Python solution",
			"vote":"3",
			"content":"I know that the code looks ugly, but it is good enough for a beginner like me :)\\n```\\nclass Solution(object):\\n    def matrixReshape(self, nums, r, c):\\n        \"\"\"\\n        :type nums: List[List[int]]\\n        :type r: int\\n        :type c: int\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        nrows = len(nums)\\n        ncols = len(nums[0])\\n        \\n        if nrows * ncols == r * c:\\n            onedArray = []\\n            reshaped = [[0] * c for i in range(r)]\\n            for x in nums:\\n                onedArray += x\\n            for index, item in enumerate(onedArray):\\n                placeRow = index / c\\n                placeCol = index % c\\n                reshaped[placeRow][placeCol] = item\\n            return reshaped\\n        else:\\n            return nums\\n```"
		},
		{
			"lc_ans_id":"102516",
			"view":"300",
			"top":"8",
			"title":"Easy-to-understand python solution",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def matrixReshape(self, nums, r, c):\\n        \"\"\"\\n        :type nums: List[List[int]]\\n        :type r: int\\n        :type c: int\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        if len(nums) * len(nums[0]) != r * c:\\n            return nums\\n            \\n        ans = [[]]\\n        for i in range(len(nums)):\\n            for j in range(len(nums[0])):\\n                k = nums[i][j]\\n                if len(ans[-1]) < c:\\n                    ans[-1].append(k)\\n                else:\\n                    ans.append([k])\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"102522",
			"view":"158",
			"top":"9",
			"title":"Simple Python solution",
			"vote":"1",
			"content":"This solution loops through all of the values in the nums array and appends it to a temp array. Once that temp array has the length of c, it appends that to another array I call, \"result.\" \\n\\nI reset the count for c to 0 and I continue doing this until all of the values are recreated in the \"result\" array.\\n\\nThere's also a conditional to check if the areas match for both the current and reshaped array.\\n\\nI haven't looked at other solutions yet and this is my first attempt.\\n\\n```\\nclass Solution(object):\\n    def matrixReshape(self, nums, r, c):\\n        \"\"\"\\n        :type nums: List[List[int]]\\n        :type r: int\\n        :type c: int\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        \\n        if (r * c) != len(nums) * len(nums[0]):\\n            return nums\\n        \\n        result = []\\n        temp = []\\n        count = 0\\n        for i in range(len(nums)):\\n            for j in range(len(nums[0])):\\n                # create an array with length of c\\n                temp.append(nums[i][j])\\n                count += 1\\n                if count == c:\\n                    # append the array to the result array\\n                    # this makes sure it has the new c length \\n                    result.append(temp)\\n                    temp = []\\n                    count = 0\\n            \\n        return result\\n```"
		}
	],
	"id":"547",
	"title":"Reshape the Matrix",
	"content":"<p>In MATLAB, there is a very useful function called 'reshape', which can reshape a matrix into a new one with different size but keep its original data.\r\n</p>\r\n\r\n<p>\r\nYou're given a matrix represented by a two-dimensional array, and two <b>positive</b> integers <b>r</b> and <b>c</b> representing the <b>row</b> number and <b>column</b> number of the wanted reshaped matrix, respectively.</p>\r\n\r\n <p>The reshaped matrix need to be filled with all the elements of the original matrix in the same <b>row-traversing</b> order as they were.\r\n</p>\r\n\r\n<p>\r\nIf the 'reshape' operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nnums = \r\n[[1,2],\r\n [3,4]]\r\nr = 1, c = 4\r\n<b>Output:</b> \r\n[[1,2,3,4]]\r\n<b>Explanation:</b><br>The <b>row-traversing</b> of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nnums = \r\n[[1,2],\r\n [3,4]]\r\nr = 2, c = 4\r\n<b>Output:</b> \r\n[[1,2],\r\n [3,4]]\r\n<b>Explanation:</b><br>There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. So output the original matrix.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The height and width of the given matrix is in range [1, 100].</li>\r\n<li>The given r and c are all positive.</li>\r\n</ol>\r\n</p>",
	"frequency":"339",
	"ac_num":"40775"
}