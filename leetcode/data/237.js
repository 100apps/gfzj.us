{
	"difficulty":"1",
	"submit_num":"398902",
	"show_id":"237",
	"leetcode_id":"237",
	"answers":[
		{
			"lc_ans_id":"65455",
			"view":"37360",
			"top":"0",
			"title":"1-3 lines, C++/Java/Python/C/C#/JavaScript/Ruby",
			"vote":"132",
			"content":"We can't really delete the node, but we can kinda achieve the same effect by instead removing the **next** node after copying its data into the node that we were asked to delete.\\n\\n**C++**\\n\\n    void deleteNode(ListNode* node) {\\n        *node = *node->next;\\n    }\\n\\nBut better properly delete the next node:\\n\\n    void deleteNode(ListNode* node) {\\n        auto next = node->next;\\n        *node = *next;\\n        delete next;\\n    }\\n\\n**Java and C#**\\n\\n    public void deleteNode(ListNode node) {\\n        node.val = node.next.val;\\n        node.next = node.next.next;\\n    }\\n\\n**Python**\\n\\n    def deleteNode(self, node):\\n        node.val = node.next.val\\n        node.next = node.next.next\\n\\n**C**\\n\\n    void deleteNode(struct ListNode* node) {\\n        *node = *node->next;\\n    }\\n\\nBut better properly free the next node's memory:\\n\\n    void deleteNode(struct ListNode* node) {\\n        struct ListNode* next = node->next;\\n        *node = *next;\\n        free(next);\\n    }\\n\\n**JavaScript**\\n\\n    var deleteNode = function(node) {\\n        node.val = node.next.val;\\n        node.next = node.next.next;\\n    };\\n\\n**Ruby**\\n\\n    def delete_node(node)\\n        node.val = node.next.val\\n        node.next = node.next.next\\n        nil\\n    end"
		},
		{
			"lc_ans_id":"65454",
			"view":"24863",
			"top":"1",
			"title":"Why LeetCode accepted such stupid question?",
			"vote":"103",
			"content":"This question is stupid and should be deleted intermediately."
		},
		{
			"lc_ans_id":"65464",
			"view":"18303",
			"top":"2",
			"title":"Easy solution in java",
			"vote":"52",
			"content":"    public void deleteNode(ListNode node) {\\n        node.val=node.next.val;\\n        node.next=node.next.next;\\n    }\\n\\nSince we couldn't enter the preceding node, we can not delete the given node. We can just copy the next node to the given node and delete the next one."
		},
		{
			"lc_ans_id":"65461",
			"view":"9434",
			"top":"3",
			"title":"This question is wrong.You cannot delete the node",
			"vote":"37",
			"content":"    post the answer first:\\n    class Solution {\\n    public:\\n        void deleteNode(ListNode* node) {\\n            node->val = node->next->val;\\n            node->next = node->next->next;\\n        }\\n    };\\n\\nHowever, this question is INCORRECT for sure, since you don't really \"delete\" a node, you are replacing the value. In fact, this is a terrible design leading to memory leaks almost for sure.\\n\\nI wonder what company gives such misleading question. It's better called \"modify\" a node, instead of \"deleting\". Deleting means free the memory, and the incorrect description will mislead any person with slight experience on C++."
		},
		{
			"lc_ans_id":"65482",
			"view":"6543",
			"top":"4",
			"title":"Easy question, Easy solution(JAVA)",
			"vote":"24",
			"content":"    public class Solution {\\n        public void deleteNode(ListNode node) {\\n            if(node != null && node.next != null) {\\n                node.val = node.next.val;\\n                node.next = node.next.next;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"65547",
			"view":"3940",
			"top":"5",
			"title":"My C++ solution in 1 line",
			"vote":"19",
			"content":"\\n\\n    class Solution {\\n    public:\\n        void deleteNode(ListNode* node) {\\n            *node = *(node->next);\\n        }\\n    };\\n\\nif the node should be freed, we need 3 lines: \\n\\n    class Solution {\\n    public:\\n        void deleteNode(ListNode* node) {\\n            ListNode* temp = node->next;\\n            *node = *temp;\\n            delete temp;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65542",
			"view":"2798",
			"top":"6",
			"title":"Simple java solution 1ms",
			"vote":"14",
			"content":"    public class Solution {\\n    public void deleteNode(ListNode node) {\\n       ListNode n1 = null;\\n\\t\\tn1 = node.next;\\n\\t\\tif (n1 != null) {\\n\\t\\t\\tnode.val = n1.val;\\n\\t\\t\\tnode.next = n1.next;\\n\\t\\t}\\n    }\\n}"
		},
		{
			"lc_ans_id":"65575",
			"view":"2225",
			"top":"7",
			"title":"4ms C solution (with explanation)",
			"vote":"12",
			"content":"/* Here's my simple 4ms solution\\nWe have been given a pointer to the node to be deleted. \\nWe know that while deleting a node from the linked list, we have to fix the links between the previous and the next node. The following are the steps to achieve this:\\n\\n 1. Find out the next node of the pointer to the node that we have.\\n 2. Copy the data from the next node to the node to be deleted.\\n 3. Fix the link and delete the next node\\n\\n*/\\n\\n    void deleteNode(struct ListNode* node) {\\n        struct ListNode* nextNode = node->next;\\n        node->val = nextNode->val;\\n        node->next = nextNode->next;\\n        free(nextNode);\\n    }"
		},
		{
			"lc_ans_id":"65456",
			"view":"3484",
			"top":"8",
			"title":"Python two lines solution, copy value and then delete the next node.",
			"vote":"12",
			"content":"    def deleteNode(self, node):\\n        node.val = node.next.val\\n        node.next = node.next.next"
		},
		{
			"lc_ans_id":"65565",
			"view":"1989",
			"top":"9",
			"title":"Solution in Java in 2 lines",
			"vote":"11",
			"content":"The idea is to copy the data of next node to current node and then delete the next node.\\n\\n\\n    public class Solution {\\n        public void deleteNode(ListNode node) {\\n            \\n            node.val = node.next.val;\\n            node.next = node.next.next;\\n        }\\n    }"
		}
	],
	"id":"237",
	"title":"Delete Node in a Linked List",
	"content":"<p>\r\nWrite a function to delete a node (except the tail) in a singly linked list, given only access to that node.\r\n</p>\r\n\r\n<p>\r\nSupposed the linked list is <code>1 -> 2 -> 3 -> 4</code> and you are given the third node with value <code>3</code>, the linked list should become <code>1 -> 2 -> 4</code> after calling your function.\r\n</p>",
	"frequency":"610",
	"ac_num":"188301"
}