// // eslint-disable-next-line react-hooks/rules-of-hooks
// const fetchLastMessage = useCallback(async (userId) => {
//     try {
//       const { data: messages } = await FetchAllMessages();
//       if (!messages) {
//         return "No messages";
//       } else {
//         const lastChat = messages.filter((item) => {
//           return (
//             (item.senderId._id === userId &&
//               item.receiverId._id === currentUser._id) ||
//             (item.receiverId._id === userId &&
//               item.senderId._id === currentUser._id)
//           );
//         });
  
//         return lastChat[lastChat.length - 1].message;
//       }
//     } catch (error) {
//       console.error("Error fetching last message:", error);
//       return "Error fetching message";
//     }
//   }, [currentUser._id]);
  
  
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useEffect(() => {
//       const fetchLastMessages = async () => {
//         const newLastMessages = {};
//         for (const friend of friends) {
//           const lastMessage = await fetchLastMessage(friend.senderId._id);
//           newLastMessages[friend.senderId._id] = lastMessage;
//         }
//         setLastMessages(newLastMessages);
//       };
  
//       fetchLastMessages();
//     }, [fetchLastMessage, friends]);
  
  
//   // Inside useEffect, set the lastMessages state to an array of objects
//   setLastMessages(friends.map((friend) => ({
//     userId: friend.senderId._id,
//     lastMessage: fetchLastMessage(friend.senderId._id)
//   })));
  
//   // Updated renderLastMessages function to use the new data structure
//   const renderLastMessages = (userId) => {
//     const userMessage = lastMessages.find((item) => item.userId === userId);
//     if (userMessage) {
//       return <div className="message-snip pt-2">{userMessage.message}</div>;
//     }
//     return <div className="message-snip pt-2">No messages</div>;
//   };