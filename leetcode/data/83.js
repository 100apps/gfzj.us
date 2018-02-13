{
	"difficulty":"1",
	"submit_num":"544958",
	"show_id":"83",
	"leetcode_id":"83",
	"answers":[
		{
			"lc_ans_id":"28625",
			"view":"20069",
			"top":"0",
			"title":"3 Line JAVA recursive solution",
			"vote":"139",
			"content":"This solution is inspired by renzid https://leetcode.com/discuss/33043/3-line-recursive-solution\\n\\n    public ListNode deleteDuplicates(ListNode head) {\\n            if(head == null || head.next == null)return head;\\n            head.next = deleteDuplicates(head.next);\\n            return head.val == head.next.val ? head.next : head;\\n    }\\n\\nEnjoy!"
		},
		{
			"lc_ans_id":"28614",
			"view":"18214",
			"top":"1",
			"title":"My pretty solution. Java.",
			"vote":"67",
			"content":"    public class Solution {\\n        public ListNode deleteDuplicates(ListNode head) {\\n            ListNode list = head;\\n             \\n             while(list != null) {\\n            \\t if (list.next == null) {\\n            \\t\\t break;\\n            \\t }\\n            \\t if (list.val == list.next.val) {\\n            \\t\\t list.next = list.next.next;\\n            \\t } else {\\n            \\t\\t list = list.next;\\n            \\t }\\n             }\\n             \\n             return head;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"28730",
			"view":"9436",
			"top":"2",
			"title":"Concise solution and memory freeing",
			"vote":"28",
			"content":"I noticed that the solutions posted here are too long and complicated. They use unnecessary variables and/or checks etc.\\nThe solution can be much more concise. Here is my solution:\\n\\n    class Solution {\\n    public:\\n        ListNode *deleteDuplicates(ListNode *head) {\\n            ListNode* cur = head;\\n            while (cur) {\\n                while (cur->next && cur->val == cur->next->val)\\n                    cur->next = cur->next->next;\\n                cur = cur->next;\\n            }\\n            return head;\\n        }\\n    };\\n\\n**Note about freeing memory**. We need to free memory when we delete a node. But don't use `delete node;` construct on an interview without discussing it with the interviewer. A list node can be allocated in many different ways and we can use `delete node;` only if we are sure that the nodes were allocated with `new TreeNode(...);`."
		},
		{
			"lc_ans_id":"28621",
			"view":"5747",
			"top":"3",
			"title":"Simple iterative Python 6 lines, 60 ms",
			"vote":"17",
			"content":"    def deleteDuplicates(self, head):\\n        cur = head\\n        while cur:\\n            while cur.next and cur.next.val == cur.val:\\n                cur.next = cur.next.next     # skip duplicated node\\n            cur = cur.next     # not duplicate of current node, move to next node\\n        return head"
		},
		{
			"lc_ans_id":"28636",
			"view":"3267",
			"top":"4",
			"title":"Clean Java solution",
			"vote":"11",
			"content":"    public ListNode deleteDuplicates(ListNode head) {\\n        if(head==null||head.next==null) return head;\\n        ListNode dummy=head;\\n        while(dummy.next!=null){\\n            if(dummy.next.val==dummy.val){\\n                dummy.next=dummy.next.next;\\n            }else dummy=dummy.next;\\n        }\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"28828",
			"view":"5481",
			"top":"5",
			"title":"One-Liner in C++ / Ruby",
			"vote":"11",
			"content":"    return h && (h->next = deleteDuplicates(h->next)) && h->next->val == h->val ? h->next : h;\\n\\nUpdate after shawnyi's comment:\\n\\nWhile the above does remove the duplicates from the list, it doesn't delete the nodes from memory, causing memory leaks. Here's a version which takes care of that.\\n\\n    if (h && (h->next = deleteDuplicates(h->next)) && h->next->val == h->val) delete h, h = h->next; return h;\\n\\nI wouldn't really write it like that, though, so it doesn't really deserve the label \"one-liner\". I guess I should've just written it in let's say Ruby in the first place, which has garbage collection. It's even shorter there anyway, since it doesn't use arrows and doesn't need the return keyword.\\n\\n    def delete_duplicates(h)\\n        h && (h.next = delete_duplicates(h.next)) && h.next.val == h.val ? h.next : h\\n    end"
		},
		{
			"lc_ans_id":"28745",
			"view":"728",
			"top":"6",
			"title":"Easy understand Java solution",
			"vote":"9",
			"content":" public ListNode deleteDuplicates(ListNode head) {\\n\\n        ListNode temp = head;\\n\\n        while(temp!=null&&temp.next!=null){\\n\\n            if(temp.val == temp.next.val){\\n\\n                temp.next = temp.next.next;\\n            }\\n            else\\n                temp = temp.next;\\n        }\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"28663",
			"view":"2087",
			"top":"7",
			"title":"Easy to understand c++ solution",
			"vote":"6",
			"content":"no need to initialize a new node\\n\\n    ListNode* deleteDuplicates(ListNode* head) {\\n            ListNode* cur = head;\\n            while(cur) {\\n            \\twhile(cur->next && cur->val == cur->next->val) {\\n            \\t\\tcur->next = cur->next->next;\\n            \\t}\\n            \\tcur = cur->next;\\n            }\\n            return head;\\n        }"
		},
		{
			"lc_ans_id":"28790",
			"view":"2140",
			"top":"8",
			"title":"[Python 109ms] Why my solution is fast than others?",
			"vote":"5",
			"content":"I just use a while loop to find duplicates. And my runtime is 109ms.\\n\\nA common runtime in python is 200ms ~ 400ms.\\n\\n    # Definition for singly-linked list.\\n    # class ListNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.next = None\\n    \\n    class Solution:\\n        # @param head, a ListNode\\n        # @return a ListNode\\n        def deleteDuplicates(self, head):\\n            if head == None:\\n                return head\\n                \\n            node = head\\n            \\n            while node.next:\\n                if node.val == node.next.val:\\n                    node.next = node.next.next\\n                else:\\n                    node = node.next\\n                    \\n            return head"
		},
		{
			"lc_ans_id":"28750",
			"view":"1845",
			"top":"9",
			"title":"4 ms C solution",
			"vote":"4",
			"content":"    if (head) {\\n        struct ListNode *p = head;\\n        while (p->next) {\\n            if (p->val != p->next->val) {\\n                p = p->next;\\n            }\\n            else {\\n                struct ListNode *tmp = p->next;\\n                p->next = p->next->next;\\n                free(tmp);\\n            }\\n        }\\n    }\\n    \\n    return head;"
		}
	],
	"id":"83",
	"title":"Remove Duplicates from Sorted List",
	"content":"<p>\r\nGiven a sorted linked list, delete all duplicates such that each element appear only <i>once</i>.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven <code>1->1->2</code>, return <code>1->2</code>.<br />\r\nGiven <code>1->1->2->3->3</code>, return <code>1->2->3</code>.\r\n</p>",
	"frequency":"422",
	"ac_num":"218905"
}