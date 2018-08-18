{
	"difficulty":"2",
	"submit_num":"185494",
	"show_id":"307",
	"leetcode_id":"307",
	"answers":[
		{
			"lc_ans_id":"75724",
			"view":"27006",
			"top":"0",
			"title":"17 ms Java solution with segment tree",
			"vote":"131",
			"content":"    public class NumArray {\\n    \\n        class SegmentTreeNode {\\n            int start, end;\\n            SegmentTreeNode left, right;\\n            int sum;\\n    \\n            public SegmentTreeNode(int start, int end) {\\n                this.start = start;\\n                this.end = end;\\n                this.left = null;\\n                this.right = null;\\n                this.sum = 0;\\n            }\\n        }\\n          \\n        SegmentTreeNode root = null;\\n       \\n        public NumArray(int[] nums) {\\n            root = buildTree(nums, 0, nums.length-1);\\n        }\\n    \\n        private SegmentTreeNode buildTree(int[] nums, int start, int end) {\\n            if (start > end) {\\n                return null;\\n            } else {\\n                SegmentTreeNode ret = new SegmentTreeNode(start, end);\\n                if (start == end) {\\n                    ret.sum = nums[start];\\n                } else {\\n                    int mid = start  + (end - start) / 2;             \\n                    ret.left = buildTree(nums, start, mid);\\n                    ret.right = buildTree(nums, mid + 1, end);\\n                    ret.sum = ret.left.sum + ret.right.sum;\\n                }         \\n                return ret;\\n            }\\n        }\\n       \\n        void update(int i, int val) {\\n            update(root, i, val);\\n        }\\n       \\n        void update(SegmentTreeNode root, int pos, int val) {\\n            if (root.start == root.end) {\\n               root.sum = val;\\n            } else {\\n                int mid = root.start + (root.end - root.start) / 2;\\n                if (pos <= mid) {\\n                     update(root.left, pos, val);\\n                } else {\\n                     update(root.right, pos, val);\\n                }\\n                root.sum = root.left.sum + root.right.sum;\\n            }\\n        }\\n    \\n        public int sumRange(int i, int j) {\\n            return sumRange(root, i, j);\\n        }\\n        \\n        public int sumRange(SegmentTreeNode root, int start, int end) {\\n            if (root.end == end && root.start == start) {\\n                return root.sum;\\n            } else {\\n                int mid = root.start + (root.end - root.start) / 2;\\n                if (end <= mid) {\\n                    return sumRange(root.left, start, end);\\n                } else if (start >= mid+1) {\\n                    return sumRange(root.right, start, end);\\n                }  else {    \\n                    return sumRange(root.right, mid+1, end) + sumRange(root.left, start, mid);\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"75753",
			"view":"20412",
			"top":"1",
			"title":"Java using Binary Indexed Tree with clear explanation",
			"vote":"128",
			"content":"This is to share the explanation of the BIT and the meaning of the bit operations.\\n\\n    public class NumArray {\\n\\t\\t/**\\n\\t\\t * Binary Indexed Trees (BIT or Fenwick tree):\\n\\t\\t * https://www.topcoder.com/community/data-science/data-science-\\n\\t\\t * tutorials/binary-indexed-trees/\\n\\t\\t * \\n\\t\\t * Example: given an array a[0]...a[7], we use a array BIT[9] to\\n\\t\\t * represent a tree, where index [2] is the parent of [1] and [3], [6]\\n\\t\\t * is the parent of [5] and [7], [4] is the parent of [2] and [6], and\\n\\t\\t * [8] is the parent of [4]. I.e.,\\n\\t\\t * \\n\\t\\t * BIT[] as a binary tree:\\n\\t\\t *            ______________*\\n\\t\\t *            ______*\\n\\t\\t *            __*     __*\\n\\t\\t *            *   *   *   *\\n\\t\\t * indices: 0 1 2 3 4 5 6 7 8\\n\\t\\t * \\n\\t\\t * BIT[i] = ([i] is a left child) ? the partial sum from its left most\\n\\t\\t * descendant to itself : the partial sum from its parent (exclusive) to\\n\\t\\t * itself. (check the range of \"__\").\\n\\t\\t * \\n\\t\\t * Eg. BIT[1]=a[0], BIT[2]=a[1]+BIT[1]=a[1]+a[0], BIT[3]=a[2],\\n\\t\\t * BIT[4]=a[3]+BIT[3]+BIT[2]=a[3]+a[2]+a[1]+a[0],\\n\\t\\t * BIT[6]=a[5]+BIT[5]=a[5]+a[4],\\n\\t\\t * BIT[8]=a[7]+BIT[7]+BIT[6]+BIT[4]=a[7]+a[6]+...+a[0], ...\\n\\t\\t * \\n\\t\\t * Thus, to update a[1]=BIT[2], we shall update BIT[2], BIT[4], BIT[8],\\n\\t\\t * i.e., for current [i], the next update [j] is j=i+(i&-i) //double the\\n\\t\\t * last 1-bit from [i].\\n\\t\\t * \\n\\t\\t * Similarly, to get the partial sum up to a[6]=BIT[7], we shall get the\\n\\t\\t * sum of BIT[7], BIT[6], BIT[4], i.e., for current [i], the next\\n\\t\\t * summand [j] is j=i-(i&-i) // delete the last 1-bit from [i].\\n\\t\\t * \\n\\t\\t * To obtain the original value of a[7] (corresponding to index [8] of\\n\\t\\t * BIT), we have to subtract BIT[7], BIT[6], BIT[4] from BIT[8], i.e.,\\n\\t\\t * starting from [idx-1], for current [i], the next subtrahend [j] is\\n\\t\\t * j=i-(i&-i), up to j==idx-(idx&-idx) exclusive. (However, a quicker\\n\\t\\t * way but using extra space is to store the original array.)\\n\\t\\t */\\n\\n\\t\\tint[] nums;\\n\\t\\tint[] BIT;\\n\\t\\tint n;\\n\\n\\t\\tpublic NumArray(int[] nums) {\\n\\t\\t\\tthis.nums = nums;\\n\\n\\t\\t\\tn = nums.length;\\n\\t\\t\\tBIT = new int[n + 1];\\n\\t\\t\\tfor (int i = 0; i < n; i++)\\n\\t\\t\\t\\tinit(i, nums[i]);\\n\\t\\t}\\n\\n\\t\\tpublic void init(int i, int val) {\\n\\t\\t\\ti++;\\n\\t\\t\\twhile (i <= n) {\\n\\t\\t\\t\\tBIT[i] += val;\\n\\t\\t\\t\\ti += (i & -i);\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\tvoid update(int i, int val) {\\n\\t\\t\\tint diff = val - nums[i];\\n\\t\\t\\tnums[i] = val;\\n\\t\\t\\tinit(i, diff);\\n\\t\\t}\\n\\n\\t\\tpublic int getSum(int i) {\\n\\t\\t\\tint sum = 0;\\n\\t\\t\\ti++;\\n\\t\\t\\twhile (i > 0) {\\n\\t\\t\\t\\tsum += BIT[i];\\n\\t\\t\\t\\ti -= (i & -i);\\n\\t\\t\\t}\\n\\t\\t\\treturn sum;\\n\\t\\t}\\n\\n\\t\\tpublic int sumRange(int i, int j) {\\n\\t\\t\\treturn getSum(j) - getSum(i - 1);\\n\\t\\t}\\n\\t}\\n\\n\\t// Your NumArray object will be instantiated and called as such:\\n\\t// NumArray numArray = new NumArray(nums);\\n\\t// numArray.sumRange(0, 1);\\n\\t// numArray.update(1, 10);\\n\\t// numArray.sumRange(1, 2);"
		},
		{
			"lc_ans_id":"75717",
			"view":"4358",
			"top":"2",
			"title":"C++ solution using \"buckets\". O(1) for updating and O(n^0.5) for query in the worst case (not the fast).",
			"vote":"30",
			"content":"The idea is using \\u201cbuckets\\u201d.  Assume the length of the input array is n, we can partition the whole array into m buckets, with each bucket having k=n/m elements. For each bucket, we record two kind of information: 1) a copy of elements in the bucket, 2) the sum of all the elements in the bucket.\\n\\nFor example: If the input is [0,1,2,3,4,5,6,7,8,9], and we partition it into 4 buckets, formatted as {[numbers], sum}: \\n\\n - bucket0: {[0, 1, 2], 3}\\n - bucket1: {[3, 4, 5], 12}\\n - bucket2: {[6, 7, 8], 21} \\n - bucket3: {[9], 9};\\n\\nUpdating is easy. You just need to find the right bucket, modify the element value, and change the \\u201csum\\u201d value in that bucket accordingly. The operation takes O(1) time.\\n\\nSummation is a little complicated. In the above example, let\\u2019s say we want to compute the sum in range [1, 7]. We can see, the numbers we want to accumulate are in bucket0, bucket1, and bucket2. Specifically, we only need parts of numbers in bucket0 and bucket2, and all the numbers in bucket1. Because the summation of all numbers in bucket1 have already been computed, we don\\u2019t need to compute it again. So, instead of doing (1+2) + (3+4+5) + (6+7), we can just do (1+2) + 12 + (6+7).  We save two \\u201c+\\u201d operations. If you change the size of buckets, the number of saved \\u201c+\\u201d operations will be different. The questions is:\\n\\n**What is the best size that can save the most \\u201c+\\u201d operations?**\\n\\nHere is my analysis, which might be incorrect.\\n\\nWe have:\\n\\n - The number of buckets is **m**. \\n - The size of each bucket is **k**. \\n - The length of input array is **n**, and we have **mk=n**.\\n\\nIn the worst case (the query is [0, n-1]), we will first add all the elements in bucket0, then add from bucket1 to bucket(m-2), and finally add all the elements in bucket(m-1), so we do **2k+m-2** \\u201c+\\u201d operations. We want to find the minimum value of **2k+m**. Because **2km=2n**, when **2k=m**, **2k+m** reaches the minimum value. (Need proof?) So we have **m = sqrt(2n)** and **k=sqrt(n/2)**. \\n\\nTherefore, in the worst case, the best size of bucket is **k=sqrt(n/2)**, and the complexity is **O(2k+m-2)=O(2m-2)=O(m)=O(sqrt(2n))=O(n^0.5)**;\\n\\nThank you for pointing out any mistake!\\n\\n    class NumArray {\\n    public:\\n        \\n        struct Bucket\\n        {\\n            int sum;\\n            vector<int> val;\\n        };\\n        \\n        int bucketNum;\\n        int bucketSize;\\n        vector<Bucket> Bs;\\n    \\n        NumArray(vector<int> &nums) {\\n            int size = nums.size();\\n            int bucketNum = (int)sqrt(2*size);\\n            bucketSize = bucketNum/2;\\n            while(bucketSize * bucketNum<size) ++bucketSize;\\n            \\n            Bs.resize(bucketNum);\\n            for(int i=0, k=0; i<bucketNum; ++i)\\n            {\\n                int temp = 0;\\n                Bs[i].val.resize(bucketSize);\\n                for(int j=0; j<bucketSize && k<size; ++j, ++k)\\n                {\\n                    temp += nums[k];\\n                    Bs[i].val[j] = nums[k];\\n                }\\n                Bs[i].sum = temp;\\n            }\\n        }\\n    \\n        void update(int i, int val) {\\n            int x = i / bucketSize;\\n            int y = i % bucketSize;\\n            Bs[x].sum += (val - Bs[x].val[y]);\\n            Bs[x].val[y] = val;\\n        }\\n    \\n        int sumRange(int i, int j) {\\n            int x1 = i / bucketSize;\\n            int y1 = i % bucketSize;\\n    \\t\\tint x2 = j / bucketSize;\\n            int y2 = j % bucketSize;\\n            int sum = 0;\\n    \\n    \\t\\tif(x1==x2)\\n    \\t\\t{\\n    \\t\\t\\tfor(int a=y1; a<=y2; ++a)\\n    \\t\\t\\t{\\n    \\t\\t\\t\\tsum += Bs[x1].val[a];\\n    \\t\\t\\t}\\n    \\t\\t\\treturn sum;\\n    \\t\\t}\\n    \\n    \\t\\tfor(int a=y1; a<bucketSize; ++a)\\n    \\t\\t{\\n    \\t\\t\\tsum += Bs[x1].val[a];\\n    \\t\\t}\\n            for(int a=x1+1; a<x2; ++a)\\n            {\\n                sum += Bs[a].sum;\\n            }\\n            for(int b=0; b<=y2; ++b)\\n            {\\n                sum += Bs[x2].val[b];\\n            }\\n            return sum;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"75802",
			"view":"7145",
			"top":"3",
			"title":"\"0 lines\" Python",
			"vote":"28",
			"content":"    class NumArray(object):\\n        def __init__(self, nums):\\n            self.update = nums.__setitem__\\n            self.sumRange = lambda i, j: sum(nums[i:j+1])\\n\\nI added two lines, but I also removed two lines, so zero overall, right? Just kidding :-P\\n\\nNot a serious solution, just showing some Python trickery. The `sumRange` takes linear time, but due to the test suite being weak, this solution gets accepted (in about 1200-1300ms)."
		},
		{
			"lc_ans_id":"75730",
			"view":"2185",
			"top":"4",
			"title":"148ms Python solution, Binary Indexed Tree",
			"vote":"21",
			"content":"Use `self.c` to represent Binary Indexed Tree. Section sums are stored in `self.c[1..len(nums)]`. `x & -x` is `lowbit` function, which will return x's rightmost bit 1, e.g. lowbit(7) = 1, lowbit(20) = 4.\\n\\nself.c[1] = nums[0]\\n\\nself.c[2] = nums[0] + nums[1]\\n\\nself.c[3] = nums[2]\\n\\nself.c[4] = nums[0] + nums[1] + nums[2] + nums[3]\\n\\nself.c[5] = nums[4]\\n\\nself.c[6] = nums[4] + nums[5]\\n\\nself.c[7] = nums[6]\\n\\nself.c[8] = nums[0] + nums[1] + nums[2] + nums[3] + nums[4] + nums[5] + nums[6] + nums[7]\\n\\n    class NumArray(object):\\n        def __init__(self, nums):\\n            self.n = len(nums)\\n            self.a, self.c = nums, [0] * (self.n + 1)\\n            for i in range(self.n):\\n                k = i + 1\\n                while k <= self.n:\\n                    self.c[k] += nums[i]\\n                    k += (k & -k)\\n    \\n        def update(self, i, val):\\n            diff, self.a[i] = val - self.a[i], val\\n            i += 1\\n            while i <= self.n:\\n                self.c[i] += diff\\n                i += (i & -i)\\n    \\n        def sumRange(self, i, j):\\n            res, j = 0, j + 1\\n            while j:\\n                res += self.c[j]\\n                j -= (j & -j)\\n            while i:\\n                res -= self.c[i]\\n                i -= (i & -i)\\n            return res"
		},
		{
			"lc_ans_id":"75711",
			"view":"5421",
			"top":"5",
			"title":"C++, Segment Tree,update and sum are both O(logn)",
			"vote":"20",
			"content":"    struct SegmentTreeNode {\\n        int start, end, sum;\\n        SegmentTreeNode* left;\\n        SegmentTreeNode* right;\\n        SegmentTreeNode(int a, int b):start(a),end(b),sum(0),left(nullptr),right(nullptr){}\\n    };\\n    class NumArray {\\n        SegmentTreeNode* root;\\n    public:\\n        NumArray(vector<int> &nums) {\\n            int n = nums.size();\\n            root = buildTree(nums,0,n-1);\\n        }\\n       \\n        void update(int i, int val) {\\n            modifyTree(i,val,root);\\n        }\\n    \\n        int sumRange(int i, int j) {\\n            return queryTree(i, j, root);\\n        }\\n        SegmentTreeNode* buildTree(vector<int> &nums, int start, int end) {\\n            if(start > end) return nullptr;\\n            SegmentTreeNode* root = new SegmentTreeNode(start,end);\\n            if(start == end) {\\n                root->sum = nums[start];\\n                return root;\\n            }\\n            int mid = start + (end - start) / 2;\\n            root->left = buildTree(nums,start,mid);\\n            root->right = buildTree(nums,mid+1,end);\\n            root->sum = root->left->sum + root->right->sum;\\n            return root;\\n        }\\n        int modifyTree(int i, int val, SegmentTreeNode* root) {\\n            if(root == nullptr) return 0;\\n            int diff;\\n            if(root->start == i && root->end == i) {\\n                diff = val - root->sum;\\n                root->sum = val;\\n                return diff;\\n            }\\n            int mid = (root->start + root->end) / 2;\\n            if(i > mid) {\\n                diff = modifyTree(i,val,root->right);\\n            } else {\\n                diff = modifyTree(i,val,root->left);\\n            }\\n            root->sum = root->sum + diff;\\n            return diff;\\n        }\\n        int queryTree(int i, int j, SegmentTreeNode* root) {\\n            if(root == nullptr) return 0;\\n            if(root->start == i && root->end == j) return root->sum;\\n            int mid = (root->start + root->end) / 2;\\n            if(i > mid) return queryTree(i,j,root->right);\\n            if(j <= mid) return queryTree(i,j,root->left);\\n            return queryTree(i,mid,root->left) + queryTree(mid+1,j,root->right);\\n        }\\n    };\\n    \\n    \\n    // Your NumArray object will be instantiated and called as such:\\n    // NumArray numArray(nums);\\n    // numArray.sumRange(0, 1);\\n    // numArray.update(1, 10);\\n    // numArray.sumRange(1, 2);"
		},
		{
			"lc_ans_id":"75766",
			"view":"2838",
			"top":"6",
			"title":"Java Binary Indexed Tree",
			"vote":"15",
			"content":"Both update and getSum Complexity would be O(logn).\\n\\nBasic idea is we take the array as a tree when we initialize it where child node index equals to parent node index's last set bit - 1. When we get sum we take it as the tree where child node index equals to parent node index's last set bit + 1. \\n\\nDespite this, the general idea is similar to Range Sum Query I.\\n\\nFor detail of Binary Indexed Tree you can take a look at this link http://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/\\n\\n    public class NumArray {\\n    \\tint[] tree;\\n    \\tint[] nums;\\n    \\tint size;\\n        public NumArray(int[] nums) {\\n            this.size = nums.length;\\n            this.tree = new int[size + 1];\\n            this.nums = new int[size];\\n            this.nums = nums;\\n            for(int i = 0; i < size; i++){\\n            \\tupdateTree(i, nums[i]);\\n            }\\n        }\\n    \\n        public void updateTree(int i, int val) {\\n            i = i + 1;\\n            while(i <= size){\\n            \\ttree[i] += val;\\n            \\ti += i & (-i); // the last set bit/ Two's complement\\n            }\\n        }\\n        \\n        public void update(int i, int val){\\n            updateTree(i, val - nums[i]);\\n            nums[i] = val;\\n        }\\n    \\n        private int getSum(int i){\\n        \\tint sum = 0;\\n        \\ti = i + 1;\\n        \\twhile(i > 0){\\n        \\t\\tsum += tree[i];\\n        \\t\\ti -= i & (-i);// Another tree, go to the ancestor\\n        \\t}\\n        \\treturn sum;\\n        }\\n    \\n        public int sumRange(int i, int j){\\n            if(i == 0) return getSum(j);\\n         \\treturn getSum(j) - getSum(i - 1);\\n        }\\n    \\n      \\n    }"
		},
		{
			"lc_ans_id":"75784",
			"view":"1639",
			"top":"7",
			"title":"Python: Well commented solution using Segment Trees",
			"vote":"14",
			"content":"This solution is based on the top voted solution by  2guotou, which is in Java.\\n\\n    \"\"\"\\n        The idea here is to build a segment tree. Each node stores the left and right\\n        endpoint of an interval and the sum of that interval. All of the leaves will store\\n        elements of the array and each internal node will store sum of leaves under it.\\n        Creating the tree takes O(n) time. Query and updates are both O(log n).\\n    \"\"\"\\n    \\n    #Segment tree node\\n    class Node(object):\\n        def __init__(self, start, end):\\n            self.start = start\\n            self.end = end\\n            self.total = 0\\n            self.left = None\\n            self.right = None\\n            \\n    \\n    class NumArray(object):\\n        def __init__(self, nums):\\n            \"\"\"\\n            initialize your data structure here.\\n            :type nums: List[int]\\n            \"\"\"\\n            #helper function to create the tree from input array\\n            def createTree(nums, l, r):\\n                \\n                #base case\\n                if l > r:\\n                    return None\\n                    \\n                #leaf node\\n                if l == r:\\n                    n = Node(l, r)\\n                    n.total = nums[l]\\n                    return n\\n                \\n                mid = (l + r) // 2\\n                \\n                root = Node(l, r)\\n                \\n                #recursively build the Segment tree\\n                root.left = createTree(nums, l, mid)\\n                root.right = createTree(nums, mid+1, r)\\n                \\n                #Total stores the sum of all leaves under root\\n                #i.e. those elements lying between (start, end)\\n                root.total = root.left.total + root.right.total\\n                    \\n                return root\\n            \\n            self.root = createTree(nums, 0, len(nums)-1)\\n                \\n        def update(self, i, val):\\n            \"\"\"\\n            :type i: int\\n            :type val: int\\n            :rtype: int\\n            \"\"\"\\n            #Helper function to update a value\\n            def updateVal(root, i, val):\\n                \\n                #Base case. The actual value will be updated in a leaf.\\n                #The total is then propogated upwards\\n                if root.start == root.end:\\n                    root.total = val\\n                    return val\\n            \\n                mid = (root.start + root.end) // 2\\n                \\n                #If the index is less than the mid, that leaf must be in the left subtree\\n                if i <= mid:\\n                    updateVal(root.left, i, val)\\n                    \\n                #Otherwise, the right subtree\\n                else:\\n                    updateVal(root.right, i, val)\\n                \\n                #Propogate the changes after recursive call returns\\n                root.total = root.left.total + root.right.total\\n                \\n                return root.total\\n            \\n            return updateVal(self.root, i, val)\\n    \\n        def sumRange(self, i, j):\\n            \"\"\"\\n            sum of elements nums[i..j], inclusive.\\n            :type i: int\\n            :type j: int\\n            :rtype: int\\n            \"\"\"\\n            #Helper function to calculate range sum\\n            def rangeSum(root, i, j):\\n                \\n                #If the range exactly matches the root, we already have the sum\\n                if root.start == i and root.end == j:\\n                    return root.total\\n                \\n                mid = (root.start + root.end) // 2\\n                \\n                #If end of the range is less than the mid, the entire interval lies\\n                #in the left subtree\\n                if j <= mid:\\n                    return rangeSum(root.left, i, j)\\n                \\n                #If start of the interval is greater than mid, the entire inteval lies\\n                #in the right subtree\\n                elif i >= mid + 1:\\n                    return rangeSum(root.right, i, j)\\n                \\n                #Otherwise, the interval is split. So we calculate the sum recursively,\\n                #by splitting the interval\\n                else:\\n                    return rangeSum(root.left, i, mid) + rangeSum(root.right, mid+1, j)\\n            \\n            return rangeSum(self.root, i, j)\\n                    \\n    \\n    \\n    # Your NumArray object will be instantiated and called as such:\\n    # numArray = NumArray(nums)\\n    # numArray.sumRange(0, 1)\\n    # numArray.update(1, 10)\\n    # numArray.sumRange(1, 2)"
		},
		{
			"lc_ans_id":"75721",
			"view":"2794",
			"top":"8",
			"title":"[strongly recommend for beginners]clean C++ implementation with detailed explaination",
			"vote":"12",
			"content":"Similiar C++ implementation based others'  posts.\\n\\nI have refered to the post from GeekForGeek\\n\\n[http://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/][1] \\n\\nI think the key points are that you should set \"i++\"  and understand the relationship of the children and parents.\\n\\n***THE KEY POINTS***\\n\\n\\n***idx is some index of BIT. r is a position in idx of the last digit 1 (from left to right) in binary notation. tree[idx] is sum of frequencies from index (idx \\u2013 2^r + 1) to index idx (look at the Table 1.1 for clarification). We also write that idx is responsible for indexes from (idx - 2^r + 1) to idx (note that responsibility is the key in our algorithm and is the way of manipulating the tree).***\\n\\n***FOR EXAMPLE*** \\n\\n**Suppose we are looking for cumulative frequency of index 13 (for the first 13 elements). In binary notation, 13 is equal to 1101. Accordingly, we will calculate** \\n\\n      c[1101] = tree[1101] + tree[1100] + tree[1000] \\n\\n***HOW TO GET THE FINAL LAST SET BIT*** \\n\\nThere are times when we need to get just the last digit from a binary number, so we need an efficient way to do that. Let num be the integer whose last digit we want to isolate. In binary notation num can be represented as a1b, where a represents binary digits before the last digit and b represents zeroes after the last digit.\\n\\n     num=a1b\\n\\n    -num= (a1b)\\xaf + 1 = a\\xaf0b\\xaf + 1\\n\\n    -num = (a1b)\\xaf + 1 = a\\xaf0b\\xaf + 1 = a\\xaf0(0\\u20260)\\xaf + 1 = a\\xaf0(1\\u20261) + 1 = a\\xaf1(0\\u20260) = a\\xaf1b.\\n\\n b consists of all zeroes, so b\\xaf consists of all ones. Finally we have\\n\\n    so the last set bit  :  00..1...00 = num & -num\\n\\n\\nKey ideas -1-\\n   **get-function-details**\\n\\n   getSum(index): Returns sum of arr[0..index]\\n\\n    // Returns sum of arr[0..index] using BITree[0..n].  It assumes that\\n\\n    // BITree[] is constructed for given array arr[0..n-1]\\n\\n     1) Initialize sum as 0 and index as index+1.\\n\\n     2) Do following while index is greater than 0.\\n\\n      ...a) Add BITree[index] to sum\\n\\n      ...b) Go to parent of BITree[index].  Parent can be obtained by removing\\n\\n             the last set bit from index, i.e., index = index - (index & (-index))\\n\\n     3) Return sum.\\n\\nKey ideas -2-   **update-value-function**  \\n\\n       update(index, val): Updates BIT for operation arr[index] += val\\n\\n       // Note that arr[] is not changed here.  It changes\\n\\n      // only BI Tree for the already made change in arr[].\\n\\n       1) Initialize index as index+1.\\n\\n       2) Do following while index is smaller than or equal to n.\\n\\n          ...a) Add value to BITree[index]\\n\\n          ...b) Go to parent of BITree[index].  Parent can be obtained by removing\\n\\n                 the last set bit from index, i.e., index = index + (index & (-index))\\n\\nHere is my final implementation.\\n\\n     class NumArray {\\n        private:\\n            vector<int> _nums;\\n            vector<int> bit;\\n            \\n            int lower_bit(int i){\\n                return i&-i;\\n            }\\n            \\n            int query(int i){\\n                i++;\\n                int sum=0;\\n                while(i>0){\\n                    sum+=bit[i];\\n                    i-=lower_bit(i);\\n                }\\n                return sum;\\n            }\\n            \\n            void add(int i, int val){\\n                i++;\\n                while(i<bit.size()){\\n                    bit[i]+=val;\\n                    i+=lower_bit(i);\\n                }\\n            }\\n            \\n        public:\\n            NumArray(vector<int> &nums) : _nums(nums) {\\n                bit.resize(nums.size()+1);\\n                for(int i=0; i<nums.size(); i++){\\n                    add(i, nums[i]);\\n                }\\n            }\\n        \\n            void update(int i, int val) {\\n                if(val!=_nums[i]){\\n                    add(i, val-_nums[i]);\\n                    _nums[i]=val;\\n                }\\n            }\\n        \\n            int sumRange(int i, int j) {\\n                return query(j)-query(i-1);\\n            }\\n        };\\n\\n\\n  [1]: http://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/"
		},
		{
			"lc_ans_id":"75741",
			"view":"1635",
			"top":"9",
			"title":"Segment Tree, Binary Indexed Tree and the simple way using buffer to accelerate in C++, all quite efficient",
			"vote":"8",
			"content":"**Segment Tree**\\n\\n    struct SegmentTreeNode \\n    {\\n        int start, end, sum;\\n        SegmentTreeNode* left;\\n        SegmentTreeNode* right;\\n        SegmentTreeNode(int a, int b):start(a),end(b),sum(0),left(nullptr),right(nullptr){}\\n    };\\n    \\n    class NumArray \\n    {\\n    private:\\n        SegmentTreeNode* root;\\n        SegmentTreeNode* buildTree(vector<int> &nums, int start, int end) \\n        {\\n            if(start > end) return nullptr;\\n            SegmentTreeNode* root = new SegmentTreeNode(start,end);\\n            if(start == end) \\n            {\\n                root->sum = nums[start];\\n                return root;\\n            }\\n            int mid = start + (end - start) / 2;\\n            root->left = buildTree(nums,start,mid);\\n            root->right = buildTree(nums,mid+1,end);\\n            root->sum = root->left->sum + root->right->sum;\\n            return root;\\n        }\\n    \\n        int modifyTree(int i, int val, SegmentTreeNode* root) \\n        {\\n            if(root == nullptr) return 0;\\n            int diff;\\n            if(root->start == i && root->end == i) \\n            {\\n                diff = val - root->sum;\\n                root->sum = val;\\n                return diff;\\n            }\\n            int mid = (root->start + root->end) / 2;\\n            if(i > mid) diff = modifyTree(i,val,root->right);\\n            else diff = modifyTree(i,val,root->left);\\n            root->sum += diff;\\n            return diff;\\n        }\\n    \\n        int queryTree(int i, int j, SegmentTreeNode* root) \\n        {\\n            if(root == nullptr) return 0;\\n            if(root->start == i && root->end == j) return root->sum;\\n            int mid = (root->start + root->end) / 2;\\n            if(i > mid) return queryTree(i,j,root->right);\\n            if(j <= mid) return queryTree(i,j,root->left);\\n            return queryTree(i,mid,root->left) + queryTree(mid+1,j,root->right);\\n        }\\n    \\n    public:\\n        NumArray(vector<int> &nums) \\n        {\\n            root = buildTree(nums,0,nums.size()-1);\\n        }\\n    \\n        void update(int i, int val) \\n        {\\n            modifyTree(i,val,root);\\n        }\\n    \\n        //AC - 56ms - Segment Tree;\\n        int sumRange(int i, int j) \\n        {\\n            return queryTree(i, j, root);\\n        }\\n    };\\n    \\n----------\\n\\n**Fenwick Tree or Binary Indexed Tree**\\n    \\n    class NumArray {\\n    private:\\n        int* BIT;\\n        int size;\\n        int sum(int x)\\n        {\\n            int ret = 0;\\n            while(x)\\n            {\\n                ret += BIT[x];\\n                x-= (x&-x);\\n            }\\n            return ret;\\n        }\\n    public:\\n        NumArray(vector<int> &nums) \\n        {\\n            size = nums.size();\\n            BIT = (int*)malloc(sizeof(int)*(size+1));\\n            memset(BIT,0,sizeof(int)*(size+1));\\n            for(int i = 0; i < size; i++)\\n            update(i,nums[i]);\\n        }\\n    \\n        void update(int i, int val) \\n        {\\n            i++;\\n            val -= sum(i) - sum(i-1);\\n            while(i <= size)\\n            {\\n                BIT[i] += val;\\n                i+= (i&-i);\\n            }\\n        }\\n        \\n        //AC - 52ms - Fenwick Tree or Binary Indexed Tree;\\n        int sumRange(int i, int j) \\n        {\\n            return sum(j+1) - sum(i);\\n        }\\n    };\\n    \\n    \\n----------\\n\\n**R\\xe9guler method using buffer to accelerate**\\n    \\n    class NumArray {\\n    private:    \\n        vector<long> sums;\\n        vector<int> nums;\\n        vector<pair<int,int>> buffer;\\n    public:\\n        NumArray(vector<int> &nums) : sums(nums.size()+1, 0), nums(nums)\\n        {\\n            partial_sum(nums.begin(), nums.end(), sums.begin() + 1);\\n        }\\n        void update(int i, int val) \\n        {\\n            buffer.emplace_back(i,  val - nums[i]); //buffer.push_back(make_pair(i, val-nums[i]));\\n            nums[i] = val;        \\n            if(buffer.size() > 300) \\n            {\\n                partial_sum(nums.begin(), nums.end(), sums.begin() + 1);\\n                buffer.clear();\\n            }\\n        }\\n    \\n        //AC - 80ms - just using a buffer, dramatically reduce the time cost;\\n        int sumRange(int i, int j)\\n        {\\n            long result =  sums[j+1] - sums[i];\\n            for(const auto& p : buffer)\\n                if(p.first <=j && p.first >= i) result += p.second;\\n            return result;\\n        }\\n    };"
		}
	],
	"id":"307",
	"title":"Range Sum Query - Mutable",
	"content":"<p>Given an integer array <i>nums</i>, find the sum of the elements between indices <i>i</i> and <i>j</i> (<i>i</i> &le; <i>j</i>), inclusive.</p>\r\n\r\nThe <i>update(i, val)</i> function modifies <i>nums</i> by updating the element at index <i>i</i> to <i>val</i>.\r\n\r\n<p><b>Example:</b><br>\r\n<pre>\r\nGiven nums = [1, 3, 5]\r\n\r\nsumRange(0, 2) -> 9\r\nupdate(1, 2)\r\nsumRange(0, 2) -> 8\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The array is only modifiable by the <i>update</i> function.</li>\r\n<li>You may assume the number of calls to <i>update</i> and <i>sumRange</i> function is distributed evenly.</li>\r\n</ol>\r\n</p>",
	"frequency":"215",
	"ac_num":"40732"
}