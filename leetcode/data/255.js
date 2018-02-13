{
	"difficulty":"2",
	"submit_num":"57626",
	"show_id":"255",
	"leetcode_id":"255",
	"answers":[
		{
			"lc_ans_id":"68142",
			"view":"32359",
			"top":"0",
			"title":"Java O(n) and O(1) extra space",
			"vote":"237",
			"content":"**Solution 1**\\n\\nKinda simulate the traversal, keeping a stack of nodes (just their values) of which we're still in the left subtree. If the next number is smaller than the last stack value, then we're still in the left subtree of all stack nodes, so just push the new one onto the stack. But before that, pop all smaller ancestor values, as we must now be in their right subtrees (or even further, in the right subtree of an ancestor). Also, use the popped values as a lower bound, since being in their right subtree means we must never come across a smaller number anymore.\\n\\n    public boolean verifyPreorder(int[] preorder) {\\n        int low = Integer.MIN_VALUE;\\n        Stack<Integer> path = new Stack();\\n        for (int p : preorder) {\\n            if (p < low)\\n                return false;\\n            while (!path.empty() && p > path.peek())\\n                low = path.pop();\\n            path.push(p);\\n        }\\n        return true;\\n    }\\n\\n**Solution 2** ...  **O(1) extra space**\\n\\nSame as above, but abusing the given array for the stack.\\n\\n    public boolean verifyPreorder(int[] preorder) {\\n        int low = Integer.MIN_VALUE, i = -1;\\n        for (int p : preorder) {\\n            if (p < low)\\n                return false;\\n            while (i >= 0 && p > preorder[i])\\n                low = preorder[i--];\\n            preorder[++i] = p;\\n        }\\n        return true;\\n    }\\n\\n**Solution 3** ...  **Python**\\n\\nSame as solution 1, just in Python.\\n\\n    def verifyPreorder(self, preorder):\\n        stack = []\\n        low = float('-inf')\\n        for p in preorder:\\n            if p < low:\\n                return False\\n            while stack and p > stack[-1]:\\n                low = stack.pop()\\n            stack.append(p)\\n        return True"
		},
		{
			"lc_ans_id":"68139",
			"view":"5147",
			"top":"1",
			"title":"Divide Conquer Java Solution",
			"vote":"19",
			"content":"A BST's left child is always < root and right child is always > root. \\n\\n    public boolean verifyPreorder(int[] preorder) {\\n        if(preorder == null || preorder.length == 0) return true;\\n        return verify(preorder, 0, preorder.length - 1);\\n    }\\n\\n    private boolean verify(int[] a, int start, int end) {\\n        if(start >= end) return true;\\n        int pivot = a[start];\\n        int bigger = -1;\\n        for(int i = start + 1; i <= end; i++) {\\n            if(bigger == -1 && a[i] > pivot) bigger = i;\\n            if(bigger != -1 && a[i] < pivot) return false;\\n        }\\n        if(bigger == -1) {\\n            return verify(a, start + 1, end);\\n        } else {\\n            return verify(a, start + 1, bigger - 1) && verify(a, bigger, end);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68161",
			"view":"4307",
			"top":"2",
			"title":"72ms c++ solution using one stack, O(n) time and space",
			"vote":"17",
			"content":"The idea is traversing the preorder list and using a stack to store all predecessors. curr_p is a predecessor of  current node and current node is in the right subtree of curr_p.  \\n\\nFor example, for the following bst with preorder 6,3,1,2,5,4,7:\\n\\n                  6\\n                /  \\\\  \\n               3    7\\n              /  \\\\\\n             1   5\\n             \\\\   /\\n             2  4   \\n\\nWe push to stack before we see 2. So at 2 the stack is 6,3,1. For 2, we pop stack until we see 3 which is greater than 2 and curr_p is 1. 2 is in left subtree of 3 and is right child of 1. Stack is 6,3,2 now. Then we see 5, and we pop stack until 6 and curr_p is 3. Stack now is 6,5. Then we see 4 and push to stack. At 7, we pop stack until empty and curr_p is 6. \\n\\n    bool verifyPreorder(vector<int>& preorder){\\n        // using stack\\n        int sz = preorder.size();\\n        if(sz < 2) return true;\\n        stack<int> s;\\n        s.push(preorder[0]);\\n        int curr_p = INT_MIN;\\n        for(int i=1; i<sz; i++){ \\n            if(s.empty() || preorder[i]<s.top()){ // if current node is less than stack top, then go to left subtree\\n                if(preorder[i]<curr_p) return false; \\n                s.push(preorder[i]);\\n            }\\n            else{\\n                while(!s.empty() && s.top()<preorder[i]){ //find curr_p such that current node is right child of curr_p\\n                    curr_p = s.top();\\n                    s.pop();\\n                }\\n                s.push(preorder[i]);\\n            }\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"68185",
			"view":"1219",
			"top":"3",
			"title":"C++ easy to understand solution with thought process and detailed explanation",
			"vote":"16",
			"content":"**THOUGHT**: We first look at the property of preorder traversal: we print left child\\u2019s value of current node all the way until we reached a leaf node (you will see numbers decreasing), then we start printing the value of a node (let it be rc) which is the right child of one of the nodes (let it be node p) we already traversed. When do you know it's a right child node's value? It's when you see a value greater than the last one. Also,till here we know, all the nodes in p\\u2019s left subtree have been read in the serialized array, and this property is maintained: \\n\\n    left subtree \\u2018s value < p \\u2019s value < rc\\u2019s value\\n\\nSince all the nodes whose value is smaller than p are already read, all the nodes\\u2019 value to be read after should have greater value than p\\u2019s value, so p\\u2019s value becomes the **lower bound** for any upcoming node.\\n\\n    p \\u2019s value < upcoming value in array\\n\\nOtherwise, it\\u2019s not valid. **So the key here is to find the lower bound for upcoming nodes, which equals to find p.** \\n\\nTo translate this into code: looking for the trend of numbers, if it\\u2019s decreasing, it\\u2019s still traversing the left child node all the way down, we push the value into stack. When we read a value greater than the last one, we know the current value belongs to a right node (let it be rc: right child) of one of the previous nodes (let it be p) we pushed to stack, in other words, p is a parent node of the current node rc. Due to the property of preorder traversal, p\\u2019s value is pushed to stack before its left subtree nodes, so to find the parent node, we pop all the nodes in its left subtree, and the last popped node whose value is smaller than rc is rc\\u2019s parent p, whose value becomes the lower bound. Then we keep reading the serialized array, in any case we see any value not greater than the lower bound, we return false. Lower bound is updated whenever we read a right child node\\u2019s value.\\n\\n    class Solution {\\n    public:\\n        bool verifyPreorder(vector<int>& preorder) {\\n            stack<int> stk;\\n            int lower_bound = INT_MIN;\\n            for(int i = 0; i < preorder.size(); i++){\\n                if(stk.empty() || preorder[i] < preorder[i - 1]){\\n                    if(preorder[i] <= lower_bound) return false;\\n                    stk.push(preorder[i]);\\n                }else{\\n                    while(!stk.empty() && stk.top() < preorder[i]){\\n                        lower_bound = stk.top();\\n                        stk.pop();\\n                    }\\n                    stk.push(preorder[i]);\\n                }\\n            }\\n            \\n            return true;\\n        }\\n    };\\n\\n\\nUsing this [image][1] as an example:\\n\\n    Push 50\\n    Push 17 \\n    Push 9\\n    (read 14, 14 > 9)\\n    Pop 9 (lower bound = 9)\\n    Push 14\\n    Push 12\\n    (read 23, 23 > 12)\\n    Pop 12\\n    Pop 14\\n    Pop 17 (lower bound = 17)\\n    Push 23\\n    (read 76, 76 > 23)\\n    Pop 23\\n    Pop 50 (lowerbound = 50)\\n    Push 76\\n    Push 54\\n    (read 72, 72 > 54)\\n    Pop 54 (lower bound = 54)\\n    Push 72\\n    Push 67\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree#/media/File:Unbalanced_binary_tree.svg"
		},
		{
			"lc_ans_id":"68197",
			"view":"1909",
			"top":"4",
			"title":"AC Python O(n) time O(1) extra space",
			"vote":"14",
			"content":" A easy solution is O(n) time and O(n) space using a stack\\n\\n    def verifyPreorder(self, preorder):\\n        stack = []\\n        lower = -1 << 31\\n        for x in preorder:\\n            if x < lower:\\n                return False\\n            while stack and x > stack[-1]:\\n                lower = stack.pop()\\n            stack.append(x)\\n        return True\\n\\n\\n    # 59 / 59 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 100 ms\\n    # 95.31%\\n\\nThen we realize that the preorder array can be reused as the stack thus achieve O(1) extra space, since the scanned items of preorder array is always more than or equal to the length of the stack.\\n\\n    def verifyPreorder(self, preorder):\\n        # stack = preorder[:i], reuse preorder as stack\\n        lower = -1 << 31\\n        i = 0\\n        for x in preorder:\\n            if x < lower:\\n                return False\\n            while i > 0 and x > preorder[i - 1]:\\n                lower = preorder[i - 1]\\n                i -= 1\\n            preorder[i] = x\\n            i += 1\\n        return True\\n\\n\\n    # 59 / 59 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 112 ms\\n    # 70.31%"
		},
		{
			"lc_ans_id":"68144",
			"view":"4562",
			"top":"5",
			"title":"Java O(n log n) time and O(1) space recursive solution",
			"vote":"12",
			"content":"Recursively examine every key in the array. For each BST node, its key must be greater than all keys in left subtree and less than keys in right subtree. \\n\\nSince given preorder sequence, the first element is always the root. Partition the array by the key of root, find the index of the first number greater than it.\\n\\nBase case:\\n\\n 1. start index exceeds end index, the array to be checked is empty, return true;\\n 2. root key is not within upper and lower boundaries, return false. \\n\\n**Solution:**\\n\\n    public boolean verifyPreorder(int[] preorder) {\\n        return verify(preorder, 0, preorder.length - 1, Integer.MIN_VALUE, Integer.MAX_VALUE);\\n    }\\n\\n    private boolean verify(int[] preorder, int start, int end, int min, int max) {\\n        if (start > end) {\\n            return true;\\n        }\\n        int root = preorder[start];\\n        if (root > max || root < min) {\\n            return false;\\n        }\\n        \\n        int rightIndex = start;\\n        while (rightIndex <= end && preorder[rightIndex] <= root) {\\n            rightIndex++;\\n        }\\n        return verify(preorder, start + 1, rightIndex - 1, min, root) && verify(preorder, rightIndex, end, root, max);\\n    }"
		},
		{
			"lc_ans_id":"68188",
			"view":"1460",
			"top":"6",
			"title":"C++ O(n log n) recursive solution.",
			"vote":"8",
			"content":"I'm in bit of disbelief that my solution was accepted. I coded it up while I was really sleepy, and hit submit, fully expecting it to fail compilation or something...\\n\\nThe logic is as follows:\\n\\nFor any pre-order sequence, we have:\\n\\n1. The root, followed by\\n2. Another preorder sequence for the LHS, where everything is less than root, followed by,\\n3. Another preorder sequence for the RHS, where everything is greater than root.\\n\\nIn order to find the boundary of the LHS preorder and the RHS preorder, you can run binary search to look for the boundary where the elements transition from being (< root) to being (> root).\\n\\nOnce you find the boundary, you can recursively call the verify function on the LHS preorder sequence and the RHS preorder sequence. The trick is to pass two elements along, that say what the relationship of the elements should be w.r.t. the ancestors that have gone by so far. e.g. I am passing two elements (lessThan and greaterThan) which say that all elements in the preorder sequence need to be less than lessThan, and greater than greaterThan. Look at the recursive calls for lhsverify and rhsverify bools to see what is being passed on to recursive calls.\\n\\n    class Solution {\\n        //boundary denotes LAST number that is less than or equal to num\\n        int binarySearchBoundary(vector<int>& preorder, int from, int to, int num) {\\n            if (from == to) return from;\\n            int mid = (from+to)/2;\\n            int midplus = mid + 1;\\n            if (preorder[mid] <= num && preorder[midplus] > num) return mid;\\n            if (preorder[mid] > num) return binarySearchBoundary(preorder, from, mid, num);\\n            return binarySearchBoundary(preorder, midplus, to, num);\\n        }\\n    \\n        //verify the sequence from \"from\" to \"to\", in which every elements needs to be \\n        // less than \"lessThan\", and greater than \"greaterThan\"\\n        bool verify(vector<int>& preorder, int from, int to, int lessThan, int greaterThan) {\\n            if (from > to) return true;\\n            int root = preorder[from];\\n            if (root > lessThan || root < greaterThan) return false;\\n            if (from == to) return true;\\n            \\n            int boundary = binarySearchBoundary(preorder, from, to, root);\\n            bool lhsverify = verify(preorder, from+1, boundary, min(lessThan, root), greaterThan); \\n            bool rhsverify = verify(preorder, boundary+1, to, lessThan, max(root, greaterThan)); \\n            return (lhsverify && rhsverify);\\n        }\\n    \\n    public:\\n        bool verifyPreorder(vector<int>& preorder) {\\n            if (preorder.size() == 0) return true;\\n            return verify(preorder, 0, preorder.size()-1, std::numeric_limits<int>::max(), std::numeric_limits<int>::min());\\n        }\\n    };"
		},
		{
			"lc_ans_id":"68147",
			"view":"1266",
			"top":"7",
			"title":"Easy solution with recursion",
			"vote":"3",
			"content":"    public boolean verifyPreorder(int[] preorder) {\\n    \\t\\tif (preorder == null || preorder.length <= 1) {\\n    \\t\\t\\treturn true;\\n    \\t\\t}\\n    \\t\\treturn helper(preorder, 0, preorder.length - 1);\\n    \\n    \\t}\\n    \\n    \\tpublic boolean helper(int[] arr, int first, int end) {\\n    \\t\\tif (arr == null || end - first < 1) {\\n    \\t\\t\\treturn true;\\n    \\t\\t}\\n    \\t\\tint root = arr[first];\\n    \\t\\tint index = first + 1;\\n    \\t\\twhile (index <= end && arr[index] < root) {\\n    \\t\\t\\tindex++;\\n    \\t\\t}\\n    \\t\\tint tmp = index;\\n    \\t\\twhile (index <= end) {\\n    \\t\\t\\tif (arr[index] < root) {\\n    \\t\\t\\t\\treturn false;\\n    \\t\\t\\t}\\n    \\t\\t\\tindex++;\\n    \\t\\t}\\n    \\t\\tboolean left = helper(arr, first + 1, tmp - 1);\\n    \\t\\tboolean right = helper(arr, tmp, end);\\n    \\t\\treturn left && right;\\n    \\t}"
		},
		{
			"lc_ans_id":"68146",
			"view":"81",
			"top":"8",
			"title":"Recursive Solution, Time complexity O(n)",
			"vote":"2",
			"content":"```\\nbool verifyPreorder(vector<int>& preorder, int &start, int min, int max) {\\n  if(start >= preorder.size()) return true;\\n  if(preorder[start] < min || preorder[start] > max) {\\n    return false;\\n  }\\n  start++;\\n  /* equal elements are on LHS */\\n  return verifyPreorder(preorder, start, min, preorder[start-1]) || verifyPreorder(preorder, start, preorder[start-1] + 1, max);\\n}\\n\\nbool verifyPreorder(vector<int>& preorder) {\\n  int start = 0;\\n  return verifyPreorder(preorder, start, INT_MIN, INT_MAX);\\n}\\n```"
		},
		{
			"lc_ans_id":"68165",
			"view":"158",
			"top":"9",
			"title":"Clean c++ dfs solution",
			"vote":"2",
			"content":"Go left as far as possible, then go right\\n```\\nbool verifyPreorder(vector<int>& preorder) {\\n    int index = 0;\\n    verifyPreorder(preorder, index, INT_MIN, INT_MAX);\\n    return index == preorder.size();\\n}\\n\\nvoid verifyPreorder(vector<int>& preorder, int &index, int low, int high) {\\n    if (index == preorder.size() || preorder[index] < low || preorder[index] > high)\\n        return;\\n    int current = preorder[index++];\\n    verifyPreorder(preorder, index, low, current - 1);\\n    verifyPreorder(preorder, index, current + 1, high);\\n}\\n```"
		}
	],
	"id":"255",
	"title":"Verify Preorder Sequence in Binary Search Tree",
	"content":"<p>Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.</p>\r\n\r\n<p>You may assume each number in the sequence is unique.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you do it using only constant space complexity?</p>",
	"frequency":"214",
	"ac_num":"23551"
}