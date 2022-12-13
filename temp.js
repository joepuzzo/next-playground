function costPerDay(numUsers, avgChatsPerUser, costPerChat) {
  return numUsers * avgChatsPerUser * costPerChat;
}

// Example:
console.log(costPerDay(1000000, 10, 0.05));  // Output: 5000
