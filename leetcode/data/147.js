{
	"difficulty":"2",
	"submit_num":"338846",
	"show_id":"147",
	"leetcode_id":"147",
	"answers":[
		{
			"lc_ans_id":"46420",
			"view":"31133",
			"top":"0",
			"title":"An easy and clear way to sort ( O(1) space )",
			"vote":"138",
			"content":"    public ListNode insertionSortList(ListNode head) {\\n    \\t\\tif( head == null ){\\n    \\t\\t\\treturn head;\\n    \\t\\t}\\n    \\t\\t\\n    \\t\\tListNode helper = new ListNode(0); //new starter of the sorted list\\n    \\t\\tListNode cur = head; //the node will be inserted\\n    \\t\\tListNode pre = helper; //insert node between pre and pre.next\\n    \\t\\tListNode next = null; //the next node will be inserted\\n    \\t\\t//not the end of input list\\n    \\t\\twhile( cur != null ){\\n    \\t\\t\\tnext = cur.next;\\n    \\t\\t\\t//find the right place to insert\\n    \\t\\t\\twhile( pre.next != null && pre.next.val < cur.val ){\\n    \\t\\t\\t\\tpre = pre.next;\\n    \\t\\t\\t}\\n    \\t\\t\\t//insert between pre and pre.next\\n    \\t\\t\\tcur.next = pre.next;\\n    \\t\\t\\tpre.next = cur;\\n    \\t\\t\\tpre = helper;\\n    \\t\\t\\tcur = next;\\n    \\t\\t}\\n    \\t\\t\\n    \\t\\treturn helper.next;\\n    \\t}"
		},
		{
			"lc_ans_id":"46429",
			"view":"13782",
			"top":"1",
			"title":"Thoughts from a Google interviewer",
			"vote":"60",
			"content":"One of the quotes is \\n\\n> For God's sake, don't try sorting a linked list during the interview\\n\\nhttp://steve-yegge.blogspot.nl/2008/03/get-that-job-at-google.html\\n\\nSo it might be better to actually copy the values into an array and sort them there."
		},
		{
			"lc_ans_id":"46423",
			"view":"8872",
			"top":"2",
			"title":"Explained C++ solution (24ms)",
			"vote":"47",
			"content":"Well, life gets difficult pretty soon whenever the same operation on array is transferred to linked list.\\n\\nFirst, a quick recap of insertion sort:\\n\\nStart from the second element (simply `a[1]` in array and the annoying `head -> next -> val` in linked list), each time when we see a node with `val` smaller than its previous node, we scan from the `head` and find the position that the current node should be inserted. Since a node may be inserted before `head`, we create a `new_head` that points to `head`. The insertion operation, however, is a little easier for linked list.\\n\\nNow comes the code:\\n\\n    class Solution { \\n    public:\\n        ListNode* insertionSortList(ListNode* head) {\\n            ListNode* new_head = new ListNode(0);\\n            new_head -> next = head;\\n            ListNode* pre = new_head;\\n            ListNode* cur = head;\\n            while (cur) {\\n                if (cur -> next && cur -> next -> val < cur -> val) {\\n                    while (pre -> next && pre -> next -> val < cur -> next -> val)\\n                        pre = pre -> next;\\n                    /* Insert cur -> next after pre.*/\\n                    ListNode* temp = pre -> next;\\n                    pre -> next = cur -> next;\\n                    cur -> next = cur -> next -> next;\\n                    pre -> next -> next = temp;\\n                    /* Move pre back to new_head. */\\n                    pre = new_head;\\n                }\\n                else cur = cur -> next;\\n            }\\n            ListNode* res = new_head -> next;\\n            delete new_head;\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"46459",
			"view":"8197",
			"top":"3",
			"title":"Accepted Solution using JAVA",
			"vote":"34",
			"content":"    public class Solution {\\n    public ListNode insertionSortList(ListNode head) {\\n        ListNode helper=new ListNode(0);\\n        ListNode pre=helper;\\n        ListNode current=head;\\n        while(current!=null) {\\n            pre=helper;\\n            while(pre.next!=null&&pre.next.val<current.val) {\\n                pre=pre.next;\\n            }\\n            ListNode next=current.next;\\n            current.next=pre.next;\\n            pre.next=current;\\n            current=next;\\n        }\\n        return helper.next;\\n    }\\n}"
		},
		{
			"lc_ans_id":"46573",
			"view":"3653",
			"top":"4",
			"title":"Clean Java solution using a fake head",
			"vote":"24",
			"content":"    public ListNode insertionSortList(ListNode head) {\\n      ListNode curr = head, next = null;\\n      // l is a fake head\\n      ListNode l = new ListNode(0);\\n      \\n      while (curr != null) {\\n        next = curr.next;\\n        \\n        ListNode p = l;\\n        while (p.next != null && p.next.val < curr.val)\\n          p = p.next;\\n        \\n        // insert curr between p and p.next\\n        curr.next = p.next;\\n        p.next = curr;\\n        curr = next;\\n      }\\n      \\n      return l.next;\\n    }"
		},
		{
			"lc_ans_id":"46497",
			"view":"1889",
			"top":"5",
			"title":"7ms Java solution with explanation",
			"vote":"17",
			"content":"The only real modification here is to take advantage of the ability to add to both the front and end of a linked list in constant time.  A typical insertion sort would have to go through the entire array to find the new location to insert the element. If the element should be placed first in the array then we have to shift everything over.  Thankfully, with a linked list we don't need to do this.  The slight modification of keeping a pointer to the last node as well as the first dramatically increased the runtime of the algorithm.  That being said, the speedup still has a lot to do with the ordering if the items in the array.  \\n\\n    public ListNode insertionSortList(ListNode head) {\\n        if (head == null || head.next == null)\\n        {\\n            return head;\\n        }\\n\\n        ListNode sortedHead = head, sortedTail = head;\\n        head = head.next;\\n        sortedHead.next = null;\\n        \\n        while (head != null)\\n        {\\n            ListNode temp = head;\\n            head = head.next;\\n            temp.next = null;\\n            \\n            // new val is less than the head, just insert in the front\\n            if (temp.val <= sortedHead.val)\\n            {\\n                temp.next = sortedHead;\\n                sortedTail = sortedHead.next == null ? sortedHead : sortedTail;\\n                sortedHead = temp;\\n            }\\n            // new val is greater than the tail, just insert at the back\\n            else if (temp.val >= sortedTail.val)\\n            {\\n                sortedTail.next = temp;\\n                sortedTail = sortedTail.next;\\n            }\\n            // new val is somewhere in the middle, we will have to find its proper\\n            // location.\\n            else\\n            {\\n                ListNode current = sortedHead;\\n                while (current.next != null && current.next.val < temp.val)\\n                {\\n                    current = current.next;\\n                }\\n                \\n                temp.next = current.next;\\n                current.next = temp;\\n            }\\n        }\\n        \\n        return sortedHead;\\n    }"
		},
		{
			"lc_ans_id":"46419",
			"view":"2778",
			"top":"6",
			"title":"Python time limit is too tight",
			"vote":"16",
			"content":"I have basically the same code in python and java (see below). python got TLE, but java was accepted. I propose to relax the python time limit a little bit.\\n\\n**Python**\\n\\n    class Solution:\\n    # @param head, a ListNode\\n    # @return a ListNode\\n    def insertionSortList(self, head):\\n        srt = None\\n        while head:\\n            node = head\\n            head = head.next\\n            node.next = None\\n            srt = self.insertTo(srt, node)\\n        return srt\\n        \\n    def insertTo(self, head, node):\\n        node.next = head\\n        head = node\\n        while node.next and node.val > node.next.val:\\n            node.val, node.next.val = node.next.val, node.val\\n            node = node.next\\n        return head\\n\\n**java**\\n\\n    public class Solution {\\n        public ListNode insertionSortList(ListNode head) {\\n            ListNode srt = null;\\n            while (head != null) {\\n                ListNode node = head;\\n                head = head.next;\\n                node.next = null;\\n                srt = insertTo(srt, node);\\n            }\\n            return srt;\\n        }\\n        \\n        public ListNode insertTo(ListNode head, ListNode node) {\\n            node.next = head;\\n            head = node;\\n            while (node.next != null && node.val > node.next.val) {\\n                node.val = node.val ^ node.next.val;\\n                node.next.val = node.val ^ node.next.val;\\n                node.val = node.val ^ node.next.val;\\n                node = node.next;\\n            }\\n            return head;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"46432",
			"view":"2994",
			"top":"7",
			"title":"AC Python 192ms solution",
			"vote":"14",
			"content":"    def insertionSortList(self, head):\\n        p = dummy = ListNode(0)\\n        cur = dummy.next = head\\n        while cur and cur.next:\\n            val = cur.next.val\\n            if cur.val < val:\\n                cur = cur.next\\n                continue\\n            if p.next.val > val:\\n                p = dummy\\n            while p.next.val < val:\\n                p = p.next\\n            new = cur.next\\n            cur.next = new.next\\n            new.next = p.next\\n            p.next = new\\n        return dummy.next\\n\\n\\n    # 21 / 21 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 192 ms\\n    # 97.05%\\n\\nOf course, the solution is still O(n^2) in the worst case, but it can be faster than most implements under given test cases.\\n\\nTwo key points are: (1) a quick check see if the new value is already the largest (2) only refresh the search pointer p when the target is before it, in other words smaller."
		},
		{
			"lc_ans_id":"46422",
			"view":"1167",
			"top":"8",
			"title":"My C++ solution",
			"vote":"10",
			"content":"    ListNode *insertionSortList(ListNode *head)\\n    {\\n    \\tif (head == NULL || head->next == NULL)\\n    \\t\\treturn head;\\n    \\n    \\tListNode *p = head->next;\\n    \\thead->next = NULL;\\n    \\n    \\twhile (p != NULL)\\n    \\t{\\n    \\t\\tListNode *pNext = p->next;    /*store the next node to be insert*/\\n    \\t\\tListNode *q = head;\\n    \\n    \\t\\tif (p->val < q->val)    /*node p should be the new head*/\\n    \\t\\t{\\n    \\t\\t\\tp->next = q;\\n    \\t\\t\\thead = p;\\n    \\t\\t}\\n    \\t\\telse \\n    \\t\\t{\\n    \\t\\t\\twhile (q != NULL && q->next != NULL && q->next->val <= p->val)\\n    \\t\\t\\t\\tq = q->next;\\n    \\t\\t\\tp->next = q->next;\\n    \\t\\t\\tq->next = p;\\n    \\t\\t}\\n    \\n    \\t\\tp = pNext;\\n    \\t}\\n    \\treturn head;\\n    }"
		},
		{
			"lc_ans_id":"46470",
			"view":"1193",
			"top":"9",
			"title":"Concise python solution with comments",
			"vote":"8",
			"content":"    def insertionSortList(self, head):\\n        cur = dummy = ListNode(0)\\n        while head:\\n            if cur and cur.val > head.val: # reset pointer only when new number is smaller than pointer value\\n                cur = dummy\\n            while cur.next and cur.next.val < head.val: # classic insertion sort to find position\\n                cur = cur.next\\n            cur.next, cur.next.next, head = head, cur.next, head.next # insert\\n        return dummy.next"
		}
	],
	"id":"147",
	"title":"Insertion Sort List",
	"content":"<p>Sort a linked list using insertion sort.</p>",
	"frequency":"512",
	"ac_num":"113977"
}