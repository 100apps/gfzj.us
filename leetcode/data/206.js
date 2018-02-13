{
	"difficulty":"1",
	"submit_num":"659908",
	"show_id":"206",
	"leetcode_id":"206",
	"answers":[
		{
			"lc_ans_id":"58125",
			"view":"53583",
			"top":"0",
			"title":"In-place iterative and recursive Java solution",
			"vote":"245",
			"content":"    public ListNode reverseList(ListNode head) {\\n        /* iterative solution */\\n        ListNode newHead = null;\\n        while (head != null) {\\n            ListNode next = head.next;\\n            head.next = newHead;\\n            newHead = head;\\n            head = next;\\n        }\\n        return newHead;\\n    }\\n    \\n    public ListNode reverseList(ListNode head) {\\n        /* recursive solution */\\n        return reverseListInt(head, null);\\n    }\\n    \\n    private ListNode reverseListInt(ListNode head, ListNode newHead) {\\n        if (head == null)\\n            return newHead;\\n        ListNode next = head.next;\\n        head.next = newHead;\\n        return reverseListInt(next, head);\\n    }"
		},
		{
			"lc_ans_id":"58130",
			"view":"21698",
			"top":"1",
			"title":"8ms C++ Iterative and Recursive Solutions with Explanations",
			"vote":"74",
			"content":"xWell, since the `head` pointer may also be modified, we create a `new_head` that points to it to facilitate the reverse process.\\n\\nFor the example list `1 -> 2 -> 3 -> 4 -> 5` in the problem statement, it will become `0 -> 1 -> 2 -> 3 -> 4 -> 5` (we init `new_head -> val` to be `0`). Then we set a pointer `pre` to `new_head` and another `cur` to `head`. Then we keep inserting `cur -> next` after `pre` until `cur` becomes the last node. The code is follows.\\n\\n    class Solution {\\n    public:\\n        ListNode* reverseList(ListNode* head) {\\n            ListNode* new_head = new ListNode(0);\\n            new_head -> next = head;\\n            ListNode* pre = new_head;\\n            ListNode* cur = head; \\n            while (cur && cur -> next) {\\n                ListNode* temp = pre -> next;\\n                pre -> next = cur -> next;\\n                cur -> next = cur -> next -> next; \\n                pre -> next -> next = temp;\\n            }\\n            return new_head -> next;\\n        }\\n    };\\n\\n[This link][1] provides a more concise solution without using the `new_head`. The idea is to reverse one node at a time for the beginning of the list. The rewritten code is as follows.\\n\\n    class Solution {\\n    public:\\n        ListNode* reverseList(ListNode* head) {\\n            ListNode* pre = NULL;\\n            while (head) {\\n                ListNode* next = head -> next;\\n                head -> next = pre;\\n                pre = head;\\n                head = next;\\n            } \\n            return pre;\\n        }\\n    };\\n\\nWell, both of the above solutions are iterative. The hint has also suggested us to use recursion. In fact, the above link has a nice recursive solution, whose rewritten code is as follows.\\n\\n    class Solution {\\n    public:   \\n        ListNode* reverseList(ListNode* head) {\\n            if (!head || !(head -> next)) return head;\\n            ListNode* node = reverseList(head -> next);\\n            head -> next -> next = head;\\n            head -> next = NULL;\\n            return node; \\n        }\\n    }; \\n\\nThe basic idea of this recursive solution is to reverse all the following nodes after `head`. Then we need to set `head` to be the final node in the reversed list. We simply set its next node in the original list (`head -> next`) to point to it and sets its `next` to be `NULL`. \\n\\n  [1]: https://leetcode.com/discuss/34557/accepted-c-solutions-both-iteratively-and-recursively"
		},
		{
			"lc_ans_id":"58156",
			"view":"15187",
			"top":"2",
			"title":"My Java recursive solution",
			"vote":"49",
			"content":"    public class Solution {\\n        public ListNode reverseList(ListNode head) {\\n            if(head==null || head.next==null)\\n                return head;\\n            ListNode nextNode=head.next;\\n            ListNode newHead=reverseList(nextNode);\\n            nextNode.next=head;\\n            head.next=null;\\n            return newHead;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"58495",
			"view":"6302",
			"top":"3",
			"title":"Accepted C Solutions both iteratively and recursively",
			"vote":"36",
			"content":"    struct ListNode* reverseList(struct ListNode* head) {\\n    \\tif(NULL==head) return head;\\n    \\n    \\tstruct ListNode *p=head;\\n    \\tp=head->next;\\n    \\thead->next=NULL;\\n    \\twhile(NULL!=p){\\n    \\t\\tstruct ListNode *ptmp=p->next;\\n    \\t\\tp->next=head;\\n    \\t\\thead=p;\\n    \\t\\tp=ptmp;\\n    \\t}\\n    \\treturn head;\\n    }\\n\\n\\nabove is the iterative one. simple, nothing to explain.\\n----------\\n\\n\\n    struct ListNode* reverseListRe(struct ListNode* head) {\\n    \\tif(NULL==head||NULL==head->next) return head;\\n    \\n    \\tstruct ListNode *p=head->next;\\n    \\thead->next=NULL;\\n    \\tstruct ListNode *newhead=reverseListRe(p);\\n    \\tp->next=head;\\n    \\n    \\treturn newhead;\\n    }\\n\\nabove is the recursively one.Both are accepted.\\n----------"
		},
		{
			"lc_ans_id":"58127",
			"view":"12749",
			"top":"4",
			"title":"Python Iterative and Recursive Solution",
			"vote":"35",
			"content":"    class Solution:\\n    # @param {ListNode} head\\n    # @return {ListNode}\\n    def reverseList(self, head):\\n        prev = None\\n        while head:\\n            curr = head\\n            head = head.next\\n            curr.next = prev\\n            prev = curr\\n        return prev\\n\\n\\nRecursion\\n\\n    class Solution:\\n    # @param {ListNode} head\\n    # @return {ListNode}\\n    def reverseList(self, head):\\n        return self._reverse(head)\\n\\n    def _reverse(self, node, prev=None):\\n        if not node:\\n            return prev\\n        n = node.next\\n        node.next = prev\\n        return self._reverse(n, node)"
		},
		{
			"lc_ans_id":"58272",
			"view":"3815",
			"top":"5",
			"title":"Java iterative 0ms solution with explanation",
			"vote":"16",
			"content":"This seems to be a classic question that I have received multiple times in real interviews.  Typically, it is asked as a phone screen or initial screening questions.  Regardless, it can seem a bit tricky but it really doesn't take a whole lot of code to accomplish this.  \\n\\nMy solution is as follows:\\n\\n    public ListNode reverseList(ListNode head) {\\n        // is there something to reverse?\\n        if (head != null && head.next != null)\\n        {\\n            ListNode pivot = head;\\n            ListNode frontier = null;\\n            while (pivot != null && pivot.next != null)\\n            {\\n                frontier = pivot.next;\\n                pivot.next = pivot.next.next;\\n                frontier.next = head;\\n                head = frontier;\\n            }\\n        }\\n        \\n        return head;\\n    } \\n\\nThis is a very quick, O(n) reversal that times at 0ms in Leetcode OJ.  The trick is to think of the first element  as the new last item in the list.  After reversing, this must be true.  Then, we just move the element that pivot .next points to (the initial head of the list) and we move it to become the new head.  This essentially grows the list backwards until the initial pivot no longer has anything to move.  \\n\\nFor example; if we have a list [1, 2, 3, 4], the algorithm will do the following:\\n- Set pivot to 1, set frontier to 2, keep head at 1\\n- We see that pivot still has items after it, so set pivots .next to .next.next, and move the pivot to be set to the current head\\n- Now move the head back to point to the new head, which is the frontier node we just set\\n- Now reset frontier to pivots .next and repeat. \\n\\nSo with each iteration of the loop the list becomes:\\n- [1, 2, 3, 4]\\n- [2, 1, 3, 4]\\n- [3, 2, 1, 4]\\n- [4, 3, 2, 1]\\n\\nThen we return the new final head which points to 4."
		},
		{
			"lc_ans_id":"58337",
			"view":"2073",
			"top":"6",
			"title":"Fast Recursive Java solution",
			"vote":"16",
			"content":"    public class Solution {\\n        public ListNode reverseList(ListNode head) {\\n            if(head == null ||head.next == null){\\n                return head;\\n            }\\n            \\n            ListNode root = reverseList(head.next);\\n            \\n            head.next.next = head;\\n            head.next = null;\\n            return root;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"58458",
			"view":"3058",
			"top":"7",
			"title":"Iteratively and recursively Java Solution",
			"vote":"16",
			"content":"\\tpublic class Solution {\\n\\t    public ListNode reverseList(ListNode head) {\\n\\t    \\tif(head == null) return head;\\n\\t    \\t\\n\\t    \\tListNode next = head.next;\\n\\t    \\thead.next = null;\\n\\t        \\n\\t    \\twhile(next != null){\\n\\t        \\tListNode temp = next.next;\\n\\t        \\tnext.next = head;\\n\\t        \\thead = next;\\n\\t        \\tnext = temp;\\n\\t        }\\n\\t    \\treturn head;\\n\\t    }\\n\\t}\\n\\n\\n\\tpublic class Solution {\\n\\t    public ListNode reverseList(ListNode head) {\\n\\t    \\tif(head == null) return head;\\n\\t    \\tListNode next = head.next;\\n\\t    \\thead.next = null;\\n\\t    \\t\\n\\t    \\treturn recursive(head,next);\\n\\t    }\\n\\t    \\n\\t    private ListNode recursive(ListNode head, ListNode next){\\n\\t    \\tif(next == null)\\treturn head;\\n\\t    \\tListNode temp = next.next;\\n\\t    \\tnext.next = head;\\n\\t    \\treturn recursive(next,temp);\\n\\t    \\t\\n\\t    }\\n\\t}"
		},
		{
			"lc_ans_id":"58402",
			"view":"1657",
			"top":"8",
			"title":"Java solution -- recursion and iteration methods",
			"vote":"12",
			"content":"// Recursion: \\n\\n    public ListNode reverseList(ListNode head) {\\n        return helper(null, head);\\n    }\\n    \\n    ListNode helper(ListNode reversed, ListNode remaining) {\\n        if(remaining==null) return reversed;\\n        ListNode tmp = remaining.next;\\n        remaining.next = reversed;\\n        \\n        return helper(remaining, tmp);\\n    }\\n\\n// Iteration:\\n\\n    public ListNode reverseList(ListNode head) {\\n        if(head==null) return head;\\n        \\n        ListNode newhead = new ListNode(0);\\n        newhead.next = head;\\n        \\n        while(head.next!=null) {\\n            ListNode tmp = head.next;\\n            head.next = head.next.next;\\n            \\n            tmp.next = newhead.next;\\n            newhead.next = tmp;\\n        }\\n        return newhead.next;\\n    }"
		},
		{
			"lc_ans_id":"58360",
			"view":"1095",
			"top":"9",
			"title":"My 0ms 10 line java solution",
			"vote":"10",
			"content":"    public ListNode reverseList(ListNode head) {\\n        ListNode curr = null;\\n        ListNode temp = head;\\n        ListNode prev = null;\\n        while(temp != null){\\n            prev = curr;\\n            curr = temp;\\n            temp = curr.next;\\n            curr.next = prev;\\n        }\\n        return curr; \\n    }"
		}
	],
	"id":"206",
	"title":"Reverse Linked List",
	"content":"<p>Reverse a singly linked list.</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show more hints.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Hint:</b>\r\n<p>A linked list can be reversed either iteratively or recursively. Could you implement both?</p>\r\n</div>",
	"frequency":"597",
	"ac_num":"306845"
}