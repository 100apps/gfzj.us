{
	"difficulty":"2",
	"submit_num":"354967",
	"show_id":"109",
	"leetcode_id":"109",
	"answers":[
		{
			"lc_ans_id":"35476",
			"view":"30505",
			"top":"0",
			"title":"Share my JAVA solution, 1ms, very short and concise.",
			"vote":"164",
			"content":"    public class Solution {\\n    public TreeNode sortedListToBST(ListNode head) {\\n        if(head==null) return null;\\n        return toBST(head,null);\\n    }\\n    public TreeNode toBST(ListNode head, ListNode tail){\\n        ListNode slow = head;\\n        ListNode fast = head;\\n        if(head==tail) return null;\\n        \\n        while(fast!=tail&&fast.next!=tail){\\n            fast = fast.next.next;\\n            slow = slow.next;\\n        }\\n        TreeNode thead = new TreeNode(slow.val);\\n        thead.left = toBST(head,slow);\\n        thead.right = toBST(slow.next,tail);\\n        return thead;\\n    }\\n}"
		},
		{
			"lc_ans_id":"35472",
			"view":"27830",
			"top":"1",
			"title":"Share my O(1) space and O(n) time Java code",
			"vote":"138",
			"content":"    private ListNode node;\\n    \\n    public TreeNode sortedListToBST(ListNode head) {\\n    \\tif(head == null){\\n    \\t\\treturn null;\\n    \\t}\\n    \\t\\n    \\tint size = 0;\\n    \\tListNode runner = head;\\n    \\tnode = head;\\n    \\t\\n    \\twhile(runner != null){\\n    \\t\\trunner = runner.next;\\n    \\t\\tsize ++;\\n    \\t}\\n    \\t\\n    \\treturn inorderHelper(0, size - 1);\\n    }\\n\\n    public TreeNode inorderHelper(int start, int end){\\n    \\tif(start > end){\\n    \\t\\treturn null;\\n    \\t}\\n    \\t\\n    \\tint mid = start + (end - start) / 2;\\n    \\tTreeNode left = inorderHelper(start, mid - 1);\\n    \\t\\n    \\tTreeNode treenode = new TreeNode(node.val);\\n    \\ttreenode.left = left;\\n    \\tnode = node.next;\\n\\n    \\tTreeNode right = inorderHelper(mid + 1, end);\\n    \\ttreenode.right = right;\\n    \\t\\n    \\treturn treenode;\\n    }"
		},
		{
			"lc_ans_id":"35525",
			"view":"20609",
			"top":"2",
			"title":"Share my code with O(n) time and O(1) space",
			"vote":"74",
			"content":"count is a function to calculate the size of list.\\n\\nKey words: inorder traversal.\\n\\n    class Solution {\\n    public:\\n        ListNode *list;\\n        int count(ListNode *node){\\n            int size = 0;\\n            while (node) {\\n                ++size;\\n                node = node->next;\\n            }\\n            return size;\\n        }\\n        \\n        TreeNode *generate(int n){\\n            if (n == 0)\\n                return NULL;\\n            TreeNode *node = new TreeNode(0);\\n            node->left = generate(n / 2);\\n            node->val = list->val;\\n            list = list->next;\\n            node->right = generate(n - n / 2 - 1);\\n            return node;\\n        }\\n        \\n        TreeNode *sortedListToBST(ListNode *head) {\\n            this->list = head;\\n            return generate(count(head));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35483",
			"view":"10699",
			"top":"3",
			"title":"My Accepted C++ solution",
			"vote":"60",
			"content":"    class Solution {\\n    public:\\n        TreeNode *sortedListToBST(ListNode *head)\\n        {\\n        \\treturn sortedListToBST( head, NULL );\\n        }\\n        \\n    private:\\n        TreeNode *sortedListToBST(ListNode *head, ListNode *tail)\\n        {\\n        \\tif( head == tail )\\n        \\t\\treturn NULL;\\n        \\tif( head->next == tail )    // \\n        \\t{\\t\\n        \\t\\tTreeNode *root = new TreeNode( head->val );\\n        \\t\\treturn root;\\n        \\t}\\n        \\tListNode *mid = head, *temp = head;\\n        \\twhile( temp != tail && temp->next != tail )    // \\u5bfb\\u627e\\u4e2d\\u95f4\\u8282\\u70b9\\n        \\t{\\n        \\t\\tmid = mid->next;\\n        \\t\\ttemp = temp->next->next;\\n        \\t}\\n        \\tTreeNode *root = new TreeNode( mid->val );\\n        \\troot->left = sortedListToBST( head, mid );\\n        \\troot->right = sortedListToBST( mid->next, tail );\\n        \\treturn root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35470",
			"view":"6969",
			"top":"4",
			"title":"Recursive BST construction using slow-fast traversal on linked list",
			"vote":"44",
			"content":"    public TreeNode sortedListToBST(ListNode head) {\\n        if(head == null)\\n            return null;\\n        ListNode fast = head;\\n        ListNode slow = head;\\n        ListNode prev =null; \\n        while(fast != null && fast.next != null)\\n        {\\n            fast = fast.next.next;\\n            prev =slow;\\n            slow=slow.next;\\n        }\\n        TreeNode root = new TreeNode(slow.val);\\n        if(prev != null)\\n            prev.next = null;\\n        else\\n            head  = null;\\n            \\n        root.left = sortedListToBST(head);\\n        root.right = sortedListToBST(slow.next);\\n        return root;\\n    }\\n\\nTraverse the list to get the middle element and make that the root. left side of the list forms left sub-tree and right side of the middle element forms the right sub-tree."
		},
		{
			"lc_ans_id":"35474",
			"view":"3877",
			"top":"5",
			"title":"Python recursive solution with detailed comments (operate linked-list directly).",
			"vote":"26",
			"content":"        \\n    # recursively\\n    def sortedListToBST(self, head):\\n        if not head:\\n            return \\n        if not head.next:\\n            return TreeNode(head.val)\\n        # here we get the middle point,\\n        # even case, like '1234', slow points to '2',\\n        # '3' is root, '12' belongs to left, '4' is right\\n        # odd case, like '12345', slow points to '2', '12'\\n        # belongs to left, '3' is root, '45' belongs to right\\n        slow, fast = head, head.next.next\\n        while fast and fast.next:\\n            fast = fast.next.next\\n            slow = slow.next\\n        # tmp points to root\\n        tmp = slow.next\\n        # cut down the left child\\n        slow.next = None\\n        root = TreeNode(tmp.val)\\n        root.left = self.sortedListToBST(head)\\n        root.right = self.sortedListToBST(tmp.next)\\n        return root"
		},
		{
			"lc_ans_id":"35555",
			"view":"3634",
			"top":"6",
			"title":"Clean C++ solution. Recursion. O(nlogn). With comment",
			"vote":"24",
			"content":"Recursively build tree. <br>\\n1. find midpoint by fast/slow method, use middle node as root.  <br>\\n2. build left child by first half of the list  <br>\\n3. build right child by second half of the list (head is midpoint->next)\\n\\n<pre><code><cpp>\\n    class Solution {\\n    public:\\n        TreeNode *sortedListToBST(ListNode *head) {\\n            if(!head) return NULL;\\n            if(!head->next) return new TreeNode(head->val);\\n            \\n            // fast/slow pointer to find the midpoint\\n            auto slow = head;\\n            auto fast = head;\\n            auto pre = head;\\n            while(fast && fast->next) {\\n                pre = slow;\\n                slow = slow->next;\\n                fast = fast->next->next;\\n            }\\n            pre->next = 0; // break two halves \\n            \\n            // slow is the midpoint, use as root\\n            TreeNode* root = new TreeNode(slow->val);\\n            root->left = sortedListToBST(head);\\n            root->right = sortedListToBST(slow->next);\\n            \\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35589",
			"view":"3428",
			"top":"7",
			"title":"Share My Easy Understatnd Java Solution.",
			"vote":"21",
			"content":"    public class Solution {\\n    public TreeNode sortedListToBST(ListNode head) {\\n        if(head==null)\\n            return null;\\n        ListNode slow = head;\\n        ListNode fast = head;\\n        ListNode temp=null;\\n        \\n        //find the mid node\\n        while(fast.next!=null && fast.next.next!=null){\\n            fast = fast.next.next;\\n            temp = slow;\\n            slow = slow.next;\\n        }\\n        \\n        if(temp!=null)\\n            temp.next = null; //break the link\\n        else\\n            head = null;\\n            \\n        TreeNode root = new TreeNode(slow.val);\\n        root.left = sortedListToBST(head);\\n        root.right = sortedListToBST(slow.next);\\n        return root;\\n    }\\n}"
		},
		{
			"lc_ans_id":"35636",
			"view":"1791",
			"top":"8",
			"title":"My simple Java solution",
			"vote":"11",
			"content":"\\npublic class Solution {\\n\\n    public TreeNode sortedListToBST(ListNode head) {\\n\\n        if (head == null) { return null; }\\n        if (head.next == null) { return new TreeNode(head.val); }\\n\\n        ListNode mid = head;\\n        ListNode pre_mid = null;\\n        ListNode fast = head;\\n\\n        while (true) {\\n            if (fast != null && fast.next != null) {\\n                fast = fast.next.next;\\n            } else {\\n                break;\\n            }\\n            pre_mid = mid;\\n            mid = mid.next;\\n        }\\n        if (pre_mid != null)\\n            pre_mid.next = null;\\n\\n\\n        TreeNode root = new TreeNode(mid.val);\\n        root.left = sortedListToBST(head);\\n        root.right = sortedListToBST(mid.next);\\n\\n        return root;\\n    }\\n\\n}"
		},
		{
			"lc_ans_id":"35526",
			"view":"2265",
			"top":"9",
			"title":"Python solutions (convert to array first, top-down approach, bottom-up approach)",
			"vote":"10",
			"content":"    # convert linked list to array\\n    def sortedListToBST1(self, head):\\n        ls = []\\n        while head:\\n            ls.append(head.val)\\n            head = head.next\\n        return self.helper(ls, 0, len(ls)-1)\\n\\n    def helper(self, ls, start, end):\\n        if start > end:\\n            return None\\n        if start == end:\\n            return TreeNode(ls[start])\\n        mid = (start+end) >> 1\\n        root = TreeNode(ls[mid])\\n        root.left = self.helper(ls, start, mid-1)\\n        root.right = self.helper(ls, mid+1, end)\\n        return root\\n\\n    # top-down approach, O(n*logn)\\n    def sortedListToBST2(self, head):\\n        if not head:\\n            return \\n        if not head.next:\\n            return TreeNode(head.val)\\n        dummy = ListNode(0)\\n        dummy.next = head\\n        slow, fast = dummy, head\\n        while fast and fast.next:\\n            slow = slow.next\\n            fast = fast.next.next\\n        root = TreeNode(slow.next.val)\\n        root.right = self.sortedListToBST(slow.next.next)\\n        slow.next = None\\n        root.left = self.sortedListToBST(head)\\n        return root\\n        \\n    # bottom-up approach, O(n)\\n    def sortedListToBST3(self, head):\\n        l, p = 0, head\\n        while p:\\n            l += 1\\n            p = p.next\\n        return self.convert([head], 0, l-1)\\n        \\n    def convert(self, head, start, end):\\n        if start > end:\\n            return None\\n        mid = (start + end) >> 1\\n        l = self.convert(head, start, mid-1)\\n        root = TreeNode(head[0].val)\\n        root.left = l\\n        head[0] = head[0].next \\n        root.right = self.convert(head, mid+1, end)\\n        return root\\n    \\n    # bottom-up approach, O(n)    \\n    def sortedListToBST(self, head):\\n        l, p = 0, head\\n        while p:\\n            l += 1\\n            p = p.next\\n        self.node = head\\n        return self.convert(0, l-1)\\n        \\n    def convert(self, start, end):\\n        if start > end:\\n            return None\\n        mid = (start + end) >> 1\\n        l = self.convert(start, mid-1)\\n        root = TreeNode(self.node.val)\\n        root.left = l\\n        self.node = self.node.next \\n        root.right = self.convert(mid+1, end)\\n        return root"
		}
	],
	"id":"109",
	"title":"Convert Sorted List to Binary Search Tree",
	"content":"<p>Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.</p>\r\n\r\n<p>For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of <i>every</i> node never differ by more than 1.</p>\r\n\r\n<br />\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\nGiven the sorted linked list: [-10,-3,0,5,9],\r\n\r\nOne possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:\r\n\r\n      0\r\n     / \\\r\n   -3   9\r\n   /   /\r\n -10  5\r\n</pre>\r\n</p>",
	"frequency":"396",
	"ac_num":"124594"
}