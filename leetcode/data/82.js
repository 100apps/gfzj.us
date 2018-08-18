{
	"difficulty":"2",
	"submit_num":"423982",
	"show_id":"82",
	"leetcode_id":"82",
	"answers":[
		{
			"lc_ans_id":"28335",
			"view":"22790",
			"top":"0",
			"title":"My accepted Java code",
			"vote":"146",
			"content":"    public ListNode deleteDuplicates(ListNode head) {\\n            if(head==null) return null;\\n            ListNode FakeHead=new ListNode(0);\\n            FakeHead.next=head;\\n            ListNode pre=FakeHead;\\n            ListNode cur=head;\\n            while(cur!=null){\\n                while(cur.next!=null&&cur.val==cur.next.val){\\n                    cur=cur.next;\\n                }\\n                if(pre.next==cur){\\n                    pre=pre.next;\\n                }\\n                else{\\n                    pre.next=cur.next;\\n                }\\n                cur=cur.next;\\n            }\\n            return FakeHead.next;\\n        }"
		},
		{
			"lc_ans_id":"28339",
			"view":"7426",
			"top":"1",
			"title":"My Recursive Java Solution",
			"vote":"48",
			"content":"    public ListNode deleteDuplicates(ListNode head) {\\n        if (head == null) return null;\\n        \\n        if (head.next != null && head.val == head.next.val) {\\n            while (head.next != null && head.val == head.next.val) {\\n                head = head.next;\\n            }\\n            return deleteDuplicates(head.next);\\n        } else {\\n            head.next = deleteDuplicates(head.next);\\n        }\\n        return head;\\n    }\\n    \\n\\n\\nif current node is not unique, return deleteDuplicates with head.next. \\nIf current node is unique, link it to the result of next list made by recursive call. Any improvement?"
		},
		{
			"lc_ans_id":"28355",
			"view":"7220",
			"top":"2",
			"title":"Simple and clear c++ recursive solution",
			"vote":"37",
			"content":"\\n\\n    class Solution {\\n    public:\\n        ListNode* deleteDuplicates(ListNode* head) {\\n            if (!head) return 0;\\n            if (!head->next) return head;\\n            \\n            int val = head->val;\\n            ListNode* p = head->next;\\n            \\n            if (p->val != val) {\\n                head->next = deleteDuplicates(p);\\n                return head;\\n            } else {\\n                while (p && p->val == val) p = p->next;\\n                return deleteDuplicates(p);\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28364",
			"view":"6314",
			"top":"3",
			"title":"Java simple and clean code with comment",
			"vote":"30",
			"content":"    public class Solution {\\n    public ListNode deleteDuplicates(ListNode head) {\\n    \\t//use two pointers, slow - track the node before the dup nodes, \\n    \\t// fast - to find the last node of dups.\\n        ListNode dummy = new ListNode(0), fast = head, slow = dummy;\\n        slow.next = fast;\\n        while(fast != null) {\\n        \\twhile (fast.next != null && fast.val == fast.next.val) {\\n         \\t\\tfast = fast.next;    //while loop to find the last node of the dups.\\n        \\t}\\n        \\tif (slow.next != fast) { //duplicates detected.\\n        \\t\\tslow.next = fast.next; //remove the dups.\\n        \\t\\tfast = slow.next;     //reposition the fast pointer.\\n        \\t} else { //no dup, move down both pointer.\\n        \\t\\tslow = slow.next;\\n        \\t\\tfast = fast.next;\\n        \\t}\\n        \\t\\n        }\\n        return dummy.next;\\n    } }"
		},
		{
			"lc_ans_id":"28334",
			"view":"9609",
			"top":"4",
			"title":"Is this the best C++ solution?",
			"vote":"27",
			"content":"    class Solution {\\n    public:\\n        ListNode *deleteDuplicates(ListNode *head) {\\n            ListNode **runner = &head;\\n            \\n            if(!head || !head->next)return head;\\n            \\n            while(*runner)\\n            {\\n                if((*runner)->next && (*runner)->next->val == (*runner)->val)\\n                {\\n                    ListNode *temp = *runner;\\n                    while(temp && (*runner)->val == temp->val)\\n                        temp = temp->next;\\n                    \\n                    *runner = temp;\\n                }\\n                else\\n                    runner = &((*runner)->next);\\n            }\\n            \\n            return head;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28336",
			"view":"2830",
			"top":"5",
			"title":"Python in-place solution with dummy head node.",
			"vote":"21",
			"content":"        \\n    def deleteDuplicates(self, head):\\n        dummy = pre = ListNode(0)\\n        dummy.next = head\\n        while head and head.next:\\n            if head.val == head.next.val:\\n                while head and head.next and head.val == head.next.val:\\n                    head = head.next\\n                head = head.next\\n                pre.next = head\\n            else:\\n                pre = pre.next\\n                head = head.next\\n        return dummy.next"
		},
		{
			"lc_ans_id":"28572",
			"view":"1165",
			"top":"6",
			"title":"A short and simple Java solution",
			"vote":"12",
			"content":"    public ListNode deleteDuplicates(ListNode head) {\\n        ListNode dummy = new ListNode(0);\\n        ListNode d = dummy;\\n        while (head != null) {\\n            if (head.next != null && head.val == head.next.val) {\\n                while (head.next != null && head.val == head.next.val)\\n                    head = head.next;\\n            } else {\\n                d.next = head;\\n                d = d.next;\\n            }\\n            head = head.next;\\n        }\\n        d.next = null;\\n        return dummy.next;\\n    }\\n\\n1->1->1->2->2->3\\n\\nwe skip all the 1's and start the loop from 2\\n\\nand also skip all the 2's, and now head.val == 3;\\n\\nponit d.next to the tail, end the loop"
		},
		{
			"lc_ans_id":"28351",
			"view":"1110",
			"top":"7",
			"title":"C++ solution, simple and easy to understand",
			"vote":"8",
			"content":"Simply check if the element is duplicate. If yes, record it and use a while loop to go to the next unique element.\\n\\n    class Solution {\\n    public:\\n        ListNode* deleteDuplicates(ListNode* head) {\\n            ListNode* dummy = new ListNode(0);\\n            dummy->next = head;\\n            ListNode* cur = dummy;\\n            int duplicate;\\n            while (cur->next && cur->next->next) {\\n                if (cur->next->val == cur->next->next->val) {\\n                    duplicate = cur->next->val;\\n                    while (cur->next && cur->next->val == duplicate) {\\n                        cur->next = cur->next->next;\\n                    }\\n                }\\n                else {\\n                    cur = cur->next;\\n                }\\n            }\\n            return dummy->next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28479",
			"view":"1848",
			"top":"8",
			"title":"8ms clean C++ code",
			"vote":"6",
			"content":"This is not a hard problem, but it is also not very easy to make the code clean and neat.\\n\\n    class Solution {\\n        public:\\n            ListNode* deleteDuplicates(ListNode* head) {\\n                if( !head ) return NULL;\\n                ListNode* p = new ListNode(head->val-1), *ptr = p, *pre = p;\\n                while( head ) {\\n                    if( pre->val != head->val && (!head->next || head->next->val != head->val )) {\\n                        ptr->next = head;\\n                        ptr = ptr->next;\\n                    }\\n                    pre = head;\\n                    head = head->next;\\n                }\\n                ptr->next = NULL;\\n                return p->next;\\n            }\\n    };"
		},
		{
			"lc_ans_id":"28487",
			"view":"720",
			"top":"9",
			"title":"[recommend for beginners]C++ implementation with detailed explaination",
			"vote":"5",
			"content":"At the first glance, we can use the similar code of the simpler problem : which only delete the duplicate ones, So if we want to delete all the duplicate ones including the copy. We can use  the dummy node and the pre pointer to jump over all the duplicate nodes.\\nThe Trap is that you may ignore that when we meet the no-duplicate numbers, we should do different op based the previous states. Just like state-machine.\\nAt last but not least important, we should delete the duplicate number occurs at the end . \\n\\n    class Solution {\\n    public:\\n        ListNode* deleteDuplicates(ListNode* head) {\\n            if(!head)   return NULL;\\n            ListNode* dummy=new ListNode(INT_MAX);\\n            dummy->next=head;\\n            ListNode* pre=dummy, *cur=head, *next=head->next;\\n            bool flag=false;\\n            while(next){\\n                if(next->val==cur->val){\\n                    flag=true;\\n                    next=next->next;\\n                }\\n                else{\\n                    if(flag) {\\n                        pre->next=next;\\n                        cur=next;\\n                        next=next->next;\\n                    }\\n                    else{\\n                        pre=pre->next;\\n                        cur=cur->next;\\n                        next=next->next;\\n                    }\\n                    flag=false;\\n                }\\n            }\\n            //the corner cases : if the duplicate number locates at the end \\n            if(flag) pre->next=next;\\n            return dummy->next;\\n        }\\n    };"
		}
	],
	"id":"82",
	"title":"Remove Duplicates from Sorted List II",
	"content":"<p>\r\nGiven a sorted linked list, delete all nodes that have duplicate numbers, leaving only <i>distinct</i> numbers from the original list.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven <code>1->2->3->3->4->4->5</code>, return <code>1->2->5</code>.<br />\r\nGiven <code>1->1->1->2->3</code>, return <code>2->3</code>.\r\n</p>",
	"frequency":"284",
	"ac_num":"126510"
}