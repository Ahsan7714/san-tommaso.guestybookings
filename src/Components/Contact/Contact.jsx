import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/bgcon.jpg";

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(state);

    try {
      const res = await fetch("http://localhost:8004/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 401 || !data) {
        console.log("error");
        toast.error("Failed to send email");
      } else {
        toast.success("Email sent successfully");
        setState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        console.log("Email sent");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send email");
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center">
      <div className="flex lg:flex-row flex-col bg-white shadow-xl rounded-lg w-[80%]  my-20 ">
        <div className=" flex-1">
          <form onSubmit={submit} className="flex flex-col px-8 gap-8 py-5">
            <div>
              <h1 className="text-[35px] text-[#10275b] font-bold py-4">
                Contact us
              </h1>
              <p className="text-[18px] pb-3">
                We're open for any suggestion or just to have a chat
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[15px] text-[#80808096]">
                Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={inputHandle}
                value={state.name}
                required
                placeholder="Your name"
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[90%]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[15px] text-[#80808096]">
                Email*
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={inputHandle}
                value={state.email}
                required
                placeholder="Your Email"
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[90%]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[15px] text-[#80808096]">
                Subject*
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                onChange={inputHandle}
                value={state.subject}
                required
                placeholder="Your Subject"
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[90%]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[15px] text-[#80808096]">
                Message*
              </label>
              <textarea
                name="message"
                id="message"
                onChange={inputHandle}
                value={state.message}
                required
                cols="10"
                rows="3"
                placeholder="Enter your message"
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[90%]"
              ></textarea>
            </div>

            <div>
              <button className="bg-[#f8aa48] font-semibold text-white h-[50px] w-[160px] rounded-md shadow-lg">
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1">
          <img src={img} alt="" className=" rounded-e-lg hidden lg:block" />
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
