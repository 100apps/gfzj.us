{
	"difficulty":"2",
	"submit_num":"549669",
	"show_id":"138",
	"leetcode_id":"138",
	"answers":[
		{
			"lc_ans_id":"43491",
			"view":"56466",
			"top":"0",
			"title":"A solution with constant space complexity O(1) and linear time complexity O(N)",
			"vote":"323",
			"content":"An intuitive solution is to keep a hash table for each node in the list, via which we just need to iterate the list in 2 rounds respectively to create nodes and assign the values for their random pointers. As a result, the space complexity of this solution is `O(N)`, although with a linear time complexity. \\n\\nAs an optimised solution, we could reduce the space complexity into constant. ***The idea is to associate the original node with its copy node in a single linked list. In this way, we don't need extra space to keep track of the new nodes.***\\n\\nThe algorithm is composed of the follow three steps which are also 3 iteration rounds. \\n\\n 1. Iterate the original list and duplicate each node. The duplicate\\n    of each node follows its original immediately.\\n 2. Iterate the new list and assign the random pointer for each\\n    duplicated node.\\n 3. Restore the original list and extract the duplicated nodes.\\n\\nThe algorithm is implemented as follows:\\n\\n\\n\\tpublic RandomListNode copyRandomList(RandomListNode head) {\\n\\t\\tRandomListNode iter = head, next;\\n\\n\\t\\t// First round: make copy of each node,\\n\\t\\t// and link them together side-by-side in a single list.\\n\\t\\twhile (iter != null) {\\n\\t\\t\\tnext = iter.next;\\n\\n\\t\\t\\tRandomListNode copy = new RandomListNode(iter.label);\\n\\t\\t\\titer.next = copy;\\n\\t\\t\\tcopy.next = next;\\n\\n\\t\\t\\titer = next;\\n\\t\\t}\\n\\n\\t\\t// Second round: assign random pointers for the copy nodes.\\n\\t\\titer = head;\\n\\t\\twhile (iter != null) {\\n\\t\\t\\tif (iter.random != null) {\\n\\t\\t\\t\\titer.next.random = iter.random.next;\\n\\t\\t\\t}\\n\\t\\t\\titer = iter.next.next;\\n\\t\\t}\\n\\n\\t\\t// Third round: restore the original list, and extract the copy list.\\n\\t\\titer = head;\\n\\t\\tRandomListNode pseudoHead = new RandomListNode(0);\\n\\t\\tRandomListNode copy, copyIter = pseudoHead;\\n\\n\\t\\twhile (iter != null) {\\n\\t\\t\\tnext = iter.next.next;\\n\\n\\t\\t\\t// extract the copy\\n\\t\\t\\tcopy = iter.next;\\n\\t\\t\\tcopyIter.next = copy;\\n\\t\\t\\tcopyIter = copy;\\n\\n\\t\\t\\t// restore the original list\\n\\t\\t\\titer.next = next;\\n\\n\\t\\t\\titer = next;\\n\\t\\t}\\n\\n\\t\\treturn pseudoHead.next;\\n\\t}"
		},
		{
			"lc_ans_id":"43488",
			"view":"22172",
			"top":"1",
			"title":"Java O(n) solution",
			"vote":"200",
			"content":"    public RandomListNode copyRandomList(RandomListNode head) {\\n      if (head == null) return null;\\n      \\n      Map<RandomListNode, RandomListNode> map = new HashMap<RandomListNode, RandomListNode>();\\n      \\n      // loop 1. copy all the nodes\\n      RandomListNode node = head;\\n      while (node != null) {\\n        map.put(node, new RandomListNode(node.label));\\n        node = node.next;\\n      }\\n      \\n      // loop 2. assign next and random pointers\\n      node = head;\\n      while (node != null) {\\n        map.get(node).next = map.get(node.next);\\n        map.get(node).random = map.get(node.random);\\n        node = node.next;\\n      }\\n      \\n      return map.get(head);\\n    }"
		},
		{
			"lc_ans_id":"43497",
			"view":"11577",
			"top":"2",
			"title":"2 clean C++ algorithms without using extra array/hash table.  Algorithms are explained step by step.",
			"vote":"74",
			"content":"    //\\n    // Here's how the 1st algorithm goes.\\n    // Consider l1 as a node on the 1st list and l2 as the corresponding node on 2nd list.\\n    // Step 1:\\n    // Build the 2nd list by creating a new node for each node in 1st list. \\n    // While doing so, insert each new node after it's corresponding node in the 1st list.\\n    // Step 2:\\n    // The new head is the 2nd node as that was the first inserted node.\\n    // Step 3:\\n    // Fix the random pointers in the 2nd list: (Remember that l1->next is actually l2)\\n    // l2->random will be the node in 2nd list that corresponds l1->random, \\n    // which is next node of l1->random.\\n    // Step 4:\\n    // Separate the combined list into 2: Splice out nodes that are part of second list. \\n    // Return the new head that we saved in step 2.\\n    //\\n    \\n    RandomListNode *copyRandomList(RandomListNode *head) {\\n        RandomListNode *newHead, *l1, *l2;\\n        if (head == NULL) return NULL;\\n        for (l1 = head; l1 != NULL; l1 = l1->next->next) {\\n            l2 = new RandomListNode(l1->label);\\n            l2->next = l1->next;\\n            l1->next = l2;\\n        }\\n            \\n        newHead = head->next;\\n        for (l1 = head; l1 != NULL; l1 = l1->next->next) {\\n            if (l1->random != NULL) l1->next->random = l1->random->next;\\n        }\\n            \\n        for (l1 = head; l1 != NULL; l1 = l1->next) {\\n            l2 = l1->next;\\n            l1->next = l2->next;\\n            if (l2->next != NULL) l2->next = l2->next->next;\\n        }\\n    \\n        return newHead;\\n    }\\n\\n\\n    //\\n    // Here's how the 2nd algorithm goes.\\n    // Consider l1 as a node on the 1st list and l2 as the corresponding node on 2nd list.\\n    // Step 1:\\n    // Build the 2nd list by creating a new node for each node in 1st list. \\n    // While doing so, set the next pointer of the new node to the random pointer \\n    // of the corresponding node in the 1st list.  And set the random pointer of the \\n    // 1st list's node to the newly created node.\\n    // Step 2:\\n    // The new head is the node pointed to by the random pointer of the 1st list.\\n    // Step 3:\\n    // Fix the random pointers in the 2nd list: (Remember that l1->random is l2)\\n    // l2->random will be the node in 2nd list that corresponds to the node in the \\n    // 1st list that is pointed to by l2->next, \\n    // Step 4:\\n    // Restore the random pointers of the 1st list and fix the next pointers of the \\n    // 2nd list. random pointer of the node in 1st list is the next pointer of the \\n    // corresponding node in the 2nd list.  This is what we had done in the \\n    // 1st step and now we are reverting back. next pointer of the node in \\n    // 2nd list is the random pointer of the node in 1st list that is pointed to \\n    // by the next pointer of the corresponding node in the 1st list.\\n    // Return the new head that we saved in step 2.\\n    //\\n\\n    RandomListNode *copyRandomList(RandomListNode *head) {\\n        RandomListNode *newHead, *l1, *l2;\\n        if (head == NULL) return NULL;\\n\\n        for (l1 = head; l1 != NULL; l1 = l1->next) {\\n            l2 = new RandomListNode(l1->label);\\n            l2->next = l1->random;\\n            l1->random = l2;\\n        }\\n        \\n        newHead = head->random;\\n        for (l1 = head; l1 != NULL; l1 = l1->next) {\\n            l2 = l1->random;\\n            l2->random = l2->next ? l2->next->random : NULL;\\n        }\\n        \\n        for (l1 = head; l1 != NULL; l1 = l1->next) {\\n            l2 = l1->random;\\n            l1->random = l2->next;\\n            l2->next = l1->next ? l1->next->random : NULL;\\n        }\\n\\n        return newHead;\\n    }"
		},
		{
			"lc_ans_id":"43515",
			"view":"8354",
			"top":"3",
			"title":"My accepted Java code. O(n) but need to iterate the list 3 times",
			"vote":"44",
			"content":"The idea is:\\nStep 1: create a new node for each existing node and join them together\\neg: A->B->C will be A->A'->B->B'->C->C'\\n\\nStep2: copy the random links: for each new node n', n'.random = n.random.next\\n\\nStep3: detach the list: basically n.next = n.next.next; n'.next = n'.next.next\\n\\nHere is the code:\\n\\n    /**\\n     * Definition for singly-linked list with a random pointer.\\n     * class RandomListNode {\\n     *     int label;\\n     *     RandomListNode next, random;\\n     *     RandomListNode(int x) { this.label = x; }\\n     * };\\n     */\\n    public class Solution {\\n        public RandomListNode copyRandomList(RandomListNode head) {\\n            if(head==null){\\n                return null;\\n            }\\n            RandomListNode n = head;\\n            while (n!=null){\\n                RandomListNode n2 = new RandomListNode(n.label);\\n                RandomListNode tmp = n.next;\\n                n.next = n2;\\n                n2.next = tmp;\\n                n = tmp;\\n            }\\n            \\n            n=head;\\n            while(n != null){\\n                RandomListNode n2 = n.next;\\n                if(n.random != null)\\n                    n2.random = n.random.next;\\n                else\\n                    n2.random = null;\\n                n = n.next.next;\\n            }\\n            \\n            //detach list\\n            RandomListNode n2 = head.next;\\n            n = head;\\n            RandomListNode head2 = head.next;\\n            while(n2 != null && n != null){\\n                n.next = n.next.next;\\n                if (n2.next == null){\\n                    break;\\n                }\\n                n2.next = n2.next.next;\\n                \\n                n2 = n2.next;\\n                n = n.next;\\n            }\\n            return head2;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"43540",
			"view":"7456",
			"top":"4",
			"title":"Very short JAVA solution with Map",
			"vote":"26",
			"content":"I realized with Map, we don't really need to care about the internal structure of the list. What we need is just deep copy exactly what the original data. So here I just create all nodes and put <old, new> pairs into a map. Then update next and random pointers for each new node.\\n\\n    public class Solution {\\n        public RandomListNode copyRandomList(RandomListNode head) {\\n            if (head == null) {\\n                return null;\\n            }\\n            \\n            final Map<RandomListNode, RandomListNode> map = new HashMap<RandomListNode, RandomListNode>();\\n    \\n            RandomListNode cur = head;\\n            while(cur != null) {\\n                map.put(cur, new RandomListNode(cur.label));\\n                cur = cur.next;\\n            }\\n            \\n            for (Map.Entry<RandomListNode, RandomListNode> entry : map.entrySet()) {\\n                final RandomListNode newNode = entry.getValue();\\n                newNode.next = map.get(entry.getKey().next);\\n                newNode.random = map.get(entry.getKey().random);\\n            }\\n            \\n            return map.get(head);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"43485",
			"view":"3229",
			"top":"5",
			"title":"Clear and short python O(2n) and O(n) solution",
			"vote":"24",
			"content":"    class Solution:\\n    # @param head, a RandomListNode\\n    # @return a RandomListNode\\n    def copyRandomList(self, head):\\n        dic = dict()\\n        m = n = head\\n        while m:\\n            dic[m] = RandomListNode(m.label)\\n            m = m.next\\n        while n:\\n            dic[n].next = dic.get(n.next)\\n            dic[n].random = dic.get(n.random)\\n            n = n.next\\n        return dic.get(head)\\n\\nO(n)\\n\\n    class Solution:\\n    # @param head, a RandomListNode\\n    # @return a RandomListNode\\n    def copyRandomList(self, head):\\n        dic = collections.defaultdict(lambda: RandomListNode(0))\\n        dic[None] = None\\n        n = head\\n        while n:\\n            dic[n].label = n.label\\n            dic[n].next = dic[n.next]\\n            dic[n].random = dic[n.random]\\n            n = n.next\\n        return dic[head]"
		},
		{
			"lc_ans_id":"43496",
			"view":"2832",
			"top":"6",
			"title":"O(n) time O(1) Space C++",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        RandomListNode *copyRandomList(RandomListNode * head) {\\n            RandomListNode * head_cp = nullptr, * cur = head, * cur_cp = nullptr;\\n            if (head == nullptr)\\n                return nullptr;\\n            while (cur != nullptr)\\n            {\\n                cur_cp = new RandomListNode (cur->label);\\n                cur_cp->next = cur->next;\\n                cur->next = cur_cp;\\n                cur = cur_cp->next;\\n            }\\n            cur = head;\\n            while (cur != nullptr)\\n            {\\n                cur_cp = cur->next;\\n                if (cur->random)\\n                    cur_cp->random = cur->random->next;\\n                cur = cur_cp ->next;\\n            }\\n            cur = head;\\n            head_cp = head->next;\\n            while (cur != nullptr)\\n            {\\n                cur_cp = cur->next;\\n                cur->next = cur_cp->next;\\n                cur = cur->next;\\n                if (cur)\\n                    cur_cp->next = cur->next;\\n            }\\n            return head_cp;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"43567",
			"view":"2049",
			"top":"7",
			"title":"C++ simple recursive solution",
			"vote":"21",
			"content":"    class Solution {\\n\\tunordered_map<RandomListNode*, RandomListNode*> hmap;\\n\\n    public:\\n\\tRandomListNode *copyRandomList(RandomListNode *head) {\\n\\t\\tif (!head) return NULL;\\n\\t\\tif (hmap.find(head) != hmap.end())\\n\\t\\t\\treturn hmap.find(head)->second;\\n\\n\\t\\tRandomListNode* node = new RandomListNode(head->label);\\n\\t\\thmap[head] = node;\\n\\t\\tnode->next = copyRandomList(head->next);\\n\\t\\tnode->random = copyRandomList(head->random);\\n\\t\\treturn node;\\n\\t}\\n    };"
		},
		{
			"lc_ans_id":"43484",
			"view":"1027",
			"top":"8",
			"title":"C++ 6 lines recursive solution using memoization",
			"vote":"14",
			"content":"```\\nclass Solution {\\npublic:\\n    unordered_map<RandomListNode*, RandomListNode*>mp;\\n    RandomListNode *copyRandomList(RandomListNode *head) \\n    {\\n        if(!head) return NULL;\\n        if(mp[head]!=NULL) return mp[head];\\n        mp[head] = new RandomListNode(head->label);\\n        mp[head] -> next = copyRandomList(head->next);\\n        mp[head] -> random = copyRandomList(head->random);\\n        return mp[head];\\n    }\\n};"
		},
		{
			"lc_ans_id":"43661",
			"view":"2921",
			"top":"9",
			"title":"Anyone know what  Input:\\t{1,2,2,2} Output:\\t{1,2,#,#} Expected:\\t{1,2,2,2}",
			"vote":"13",
			"content":"Does anyone know what \\n\\n\\nInput:\\t{1,2,2,2}\\nOutput:\\t{1,2,#,#}\\nExpected:\\t{1,2,2,2}\\n\\nmeans?"
		}
	],
	"id":"138",
	"title":"Copy List with Random Pointer",
	"content":"<p>\r\nA linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.\r\n</p>\r\n\r\n<p>\r\nReturn a deep copy of the list.\r\n</p>",
	"frequency":"558",
	"ac_num":"142899"
}