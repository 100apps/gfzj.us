{
	"difficulty":"1",
	"submit_num":"426359",
	"show_id":"203",
	"leetcode_id":"203",
	"answers":[
		{
			"lc_ans_id":"57306",
			"view":"25739",
			"top":"0",
			"title":"3 line recursive solution",
			"vote":"256",
			"content":"    public ListNode removeElements(ListNode head, int val) {\\n            if (head == null) return null;\\n            head.next = removeElements(head.next, val);\\n            return head.val == val ? head.next : head;\\n    }"
		},
		{
			"lc_ans_id":"57324",
			"view":"17474",
			"top":"1",
			"title":"AC Java solution",
			"vote":"71",
			"content":"    public class Solution {\\n        public ListNode removeElements(ListNode head, int val) {\\n            ListNode fakeHead = new ListNode(-1);\\n            fakeHead.next = head;\\n            ListNode curr = head, prev = fakeHead;\\n            while (curr != null) {\\n                if (curr.val == val) {\\n                    prev.next = curr.next;\\n                } else {\\n                    prev = prev.next;\\n                }\\n                curr = curr.next;\\n            }\\n            return fakeHead.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57323",
			"view":"9006",
			"top":"2",
			"title":"Iterative short Java solution",
			"vote":"48",
			"content":"Hi guys!\\n\\nHere's an iterative solution without dummy head. \\nFirst, we shift a head of a list while its' value equals to val. \\nThen, we iterate through the nodes of the list checking if the next node's value equals to val and removing it if needed.  \\n\\n----------\\n\\n    public class Solution {\\n        public ListNode removeElements(ListNode head, int val) {\\n            while (head != null && head.val == val) head = head.next;\\n            ListNode curr = head;\\n            while (curr != null && curr.next != null)\\n                if (curr.next.val == val) curr.next = curr.next.next;\\n                else curr = curr.next;\\n            return head;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57317",
			"view":"10177",
			"top":"3",
			"title":"Simple and elegant solution in C++",
			"vote":"31",
			"content":"    ListNode *removeElements(ListNode *head, int val)\\n    {\\n        ListNode **list = &head;\\n\\n        while (*list != nullptr)\\n        {\\n            if ((*list)->val == val)\\n            {\\n                *list = (*list)->next;\\n            }\\n            else\\n            {\\n                list = &(*list)->next;\\n            }\\n        }\\n\\n        return head;\\n    }\\n\\nOriginal recursive version:\\n\\n    void removeHelper(ListNode *&head, int val)\\n    {\\n        if (head == nullptr)\\n        {\\n            return;\\n        }\\n        else if (head->val == val)\\n        {\\n            head = head->next;\\n        }\\n        else\\n        {\\n            removeHelper(head->next, val);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57331",
			"view":"5837",
			"top":"4",
			"title":"Accepted 7 line clean java solution",
			"vote":"30",
			"content":"    public ListNode removeElements(ListNode head, int val) {\\n        if (head == null) return null;\\n        ListNode pointer = head;\\n        while (pointer.next != null) {\\n            if (pointer.next.val == val) pointer.next = pointer.next.next;\\n            else pointer = pointer.next;\\n        }\\n        return head.val == val ? head.next : head;\\n    }"
		},
		{
			"lc_ans_id":"57308",
			"view":"3766",
			"top":"5",
			"title":"Concise C++ solution with pseudo ListHead",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        ListNode* removeElements(ListNode* head, int val) {\\n            ListNode *pseudo_head = new ListNode(0);\\n            pseudo_head->next = head;\\n            ListNode *cur = pseudo_head;\\n            while(cur){\\n                if(cur->next && cur->next->val == val)   cur->next = cur->next->next;\\n                else    cur = cur->next;\\n            }\\n            return pseudo_head->next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"57515",
			"view":"1449",
			"top":"6",
			"title":"An easy-understand solution with pretty fast speed",
			"vote":"13",
			"content":"    public class Solution {\\n        public ListNode removeElements(ListNode head, int val) {\\n            while(head != null && head.val == val) {\\n                head = head.next;\\n            }\\n            if(head == null) {\\n                return head;\\n            }\\n            ListNode p = head;\\n            while(p.next != null) {\\n                if(p.next.val == val) {\\n                    p.next = p.next.next;\\n                } else {\\n                    p = p.next;\\n                }\\n            }\\n            return head;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57514",
			"view":"2213",
			"top":"7",
			"title":"Java remove linked list elements solution",
			"vote":"12",
			"content":"public class Solution {\\n\\n    public ListNode removeElements(ListNode head, int val) {\\n\\n        ListNode dummy = new ListNode(1);\\n        ListNode i = dummy;\\n        ListNode j = head;\\n        dummy.next = head;\\n        \\n        while(j != null){\\n            if(j.val == val){\\n                i.next = i.next.next;\\n                j = j.next;\\n            }else{\\n                i = i.next;\\n                j = j.next;\\n            }\\n        }\\n        \\n        return dummy.next;\\n    }\\n}"
		},
		{
			"lc_ans_id":"57312",
			"view":"3964",
			"top":"8",
			"title":"Python solution",
			"vote":"12",
			"content":"    class Solution:\\n    # @param {ListNode} head\\n    # @param {integer} val\\n    # @return {ListNode}\\n    def removeElements(self, head, val):\\n        dummy = ListNode(-1)\\n        dummy.next = head\\n        next = dummy\\n        \\n        while next != None and next.next != None:\\n            if next.next.val == val:\\n                next.next = next.next.next\\n            else:\\n                next = next.next\\n            \\n        return dummy.next"
		},
		{
			"lc_ans_id":"57523",
			"view":"745",
			"top":"9",
			"title":"Pointer of Level two",
			"vote":"11",
			"content":"It's only intresting when implemented by \"[Two star programming][1]\"!\\n\\n    class Solution {\\n    public:\\n        ListNode* removeElements(ListNode* head, int val) {\\n    \\t\\tListNode **p = &head;\\n    \\t\\twhile(*p != NULL)\\n    \\t\\t{\\n    \\t\\t\\tif((*p)->val == val) \\n    \\t\\t\\t\\t*p = (*p)->next;\\n    \\t\\t\\telse\\n    \\t\\t\\t\\tp = &((*p)->next);\\n    \\t\\t}\\n    \\t\\treturn head;\\n        }\\n    };\\n\\n\\n  [1]: http://wordaligned.org/articles/two-star-programming"
		}
	],
	"id":"203",
	"title":"Remove Linked List Elements",
	"content":"<p>Remove all elements from a linked list of integers that have value <b><i>val</i></b>.</p>\r\n<p>\r\n<b>Example</b><br>\r\n<i><b>Given:</b></i> 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6,  <b><i>val</i></b> = 6<br>\r\n<i><b>Return:</b></i> 1 --> 2 --> 3 --> 4 --> 5\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/mithmatt\">@mithmatt</a> for adding this problem and creating all test cases.</p>",
	"frequency":"423",
	"ac_num":"141442"
}