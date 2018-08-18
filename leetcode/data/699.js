{
	"difficulty":"1",
	"submit_num":"16078",
	"show_id":"733",
	"leetcode_id":"733",
	"answers":[
		{
			"lc_ans_id":"109584",
			"view":"1204",
			"top":"0",
			"title":"Java 9 liner, DFS",
			"vote":"5",
			"content":"Time complexity: O(m*n), space complexity: O(1). m is number of rows, n is number of columns.\\n```\\nclass Solution {\\n    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\\n        if (image[sr][sc] == newColor) return image;\\n        fill(image, sr, sc, image[sr][sc], newColor);\\n        return image;\\n    }\\n    \\n    private void fill(int[][] image, int sr, int sc, int color, int newColor) {\\n        if (sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length || image[sr][sc] != color) return;\\n        image[sr][sc] = newColor;\\n        fill(image, sr + 1, sc, color, newColor);\\n        fill(image, sr - 1, sc, color, newColor);\\n        fill(image, sr, sc + 1, color, newColor);\\n        fill(image, sr, sc - 1, color, newColor);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109604",
			"view":"435",
			"top":"1",
			"title":"Easy Python DFS (no need for visited)!!!",
			"vote":"4",
			"content":"The idea is simple. Simply perform a DFS on the source cell. Continue the DFS if:\\n\\n1. Next cell is within bounds.\\n2. Next cell is the same color as source cell.\\n\\nThere is a tricky case where the new color is the same as the original color and if the DFS is done on it, there will be an infinite loop. If new color is same as original color, there is nothing to be done and we can simply return the `image`.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def floodFill(self, image, sr, sc, newColor):\\n        rows, cols, orig_color = len(image), len(image[0]), image[sr][sc]\\n        def traverse(row, col):\\n            if (not (0 <= row < rows and 0 <= col < cols)) or image[row][col] != orig_color:\\n                return\\n            image[row][col] = newColor\\n            [traverse(row + x, col + y) for (x, y) in ((0, 1), (1, 0), (0, -1), (-1, 0))]\\n        if orig_color != newColor:\\n            traverse(sr, sc)\\n        return image\\n```"
		},
		{
			"lc_ans_id":"109613",
			"view":"518",
			"top":"2",
			"title":"[Java/C++] Clean Code",
			"vote":"2",
			"content":"**Java**\\n```\\nclass Solution {\\n    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\\n        if (image[sr][sc] != newColor)\\n            dfs(image, sr, sc, image[sr][sc], newColor);\\n        return image;\\n    }\\n\\n    private void dfs(int[][] image, int i, int j, int c0, int c1) {\\n        if (i < 0 || j < 0 || i >= image.length || j >= image[0].length || image[i][j] != c0) return;\\n        image[i][j] = c1;\\n        dfs(image, i, j - 1, c0, c1);\\n        dfs(image, i, j + 1, c0, c1);\\n        dfs(image, i - 1, j, c0, c1);\\n        dfs(image, i + 1, j, c0, c1);\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {\\n        if (image[sr][sc] != newColor)\\n            dfs(image, sr, sc, image[sr][sc], newColor);\\n        return image;\\n    }\\n\\nprivate:\\n    void dfs(vector<vector<int>>& image, int i, int j, int c0, int c1) {\\n        if (i < 0 || j < 0 || i >= image.size() || j >= image[0].size() || image[i][j] != c0) return;\\n        image[i][j] = c1;\\n        dfs(image, i, j - 1, c0, c1);\\n        dfs(image, i, j + 1, c0, c1);\\n        dfs(image, i - 1, j, c0, c1);\\n        dfs(image, i + 1, j, c0, c1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109616",
			"view":"199",
			"top":"3",
			"title":"short DFS python solution",
			"vote":"2",
			"content":"```\\ndef floodFillHelper(self, image, sr, sc, newColor, oldColor, visited):\\n    if not (0 <= sr < len(image) and 0 <= sc < len(image[0])) or visited[sr][sc] or image[sr][sc] != oldColor:\\n        return image\\n    image[sr][sc], visited[sr][sc], offsets = newColor, True, [[-1, 0], [1, 0], [0, -1], [0, 1]]\\n    for off in offsets:\\n        image = self.floodFillHelper(image, sr + off[0], sc + off[1], newColor, oldColor, visited)\\n    return image\\n\\ndef floodFill(self, image, sr, sc, newColor):\\n    visited, old_color = [[0] * len(image[0]) for _ in range(len(image))], image[sr][sc]\\n    return self.floodFillHelper(image, sr, sc, newColor, old_color, visited)\\n```"
		},
		{
			"lc_ans_id":"109596",
			"view":"169",
			"top":"4",
			"title":"Java easy BFS",
			"vote":"1",
			"content":"```\\n        public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\\n            int[] directions = new int[]{0, 1, 0, -1, 0};\\n            int m = image.length;\\n            int n = image[0].length;\\n            int originalValue = image[sr][sc];\\n            image[sr][sc] = newColor;\\n\\n            boolean[][] visited = new boolean[m][n];\\n\\n            Queue<int[]> queue = new LinkedList<>();\\n            queue.offer(new int[]{sr, sc});\\n            while (!queue.isEmpty()) {\\n                int[] curr = queue.poll();\\n                visited[curr[0]][curr[1]] = true;\\n                for (int i = 0; i < directions.length - 1; i++) {\\n                    int nextR = curr[0] + directions[i];\\n                    int nextC = curr[1] + directions[i + 1];\\n                    if (nextR < 0 || nextC < 0 || nextR >= m || nextC >= n || image[nextR][nextC] != originalValue || visited[nextR][nextC]) {\\n                        continue;\\n                    }\\n                    image[nextR][nextC] = newColor;\\n                    queue.offer(new int[]{nextR, nextC});\\n                }\\n            }\\n            return image;\\n        }\\n```"
		},
		{
			"lc_ans_id":"109614",
			"view":"53",
			"top":"5",
			"title":"Straight forward DFS (Like `Number of Islands`) C++",
			"vote":"1",
			"content":"The solution is pretty similar to that for:\\nhttps://leetcode.com/problems/number-of-islands/description/\\n\\n```\\nclass Solution {\\npublic:\\n    \\n    void helper(vector<vector<int>>& image, int sr, int sc, int orgColor, int newColor) {\\n        if(sr>=0 && sc>=0 && sr<image.size() && sc<image[0].size() && image[sr][sc]==orgColor && image[sr][sc]!=newColor) {\\n            image[sr][sc]=newColor;\\n            helper(image, sr+1, sc, orgColor, newColor);\\n            helper(image, sr-1, sc, orgColor, newColor);\\n            helper(image, sr, sc+1, orgColor, newColor);\\n            helper(image, sr, sc-1, orgColor, newColor);\\n        }\\n    }\\n    \\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {\\n        if(sr<0 || sc<0 || sr>image.size() || sc>image[0].size())\\n            return image;\\n        \\n        helper(image, sr, sc, image[sr][sc], newColor);\\n        return image;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109576",
			"view":"10",
			"top":"6",
			"title":"C# DFS solution",
			"vote":"0",
			"content":"````\\npublic class Solution {    \\n    int r = 0;\\n    int c = 0;    \\n    public void DFS(int[,] image, int row, int col, int newColor, int startColor){\\n        if ( row < 0 || row >= r || col < 0 || col >= c || image[row, col] == newColor || image[row,col] != startColor)\\n            return;\\n        image[row, col] = newColor;\\n        DFS(image, row + 1, col, newColor, startColor);\\n        DFS(image, row - 1, col, newColor, startColor);\\n        DFS(image, row, col - 1, newColor, startColor);\\n        DFS(image, row, col + 1, newColor, startColor);        \\n    }\\n    \\n    public int[,] FloodFill(int[,] image, int sr, int sc, int newColor) {\\n        r = image.GetLength(0);\\n        c = image.GetLength(1);\\n        int startColor = image[sr,sc];\\n        DFS(image, sr, sc, newColor, startColor);\\n        return image;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"109577",
			"view":"16",
			"top":"7",
			"title":"Clear DFS Python Solution",
			"vote":"0",
			"content":"```\\nclass Solution:\\n    def floodFill(self, image, sr, sc, newColor):\\n        \"\"\"\\n        :type image: List[List[int]]\\n        :type sr: int\\n        :type sc: int\\n        :type newColor: int\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        row = len(image)\\n        col = len(image[0])\\n        if image[sr][sc] == newColor:\\n            return image\\n        oldColor = image[sr][sc]\\n        image[sr][sc] = newColor\\n        self._flood_fill(image, sr, sc, row, col, newColor, oldColor)\\n        return image\\n\\n    def _flood_fill(self, image, sr, sc, row, col, newColor, oldColor):\\n        if sr + 1 < row and image[sr + 1][sc] == oldColor:\\n            image[sr + 1][sc] = newColor\\n            self._flood_fill(image, sr + 1, sc, row, col, newColor, oldColor)\\n        if sr - 1 >= 0 and image[sr - 1][sc] == oldColor:\\n            image[sr - 1][sc] = newColor\\n            self._flood_fill(image, sr - 1, sc, row, col, newColor, oldColor)\\n        if sc + 1 < col and image[sr][sc + 1] == oldColor:\\n            image[sr][sc + 1] = newColor\\n            self._flood_fill(image, sr, sc + 1, row, col, newColor, oldColor)\\n        if sc - 1 >= 0 and image[sr][sc - 1] == oldColor:\\n            image[sr][sc - 1] = newColor\\n            self._flood_fill(image, sr, sc - 1, row, col, newColor, oldColor)\\n```"
		},
		{
			"lc_ans_id":"109578",
			"view":"17",
			"top":"8",
			"title":"Iterative DFS Java",
			"vote":"0",
			"content":"````\\n public class Node{\\n        int index1;\\n        int index2;\\n       \\n        public Node(int i,int j){\\n            index1=i;\\n            index2=j;\\n        }\\n    }\\n    \\n    \\n    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\\n        Stack<Node> stack = new Stack<>();\\n        int color = image[sr][sc];\\n        if(color != newColor){\\n            stack.add(new Node(sr,sc));\\n            while(!stack.isEmpty()){\\n                Node n = stack.pop();\\n                 if (image[n.index1][n.index2] == color) {\\n                    image[n.index1][n.index2] = newColor;\\n                    if(n.index1>=1 )stack.add(new Node(n.index1-1,n.index2));\\n                    if(n.index2>=1 )stack.add(new Node(n.index1,n.index2-1));\\n                    if(n.index1+1 <image.length )stack.add(new Node(n.index1+1,n.index2));\\n                    if(n.index2+1 < image[0].length )stack.add(new Node(n.index1,n.index2+1));\\n                 }\\n            }\\n        }\\n        return image;\\n    }\\n````"
		},
		{
			"lc_ans_id":"109579",
			"view":"22",
			"top":"9",
			"title":"A simple C solution[Accepted]",
			"vote":"0",
			"content":"```\\n/**\\n * Return an array of arrays of size *returnSize.\\n * The sizes of the arrays are returned as *columnSizes array.\\n * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().\\n */\\nvoid fill(int** image,int imageRowSize, int imageColSize,int sr, int sc, int newColor,int restore)\\n{\\n    if(image[sr][sc]==restore)\\n    {image[sr][sc]=newColor;}\\n    else\\n    {return ;}\\n    if(sr>0)\\n    {fill(image,imageRowSize,imageColSize,sr-1,sc, newColor,restore);}\\n    if(sr<imageRowSize-1)\\n    {fill(image,imageRowSize,imageColSize,sr+1,sc, newColor,restore);}\\n    if(sc<imageColSize-1)\\n    {fill(image,imageRowSize,imageColSize,sr,sc+1, newColor,restore);}\\n    if(sc>0)\\n    {fill(image,imageRowSize,imageColSize,sr,sc-1, newColor,restore);}\\n    \\n}\\nint** floodFill(int** image, int imageRowSize, int imageColSize, int sr, int sc, int newColor, int** columnSizes, int* returnSize) {\\n    int restore=image[sr][sc];\\n    *returnSize=imageRowSize;\\n    columnSizes[0]=(int*)malloc(sizeof(int)*(*returnSize));\\n    for(int i=0;i<*returnSize;i++)\\n    {columnSizes[0][i]=imageColSize;}\\n    if(image[sr][sc]==newColor)\\n    {return image;}\\n    fill(image,imageRowSize,imageColSize,sr,sc, newColor,restore);\\n    return image;\\n}\\n````"
		}
	],
	"id":"699",
	"title":"Flood Fill",
	"content":"<p>\r\nAn <code>image</code> is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).\r\n</p><p>\r\nGiven a coordinate <code>(sr, sc)</code> representing the starting pixel (row and column) of the flood fill, and a pixel value <code>newColor</code>, \"flood fill\" the image.\r\n</p><p>\r\nTo perform a \"flood fill\", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on.  Replace the color of all of the aforementioned pixels with the newColor.\r\n</p><p>\r\nAt the end, return the modified image.\r\n</p>\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nimage = [[1,1,1],[1,1,0],[1,0,1]]\r\nsr = 1, sc = 1, newColor = 2\r\n<b>Output:</b> [[2,2,2],[2,2,0],[2,0,1]]\r\n<b>Explanation:</b> \r\nFrom the center of the image (with position (sr, sc) = (1, 1)), all pixels connected \r\nby a path of the same color as the starting pixel are colored with the new color.\r\nNote the bottom corner is not colored 2, because it is not 4-directionally connected\r\nto the starting pixel.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>image</code> and <code>image[0]</code> will be in the range <code>[1, 50]</code>.</li>\r\n<li>The given starting pixel will satisfy <code>0 <= sr < image.length</code> and <code>0 <= sc < image[0].length</code>.</li>\r\n<li>The value of each color in <code>image[i][j]</code> and <code>newColor</code> will be an integer in <code>[0, 65535]</code>.</li>\r\n</p>",
	"frequency":"121",
	"ac_num":"7757"
}