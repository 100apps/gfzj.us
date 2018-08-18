{
	"difficulty":"2",
	"submit_num":"19638",
	"show_id":"609",
	"leetcode_id":"609",
	"answers":[
		{
			"lc_ans_id":"104123",
			"view":"5050",
			"top":"0",
			"title":"C++ clean solution, answers to follow up",
			"vote":"48",
			"content":"Idea is simple:\\nUse a hashmap with names vectors to store all files contents, and then prints the duplicates\\n...\\n\\n    vector<vector<string>> findDuplicate(vector<string>& paths) {\\n        unordered_map<string, vector<string>> files;\\n\\t    vector<vector<string>> result;\\n\\n\\t    for (auto path : paths) {\\n\\t\\t    stringstream ss(path);\\n\\t\\t    string root;\\n\\t\\t    string s;\\n\\t\\t    getline(ss, root, ' ');\\n\\t\\t    while (getline(ss, s, ' ')) {\\n\\t\\t\\t    string fileName = root + '/' + s.substr(0, s.find('('));\\n\\t\\t\\t    string fileContent = s.substr(s.find('(') + 1, s.find(')') - s.find('(') - 1);\\n\\t\\t\\t    files[fileContent].push_back(fileName);\\n\\t\\t    }\\n\\t    }\\n\\n\\t    for (auto file : files) {\\n\\t\\t    if (file.second.size() > 1)\\n\\t\\t\\t    result.push_back(file.second);\\n\\t    }\\n\\n\\t    return result;\\n    }\\n...\\nFollow up questions:\\n\\n**1. Imagine you are given a real file system, how will you search files? DFS or BFS ?**\\nIn general, BFS will use more memory then DFS. However BFS can take advantage of the locality of files in inside directories, and therefore will probably be faster\\n\\n**2. If the file content is very large (GB level), how will you modify your solution?**\\nIn a real life solution we will not hash the entire file content, since it's not practical. Instead we will first map all the files according to size. Files with different sizes are guaranteed to be different. We will than hash a small part of the files with equal sizes (using MD5 for example). Only if the md5 is the same, we will compare the files byte by byte\\n\\n**3. If you can only read the file by 1kb each time, how will you modify your solution?**\\nThis won't change the solution. We can create the hash from the 1kb chunks, and then read the entire file if a full byte by byte comparison is required.\\n\\n**What is the time complexity of your modified solution? What is the most time consuming part and memory consuming part of it? How to optimize?**\\nTime complexity is O(n^2 * k) since in worse case we might need to compare every file to all others. k is the file size\\n\\n**How to make sure the duplicated files you find are not false positive?**\\nWe will use several filters to compare: File size, Hash and byte by byte comparisons."
		},
		{
			"lc_ans_id":"104154",
			"view":"2847",
			"top":"1",
			"title":"Straight forward solution with a tiny bit of Java8",
			"vote":"9",
			"content":"If the creation of the map can also be done using Java8 that would have been cool.\\n```\\npublic static List<List<String>> findDuplicate(String[] paths) {\\n        Map<String, List<String>> map = new HashMap<>();\\n        for(String path : paths) {\\n            String[] tokens = path.split(\" \");\\n            for(int i = 1; i < tokens.length; i++) {\\n                String file = tokens[i].substring(0, tokens[i].indexOf('('));\\n                String content = tokens[i].substring(tokens[i].indexOf('(') + 1, tokens[i].indexOf(')'));\\n                map.putIfAbsent(content, new ArrayList<>());\\n                map.get(content).add(tokens[0] + \"/\" + file);\\n            }\\n        }\\n        return map.values().stream().filter(e -> e.size() > 1).collect(Collectors.toList());\\n    }\\n```"
		},
		{
			"lc_ans_id":"104134",
			"view":"3076",
			"top":"2",
			"title":"Java Solution, HashMap",
			"vote":"7",
			"content":"```\\npublic class Solution {\\n    public List<List<String>> findDuplicate(String[] paths) {\\n        List<List<String>> result = new ArrayList<List<String>>();\\n        int n = paths.length;\\n        if (n == 0) return result;\\n        \\n        Map<String, Set<String>> map = new HashMap<>();\\n        for (String path : paths) {\\n            String[] strs = path.split(\"\\\\\\\\s+\");\\n            for (int i = 1; i < strs.length; i++) {\\n                int idx = strs[i].indexOf(\"(\");\\n                String content = strs[i].substring(idx);\\n                String filename = strs[0] + \"/\" + strs[i].substring(0, idx);\\n                Set<String> filenames = map.getOrDefault(content, new HashSet<String>());\\n                filenames.add(filename);\\n                map.put(content, filenames);\\n            }\\n        }\\n        \\n        for (String key : map.keySet()) {\\n            if (map.get(key).size() > 1) {\\n                result.add(new ArrayList<String>(map.get(key)));\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104122",
			"view":"1397",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"6",
			"content":"After parsing, we have some path and content.  Let's store a map M[content] = [path1, path2, ...].  At the end, we want all values in this map with length > 1.\\n\\n```\\ndef findDuplicate(self, paths):\\n    M = collections.defaultdict(list)\\n    for line in paths:\\n        data = line.split()\\n        root = data[0]\\n        for file in data[1:]:\\n            name, _, content = file.partition('(')\\n            M[content[:-1]].append(root + '/' + name)\\n            \\n    return [x for x in M.values() if len(x) > 1]\\n```"
		},
		{
			"lc_ans_id":"104118",
			"view":"152",
			"top":"4",
			"title":"C# solution with Dictionary",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public IList<IList<string>> FindDuplicate(string[] paths) {\\n        var dict = new Dictionary<string, IList<string>>();\\n        \\n        foreach(var dfs in paths){\\n            var df = dfs.Split(new char[]{' '}, StringSplitOptions.RemoveEmptyEntries);\\n            if(df.Length<=1) continue;\\n            \\n            var dir = df[0];\\n            for(var i=1;i<df.Length;++i){\\n                var f = df[i];\\n                var index = f.IndexOf('('); //e.g.  \"a(1)\"; index = 1;\\n                var filename = f.Substring(0, index);\\n                var content = f.Substring(index+1, f.Length-1 - index-1);\\n                if(!dict.ContainsKey(content)) dict[content] = new List<string>();\\n                var fullname = dir+\"/\"+filename;\\n                dict[content].Add(fullname);\\n            }\\n        }\\n        \\n        \\n        IList<IList<string>> res = new List<IList<string>>();\\n        foreach(var kv in dict){\\n            if(kv.Value.Count>1){\\n                res.Add(kv.Value);\\n            }\\n        }\\n        \\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104119",
			"view":"144",
			"top":"5",
			"title":"Simple Java solution using HashMap",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public List<List<String>> findDuplicate(String[] paths) {\\n        List<List<String>> list = new ArrayList<List<String>>();\\n        \\n        HashMap<String,List<String>> map = new HashMap<>();\\n        \\n        int l = paths.length;\\n        \\n        for(int i=0;i<l;i++){\\n            String s = paths[i];\\n            StringBuilder sb = new StringBuilder(\"\");\\n            char[] stc = s.toCharArray();\\n            int m = s.length();\\n            int j = 0;\\n            while(stc[j] != ' '){\\n                sb.append(stc[j++]);\\n            }\\n            String path = sb.toString();\\n            sb.setLength(0);\\n            j++;\\n            String res = \"\";\\n            String name = \"\";\\n            while(j < m){\\n                if(stc[j] == ' '){\\n                    res = \"\";\\n                    name = \"\";\\n                }else if(stc[j] == '('){\\n                    name = path + '/' + res;\\n                    res = \"\";\\n                }else if(stc[j] == ')'){\\n                    if(map.containsKey(res)){\\n                        List<String> slist = map.get(res);\\n                        slist.add(name);\\n                        map.put(res,slist);\\n                    }else{\\n                        List<String> slist = new ArrayList<String>();\\n                        slist.add(name);\\n                        map.put(res,slist);\\n                    }\\n                }else{\\n                    res += stc[j];\\n                }\\n                j++;\\n            }\\n        }\\n        for(String s : map.keySet()){\\n            List<String> slist = map.get(s);\\n            if(slist.size() > 1){\\n                list.add(slist);\\n            }\\n        }\\n        \\n        return list;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104121",
			"view":"24",
			"top":"6",
			"title":"my c++ solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<vector<string>> findDuplicate(vector<string> &paths) {\\n        vector<vector<string>> ret;\\n        unordered_map<string, vector<string>> tmp;\\n        for (int i = 0; i < paths.size(); i++) {\\n            string path = paths[i];\\n            int slen = path.size();\\n            int spaceindex1 = path.find(\" \", 0);\\n            string dirpath = path.substr(0, spaceindex1) + \"/\";\\n            int spaceindex2 = 0;\\n            while ((spaceindex2 = path.find(\" \", spaceindex1 + 1)) != -1) {\\n                string filepath = path.substr(spaceindex1 + 1, spaceindex2 - spaceindex1 - 1);\\n                int leftindex = filepath.find(\"(\", 0);\\n                tmp[filepath.substr(leftindex + 1, filepath.size() - leftindex - 1)].push_back(\\n                        dirpath + filepath.substr(0, leftindex));\\n                spaceindex1 = spaceindex2;\\n            }\\n            string filepath = path.substr(spaceindex1 + 1, slen - spaceindex1 - 1);\\n            int leftindex = filepath.find(\"(\", 0);\\n            tmp[filepath.substr(leftindex + 1, slen - leftindex - 1)].push_back(\\n                    dirpath + filepath.substr(0, leftindex));\\n        }\\n        for (unordered_map<string, vector<string>>::iterator it = tmp.begin(); it != tmp.end(); it++) {\\n            if (it->second.size() > 1) {\\n                ret.push_back(it->second);\\n            }\\n        }\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104126",
			"view":"45",
			"top":"7",
			"title":"Clean C++ solutions using only istringstream functions",
			"vote":"0",
			"content":"Though there are existing solutions using istringstream, it mostly getline the string and then use find and substr on it.\\nThis solution uses istringstream methods/functions directly, and I think it is cleaner :)\\n\\n    vector<vector<string>> findDuplicate(vector<string>& paths) {\\n        unordered_map<string, vector<string>> m;\\n        string folder, fileName, fileContent;\\n        for(auto& path : paths){\\n            istringstream iss(path);\\n            iss >> folder >> ws;\\n            while(iss.peek() != EOF) {\\n                getline(iss, fileName, '(');\\n                getline(iss, fileContent, ')') >> ws;\\n                m[fileContent].emplace_back(folder.substr().append(\"/\").append(fileName));\\n            }\\n        }\\n        \\n        vector<vector<string>> result;\\n        for(auto& p : m)\\n            if(p.second.size() > 1)\\n                result.emplace_back(move(p.second));\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"104127",
			"view":"51",
			"top":"8",
			"title":"Java solution with hash codes",
			"vote":"0",
			"content":"```\\n/**\\nIf the file content is very large (GB level), how will you modify your solution? \\n--> Find the hashcode of the content.\\ncan we do better?\\n\\nIf you can only read the file by 1kb each time, how will you modify your solution?\\n--> something related to hashcode generation?\\n\\nWhat is the time complexity of your modified solution? What is the most time-consuming part and memory consuming part of it? How to optimize?\\n\\n--> If the hashcodes are given, its O(n) Finding the hashcode of the content.\\n\\nHow to make sure the duplicated files you find are not false positive?\\n--> donno.\\n**/\\n\\nclass Solution {\\n    public List<List<String>> findDuplicate(String[] paths) {\\n        List<List<String>> result = new ArrayList<>();\\n        \\n        Map<String, List<String>> m = new HashMap<>();\\n        for (String path : paths) {\\n            String[] p = path.split(\" \");\\n            String dir = p[0];\\n            \\n            for (int i = 1; i < p.length; i++) {\\n                int j = p[i].indexOf('(');\\n                if (j != -1) {\\n                    j++;\\n                    int k = j;\\n                    while(k < p[i].length() && p[i].charAt(k) != ')') k++;\\n                    String content = p[i].substring(j, k);\\n                    if (!m.containsKey(content)) m.put(content, new ArrayList<>());\\n                    m.get(content).add(dir + \"/\" + p[i].substring(0, j-1));\\n                }\\n            }\\n        }\\n        \\n        for (String key : m.keySet()) {\\n            if (m.get(key).size() > 1) result.add(m.get(key));\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104128",
			"view":"57",
			"top":"9",
			"title":"Simple C++ solution 85 ms runtime, beats 89.75%",
			"vote":"0",
			"content":"The idea is simple.\\n1. Get the directory path (dir_path).\\n2. Get the files(file_path) and their data in directory.\\n3. Add the data and dir_path + file_path to an unordered_map<data, vector of absolute path to files>\\n4. Go through all the objects in the unordered_map and for objects with vector of absolute path to files > 1 add them to result.\\n\\ncode:\\n```\\n#include <unordered_map>\\nclass Solution {\\nprivate:\\n    void Parse(std::string file, std::unordered_map<std::string, std::vector<std::string>>& map) {\\n        std::string path, filenm, data;\\n        size_t index = 0;\\n        while(file[index] != ' ') {\\n            path.push_back(file[index]);\\n            index++;\\n        }\\n        index++;\\n        bool sw = false;\\n        while(index < file.length()) {\\n            if(file[index] == ')') {\\n                index += 2;\\n                map[data].push_back(filenm);\\n                //std::cout << filenm << \" : \" << data << \"\\\\n\";\\n                filenm.clear();\\n                data.clear();\\n                sw = false;\\n                continue;\\n            }\\n            if(file[index] == '(') {\\n                index++;\\n                filenm = path + '/' + filenm;\\n                sw = true;\\n                continue;\\n            }\\n            if(!sw) {\\n                filenm.push_back(file[index]);\\n                index++;\\n            } else {\\n                data.push_back(file[index]);\\n                index++;\\n            }\\n        }\\n    }\\npublic:\\n    vector<vector<string>> findDuplicate(vector<string>& paths) {\\n        std::unordered_map<std::string, std::vector<std::string>> map;\\n        std::vector<std::vector<std::string>> res;\\n        for(std::string path : paths) {\\n            Parse(path, map);\\n        }\\n        \\n        for(std::pair<std::string, std::vector<std::string>> pr : map) {\\n            if(pr.second.size() > 1) {\\n                res.push_back(pr.second);\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		}
	],
	"id":"588",
	"title":"Find Duplicate File in System",
	"content":"<p>Given a list of directory info including directory path, and all the files with contents in this directory, you need to find out all the groups of duplicate files in the file system in terms of their paths.</p>\r\n\r\n<p>A group of duplicate files consists of at least <b>two</b> files that have exactly the same content.</p>\r\n\r\n<p>A single directory info string in the <b>input</b> list has the following format: </p>\r\n<p><code>\"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)\"</code><br></p>\r\n<p>It means there are <b>n</b> files (<code>f1.txt</code>, <code>f2.txt</code> ... <code>fn.txt</code> with content <code>f1_content</code>, <code>f2_content</code> ... <code>fn_content</code>, respectively) in directory <code>root/d1/d2/.../dm</code>. Note that n >= 1 and m >= 0. If m = 0, it means the directory is just the root directory.</p>\r\n\r\n<p>The <b>output</b> is a list of group of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following format: </p>\r\n<p><code>\"directory_path/file_name.txt\"</code></p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"root/a 1.txt(abcd) 2.txt(efgh)\", \"root/c 3.txt(abcd)\", \"root/c/d 4.txt(efgh)\", \"root 4.txt(efgh)\"]\r\n<b>Output:</b>  \r\n[[\"root/a/2.txt\",\"root/c/d/4.txt\",\"root/4.txt\"],[\"root/a/1.txt\",\"root/c/3.txt\"]]\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>No order is required for the final output.</li>\r\n<li>You may assume the directory name, file name and file content only has letters and digits, and the length of file content is in the range of [1,50].</li>\r\n<li>The number of files given is in the range of [1,20000].</li>\r\n<li>You may assume no files or directories share the same name in the same directory.</li>\r\n<li>You may assume each given directory info represents a unique directory. Directory path and file info are separated by a single blank space.</li>\r\n</ol>\r\n</p>\r\n\r\n\r\n<b>Follow-up beyond contest:</b> \r\n<ol>\r\n<li> Imagine you are given a real file system, how will you search files? DFS or BFS?</li>\r\n<li> If the file content is very large (GB level), how will you modify your solution?</li>\r\n<li> If you can only read the file by 1kb each time, how will you modify your solution?</li>\r\n<li> What is the time complexity of your modified solution? What is the most time-consuming part and memory consuming part of it? How to optimize?</li>\r\n<li> How to make sure the duplicated files you find are not false positive?</li>\r\n</ol>",
	"frequency":"326",
	"ac_num":"10290"
}