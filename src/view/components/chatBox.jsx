import React, { useEffect } from "react";
import { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { getUserByID } from "../../firebase/usersCRUD";

const ChatBox = ({ team }) => {
  const [yourMessage, setYourMessage] = useState([]);
  const [otherMessage, setOtherMessage] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!team.teamMessage || team.teamMessage.length === 0) {
        console.warn("Team messages are undefined or empty.");
        return;
      }

      const yourMessagesPromises = team.teamMessage
        .filter((message) => message.sender_id === auth.currentUser.uid)
        .map(async (message) => {
          const user = await getUserByID(message.sender_id);
          return { ...message, user };
        });

      const otherMessagesPromises = team.teamMessage
        .filter((message) => message.sender_id !== auth.currentUser.uid)
        .map(async (message) => {
          const user = await getUserByID(message.sender_id);
          return { ...message, user };
        });

      const yourMessages = await Promise.all(yourMessagesPromises);
      const otherMessages = await Promise.all(otherMessagesPromises);

      setYourMessage(yourMessages);
      setOtherMessage(otherMessages);
    };

    fetchMessages();
  }, [team.teamMessage]);

  return (
    <div className="flex flex-col justify-center item-center mt-[-16px]">
      {console.log(yourMessage, " dfsda", otherMessage)}
      <div class="flex justify-center h-full antialiased text-gray-800">
        <div class="flex flex-row h-[460px] w-full overflow-x-hidden">
          <div class="flex flex-col flex-auto h-full p-6">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-glasses backdrop-blur-12 h-full px-3 pt-3 pb-1">
              <div className="sticky top-0 pb-2 border-b border-gray-400 z-10">
                <h1 className="text-lg font-bold">Chart Header</h1>
              </div>
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  {team.teamMessage.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.sender_id === auth.currentUser.uid
                          ? "col-start-1 col-end-8"
                          : "col-start-6 col-end-13"
                      } p-3 rounded-lg`}
                    >
                      <div
                        className={`${
                          message.sender_id === auth.currentUser.uid
                            ? "flex flex-row items-center"
                            : "flex items-center justify-start flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`${
                            message.sender_id === auth.currentUser.uid
                              ? "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              : "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          }`}
                        >
                          A
                        </div>
                        <div
                          className={`${
                            message.sender_id === auth.currentUser.uid
                              ? "relative mr-3"
                              : "relative ml-3"
                          } text-sm bg-white py-2 px-4 shadow rounded-xl`}
                        >
                          <div>{message.message_text}</div>
                          {message.sender_id !== auth.currentUser.uid && (
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              {message.time}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="flex flex-row items-center h-16 rounded-xl bg-glasses backdrop-blur-12 w-full px-4">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4">
                  <div class="relative w-full">
                    <input
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span class="ml-2">
                      <svg
                        class="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
