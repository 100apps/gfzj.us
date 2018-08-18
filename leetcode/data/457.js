{
	"difficulty":"1",
	"submit_num":"119826",
	"show_id":"463",
	"leetcode_id":"463",
	"answers":[
		{
			"lc_ans_id":"95001",
			"view":"35343",
			"top":"0",
			"title":"clear and easy java solution",
			"vote":"143",
			"content":"1. loop over the matrix and count the number of islands;\\n2. if the current dot is an island, count if it has any right neighbour or down neighbour;\\n3. the result is islands * 4 - neighbours * 2\\n\\n```\\npublic class Solution {\\n    public int islandPerimeter(int[][] grid) {\\n        int islands = 0, neighbours = 0;\\n\\n        for (int i = 0; i < grid.length; i++) {\\n            for (int j = 0; j < grid[i].length; j++) {\\n                if (grid[i][j] == 1) {\\n                    islands++; // count islands\\n                    if (i < grid.length - 1 && grid[i + 1][j] == 1) neighbours++; // count down neighbours\\n                    if (j < grid[i].length - 1 && grid[i][j + 1] == 1) neighbours++; // count right neighbours\\n                }\\n            }\\n        }\\n\\n        return islands * 4 - neighbours * 2;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95007",
			"view":"14711",
			"top":"1",
			"title":"Short Python",
			"vote":"52",
			"content":"Since there are no lakes, every pair of neighbour cells with different values is part of the perimeter (more precisely, the edge between them is). So just count the differing pairs, both horizontally and vertically (for the latter I simply transpose the grid).\\n\\n    def islandPerimeter(self, grid):\\n        return sum(sum(map(operator.ne, [0] + row, row + [0]))\\n                   for row in grid + map(list, zip(*grid)))"
		},
		{
			"lc_ans_id":"94992",
			"view":"11368",
			"top":"2",
			"title":"Java 9 line solution, add 4 for each land and remove 2 for each internal edge",
			"vote":"46",
			"content":"```\\npublic static int islandPerimeter(int[][] grid) {\\n        if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;\\n        int result = 0;\\n        for (int i = 0; i < grid.length; i++) {\\n            for (int j = 0; j < grid[0].length; j++) {\\n                if (grid[i][j] == 1) {\\n                    result += 4;\\n                    if (i > 0 && grid[i-1][j] == 1) result -= 2;\\n                    if (j > 0 && grid[i][j-1] == 1) result -= 2;\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95126",
			"view":"11364",
			"top":"3",
			"title":"C++ solution with explanation",
			"vote":"35",
			"content":"1. find how many 1 in the map. If without the consideration of surrounding cells, the total perimeter should be the total amount of 1 times 4. \\n2. find how many cell walls that connect with both lands. We need to deduct twice of those lines from total perimeter\\n```\\nint islandPerimeter(vector<vector<int>>& grid) {\\n        int count=0, repeat=0;\\n        for(int i=0;i<grid.size();i++)\\n        {\\n            for(int j=0; j<grid[i].size();j++)\\n                {\\n                    if(grid[i][j]==1)\\n                    {\\n                        count ++;\\n                        if(i!=0 && grid[i-1][j] == 1) repeat++;\\n                        if(j!=0 && grid[i][j-1] == 1) repeat++;\\n                    }\\n                }\\n        }\\n        return 4*count-repeat*2;\\n    }\\n```\\n@msg  thanks for the edit"
		},
		{
			"lc_ans_id":"95003",
			"view":"3003",
			"top":"4",
			"title":"Easy to read Python solution",
			"vote":"16",
			"content":"```\\nclass Solution(object):\\n    def islandPerimeter(self, grid):\\n        \"\"\"\\n        :type grid: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        if not grid:\\n            return 0\\n\\n        def sum_adjacent(i, j):\\n            adjacent = (i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1),\\n            res = 0\\n            for x, y in adjacent:\\n                if x < 0 or y < 0 or x == len(grid) or y == len(grid[0]) or grid[x][y] == 0:\\n                    res += 1\\n            return res\\n\\n        count = 0\\n        for i in range(len(grid)):\\n            for j in range(len(grid[0])):\\n                if grid[i][j] == 1:\\n                    count += sum_adjacent(i, j)\\n        return count\\n```"
		},
		{
			"lc_ans_id":"95273",
			"view":"3699",
			"top":"5",
			"title":"Easy DFS solution + explaination without visited array",
			"vote":"14",
			"content":"The idea here is that each land cell contributes as many lines in perimeter as it's surrounded by water / boundary. \\n```\\nvoid dfs(vector<vector<int>>& b, int *ans, int i, int j) {\\n        if (i < 0 || i >= b.size() || j < 0 || j >= b[0].size() || b[i][j] != 1)\\n            return;\\n        b[i][j] = -1; // mark it as visited\\n        *ans += (j + 1 >= b[0].size() || b[i][j+1] == 0) /* right */ +\\n                (i - 1 < 0            || b[i-1][j] == 0) /* top */ +\\n                (j - 1 < 0            || b[i][j-1] == 0) /* left */ +\\n                (i + 1 >= b.size()    || b[i+1][j] == 0) /* bottom */;\\n        dfs(b, ans, i, j + 1);\\n        dfs(b, ans, i - 1, j);\\n        dfs(b, ans, i, j - 1);\\n        dfs(b, ans, i + 1, j);\\n        return;\\n    }\\n    int islandPerimeter(vector<vector<int>>& grid) {\\n        int ans = 0, i, j;\\n        for (i = 0; i < grid.size(); i++) {\\n            for (j = 0; j < grid[0].size(); j++) {\\n                if (grid[i][j]) {\\n                    dfs(grid, &ans, i, j);\\n                    return ans;\\n                }\\n            }\\n        }\\n        return 0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95015",
			"view":"4337",
			"top":"6",
			"title":"Why the tag is \"Hash Table\"? Is there a hash table solution?",
			"vote":"11",
			"content":"Why the tag is \"Hash Table\"? Is there a hash table solution?"
		},
		{
			"lc_ans_id":"95094",
			"view":"3391",
			"top":"7",
			"title":"Python short & efficient solution with explanation: O(mn) time and O(1) space",
			"vote":"8",
			"content":"My solution from the contest. For each cell with land on it add the number of cells around it that have water. All cells that are not on the grid are considered to have water:\\n```\\ndef islandPerimeter(self, grid):\\n    def water_around(y, x):\\n        return ((x == 0              or grid[y][x-1] == 0) +\\n                (x == len(grid[0])-1 or grid[y][x+1] == 0) +\\n                (y == 0              or grid[y-1][x] == 0) +\\n                (y == len(grid)-1    or grid[y+1][x] == 0) )\\n    return sum(water_around(y, x) for y in xrange(len(grid)) for x in xrange(len(grid[0])) if grid[y][x])\\n```\\n\\nUPDATE: Changed calls to ```range``` to use ```xrange``` instead. See posts below for further discussion on the effects of this change."
		},
		{
			"lc_ans_id":"95122",
			"view":"1456",
			"top":"8",
			"title":"Clean java solution O(mn)",
			"vote":"6",
			"content":"\\tIdea: Every side of a land-cell exposed to water-cell will be part of perimeter.\\n\\n    public int islandPerimeter(int[][] grid) {\\n        int[][] d = new int[][] {{0,-1}, {-1,0}, {0,1}, {1,0}};\\n        \\n        int perimeter = 0;\\n        for(int i=0; i<grid.length; i++) {\\n            for(int j=0; j<grid[0].length; j++) {\\n                if(grid[i][j] == 0)\\n                    continue;\\n                \\n                for(int k=0; k<d.length; k++) {\\n                    int x=i+d[k][0], y=j+d[k][1];\\n                    if(x<0 || x>=grid.length || y<0 || y>=grid[0].length || grid[x][y] == 0)\\n                        perimeter++;\\n                }\\n            }\\n        }\\n        \\n        return perimeter;\\n    }\\n\\t\\n\\tTime complexity:  O(mn)\\n\\tSpace complexity: O(1)"
		},
		{
			"lc_ans_id":"95004",
			"view":"534",
			"top":"9",
			"title":"Java solution with DFS",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int islandPerimeter(int[][] grid) {\\n        if (grid == null) return 0;\\n        for (int i = 0 ; i < grid.length ; i++){\\n            for (int j = 0 ; j < grid[0].length ; j++){\\n                if (grid[i][j] == 1) {\\n                    return getPerimeter(grid,i,j);\\n                }\\n            }\\n        }\\n        return 0;\\n    }\\n    \\n    public int getPerimeter(int[][] grid, int i, int j){\\n        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {return 1;}\\n        if (grid[i][j] == 0) {\\n            return 1;\\n        }\\n        if (grid[i][j] == -1) return 0;\\n        \\n        int count = 0;\\n        grid[i][j] = -1;\\n        \\n        count += getPerimeter(grid, i-1, j);\\n        count += getPerimeter(grid, i, j-1);\\n        count += getPerimeter(grid, i, j+1);\\n        count += getPerimeter(grid, i+1, j);\\n        \\n        return count;\\n        \\n    }\\n}\\n```"
		}
	],
	"id":"457",
	"title":"Island Perimeter",
	"content":"<p>You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water. Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells). The island doesn't have \"lakes\" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n[[0,1,0,0],\r\n [1,1,1,0],\r\n [0,1,0,0],\r\n [1,1,0,0]]\r\n\r\nAnswer: 16\r\nExplanation: The perimeter is the 16 yellow stripes in the image below:\r\n<img src=\"/static/images/problemset/island.png\">\r\n</pre>\r\n</p>",
	"frequency":"536",
	"ac_num":"69118"
}