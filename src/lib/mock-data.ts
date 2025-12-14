import { Problem, User, LeaderboardEntry, DailyChallenge } from "./types";

export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    topics: ["arrays", "hash-tables"],
    companies: ["google", "amazon", "meta", "apple"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    hints: [
      "A brute force approach would be to check every pair of numbers.",
      "Can you use a hash map to optimize the solution?",
      "For each number, check if target - number exists in the hash map.",
    ],
    starterCode: {
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    solutionExplanation: `The optimal solution uses a hash map to store numbers we've seen and their indices. For each number, we calculate the complement (target - current number) and check if it exists in our hash map. If it does, we've found our pair. Time complexity: O(n), Space complexity: O(n).`,
    testCases: [
      { id: "1", input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { id: "2", input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
      { id: "3", input: "[3,3]\n6", expectedOutput: "[0,1]" },
    ],
    acceptance: 49.2,
    submissions: 15420000,
    likes: 48500,
    dislikes: 1520,
  },
  {
    id: "2",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "easy",
    topics: ["strings", "stacks"],
    companies: ["amazon", "meta", "microsoft"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the top of the stack.",
      "At the end, the stack should be empty for a valid string.",
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    # Your code here
    pass`,
      javascript: `function isValid(s) {
    // Your code here
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0`,
      javascript: `function isValid(s) {
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    for (const char of s) {
        if (char in mapping) {
            if (!stack.length || stack[stack.length-1] !== mapping[char]) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> mapping = Map.of(')', '(', '}', '{', ']', '[');
        for (char c : s.toCharArray()) {
            if (mapping.containsKey(c)) {
                if (stack.isEmpty() || stack.peek() != mapping.get(c)) return false;
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (mapping.count(c)) {
                if (st.empty() || st.top() != mapping[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
    },
    solutionExplanation: `Use a stack to track opening brackets. For each closing bracket, check if it matches the most recent opening bracket. Time complexity: O(n), Space complexity: O(n).`,
    testCases: [
      { id: "1", input: '"()"', expectedOutput: "true" },
      { id: "2", input: '"()[]{}"', expectedOutput: "true" },
      { id: "3", input: '"(]"', expectedOutput: "false" },
    ],
    acceptance: 40.1,
    submissions: 8920000,
    likes: 21200,
    dislikes: 890,
  },
  {
    id: "3",
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "easy",
    topics: ["linked-lists", "recursion"],
    companies: ["amazon", "microsoft", "apple"],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    hints: [
      "Use a dummy node to simplify the code.",
      "Compare nodes from both lists and append the smaller one.",
      "Don't forget to append the remaining nodes.",
    ],
    starterCode: {
      python: `def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # Your code here
    pass`,
      javascript: `function mergeTwoLists(list1, list2) {
    // Your code here
}`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    current.next = list1 or list2
    return dummy.next`,
      javascript: `function mergeTwoLists(list1, list2) {
    const dummy = { val: 0, next: null };
    let current = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    current.next = list1 || list2;
    return dummy.next;
}`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        current.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* current = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                current->next = list1;
                list1 = list1->next;
            } else {
                current->next = list2;
                list2 = list2->next;
            }
            current = current->next;
        }
        current->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
    },
    solutionExplanation: `Use a dummy node and iterate through both lists, always choosing the smaller value. Time complexity: O(n + m), Space complexity: O(1).`,
    testCases: [
      { id: "1", input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { id: "2", input: "[]\n[]", expectedOutput: "[]" },
      { id: "3", input: "[]\n[0]", expectedOutput: "[0]" },
    ],
    acceptance: 62.3,
    submissions: 6780000,
    likes: 18900,
    dislikes: 720,
  },
  {
    id: "4",
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "medium",
    topics: ["arrays", "dynamic-programming", "greedy"],
    companies: ["google", "amazon", "microsoft", "meta", "apple"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hints: [
      "Think about Kadane's algorithm.",
      "At each position, decide whether to start a new subarray or extend the current one.",
      "Keep track of both the current sum and the maximum sum seen so far.",
    ],
    starterCode: {
      python: `def maxSubArray(nums: List[int]) -> int:
    # Your code here
    pass`,
      javascript: `function maxSubArray(nums) {
    // Your code here
}`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0], currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], currentSum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
    },
    solutionExplanation: `Kadane's algorithm: at each position, either start a new subarray or extend the current one. Time complexity: O(n), Space complexity: O(1).`,
    testCases: [
      { id: "1", input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { id: "2", input: "[1]", expectedOutput: "1" },
      { id: "3", input: "[5,4,-1,7,8]", expectedOutput: "23" },
    ],
    acceptance: 50.8,
    submissions: 9240000,
    likes: 32100,
    dislikes: 1340,
  },
  {
    id: "5",
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "medium",
    topics: ["trees", "queues"],
    companies: ["amazon", "meta", "microsoft"],
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000",
    ],
    hints: [
      "Use BFS with a queue.",
      "Process all nodes at the current level before moving to the next.",
      "Track the size of the queue at each level.",
    ],
    starterCode: {
      python: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    # Your code here
    pass`,
      javascript: `function levelOrder(root) {
    // Your code here
}`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def levelOrder(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
      javascript: `function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
        const level = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            vector<int> level;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`,
    },
    solutionExplanation: `Use BFS with a queue. Process all nodes at each level before moving to the next. Time complexity: O(n), Space complexity: O(n).`,
    testCases: [
      { id: "1", input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" },
      { id: "2", input: "[1]", expectedOutput: "[[1]]" },
      { id: "3", input: "[]", expectedOutput: "[]" },
    ],
    acceptance: 63.5,
    submissions: 4560000,
    likes: 14200,
    dislikes: 520,
  },
  {
    id: "6",
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "medium",
    topics: ["strings", "dynamic-programming"],
    companies: ["google", "amazon", "microsoft", "meta"],
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    hints: [
      "Expand around center for each character.",
      "Consider both odd and even length palindromes.",
      "Keep track of the longest found.",
    ],
    starterCode: {
      python: `def longestPalindrome(s: str) -> str:
    # Your code here
    pass`,
      javascript: `function longestPalindrome(s) {
    // Your code here
}`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def longestPalindrome(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]
    
    result = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i+1)
        result = max(result, odd, even, key=len)
    return result`,
      javascript: `function longestPalindrome(s) {
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--; r++;
        }
        return s.slice(l + 1, r);
    };
    let result = "";
    for (let i = 0; i < s.length; i++) {
        const odd = expand(i, i);
        const even = expand(i, i + 1);
        if (odd.length > result.length) result = odd;
        if (even.length > result.length) result = even;
    }
    return result;
}`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        String result = "";
        for (int i = 0; i < s.length(); i++) {
            String odd = expand(s, i, i);
            String even = expand(s, i, i + 1);
            if (odd.length() > result.length()) result = odd;
            if (even.length() > result.length()) result = even;
        }
        return result;
    }
    
    private String expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--; r++;
        }
        return s.substring(l + 1, r);
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        string result = "";
        for (int i = 0; i < s.length(); i++) {
            string odd = expand(s, i, i);
            string even = expand(s, i, i + 1);
            if (odd.length() > result.length()) result = odd;
            if (even.length() > result.length()) result = even;
        }
        return result;
    }
    
    string expand(string& s, int l, int r) {
        while (l >= 0 && r < s.length() && s[l] == s[r]) {
            l--; r++;
        }
        return s.substr(l + 1, r - l - 1);
    }
};`,
    },
    solutionExplanation: `Expand around center approach. For each position, expand outward while characters match. Check both odd and even length palindromes. Time complexity: O(n^2), Space complexity: O(1).`,
    testCases: [
      { id: "1", input: '"babad"', expectedOutput: '"bab"' },
      { id: "2", input: '"cbbd"', expectedOutput: '"bb"' },
    ],
    acceptance: 32.4,
    submissions: 7890000,
    likes: 27800,
    dislikes: 1620,
  },
  {
    id: "7",
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "medium",
    topics: ["arrays", "sorting"],
    companies: ["google", "amazon", "meta", "uber"],
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4",
    ],
    hints: [
      "Sort intervals by start time.",
      "Merge overlapping intervals as you iterate.",
      "Two intervals overlap if the first ends after the second starts.",
    ],
    starterCode: {
      python: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    # Your code here
    pass`,
      javascript: `function merge(intervals) {
    // Your code here
}`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])
    return result`,
      javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        const last = result[result.length - 1];
        if (start <= last[1]) {
            last[1] = Math.max(last[1], end);
        } else {
            result.push([start, end]);
        }
    }
    return result;
}`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();
        result.add(intervals[0]);
        for (int i = 1; i < intervals.length; i++) {
            int[] last = result.get(result.size() - 1);
            if (intervals[i][0] <= last[1]) {
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                result.add(intervals[i]);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> result = {intervals[0]};
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= result.back()[1]) {
                result.back()[1] = max(result.back()[1], intervals[i][1]);
            } else {
                result.push_back(intervals[i]);
            }
        }
        return result;
    }
};`,
    },
    solutionExplanation: `Sort intervals by start time, then merge overlapping ones. Time complexity: O(n log n), Space complexity: O(n).`,
    testCases: [
      { id: "1", input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" },
      { id: "2", input: "[[1,4],[4,5]]", expectedOutput: "[[1,5]]" },
    ],
    acceptance: 46.2,
    submissions: 5670000,
    likes: 19800,
    dislikes: 680,
  },
  {
    id: "8",
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "hard",
    topics: ["arrays", "dynamic-programming", "stacks"],
    companies: ["google", "amazon", "meta", "apple", "microsoft"],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The elevation map is represented by the array. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    hints: [
      "For each position, water trapped = min(max_left, max_right) - height.",
      "Use two pointers from both ends.",
      "Move the pointer with smaller max height.",
    ],
    starterCode: {
      python: `def trap(height: List[int]) -> int:
    # Your code here
    pass`,
      javascript: `function trap(height) {
    // Your code here
}`,
      java: `class Solution {
    public int trap(int[] height) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water`,
      javascript: `function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};`,
    },
    solutionExplanation: `Two pointer approach: water at each position depends on min of max heights on both sides. Time complexity: O(n), Space complexity: O(1).`,
    testCases: [
      { id: "1", input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
      { id: "2", input: "[4,2,0,3,2,5]", expectedOutput: "9" },
    ],
    acceptance: 58.9,
    submissions: 3450000,
    likes: 28400,
    dislikes: 420,
  },
  {
    id: "9",
    title: "Word Search II",
    slug: "word-search-ii",
    difficulty: "hard",
    topics: ["graphs", "recursion", "strings"],
    companies: ["google", "amazon", "microsoft", "airbnb"],
    description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    examples: [
      {
        input:
          'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
      {
        input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
        output: "[]",
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 12",
      "board[i][j] is a lowercase English letter.",
      "1 <= words.length <= 3 * 10^4",
      "1 <= words[i].length <= 10",
      "words[i] consists of lowercase English letters.",
      "All the strings of words are unique.",
    ],
    hints: [
      "Build a Trie from all words for efficient prefix lookup.",
      "Use DFS/backtracking on the board.",
      "Prune branches that don't match any word prefix.",
    ],
    starterCode: {
      python: `def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    # Your code here
    pass`,
      javascript: `function findWords(board, words) {
    // Your code here
}`,
      java: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def findWords(board, words):
    trie = {}
    for word in words:
        node = trie
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = word
    
    result = []
    m, n = len(board), len(board[0])
    
    def dfs(i, j, node):
        char = board[i][j]
        if char not in node:
            return
        next_node = node[char]
        if '$' in next_node:
            result.append(next_node['$'])
            del next_node['$']
        
        board[i][j] = '#'
        for di, dj in [(0,1),(0,-1),(1,0),(-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != '#':
                dfs(ni, nj, next_node)
        board[i][j] = char
    
    for i in range(m):
        for j in range(n):
            dfs(i, j, trie)
    return result`,
      javascript: `function findWords(board, words) {
    const trie = {};
    for (const word of words) {
        let node = trie;
        for (const char of word) {
            node = node[char] = node[char] || {};
        }
        node.word = word;
    }
    
    const result = [];
    const m = board.length, n = board[0].length;
    
    const dfs = (i, j, node) => {
        const char = board[i][j];
        if (!node[char]) return;
        const next = node[char];
        if (next.word) {
            result.push(next.word);
            delete next.word;
        }
        board[i][j] = '#';
        for (const [di, dj] of [[0,1],[0,-1],[1,0],[-1,0]]) {
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] !== '#') {
                dfs(ni, nj, next);
            }
        }
        board[i][j] = char;
    };
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, trie);
        }
    }
    return result;
}`,
      java: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        // Build Trie and use DFS - implementation similar to others
        return new ArrayList<>();
    }
}`,
      cpp: `class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        // Build Trie and use DFS - implementation similar to others
        return {};
    }
};`,
    },
    solutionExplanation: `Build a Trie from all words, then DFS on board with backtracking. Prune branches not in Trie. Time complexity: O(m*n*4^L), Space complexity: O(sum of word lengths).`,
    testCases: [
      {
        id: "1",
        input:
          '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\n["oath","pea","eat","rain"]',
        expectedOutput: '["eat","oath"]',
      },
    ],
    acceptance: 37.8,
    submissions: 1890000,
    likes: 8900,
    dislikes: 420,
  },
  {
    id: "10",
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "hard",
    topics: ["arrays", "searching"],
    companies: ["google", "amazon", "meta", "apple", "microsoft"],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    hints: [
      "Binary search on the shorter array.",
      "Partition both arrays such that left half <= right half.",
      "The median is at the partition boundary.",
    ],
    starterCode: {
      python: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    # Your code here
    pass`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
}`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
    },
    solution: {
      python: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        
        left1 = nums1[i-1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j-1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2:
                return max(left1, left2)
            return (max(left1, left2) + min(right1, right2)) / 2
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    const m = nums1.length, n = nums2.length;
    let lo = 0, hi = m;
    
    while (lo <= hi) {
        const i = Math.floor((lo + hi) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        
        const left1 = i > 0 ? nums1[i-1] : -Infinity;
        const right1 = i < m ? nums1[i] : Infinity;
        const left2 = j > 0 ? nums2[j-1] : -Infinity;
        const right2 = j < n ? nums2[j] : Infinity;
        
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2) return Math.max(left1, left2);
            return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
        } else if (left1 > right2) {
            hi = i - 1;
        } else {
            lo = i + 1;
        }
    }
}`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Binary search implementation
        return 0.0;
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Binary search implementation
        return 0.0;
    }
};`,
    },
    solutionExplanation: `Binary search on the shorter array to find correct partition. Time complexity: O(log(min(m,n))), Space complexity: O(1).`,
    testCases: [
      { id: "1", input: "[1,3]\n[2]", expectedOutput: "2.00000" },
      { id: "2", input: "[1,2]\n[3,4]", expectedOutput: "2.50000" },
    ],
    acceptance: 36.4,
    submissions: 4560000,
    likes: 24200,
    dislikes: 2890,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    role: "user",
    createdAt: new Date("2024-01-15"),
    streak: 15,
    totalSolved: 127,
    easySolved: 65,
    mediumSolved: 48,
    hardSolved: 14,
  },
  {
    id: "2",
    email: "admin@codeprep.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2023-06-01"),
    streak: 30,
    totalSolved: 350,
    easySolved: 150,
    mediumSolved: 150,
    hardSolved: 50,
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: "3",
      email: "alice@example.com",
      name: "Alice Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "user",
      createdAt: new Date("2024-02-01"),
      streak: 45,
      totalSolved: 456,
      easySolved: 180,
      mediumSolved: 200,
      hardSolved: 76,
    },
    score: 4560,
    problemsSolved: 456,
    streak: 45,
  },
  {
    rank: 2,
    user: {
      id: "4",
      email: "bob@example.com",
      name: "Bob Smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      role: "user",
      createdAt: new Date("2024-01-20"),
      streak: 38,
      totalSolved: 389,
      easySolved: 150,
      mediumSolved: 180,
      hardSolved: 59,
    },
    score: 3890,
    problemsSolved: 389,
    streak: 38,
  },
  {
    rank: 3,
    user: {
      id: "5",
      email: "carol@example.com",
      name: "Carol Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      role: "user",
      createdAt: new Date("2024-03-01"),
      streak: 29,
      totalSolved: 312,
      easySolved: 130,
      mediumSolved: 140,
      hardSolved: 42,
    },
    score: 3120,
    problemsSolved: 312,
    streak: 29,
  },
  {
    rank: 4,
    user: {
      id: "6",
      email: "david@example.com",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      role: "user",
      createdAt: new Date("2024-02-15"),
      streak: 22,
      totalSolved: 287,
      easySolved: 120,
      mediumSolved: 130,
      hardSolved: 37,
    },
    score: 2870,
    problemsSolved: 287,
    streak: 22,
  },
  {
    rank: 5,
    user: {
      id: "7",
      email: "emma@example.com",
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      role: "user",
      createdAt: new Date("2024-03-10"),
      streak: 18,
      totalSolved: 245,
      easySolved: 100,
      mediumSolved: 110,
      hardSolved: 35,
    },
    score: 2450,
    problemsSolved: 245,
    streak: 18,
  },
];

export const mockDailyChallenge: DailyChallenge = {
  id: "daily-1",
  problemId: "4",
  date: new Date(),
  problem: mockProblems.find((p) => p.id === "4"),
};

export const topicLabels: Record<string, string> = {
  arrays: "Arrays",
  strings: "Strings",
  "linked-lists": "Linked Lists",
  trees: "Trees",
  graphs: "Graphs",
  "dynamic-programming": "Dynamic Programming",
  greedy: "Greedy",
  recursion: "Recursion",
  "bit-manipulation": "Bit Manipulation",
  sorting: "Sorting",
  searching: "Searching",
  "hash-tables": "Hash Tables",
  stacks: "Stacks",
  queues: "Queues",
  heaps: "Heaps",
};

export const companyLabels: Record<string, string> = {
  google: "Google",
  amazon: "Amazon",
  microsoft: "Microsoft",
  meta: "Meta",
  apple: "Apple",
  netflix: "Netflix",
  uber: "Uber",
  airbnb: "Airbnb",
  linkedin: "LinkedIn",
  twitter: "Twitter",
};
