{
	"difficulty":"2",
	"submit_num":"352232",
	"show_id":"117",
	"leetcode_id":"117",
	"answers":[
		{
			"lc_ans_id":"37828",
			"view":"41757",
			"top":"0",
			"title":"O(1) space O(n) complexity Iterative Solution",
			"vote":"277",
			"content":"Just share my iterative solution with O(1) space and O(n) Time complexity\\n\\n    public class Solution {\\n        \\n        //based on level order traversal\\n        public void connect(TreeLinkNode root) {\\n    \\n            TreeLinkNode head = null; //head of the next level\\n            TreeLinkNode prev = null; //the leading node on the next level\\n            TreeLinkNode cur = root;  //current node of current level\\n    \\n            while (cur != null) {\\n                \\n                while (cur != null) { //iterate on the current level\\n                    //left child\\n                    if (cur.left != null) {\\n                        if (prev != null) {\\n                            prev.next = cur.left;\\n                        } else {\\n                            head = cur.left;\\n                        }\\n                        prev = cur.left;\\n                    }\\n                    //right child\\n                    if (cur.right != null) {\\n                        if (prev != null) {\\n                            prev.next = cur.right;\\n                        } else {\\n                            head = cur.right;\\n                        }\\n                        prev = cur.right;\\n                    }\\n                    //move to next node\\n                    cur = cur.next;\\n                }\\n                \\n                //move to next level\\n                cur = head;\\n                head = null;\\n                prev = null;\\n            }\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"37811",
			"view":"18481",
			"top":"1",
			"title":"Simple solution using constant space",
			"vote":"143",
			"content":"The idea is simple: level-order traversal.\\nYou can see the following code:\\n\\n    public class Solution {\\n        public void connect(TreeLinkNode root) {\\n            \\n            while(root != null){\\n                TreeLinkNode tempChild = new TreeLinkNode(0);\\n                TreeLinkNode currentChild = tempChild;\\n                while(root!=null){\\n                    if(root.left != null) { currentChild.next = root.left; currentChild = currentChild.next;}\\n                    if(root.right != null) { currentChild.next = root.right; currentChild = currentChild.next;}\\n                    root = root.next;\\n                }\\n                root = tempChild.next;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37813",
			"view":"11324",
			"top":"2",
			"title":"Java solution with constant space",
			"vote":"113",
			"content":"    public void connect(TreeLinkNode root) {\\n\\t    TreeLinkNode dummyHead = new TreeLinkNode(0);\\n\\t    TreeLinkNode pre = dummyHead;\\n\\t    while (root != null) {\\n\\t\\t    if (root.left != null) {\\n\\t\\t\\t    pre.next = root.left;\\n\\t\\t\\t    pre = pre.next;\\n\\t\\t    }\\n\\t\\t    if (root.right != null) {\\n\\t\\t\\t    pre.next = root.right;\\n\\t\\t\\t    pre = pre.next;\\n\\t\\t    }\\n\\t\\t    root = root.next;\\n\\t\\t    if (root == null) {\\n\\t\\t\\t    pre = dummyHead;\\n\\t\\t\\t    root = dummyHead.next;\\n\\t\\t\\t    dummyHead.next = null;\\n\\t\\t    }\\n\\t    }\\n    }"
		},
		{
			"lc_ans_id":"38015",
			"view":"6566",
			"top":"3",
			"title":"Simple 40ms c++ o(n) ,o(1) solution with only one while loop",
			"vote":"35",
			"content":"Thanks for liji94188 for adding the explanation:\\n\\nIt's a BFS traversal. now pointer is the current level traveler and head is the left most element at next level and the tail is the right most element at next level till now. We move now pointer at current level and populate the the next-link at its children level. (Here the gist is we can move now to its next because this relationship was already populated in the previous round).\\n\\n    void connect(TreeLinkNode *root) {\\n        TreeLinkNode *now, *tail, *head;\\n        \\n        now = root;\\n        head = tail = NULL;\\n        while(now)\\n        {\\n            if (now->left)\\n                if (tail) tail = tail->next =now->left;\\n                else head = tail = now->left;\\n            if (now->right)\\n                if (tail) tail = tail->next =now->right;\\n                else head = tail = now->right;\\n            if(!(now = now->next))\\n            {\\n                now = head;\\n                head = tail=NULL;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37824",
			"view":"4227",
			"top":"4",
			"title":"AC Python O(1) space solution 12 lines and easy to understand",
			"vote":"33",
			"content":"The algorithm is a BFS or level order traversal. We go through the tree level by level. node is the pointer in the parent level, tail is the tail pointer in the child level.\\nThe parent level can be view as a singly linked list or queue, which we can traversal easily with a pointer.\\nConnect the tail with every one of the possible nodes in child level, update it only if the connected node is not nil.\\nDo this one level by one level. The whole thing is quite straightforward.\\n\\n**Python**\\n\\n    def connect(self, node):\\n        tail = dummy = TreeLinkNode(0)\\n        while node:\\n            tail.next = node.left\\n            if tail.next:\\n                tail = tail.next\\n            tail.next = node.right\\n            if tail.next:\\n                tail = tail.next\\n            node = node.next\\n            if not node:\\n                tail = dummy\\n                node = dummy.next\\n\\n\\n    # 61 / 61 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 100 ms\\n    # 95.26%"
		},
		{
			"lc_ans_id":"37979",
			"view":"3003",
			"top":"5",
			"title":"O(1). Concise. Fast. What's so hard?",
			"vote":"15",
			"content":"This is definitely medium, not hard. Took me about 5 minutes, and some medium problems took me a few hours! Since you have to walk the tree in BFS order and you're given extra references to help you do just that, it's intuitive, it's simple and it's fast. The first level (root) is connected already, so you connect the next level and then you just walk through the linked list you've just created and so on.\\n\\n    public void connect(TreeLinkNode root) {\\n        for (TreeLinkNode head = root; head != null; ) {\\n            TreeLinkNode nextHead = new TreeLinkNode(0), nextTail = nextHead;\\n            for (TreeLinkNode node = head; node != null; node = node.next) {\\n                if (node.left != null) {\\n                    nextTail.next = node.left;\\n                    nextTail = node.left;\\n                }\\n                if (node.right != null) {\\n                    nextTail.next = node.right;\\n                    nextTail = node.right;\\n                }\\n            }\\n            head = nextHead.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"38035",
			"view":"1879",
			"top":"6",
			"title":"Just convert common BFS solution to O(1)  space, a simple python code",
			"vote":"12",
			"content":"common BFS\\n\\n    class Solution:\\n    # @param root, a tree link node\\n    # @return nothing\\n    def connect(self, root):\\n        if not root:\\n            return\\n        queue, level = collections.deque([root]), collections.deque()\\n        while queue:\\n            node = queue.popleft()\\n            if node.left:\\n                level.append(node.left)\\n            if node.right:\\n                level.append(node.right)\\n            node.next = queue[0] if queue else None\\n            if not queue and level:\\n                queue, level = level, queue\\n\\nO(1) space\\n\\n    class Solution:\\n    # @param root, a tree link node\\n    # @return nothing\\n    def connect(self, root):\\n        queue, level, curr = root, None, None\\n        while queue:\\n            if queue.left:\\n                if not level:\\n                    level = curr = queue.left\\n                else:\\n                    curr.next = queue.left\\n                    curr = curr.next\\n            if queue.right:\\n                if not level:\\n                    level = curr = queue.right\\n                else:\\n                    curr.next = queue.right\\n                    curr = curr.next\\n            queue = queue.next\\n            if not queue and level:\\n                queue, level, curr = level, None, None\\n\\nUse a fake head can save a few lines"
		},
		{
			"lc_ans_id":"37877",
			"view":"2064",
			"top":"7",
			"title":"O(1) space O(n) time Java solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public void connect(TreeLinkNode root) {\\n            if(root == null) return;\\n            \\n            TreeLinkNode cur = root;\\n            while(cur != null){\\n                if(cur.left != null){\\n                    cur.left.next = (cur.right != null) ? cur.right : getNext(cur);\\n                }\\n                \\n                if(cur.right != null){\\n                    cur.right.next = getNext(cur);\\n                }\\n                \\n                cur = cur.next;\\n            }\\n            \\n            connect(root.left);\\n            connect(root.right);\\n        }\\n        \\n        private TreeLinkNode getNext(TreeLinkNode root){\\n            TreeLinkNode temp = root.next;\\n            \\n            while(temp != null){\\n                if(temp.left != null) return temp.left;\\n                if(temp.right != null) return temp.right;\\n                \\n                temp = temp.next;\\n            }\\n            \\n            return null;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"37826",
			"view":"701",
			"top":"8",
			"title":"Concise python solution, 9 lines, space O(1)",
			"vote":"9",
			"content":"level by level traversal with a dummy head `prekid`. <br>\\nroot is in the current level, and kid is in the next level. `prekid.next` is the head in the kid level<br>\\n`kid = kid.next or kid` :  Update kid ONLY when we actually find its next node\\n<br><br>\\nruntime is around 96ms with a best runtime 88ms.\\n\\n\\n    def connect(self, root):\\n        prekid = kid = TreeLinkNode(0)\\n        while root:\\n            while root:\\n                kid.next = root.left\\n                kid = kid.next or kid\\n                kid.next = root.right\\n                kid = kid.next or kid\\n                root = root.next\\n            root, kid = prekid.next, prekid"
		},
		{
			"lc_ans_id":"37953",
			"view":"1998",
			"top":"9",
			"title":"C++ recursive solution, easy understanding",
			"vote":"8",
			"content":"     void connect(TreeLinkNode *root) {\\n       if (!root) return;\\n        TreeLinkNode dummy(INT_MIN);\\n        for (TreeLinkNode *cur = root, *pre = &dummy; cur; cur = cur->next) {\\n            if (cur->left) {\\n                pre->next = cur->left;\\n                pre = pre->next;\\n            }\\n            if (cur->right) {\\n                pre->next = cur->right;\\n                pre = pre->next;\\n            }\\n        }\\n        connect(dummy.next);\\n    }"
		}
	],
	"id":"117",
	"title":"Populating Next Right Pointers in Each Node II",
	"content":"<p>Follow up for problem \"<i>Populating Next Right Pointers in Each Node</i>\".</p>\r\n<p>What if the given tree could be any binary tree? Would your previous solution still work?</p>\r\n<p>\r\n<b>Note:</b>\r\n<ul><li>You may only use constant extra space.</li></ul>\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven the following binary tree,<br />\r\n<pre>\r\n         1\r\n       /  \\\r\n      2    3\r\n     / \\    \\\r\n    4   5    7\r\n</pre>\r\n</p>\r\n<p>\r\nAfter calling your function, the tree should look like:<br />\r\n<pre>\r\n         1 -> NULL\r\n       /  \\\r\n      2 -> 3 -> NULL\r\n     / \\    \\\r\n    4-> 5 -> 7 -> NULL\r\n</pre>\r\n</p>",
	"frequency":"294",
	"ac_num":"119610"
}