{
	"difficulty":"1",
	"submit_num":"112248",
	"show_id":"270",
	"leetcode_id":"270",
	"answers":[
		{
			"lc_ans_id":"70327",
			"view":"20524",
			"top":"0",
			"title":"4-7 lines recursive/iterative Ruby/C++/Java/Python",
			"vote":"103",
			"content":"Same recursive/iterative solution in different languages.\\n\\n---\\n\\nRecursive\\n===\\n\\nClosest is either the root's value (`a`) or the closest in the appropriate subtree (`b`).\\n\\n**Ruby**\\n\\n    def closest_value(root, target)\\n      a = root.val\\n      kid = target < a ? root.left : root.right or return a\\n      b = closest_value(kid, target)\\n      [b, a].min_by { |x| (x - target).abs }\\n    end\\n\\n**C++**\\n\\n    int closestValue(TreeNode* root, double target) {\\n        int a = root->val;\\n        auto kid = target < a ? root->left : root->right;\\n        if (!kid) return a;\\n        int b = closestValue(kid, target);\\n        return abs(a - target) < abs(b - target) ? a : b;\\n    }\\n\\n**Java**\\n\\n    public int closestValue(TreeNode root, double target) {\\n        int a = root.val;\\n        TreeNode kid = target < a ? root.left : root.right;\\n        if (kid == null) return a;\\n        int b = closestValue(kid, target);\\n        return Math.abs(a - target) < Math.abs(b - target) ? a : b;\\n    }\\n\\n**Python**\\n\\n    def closestValue(self, root, target):\\n        a = root.val\\n        kid = root.left if target < a else root.right\\n        if not kid: return a\\n        b = self.closestValue(kid, target)\\n        return min((b, a), key=lambda x: abs(target - x))\\n\\nAlternative endings:\\n\\n        return (b, a)[abs(a - target) < abs(b - target)]\\n        return a if abs(a - target) < abs(b - target) else b\\n\\n---\\n\\nIterative\\n===\\n\\nWalk the path down the tree close to the target, return the closest value on the path. Inspired by [yd](https://leetcode.com/discuss/54436/java-iterative-solution), I wrote these after reading \"while loop\".\\n\\n**Ruby**\\n\\n    def closest_value(root, target)\\n      path = []\\n      while root\\n        path << root.val\\n        root = target < root.val ? root.left : root.right\\n      end\\n      path.reverse.min_by { |x| (x - target).abs }\\n    end\\n\\nThe `.reverse` is only for handling targets much larger than 32-bit integer range, where different path values x have the same \"distance\" `(x - target).abs`. In such cases, the leaf value is the correct answer. If such large targets aren't asked, then it's unnecessary.\\n\\nOr with O(1) space:\\n\\n    def closest_value(root, target)\\n      closest = root.val\\n      while root\\n        closest = [root.val, closest].min_by { |x| (x - target).abs }\\n        root = target < root.val ? root.left : root.right\\n      end\\n      closest\\n    end\\n\\n**C++**\\n\\n    int closestValue(TreeNode* root, double target) {\\n        int closest = root->val;\\n        while (root) {\\n            if (abs(closest - target) >= abs(root->val - target))\\n                closest = root->val;\\n            root = target < root->val ? root->left : root->right;\\n        }\\n        return closest;\\n    }\\n\\n**Python**\\n\\n    def closestValue(self, root, target):\\n        path = []\\n        while root:\\n            path += root.val,\\n            root = root.left if target < root.val else root.right\\n        return min(path[::-1], key=lambda x: abs(target - x))\\n\\nThe `[::-1]` is only for handling targets much larger than 32-bit integer range, where different path values x have the same \"distance\" `(x - target).abs`. In such cases, the leaf value is the correct answer. If such large targets aren't asked, then it's unnecessary.\\n\\nOr with O(1) space:\\n\\n    def closestValue(self, root, target):\\n        closest = root.val\\n        while root:\\n            closest = min((root.val, closest), key=lambda x: abs(target - x))\\n            root = root.left if target < root.val else root.right\\n        return closest"
		},
		{
			"lc_ans_id":"70331",
			"view":"10299",
			"top":"1",
			"title":"Clean and concise java solution",
			"vote":"92",
			"content":"    public int closestValue(TreeNode root, double target) {\\n        int ret = root.val;   \\n        while(root != null){\\n            if(Math.abs(target - root.val) < Math.abs(target - ret)){\\n                ret = root.val;\\n            }      \\n            root = root.val > target? root.left: root.right;\\n        }     \\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"70392",
			"view":"3493",
			"top":"2",
			"title":"Simple iterative Java solution with explaination",
			"vote":"16",
			"content":"    public int closestValue(TreeNode root, double target) {\\n            int closestVal = root.val; \\n            while(root != null){ \\n                //update closestVal if the current value is closer to target\\n                closestVal = (Math.abs(target - root.val) < Math.abs(target - closestVal))? root.val : closestVal;\\n                if(closestVal == target){   //already find the best result\\n                    return closestVal;\\n                }\\n                root = (root.val > target)? root.left: root.right;   //binary search\\n            }\\n            return closestVal;\\n      }"
		},
		{
			"lc_ans_id":"70321",
			"view":"1362",
			"top":"3",
			"title":"Clean python code",
			"vote":"15",
			"content":"    class Solution(object):\\n        def closestValue(self, root, target):\\n            r = root.val\\n            while root:\\n                if abs(root.val - target) < abs(r - target):\\n                    r = root.val\\n                root = root.left if target < root.val else root.right\\n            return r"
		},
		{
			"lc_ans_id":"70322",
			"view":"1823",
			"top":"4",
			"title":"Super clean recursive Java solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public int closestValue(TreeNode root, double target) {\\n            return closest(root, target, root.val);\\n        }\\n        \\n        private int closest(TreeNode node, double target, int val) {\\n            if (node == null) return val;\\n            if (Math.abs(node.val - target) < Math.abs(val - target)) val = node.val;\\n            if (node.val < target) val = closest(node.right, target, val);\\n            else if (node.val > target) val = closest(node.left, target, val);\\n            return val;\\n        }\\n    }\\n\\nIterative solution is definitely better though."
		},
		{
			"lc_ans_id":"70386",
			"view":"1752",
			"top":"5",
			"title":"Java iterative solution",
			"vote":"8",
			"content":"Basic idea: In a while loop, calculate min for the current root and update the closest value when necessary. Depending on whether root node is smaller or larger than the target, go to the right or the left branch.\\n\\n    public int closestValue(TreeNode root, double target) {\\n        double closest = Integer.MAX_VALUE;\\n        int value = 0;\\n        TreeNode current = root;\\n        while (current != null) {\\n            if (closest > Math.abs(current.val-target)) {\\n                closest = Math.abs(current.val-target);\\n                value = current.val;\\n            }\\n            \\n            if (current.val < target) {\\n                current = current.right;\\n            } else if (current.val > target) {\\n                current = current.left;\\n            } else {\\n                break;\\n            }\\n        }\\n        return value;\\n    }"
		},
		{
			"lc_ans_id":"70401",
			"view":"991",
			"top":"6",
			"title":"C++ recursive and iterative solution",
			"vote":"6",
			"content":"Recursive:\\n\\n    class Solution {\\n    public:\\n        void getResult(TreeNode *node, double target, double &result){\\n            if(!node)return;\\n            if(abs((double)node->val-target)<abs(target-result))result=(double)node->val;\\n            if((double)node->val>target)\\n                getResult(node->left,target,result);\\n            else if((double)node->val<target)\\n                getResult(node->right,target,result);\\n        }\\n        int closestValue(TreeNode* root, double target) {\\n            double result=(double)root->val;\\n            getResult(root,target,result);\\n            return (int)result;\\n        }\\n    };\\n\\nIterative:\\n\\n    class Solution {\\n    public:\\n        int closestValue(TreeNode* root, double target) {\\n            int result=root->val;\\n            while(root){\\n                if((double)root->val==target)return root->val;\\n                if(abs((double)root->val-target)<abs(result-target))\\n                    result=root->val;\\n                if(root->val>target)root=root->left;\\n                else root=root->right;\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"70380",
			"view":"848",
			"top":"7",
			"title":"Java iterative and recursive solutions",
			"vote":"4",
			"content":"Sharing the iterative and recursion solution for this problem.  This problem is basically finding the predecessor and successor of a given value in the BST, and returning the one that has the smaller difference.  The iterative solution is a bit long, suggestion to shorten it is welcome.\\n\\n\\n    public int closestValue(TreeNode root, double target) {\\n            TreeNode greater = null;\\n            TreeNode smaller = null;\\n            while(root != null) {\\n                if(root.val == target) {\\n                    return root.val;\\n                } else if(root.val < target) {\\n                    smaller = root;\\n                    root = root.right;\\n                } else {\\n                    greater = root;\\n                    root = root.left;\\n                }\\n            }\\n            if(greater == null) {\\n                return smaller.val;\\n            }\\n            if(smaller == null) {\\n                return greater.val;\\n            }\\n            return (greater.val - target) < (target - smaller.val) ? greater.val : smaller.val;\\n        }\\n    // iterative\\n    \\n    public int closestValue(TreeNode root, double target) {\\n            TreeNode kid = root.val < target ? root.right : root.left;\\n            if(kid == null) {\\n                return root.val;\\n            }\\n            int k = closestValue(kid, target);\\n            return Math.abs(root.val - target) < Math.abs(k - target) ? root.val : k;\\n        }\\n    // recursion"
		},
		{
			"lc_ans_id":"70356",
			"view":"479",
			"top":"8",
			"title":"Easy to follow Java recursive solution.",
			"vote":"3",
			"content":"```\\npublic int closestValue(TreeNode root, double target) {\\n\\t\\tint temp = 0;\\n\\t\\tif (root.val > target && root.left != null) {\\n\\t\\t\\ttemp = closestValue(root.left, target); // go left.\\n\\t\\t\\treturn Math.abs(temp - target) > Math.abs(root.val - target) ? root.val : temp; // check condition.\\n\\t\\t} else if (root.right != null){\\n\\t\\t\\ttemp = closestValue(root.right, target); // go right\\n\\t\\t\\treturn Math.abs(temp - target) > Math.abs(root.val - target) ? root.val : temp;\\n\\t\\t}\\n\\t\\telse // both left and right child == null\\n\\t\\t    return root.val;\\n\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"70384",
			"view":"702",
			"top":"9",
			"title":"Simple recursive Java AC solution",
			"vote":"3",
			"content":"    public int closestValue(TreeNode root, double target) {\\n        TreeNode parent = root;\\n        int res=-1;\\n        if(root.left==null&&root.right==null) return parent.val;\\n        if(parent.val==target\\n                    ||(parent.val>target&&parent.left==null)\\n                    ||(parent.val<target&&parent.right==null)\\n                    ||(root.left==null&&root.right==null)) return parent.val;\\n        //search left\\n        else if(parent.val>target){\\n            res = closestValue(parent.left,target);\\n        //search right\\n        }else{\\n            res = closestValue(parent.right,target);\\n        }\\n        //return the closest value\\n        return Math.abs(res-target)>Math.abs(target-parent.val)?parent.val:res;\\n    }"
		}
	],
	"id":"270",
	"title":"Closest Binary Search Tree Value",
	"content":"<p>\r\nGiven a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.\r\n</p>\r\n<p><b>Note:</b><br>\r\n<ul>\r\n<li>Given target value is a floating point.</li>\r\n<li>You are guaranteed to have only one unique value in the BST that is closest to the target.</li>\r\n</ul></p>",
	"frequency":"198",
	"ac_num":"45348"
}