{
	"difficulty":"1",
	"submit_num":"355420",
	"show_id":"257",
	"leetcode_id":"257",
	"answers":[
		{
			"lc_ans_id":"68258",
			"view":"41845",
			"top":"0",
			"title":"Accepted Java simple solution in 8 lines",
			"vote":"167",
			"content":"    public List<String> binaryTreePaths(TreeNode root) {\\n        List<String> answer = new ArrayList<String>();\\n        if (root != null) searchBT(root, \"\", answer);\\n        return answer;\\n    }\\n    private void searchBT(TreeNode root, String path, List<String> answer) {\\n        if (root.left == null && root.right == null) answer.add(path + root.val);\\n        if (root.left != null) searchBT(root.left, path + root.val + \"->\", answer);\\n        if (root.right != null) searchBT(root.right, path + root.val + \"->\", answer);\\n    }"
		},
		{
			"lc_ans_id":"68282",
			"view":"13438",
			"top":"1",
			"title":"Clean Java solution (Accepted) without any helper recursive function",
			"vote":"70",
			"content":"Lot of recursive solutions on this forum involves creating a helper recursive function with added parameters. The added parameter which usually is of the type List<String> , carries the supplementary path information. However, the approach below doesn't use such a helper function.\\n\\n\\n\\n    public List<String> binaryTreePaths(TreeNode root) {\\n            \\n            List<String> paths = new LinkedList<>();\\n    \\n            if(root == null) return paths;\\n            \\n            if(root.left == null && root.right == null){\\n                paths.add(root.val+\"\");\\n                return paths;\\n            }\\n    \\n             for (String path : binaryTreePaths(root.left)) {\\n                 paths.add(root.val + \"->\" + path);\\n             }\\n    \\n             for (String path : binaryTreePaths(root.right)) {\\n                 paths.add(root.val + \"->\" + path);\\n             }\\n    \\n             return paths;\\n            \\n        }"
		},
		{
			"lc_ans_id":"68270",
			"view":"13832",
			"top":"2",
			"title":"C++ simple 4ms recursive solution",
			"vote":"67",
			"content":"    void binaryTreePaths(vector<string>& result, TreeNode* root, string t) {\\n        if(!root->left && !root->right) {\\n            result.push_back(t);\\n            return;\\n        }\\n\\n        if(root->left) binaryTreePaths(result, root->left, t + \"->\" + to_string(root->left->val));\\n        if(root->right) binaryTreePaths(result, root->right, t + \"->\" + to_string(root->right->val));\\n    }\\n\\n    vector<string> binaryTreePaths(TreeNode* root) {\\n        vector<string> result;\\n        if(!root) return result;\\n        \\n        binaryTreePaths(result, root, to_string(root->val));\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"68272",
			"view":"8984",
			"top":"3",
			"title":"Python solutions (dfs+stack, bfs+queue, dfs recursively).",
			"vote":"51",
			"content":"        \\n    # dfs + stack\\n    def binaryTreePaths1(self, root):\\n        if not root:\\n            return []\\n        res, stack = [], [(root, \"\")]\\n        while stack:\\n            node, ls = stack.pop()\\n            if not node.left and not node.right:\\n                res.append(ls+str(node.val))\\n            if node.right:\\n                stack.append((node.right, ls+str(node.val)+\"->\"))\\n            if node.left:\\n                stack.append((node.left, ls+str(node.val)+\"->\"))\\n        return res\\n        \\n    # bfs + queue\\n    def binaryTreePaths2(self, root):\\n        if not root:\\n            return []\\n        res, queue = [], collections.deque([(root, \"\")])\\n        while queue:\\n            node, ls = queue.popleft()\\n            if not node.left and not node.right:\\n                res.append(ls+str(node.val))\\n            if node.left:\\n                queue.append((node.left, ls+str(node.val)+\"->\"))\\n            if node.right:\\n                queue.append((node.right, ls+str(node.val)+\"->\"))\\n        return res\\n        \\n    # dfs recursively\\n    def binaryTreePaths(self, root):\\n        if not root:\\n            return []\\n        res = []\\n        self.dfs(root, \"\", res)\\n        return res\\n    \\n    def dfs(self, root, ls, res):\\n        if not root.left and not root.right:\\n            res.append(ls+str(root.val))\\n        if root.left:\\n            self.dfs(root.left, ls+str(root.val)+\"->\", res)\\n        if root.right:\\n            self.dfs(root.right, ls+str(root.val)+\"->\", res)"
		},
		{
			"lc_ans_id":"68287",
			"view":"7412",
			"top":"4",
			"title":"5 lines recursive Python",
			"vote":"45",
			"content":"    def binaryTreePaths(self, root):\\n        if not root:\\n            return []\\n        return [str(root.val) + '->' + path\\n                for kid in (root.left, root.right) if kid\\n                for path in self.binaryTreePaths(kid)] or [str(root.val)]"
		},
		{
			"lc_ans_id":"68265",
			"view":"4338",
			"top":"5",
			"title":"Java solution using StringBuilder instead of string manipulation.",
			"vote":"29",
			"content":"\\n\\n    public class Solution {\\n        public List<String> binaryTreePaths(TreeNode root) {\\n            List<String> rst = new ArrayList<String>();\\n            if(root == null) return rst;\\n            StringBuilder sb = new StringBuilder();\\n            helper(rst, sb, root);\\n            return rst;\\n        }\\n        \\n        public void helper(List<String> rst, StringBuilder sb, TreeNode root){\\n            if(root == null) return;\\n            int tmp = sb.length();\\n            if(root.left == null && root.right == null){\\n                sb.append(root.val);\\n                rst.add(sb.toString());\\n                sb.delete(tmp , sb.length());\\n                return;\\n            }\\n            sb.append(root.val + \"->\");\\n            helper(rst, sb, root.left);\\n            helper(rst, sb, root.right);\\n            sb.delete(tmp , sb.length());\\n            return;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"68278",
			"view":"1661",
			"top":"6",
			"title":"My Java solution in DFS, BFS, recursion",
			"vote":"26",
			"content":"recursion:\\n\\n    public class Solution {\\n    //Recursion\\n    public List<String> binaryTreePaths(TreeNode root) {\\n        List<String> sList=new LinkedList<String>();\\n        //String s=new String();\\n        if (root==null) return sList;\\n        if (root.left==null && root.right==null) {\\n            sList.add(Integer.toString(root.val));\\n            return sList;\\n        }\\n        \\n        for (String s: binaryTreePaths(root.left)) {\\n            sList.add(Integer.toString(root.val)+\"->\"+s);\\n        }\\n        for (String s: binaryTreePaths(root.right)) {\\n            sList.add(Integer.toString(root.val)+\"->\"+s);\\n        }\\n        return sList;\\n    }\\n}\\n\\nBFS  - queue\\n\\n    public class Solution {\\n    //BFS - Queue\\n    public List<String> binaryTreePaths(TreeNode root) {\\n        List<String> list=new ArrayList<String>();\\n        Queue<TreeNode> qNode=new LinkedList<TreeNode>();\\n        Queue<String> qStr=new LinkedList<String>();\\n        \\n        if (root==null) return list;\\n        qNode.add(root);\\n        qStr.add(\"\");\\n        while(!qNode.isEmpty()) {\\n            TreeNode curNode=qNode.remove();\\n            String curStr=qStr.remove();\\n            \\n            if (curNode.left==null && curNode.right==null) list.add(curStr+curNode.val);\\n            if (curNode.left!=null) {\\n                qNode.add(curNode.left);\\n                qStr.add(curStr+curNode.val+\"->\");\\n            }\\n            if (curNode.right!=null) {\\n                qNode.add(curNode.right);\\n                qStr.add(curStr+curNode.val+\"->\");\\n            }\\n        }\\n        return list;\\n    }\\n    \\nDFS - stack\\n\\n    public class Solution {\\n    //DFS - Stack\\n    public List<String> binaryTreePaths(TreeNode root) {\\n        List<String> list=new ArrayList<String>();\\n        Stack<TreeNode> sNode=new Stack<TreeNode>();\\n        Stack<String> sStr=new Stack<String>();\\n        \\n        if(root==null) return list;\\n        sNode.push(root);\\n        sStr.push(\"\");\\n        while(!sNode.isEmpty()) {\\n            TreeNode curNode=sNode.pop();\\n            String curStr=sStr.pop();\\n            \\n            if(curNode.left==null && curNode.right==null) list.add(curStr+curNode.val);\\n            if(curNode.left!=null) {\\n                sNode.push(curNode.left);\\n                sStr.push(curStr+curNode.val+\"->\");\\n            }\\n            if(curNode.right!=null) {\\n                sNode.push(curNode.right);\\n                sStr.push(curStr+curNode.val+\"->\");\\n            }\\n        }\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"68507",
			"view":"1503",
			"top":"7",
			"title":"8 lines in python,48ms",
			"vote":"20",
			"content":"    def binaryTreePaths(self, root):\\n        if not root:\\n            return []\\n        if not root.left and not root.right:\\n            return [str(root.val)]\\n        treepaths = [str(root.val)+'->'+path for path in self.binaryTreePaths(root.left)]\\n        treepaths += [str(root.val)+'->'+path for path in self.binaryTreePaths(root.right)]\\n        return treepaths"
		},
		{
			"lc_ans_id":"68477",
			"view":"2558",
			"top":"8",
			"title":"My concise JAVA DFS solution",
			"vote":"17",
			"content":"**Explanation**\\n\\nThis is just a classic problem to use depth first search algorithm.\\n\\n    public List<String> binaryTreePaths(TreeNode root) {\\n        ArrayList<String> res = new ArrayList<String>();        \\n        DFS(root, \"\", res);\\n        return res;        \\n    }\\n    \\t\\n    public void DFS(TreeNode root, String solution, ArrayList<String> res) {\\n    \\tif (root == null) return;    \\t\\n    \\tif (root.left==null && root.right==null) res.add(solution + root.val);\\n    \\tDFS(root.left, solution + root.val + \"->\", res);    \\t\\n    \\tDFS(root.right, solution + root.val + \"->\", res);    \\t    \\t\\n    }"
		},
		{
			"lc_ans_id":"68279",
			"view":"1554",
			"top":"9",
			"title":"C++ non-recursive version and recursive version",
			"vote":"15",
			"content":"    /*\\n    follow up: non-recursive version\\n    */\\n    class Solution {\\n    public:\\n        vector<string> binaryTreePaths(TreeNode* root) {\\n            vector<string> res;\\n            if (root == NULL) return res;\\n            stack<TreeNode*> s;\\n            stack<string> pathStack;\\n            s.push(root);\\n            pathStack.push(to_string(root->val));\\n            \\n            while (!s.empty()) {\\n                TreeNode * curNode = s.top(); s.pop();\\n                string tmpPath = pathStack.top(); pathStack.pop();\\n                \\n                if (curNode->left == NULL && curNode->right == NULL) {\\n                    res.push_back(tmpPath); continue;\\n                }\\n                \\n                if (curNode->left != NULL) {\\n                    s.push(curNode->left);\\n                    pathStack.push(tmpPath + \"->\" + to_string(curNode->left->val));\\n                }\\n                \\n                if (curNode->right != NULL) {\\n                    s.push(curNode->right);\\n                    pathStack.push(tmpPath + \"->\" + to_string(curNode->right->val));\\n                }\\n            }\\n            \\n            return res;\\n        }\\n    };\\n    \\n    //recursive version\\n    class Solution {\\n    public:\\n        vector<string> binaryTreePaths(TreeNode* root) {\\n            vector<string> res;\\n            if (root == NULL) return res;\\n            dfs(root, to_string(root->val), res);\\n            return res;\\n        }\\n        \\n        void dfs(TreeNode* root, string path, vector<string>& res) {\\n            if (root->left == NULL && root->right == NULL) {\\n                res.push_back(path);\\n            }\\n            \\n            if (root->left != NULL)\\n                dfs(root->left, path + \"->\" + to_string(root->left->val), res);\\n            \\n            if (root->right != NULL)\\n                dfs(root->right, path + \"->\" + to_string(root->right->val), res);\\n        }\\n    };"
		}
	],
	"id":"257",
	"title":"Binary Tree Paths",
	"content":"<p>\r\nGiven a binary tree, return all root-to-leaf paths.\r\n</p>\r\n<p>\r\nFor example, given the following binary tree:\r\n</p>\r\n<p>\r\n<pre>\r\n   1\r\n /   \\\r\n2     3\r\n \\\r\n  5\r\n</pre>\r\n</p>\r\n<p>\r\nAll root-to-leaf paths are:\r\n<pre>[\"1->2->5\", \"1->3\"]</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"377",
	"ac_num":"143713"
}