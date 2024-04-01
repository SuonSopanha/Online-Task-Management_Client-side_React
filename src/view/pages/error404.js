import React from "react";

const message = "Sorry, we couldn't find this page.";
const Error404 = () => {
  return (
    <section class="flex items-center h-screen p-16 w-full bg-gradient-to-r from-[#65A0FD] via-[#E8CCCC] to-[#FFA9F1B5]">
      <div class="container flex flex-col items-center ">
        <div class="flex flex-col gap-6 max-w-md text-center">
          <h2 class="font-extrabold text-9xl text-gray-600 ">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-2xl md:text-3xl 0">
            {message}
          </p>
          <a
            href="/"
            class="px-8 py-4 text-xl font-semibold rounded bg-purple-600 hover:text-gray-200"
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
};

export default Error404;
