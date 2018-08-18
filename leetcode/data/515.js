{
	"difficulty":"2",
	"submit_num":"16348",
	"show_id":"531",
	"leetcode_id":"531",
	"answers":[
		{
			"lc_ans_id":"100018",
			"view":"6134",
			"top":"0",
			"title":"Java O(nm) time with O(n+m) Space and O(1) Space Solutions",
			"vote":"26",
			"content":"O(nm) Time, O(n+m) Space Solution:\\n\\n```\\npublic int findLonelyPixel(char[][] picture) {\\n    int n = picture.length, m = picture[0].length;\\n    \\n    int[] rowCount = new int[n], colCount = new int[m];\\n    for (int i=0;i<n;i++) \\n        for (int j=0;j<m;j++) \\n            if (picture[i][j] == 'B') { rowCount[i]++; colCount[j]++; }\\n\\n    int count = 0;\\n    for (int i=0;i<n;i++) \\n        for (int j=0;j<m;j++) \\n            if (picture[i][j] == 'B' && rowCount[i] == 1 && colCount[j] == 1) count++;\\n                \\n    return count;\\n}\\n```\\n\\nO(nm) Time, O(1) Space Solution:\\n\\n```\\npublic int findLonelyPixel(char[][] picture) {\\n    int n = picture.length, m = picture[0].length;\\n    \\n    int firstRowCount = 0;\\n    for (int i=0;i<n;i++) \\n        for (int j=0;j<m;j++) \\n            if (picture[i][j] == 'B') {   \\n                if (picture[0][j] < 'Y' && picture[0][j] != 'V') picture[0][j]++;\\n                if (i == 0) firstRowCount++;\\n                else if (picture[i][0] < 'Y' && picture[i][0] != 'V') picture[i][0]++;\\n            }\\n\\n    int count = 0;\\n    for (int i=0;i<n;i++) \\n        for (int j=0;j<m;j++) \\n            if (picture[i][j] < 'W' && (picture[0][j] == 'C' || picture[0][j] == 'X')) { \\n                if (i == 0) count += firstRowCount == 1 ? 1 : 0;\\n                else if (picture[i][0] == 'C' || picture[i][0] == 'X') count++;\\n            }\\n                \\n    return count;\\n}\\n```"
		},
		{
			"lc_ans_id":"100039",
			"view":"1439",
			"top":"1",
			"title":"1-liner Python",
			"vote":"8",
			"content":"Go through the columns, count how many have exactly one black pixel and it's in a row that also has exactly one black pixel.\\n\\n    def findLonelyPixel(self, picture):\\n        return sum(col.count('B') == 1 == picture[col.index('B')].count('B') for col in zip(*picture))"
		},
		{
			"lc_ans_id":"100091",
			"view":"1919",
			"top":"2",
			"title":"Java O(mn) time, O(m) space. 28ms",
			"vote":"7",
			"content":"thought is very simple, we can easily count how many times B occurs in each row. But how can we know if this col has existing B?\\nfor example, input is \\nW B B B\\nB W W W\\nW W W B\\nW W W B\\nwe can maintain an array calls colArray[], which is used to record how many times the B occurs in each column. Then solution is simple\\n```\\npublic class Solution {\\n    public int findLonelyPixel(char[][] picture) {\\n        if (picture == null || picture.length == 0 || picture[0].length == 0) return 0;\\n\\n        int[] colArray = new int[picture[0].length];\\n        for (int i = 0; i < picture.length; i++) {\\n            for (int j = 0; j < picture[0].length; j++) {\\n                if (picture[i][j] == 'B') colArray[j]++;\\n            }\\n        }\\n\\n        int ret = 0;\\n        for (int i = 0; i < picture.length; i++) {\\n            int count = 0, pos = 0;\\n            for (int j = 0; j < picture[0].length; j++) {\\n                if (picture[i][j] == 'B') {\\n                    count++;\\n                    pos = j;\\n                }\\n            }\\n            if (count == 1 && colArray[pos] == 1) ret++;\\n        }\\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100096",
			"view":"1583",
			"top":"3",
			"title":"[Java] [C++]  Clean Code with explanation",
			"vote":"4",
			"content":"**C++**\\n```\\n/**\\n * suppose matrix is m*n, there is at most min(m, n) lonely pixels, because there could be no more than 1 in each row, or column;\\n * therefore, if we record num of black pixel on each row and column, we can easily tell whether each pixel is lonely or NO.\\n *     _0_1_2_\\n *  0 | 0 0 1   rows[0] = 1\\n *  1 | 0 1 0   rows[1] = 1\\n *  2 | 1 0 0   rows[2] = 1\\n * \\n * cols[0][1][2]\\n *     1  1  1\\n */\\nclass Solution {\\npublic:\\n    int findLonelyPixel(vector<vector<char>>& pic) {\\n        int m = pic.size();\\n        int n = pic[0].size();\\n        vector<int> rows = vector<int>(m, 0);\\n        vector<int> cols = vector<int>(n, 0);\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                rows[i] += pic[i][j] == 'B';\\n                cols[j] += pic[i][j] == 'B';\\n            }\\n        }\\n        int lonely = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n && rows[i] > 0; j++) {\\n                lonely += pic[i][j] == 'B' && rows[i] == 1 && cols[j] == 1;\\n            }\\n        }\\n        return lonely;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int findLonelyPixel(char[][] pic) {\\n        int m = pic.length;\\n        int n = pic[0].length;\\n        int[] rows = new int[m];\\n        int[] cols = new int[n];\\n\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                rows[i] += pic[i][j] == 'B' ? 1 : 0;\\n                cols[j] += pic[i][j] == 'B' ? 1 : 0;\\n            }\\n        }\\n\\n        int lonely = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n && rows[i] > 0; j++) {\\n                lonely += (pic[i][j] == 'B' && rows[i] == 1 && cols[j] == 1) ? 1 : 0;\\n            }\\n        }\\n\\n        return lonely;     \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100070",
			"view":"517",
			"top":"4",
			"title":"Java clean code, one pass of the matrix, O(mn) time, O(m+n)space",
			"vote":"2",
			"content":"````\\npublic class Solution {\\n    public int findLonelyPixel(char[][] picture) {\\n        int m = picture.length, n = picture[0].length;\\n        int[] row = new int[m];\\n        \\n        int[] col = new int[n];\\n        int res = 0;\\n        for(int i = 0; i < m; i ++){\\n            for(int j = 0; j < n; j ++){\\n                if(picture[i][j] == 'B'){\\n                    col[j]++;\\n                    if(row[i] == 0) row[i] = j + 1;\\n                    else row[i] = -1;\\n                }\\n            }\\n        }\\n        \\n        for(int r : row){\\n            if(r > 0 && col[r - 1] == 1) res++;\\n        }\\n        \\n        return res;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"100073",
			"view":"318",
			"top":"5",
			"title":"C++_Time: O(mn), Space: O(m+n)",
			"vote":"1",
			"content":"    class Solution {\\n    public:\\n    int findLonelyPixel(vector<vector<char>>& picture) {\\n        if(picture.empty()) return 0;\\n        int res = 0;\\n        int m = picture.size();\\n        int n = picture[0].size();\\n        vector<int> rows(m,0);\\n        vector<int> cols(n,0);\\n        for(int i = 0; i < m; ++i){\\n            for(int j = 0; j < n; ++j){\\n                if(cols[j] >= 2) continue;\\n                if(picture[i][j] == 'B'){rows[i]++; cols[j]++;}\\n            }\\n        }\\n        \\n        for(int i = 0; i < m; ++i){\\n            if(rows[i] != 1) continue;\\n            for(int j = 0; j < n; ++j){\\n                if(picture[i][j] == 'B'){\\n                    if(cols[j] == 1){\\n                        res++;\\n                    }\\n                    break;\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"100088",
			"view":"166",
			"top":"6",
			"title":"C# - true single pass O(n) time O(row count + col count) memory",
			"vote":"1",
			"content":"The idea is to keep track of if you have seen a 'B' in a row or column.  I use 2 maps for this, one for rows and one for columns.  The maps need to keep track of 2 things, both maps need to track the count of times they have seen a 'B' and the row map needs to track the column coordinate of the first encountered 'B' and likewise the column map needs to track the row coordinate for the first encountered 'B'.\\n\\nHere's how this works.  Iterate rows and columns, when you see a 'B' increment the counts in the row and column maps.  If both of these counters are 1 you count this lonely B.  But, then later you come across a 'B' and one of the maps shows you now have 2 B's this row or column.  Don't count this B but also you have to \"uncount\" the first B.  Let's say it is in the same row.  Here you need to be careful to signal to the column map that you have already \"uncounted\" this B so you don't later uncount it again.  To do this you get the column index stored in your row map and increment the column map.  Once the counters are past 2 they will not uncount again.\\n\\n```\\n    public int FindLonelyPixel(char[,] picture) {\\n        Dictionary<int, int[]> rowMap = new Dictionary<int, int[]>();\\n        Dictionary<int, int[]> colMap = new Dictionary<int, int[]>();\\n        int cnt = 0;\\n        for (int i = 0; i < picture.GetLength(0); i++)\\n        {\\n            for (int j = 0; j < picture.GetLength(1); j++)\\n            {\\n                if (picture[i,j] == 'B')\\n                {\\n                    if (!rowMap.ContainsKey(i)) rowMap[i] = new int[] { j, 0 };\\n                    if (!colMap.ContainsKey(j)) colMap[j] = new int[] { i, 0 };\\n                    \\n                    rowMap[i][1]++;\\n                    colMap[j][1]++;\\n                    \\n                    if (rowMap[i][1] == 1 && colMap[j][1] == 1) \\n                    {\\n                        cnt++;\\n                    }\\n                    else if (rowMap[i][1] == 2 && colMap[rowMap[i][0]][1] == 1)\\n                    {\\n                        cnt--;\\n                        colMap[rowMap[i][0]][1]++;\\n                    }\\n                    else if (colMap[j][1] == 2 && rowMap[colMap[j][0]][1] == 1)\\n                    {\\n                        cnt--;\\n                        rowMap[colMap[j][0]][1]++;\\n                    }\\n                    else\\n                    {\\n                        rowMap[i][1]++;\\n                        colMap[j][1]++;\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return cnt;\\n    }\\n```"
		},
		{
			"lc_ans_id":"100094",
			"view":"370",
			"top":"7",
			"title":"Python AC Solution",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def findLonelyPixel(self, picture):\\n        \"\"\"\\n        :type picture: List[List[str]]\\n        :rtype: int\\n        \"\"\"\\n        if not picture:\\n            return 0\\n        \\n        bpos = []\\n        for row in picture:\\n            idx = [i for i in range(len(row)) if row[i] == 'B']\\n            bpos.append(idx)\\n        cnt = 0\\n\\n        bposFlat = sum(bpos, [])\\n        \\n        for row in bpos:\\n            if len(row) == 1 and bposFlat.count(row[0]) == 1:\\n                cnt += 1\\n        return cnt\\n```"
		},
		{
			"lc_ans_id":"100012",
			"view":"16",
			"top":"8",
			"title":"Does the interviewer expect a O(1) space solution for this problem?",
			"vote":"0",
			"content":"Am just curious, as there is a somewhat similar problem (set matrix zeros) that can be done in O(1) space. Did anyone get this problem in an interview, and if so, were you asked to do it in O(1) space?"
		},
		{
			"lc_ans_id":"100014",
			"view":"25",
			"top":"9",
			"title":"c++ solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    int findLonelyPixel(vector<vector<char>>& picture) {\\n        if(picture.empty() || picture[0].empty())\\n            return 0;\\n        int m = picture.size(), n = picture[0].size();\\n        vector<int> row(m,0),col(n,0);\\n        for(int i=0;i<m;i++){\\n            for(int j=0;j<n;j++){\\n                if(picture[i][j] == 'B'){\\n                    row[i]++;\\n                    col[j]++;\\n                }\\n            }\\n        }\\n        int res = 0;\\n        \\n        for(int i=0;i<m;i++){\\n            if(row[i] == 1){\\n                for(int j=0;j<n;j++){\\n                    if(picture[i][j] == 'B' && col[j] == 1){\\n                        res++;\\n                    }\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		}
	],
	"id":"515",
	"title":"Lonely Pixel I",
	"content":"<p>Given a picture consisting of black and white pixels, find the number of <b>black</b> lonely pixels.</p>\r\n\r\n<p>The picture is represented by a 2D char array consisting of 'B' and 'W', which means black and white pixels respectively. </p>\r\n\r\n<p>A black lonely pixel is character 'B' that located at a specific position where the same row and same column don't have any other black pixels.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[['W', 'W', 'B'],\r\n ['W', 'B', 'W'],\r\n ['B', 'W', 'W']]\r\n\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> All the three 'B's are black lonely pixels.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of width and height of the input 2D array is [1,500].</li>\r\n</ol>\r\n</p>",
	"frequency":"6",
	"ac_num":"9156"
}