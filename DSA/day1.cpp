// Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume exactly one solution exists, and you cannot use the same element twice.

// Input:  nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]   // nums[0] + nums[1] = 2 + 7 = 9

#include <iostream>
#include <unordered_map>
#include <vector>
#include <utility>

using namespace std;

// This is brute force solution we are traversing with i,j two for loops complexity is O(N^2)
// space complexity is constant here
pair<int,int>towSumBrute(vector<int>& nums, int target){
    int sum = 0;
    int n = nums.size();
    for(int i=0; i<n-1; i++){
        for(int j=i+1; j<n; j++){
            if(nums[i] + nums[j] == target) return {i,j};
        }
    }
    return {-1,-1}; // This will never execute because in question it is mention one solution exists
}

// This is optimized solution we are saving array values with their indices in map complexity is O(N)
// space complexity is O(N)
pair<int,int>twoSumOptimized(vector<int>& nums, int target){
    int n = nums.size();
    unordered_map<int,int>indexOf;

    for(int i=0; i<n; i++){
        int need = target-nums[i];
        auto it = indexOf.find(need);
        if(it != indexOf.end()) return {it->second,i};
        indexOf[nums[i]] = i;
    }
    return {-1,-1};
}
// This is a optimized solution for sorted array with time complexity O(n) and S.C= O(1)
pair<int,int>twoSumSorted(vector<int>& nums, int target){
    int n = nums.size();

    int i=0, j=n-1;

    while(i<j){
        int sum = nums[i] + nums[j];
        if(sum == target) return {i,j};
        if(sum < target) i++;
        else j--;
    }

    return {-1,-1};
}



// "Given a string s, find the length of the longest substring without repeating characters."
// Input:  s = "abcabcbb"
// Output: 3          // "abc"

// Input:  s = "bbbbb"
// Output: 1          // "b"

// Input:  s = "pwwkew"
// Output: 3          // "wke"

int longestSubstring(string& s){
    int n = s.length();
    int left=0, right=0;
    
    unordered_map<char, int>freq;//{char, cnt}
    int longest = 0;
    while(right<n){
        //window expand
        freq[s[right]]++;

        //window shrink
        while(freq[s[right]] > 1){
            freq[s[left]]--;
            left++;
        }
        
        longest = max(longest, right-left+1);
        right++;
    }

    return longest;
}

int longestSubstringElegant(string& s){
    int n = s.length();
    int left=0, right=0;
    
    unordered_map<char, int>indexOf;//{char, index}
    int longest = 0;
    while(right<n){
        auto it = indexOf.find(s[right]);
        if(it != indexOf.end()) left = max(left,it->second + 1); //IMPORTANT


        indexOf[s[right]] = right;
        
        longest = max(longest, right-left+1);
        right++;
    }

    return longest;
}



// Given an integer array nums, find the subarray with the largest sum and return its sum.
// Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6
// Explanation: Subarray [4, -1, 2, 1] has the largest sum = 6

// Input:  nums = [1]
// Output: 1

// Input:  nums = [5, 4, -1, 7, 8]
// Output: 23

//T.C = O(N^3)
int maxSumBrute1(vector<int>& nums){
    int n = nums.size();
    int maxiSum = INT_MIN;

    for(int i=0; i<n; i++){
        for(int j=i; j<n; j++){
            int sum = 0;
            for(int k=i; k<=j; k++){
                sum += nums[k];
            }
            maxiSum = max(maxiSum, sum);
        }
    }

    return maxiSum;
}

//T.C = O(N^2)
int maxSumBrute2(vector<int>& nums){
    int n = nums.size();
    int maxiSum = INT_MIN;
    for(int i=0; i<n; i++){
        int sum = 0;
        for(int j=i; j<n; j++){
            sum += nums[j];
            maxiSum = max(maxiSum, sum);
        }
    }
    return maxiSum;
}

//T.C = O(N) Kadane's Algo
int kadaneAlgo(vector<int>& nums){    
    int maxSum = INT_MIN;
    int sum = 0;
    
    for(int i=0; i<nums.size(); i++){
        sum = max(sum+nums[i],nums[i]);
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}

// 💡 Interviewer Follow-up — Often Asked:

// "Can you also return the subarray itself, not just the sum?"

vector<int> returnkadaneAlgo(vector<int>& nums){    
    int maxSum = INT_MIN;
    int sum = 0;

    int start = 0, ansStart = 0, ansEnd = 0;
    
    for(int i=0; i<nums.size(); i++){
        if(nums[i] > sum+nums[i]){
            start = i;
        }

        sum = max(sum+nums[i],nums[i]);

        if(maxSum < sum){
            ansStart = start;
            ansEnd = i;
            maxSum = sum;
        }
    }

    vector<int>ans(nums.begin()+ansStart, nums.begin()+ansEnd+1);
    return ans;
}


// Given an array of integers nums and an integer k, return the maximum sum of any contiguous subarray of size exactly k

// Input:  nums = [2, 1, 5, 1, 3, 2], k = 3
// Output: 9
// Explanation: Subarray [5, 1, 3] = 9

// Input:  nums = [-1, -2, -3, -4, -5], k = 2
// Output: -3
// Explanation: Subarray [-1, -2] = -3

// Input:  nums = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
// Output: 39
// Explanation: Subarray [4, 2, 10, 23] = 39... 
// wait verify: 2+10+23+3=38, 4+2+10+23=39 ✅

// T.C = O(N^2),
int maximumSumBrute(vector<int>& nums, int k){
    int n= nums.size();
    int maxSum = INT_MIN;
    for(int i=0; i<n-k; i++){
        int sum = 0;
        for(int j=i; j<i+k; j++){
            sum += nums[j];
        }
        maxSum = max(maxSum,sum);
    }
    return maxSum;
}

// T.C = O(N)
int maximumSum(vector<int>& nums, int k){
    int n = nums.size();
    int left = 0, right = 0;

    int maxSum = INT_MIN;
    int sum = 0;
    
    while(right<n){
        //expand
        sum += nums[right];
        
        if(right-left+1 >= k){
            maxSum = max(maxSum, sum);
            sum -= nums[left];
            left++;
        }

        right++;
    }

    return maxSum;
}



int main() {
    // vector<int> nums = {2, 7, 11, 15};
    // int target = 9;
    // pair<int, int> ans = twoSumSorted(nums, target);
    // cout << ans.first << " " << ans.second << "\n";
    // string s = "abba";
    // cout<< longestSubstringElegant(s)<<endl;

    // vector<int>nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    // vector<int>ans = returnkadaneAlgo(nums);

    // for(int i=0; i<ans.size(); i++){
    //     cout << ans[i] << " ";
    // }

    int k = 50;
    vector<int>nums = {1, 4, 2, 10, 23, 3, 1, 0, 20};
    if(k>nums.size()){
        cout<<"Not possible"<<endl;
        return 0;
    }
    
    cout<<maximumSum(nums,k)<<endl;

    return 0;
}
