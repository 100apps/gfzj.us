{
	"difficulty":"3",
	"submit_num":"335436",
	"show_id":"68",
	"leetcode_id":"68",
	"answers":[
		{
			"lc_ans_id":"24873",
			"view":"22893",
			"top":"0",
			"title":"Share my concise c++ solution - less than 20 lines",
			"vote":"107",
			"content":"    vector<string> fullJustify(vector<string> &words, int L) {\\n        vector<string> res;\\n        for(int i = 0, k, l; i < words.size(); i += k) {\\n            for(k = l = 0; i + k < words.size() and l + words[i+k].size() <= L - k; k++) {\\n                l += words[i+k].size();\\n            }\\n            string tmp = words[i];\\n            for(int j = 0; j < k - 1; j++) {\\n                if(i + k >= words.size()) tmp += \" \";\\n                else tmp += string((L - l) / (k - 1) + (j < (L - l) % (k - 1)), ' ');\\n                tmp += words[i+j+1];\\n            }\\n            tmp += string(L - tmp.size(), ' ');\\n            res.push_back(tmp);\\n        }\\n        return res;\\n    }\\n\\nFor each line, I first figure out which words can fit in. According to the code, these words are words[i] through words[i+k-1]. Then spaces are added between the words. The trick here is to use mod operation to manage the spaces that can't be evenly distrubuted: the first (L-l) % (k-1) gaps acquire an additional space."
		},
		{
			"lc_ans_id":"24891",
			"view":"8360",
			"top":"1",
			"title":"Concise python solution, 10 lines.",
			"vote":"55",
			"content":"    def fullJustify(self, words, maxWidth):\\n        res, cur, num_of_letters = [], [], 0\\n        for w in words:\\n            if num_of_letters + len(w) + len(cur) > maxWidth:\\n                for i in range(maxWidth - num_of_letters):\\n                    cur[i%(len(cur)-1 or 1)] += ' '\\n                res.append(''.join(cur))\\n                cur, num_of_letters = [], 0\\n            cur += [w]\\n            num_of_letters += len(w)\\n        return res + [' '.join(cur).ljust(maxWidth)]\\n\\nHow does it work? Well in the question statement, the sentence \"Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right\" was just a really long and awkward way to say *round robin*. The following line implements the round robin logic: \\n\\n    for i in range(maxWidth - num_of_letters):\\n                    cur[i%(len(cur)-1 or 1)] += ' '\\n\\nWhat does this line do? Once you determine that there are only k words that can fit on a given line, you know what the total length of those words is num_of_letters. Then the rest are spaces, and there are (maxWidth - num_of_letters) of spaces. The \"or 1\" part is for dealing with the edge case len(cur) == 1.\\n\\n\\n\\n--------------------------------------------\\n\\nThe following is my older solution for reference, longer and less clear. The idea is the same, but I did not figure out the nice way to distribute the space at the time.\\n\\n    def fullJustify(self, words, maxWidth):\\n        res, cur, num_of_letters = [], [], 0\\n        for w in words:\\n            if num_of_letters + len(w) + len(cur) > maxWidth:\\n                if len(cur) == 1:\\n                    res.append( cur[0] + ' '*(maxWidth - num_of_letters) )\\n                else:\\n                    num_spaces = maxWidth - num_of_letters\\n                    space_between_words, num_extra_spaces = divmod( num_spaces, len(cur)-1)\\n                    for i in range(num_extra_spaces):\\n                        cur[i] += ' '\\n                    res.append( (' '*space_between_words).join(cur) )\\n                cur, num_of_letters = [], 0\\n            cur += [w]\\n            num_of_letters += len(w)\\n        res.append( ' '.join(cur) + ' '*(maxWidth - num_of_letters - len(cur) + 1) )\\n        return res"
		},
		{
			"lc_ans_id":"24876",
			"view":"19419",
			"top":"2",
			"title":"Simple Java Solution",
			"vote":"32",
			"content":"    public class Solution {\\n        public List<String> fullJustify(String[] words, int L) {\\n            List<String> lines = new ArrayList<String>();\\n            \\n            int index = 0;\\n            while (index < words.length) {\\n                int count = words[index].length();\\n                int last = index + 1;\\n                while (last < words.length) {\\n                    if (words[last].length() + count + 1 > L) break;\\n                    count += words[last].length() + 1;\\n                    last++;\\n                }\\n                \\n                StringBuilder builder = new StringBuilder();\\n                int diff = last - index - 1;\\n                // if last line or number of words in the line is 1, left-justified\\n                if (last == words.length || diff == 0) {\\n                    for (int i = index; i < last; i++) {\\n                        builder.append(words[i] + \" \");\\n                    }\\n                    builder.deleteCharAt(builder.length() - 1);\\n                    for (int i = builder.length(); i < L; i++) {\\n                        builder.append(\" \");\\n                    }\\n                } else {\\n                    // middle justified\\n                    int spaces = (L - count) / diff;\\n                    int r = (L - count) % diff;\\n                    for (int i = index; i < last; i++) {\\n                        builder.append(words[i]);\\n                        if (i < last - 1) {\\n                            for (int j = 0; j <= (spaces + ((i - index) < r ? 1 : 0)); j++) {\\n                                builder.append(\" \");\\n                            }\\n                        }\\n                    }\\n                }\\n                lines.add(builder.toString());\\n                index = last;\\n            }\\n            \\n            \\n            return lines;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"24871",
			"view":"11637",
			"top":"3",
			"title":"What does this question aim to teach?",
			"vote":"23",
			"content":"In some of the texts that I have been able to find I see that this problem admits a dynamic programming solution that is superior to greedy solutions. (MSWord vs LATEX). I think, that to solve this question specifically (meaning something that OJ accepts) requires a greedy solution. \\n\\nAs far as I understand the \"idea\" of text justification is not to distribute spaces as evenly as possible within all the words of an individual line; But instead lower the overall cost of the way you justify text, which means that even though you may have some lines that have uneven spaces between words than others, but this lowers the overall cost of a justification in other lines. \\n\\nIn this question's description the correct answer is described as a very specific way to do text justification that seems to be not what the superior solution is. \\n\\nDo you think its right to actually post this question as an exercise at all? What does this question aim to teach as far as good text justification algorithms are concerned?"
		},
		{
			"lc_ans_id":"25002",
			"view":"4916",
			"top":"4",
			"title":"Share my 2 ms, 30 lines solution",
			"vote":"13",
			"content":"    class Solution {\\n    public:\\n        vector<string> fullJustify(vector<string> &words, int L) {\\n            vector<string> ans;\\n            int begin = 0;\\n            while (begin < words.size()) {\\n                int last = begin;\\n                int linesize = words[begin++].size();\\n                while (begin < words.size() && linesize + 1 + words[begin].size() <= L) {\\n                    linesize += 1 + words[begin].size();\\n                    begin++;\\n                }\\n                \\n                int spaces = 1, extra = 0;\\n                if (begin < words.size() && begin != last + 1) {\\n                    spaces = (L - linesize) / (begin - last - 1) + 1;\\n                    extra = (L - linesize) % (begin - last - 1);\\n                }\\n                \\n                ans.push_back(words[last++]);\\n                while (extra--) {\\n                    ans.back().append(spaces+1, ' ');\\n                    ans.back().append(words[last++]);\\n                }\\n                while (last < begin) {\\n                    ans.back().append(spaces, ' ');\\n                    ans.back().append(words[last++]);\\n                }\\n                ans.back().append(L-ans.back().size(), ' ');\\n            }\\n            \\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"25035",
			"view":"1279",
			"top":"5",
			"title":"Wrong answer with input([\"\"],2);",
			"vote":"10",
			"content":"Input:\\t[\"\"], 2<br/>\\nOutput:\\t[\"\"]<br/>\\nExpected:\\t[\"  \"]<br/>\\nAs described ,the last line of text should be left justified and no extra space is inserted between words.Can anyone explain this?"
		},
		{
			"lc_ans_id":"24965",
			"view":"2434",
			"top":"6",
			"title":"Easy understanding solution",
			"vote":"9",
			"content":"    vector<string> fullJustify(vector<string> &words, int L) {\\n        vector<string> ans, vs;\\n        string str;\\n        \\n        int len = 0;\\n        for (int i = 0; i < words.size(); ++i) {\\n            if (len + vs.size() + words[i].size() <= L) {\\n                // vs not full, need to get more words in the line\\n                vs.push_back(words[i]);\\n                len += words[i].size();\\n            }\\n            else {\\n                // vs full, get the whole line\\n                if (vs.size() == 1) {\\n                    // just one word, the left justify\\n                    str = vs[0];\\n                    str.append(L - str.size(), ' ');\\n                    ans.push_back(str);\\n                }\\n                else if (vs.size() > 1) {\\n                    // the first \"mod\" words get \"div+1\" spaces\\n                    // the remaining words get \"div\" spaces\\n                    int div = (L - len) / (vs.size() - 1);\\n                    int mod = (L - len) % (vs.size() - 1);\\n                    str = vs[0];\\n                    for (int j = 1; j < vs.size(); ++j) {\\n                        if (j <= mod) str.append(div+1, ' '); // one more space\\n                        else str.append(div, ' ');\\n                        str += vs[j];\\n                    }\\n                    ans.push_back(str);\\n                }\\n                \\n                vs.clear();\\n                vs.push_back(words[i]);\\n                len = words[i].size();\\n            }\\n        }\\n        \\n        // the last line, left justified and no extra space is inserted between words\\n        str = vs[0];\\n        for (int j = 1; j < vs.size(); ++j) str += ' ' + vs[j];\\n        str.append(L-str.size(), ' ');\\n        ans.push_back(str);\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"24962",
			"view":"1062",
			"top":"7",
			"title":"15-line Python solution, 40ms",
			"vote":"6",
			"content":"    def fullJustify(self, words, maxWidth):\\n        i, N, result = 0, len(words), []\\n        while i < N:\\n            # decide how many words to be put in one line\\n            oneLine, j, currWidth, positionNum, spaceNum = [words[i]], i + 1, len(words[i]), 0, maxWidth - len(words[i])\\n            while j < N and currWidth + 1 + len(words[j]) <= maxWidth:\\n                oneLine.append(words[j])\\n                currWidth += 1 + len(words[j])\\n                spaceNum -= len(words[j])\\n                positionNum, j = positionNum + 1, j + 1\\n            i = j\\n            # decide the layout of one line\\n            if i < N and positionNum:\\n                spaces = [' ' * (spaceNum / positionNum + (k < spaceNum % positionNum)) for k in range(positionNum)] + ['']\\n            else: # last line or the line only has one word\\n                spaces = [' '] * positionNum + [' ' * (maxWidth - currWidth)]\\n            result.append(''.join([s for pair in zip(oneLine, spaces) for s in pair]))\\n        return result"
		},
		{
			"lc_ans_id":"24989",
			"view":"2468",
			"top":"8",
			"title":"Easy Java implementation",
			"vote":"6",
			"content":"- I divide the solution to this question into two parts:\\n - one is for counting the valid number of words which can fit into one line, i.e. helper() function does it and also passes the next index to be traversed in the next turn (it can be modified as iterative way if you are more comfortable with).\\n\\n - the other part serves as a string editor, i.e. addList() uses the actual valid words lengths (len) and index of start (i, inclusive) and end (j, exclusive) to count the spaces to be added.\\n\\n-\\n\\n    public class Solution {\\n    private List<String> result;\\n    \\n    public List<String> fullJustify(String[] words, int maxWidth) {\\n        result = new ArrayList<String>();\\n        if (words == null || words.length == 0 || maxWidth < 0) return result;\\n        if (maxWidth == 0) {\\n            result.add(\"\");\\n            return result;\\n        }\\n        helper(words, 0, maxWidth);\\n        return result;\\n    }\\n    \\n    public void helper(String[] words, int start, int L) {\\n        if (start >= words.length) return;\\n        \\n        int i = start, len = 0, total = 0, next = -1;\\n        while (total < L && i < words.length) {\\n            total += words[i].length();\\n            if (total > L) { // only in this case we need skip i++\\n                next = i;\\n                break;\\n            }\\n            len += words[i].length();\\n            total++; // count space\\n            i++;\\n        }\\n        \\n        if (next == -1) next = i;\\n        addList(words, start, next, len, L);\\n        \\n        helper(words, next, L);\\n    }\\n    \\n    public void addList(String[] words, int i, int j, int len, int L) {\\n        StringBuilder sb = new StringBuilder(\"\");\\n        int count = j-i-1, space = 0, more = 0, s = 0;\\n        if (count == 0 || j == words.length) { // the last line\\n            for (int k = i; k < j; k++) {\\n                sb.append(words[k]);\\n                if (k == j-1) break;\\n                sb.append(\" \");\\n            }\\n            space = L - sb.length();\\n            s = 0;\\n            while (s++ < space) sb.append(\" \");\\n        } else {\\n            space = (L - len) / count; more = (L - len) % count;\\n            for (int k = i; k < j; k++) {\\n                sb.append(words[k]);\\n                s = 0;\\n                if (k == j-1) break;\\n                while (s++ < space) sb.append(\" \");\\n                if (more-- > 0) sb.append(\" \");\\n            }\\n        }\\n        \\n        result.add(sb.toString());\\n    }\\n    }"
		},
		{
			"lc_ans_id":"25008",
			"view":"714",
			"top":"9",
			"title":"23 lines and clear python solution, can it be shorter?",
			"vote":"3",
			"content":"    class Solution:\\n    # @param words, a list of strings\\n    # @param L, an integer\\n    # @return a list of strings\\n    def fullJustify(self, words, length):\\n        text = ' '.join(words)+' '\\n        if text == ' ':\\n            return [' '*length]\\n        res = []\\n        while text:\\n            idx = text.rfind(' ', 0, length+1)\\n            line = text[:idx].split()\\n            l, n = sum(len(w) for w in line), len(line)\\n            if n == 1:\\n                res.append(line[0].ljust(length))\\n            else:\\n                s, remainder = divmod(length-l, n-1)\\n                line[:-1] = [w+' '*s for w in line[:-1]]\\n                line[:remainder] = [w+' ' for w in line[:remainder]]\\n                res.append(''.join(line))\\n            text = text[idx+1:]\\n        res[-1] = ' '.join(res[-1].split()).ljust(length)\\n        return res\\n\\nThe only trick to use the text and rfind to find every line."
		}
	],
	"id":"68",
	"title":"Text Justification",
	"content":"<p>\r\nGiven an array of words and a length <i>L</i>, format the text such that each line has exactly <i>L</i> characters and is fully (left and right) justified.\r\n</p> \r\n\r\n<p>\r\nYou should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces <code>' '</code> when necessary so that each line has exactly <i>L</i> characters.\r\n</p>\r\n\r\n<p>\r\nExtra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.\r\n</p>\r\n\r\n<p>\r\nFor the last line of text, it should be left justified and no extra space is inserted between words.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\n<b>words</b>: <code>[\"This\", \"is\", \"an\", \"example\", \"of\", \"text\", \"justification.\"]</code><br />\r\n<b>L</b>: <code>16</code>.\r\n</p>\r\n\r\n<p>\r\nReturn the formatted lines as:<br />\r\n<pre>\r\n[\r\n   \"This    is    an\",\r\n   \"example  of text\",\r\n   \"justification.  \"\r\n]\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b> Each word is guaranteed not to exceed <i>L</i> in length.\r\n</p>\r\n\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show corner cases.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Corner Cases:</b>\r\n<p>\r\n<ul>\r\n<li>A line other than the last line might contain only one word. What should you do in this case?<br />\r\nIn this case, that line should be left-justified.</li>\r\n</p>\r\n</div>",
	"frequency":"343",
	"ac_num":"66507"
}